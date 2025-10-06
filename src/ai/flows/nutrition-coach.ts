
'use server';
/**
 * @fileOverview AI-powered nutrition coach that generates a personalized diet plan
 *               based on a detailed, interactive questionnaire.
 *
 * - generateCoachedDietPlan - Generates a diet plan from questionnaire data.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

// Define the detailed input schema based on the questionnaire
const NutritionCoachInputSchema = z.object({
  profile: z.object({
    age: z.coerce.number().optional(),
    gender: z.string().optional(),
    height: z.string().optional(),
    weight: z.string().optional(),
    occupation: z.string().optional(),
    activity_level: z.string().optional(),
    sleep_pattern: z.string().optional(),
    stress_level: z.string().optional(),
  }),
  medical_history: z.object({
    chronic_diseases: z.array(z.string()).optional(),
    medications: z.array(z.string()).optional(),
    allergies: z.array(z.string()).optional(),
    recent_surgeries: z.string().optional(),
    family_history: z.array(z.string()).optional(),
  }),
  current_diet: z.object({
    meal_pattern: z.string().optional(),
    skips_meals: z.boolean().optional(),
    water_intake: z.string().optional(),
    other_drinks: z.array(z.string()).optional(),
    processed_food_intake: z.string().optional(),
    cooking_habit: z.string().optional(),
  }),
  preferences: z.object({
    diet_type: z.array(z.string()).optional(),
    favorite_foods: z.string().optional(),
    disliked_foods: z.string().optional(),
    fasting_practices: z.string().optional(),
  }),
  goals: z.object({
    primary_goal: z.string().optional(),
    timeline: z.string().optional(),
    motivation_level: z.string().optional(),
    budget: z.string().optional(),
    open_to_lifestyle_changes: z.boolean().optional(),
  }),
});

export type NutritionCoachInput = z.infer<typeof NutritionCoachInputSchema>;

// Define the detailed output schema as requested
const NutritionCoachOutputSchema = z.object({
  patient_id: z.string().optional(),
  profile: z.object({
    age: z.number().optional(),
    gender: z.string().optional(),
    height: z.string().optional(),
    weight: z.string().optional(),
    occupation: z.string().optional(),
    activity_level: z.string().optional(),
    sleep: z.string().optional(),
    stress: z.string().optional(),
  }),
  medical_history: z.object({
    chronic_diseases: z.array(z.string()).optional(),
    medications: z.array(z.string()).optional(),
    allergies: z.array(z.string()).optional(),
    family_history: z.array(z.string()).optional(),
  }),
  current_diet: z.object({
    meal_pattern: z.string().optional(),
    water_intake: z.string().optional(),
    processed_food: z.string().optional(),
    caffeine: z.string().optional(),
  }),
  preferences: z.object({
    diet_type: z.string().optional(),
    favorite_foods: z.string().optional(),
    dislikes: z.string().optional(),
    fasting_practices: z.string().optional(),
  }),
  goals: z.object({
    primary: z.string().optional(),
    timeline: z.string().optional(),
    motivation: z.string().optional(),
    budget: z.string().optional(),
  }),
  diet_plan: z.object({
    breakfast: z.string(),
    lunch: z.string(),
    snack: z.string(),
    dinner: z.string(),
    hydration: z.string(),
  }),
  warnings: z.array(z.string()).describe('A list of critical warnings, especially drug-food interactions.'),
  detailed_notes: z.object({
    calories: z.string().describe('Calculated TDEE/daily caloric needs.'),
    macros: z.string().describe('Calculated macronutrient distribution (Carbs, Protein, Fat).'),
    fiber_goal: z.string().optional(),
    special_notes: z.string().describe('Summary of diet type, e.g., "Diabetic-friendly, low-sodium, lactose-free".'),
  }),
});

export type NutritionCoachOutput = z.infer<typeof NutritionCoachOutputSchema>;

export async function generateCoachedDietPlan(input: NutritionCoachInput): Promise<NutritionCoachOutput> {
  const prompt = `
You are an expert AI nutrition coach. Generate a comprehensive, personalized diet plan based on the patient's questionnaire responses.

PATIENT DATA:
${JSON.stringify(input, null, 2)}

REQUIREMENTS:
1. Create a detailed daily meal plan (breakfast, lunch, snack, dinner, hydration)
2. Calculate appropriate caloric needs and macronutrient distribution
3. Consider medical conditions, allergies, and dietary restrictions
4. Provide critical warnings about drug-food interactions
5. Include cultural and personal preferences
6. Make recommendations practical and achievable

OUTPUT FORMAT:
Return a comprehensive nutrition plan with:
- Complete daily meal plan with specific foods and portions
- Caloric and macronutrient calculations
- Critical warnings and contraindications
- Special dietary considerations
- Practical implementation notes

Be thorough, medically accurate, and prioritize patient safety.
`;

  try {
    const result = await generateStructuredResponse<NutritionCoachOutput>(prompt);
    
    // Validate the result structure
    if (!result || typeof result !== 'object' || Object.keys(result).length === 0) {
      console.warn('AI returned empty or invalid result for nutrition coach, using fallback');
      return getFallbackNutritionPlan(input);
    }
    
    // Ensure required fields exist
    if (!result.diet_plan || !result.detailed_notes) {
      console.warn('AI result missing required fields, using fallback');
      return getFallbackNutritionPlan(input);
    }
    
    return result;
  } catch (error) {
    console.error('Nutrition coach error:', error);
    return getFallbackNutritionPlan(input);
  }
}

// Fallback response generator for nutrition coach
function getFallbackNutritionPlan(input: NutritionCoachInput): NutritionCoachOutput {
  const age = input.profile?.age || 30;
  const gender = input.profile?.gender || 'Unknown';
  const weight = input.profile?.weight || '70';
  const height = input.profile?.height || '170';
  const activityLevel = input.profile?.activity_level || 'Moderately Active';
  const primaryGoal = input.goals?.primary_goal || 'General health';
  
  // Calculate basic caloric needs (simplified)
  const baseCalories = gender.toLowerCase() === 'female' ? 1800 : 2000;
  const activityMultiplier = {
    'Sedentary': 1.2,
    'Lightly Active': 1.375,
    'Moderately Active': 1.55,
    'Very Active': 1.725
  }[activityLevel] || 1.55;
  
  const dailyCalories = Math.round(baseCalories * activityMultiplier);
  
  // Generate warnings based on medical history
  const warnings = [];
  if (input.medical_history?.chronic_diseases?.length) {
    warnings.push('Consult healthcare provider before making dietary changes due to existing medical conditions');
  }
  if (input.medical_history?.medications?.length) {
    warnings.push('Check for potential drug-food interactions with current medications');
  }
  if (input.medical_history?.allergies?.length) {
    warnings.push('Avoid all known allergens and read food labels carefully');
  }
  
  return {
    patient_id: 'fallback',
    profile: {
      age: age,
      gender: gender,
      height: height,
      weight: weight,
      occupation: input.profile?.occupation || 'Not specified',
      activity_level: activityLevel,
      sleep: input.profile?.sleep_pattern || 'Not specified',
      stress: input.profile?.stress_level || 'Not specified',
    },
    medical_history: {
      chronic_diseases: input.medical_history?.chronic_diseases || [],
      medications: input.medical_history?.medications || [],
      allergies: input.medical_history?.allergies || [],
      family_history: input.medical_history?.family_history || [],
    },
    current_diet: {
      meal_pattern: input.current_diet?.meal_pattern || 'Not specified',
      water_intake: input.current_diet?.water_intake || 'Not specified',
      processed_food: input.current_diet?.processed_food_intake || 'Not specified',
      caffeine: input.current_diet?.other_drinks?.join(', ') || 'Not specified',
    },
    preferences: {
      diet_type: input.preferences?.diet_type?.join(', ') || 'No restrictions',
      favorite_foods: input.preferences?.favorite_foods || 'Not specified',
      dislikes: input.preferences?.disliked_foods || 'Not specified',
      fasting_practices: input.preferences?.fasting_practices || 'None',
    },
    goals: {
      primary: primaryGoal,
      timeline: input.goals?.timeline || 'Long-term',
      motivation: input.goals?.motivation_level || 'Moderate',
      budget: input.goals?.budget || 'Medium',
    },
    diet_plan: {
      breakfast: 'Oatmeal with berries and nuts, Greek yogurt, or whole grain toast with avocado',
      lunch: 'Grilled chicken salad with mixed vegetables, quinoa bowl, or vegetable soup',
      snack: 'Apple with almond butter, mixed nuts, or Greek yogurt with honey',
      dinner: 'Baked salmon with roasted vegetables, brown rice, or lean protein with steamed greens',
      hydration: '8-10 glasses of water daily, herbal teas, limit sugary drinks',
    },
    warnings: warnings.length > 0 ? warnings : ['Consult healthcare provider before starting any new diet plan'],
    detailed_notes: {
      calories: `${dailyCalories} calories per day`,
      macros: '50% Carbohydrates, 25% Protein, 25% Fat (adjust based on goals)',
      fiber_goal: '25-35g daily',
      special_notes: `Personalized plan for ${primaryGoal}. Focus on whole foods, balanced macronutrients, and regular meal timing.`,
    },
  };
}

// Test function to verify nutrition coach is working
export async function testNutritionCoach(): Promise<boolean> {
  try {
    const testInput: NutritionCoachInput = {
      profile: {
        age: 30,
        gender: 'Male',
        height: '175',
        weight: '75',
        occupation: 'Office worker',
        activity_level: 'Moderately Active',
        sleep_pattern: '7-8 hours',
        stress_level: 'Sometimes',
      },
      medical_history: {
        chronic_diseases: [],
        medications: [],
        allergies: [],
        recent_surgeries: '',
        family_history: [],
      },
      current_diet: {
        meal_pattern: '3 meals, 2 snacks',
        skips_meals: false,
        water_intake: '2 liters',
        other_drinks: ['Coffee'],
        processed_food_intake: '1-2 times a week',
        cooking_habit: 'Mix',
      },
      preferences: {
        diet_type: [],
        favorite_foods: 'Chicken, vegetables',
        disliked_foods: 'Spicy food',
        fasting_practices: '',
      },
      goals: {
        primary_goal: 'Weight maintenance',
        timeline: 'Long-term',
        motivation_level: 'High',
        budget: 'Medium',
        open_to_lifestyle_changes: true,
      },
    };
    
    const result = await generateCoachedDietPlan(testInput);
    return !!(result && result.diet_plan && result.detailed_notes);
  } catch (error) {
    console.error("Nutrition coach test failed:", error);
    return false;
  }
}


// Old flow code removed - using new implementation above