
'use server';

/**
 * @fileOverview An AI dose calculator that calculates quantities for compounded preparations.
 *
 * - compoundingCalculator - A function that handles the compounding calculation process.
 * - CompoundingCalculatorInput - The input type for the function.
 * - CompoundingCalculatorOutput - The return type for the function.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const CompoundingCalculatorInputSchema = z.object({
  preparationType: z.enum(['w/v', 'v/v', 'w/w']).describe('The type of preparation (% w/v, % v/v, or % w/w).'),
  desiredVolumeMl: z.coerce.number().positive('Total volume must be a positive number.').optional().describe('The final volume of the preparation in mL. Required for w/v and v/v.'),
  desiredWeightG: z.coerce.number().positive('Total weight must be a positive number.').optional().describe('The final weight of the preparation in grams. Required for w/w.'),
  percentageStrength: z.coerce.number().positive('Percentage strength must be a positive number.'),
});
export type CompoundingCalculatorInput = z.infer<typeof CompoundingCalculatorInputSchema>;

const CompoundingCalculatorOutputSchema = z.object({
  soluteNeeded: z.string().describe('The calculated amount of solute needed, including units (g or mL).'),
  calculationSteps: z.string().describe('The step-by-step calculation, including the definition of the percentage strength used.'),
  explanation: z.string().describe('A brief explanation of this type of compounding calculation.'),
});
export type CompoundingCalculatorOutput = z.infer<typeof CompoundingCalculatorOutputSchema>;

export async function compoundingCalculator(input: CompoundingCalculatorInput): Promise<CompoundingCalculatorOutput> {
  // Basic validation to ensure the correct inputs are provided for the type
  if (input.preparationType.includes('v') && !input.desiredVolumeMl) {
      throw new Error('Desired volume (mL) is required for w/v and v/v preparations.');
  }
  if (input.preparationType === 'w/w' && !input.desiredWeightG) {
      throw new Error('Desired weight (g) is required for w/w preparations.');
  }

  const prompt = `You are an expert pharmacist calculating compounding quantities.

**Input:**
- Preparation Type: ${input.preparationType}
- Percentage Strength: ${input.percentageStrength}%
${input.desiredVolumeMl ? `- Desired Volume: ${input.desiredVolumeMl} mL` : ''}
${input.desiredWeightG ? `- Desired Weight: ${input.desiredWeightG} g` : ''}

**Instructions:**
1. Calculate the amount of solute needed based on the percentage strength
2. For w/v: (percentage/100) × volume in mL = solute in g
3. For v/v: (percentage/100) × volume in mL = solute in mL  
4. For w/w: (percentage/100) × weight in g = solute in g
5. Show all calculation steps clearly
6. Provide explanation of this compounding calculation

**Respond ONLY with this JSON format:**
{
  "soluteNeeded": "X.XX g (or mL)",
  "calculationSteps": "Step-by-step calculation with formulas",
  "explanation": "Brief explanation of this compounding calculation type"
}`;

  return generateStructuredResponse<CompoundingCalculatorOutput>(prompt);
}