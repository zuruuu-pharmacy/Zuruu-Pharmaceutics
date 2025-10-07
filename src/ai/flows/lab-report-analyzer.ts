
'use server';
/**
 * @fileOverview AI-powered lab report analyzer.
 *
 * - analyzeLabReport - A function that handles the lab report analysis.
 * - LabReportAnalyzerInput - The input type for the analyzeLabReport function.
 * - LabReportAnalyzerOutput - The return type for the analyzeLabReport function.
 */

import {z} from 'zod';
import OpenAI from 'openai';

const demographicsSchema = z.object({
    name: z.string().optional(),
    age: z.string().optional(),
    gender: z.string().optional(),
    maritalStatus: z.string().optional(),
    occupation: z.string().optional(),
    cnicOrPassport: z.string().optional(),
    address: z.string().optional(),
    hospitalId: z.string().optional(),
    phoneNumber: z.string().optional(),
  }).optional();
  
  const detailedHistorySchema = z.object({
    demographics: demographicsSchema,
    presentingComplaint: z.string().optional(),
    historyOfPresentingIllness: z.string().optional(),
    pastMedicalHistory: z.string().optional(),
    medicationHistory: z.string().optional(),
    allergyHistory: z.string().optional(),
    familyHistory: z.string().optional(),
    socialHistory: z.string().optional(),
    immunizationHistory: z.string().optional(),
    reviewOfSystems: z.string().optional(),
    lifestyleAndCompliance: z.string().optional(),
    ideasAndConcerns: z.string().optional(),
    pharmacistAssessment: z.string().optional(),
    carePlan: z.string().optional(),
  }).optional();


const LabReportAnalyzerInputSchema = z.object({
  photoDataUri: z.string().describe("A photo of the lab report, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
  detailedHistory: detailedHistorySchema.describe('Optional detailed patient history for context.'),
});
export type LabReportAnalyzerInput = z.infer<typeof LabReportAnalyzerInputSchema>;

const AnalyzedTestSchema = z.object({
    name: z.string().describe('The name of the lab test (e.g., "Hemoglobin", "Creatinine").'),
    value: z.string().describe('The patient\'s result for the test, including units.'),
    reference_range: z.string().describe('The normal reference range for the test.'),
    status: z.enum(['High', 'Normal', 'Low', 'Abnormal', 'Borderline']).describe('The status of the value (e.g., High, Normal, Low, Abnormal).'),
    layman_explanation: z.string().describe('A short, plain-language explanation for the patient.'),
    detailed_explanation: z.string().describe('A detailed medical explanation for a healthcare professional, including interpretation and potential significance.'),
});

const LabReportAnalyzerOutputSchema = z.object({
  summary: z.string().describe('A high-level summary of the lab findings, written in simple, understandable language.'),
  recommendations: z.string().describe('General, safe next-step recommendations for the patient (e.g., "Discuss these results with your doctor.").'),
  abnormalValues: z.array(AnalyzedTestSchema).describe('A list of all values that are outside the normal range.'),
  normalValues: z.array(AnalyzedTestSchema).describe('A list of all values that are within the normal range.'),
});
export type LabReportAnalyzerOutput = z.infer<typeof LabReportAnalyzerOutputSchema>;

export async function analyzeLabReport(input: LabReportAnalyzerInput): Promise<LabReportAnalyzerOutput> {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const prompt = `You are an expert medical lab technician analyzing a lab report image. Extract all relevant information from the lab report with high accuracy.

**Instructions:**
1. Carefully examine the lab report image and extract all visible text
2. Look for common lab report elements:
   - Patient information (name, age, gender, ID)
   - Date of the lab test
   - Laboratory name and address
   - Test results with values and units
   - Reference ranges for each test
   - Abnormal values or flags
   - Doctor's notes or comments
3. For each test result found, extract:
   - Test name (e.g., "Hemoglobin", "Creatinine", "Glucose")
   - Patient's value with units
   - Reference range
   - Status (High, Normal, Low, Abnormal, Borderline)
   - Layman explanation (simple explanation for patient)
   - Detailed explanation (medical interpretation for healthcare professionals)
4. Categorize results into normal and abnormal values
5. Generate a comprehensive summary and recommendations

**Important:** 
- Be very careful with numerical values and units
- If you're not 100% certain about a value or test name, mark it as uncertain
- Pay attention to handwritten notes or additional comments
- Look for common lab abbreviations and interpret them correctly

Respond ONLY with the structured JSON output in this exact format:
{
  "summary": "High-level summary of lab findings in simple language",
  "recommendations": "General next-step recommendations for the patient",
  "abnormalValues": [
    {
      "name": "Test name",
      "value": "Patient's value with units",
      "reference_range": "Normal reference range",
      "status": "High/Normal/Low/Abnormal/Borderline",
      "layman_explanation": "Simple explanation for patient",
      "detailed_explanation": "Detailed medical explanation"
    }
  ],
  "normalValues": [
    {
      "name": "Test name",
      "value": "Patient's value with units",
      "reference_range": "Normal reference range",
      "status": "Normal",
      "layman_explanation": "Simple explanation for patient",
      "detailed_explanation": "Detailed medical explanation"
    }
  ]
}`;

    console.log('Analyzing lab report with OpenAI API...');
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: input.photoDataUri } }
          ]
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    console.log('OpenAI response received:', content);

    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const jsonStr = jsonMatch[0];
      const parsed = JSON.parse(jsonStr);
      console.log('Lab report analysis completed successfully with OpenAI');
      return parsed as LabReportAnalyzerOutput;
    } else {
      throw new Error('No valid JSON found in response');
    }

  } catch (error) {
    console.error('Error analyzing lab report:', error);
    
    // Determine the specific error type
    let errorMessage = "Unable to analyze lab report image.";
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid image format')) {
        errorMessage = "Invalid image format. Please upload a valid image file (JPEG, PNG, etc.).";
      } else if (error.message.includes('No valid JSON found')) {
        errorMessage = "Unable to extract structured data from the lab report. The image may be unclear or the text may be difficult to read.";
      } else if (error.message.includes('API key')) {
        errorMessage = "AI service is currently unavailable. Please try again later.";
      } else {
        errorMessage = `Error analyzing lab report: ${error.message}`;
      }
    }
    
    // Return a structured error response
    return {
      summary: `${errorMessage} Please ensure the image is clear, well-lit, and contains readable text.`,
      recommendations: "Please try uploading a clearer image or consult with a healthcare professional.",
      abnormalValues: [],
      normalValues: []
    };
  }
}
