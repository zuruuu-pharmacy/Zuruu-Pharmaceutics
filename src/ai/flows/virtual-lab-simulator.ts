
'use server';
/**
 * @fileOverview AI-powered Standard Operating Procedure (SOP) generator for pharmacy labs.
 *
 * - generateSop - A function that creates a comprehensive SOP for a given experiment.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

// Define the detailed input schema
const SopGeneratorInputSchema = z.object({
  experimentTitle: z.string().describe("The title of the lab experiment for which to generate the SOP."),
});
export type SopGeneratorInput = z.infer<typeof SopGeneratorInputSchema>;

// Define the detailed output schema matching the user's specification
const SopGeneratorOutputSchema = z.object({
  title: z.string().describe("The official title of the experiment."),
  objectives: z.array(z.string()).describe("A list of clear learning objectives."),
  theory: z.string().describe("A concise explanation of the experiment's principle, mechanism, and relevance."),
  requirements: z.object({
    reagents: z.array(z.string()).describe("List of all reagents, chemicals, and drugs with concentrations."),
    instruments: z.array(z.string()).describe("List of all required instruments and glassware."),
    consumables: z.array(z.string()).describe("List of consumables like gloves, tips, etc."),
    special: z.string().optional().describe("Special requirements like animal models or biosafety cabinets, including ethical notes."),
  }),
  procedure: z.array(z.string()).describe("A numbered, step-by-step procedure for the experiment."),
  observationGuidelines: z.string().describe("What the student should observe and how to record it, including sample table formats."),
  resultAndInterpretation: z.string().describe("How to state the result and interpret the expected outcomes, including error analysis."),
  safetyPrecautions: z.string().describe("A summary of lab-specific hazards, waste disposal, and emergency steps."),
  diagramUrl: z.string().optional().describe("A URL to a generated diagram or a simple text-based flowchart."),
  vivaVoce: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).describe("A list of 5-10 viva-voce questions with their suggested answers."),
  commonErrors: z.string().describe("A list of common errors students make and how to troubleshoot them."),
  virtualLabSimulation: z.string().describe("A narrative for a step-by-step virtual simulation of the experiment."),
  labReportTemplate: z.string().describe("A simple template structure for the student's lab report."),
  complianceNotes: z.string().describe("Notes on relevance to GLP, GMP, CPCSEA, or Biosafety levels."),
});
export type SopGeneratorOutput = z.infer<typeof SopGeneratorOutputSchema>;

export async function generateSop(input: SopGeneratorInput): Promise<SopGeneratorOutput> {
  // Using working AI solution with fallback
  return generateStructuredResponse<SopGeneratorOutput>('Generate SOP for experiment: ' + input.experimentTitle);
}


// Prompt definition moved to function


// const sopGeneratorFlow = ai.defineFlow( // Replaced with working AI
// Malformed object removed
  async (input: SopGeneratorInput) => {
    const result = await generateSop(input);
    return result;
  }