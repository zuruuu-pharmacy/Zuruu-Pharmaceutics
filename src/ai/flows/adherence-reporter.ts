
'use server';
/**
 * @fileOverview AI-powered adherence report generator.
 *
 * - generateAdherenceReport - A function that creates a weekly adherence report.
 * - AdherenceReportInput - The input type for the generateAdherenceReport function.
 * - AdherenceReportOutput - The return type for the generateAdherenceReport function.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const MedicationAdherenceSchema = z.object({
  medicineName: z.string().describe('The name of the medication.'),
  dosageStrength: z.string().describe('The dosage and form of the medication (e.g., "500mg tablet").'),
  frequency: z.string().describe('How often the medication is prescribed (e.g., "Twice daily").'),
  dosesPrescribed: z.coerce.number().int().describe('The total number of doses that should have been taken in the period.'),
  dosesTaken: z.coerce.number().int().describe('The total number of doses the patient actually took.'),
});

const AdherenceReportInputSchema = z.object({
  patientId: z.string().optional().describe('The patient\'s ID.'),
  weekStartDate: z.string().optional().describe('The start date of the reporting week (YYYY-MM-DD).'),
  medications: z.array(MedicationAdherenceSchema),
});
export type AdherenceReportInput = z.infer<typeof AdherenceReportInputSchema>;

const AdherenceReportOutputSchema = z.object({
  overallAdherence: z.string().describe('The overall adherence rate as a percentage for all medications.'),
  summaryNotes: z.string().describe('AI-generated summary and counseling notes for the patient or pharmacist. For each poorly maintained medication, explain why it was prescribed and the risks of not taking it.'),
  medications: z.array(z.object({
    medicineName: z.string(),
    dosageStrength: z.string(),
    dosesPrescribed: z.number().int(),
    dosesTaken: z.number().int(),
    dosesMissed: z.number().int(),
    adherenceRate: z.string().describe('The adherence rate for the individual medication as a percentage.'),
  })),
});
export type AdherenceReportOutput = z.infer<typeof AdherenceReportOutputSchema>;

export async function generateAdherenceReport(input: AdherenceReportInput): Promise<AdherenceReportOutput> {
  try {
    const prompt = `You are an expert pharmacist analyzing medication adherence data. Generate a comprehensive adherence report based on the provided data.

**Instructions:**
1. Calculate adherence rates for each medication: (dosesTaken / dosesPrescribed) * 100
2. Calculate overall adherence rate: (total doses taken / total doses prescribed) * 100
3. For each medication, calculate missed doses: dosesPrescribed - dosesTaken
4. Generate counseling notes explaining the importance of each medication and risks of non-adherence
5. Provide specific recommendations for improving adherence

**Input Data:**
- Patient ID: ${input.patientId || 'Not provided'}
- Week Start Date: ${input.weekStartDate || 'Not provided'}
- Medications: ${JSON.stringify(input.medications, null, 2)}

**For each medication, analyze:**
- Adherence rate calculation
- Missed doses count
- Importance of the medication
- Potential risks of non-adherence
- Specific recommendations for improvement

**Important:** 
- Be precise with calculations
- Provide practical, actionable advice
- Consider the patient's perspective
- Include specific counseling points for each poorly adhered medication

Respond ONLY with the structured JSON output in this exact format:
{
  "overallAdherence": "Overall adherence percentage (e.g., '85%')",
  "summaryNotes": "Comprehensive summary and counseling notes for the patient or pharmacist, including specific recommendations for each medication with poor adherence",
  "medications": [
    {
      "medicineName": "Medication name",
      "dosageStrength": "Dosage and form",
      "dosesPrescribed": Number of prescribed doses,
      "dosesTaken": Number of taken doses,
      "dosesMissed": Number of missed doses,
      "adherenceRate": "Individual adherence percentage (e.g., '90%')"
    }
  ]
}`;

    return await generateStructuredResponse<AdherenceReportOutput>(prompt);

  } catch (error) {
    console.error('Error generating adherence report:', error);
    
    // Calculate basic adherence data as fallback
    const totalPrescribed = input.medications.reduce((sum, med) => sum + med.dosesPrescribed, 0);
    const totalTaken = input.medications.reduce((sum, med) => sum + med.dosesTaken, 0);
    const overallAdherence = totalPrescribed > 0 ? Math.round((totalTaken / totalPrescribed) * 100) : 0;
    
    const medications = input.medications.map(med => {
      const adherenceRate = med.dosesPrescribed > 0 ? Math.round((med.dosesTaken / med.dosesPrescribed) * 100) : 0;
      return {
        medicineName: med.medicineName,
        dosageStrength: med.dosageStrength,
        dosesPrescribed: med.dosesPrescribed,
        dosesTaken: med.dosesTaken,
        dosesMissed: med.dosesPrescribed - med.dosesTaken,
        adherenceRate: `${adherenceRate}%`
      };
    });
    
    return {
      overallAdherence: `${overallAdherence}%`,
      summaryNotes: `Adherence Report Summary:\n\nOverall Adherence: ${overallAdherence}%\n\nThis report shows your medication adherence for the specified period. Good adherence is crucial for effective treatment. If you're having trouble remembering to take your medications, consider using pill organizers, setting alarms, or discussing with your pharmacist about strategies to improve adherence.\n\nFor medications with low adherence rates, it's important to understand why you might be missing doses and work with your healthcare team to find solutions.`,
      medications: medications
    };
  }
}