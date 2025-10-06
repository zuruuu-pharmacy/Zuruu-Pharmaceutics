
'use server';
/**
 * @fileOverview Digital Formulary Reference & Comparison Tool
 *
 * - drugFormularyLookup - A function that handles the drug formulary lookup process.
 * - DrugFormularyInput - The input type for the drugFormularyLookup function.
 * - DrugFormularyOutput - The return type for the drugFormularyLookup function.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const DrugFormularyInputSchema = z.object({
  drugName: z.string().describe('The generic name of the drug to look up.'),
});
export type DrugFormularyInput = z.infer<typeof DrugFormularyInputSchema>;

const DrugFormularyOutputSchema = z.object({
  genericName: z.string().describe('The official generic name (INN) of the drug.'),
  brandNames: z.string().describe('A comma-separated list of common local and international brand names.'),
  therapeuticClass: z.string().describe('The primary therapeutic and pharmacological class of the drug.'),
  dosageForms: z.string().describe('A list of available dosage forms and their strengths (e.g., "Tablet: 250mg, 500mg; Suspension: 125mg/5mL").'),
  mechanismOfAction: z.string().describe('Detailed explanation of how the drug works at the molecular and cellular level.'),
  pharmacokinetics: z.string().describe('Information about absorption, distribution, metabolism, and excretion of the drug.'),
  dosing: z.object({
      adult: z.string().describe('Comprehensive adult dosing guidelines with specific ranges, routes, and frequencies.'),
      pediatric: z.string().describe('Detailed pediatric dosing guidelines with age-specific recommendations.'),
      geriatric: z.string().describe('Special considerations for elderly patients.'),
      renalImpairment: z.string().describe('Detailed dosing adjustments for different stages of renal impairment.'),
      hepaticImpairment: z.string().describe('Dosing adjustments for patients with hepatic impairment.'),
      pregnancy: z.string().describe('Dosing considerations during pregnancy and lactation.'),
  }),
  indications: z.string().describe('Comprehensive list of approved and common off-label clinical uses with detailed descriptions.'),
  contraindicationsAndWarnings: z.string().describe('Detailed list of absolute contraindications and key warnings/precautions.'),
  adverseDrugReactions: z.string().describe('Comprehensive list of common and serious adverse drug reactions with frequency and severity.'),
  drugInteractions: z.string().describe('Detailed summary of clinically significant drug-drug and drug-food interactions.'),
  monitoringParameters: z.string().describe('Laboratory tests and clinical parameters that should be monitored.'),
  formularyComparisonNotes: z.string().describe('Detailed comparison of key differences between major formularies.'),
  therapeuticAlternatives: z.string().describe('Alternative medications with similar therapeutic effects and comparison notes.'),
  clinicalNotes: z.string().describe('Important clinical pearls and practical considerations for healthcare providers.'),
});
export type DrugFormularyOutput = z.infer<typeof DrugFormularyOutputSchema>;

export async function drugFormularyLookup(input: DrugFormularyInput): Promise<DrugFormularyOutput> {
  const prompt = `You are an expert clinical pharmacist providing comprehensive, detailed drug monograph information for healthcare professionals.

**Drug Name:** ${input.drugName}

**Instructions:**
Provide a complete, evidence-based drug monograph with the following requirements:

1. **Comprehensive Coverage**: Include all essential clinical information with detailed explanations
2. **Evidence-Based**: Use current, peer-reviewed information and clinical guidelines
3. **Practical Focus**: Emphasize clinically relevant information for daily practice
4. **Detailed Descriptions**: Each section should be thoroughly explained, not just listed
5. **Safety Emphasis**: Highlight critical safety considerations and monitoring requirements
6. **Clinical Pearls**: Include practical tips and important considerations for healthcare providers

**For each section, provide:**
- **Mechanism of Action**: Detailed molecular and cellular explanation of how the drug works
- **Pharmacokinetics**: Comprehensive ADME (Absorption, Distribution, Metabolism, Excretion) profile
- **Dosing**: Specific ranges, frequencies, and special population considerations
- **Indications**: Detailed descriptions of approved and off-label uses with clinical context
- **Contraindications**: Comprehensive safety profile with specific patient populations
- **Adverse Reactions**: Frequency, severity, and management strategies
- **Drug Interactions**: Clinical significance and management recommendations
- **Monitoring**: Specific laboratory tests and clinical parameters to monitor
- **Clinical Notes**: Practical pearls and important considerations for prescribers

**Format Requirements:**
- Use clear, professional medical language
- Include specific dosing ranges and frequencies
- Provide detailed explanations, not just bullet points
- Emphasize safety considerations and monitoring requirements
- Include practical clinical guidance and pearls

**Respond ONLY with this comprehensive JSON format:**
{
  "genericName": "Official generic name (INN)",
  "brandNames": "Comma-separated list of major brand names",
  "therapeuticClass": "Detailed therapeutic and pharmacological classification",
  "dosageForms": "Available formulations with specific strengths",
  "mechanismOfAction": "Detailed explanation of molecular and cellular mechanisms",
  "pharmacokinetics": "Comprehensive ADME profile with specific parameters",
  "dosing": {
    "adult": "Detailed adult dosing with specific ranges and frequencies",
    "pediatric": "Age-specific pediatric dosing guidelines",
    "geriatric": "Special considerations for elderly patients",
    "renalImpairment": "Detailed dosing adjustments for different CKD stages",
    "hepaticImpairment": "Dosing considerations for liver dysfunction",
    "pregnancy": "Pregnancy and lactation considerations"
  },
  "indications": "Comprehensive list with detailed clinical descriptions",
  "contraindicationsAndWarnings": "Detailed safety profile and contraindications",
  "adverseDrugReactions": "Comprehensive ADR list with frequency and severity",
  "drugInteractions": "Detailed interaction profile with clinical significance",
  "monitoringParameters": "Specific laboratory and clinical monitoring requirements",
  "formularyComparisonNotes": "Detailed formulary differences and considerations",
  "therapeuticAlternatives": "Alternative medications with comparison notes",
  "clinicalNotes": "Important clinical pearls and practical considerations"
}`;

  return generateStructuredResponse<DrugFormularyOutput>(prompt);
}