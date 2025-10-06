
'use server';
/**
 * @fileOverview AI-powered word search puzzle generator for pharma games.
 *
 * - generateWordSearch - Creates a word search puzzle based on a topic.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const WordSearchGeneratorInputSchema = z.object({
  topic: z.string().describe("The topic for the word search (e.g., 'Antibiotics', 'Cardiovascular Drugs')."),
  size: z.coerce.number().optional().default(12).describe("The desired grid size (e.g., 12 for a 12x12 grid)."),
  wordCount: z.coerce.number().optional().default(10).describe("The approximate number of words to include."),
});
export type WordSearchGeneratorInput = z.infer<typeof WordSearchGeneratorInputSchema>;

const WordSchema = z.object({
  word: z.string().describe("A word hidden in the grid, in uppercase."),
  // As a future enhancement, we could ask for coordinates, but that makes the prompt much harder.
  // For now, we'll just get the words. If we need a "reveal" feature, we'll need to enhance this.
});


const WordSearchGeneratorOutputSchema = z.object({
  grid: z.array(z.array(z.string())).describe("The 2D grid of letters."),
  words: z.array(z.string()).describe("The list of words hidden in the grid, in uppercase."),
  topic: z.string(),
});
export type WordSearchGeneratorOutput = z.infer<typeof WordSearchGeneratorOutputSchema>;

export async function generateWordSearch(input: WordSearchGeneratorInput): Promise<WordSearchGeneratorOutput> {
  console.log('Word search generator called with input:', input);
  
  try {
    const size = input.size || 12;
    const wordCount = input.wordCount || 10;
    
    // Create AI prompt for word search generation
    const prompt = `You are an expert pharmacy educator creating word search puzzles for pharmacy students. Generate a word search puzzle for the topic "${input.topic}" with approximately ${wordCount} words in a ${size}x${size} grid.

Requirements:
- Create a ${size}x${size} grid with pharmacy-related terms
- Include words that can be found horizontally, vertically, and diagonally
- Focus on drug names, medical terms, and pharmaceutical concepts
- Make the puzzle educational and appropriate for pharmacy students
- Ensure all words are properly placed in the grid

Topic: ${input.topic}
Grid size: ${size}x${size}
Word count: ${wordCount}

Respond with valid JSON in this exact format:
{
  "grid": [["A","B","C"],["D","E","F"]],
  "words": ["WORD1", "WORD2", "WORD3"],
  "topic": "${input.topic}"
}`;

    console.log('Calling AI for word search generation...');
    const result = await generateStructuredResponse<WordSearchGeneratorOutput>(prompt);
    console.log('AI word search result:', result);

    // Validate the result has the expected structure
    if (result && typeof result === 'object' && 'grid' in result && 'words' in result) {
      console.log('AI word search response valid, returning result');
      return result;
    } else {
      console.log('AI word search response invalid, using fallback');
      return generateFallbackWordSearch(input);
    }
  } catch (error) {
    console.error('Word search generation error:', error);
    console.log('Using fallback word search');
    return generateFallbackWordSearch(input);
  }
}

function generateFallbackWordSearch(input: WordSearchGeneratorInput): WordSearchGeneratorOutput {
  const size = input.size || 12;
  const wordCount = input.wordCount || 10;
  
  // Intelligent topic detection
  const detectedTopic = detectPharmacyTopic(input.topic?.toLowerCase() || '');
  
  // Generate word search based on detected topic
  const wordSearchDatabase = getWordSearchDatabase();
  const topicWordSearch = wordSearchDatabase[detectedTopic] || wordSearchDatabase['antibiotics'];
  
  // Enhanced randomization using Fisher-Yates shuffle for words
  const shuffledWords = [...topicWordSearch.words].sort(() => Math.random() - 0.5);
  
  return {
    grid: topicWordSearch.grid,
    words: shuffledWords,
    topic: detectedTopic
  };
}

function detectPharmacyTopic(searchTerm: string): keyof ReturnType<typeof getWordSearchDatabase> {
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
      return topic as keyof ReturnType<typeof getWordSearchDatabase>;
    }
  }

  // Default fallback
  return 'antibiotics';
}

function getWordSearchDatabase() {
  return {
    'antibiotics': {
      grid: [
        ['P', 'E', 'N', 'I', 'C', 'I', 'L', 'L', 'I', 'N', 'X', 'Y'],
        ['A', 'M', 'O', 'X', 'I', 'C', 'I', 'L', 'L', 'I', 'N', 'Z'],
        ['C', 'E', 'P', 'H', 'A', 'L', 'E', 'X', 'I', 'N', 'A', 'B'],
        ['A', 'Z', 'I', 'T', 'H', 'R', 'O', 'M', 'Y', 'C', 'I', 'N'],
        ['C', 'I', 'P', 'R', 'O', 'F', 'L', 'O', 'X', 'A', 'C', 'I'],
        ['V', 'A', 'N', 'C', 'O', 'M', 'Y', 'C', 'I', 'N', 'A', 'B'],
        ['G', 'E', 'N', 'T', 'A', 'M', 'I', 'C', 'I', 'N', 'A', 'C'],
        ['T', 'E', 'T', 'R', 'A', 'C', 'Y', 'C', 'L', 'I', 'N', 'E'],
        ['C', 'L', 'I', 'N', 'D', 'A', 'M', 'Y', 'C', 'I', 'N', 'A'],
        ['M', 'E', 'T', 'R', 'O', 'N', 'I', 'D', 'A', 'Z', 'O', 'L'],
        ['E', 'R', 'Y', 'T', 'H', 'R', 'O', 'M', 'Y', 'C', 'I', 'N'],
        ['S', 'U', 'L', 'F', 'A', 'M', 'E', 'T', 'H', 'O', 'X', 'A']
      ],
      words: ['PENICILLIN', 'AMOXICILLIN', 'CEPHALEXIN', 'AZITHROMYCIN', 'CIPROFLOXACIN', 'VANCOMYCIN', 'GENTAMICIN', 'TETRACYCLINE', 'CLINDAMYCIN', 'METRONIDAZOLE', 'ERYTHROMYCIN', 'SULFAMETHOXAZOLE']
    },
    'cardiovascular': {
      grid: [
        ['A', 'T', 'E', 'N', 'O', 'L', 'O', 'L', 'X', 'Y', 'Z', 'A'],
        ['L', 'I', 'S', 'I', 'N', 'O', 'P', 'R', 'I', 'L', 'A', 'B'],
        ['E', 'N', 'A', 'L', 'A', 'P', 'R', 'I', 'L', 'A', 'M', 'C'],
        ['A', 'M', 'L', 'O', 'D', 'I', 'P', 'I', 'N', 'E', 'A', 'D'],
        ['L', 'O', 'S', 'A', 'R', 'T', 'A', 'N', 'A', 'T', 'E', 'N'],
        ['S', 'I', 'M', 'V', 'A', 'S', 'T', 'A', 'T', 'I', 'N', 'A'],
        ['W', 'A', 'R', 'F', 'A', 'R', 'I', 'N', 'A', 'W', 'A', 'R'],
        ['N', 'I', 'T', 'R', 'O', 'G', 'L', 'Y', 'C', 'E', 'R', 'I'],
        ['C', 'L', 'O', 'P', 'I', 'D', 'O', 'G', 'R', 'E', 'L', 'A'],
        ['D', 'I', 'G', 'O', 'X', 'I', 'N', 'A', 'B', 'C', 'D', 'E'],
        ['F', 'U', 'R', 'O', 'S', 'E', 'M', 'I', 'D', 'E', 'F', 'G'],
        ['H', 'Y', 'D', 'R', 'A', 'L', 'A', 'Z', 'I', 'N', 'E', 'H']
      ],
      words: ['ATENOLOL', 'LISINOPRIL', 'ENALAPRIL', 'AMLODIPINE', 'LOSARTAN', 'SIMVASTATIN', 'WARFARIN', 'NITROGLYCERIN', 'CLOPIDOGREL', 'DIGOXIN', 'FUROSEMIDE', 'HYDRALAZINE']
    },
    'diabetes': {
      grid: [
        ['M', 'E', 'T', 'F', 'O', 'R', 'M', 'I', 'N', 'A', 'B', 'C'],
        ['I', 'N', 'S', 'U', 'L', 'I', 'N', 'A', 'B', 'C', 'D', 'E'],
        ['G', 'L', 'I', 'P', 'I', 'Z', 'I', 'D', 'E', 'F', 'G', 'H'],
        ['P', 'I', 'O', 'G', 'L', 'I', 'T', 'A', 'Z', 'O', 'N', 'E'],
        ['S', 'I', 'T', 'A', 'G', 'L', 'I', 'P', 'T', 'I', 'N', 'A'],
        ['C', 'A', 'N', 'A', 'G', 'L', 'I', 'F', 'L', 'O', 'Z', 'I'],
        ['A', 'C', 'A', 'R', 'B', 'O', 'S', 'E', 'A', 'B', 'C', 'D'],
        ['R', 'E', 'P', 'A', 'G', 'L', 'I', 'N', 'I', 'D', 'E', 'F'],
        ['E', 'X', 'E', 'N', 'A', 'T', 'I', 'D', 'E', 'G', 'H', 'I'],
        ['G', 'L', 'I', 'M', 'E', 'P', 'I', 'R', 'I', 'D', 'E', 'J'],
        ['G', 'L', 'I', 'B', 'E', 'N', 'C', 'L', 'A', 'M', 'I', 'D'],
        ['M', 'I', 'G', 'L', 'I', 'T', 'O', 'L', 'A', 'B', 'C', 'D']
      ],
      words: ['METFORMIN', 'INSULIN', 'GLIPIZIDE', 'PIOGLITAZONE', 'SITAGLIPTIN', 'CANAGLIFLOZIN', 'ACARBOSE', 'REPAGLINIDE', 'EXENATIDE', 'GLIMEPIRIDE', 'GLIBENCLAMIDE', 'MIGLITOL']
    }
  };
}


// Prompt definition moved to function

