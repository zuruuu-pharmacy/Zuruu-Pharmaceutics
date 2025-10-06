
'use server';
/**
 * @fileOverview AI-powered generator for a single MCQ from a drug card.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const QuizGeneratorInputSchema = z.object({
  drugName: z.string(),
  classification: z.string(),
  uses: z.string(),
  adrs: z.string(),
});
export type QuizGeneratorInput = z.infer<typeof QuizGeneratorInputSchema>;

const QuizGeneratorOutputSchema = z.object({
    question: z.string().describe("A multiple-choice question about the drug's uses or ADRs."),
    options: z.array(z.string()).length(4).describe("An array of 4 plausible options."),
    correct_answer: z.string().describe("The letter and text of the correct answer (e.g., 'B. Hypertension')."),
    explanation: z.string().describe("A detailed explanation of why the correct answer is right and the others are wrong."),
});
export type QuizGeneratorOutput = z.infer<typeof QuizGeneratorOutputSchema>;

export async function generateQuiz(input: QuizGeneratorInput): Promise<QuizGeneratorOutput> {
  try {
    console.log('Drug card quiz generator called with input:', input);
    
    const prompt = `You are an expert pharmacy educator creating a multiple-choice question from a drug card.

Drug Information:
- Name: ${input.drugName}
- Classification: ${input.classification}
- Therapeutic Uses: ${input.uses}
- Adverse Drug Reactions (ADRs): ${input.adrs}

Create a comprehensive, exam-style multiple-choice question that tests understanding of this drug's uses or adverse effects. The question should be educational and help students learn about this medication.

Requirements:
- Create a clear, specific question about the drug's uses or ADRs
- Provide 4 plausible answer options (A, B, C, D)
- Include the correct answer with letter and text
- Provide a detailed explanation of why the correct answer is right and others are wrong
- Make it appropriate for pharmacy students

Respond with valid JSON in this exact format:
{
  "question": "What is the primary therapeutic use of ${input.drugName}?",
  "options": [
    "A. Option 1",
    "B. Option 2", 
    "C. Option 3",
    "D. Option 4"
  ],
  "correct_answer": "B. Option 2",
  "explanation": "Detailed explanation of why this is correct and others are wrong"
}`;

    const result = await generateStructuredResponse<QuizGeneratorOutput>(prompt);

    // Validate the result structure
    if (!result || typeof result !== 'object' || Object.keys(result).length === 0) {
      console.warn('AI returned empty or invalid result for drug card quiz, using fallback');
      return generateFallbackDrugCardQuiz(input);
    }
    
    // Ensure required fields exist
    if (!result.question || !Array.isArray(result.options) || !result.correct_answer || !result.explanation) {
      console.warn('AI result missing required fields, using fallback');
      return generateFallbackDrugCardQuiz(input);
    }

    console.log('✅ Drug card quiz generated successfully');
    return result;
  } catch (error) {
    console.error('❌ Error in drug card quiz generation:', error);
    console.log('🔄 Using fallback drug card quiz...');
    return generateFallbackDrugCardQuiz(input);
  }
}

function generateFallbackDrugCardQuiz(input: QuizGeneratorInput): QuizGeneratorOutput {
  console.log('📝 Generating fallback drug card quiz for:', input);
  
  return {
    question: `What is the primary therapeutic use of ${input.drugName}?`,
    options: [
      `A. Treatment of ${input.classification.toLowerCase()} conditions`,
      `B. Management of cardiovascular disease`,
      `C. Prevention of bacterial infections`,
      `D. Relief of pain and inflammation`
    ],
    correct_answer: `A. Treatment of ${input.classification.toLowerCase()} conditions`,
    explanation: `${input.drugName} is primarily used for treating ${input.classification.toLowerCase()} conditions. This drug belongs to the ${input.classification} class and is indicated for ${input.uses}. The other options are not the primary therapeutic uses of this medication.`
  };
}