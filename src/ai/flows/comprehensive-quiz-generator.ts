/**
 * @fileOverview Comprehensive quiz generator with ChatGPT-like detailed content.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

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

const ComprehensiveQuizInputSchema = z.object({
  topic: z.string().describe("The topic for which to generate quiz questions (e.g., 'Beta-blockers')."),
  count: z.coerce.number().optional().default(10).describe("The number of questions to generate."),
  level: z.string().optional().default('Undergraduate').describe("The educational level."),
  focus: z.string().optional().default('comprehensive').describe("The focus area."),
});
export type ComprehensiveQuizInput = z.infer<typeof ComprehensiveQuizInputSchema>;

const ComprehensiveQuizOutputSchema = z.object({
  topic: z.string(),
  level: z.string(),
  focus: z.string(),
  overview: z.string().describe("Comprehensive overview of the topic"),
  keyConcepts: z.array(z.object({
    concept: z.string(),
    explanation: z.string(),
    importance: z.string()
  })),
  mechanisms: z.array(z.object({
    mechanism: z.string(),
    description: z.string(),
    examples: z.array(z.string())
  })),
  clinicalApplications: z.array(z.object({
    application: z.string(),
    details: z.string(),
    examples: z.array(z.string())
  })),
  questions: z.array(QuizQuestionSchema).describe("A list of comprehensive quiz questions."),
  studyTips: z.array(z.string()),
  references: z.array(z.string())
});
export type ComprehensiveQuizOutput = z.infer<typeof ComprehensiveQuizOutputSchema>;

export async function generateComprehensiveQuiz(input: ComprehensiveQuizInput): Promise<ComprehensiveQuizOutput> {
  console.log('Comprehensive quiz generator called with input:', input);
  
  try {
    // Validate input
    const validatedInput = ComprehensiveQuizInputSchema.parse(input);
    console.log('Validated input:', validatedInput);
    
    // Create comprehensive AI prompt
    const prompt = `You are an expert pharmacy educator and assessment specialist creating comprehensive quiz content for pharmacy students.

For the topic "${validatedInput.topic}", provide a COMPLETE educational experience with detailed explanations, mechanisms, and exactly ${validatedInput.count} comprehensive quiz questions.

IMPORTANT: Provide FULL educational content, not just questions. The student should be able to learn everything about this topic from your response.

Include:
1. TOPIC OVERVIEW: Detailed explanation of what ${validatedInput.topic} are, their importance, and key concepts
2. KEY CONCEPTS: 3-5 most important concepts with detailed explanations
3. MECHANISMS: How these drugs work, with specific examples and clinical applications
4. CLINICAL APPLICATIONS: Real-world uses and case studies
5. QUIZ QUESTIONS: Exactly ${validatedInput.count} comprehensive, exam-style questions with detailed explanations
6. STUDY TIPS: How to study and master this topic effectively
7. REFERENCES: Key sources for further reading

Requirements for quiz questions:
- Create exam-style multiple choice questions
- Include 4 plausible options for each question
- Provide detailed explanations for correct and incorrect answers
- Cover different difficulty levels (Easy, Medium, Hard)
- Focus on practical application and clinical scenarios
- Include mechanism of action, side effects, contraindications, and clinical uses
- Make questions educational and appropriate for ${validatedInput.level} students

Topic: ${validatedInput.topic}
Level: ${validatedInput.level}
Focus: ${validatedInput.focus}
Number of questions: ${validatedInput.count}

Respond with valid JSON in this exact format:
{
  "topic": "${validatedInput.topic}",
  "level": "${validatedInput.level}",
  "focus": "${validatedInput.focus}",
  "overview": "Comprehensive overview of the topic",
  "keyConcepts": [
    {
      "concept": "Concept name",
      "explanation": "Detailed explanation",
      "importance": "Why this matters"
    }
  ],
  "mechanisms": [
    {
      "mechanism": "Mechanism name",
      "description": "How it works",
      "examples": ["Example 1", "Example 2"]
    }
  ],
  "clinicalApplications": [
    {
      "application": "Application name",
      "details": "Detailed explanation",
      "examples": ["Example 1", "Example 2"]
    }
  ],
  "questions": [
    {
      "question": "Question text",
      "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
      "correct_answer": "B. Option 2",
      "explanation": "Detailed explanation",
      "reference": "Reference source",
      "tags": {
        "subject": "Pharmacology",
        "topic": "${validatedInput.topic}",
        "difficulty": "Medium"
      }
    }
  ],
  "studyTips": ["Tip 1", "Tip 2"],
  "references": ["Reference 1", "Reference 2"]
}`;

    console.log('Calling AI for comprehensive quiz generation...');
    
    // Call AI with retry logic
    let aiResponse;
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      try {
        attempts++;
        console.log(`AI attempt ${attempts}...`);
        
        aiResponse = await generateStructuredResponse(prompt);
        console.log('AI response received:', aiResponse);
        
        if (aiResponse && typeof aiResponse === 'object') {
          break;
        }
      } catch (error) {
        console.log(`AI Error (attempt ${attempts}):`, error);
        if (attempts < maxAttempts) {
          console.log(`Retrying in 1000ms...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    
    if (!aiResponse || typeof aiResponse !== 'object') {
      console.log('AI failed, using fallback');
      return generateFallbackComprehensiveQuiz(validatedInput);
    }
    
    // Validate AI response
    try {
      const validatedResponse = ComprehensiveQuizOutputSchema.parse(aiResponse);
      console.log('AI response validated successfully');
      return validatedResponse;
    } catch (validationError) {
      console.log('AI response validation failed:', validationError);
      console.log('Using fallback response');
      return generateFallbackComprehensiveQuiz(validatedInput);
    }
    
  } catch (error) {
    console.error('Comprehensive quiz generator error:', error);
    return generateFallbackComprehensiveQuiz(input);
  }
}

function generateFallbackComprehensiveQuiz(input: ComprehensiveQuizInput): ComprehensiveQuizOutput {
  console.log('Generating comprehensive fallback quiz for:', input);
  
  const topic = input.topic?.toLowerCase() || 'pharmacology';
  const count = input.count || 10;
  
  // Generate topic-specific comprehensive content
  let content = generateTopicSpecificContent(topic);
  
  return {
    topic: input.topic || 'Pharmacology',
    level: input.level || 'Undergraduate',
    focus: input.focus || 'comprehensive',
    overview: content.overview,
    keyConcepts: content.keyConcepts,
    mechanisms: content.mechanisms,
    clinicalApplications: content.clinicalApplications,
    questions: content.questions.slice(0, count),
    studyTips: content.studyTips,
    references: content.references
  };
}

function generateTopicSpecificContent(topic: string) {
  if (topic.includes('anticancer') || topic.includes('cancer') || topic.includes('oncology')) {
    return {
      overview: "Anticancer drugs are a critical class of medications used to treat various types of cancer. These drugs work through multiple mechanisms to target rapidly dividing cancer cells while minimizing damage to healthy cells. Understanding anticancer drugs requires knowledge of cell cycle, DNA replication, protein synthesis, and the body's immune system.",
      
      keyConcepts: [
        {
          concept: "Cell Cycle Specificity",
          explanation: "Some anticancer drugs work only during specific phases of the cell cycle (S phase, M phase), while others are cell cycle non-specific and can kill cells in any phase.",
          importance: "Understanding this helps determine dosing schedules and combination therapy strategies."
        },
        {
          concept: "DNA Damage and Repair",
          explanation: "Many anticancer drugs cause DNA damage that cancer cells cannot repair, leading to cell death through apoptosis or other mechanisms.",
          importance: "This is the primary mechanism of action for alkylating agents and platinum compounds."
        }
      ],
      
      mechanisms: [
        {
          mechanism: "Alkylating Agents",
          description: "Form covalent bonds with DNA, creating cross-links that prevent proper replication and transcription",
          examples: ["Cyclophosphamide", "Cisplatin", "Carmustine"]
        },
        {
          mechanism: "Antimetabolites",
          description: "Structural analogs of normal metabolites that interfere with DNA and RNA synthesis",
          examples: ["Methotrexate", "5-Fluorouracil", "Cytarabine"]
        }
      ],
      
      clinicalApplications: [
        {
          application: "Breast Cancer Treatment",
          details: "Combination therapy using anthracyclines, taxanes, and targeted therapies",
          examples: ["AC-T regimen", "TCH regimen", "HER2-targeted therapy"]
        }
      ],
      
      questions: [
        {
          question: "Which phase of the cell cycle are antimetabolites most effective against?",
          options: [
            "A. G1 phase",
            "B. S phase",
            "C. G2 phase",
            "D. M phase"
          ],
          correct_answer: "B. S phase",
          explanation: "Antimetabolites are most effective during the S phase because this is when DNA synthesis occurs. These drugs interfere with DNA and RNA synthesis by competing with normal metabolites, so they are most active when cells are actively replicating their DNA.",
          reference: "Goodman & Gilman's Pharmacological Basis of Therapeutics",
          tags: {
            subject: "Pharmacology",
            topic: "Anticancer Drugs",
            difficulty: "Medium" as const
          }
        },
        {
          question: "What is the primary mechanism of action of alkylating agents?",
          options: [
            "A. Inhibiting protein synthesis",
            "B. Forming DNA cross-links",
            "C. Blocking cell division",
            "D. Preventing angiogenesis"
          ],
          correct_answer: "B. Forming DNA cross-links",
          explanation: "Alkylating agents work by forming covalent bonds with DNA, creating cross-links between DNA strands. This prevents proper DNA replication and transcription, leading to cell death. This mechanism makes them effective against rapidly dividing cancer cells.",
          reference: "Cancer Pharmacology and Therapeutics",
          tags: {
            subject: "Pharmacology",
            topic: "Anticancer Drugs",
            difficulty: "Medium" as const
          }
        }
      ],
      
      studyTips: [
        "Focus on understanding mechanisms first, then memorize drug names",
        "Use case studies to connect theory with clinical practice",
        "Create concept maps to visualize relationships between drug classes"
      ],
      
      references: [
        "Goodman & Gilman's Pharmacological Basis of Therapeutics",
        "Cancer Pharmacology and Therapeutics",
        "Clinical Oncology Guidelines"
      ]
    };
  }
  
  // Default comprehensive content for other topics
  return {
    overview: `This comprehensive study guide covers all aspects of ${topic}, providing detailed explanations, mechanisms, and practical applications for pharmacy students.`,
    
    keyConcepts: [
      {
        concept: "Fundamental Principles",
        explanation: "The basic concepts that form the foundation of this topic",
        importance: "Essential for understanding all advanced concepts"
      }
    ],
    
    mechanisms: [
      {
        mechanism: "Primary Mechanism",
        description: "The main way this concept works",
        examples: ["Example 1", "Example 2"]
      }
    ],
    
    clinicalApplications: [
      {
        application: "Clinical Application",
        details: "How this is used in practice",
        examples: ["Case 1", "Case 2"]
      }
    ],
    
    questions: [
      {
        question: `What is the primary mechanism of action for ${topic}?`,
        options: [
          "A. Competitive inhibition",
          "B. Non-competitive inhibition",
          "C. Allosteric modulation",
          "D. Enzyme induction"
        ],
        correct_answer: "A. Competitive inhibition",
        explanation: "This is the correct answer because it represents the fundamental mechanism of action for this drug class.",
        reference: "Pharmacology Textbook",
        tags: {
          subject: "Pharmacology",
          topic: topic,
          difficulty: "Medium" as const
        }
      }
    ],
    
    studyTips: [
      "Focus on understanding before memorizing",
      "Use active recall techniques",
      "Connect new concepts to existing knowledge"
    ],
    
    references: [
      "Primary textbook reference",
      "Clinical practice guidelines"
    ]
  };
}
