
'use server';

/**
 * @fileOverview An AI-powered drug interaction engine.
 *
 * - checkDrugInteractions - A function that checks for drug interactions.
 * - CheckDrugInteractionsInput - The input type for the checkDrugInteractions function.
 * - CheckDrugInteractionsOutput - The return type for the checkDrugInteractions function.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const CheckDrugInteractionsInputSchema = z.object({
  medications: z
    .array(z.string())
    .describe('A list of medications to check for interactions.'),
  labResults: z
    .string()
    .optional()
    .describe('Additional relevant lab results to consider.'),
});
export type CheckDrugInteractionsInput = z.infer<
  typeof CheckDrugInteractionsInputSchema
>;

const CheckDrugInteractionsOutputSchema = z.object({
  interactions: z.array(z.object({
    severity: z.string().describe('The severity of the interaction (e.g., High, Moderate, Low).'),
    mechanism: z.string().describe('The mechanism of the interaction.'),
    suggestedActions: z.string().describe('Suggested actions or alternatives.'),
    interactingDrugs: z.array(z.string()).describe('The drugs (or food) involved in the interaction.'),
    clinicalConsequences: z.string().describe("The potential clinical outcomes of the interaction (e.g., 'Increased risk of bleeding', 'Serotonin syndrome')."),
    saferAlternative: z.string().optional().describe("A safer drug alternative, if one is clearly appropriate."),
    educationalNote: z.string().optional().describe("A brief educational note explaining the interaction simply.")
  })).describe('A list of drug interactions, including drug-food interactions.'),
});
export type CheckDrugInteractionsOutput = z.infer<
  typeof CheckDrugInteractionsOutputSchema
>;

export async function checkDrugInteractions(
  input: CheckDrugInteractionsInput
): Promise<CheckDrugInteractionsOutput> {
  const prompt = `You are an expert pharmacist analyzing drug interactions. Check for ALL types of interactions between the provided medications and common foods/substances.

**Instructions:**
1. Check for drug-drug interactions between all medications
2. Check for drug-food interactions (grapefruit, dairy, alcohol, etc.)
3. Check for drug-disease interactions
4. Assess severity levels (High, Moderate, Low)
5. Provide specific recommendations for each interaction

**Medications to analyze:** ${input.medications.join(', ')}
**Lab Results:** ${input.labResults || 'Not provided'}

**Common drug-food interactions to check:**
- Grapefruit juice interactions (inhibits CYP3A4)
- Dairy/calcium interactions (binds to medications)
- Alcohol interactions (affects drug metabolism)
- Caffeine interactions (stimulant effects)
- High-fat meal interactions (affects absorption)
- Vitamin/mineral interactions (affects absorption)

**For each interaction found, provide:**
- Severity level (High, Moderate, Low)
- Mechanism of how the interaction occurs
- Specific actions to take
- Which drugs/foods are involved
- Clinical consequences
- Safer alternatives if available
- Educational explanation

**IMPORTANT: Respond with ONLY this exact JSON format:**
{
  "interactions": [
    {
      "severity": "High",
      "mechanism": "Detailed mechanism explanation",
      "suggestedActions": "Specific recommendations",
      "interactingDrugs": ["Drug1", "Drug2 or Food"],
      "clinicalConsequences": "What happens if not managed",
      "saferAlternative": "Alternative if available",
      "educationalNote": "Simple explanation"
    }
  ]
}`;

  return generateStructuredResponse<CheckDrugInteractionsOutput>(prompt);
}