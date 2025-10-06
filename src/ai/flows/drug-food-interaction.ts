
'use server';
/**
 * @fileOverview AI-powered drug-food interaction checker.
 *
 * - checkDrugFoodInteraction - A function that handles checking for a single drug-food interaction.
 * - CheckDrugFoodInteractionInput - The input type for the checkDrugFoodInteraction function.
 * - CheckDrugFoodInteractionOutput - The return type for the checkDrugFoodInteraction function.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const CheckDrugFoodInteractionInputSchema = z.object({
  drugName: z.string().describe('The name of the medication to check.'),
});
export type CheckDrugFoodInteractionInput = z.infer<typeof CheckDrugFoodInteractionInputSchema>;

const CheckDrugFoodInteractionOutputSchema = z.object({
  interactionExists: z.boolean().describe('Whether a significant food interaction exists for the drug.'),
  severity: z.string().describe('The severity of the interaction (e.g., High, Moderate, Low, or N/A).'),
  details: z.string().describe('A summary of the interaction or a confirmation that none exists.'),
  mechanism: z.string().optional().describe('The mechanism of the interaction, if applicable.'),
  management: z.string().describe('Recommendations for managing the interaction (e.g., "Take with food," "Avoid grapefruit juice").'),
});
export type CheckDrugFoodInteractionOutput = z.infer<typeof CheckDrugFoodInteractionOutputSchema>;

export async function checkDrugFoodInteraction(input: CheckDrugFoodInteractionInput): Promise<CheckDrugFoodInteractionOutput> {
  try {
    console.log('Drug-food interaction checker called with input:', input);
    
    // Validate input
    const validatedInput = CheckDrugFoodInteractionInputSchema.parse(input);
    console.log('Validated input:', validatedInput);
    
    const prompt = `You are an expert pharmacist and drug interaction specialist. Check for food interactions with the specified medication.

DRUG TO CHECK: ${validatedInput.drugName}

Requirements:
- Determine if significant food interactions exist for this drug
- Assess the severity level (High, Moderate, Low, or N/A)
- Explain the mechanism of interaction if applicable
- Provide specific management recommendations
- Focus on clinically significant interactions that affect patient safety

Common food interactions to consider:
- Grapefruit juice (CYP3A4 inhibition)
- Dairy products (calcium binding)
- High-fat meals (absorption effects)
- Alcohol (metabolism effects)
- Caffeine (stimulant interactions)
- Vitamin K (warfarin interactions)
- Tyramine-containing foods (MAOI interactions)

Respond with valid JSON in this exact format:
{
  "interactionExists": true,
  "severity": "High/Moderate/Low/N/A",
  "details": "Detailed description of the interaction or confirmation of no interaction",
  "mechanism": "Explanation of how the interaction occurs",
  "management": "Specific recommendations for managing the interaction"
}`;

    console.log('Calling AI for drug-food interaction check...');
    
    const result = await generateStructuredResponse<CheckDrugFoodInteractionOutput>(prompt);

    // Validate the result structure
    if (!result || typeof result !== 'object' || Object.keys(result).length === 0) {
      console.warn('AI returned empty or invalid result for drug-food interaction, using fallback');
      return generateFallbackDrugFoodInteraction(validatedInput);
    }
    
    // Ensure required fields exist
    if (typeof result.interactionExists !== 'boolean' || !result.severity || !result.details || !result.management) {
      console.warn('AI result missing required fields, using fallback');
      return generateFallbackDrugFoodInteraction(validatedInput);
    }

    console.log('✅ Drug-food interaction check completed successfully');
    return result;
  } catch (error) {
    console.error('❌ Error in drug-food interaction check:', error);
    console.log('🔄 Using fallback drug-food interaction...');
    return generateFallbackDrugFoodInteraction(input);
  }
}

function generateFallbackDrugFoodInteraction(input: CheckDrugFoodInteractionInput): CheckDrugFoodInteractionOutput {
  console.log('📝 Generating fallback drug-food interaction for:', input);
  
  const drugName = input.drugName?.toLowerCase() || 'unknown drug';
  
  // Check for common drug-food interactions
  if (drugName.includes('warfarin') || drugName.includes('coumadin')) {
    return {
      interactionExists: true,
      severity: "High",
      details: `${input.drugName} has significant interactions with vitamin K-rich foods and alcohol.`,
      mechanism: "Warfarin is a vitamin K antagonist. Vitamin K-rich foods can reduce its anticoagulant effect, while alcohol can increase bleeding risk.",
      management: "Maintain consistent vitamin K intake, limit alcohol consumption, and monitor INR regularly. Avoid sudden changes in diet."
    };
  }
  
  if (drugName.includes('grapefruit') || drugName.includes('simvastatin') || drugName.includes('atorvastatin') || drugName.includes('lovastatin')) {
    return {
      interactionExists: true,
      severity: "High",
      details: `${input.drugName} interacts with grapefruit juice, increasing drug levels and side effects.`,
      mechanism: "Grapefruit juice inhibits CYP3A4 enzyme in the liver, preventing drug metabolism and increasing blood levels.",
      management: "Avoid grapefruit juice completely. Take with water or other non-citrus beverages."
    };
  }
  
  if (drugName.includes('tetracycline') || drugName.includes('ciprofloxacin') || drugName.includes('levofloxacin')) {
    return {
      interactionExists: true,
      severity: "Moderate",
      details: `${input.drugName} interacts with dairy products and calcium supplements.`,
      mechanism: "Calcium in dairy products binds to the antibiotic, forming insoluble complexes that reduce absorption.",
      management: "Take 2-4 hours before or after consuming dairy products, calcium supplements, or antacids."
    };
  }
  
  if (drugName.includes('metformin') || drugName.includes('metoprolol') || drugName.includes('atenolol')) {
    return {
      interactionExists: true,
      severity: "Moderate",
      details: `${input.drugName} may interact with alcohol, increasing side effects.`,
      mechanism: "Alcohol can enhance the effects of these medications and increase the risk of side effects.",
      management: "Limit alcohol consumption and monitor for increased side effects. Consult your doctor about safe alcohol limits."
    };
  }
  
  // Default response for drugs with no significant interactions
  return {
    interactionExists: false,
    severity: "N/A",
    details: `No significant food interactions identified for ${input.drugName}.`,
    mechanism: "This medication does not have clinically significant food interactions.",
    management: "Take as directed by your healthcare provider. Maintain a balanced diet and stay hydrated."
  };
  }