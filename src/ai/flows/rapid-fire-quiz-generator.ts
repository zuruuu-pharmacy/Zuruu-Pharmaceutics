'use server';
/**
 * @fileOverview AI-powered rapid fire quiz generator for pharma games.
 *
 * - generateRapidFireQuiz - Creates a rapid fire quiz based on a topic.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const QuizQuestionSchema = z.object({
  question: z.string().describe("The quiz question."),
  answer: z.string().describe("The correct answer."),
  options: z.array(z.string()).describe("Array of 4 options including the correct answer."),
});

const RapidFireQuizInputSchema = z.object({
  topic: z.string().describe("The topic for the quiz (e.g., 'Antibiotics', 'Cardiovascular Drugs')."),
  count: z.coerce.number().optional().default(20).describe("The desired number of questions."),
});
export type RapidFireQuizInput = z.infer<typeof RapidFireQuizInputSchema>;

const RapidFireQuizOutputSchema = z.object({
  topic: z.string(),
  questions: z.array(QuizQuestionSchema),
  timeLimit: z.number().describe("Time limit in seconds for each question."),
});
export type RapidFireQuizOutput = z.infer<typeof RapidFireQuizOutputSchema>;

export async function generateRapidFireQuiz(input: RapidFireQuizInput): Promise<RapidFireQuizOutput> {
  console.log('Rapid fire quiz generator called with input:', input);
  
  try {
    const count = input.count || 20;
    
    // Create AI prompt for quiz generation
    const prompt = `You are an expert pharmacy educator creating rapid-fire quiz questions for pharmacy students. Generate exactly ${count} quiz questions for the topic "${input.topic}".

Requirements:
- Create multiple choice questions with 4 options each
- Focus on commonly used medications and pharmaceutical concepts
- Make questions educational and appropriate for pharmacy students
- Include questions about drug names, mechanisms, uses, side effects, and interactions
- Ensure questions are at medium difficulty level
- Provide clear and concise answers

Topic: ${input.topic}
Number of questions: ${count}

Respond with valid JSON in this exact format:
{
  "topic": "${input.topic}",
  "questions": [
    {
      "question": "What is the mechanism of action of...?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Explanation of the correct answer"
    }
  ],
  "timeLimit": 30
}`;

    console.log('Calling AI for quiz generation...');
    const result = await generateStructuredResponse<RapidFireQuizOutput>(prompt);
    console.log('AI quiz result:', result);

    // Validate the result has the expected structure
    if (result && typeof result === 'object' && 'questions' in result && Array.isArray(result.questions)) {
      console.log('AI quiz response valid, returning result');
      return result;
    } else {
      console.log('AI quiz response invalid, using fallback');
      return generateFallbackQuiz(input);
    }
  } catch (error) {
    console.error('Quiz generation error:', error);
    console.log('Using fallback quiz');
    return generateFallbackQuiz(input);
  }
}

function generateFallbackQuiz(input: RapidFireQuizInput): RapidFireQuizOutput {
  const count = input.count || 20;
  
  // Intelligent topic detection
  const detectedTopic = detectPharmacyTopic(input.topic?.toLowerCase() || '');
  
  // Generate quiz based on detected topic
  const quizDatabase = getQuizDatabase();
  const topicQuiz = quizDatabase[detectedTopic] || quizDatabase['antibiotics'];
  
  // Enhanced randomization using Fisher-Yates shuffle
  const selectedQuestions = [...topicQuiz.questions]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, topicQuiz.questions.length));
  
  return {
    topic: detectedTopic,
    questions: selectedQuestions,
    timeLimit: 30 // 30 seconds per question
  };
}

function detectPharmacyTopic(searchTerm: string): keyof ReturnType<typeof getQuizDatabase> {
  const topicKeywords = {
    'antibiotics': ['antibiotic', 'antibacterial', 'bacterial', 'infection', 'penicillin', 'cephalosporin', 'macrolide', 'quinolone', 'tetracycline', 'aminoglycoside'],
    'cardiovascular': ['cardiac', 'heart', 'cardiovascular', 'hypertension', 'blood pressure', 'cholesterol', 'statin', 'ace inhibitor', 'beta blocker', 'anticoagulant'],
    'cns drugs': ['cns', 'central nervous', 'brain', 'neurological', 'psychiatric', 'antidepressant', 'anxiety', 'seizure', 'epilepsy', 'benzodiazepine'],
    'diabetes': ['diabetes', 'diabetic', 'glucose', 'insulin', 'metformin', 'sulfonylurea', 'glp-1', 'sglt2', 'dpp-4'],
    'pain management': ['pain', 'analgesic', 'opioid', 'nsaid', 'inflammation', 'arthritis', 'migraine', 'neuropathic'],
    'respiratory': ['respiratory', 'lung', 'asthma', 'copd', 'bronchodilator', 'inhaler', 'corticosteroid', 'beta agonist'],
    'gastrointestinal': ['gi', 'gastrointestinal', 'stomach', 'acid', 'ppi', 'h2 blocker', 'antacid', 'nausea', 'diarrhea', 'constipation'],
    'endocrine': ['endocrine', 'hormone', 'thyroid', 'cortisol', 'testosterone', 'estrogen', 'progesterone', 'insulin'],
    'oncology': ['cancer', 'oncology', 'chemotherapy', 'tumor', 'malignancy', 'cytotoxic', 'targeted therapy'],
    'dermatology': ['skin', 'dermatology', 'topical', 'cream', 'ointment', 'fungal', 'acne', 'psoriasis', 'eczema'],
    'ophthalmology': ['eye', 'ophthalmology', 'glaucoma', 'retina', 'vision', 'ocular', 'mydriatic', 'cycloplegic'],
    'urology': ['urology', 'urinary', 'bladder', 'prostate', 'bph', 'ed', 'erectile', 'incontinence', 'kidney'],
    'rheumatology': ['rheumatology', 'arthritis', 'rheumatoid', 'lupus', 'dmard', 'biologic', 'inflammatory'],
    'psychiatry': ['psychiatry', 'mental', 'depression', 'anxiety', 'bipolar', 'schizophrenia', 'mood', 'psychotic'],
    'anesthesia': ['anesthesia', 'anesthetic', 'sedation', 'muscle relaxant', 'intubation', 'surgery'],
    'immunology': ['immune', 'immunology', 'immunosuppressant', 'transplant', 'rejection', 'autoimmune'],
    'infectious diseases': ['infectious', 'viral', 'hiv', 'hepatitis', 'antiviral', 'antiretroviral', 'influenza'],
    'hematology': ['blood', 'hematology', 'coagulation', 'anticoagulant', 'platelet', 'anemia', 'thrombosis'],
    'nephrology': ['kidney', 'nephrology', 'renal', 'diuretic', 'dialysis', 'creatinine', 'glomerular'],
    'pediatrics': ['pediatric', 'children', 'infant', 'child', 'pediatrician', 'neonatal'],
    'geriatrics': ['geriatric', 'elderly', 'aging', 'alzheimer', 'dementia', 'senior', 'old age']
  };

  // Find the best matching topic
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some(keyword => searchTerm.includes(keyword))) {
      return topic as keyof ReturnType<typeof getQuizDatabase>;
    }
  }

  // Default fallback
  return 'antibiotics';
}

function getQuizDatabase() {
  return {
    'antibiotics': {
      questions: [
        {
          question: "Which antibiotic was discovered by Alexander Fleming?",
          answer: "Penicillin",
          options: ["Penicillin", "Tetracycline", "Erythromycin", "Streptomycin"]
        },
        {
          question: "What is the mechanism of action of penicillin?",
          answer: "Inhibits cell wall synthesis",
          options: ["Inhibits protein synthesis", "Inhibits cell wall synthesis", "Inhibits DNA replication", "Inhibits folic acid synthesis"]
        },
        {
          question: "Which class of antibiotics includes ciprofloxacin?",
          answer: "Fluoroquinolones",
          options: ["Macrolides", "Fluoroquinolones", "Tetracyclines", "Aminoglycosides"]
        },
        {
          question: "What is the main side effect of tetracycline in children?",
          answer: "Tooth discoloration",
          options: ["Hearing loss", "Tooth discoloration", "Liver damage", "Kidney damage"]
        },
        {
          question: "Which antibiotic is used for MRSA infections?",
          answer: "Vancomycin",
          options: ["Penicillin", "Vancomycin", "Tetracycline", "Erythromycin"]
        },
        {
          question: "What is the mechanism of action of sulfonamides?",
          answer: "Inhibits folic acid synthesis",
          options: ["Inhibits protein synthesis", "Inhibits cell wall synthesis", "Inhibits folic acid synthesis", "Inhibits DNA replication"]
        },
        {
          question: "Which antibiotic is contraindicated in pregnancy?",
          answer: "Tetracycline",
          options: ["Penicillin", "Tetracycline", "Erythromycin", "Cephalexin"]
        },
        {
          question: "What is the main adverse effect of aminoglycosides?",
          answer: "Ototoxicity",
          options: ["Hepatotoxicity", "Ototoxicity", "Nephrotoxicity", "Cardiotoxicity"]
        },
        {
          question: "Which antibiotic is used for anaerobic infections?",
          answer: "Metronidazole",
          options: ["Penicillin", "Metronidazole", "Tetracycline", "Erythromycin"]
        },
        {
          question: "What is the mechanism of action of macrolides?",
          answer: "Inhibits protein synthesis",
          options: ["Inhibits cell wall synthesis", "Inhibits protein synthesis", "Inhibits DNA replication", "Inhibits folic acid synthesis"]
        }
      ]
    },
    'cardiovascular': {
      questions: [
        {
          question: "Which drug is a beta-blocker?",
          answer: "Atenolol",
          options: ["Lisinopril", "Atenolol", "Amlodipine", "Furosemide"]
        },
        {
          question: "What is the mechanism of action of ACE inhibitors?",
          answer: "Inhibits angiotensin converting enzyme",
          options: ["Blocks beta receptors", "Inhibits angiotensin converting enzyme", "Blocks calcium channels", "Inhibits HMG-CoA reductase"]
        },
        {
          question: "Which drug is used for acute heart failure?",
          answer: "Furosemide",
          options: ["Atenolol", "Furosemide", "Simvastatin", "Warfarin"]
        },
        {
          question: "What is the main side effect of calcium channel blockers?",
          answer: "Peripheral edema",
          options: ["Dry cough", "Peripheral edema", "Bradycardia", "Hyperkalemia"]
        },
        {
          question: "Which drug is an anticoagulant?",
          answer: "Warfarin",
          options: ["Aspirin", "Warfarin", "Clopidogrel", "Ticlopidine"]
        },
        {
          question: "What is the mechanism of action of statins?",
          answer: "Inhibits HMG-CoA reductase",
          options: ["Inhibits ACE", "Inhibits HMG-CoA reductase", "Blocks beta receptors", "Blocks calcium channels"]
        },
        {
          question: "Which drug is used for angina?",
          answer: "Nitroglycerin",
          options: ["Digoxin", "Nitroglycerin", "Furosemide", "Simvastatin"]
        },
        {
          question: "What is the main side effect of ACE inhibitors?",
          answer: "Dry cough",
          options: ["Dry cough", "Bradycardia", "Peripheral edema", "Hyperkalemia"]
        },
        {
          question: "Which drug is a cardiac glycoside?",
          answer: "Digoxin",
          options: ["Atenolol", "Digoxin", "Furosemide", "Warfarin"]
        },
        {
          question: "What is the mechanism of action of diuretics?",
          answer: "Increases sodium and water excretion",
          options: ["Blocks beta receptors", "Increases sodium and water excretion", "Inhibits ACE", "Blocks calcium channels"]
        }
      ]
    },
    'diabetes': {
      questions: [
        {
          question: "What is the first-line treatment for Type 2 diabetes?",
          answer: "Metformin",
          options: ["Insulin", "Metformin", "Glipizide", "Pioglitazone"]
        },
        {
          question: "What is the mechanism of action of metformin?",
          answer: "Decreases hepatic glucose production",
          options: ["Increases insulin secretion", "Decreases hepatic glucose production", "Increases insulin sensitivity", "Inhibits glucose absorption"]
        },
        {
          question: "Which drug is a sulfonylurea?",
          answer: "Glipizide",
          options: ["Metformin", "Glipizide", "Pioglitazone", "Sitagliptin"]
        },
        {
          question: "What is the main side effect of sulfonylureas?",
          answer: "Hypoglycemia",
          options: ["Hypoglycemia", "Lactic acidosis", "Weight gain", "Diarrhea"]
        },
        {
          question: "Which drug is a thiazolidinedione?",
          answer: "Pioglitazone",
          options: ["Metformin", "Pioglitazone", "Sitagliptin", "Canagliflozin"]
        },
        {
          question: "What is the mechanism of action of SGLT2 inhibitors?",
          answer: "Inhibits glucose reabsorption in kidneys",
          options: ["Increases insulin secretion", "Inhibits glucose reabsorption in kidneys", "Increases insulin sensitivity", "Inhibits glucose absorption"]
        },
        {
          question: "Which drug is a DPP-4 inhibitor?",
          answer: "Sitagliptin",
          options: ["Metformin", "Sitagliptin", "Pioglitazone", "Canagliflozin"]
        },
        {
          question: "What is the main side effect of thiazolidinediones?",
          answer: "Weight gain",
          options: ["Hypoglycemia", "Weight gain", "Lactic acidosis", "Diarrhea"]
        },
        {
          question: "Which drug is a GLP-1 receptor agonist?",
          answer: "Exenatide",
          options: ["Metformin", "Exenatide", "Sitagliptin", "Canagliflozin"]
        },
        {
          question: "What is the mechanism of action of alpha-glucosidase inhibitors?",
          answer: "Inhibits glucose absorption from intestine",
          options: ["Increases insulin secretion", "Inhibits glucose absorption from intestine", "Increases insulin sensitivity", "Decreases hepatic glucose production"]
        }
      ]
    }
  };
}
