
'use server';
/**
 * @fileOverview AI-powered diet and nutrition planner.
 *
 * - generateDietPlan - Generates a 1-day diet plan based on patient history and preferences.
 * - DietPlannerInput - The input type for the generateDietPlan function.
 * - DietPlannerOutput - The return type for the generateDietPlan function.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';
import type { PatientHistory } from '@/contexts/patient-context';

const DietPlannerInputSchema = z.object({
  // Patient Demographics
  name: z.string().describe("Patient's full name"),
  age: z.number().describe("Patient's age in years"),
  sex: z.string().describe("Patient's sex (M/F/Other)"),
  height: z.number().describe("Patient's height in cm"),
  weight: z.number().describe("Patient's weight in kg"),
  activityLevel: z.string().describe("Activity level: sedentary/light/moderate/active"),
  
  // Health Goals & Conditions
  primaryGoals: z.string().describe("Primary health goals (e.g., lose 5 kg, maintain weight, reduce HbA1c, lower BP)"),
  medicalConditions: z.string().describe("Medical conditions with details (diabetes type & last HbA1c, hypertension, kidney disease stage, etc.)"),
  currentMedications: z.string().describe("Current medications with name, dose, and time of day"),
  recentLabs: z.string().optional().describe("Recent lab values (eGFR, K+, Na+, HbA1c, fasting glucose)"),
  
  // Dietary Preferences
  foodPreferences: z.string().describe("Food preferences & restrictions (vegetarian, halal, allergies, dislikes, cuisines)"),
  budget: z.string().describe("Budget level: low/medium/high"),
  cookingSkill: z.string().describe("Cooking skill level: beginner/intermediate/pro"),
  equipment: z.string().optional().describe("Available cooking equipment"),
  mealsPerDay: z.number().describe("Number of meals per day (3/4/5)"),
  planDuration: z.string().describe("Plan duration (7 days/14 days/custom)"),
  
  // Legacy fields for backward compatibility
  conditions: z.string().optional().describe("Legacy: primary health conditions"),
  allergies: z.string().optional().describe("Legacy: food allergies"),
  preferences: z.string().optional().describe("Legacy: food preferences"),
  goal: z.string().optional().describe("Legacy: health goal"),
  detailedHistory: z.any().optional().describe("Legacy: detailed patient history"),
});
export type DietPlannerInput = z.infer<typeof DietPlannerInputSchema>;

const DietPlannerOutputSchema = z.object({
  // A. One-Line Quick Summary
  quickSummary: z.string().describe('Single sentence with main dietary theme and top two priorities.'),
  
  // B. Daily Snapshot Table
  dailySnapshot: z.object({
    calories: z.string().describe('Daily calorie target'),
    carbs: z.string().describe('Daily carbohydrate target in grams'),
    protein: z.string().describe('Daily protein target in grams'),
    fat: z.string().describe('Daily fat target in grams'),
    fiber: z.string().describe('Daily fiber target in grams'),
    sodium: z.string().describe('Daily sodium target in mg'),
    potassium: z.string().describe('Daily potassium target in mg'),
  }),
  
  // C. Day-by-Day Meal Details
  mealDetails: z.array(z.object({
    day: z.string().describe('Day of the week (Day 1, Day 2, etc.)'),
    meals: z.array(z.object({
      mealType: z.string().describe('Breakfast, Lunch, Dinner, or Snack'),
      name: z.string().describe('Meal name'),
      ingredients: z.array(z.string()).describe('Exact ingredients with portion sizes'),
      nutrition: z.object({
        calories: z.number(),
        carbs: z.number(),
        protein: z.number(),
        fat: z.number(),
        sodium: z.number(),
        potassium: z.number(),
      }),
      cookingSteps: z.array(z.string()).describe('3-8 numbered cooking steps'),
      diabetesNote: z.string().optional().describe('Diabetes-specific notes about carb timing'),
      ckdNote: z.string().optional().describe('Chronic kidney disease notes if applicable'),
      intoleranceSwap: z.string().describe('One intolerance swap option'),
      budgetSwap: z.string().describe('One budget swap option'),
    })),
  })),
  
  // D. Daily Totals
  dailyTotals: z.object({
    calories: z.string(),
    carbs: z.string(),
    protein: z.string(),
    fat: z.string(),
    sodium: z.string(),
    potassium: z.string(),
  }),
  
  // E. Grocery List
  groceryList: z.object({
    produce: z.array(z.string()).describe('Produce section items'),
    grains: z.array(z.string()).describe('Grains and bread items'),
    proteins: z.array(z.string()).describe('Protein sources'),
    dairy: z.array(z.string()).describe('Dairy and alternatives'),
    condiments: z.array(z.string()).describe('Condiments and seasonings'),
  }),
  
  // F. 1-Hour Batch-Cook Plan
  batchCookPlan: z.array(z.object({
    time: z.string().describe('Time range (e.g., 00:00-00:10)'),
    task: z.string().describe('Cooking task'),
    storage: z.string().describe('Storage tips'),
  })),
  
  // G. Medication-Food Interaction Table
  medicationInteractions: z.array(z.object({
    medication: z.string().describe('Medication name'),
    interaction: z.string().describe('Type of interaction'),
    explanation: z.string().describe('Plain explanation of the interaction'),
    safeAction: z.string().describe('Safe action to take'),
    severity: z.string().describe('Severity level: High/Moderate/Low'),
  })),
  
  // H. Monitoring & Safety Checklist
  monitoringChecklist: z.object({
    whatToLog: z.array(z.string()).describe('What to monitor and log'),
    redFlags: z.array(z.string()).describe('Red-flag symptoms to watch for'),
    hypoglycemiaRescue: z.array(z.string()).describe('Hypoglycemia rescue steps'),
  }),
  
  // I. Eating-Out Tips & Quick Snacks
  eatingOutTips: z.array(z.string()).describe('Five restaurant strategies'),
  quickSnacks: z.array(z.string()).describe('Five no-cook snack ideas'),
  
  // J. One-Week Variation Ideas
  variationIdeas: z.array(z.string()).describe('Simple swaps to prevent boredom'),
  
  // K. Legal/Medical Disclaimer
  disclaimer: z.string().default('This plan is general nutrition guidance only and not a prescription. Share with your healthcare provider before changing medications or diet.'),
  
  // Plan Metadata
  planTitle: z.string().describe('Unique plan title (e.g., Plan-1, Plan-2)'),
  planNumber: z.number().describe('Sequential plan number'),
  generatedDate: z.string().describe('Date when plan was generated'),
});
export type DietPlannerOutput = z.infer<typeof DietPlannerOutputSchema>;

export async function generateDietPlan(input: DietPlannerInput): Promise<DietPlannerOutput> {
  const prompt = `You are a licensed clinical dietitian and medication-food-interaction specialist creating individualized diet plans.

**PATIENT PROFILE:**
- Name: ${input.name || 'Patient'}
- Age & Sex: ${input.age || 'Not specified'} years / ${input.sex || 'Not specified'}
- Height & Weight: ${input.height || 'Not specified'} cm / ${input.weight || 'Not specified'} kg
- Activity Level: ${input.activityLevel || 'Not specified'}
- Primary Goals: ${input.primaryGoals || input.goal || 'Not specified'}
- Medical Conditions: ${input.medicalConditions || input.conditions || 'No medical conditions reported'}
- Current Medications: ${input.currentMedications || 'None reported'}
- Recent Labs: ${input.recentLabs || 'Not available'}
- Food Preferences & Restrictions: ${input.foodPreferences || input.preferences || 'No specific preferences'}
- Budget: ${input.budget || 'Not specified'}
- Cooking Skill & Equipment: ${input.cookingSkill || 'Not specified'} / ${input.equipment || 'Basic equipment'}
- Meals per Day: ${input.mealsPerDay || 3}
- Plan Duration: ${input.planDuration || '7 days'}

**IMPORTANT INSTRUCTIONS:**
- Generate a diet plan for ANY input, including cases like "no diseases but want to gain weight"
- If no medical conditions are specified, assume the person is healthy and focus on their goals
- For weight gain goals, create a calorie-surplus plan with nutrient-dense foods
- For weight loss goals, create a calorie-deficit plan with balanced nutrition
- For maintenance goals, create a balanced maintenance plan
- Always provide practical, actionable advice regardless of input

**INSTRUCTIONS:**
Create a comprehensive clinical diet plan with ALL the following sections in order:

**A. One-Line Quick Summary**
- Single sentence with main dietary theme and top two priorities

**B. Daily Snapshot Table**
- Per day: calories, carbs (g), protein (g), fat (g), fiber (g), sodium (mg), potassium (mg)

**C. Day-by-Day Meal Details**
- Each meal & snack with:
  - Exact portion sizes and ingredients
  - Estimated calories, macros, sodium, potassium
  - Diabetes note: total carbs & timing relative to meds
  - CKD note if applicable
  - 3-8 numbered cooking steps (short, practical)
  - One intolerance swap and one budget swap

**D. Daily Totals**
- Re-state daily calories, carbs, protein, fat, sodium, potassium

**E. Grocery List**
- Group items by aisle (produce, grains, proteins, dairy/alternatives, condiments)
- Give approximate quantities for the entire plan

**F. 1-Hour Batch-Cook Plan**
- Timeline (e.g., 00:00-00:10 wash/chop; 00:10-00:30 roast chicken…) with storage tips

**G. Medication-Food Interaction Table**
- Columns: Medication | Interaction | Plain explanation | Safe action | Severity (High/Moderate/Low)
- Include common issues (grapefruit with statins, potassium & ACEi/ARB, vitamin K & warfarin)
- If none, clearly state "No clinically significant interactions identified"

**H. Monitoring & Safety Checklist**
- What to log (BG, BP, weight)
- Red-flag symptoms
- Hypoglycemia rescue steps (15-20 g fast carbs, recheck in 15 min)

**I. Eating-Out Tips & Quick Snacks**
- Five restaurant strategies and five no-cook snack ideas matching the plan

**J. One-Week Variation Ideas**
- Simple swaps to prevent boredom

**K. Legal/Medical Disclaimer**
- Exact text: "This plan is general nutrition guidance only and not a prescription. Share with your healthcare provider before changing medications or diet."

**Respond ONLY with this JSON format:**
{
  "quickSummary": "Single sentence with main dietary theme and top two priorities",
  "dailySnapshot": {
    "calories": "XXXX kcal",
    "carbs": "XXX g",
    "protein": "XXX g", 
    "fat": "XXX g",
    "fiber": "XX g",
    "sodium": "XXXX mg",
    "potassium": "XXXX mg"
  },
  "mealDetails": [
    {
      "day": "Day 1",
      "meals": [
        {
          "mealType": "Breakfast",
          "name": "Meal name",
          "ingredients": ["Exact ingredients with portion sizes"],
          "nutrition": {
            "calories": 400,
            "carbs": 45,
            "protein": 20,
            "fat": 15,
            "sodium": 600,
            "potassium": 800
          },
          "cookingSteps": ["1. Step one", "2. Step two"],
          "diabetesNote": "Total carbs: 45g, take with morning meds",
          "intoleranceSwap": "Swap option for intolerances",
          "budgetSwap": "Budget-friendly alternative"
        }
      ]
    }
  ],
  "dailyTotals": {
    "calories": "XXXX kcal",
    "carbs": "XXX g",
    "protein": "XXX g",
    "fat": "XXX g", 
    "sodium": "XXXX mg",
    "potassium": "XXXX mg"
  },
  "groceryList": {
    "produce": ["Item 1", "Item 2"],
    "grains": ["Item 1", "Item 2"],
    "proteins": ["Item 1", "Item 2"],
    "dairy": ["Item 1", "Item 2"],
    "condiments": ["Item 1", "Item 2"]
  },
  "batchCookPlan": [
    {
      "time": "00:00-00:10",
      "task": "Wash and chop vegetables",
      "storage": "Store in airtight containers"
    }
  ],
  "medicationInteractions": [
    {
      "medication": "Medication name",
      "interaction": "Type of interaction",
      "explanation": "Plain explanation",
      "safeAction": "Safe action to take",
      "severity": "High/Moderate/Low"
    }
  ],
  "monitoringChecklist": {
    "whatToLog": ["Blood glucose", "Blood pressure", "Weight"],
    "redFlags": ["Symptom 1", "Symptom 2"],
    "hypoglycemiaRescue": ["15-20g fast carbs", "Recheck in 15 min"]
  },
  "eatingOutTips": ["Tip 1", "Tip 2", "Tip 3", "Tip 4", "Tip 5"],
  "quickSnacks": ["Snack 1", "Snack 2", "Snack 3", "Snack 4", "Snack 5"],
  "variationIdeas": ["Variation 1", "Variation 2", "Variation 3"],
  "disclaimer": "This plan is general nutrition guidance only and not a prescription. Share with your healthcare provider before changing medications or diet.",
  "planTitle": "Plan-1",
  "planNumber": 1,
  "generatedDate": "${new Date().toISOString().split('T')[0]}"
}`;

  return generateStructuredResponse<DietPlannerOutput>(prompt);
}