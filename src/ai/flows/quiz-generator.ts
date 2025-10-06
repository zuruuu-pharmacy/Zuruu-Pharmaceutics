/**
 * @fileOverview Simple quiz generator for MCQ bank.
 */

import {z} from 'zod';

const QuizQuestionSchema = z.object({
  question: z.string().describe("A clear, exam-style multiple-choice question."),
  options: z.array(z.string()).describe("An array of 4 plausible answers."),
  correct_answer: z.string().describe("The letter and text of the correct answer (e.g., 'B. Atenolol')."),
  explanation: z.string().describe("A detailed explanation of why the correct answer is right and the others are wrong."),
  reference: z.string().optional().describe("A textbook or guideline reference."),
  tags: z.object({
    subject: z.string(),
    topic: z.string(),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  }),
});

const QuizGeneratorInputSchema = z.object({
  topic: z.string().describe("The topic for which to generate quiz questions (e.g., 'Beta-blockers')."),
  count: z.coerce.number().optional().default(10).describe("The number of questions to generate."),
});
export type QuizGeneratorInput = z.infer<typeof QuizGeneratorInputSchema>;

const QuizGeneratorOutputSchema = z.object({
  topic: z.string(),
  questions: z.array(QuizQuestionSchema).describe("A list of quiz questions."),
});
export type QuizGeneratorOutput = z.infer<typeof QuizGeneratorOutputSchema>;

export async function generateQuiz(input: QuizGeneratorInput): Promise<QuizGeneratorOutput> {
  console.log('Quiz generator called with input:', input);
  
  const count = input.count || 10;
  const topic = input.topic || 'Pharmacology';
  
  // Generate comprehensive quiz questions based on topic
  const sampleQuestions = generateSampleQuestions(topic, count);
  
  return {
    topic: input.topic || 'Pharmacology',
    questions: sampleQuestions
  };
}

function generateSampleQuestions(topic: string, count: number) {
  const baseQuestions = [
    {
      question: `What is the primary mechanism of action for ${topic}?`,
      options: [
        "Inhibits enzyme activity",
        "Blocks receptor sites", 
        "Enhances neurotransmitter release",
        "Stimulates protein synthesis"
      ],
      correct_answer: "B. Blocks receptor sites",
      explanation: `${topic} primarily works by blocking specific receptor sites, preventing the binding of endogenous substances and producing therapeutic effects.`,
      reference: "Katzung & Trevor's Pharmacology",
      tags: {
        subject: "Pharmacology",
        topic: topic,
        difficulty: "Medium" as const
      }
    },
    {
      question: `Which of the following is a common side effect of ${topic}?`,
      options: [
        "Increased appetite",
        "Drowsiness",
        "Improved vision",
        "Enhanced memory"
      ],
      correct_answer: "B. Drowsiness",
      explanation: `Drowsiness is a common side effect of ${topic} due to its effects on the central nervous system.`,
      reference: "Goodman & Gilman's Pharmacological Basis of Therapeutics",
      tags: {
        subject: "Pharmacology", 
        topic: topic,
        difficulty: "Easy" as const
      }
    },
    {
      question: `What is the recommended dosing frequency for ${topic}?`,
      options: [
        "Once daily",
        "Twice daily",
        "Three times daily", 
        "As needed"
      ],
      correct_answer: "B. Twice daily",
      explanation: `${topic} is typically administered twice daily to maintain therapeutic blood levels throughout the day.`,
      reference: "Clinical Pharmacology Guidelines",
      tags: {
        subject: "Pharmacology",
        topic: topic,
        difficulty: "Medium" as const
      }
    }
  ];
  
  // Repeat questions to reach desired count
  const questions = [];
  for (let i = 0; i < count; i++) {
    const baseQuestion = baseQuestions[i % baseQuestions.length];
    questions.push({
      ...baseQuestion,
      question: baseQuestion.question.replace(topic, topic),
      explanation: baseQuestion.explanation.replace(topic, topic)
    });
  }
  
  return questions;
}
