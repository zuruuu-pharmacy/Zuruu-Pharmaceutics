
'use server';

/**
 * @fileOverview An AI dose calculator that calculates IV infusion rates.
 *
 * - ivRateCalculator - A function that handles the IV rate calculation process.
 * - IvRateCalculatorInput - The input type for the function.
 * - IvRateCalculatorOutput - The return type for the function.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const IvRateCalculatorInputSchema = z.object({
  totalVolumeMl: z.coerce.number().positive('Total volume must be a positive number.'),
  totalTimeMinutes: z.coerce.number().positive('Total time must be a positive number.'),
  dropFactorGttMl: z.coerce.number().positive('Drop factor must be a positive number.'),
});
export type IvRateCalculatorInput = z.infer<typeof IvRateCalculatorInputSchema>;

const IvRateCalculatorOutputSchema = z.object({
  infusionRateMlHr: z.string().describe('The calculated infusion rate in mL/hour, rounded to one decimal place.'),
  dropsPerMinute: z.string().describe('The calculated drop rate in drops/minute, rounded to the nearest whole number.'),
  mlHrCalculationSteps: z.string().describe('The step-by-step calculation for mL/hour.'),
  gttMinCalculationSteps: z.string().describe('The step-by-step calculation for drops/minute.'),
});
export type IvRateCalculatorOutput = z.infer<typeof IvRateCalculatorOutputSchema>;

export async function ivRateCalculator(input: IvRateCalculatorInput): Promise<IvRateCalculatorOutput> {
  const prompt = `You are an expert pharmacist calculating IV infusion rates.

**Input:**
- Total Volume: ${input.totalVolumeMl} mL
- Total Time: ${input.totalTimeMinutes} minutes
- Drop Factor: ${input.dropFactorGttMl} gtt/mL

**Instructions:**
1. Calculate infusion rate in mL/hour: (Volume ÷ Time) × 60
2. Calculate drops per minute: (Volume ÷ Time) × Drop Factor
3. Show all calculation steps clearly for both formulas
4. Round mL/hour to 1 decimal place
5. Round drops/minute to nearest whole number

**Respond ONLY with this JSON format:**
{
  "infusionRateMlHr": "XX.X mL/hour",
  "dropsPerMinute": "XX gtt/min",
  "mlHrCalculationSteps": "Step-by-step calculation for mL/hour",
  "gttMinCalculationSteps": "Step-by-step calculation for drops/minute"
}`;

  return generateStructuredResponse<IvRateCalculatorOutput>(prompt);
}