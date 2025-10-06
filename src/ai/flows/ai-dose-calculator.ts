
'use server';

/**
 * @fileOverview An AI dose calculator that calculates dosages based on patient-specific factors.
 *
 * - calculateDosage - A function that handles the dosage calculation process.
 * - CalculateDosageInput - The input type for the calculateDosage function.
 * - CalculateDosageOutput - The return type for the calculateDosage function.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const CalculateDosageInputSchema = z.object({
  drugName: z.string().describe('The name of the drug.'),
  patientWeightKg: z.number().describe('The patient\u2019s weight in kilograms.'),
  patientAgeYears: z.number().describe('The patient\u2019s age in years.'),
  indication: z.string().describe('The patient\'s condition or reason for taking the medication (e.g., "Community-acquired pneumonia").'),
  renalFunction: z
    .string()
    .optional()
    .describe('The patient\u2019s renal function (e.g., normal, mild impairment, severe impairment).'),
  hepaticFunction:
    z.string().optional().describe('The patient\u2019s hepatic function (e.g., normal, mild impairment, severe impairment).'),
  availableFormulations: z
    .string()
    .optional()
    .describe('Available formulations of the drug (e.g., 250mg tablets, 500mg tablets).'),
});

export type CalculateDosageInput = z.infer<typeof CalculateDosageInputSchema>;

const CalculateDosageOutputSchema = z.object({
  isIndicationMismatch: z.boolean().describe('Whether the drug is inappropriate for the given indication.'),
  mismatchWarning: z.string().optional().describe('A warning message if the indication is mismatched.'),
  calculatedDosage: z.string().optional().describe('The calculated dosage of the drug.'),
  calculationSteps: z.string().optional().describe('The steps taken to calculate the dosage, using general formulas.'),
  references: z.string().optional().describe('References or sources used for the dosage calculation.'),
  roundedDosageSuggestion: z
    .string()
    .optional()
    .describe('Suggested rounded dosage based on available formulations.'),
});

export type CalculateDosageOutput = z.infer<typeof CalculateDosageOutputSchema>;

export async function calculateDosage(input: CalculateDosageInput): Promise<CalculateDosageOutput> {
  const prompt = `You are an expert clinical pharmacist specializing in accurate drug dosage calculations based on patient-specific factors and clinical indications.

**CRITICAL EVALUATION STEP:**
First, carefully evaluate if the provided drug is appropriate for the given indication. Consider:

1. **Primary Indications**: Standard, FDA-approved uses
2. **Off-label Uses**: Clinically accepted but not FDA-approved uses
3. **Contraindications**: Drugs that should NOT be used for certain conditions
4. **Drug Class Appropriateness**: Whether the drug class is suitable for the condition

**Indication Matching Rules:**
- Set 'isIndicationMismatch' to TRUE only if the drug is:
  * Completely contraindicated for the condition
  * From a completely wrong therapeutic class (e.g., antibiotic for heart failure)
  * Known to worsen the condition
  * Not used in any clinical setting for this indication

- Set 'isIndicationMismatch' to FALSE for:
  * Standard approved indications
  * Common off-label uses with clinical evidence
  * Adjuvant or supportive therapy
  * When the indication is vague but could be reasonable

**Dosage Calculation Guidelines:**
- Use evidence-based dosing guidelines from major references (Lexicomp, Clinical Pharmacology, BNF, USP)
- Consider patient age, weight, renal/hepatic function
- Provide specific dosing ranges and frequencies
- Include loading doses when appropriate
- Consider drug interactions and contraindications
- Use standard clinical formulas (mg/kg/day, mg/m², etc.)

**Safety Rules:**
- Use leading zeros for decimals (0.5 mg, not .5 mg)
- Avoid trailing zeros (1 mg, not 1.0 mg)
- Include maximum daily dose limits
- Warn about dose adjustments needed for special populations

**Input Data:**
Drug Name: ${input.drugName}
Indication: ${input.indication}
Patient Weight: ${input.patientWeightKg} kg
Patient Age: ${input.patientAgeYears} years
Renal Function: ${input.renalFunction || 'Not specified'}
Hepatic Function: ${input.hepaticFunction || 'Not specified'}
Available Formulations: ${input.availableFormulations || 'Not specified'}

**Provide comprehensive, clinically accurate dosage information with detailed explanations.**

Respond ONLY with this JSON format:
{
  "isIndicationMismatch": false,
  "mismatchWarning": null,
  "calculatedDosage": "Specific dosage with frequency and route",
  "calculationSteps": "Detailed step-by-step calculation with formulas",
  "references": "Clinical references and guidelines used",
  "roundedDosageSuggestion": "Practical dosing recommendation based on available formulations"
}`;

  return generateStructuredResponse<CalculateDosageOutput>(prompt);
}
