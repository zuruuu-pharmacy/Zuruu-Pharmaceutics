
'use server';
/**
 * @fileOverview AI-powered study planner for students.
 *
 * - generateStudyPlan - Creates a weekly study timetable based on student inputs.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const StudyPlannerInputSchema = z.object({
  subjects: z.array(z.string()).min(1, "At least one subject is required.").describe("List of subjects or topics to study."),
  studyDuration: z.string().min(3, "Please specify the study duration.").describe("The total duration for the study plan (e.g., '4 weeks until final exams', 'the next 2 weeks')."),
  hoursPerDay: z.coerce.number().min(1, "Please specify daily study hours.").max(12, "Daily study hours cannot exceed 12.").describe("The average number of hours available for study each day."),
  personalConstraints: z.string().optional().describe("A description of personal fixed commitments (e.g., 'Work 5-9 PM on weekdays', 'Sleep from 11 PM to 7 AM', 'Prayer times')."),
  studyPreferences: z.string().optional().describe("A description of study preferences (e.g., 'I study best in the morning', 'I prefer 50-minute blocks with 10-minute breaks', 'I like to use the Pomodoro technique', 'Pharmacology is a weak area for me')."),
  learningObjective: z.string().optional().describe("The primary learning objective (e.g., 'deep understanding', 'quick revision', 'pass the exam', 'focus on my weak subjects')."),
});
export type StudyPlannerInput = z.infer<typeof StudyPlannerInputSchema>;


const TimeSlotSchema = z.object({
    time: z.string().describe("The time for the study block (e.g., '9:00 AM - 11:00 AM')."),
    subject: z.string().describe("The subject to be studied during this block. For breaks, this should be 'Break' or similar."),
    activity: z.string().describe("The suggested activity (e.g., 'Read Chapter 5', 'Practice MCQs', 'Active Recall Session', 'Watch Lecture', 'Short walk')."),
    category: z.enum(['Theory', 'Revision', 'Lab', 'Assignment', 'Exam', 'Break']).describe("The category of the activity."),
    isBreak: z.boolean().default(false).describe("Whether this slot is a break."),
});

const DailyPlanSchema = z.object({
    day: z.string().describe("The day of the week (e.g., 'Monday')."),
    slots: z.array(TimeSlotSchema),
});

const StudyPlannerOutputSchema = z.object({
  weeklyPlan: z.array(DailyPlanSchema).describe("A 7-day study plan."),
  summaryNotes: z.string().describe("A summary of the study strategy and general tips for success."),
});
export type StudyPlannerOutput = z.infer<typeof StudyPlannerOutputSchema>;

export async function generateStudyPlan(input: StudyPlannerInput): Promise<StudyPlannerOutput> {
  try {
    console.log('Study planner called with input:', input);
    
    // Validate input
    const validatedInput = StudyPlannerInputSchema.parse(input);
    console.log('Validated input:', validatedInput);
    
    const prompt = `You are an expert academic coach and study planner creating a personalized study timetable for pharmacy students.

STUDENT INFORMATION:
- Subjects to study: ${validatedInput.subjects.join(', ')}
- Study duration: ${validatedInput.studyDuration}
- Hours per day: ${validatedInput.hoursPerDay}
- Personal constraints: ${validatedInput.personalConstraints || 'None specified'}
- Study preferences: ${validatedInput.studyPreferences || 'No specific preferences'}
- Learning objective: ${validatedInput.learningObjective || 'General study improvement'}

Create a comprehensive 7-day study plan that:
1. Allocates time efficiently across all subjects
2. Respects personal constraints and preferences
3. Includes appropriate breaks and rest periods
4. Balances theory, practice, and revision
5. Provides specific, actionable study activities
6. Adapts to the student's learning style and goals

Requirements:
- Create exactly 7 days of study plans (Monday through Sunday)
- Each day should have multiple time slots with specific activities
- Include breaks every 50-90 minutes of study
- Vary activities between reading, practice, revision, and assignments
- Consider the student's constraints and preferences
- Make activities specific and actionable
- Include different categories: Theory, Revision, Lab, Assignment, Exam, Break

Respond with valid JSON in this exact format:
{
  "weeklyPlan": [
    {
      "day": "Monday",
      "slots": [
        {
          "time": "9:00 AM - 10:30 AM",
          "subject": "Pharmacology",
          "activity": "Read Chapter 5: Cardiovascular Drugs",
          "category": "Theory",
          "isBreak": false
        },
        {
          "time": "10:30 AM - 10:45 AM",
          "subject": "Break",
          "activity": "Short walk and hydration",
          "category": "Break",
          "isBreak": true
        }
      ]
    }
  ],
  "summaryNotes": "Comprehensive study strategy and success tips"
}`;

    console.log('Calling AI for study plan generation...');
    
    const result = await generateStructuredResponse<StudyPlannerOutput>(prompt);

    // Validate the result structure
    if (!result || typeof result !== 'object' || Object.keys(result).length === 0) {
      console.warn('AI returned empty or invalid result for study planner, using fallback');
      return generateFallbackStudyPlan(validatedInput);
    }
    
    // Ensure required fields exist
    if (!Array.isArray(result.weeklyPlan) || !result.summaryNotes) {
      console.warn('AI result missing required fields, using fallback');
      return generateFallbackStudyPlan(validatedInput);
    }

    console.log('✅ Study plan generated successfully');
    return result;
  } catch (error) {
    console.error('❌ Error in study plan generation:', error);
    console.log('🔄 Using fallback study plan...');
    return generateFallbackStudyPlan(input);
  }
}


function generateFallbackStudyPlan(input: StudyPlannerInput): StudyPlannerOutput {
  console.log('📝 Generating fallback study plan for:', input);
  
  const subjects = input.subjects || ['Pharmacology', 'Pharmaceutical Chemistry', 'Pharmaceutics'];
  const hoursPerDay = input.hoursPerDay || 4;
  
  // Generate a comprehensive 7-day study plan
  const weeklyPlan = [
    {
      day: "Monday",
      slots: [
        {
          time: "9:00 AM - 10:30 AM",
          subject: subjects[0] || "Pharmacology",
          activity: `Read ${subjects[0]} textbook - Chapter 1: Introduction`,
          category: "Theory" as const,
          isBreak: false
        },
        {
          time: "10:30 AM - 10:45 AM",
          subject: "Break",
          activity: "Short break - hydration and stretching",
          category: "Break" as const,
          isBreak: true
        },
        {
          time: "10:45 AM - 12:15 PM",
          subject: subjects[1] || "Pharmaceutical Chemistry",
          activity: `Practice ${subjects[1]} problems and exercises`,
          category: "Revision" as const,
          isBreak: false
        },
        {
          time: "12:15 PM - 1:00 PM",
          subject: "Break",
          activity: "Lunch break",
          category: "Break" as const,
          isBreak: true
        },
        ...(hoursPerDay > 4 ? [{
          time: "2:00 PM - 3:30 PM",
          subject: subjects[2] || "Pharmaceutics",
          activity: `Lab work and practical exercises for ${subjects[2]}`,
          category: "Lab" as const,
          isBreak: false
        }] : [])
      ]
    },
    {
      day: "Tuesday",
      slots: [
        {
          time: "9:00 AM - 10:30 AM",
          subject: subjects[1] || "Pharmaceutical Chemistry",
          activity: `Study ${subjects[1]} mechanisms and reactions`,
          category: "Theory" as const,
          isBreak: false
        },
        {
          time: "10:30 AM - 10:45 AM",
          subject: "Break",
          activity: "Short break",
          category: "Break" as const,
          isBreak: true
        },
        {
          time: "10:45 AM - 12:15 PM",
          subject: subjects[0] || "Pharmacology",
          activity: `Practice MCQs and case studies for ${subjects[0]}`,
          category: "Revision" as const,
          isBreak: false
        },
        {
          time: "12:15 PM - 1:00 PM",
          subject: "Break",
          activity: "Lunch break",
          category: "Break" as const,
          isBreak: true
        },
        ...(hoursPerDay > 4 ? [{
          time: "2:00 PM - 3:30 PM",
          subject: "All Subjects",
          activity: "Review and consolidate previous day's learning",
          category: "Revision" as const,
          isBreak: false
        }] : [])
      ]
    },
    {
      day: "Wednesday",
      slots: [
        {
          time: "9:00 AM - 10:30 AM",
          subject: subjects[2] || "Pharmaceutics",
          activity: `Study ${subjects[2]} formulations and dosage forms`,
          category: "Theory" as const,
          isBreak: false
        },
        {
          time: "10:30 AM - 10:45 AM",
          subject: "Break",
          activity: "Short break",
          category: "Break" as const,
          isBreak: true
        },
        {
          time: "10:45 AM - 12:15 PM",
          subject: subjects[1] || "Pharmaceutical Chemistry",
          activity: `Solve numerical problems in ${subjects[1]}`,
          category: "Assignment" as const,
          isBreak: false
        },
        {
          time: "12:15 PM - 1:00 PM",
          subject: "Break",
          activity: "Lunch break",
          category: "Break" as const,
          isBreak: true
        },
        ...(hoursPerDay > 4 ? [{
          time: "2:00 PM - 3:30 PM",
          subject: subjects[0] || "Pharmacology",
          activity: `Group study session for ${subjects[0]}`,
          category: "Revision" as const,
          isBreak: false
        }] : [])
      ]
    },
    {
      day: "Thursday",
      slots: [
        {
          time: "9:00 AM - 10:30 AM",
          subject: subjects[0] || "Pharmacology",
          activity: `Deep dive into ${subjects[0]} drug interactions`,
          category: "Theory" as const,
          isBreak: false
        },
        {
          time: "10:30 AM - 10:45 AM",
          subject: "Break",
          activity: "Short break",
          category: "Break" as const,
          isBreak: true
        },
        {
          time: "10:45 AM - 12:15 PM",
          subject: subjects[2] || "Pharmaceutics",
          activity: `Practice ${subjects[2]} calculations and formulations`,
          category: "Lab" as const,
          isBreak: false
        },
        {
          time: "12:15 PM - 1:00 PM",
          subject: "Break",
          activity: "Lunch break",
          category: "Break" as const,
          isBreak: true
        },
        ...(hoursPerDay > 4 ? [{
          time: "2:00 PM - 3:30 PM",
          subject: "All Subjects",
          activity: "Mock exam practice and self-assessment",
          category: "Exam" as const,
          isBreak: false
        }] : [])
      ]
    },
    {
      day: "Friday",
      slots: [
        {
          time: "9:00 AM - 10:30 AM",
          subject: subjects[1] || "Pharmaceutical Chemistry",
          activity: `Study ${subjects[1]} analytical methods`,
          category: "Theory" as const,
          isBreak: false
        },
        {
          time: "10:30 AM - 10:45 AM",
          subject: "Break",
          activity: "Short break",
          category: "Break" as const,
          isBreak: true
        },
        {
          time: "10:45 AM - 12:15 PM",
          subject: subjects[0] || "Pharmacology",
          activity: `Create flashcards and study notes for ${subjects[0]}`,
          category: "Revision" as const,
          isBreak: false
        },
        {
          time: "12:15 PM - 1:00 PM",
          subject: "Break",
          activity: "Lunch break",
          category: "Break" as const,
          isBreak: true
        },
        ...(hoursPerDay > 4 ? [{
          time: "2:00 PM - 3:30 PM",
          subject: subjects[2] || "Pharmaceutics",
          activity: `Lab practical work for ${subjects[2]}`,
          category: "Lab" as const,
          isBreak: false
        }] : [])
      ]
    },
    {
      day: "Saturday",
      slots: [
        {
          time: "10:00 AM - 11:30 AM",
          subject: "All Subjects",
          activity: "Weekly review and consolidation",
          category: "Revision" as const,
          isBreak: false
        },
        {
          time: "11:30 AM - 11:45 AM",
          subject: "Break",
          activity: "Short break",
          category: "Break" as const,
          isBreak: true
        },
        {
          time: "11:45 AM - 1:15 PM",
          subject: "All Subjects",
          activity: "Practice exams and self-assessment",
          category: "Exam" as const,
          isBreak: false
        },
        {
          time: "1:15 PM - 2:00 PM",
          subject: "Break",
          activity: "Lunch break",
          category: "Break" as const,
          isBreak: true
        },
        ...(hoursPerDay > 4 ? [{
          time: "3:00 PM - 4:30 PM",
          subject: "All Subjects",
          activity: "Identify weak areas and plan next week's focus",
          category: "Revision" as const,
          isBreak: false
        }] : [])
      ]
    },
    {
      day: "Sunday",
      slots: [
        {
          time: "10:00 AM - 11:30 AM",
          subject: subjects[0] || "Pharmacology",
          activity: `Light review of ${subjects[0]} key concepts`,
          category: "Revision" as const,
          isBreak: false
        },
        {
          time: "11:30 AM - 11:45 AM",
          subject: "Break",
          activity: "Short break",
          category: "Break" as const,
          isBreak: true
        },
        {
          time: "11:45 AM - 1:15 PM",
          subject: "All Subjects",
          activity: "Plan next week's study schedule",
          category: "Assignment" as const,
          isBreak: false
        },
        {
          time: "1:15 PM - 2:00 PM",
          subject: "Break",
          activity: "Lunch break",
          category: "Break" as const,
          isBreak: true
        },
        ...(hoursPerDay > 4 ? [{
          time: "3:00 PM - 4:30 PM",
          subject: "All Subjects",
          activity: "Relaxed reading and concept reinforcement",
          category: "Theory" as const,
          isBreak: false
        }] : [])
      ]
    }
  ];

  return {
    weeklyPlan,
    summaryNotes: `This personalized study plan is designed for ${input.studyDuration} with ${hoursPerDay} hours of study per day. The plan balances theory, practice, and revision across your subjects: ${subjects.join(', ')}. 

Key Study Strategies:
• Use active recall techniques during study sessions
• Take regular breaks every 50-90 minutes to maintain focus
• Review and consolidate learning at the end of each day
• Practice with MCQs and case studies regularly
• Create flashcards for important concepts
• Join study groups for collaborative learning
• Monitor your progress and adjust the plan as needed

Success Tips:
• Stay consistent with your study schedule
• Find a quiet, well-lit study space
• Keep all study materials organized
• Track your progress and celebrate small wins
• Don't hesitate to seek help when needed
• Maintain a healthy work-life balance
• Get adequate sleep and nutrition

Remember: Quality of study time matters more than quantity. Focus on understanding concepts deeply rather than just memorizing facts.`
  };
  }