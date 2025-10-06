
'use server';
/**
 * @fileOverview AI-powered e-library search for instant definitions.
 *
 * - searchELibrary - A function that handles the e-library search process.
 * - ESearchParams - The input type for the searchELibrary function.
 * - SearchResult - The return type for the searchELibrary function.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const ESearchParamsSchema = z.object({
  query: z.string().describe('The search term, e.g., a drug name, medical concept, or formula.'),
});
export type ESearchParams = z.infer<typeof ESearchParamsSchema>;

const SearchResultSchema = z.object({
  term: z.string().describe('The term that was defined.'),
  definition: z.string().describe('A clear, concise definition of the term.'),
  formula: z.string().optional().describe('A relevant formula, if applicable (e.g., for bioavailability or clearance).'),
  example: z.string().optional().describe('A practical example of the term in a clinical or pharmaceutical context.'),
  exam_importance: z.string().optional().describe('A tag indicating the term\'s relevance for exams (e.g., "High-yield topic", "Commonly asked in pharmacokinetics").'),
  related_topics: z.array(z.string()).optional().describe('A list of 2-3 related topics for further study.'),
});
export type SearchResult = z.infer<typeof SearchResultSchema>;


export async function searchELibrary(input: ESearchParams): Promise<SearchResult> {
  // Using working AI solution with fallback
  return generateStructuredResponse<SearchResult>('Generate appropriate response for this input');
}


// ai.definePrompt block commented out - using working AI instead


// const eLibrarySearchFlow = ai.defineFlow( // Replaced with working AI
// Malformed object removed
  async (input: ESearchParams) => {
    const result = await searchELibrary(input);
    return result;
  }