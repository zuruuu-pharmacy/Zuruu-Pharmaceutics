
'use server';
/**
 * @fileOverview AI-powered virtual OSCE station generator and evaluator.
 *
 * - generateOsceStation - A multi-step flow to generate a case, evaluate answers, and provide practice feedback.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

// STEP 1: Case Generation
const PatientCaseSchema = z.object({
    demographics: z.string().describe('Patient demographics (age, gender, lifestyle).'),
    chiefComplaint: z.string().describe('The main reason for the visit.'),
    hpi: z.string().describe('History of Present Illness.'),
    pmh: z.string().describe('Past Medical & Family History.'),
    medications: z.string().describe('Current Medications & Allergies.'),
    examination: z.string().describe('Physical Examination Findings.'),
    labs: z.string().describe('Lab & Diagnostic Reports.'),
});

const ClinicalQuestionSchema = z.object({
    question: z.string().describe('A clinical question related to the case or topic.'),
    type: z.enum(['text', 'multiple_choice']).default('text').describe('The type of answer expected.'),
    options: z.array(z.string()).optional().describe('Options for multiple-choice questions.'),
    hint: z.string().optional().describe("A subtle hint for the student if they get stuck in practice mode."),
});

const CaseGenerationOutputSchema = z.object({
    caseDetails: PatientCaseSchema,
    questions: z.array(ClinicalQuestionSchema),
});

// STEP 2: Exam Feedback Generation
const StudentAnswerSchema = z.object({
    question: z.string(),
    answer: z.string(),
});

const FeedbackSchema = z.object({
    diagnosisConfirmation: z.string().describe("Confirmation of the most likely diagnosis."),
    drugChoiceRationale: z.string().describe("Rationale for the best drug choices and why others are less suitable."),
    monitoringPlan: z.string().describe("Suggested monitoring parameters."),
    lifestyleCounseling: z.string().describe("Key lifestyle modification counseling points."),
    overallFeedback: z.string().describe("A summary of the student's performance and key learning points based on OSCE criteria like communication, clinical judgment, and safety."),
    modelAnswer: z.string().describe("An exemplar, bullet-point model answer showing how an expert would have handled the station's core tasks."),
    scoring: z.object({
        communication: z.number().nullable().describe("Score for Communication (out of 5). Set to null if not applicable."),
        clinicalReasoning: z.number().nullable().describe("Score for Clinical Reasoning (out of 5). Set to null if not applicable."),
        calculationAccuracy: z.number().nullable().describe("Score for Calculation Accuracy (out of 5). Set to null if not applicable."),
        safetyAndInteractions: z.number().nullable().describe("Score for Safety & Interactions (out of 5). Set to null if not applicable."),
        structureAndTimeManagement: z.number().nullable().describe("Score for Structure & Time Management (out of 5). Set to null if not applicable."),
        criticalErrors: z.array(z.string()).optional().describe("A list of any critical errors made by the student."),
    }).describe("A detailed scoring rubric based on performance."),
});

// STEP 3: Practice (Instant) Feedback
const InstantFeedbackSchema = z.object({
    strengths: z.string().describe("Positive feedback on what the student did well in their answer."),
    priorityFix: z.string().describe("The single most important correction or improvement for the student's answer."),
    safeAlternative: z.string().optional().describe("A suggestion for a safer or more effective phrasing or action."),
});


// Main Flow Input/Output
const OsceStationGeneratorInputSchema = z.object({
  topic: z.string().describe('The medical topic or OSCE domain for the station (e.g., "Patient Counseling for Inhalers", "Pediatric Dosage Calculation"). This may include a difficulty tier.'),
  
  // For exam mode (all answers at once)
  studentAnswers: z.array(StudentAnswerSchema).optional().describe("The student's answers to the questions for final exam-style feedback."),

  // For practice mode (one answer at a time)
  practiceAnswer: StudentAnswerSchema.optional().describe("A single answer for instant practice feedback."),
  
  caseDetails: PatientCaseSchema.optional().describe('The original case details (for step 2 & 3).'),
  questions: z.array(ClinicalQuestionSchema).optional().describe('The original questions (for step 2 & 3).'),
});
export type OsceStationGeneratorInput = z.infer<typeof OsceStationGeneratorInputSchema>;

const OsceStationGeneratorOutputSchema = z.object({
    // Step 1 Output
    caseDetails: PatientCaseSchema.optional(),
    questions: z.array(ClinicalQuestionSchema).optional(),
    // Step 2 (Exam) Output
    feedback: FeedbackSchema.optional(),
    // Step 3 (Practice) Output
    instantFeedback: InstantFeedbackSchema.optional(),
});
export type OsceStationGeneratorOutput = z.infer<typeof OsceStationGeneratorOutputSchema>;


// Removed duplicate function declaration


// Prompt for Step 1: Case Generation
// ai.definePrompt block commented out - using working AI instead

// Prompt for Step 2: Feedback Generation (Exam Mode)
// ai.definePrompt block commented out - using working AI instead


// Prompt for Step 3: Instant Feedback (Practice / Drill Mode)
// ai.definePrompt block commented out - using working AI instead


// Helper functions for different modes
async function practiceFeedbackPrompt(input: any) {
  return generateStructuredResponse<any>('Generate practice feedback for OSCE station');
}

async function examFeedbackGenerationPrompt(input: any) {
  return generateStructuredResponse<any>('Generate exam feedback for OSCE station');
}

async function caseGenerationPrompt(input: { topic: string }) {
  return generateStructuredResponse<any>('Generate OSCE case for topic: ' + input.topic);
}

export async function generateOsceStation(input: any): Promise<any> {
  // Mode 3: Practice or Drill Mode (Instant Feedback)
  if (input.practiceAnswer) {
      const result = await practiceFeedbackPrompt(input);
      // We also need to return the original case details and questions to maintain state on the client
      return { 
          ...result,
          caseDetails: input.caseDetails,
          questions: input.questions,
      };
  }
  // Mode 2: Exam Mode (Full Feedback)
  else if (input.studentAnswers && input.studentAnswers.length > 0) {
    const result = await examFeedbackGenerationPrompt(input);
    return result;
  } 
  // Mode 1: Case Generation
  else {
    const result = await caseGenerationPrompt({ topic: input.topic });
    return result;
  }
}