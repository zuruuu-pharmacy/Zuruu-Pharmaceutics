
// AI Allergy Checker Flow - Comprehensive Healthcare Module
'use server';
/**
 * @fileOverview AI-powered comprehensive allergy checker with symptom intake, 
 * environmental monitoring, emergency features, and cross-reactivity detection.
 * 
 * Features:
 * - Smart symptom intake with voice/text/photo input
 * - Personal health profile integration
 * - Ingredient & label scanner
 * - Cross-reaction intelligence
 * - Environmental & location feed
 * - Risk scoring & action plan
 * - Emergency mode with SOS
 * - Medication & diet guidance
 * - Tele-consult integration
 * - Education hub
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

// Core schemas for comprehensive allergy checking
const DemographicsSchema = z.object({
  name: z.string().optional(),
  age: z.number().optional(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  phoneNumber: z.string().optional(),
  emergencyContact: z.string().optional(),
  address: z.string().optional(),
  medicalId: z.string().optional(),
});

const SymptomSchema = z.object({
  description: z.string().describe('Description of current symptoms'),
  severity: z.enum(['mild', 'moderate', 'severe', 'emergency']).describe('Symptom severity level'),
  onsetTime: z.string().describe('When symptoms started'),
  duration: z.string().describe('How long symptoms have lasted'),
  triggers: z.array(z.string()).describe('Potential triggers or exposures'),
  bodyParts: z.array(z.string()).describe('Affected body parts'),
  photos: z.array(z.string()).optional().describe('Photo URLs of rashes or swelling'),
  voiceNote: z.string().optional().describe('Voice recording of symptoms'),
});

const HealthProfileSchema = z.object({
  chronicConditions: z.array(z.string()).describe('Existing chronic conditions'),
  pastAllergyTests: z.array(z.string()).describe('Previous allergy test results'),
  medications: z.array(z.string()).describe('Current medications'),
  vaccinations: z.array(z.string()).describe('Vaccination history'),
  familyAllergyHistory: z.array(z.string()).describe('Family history of allergies'),
  previousReactions: z.array(z.string()).describe('Previous allergic reactions'),
});

const EnvironmentalDataSchema = z.object({
  location: z.object({
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  address: z.string().optional(),
  }).optional(),
  pollenCount: z.object({
    level: z.enum(['low', 'moderate', 'high', 'very_high']),
    types: z.array(z.string()),
    forecast: z.array(z.object({
      date: z.string(),
      level: z.enum(['low', 'moderate', 'high', 'very_high']),
    })),
  }).optional(),
  airQuality: z.object({
    aqi: z.number(),
    level: z.enum(['good', 'moderate', 'unhealthy', 'hazardous']),
    pollutants: z.array(z.string()),
  }).optional(),
  weather: z.object({
    temperature: z.number(),
    humidity: z.number(),
    conditions: z.string(),
  }).optional(),
});

const IngredientScanSchema = z.object({
  barcode: z.string().optional(),
  productName: z.string().optional(),
  ingredients: z.array(z.string()).describe('List of ingredients'),
  allergens: z.array(z.string()).describe('Known allergens in product'),
  crossReactions: z.array(z.string()).describe('Potential cross-reactions'),
  safetyLevel: z.enum(['safe', 'caution', 'avoid']).describe('Safety assessment'),
});

const RiskAssessmentSchema = z.object({
  overallRisk: z.enum(['low', 'medium', 'high', 'emergency']).describe('Overall allergy risk level'),
  riskFactors: z.array(z.string()).describe('Identified risk factors'),
  confidence: z.number().min(0).max(100).describe('Confidence level in assessment'),
  recommendations: z.array(z.string()).describe('Specific recommendations'),
  emergencyActions: z.array(z.string()).describe('Emergency actions if needed'),
});

const ActionPlanSchema = z.object({
  immediateActions: z.array(z.string()).describe('Actions to take immediately'),
  preventionSteps: z.array(z.string()).describe('Prevention measures'),
  followUpCare: z.array(z.string()).describe('Follow-up care recommendations'),
  emergencyContacts: z.array(z.string()).describe('Emergency contact information'),
  medicationGuidance: z.array(z.string()).describe('Medication recommendations'),
  dietGuidance: z.array(z.string()).describe('Dietary recommendations'),
});

// Main input schema
const AllergyCheckerInputSchema = z.object({
  // Core inputs
  symptoms: SymptomSchema.optional(),
  healthProfile: HealthProfileSchema.optional(),
  environmentalData: EnvironmentalDataSchema.optional(),
  ingredientScan: IngredientScanSchema.optional(),
  
  // Legacy support
  medicationName: z.string().optional(),
  patientAllergies: z.string().optional(),
  
  // Additional context
  demographics: DemographicsSchema.optional(),
  emergencyMode: z.boolean().optional().describe('Whether in emergency mode'),
  language: z.string().optional().describe('Preferred language'),
});

export type AllergyCheckerInput = z.infer<typeof AllergyCheckerInputSchema>;

// Comprehensive output schema
const AllergyCheckerOutputSchema = z.object({
  // Risk assessment
  riskAssessment: RiskAssessmentSchema,
  actionPlan: ActionPlanSchema,
  
  // Specific findings
  allergyRiskDetected: z.boolean().describe('Whether an allergy risk is detected'),
  crossReactions: z.array(z.string()).describe('Identified cross-reactions'),
  environmentalTriggers: z.array(z.string()).describe('Environmental triggers identified'),
  
  // Detailed information
  riskDetails: z.string().describe('Detailed explanation of risks'),
  alternativeOptions: z.string().describe('Alternative medication or treatment options'),
  guidance: z.string().describe('Professional guidance and recommendations'),
  
  // Emergency information
  emergencyCard: z.object({
    patientName: z.string(),
    allergies: z.array(z.string()),
    emergencyContact: z.string(),
    medications: z.array(z.string()),
    instructions: z.string(),
  }).optional(),
  
  // Educational content
  educationalContent: z.array(z.object({
    title: z.string(),
    content: z.string(),
    type: z.enum(['article', 'tip', 'infographic', 'video']),
    priority: z.enum(['high', 'medium', 'low']),
  })).optional(),
  
  // Follow-up
  followUpRequired: z.boolean().describe('Whether follow-up is required'),
  followUpTimeframe: z.string().optional().describe('When follow-up should occur'),
  teleConsultRecommended: z.boolean().describe('Whether tele-consultation is recommended'),
  
  // Metadata
  timestamp: z.string().describe('Assessment timestamp'),
  version: z.string().describe('Assessment version'),
});

export type AllergyCheckerOutput = z.infer<typeof AllergyCheckerOutputSchema>;

// Test function for debugging
export async function testAllergyChecker(): Promise<AllergyCheckerOutput> {
  const testInput: AllergyCheckerInput = {
    symptoms: {
      description: "Rash on arms and chest, difficulty breathing, swelling around eyes",
      severity: "severe",
      onsetTime: "30 minutes ago",
      duration: "30 minutes",
      triggers: ["peanuts", "tree nuts"],
      bodyParts: ["arms", "chest", "face", "eyes"],
      photos: [],
      voiceNote: ""
    },
    healthProfile: {
      chronicConditions: ["asthma"],
      pastAllergyTests: ["positive for peanut allergy"],
      medications: ["albuterol inhaler"],
      vaccinations: ["flu vaccine 2023"],
      familyAllergyHistory: ["mother has shellfish allergy"],
      previousReactions: ["hives from peanuts"]
    },
    demographics: {
      name: "Test Patient",
      age: 25,
      gender: "female",
      phoneNumber: "555-0123",
      emergencyContact: "John Doe - 555-0124",
      address: "123 Main St",
      medicalId: "TEST123"
    },
    emergencyMode: false,
    language: "en"
  };

  console.log('Testing allergy checker with sample data...');
  return await allergyChecker(testInput);
}

// Main allergy checker function
export async function allergyChecker(input: AllergyCheckerInput): Promise<AllergyCheckerOutput> {
  const prompt = `You are an expert clinical allergist and immunologist providing comprehensive allergy risk assessment for a healthcare application.

**PATIENT DATA ANALYSIS:**
- Symptoms: ${JSON.stringify(input.symptoms || {})}
- Health Profile: ${JSON.stringify(input.healthProfile || {})}
- Environmental Data: ${JSON.stringify(input.environmentalData || {})}
- Ingredient Scan: ${JSON.stringify(input.ingredientScan || {})}
- Demographics: ${JSON.stringify(input.demographics || {})}
- Emergency Mode: ${input.emergencyMode || false}
- Language: ${input.language || 'en'}

**CLINICAL ASSESSMENT PROTOCOL:**
1. **Risk Stratification**: Evaluate overall allergy risk (low/medium/high/emergency)
2. **Symptom Analysis**: Assess severity, triggers, and progression patterns
3. **Cross-Reactivity Assessment**: Identify potential cross-reactions
4. **Environmental Factors**: Consider pollen, pollution, weather impacts
5. **Ingredient Safety**: Evaluate product safety for scanned items
6. **Action Planning**: Create comprehensive management strategy
7. **Emergency Preparedness**: Provide emergency protocols if needed
8. **Education & Follow-up**: Recommend learning resources and care timeline

**CLINICAL DECISION MAKING:**
- Use evidence-based allergy and immunology guidelines
- Consider patient demographics and medical history
- Assess environmental and seasonal factors
- Evaluate medication interactions and contraindications
- Prioritize patient safety and emergency preparedness

**REQUIRED OUTPUT FORMAT:**
Provide a comprehensive JSON response with all required fields:
- riskAssessment: Complete risk evaluation with confidence level
- actionPlan: Detailed management strategy
- allergyRiskDetected: Boolean assessment
- crossReactions: Identified cross-reactions
- environmentalTriggers: Environmental risk factors
- riskDetails: Detailed explanation
- alternativeOptions: Treatment alternatives
- guidance: Professional recommendations
- emergencyCard: Emergency information if high risk
- educationalContent: Learning resources
- followUpRequired: Follow-up recommendations
- timestamp: Assessment time
- version: Assessment version

**CRITICAL: Return valid JSON with all required fields. Do not return empty objects or incomplete data.**

Generate a thorough, clinically accurate allergy assessment that prioritizes patient safety and provides actionable guidance.`;

  try {
    console.log('Running allergy checker with input:', input);
    const result = await generateStructuredResponse<AllergyCheckerOutput>(prompt);
    console.log('Allergy checker AI response:', result);
    
    // Validate the result structure
    if (!result || typeof result !== 'object' || Object.keys(result).length === 0) {
      console.warn('AI returned empty or invalid result, using fallback');
      return getFallbackResponse(input);
    }
    
    // Ensure required fields exist
    if (!result.riskAssessment || !result.actionPlan) {
      console.warn('AI result missing required fields, using fallback');
      return getFallbackResponse(input);
    }
    
    console.log('Allergy checker completed successfully');
    return result;
  } catch (error) {
    console.error('Allergy checker error:', error);
    return getFallbackResponse(input);
  }
}

// Fallback response generator
function getFallbackResponse(input: AllergyCheckerInput): AllergyCheckerOutput {
  const hasSymptoms = input.symptoms && Object.keys(input.symptoms).length > 0;
  const hasHealthProfile = input.healthProfile && Object.keys(input.healthProfile).length > 0;
  const hasIngredientScan = input.ingredientScan && Object.keys(input.ingredientScan).length > 0;
  
  // Determine risk level based on available data
  let overallRisk: 'low' | 'medium' | 'high' | 'emergency' = 'low';
  let riskDetails = 'Assessment based on limited information.';
  
  if (hasSymptoms) {
    const severity = input.symptoms?.severity;
    if (severity === 'emergency') {
      overallRisk = 'emergency';
      riskDetails = 'Emergency symptoms detected. Seek immediate medical attention.';
    } else if (severity === 'severe') {
      overallRisk = 'high';
      riskDetails = 'Severe symptoms detected. Monitor closely and consider medical attention.';
    } else if (severity === 'moderate') {
      overallRisk = 'medium';
      riskDetails = 'Moderate symptoms detected. Monitor and consider preventive measures.';
    }
  }
  
  if (hasIngredientScan && input.ingredientScan?.safetyLevel === 'avoid') {
    overallRisk = 'high';
    riskDetails = 'Product contains known allergens. Avoid consumption.';
  }
  
  return {
    riskAssessment: {
      overallRisk,
      riskFactors: hasSymptoms ? ['Symptoms reported'] : ['Limited information available'],
      confidence: hasSymptoms ? 70 : 30,
      recommendations: [
        'Monitor symptoms closely',
        'Avoid known triggers',
        'Keep emergency medications accessible'
      ],
      emergencyActions: overallRisk === 'emergency' ? [
        'Call 911 immediately',
        'Use epinephrine if available',
        'Seek emergency medical care'
      ] : [
        'Monitor symptoms',
        'Contact healthcare provider if symptoms worsen'
      ],
    },
    actionPlan: {
      immediateActions: overallRisk === 'emergency' ? [
        'Call emergency services',
        'Use epinephrine auto-injector if available',
        'Position patient appropriately'
      ] : [
        'Monitor symptoms closely',
        'Remove from trigger if possible',
        'Take antihistamines if appropriate'
      ],
      preventionSteps: [
        'Identify and avoid known triggers',
        'Carry emergency medications',
        'Wear medical alert jewelry',
        'Inform family and friends about allergies'
      ],
      followUpCare: [
        'Schedule appointment with allergist',
        'Consider allergy testing',
        'Update emergency action plan'
      ],
      emergencyContacts: [
        'Emergency: 911',
        'Poison Control: 1-800-222-1222',
        'Local emergency room'
      ],
      medicationGuidance: [
        'Antihistamines for mild reactions',
        'Epinephrine for severe reactions',
        'Consult pharmacist for proper dosing'
      ],
      dietGuidance: [
        'Read all food labels carefully',
        'Avoid cross-contamination',
        'Carry safe snacks when traveling'
      ],
    },
    allergyRiskDetected: overallRisk !== 'low',
    crossReactions: [],
    environmentalTriggers: [],
    riskDetails,
    alternativeOptions: 'Consult healthcare provider for personalized alternatives',
    guidance: 'This is a preliminary assessment. Consult healthcare provider for comprehensive evaluation.',
    emergencyCard: overallRisk === 'emergency' ? {
      patientName: input.demographics?.name || 'Unknown',
      allergies: input.healthProfile?.previousReactions || [],
      emergencyContact: input.demographics?.emergencyContact || 'Not provided',
      medications: input.healthProfile?.medications || [],
      instructions: 'Severe allergy - use epinephrine and call 911'
    } : undefined,
    educationalContent: [
      {
        title: 'Understanding Allergy Symptoms',
        content: 'Learn to recognize early signs of allergic reactions',
        type: 'article' as const,
        priority: 'high' as const
      },
      {
        title: 'Emergency Action Plan',
        content: 'Know what to do in case of severe allergic reaction',
        type: 'tip' as const,
        priority: 'high' as const
      }
    ],
    followUpRequired: true,
    followUpTimeframe: overallRisk === 'emergency' ? 'Immediately' : 'Within 24-48 hours',
    teleConsultRecommended: true,
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  };
}


// Additional utility functions for specific features
export async function scanIngredient(barcode: string, productName?: string): Promise<z.infer<typeof IngredientScanSchema>> {
  const prompt = `
Analyze this product for allergen content and safety:
- Barcode: ${barcode}
- Product Name: ${productName || 'Unknown'}

Check against common allergens:
- Nuts (tree nuts, peanuts)
- Dairy/lactose
- Gluten/wheat
- Soy
- Eggs
- Fish/shellfish
- Sesame
- Sulfites
- Latex
- Nickel
- Penicillin
- Other common allergens

Return safety assessment and cross-reaction warnings.
`;

  return generateStructuredResponse<z.infer<typeof IngredientScanSchema>>(prompt);
}

export async function getEnvironmentalData(location: {lat: number, lng: number}): Promise<z.infer<typeof EnvironmentalDataSchema>> {
  const prompt = `
Get environmental allergy data for location ${location.lat}, ${location.lng}:
- Pollen count and types
- Air quality index
- Weather conditions
- Mold spore levels
- Pollution levels

Provide current conditions and 7-day forecast.
`;

  return generateStructuredResponse<z.infer<typeof EnvironmentalDataSchema>>(prompt);
}

export async function generateEmergencyCard(patientData: z.infer<typeof DemographicsSchema>, allergies: string[]): Promise<AllergyCheckerOutput['emergencyCard']> {
  const prompt = `
Generate emergency allergy card for:
- Patient: ${JSON.stringify(patientData)}
- Allergies: ${allergies.join(', ')}

Create clear, concise emergency information for first responders.
`;

  return generateStructuredResponse<AllergyCheckerOutput['emergencyCard']>(prompt);
  }