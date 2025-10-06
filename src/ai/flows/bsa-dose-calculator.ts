
'use server';

/**
 * @fileOverview An AI dose calculator that calculates dosages based on Body Surface Area (BSA).
 *
 * - bsaDoseCalculator - A function that handles the BSA-based dosage calculation process.
 * - BsaDoseCalculatorInput - The input type for the function.
 * - BsaDoseCalculatorOutput - The return type for the function.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const BsaDoseCalculatorInputSchema = z.object({
  drugName: z.string().describe('The name of the drug.'),
  patientWeightKg: z.number().describe('The patient\u2019s weight in kilograms.'),
  patientHeightCm: z.number().describe('The patient\u2019s height in centimeters.'),
  dosePerM2: z.string().describe('The prescribed dose per square meter (e.g., "100mg/m²", "300 mg/m^2").'),
});

export type BsaDoseCalculatorInput = z.infer<typeof BsaDoseCalculatorInputSchema>;

const BsaDoseCalculatorOutputSchema = z.object({
  bodySurfaceArea: z.string().describe('The calculated Body Surface Area (BSA) in m², rounded to two decimal places.'),
  totalDose: z.string().describe('The calculated total dose of the drug, including units.'),
  calculationSteps: z.string().describe('The steps taken to calculate the dosage, showing the formula and substitution.'),
  explanation: z.string().describe('A brief explanation of BSA-based dosing and its common uses.'),
});

export type BsaDoseCalculatorOutput = z.infer<typeof BsaDoseCalculatorOutputSchema>;

export async function bsaDoseCalculator(input: BsaDoseCalculatorInput): Promise<BsaDoseCalculatorOutput> {
  const prompt = `You are an expert pharmacist calculating BSA-based dosages.

**Input:**
- Drug: ${input.drugName}
- Patient Weight: ${input.patientWeightKg} kg
- Patient Height: ${input.patientHeightCm} cm
- Dose per m²: ${input.dosePerM2}

**Instructions:**
1. Calculate BSA using the Mosteller formula: BSA = √((height × weight)/3600)
2. Calculate total dose: BSA × dose per m²
3. Show all calculation steps clearly
4. Provide explanation of BSA-based dosing

**Respond ONLY with this JSON format:**
{
  "bodySurfaceArea": "X.XX m²",
  "totalDose": "XXX mg",
  "calculationSteps": "Step-by-step calculation with formulas",
  "explanation": "Brief explanation of BSA-based dosing and its uses"
}`;

  return generateStructuredResponse<BsaDoseCalculatorOutput>(prompt);
}