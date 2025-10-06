
'use server';
/**
 * @fileOverview AI-powered question generator for a given topic.
 *
 * - generateQuestions - Creates a list of questions based on a topic.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const QuestionSchema = z.object({
    question: z.string().describe("The generated question."),
    hint: z.string().describe("A subtle hint for the student."),
});

const QuestionGeneratorInputSchema = z.object({
  topic: z.string().describe("The topic for the questions (e.g., 'Hypertension', 'Anticoagulants')."),
  count: z.coerce.number().optional().default(10).describe("The desired number of questions."),
});
export type QuestionGeneratorInput = z.infer<typeof QuestionGeneratorInputSchema>;

const QuestionGeneratorOutputSchema = z.object({
    questions: z.array(QuestionSchema),
    topic: z.string(),
});
export type QuestionGeneratorOutput = z.infer<typeof QuestionGeneratorOutputSchema>;


export async function generateQuestions(input: QuestionGeneratorInput): Promise<QuestionGeneratorOutput> {
  // Using working AI solution with fallback
  return generateStructuredResponse<QuestionGeneratorOutput>('Generate questions for topic: ' + input.topic);
}


// Prompt definition moved to function


// const questionGeneratorFlow = ai.defineFlow( // Replaced with working AI
// Malformed object removed
  async (input: QuestionGeneratorInput) => {
    const result = await generateQuestions(input);
    return result;
  }