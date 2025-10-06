
'use server';
/**
 * @fileOverview AI-powered lifestyle and preventive care suggester.
 *
 * - getLifestyleSuggestions - Generates daily health suggestions.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';
import type { PatientHistory } from '@/contexts/patient-context';


const SuggestionSchema = z.object({
  priority: z.enum(['High', 'Medium', 'Low']).describe('The priority of the suggestion (High: Red, Medium: Yellow, Low: Green).'),
  emoji: z.string().describe('An appropriate emoji for the suggestion (e.g., "🔴", "🟡", "🟢").'),
  title: z.string().describe('A short, catchy title for the suggestion.'),
  suggestion: z.string().describe('The detailed suggestion text.'),
});

const LifestyleSuggestionsInputSchema = z.object({
  detailedHistory: z.any().describe('The full patient history object.'),
  currentDate: z.string().describe('The current date in YYYY-MM-DD format to provide seasonal context.'),
});

const LifestyleSuggestionsOutputSchema = z.object({
    suggestions: z.array(SuggestionSchema).describe('A list of 2-3 personalized lifestyle suggestions.'),
});

export async function getLifestyleSuggestions(history: PatientHistory): Promise<z.infer<typeof LifestyleSuggestionsOutputSchema>> {
  const prompt = `You are an expert healthcare AI providing personalized lifestyle and preventive care suggestions.

**Patient Information:**
- Name: ${history.name}
- Age: ${history.age} years
- Gender: ${history.gender}
- Medical History: ${history.pastMedicalHistory || 'None reported'}
- Current Medications: ${history.medicationHistory || 'None reported'}
- Allergies: ${history.allergyHistory || 'None reported'}
- Family History: ${history.familyHistory || 'None reported'}
- Social History: ${history.socialHistory || 'None reported'}
- Current Date: ${new Date().toISOString().split('T')[0]}

**Instructions:**
Generate 2-3 personalized lifestyle suggestions based on the patient's health profile. Consider:
1. Their medical conditions and risk factors
2. Current medications and potential lifestyle interactions
3. Age-appropriate preventive care recommendations
4. Seasonal considerations (current date provided)
5. Practical, actionable advice they can implement

**Priority Guidelines:**
- High: Critical health issues requiring immediate attention
- Medium: Important preventive measures or lifestyle improvements
- Low: General wellness and maintenance suggestions

**IMPORTANT: Return a valid JSON object with suggestions array. Do not return empty object.**
`;

  try {
    const result = await generateStructuredResponse<z.infer<typeof LifestyleSuggestionsOutputSchema>>(prompt);
    
    // Validate the result structure
    if (!result || typeof result !== 'object' || Object.keys(result).length === 0) {
      console.warn('AI returned empty or invalid result for lifestyle suggestions, using fallback');
      return getFallbackLifestyleSuggestions(history);
    }
    
    // Ensure suggestions array exists and is valid
    if (!result.suggestions || !Array.isArray(result.suggestions) || result.suggestions.length === 0) {
      console.warn('AI result missing suggestions array, using fallback');
      return getFallbackLifestyleSuggestions(history);
    }
    
    return result;
  } catch (error) {
    console.error('Lifestyle suggestions error:', error);
    return getFallbackLifestyleSuggestions(history);
  }
}

// Fallback response generator for lifestyle suggestions
function getFallbackLifestyleSuggestions(history: PatientHistory): z.infer<typeof LifestyleSuggestionsOutputSchema> {
  const age = typeof history.age === 'number' ? history.age : parseInt(history.age || '30') || 30;
  const hasMedicalHistory = history.pastMedicalHistory && history.pastMedicalHistory.trim() !== '';
  const hasMedications = history.medicationHistory && history.medicationHistory.trim() !== '';
  const hasAllergies = history.allergyHistory && history.allergyHistory.trim() !== '';
  
  const suggestions = [];
  
  // Age-based suggestions
  if (age >= 50) {
    suggestions.push({
      priority: 'High' as const,
      emoji: '🔴',
      title: 'Regular Health Screenings',
      suggestion: 'Schedule annual check-ups including blood pressure, cholesterol, and diabetes screening. Early detection saves lives.'
    });
  } else if (age >= 30) {
    suggestions.push({
      priority: 'Medium' as const,
      emoji: '🟡',
      title: 'Preventive Health Check',
      suggestion: 'Consider annual health screenings to establish baseline health metrics and catch potential issues early.'
    });
  }
  
  // Medical history based suggestions
  if (hasMedicalHistory) {
    suggestions.push({
      priority: 'High' as const,
      emoji: '🔴',
      title: 'Manage Existing Conditions',
      suggestion: 'Follow your treatment plan consistently and communicate any changes in symptoms to your healthcare provider.'
    });
  }
  
  // Medication based suggestions
  if (hasMedications) {
    suggestions.push({
      priority: 'Medium' as const,
      emoji: '🟡',
      title: 'Medication Adherence',
      suggestion: 'Take medications as prescribed and keep a medication list with you. Set reminders if needed.'
    });
  }
  
  // Allergy based suggestions
  if (hasAllergies) {
    suggestions.push({
      priority: 'High' as const,
      emoji: '🔴',
      title: 'Allergy Management',
      suggestion: 'Carry emergency medications, read food labels carefully, and inform others about your allergies.'
    });
  }
  
  // General wellness suggestions
  suggestions.push({
    priority: 'Low' as const,
    emoji: '🟢',
    title: 'Daily Hydration',
    suggestion: 'Aim for 8 glasses of water daily. Proper hydration supports all body functions and improves energy levels.'
  });
  
  suggestions.push({
    priority: 'Low' as const,
    emoji: '🟢',
    title: 'Regular Exercise',
    suggestion: 'Get at least 30 minutes of moderate exercise most days. Even a 10-minute walk can make a difference.'
  });
  
  // Ensure we have at least 2 suggestions
  if (suggestions.length < 2) {
    suggestions.push({
      priority: 'Low' as const,
      emoji: '🟢',
      title: 'Quality Sleep',
      suggestion: 'Aim for 7-9 hours of quality sleep nightly. Good sleep is essential for physical and mental health.'
    });
  }
  
  return {
    suggestions: suggestions.slice(0, 3) // Return max 3 suggestions
  };
}

// Test function to verify lifestyle suggester is working
export async function testLifestyleSuggester(): Promise<boolean> {
  try {
    const testHistory: PatientHistory = {
      name: "Test Patient",
      age: "30",
      gender: "male",
      pastMedicalHistory: "None",
      medicationHistory: "None",
      allergyHistory: "None",
      familyHistory: "None",
      socialHistory: "None"
    };
    
    const result = await getLifestyleSuggestions(testHistory);
    return !!(result && result.suggestions && result.suggestions.length > 0);
  } catch (error) {
    console.error("Lifestyle suggester test failed:", error);
    return false;
  }
}