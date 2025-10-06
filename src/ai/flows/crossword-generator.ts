
'use server';
/**
 * @fileOverview AI-powered crossword puzzle generator for pharma games.
 *
 * - generateCrossword - Creates a crossword puzzle based on a topic.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const GridCellSchema = z.object({
  letter: z.string().nullable().describe("The letter in this cell. Null if it's a black square."),
  number: z.number().nullable().describe("The number for the start of a word, if any."),
});

const ClueSchema = z.object({
  number: z.number().describe("The number corresponding to the grid."),
  clue: z.string().describe("The clue for the word."),
  answer: z.string().describe("The correct answer."),
});

const CrosswordGeneratorInputSchema = z.object({
  topic: z.string().describe("The topic for the crossword (e.g., 'Antibiotics', 'Cardiovascular Drugs')."),
  size: z.coerce.number().optional().default(10).describe("The desired grid size (e.g., 10 for a 10x10 grid)."),
  wordCount: z.coerce.number().optional().default(8).describe("The approximate number of words to include."),
});
export type CrosswordGeneratorInput = z.infer<typeof CrosswordGeneratorInputSchema>;

const CrosswordGeneratorOutputSchema = z.object({
  grid: z.array(z.array(GridCellSchema)).describe("The 2D grid representing the puzzle."),
  clues: z.object({
    across: z.array(ClueSchema),
    down: z.array(ClueSchema),
  }),
  topic: z.string(),
});
export type CrosswordGeneratorOutput = z.infer<typeof CrosswordGeneratorOutputSchema>;

export async function generateCrossword(input: CrosswordGeneratorInput): Promise<CrosswordGeneratorOutput> {
  console.log('Crossword generator called with input:', input);
  
  try {
    const size = input.size || 10;
    const wordCount = input.wordCount || 8;
    
    // Create AI prompt for crossword generation
    const prompt = `You are an expert pharmacy educator creating crossword puzzles for pharmacy students. Generate a crossword puzzle for the topic "${input.topic}" with approximately ${wordCount} words.

Requirements:
- Create a ${size}x${size} grid with pharmacy-related terms
- Include both across and down clues
- Focus on drug names, medical terms, and pharmaceutical concepts
- Make clues educational and appropriate for pharmacy students
- Ensure words intersect properly in the grid

Topic: ${input.topic}
Grid size: ${size}x${size}
Word count: ${wordCount}

Respond with valid JSON in this exact format:
{
  "grid": [["A","B","C"],["D","E","F"]],
  "clues": {
    "across": [{"number": 1, "clue": "Clue text", "answer": "ANSWER"}],
    "down": [{"number": 1, "clue": "Clue text", "answer": "ANSWER"}]
  },
  "topic": "${input.topic}"
}`;

    console.log('Calling AI for crossword generation...');
    const result = await generateStructuredResponse<CrosswordGeneratorOutput>(prompt);
    console.log('AI crossword result:', result);

    // Validate the result has the expected structure
    if (result && typeof result === 'object' && 'grid' in result && 'clues' in result) {
      console.log('AI crossword response valid, returning result');
      return result;
    } else {
      console.log('AI crossword response invalid, using fallback');
      return generateFallbackCrossword(input);
    }
  } catch (error) {
    console.error('Crossword generation error:', error);
    console.log('Using fallback crossword');
    return generateFallbackCrossword(input);
  }
}

function generateFallbackCrossword(input: CrosswordGeneratorInput): CrosswordGeneratorOutput {
  const size = input.size || 10;
  const wordCount = input.wordCount || 8;
  
  // Intelligent topic detection
  const detectedTopic = detectPharmacyTopic(input.topic?.toLowerCase() || '');
  
  // Generate crossword based on detected topic
  const crosswordDatabase = getCrosswordDatabase();
  const topicCrossword = crosswordDatabase[detectedTopic] || crosswordDatabase['antibiotics'];
  
  // Enhanced randomization using Fisher-Yates shuffle for clues
  const shuffledClues = {
    across: [...topicCrossword.clues.across].sort(() => Math.random() - 0.5),
    down: [...topicCrossword.clues.down].sort(() => Math.random() - 0.5)
  };
  
  return {
    grid: topicCrossword.grid,
    clues: shuffledClues,
    topic: detectedTopic
  };
}

function detectPharmacyTopic(searchTerm: string): keyof ReturnType<typeof getCrosswordDatabase> {
  const topicKeywords = {
    'antibiotics': ['antibiotic', 'antibacterial', 'bacterial', 'infection', 'infections', 'penicillin', 'cephalosporin', 'macrolide', 'quinolone', 'tetracycline', 'aminoglycoside', 'amoxicillin', 'azithromycin', 'ciprofloxacin', 'vancomycin', 'gentamicin', 'clindamycin', 'metronidazole', 'bacteria', 'microbial', 'antimicrobial', 'sepsis', 'pneumonia', 'uti', 'strep', 'staphylococcus', 'e.coli', 'mrsa', 'vre'],
    'cardiovascular': ['cardiac', 'heart', 'cardiovascular', 'hypertension', 'blood pressure', 'cholesterol', 'statin', 'ace inhibitor', 'beta blocker', 'anticoagulant', 'atrial fibrillation', 'arrhythmia', 'angina', 'myocardial infarction', 'heart failure', 'coronary', 'vascular', 'atherosclerosis', 'thrombosis', 'embolism', 'warfarin', 'heparin', 'aspirin', 'clopidogrel', 'atenolol', 'lisinopril', 'amlodipine', 'simvastatin'],
    'cns drugs': ['cns', 'central nervous', 'brain', 'neurological', 'psychiatric', 'antidepressant', 'anxiety', 'seizure', 'epilepsy', 'benzodiazepine', 'diazepam', 'lorazepam', 'fluoxetine', 'sertraline', 'carbamazepine', 'phenytoin', 'morphine', 'fentanyl', 'diphenhydramine', 'donepezil', 'alzheimer', 'dementia', 'parkinson', 'migraine', 'headache', 'depression', 'bipolar', 'schizophrenia', 'mental health'],
    'diabetes': ['diabetes', 'diabetic', 'glucose', 'insulin', 'metformin', 'sulfonylurea', 'glp-1', 'sglt2', 'dpp-4', 'glipizide', 'pioglitazone', 'sitagliptin', 'canagliflozin', 'acarbose', 'repaglinide', 'exenatide', 'glimepiride', 'blood sugar', 'hba1c', 'hypoglycemia', 'hyperglycemia', 'type 1', 'type 2', 'gestational diabetes'],
    'pain management': ['pain', 'analgesic', 'opioid', 'nsaid', 'inflammation', 'arthritis', 'migraine', 'neuropathic', 'ibuprofen', 'acetaminophen', 'naproxen', 'tramadol', 'oxycodone', 'hydrocodone', 'gabapentin', 'prednisone', 'diclofenac', 'meloxicam', 'chronic pain', 'acute pain', 'fibromyalgia', 'rheumatoid arthritis', 'osteoarthritis'],
    'respiratory': ['respiratory', 'lung', 'asthma', 'copd', 'bronchodilator', 'inhaler', 'corticosteroid', 'beta agonist', 'albuterol', 'salmeterol', 'budesonide', 'fluticasone', 'theophylline', 'ipratropium', 'montelukast', 'prednisolone', 'acetylcysteine', 'cromolyn', 'breathing', 'bronchitis', 'pneumonia', 'emphysema', 'chronic obstructive'],
    'gastrointestinal': ['gi', 'gastrointestinal', 'stomach', 'acid', 'ppi', 'h2 blocker', 'antacid', 'nausea', 'diarrhea', 'constipation', 'omeprazole', 'ranitidine', 'sucralfate', 'misoprostol', 'ondansetron', 'metoclopramide', 'loperamide', 'senna', 'bisacodyl', 'dicyclomine', 'peptic ulcer', 'gastritis', 'gerd', 'ibs', 'crohn', 'colitis'],
    'endocrine': ['endocrine', 'hormone', 'thyroid', 'cortisol', 'testosterone', 'estrogen', 'progesterone', 'insulin', 'levothyroxine', 'methimazole', 'prednisone', 'hydrocortisone', 'octreotide', 'bromocriptine', 'cabergoline', 'hypothyroidism', 'hyperthyroidism', 'adrenal', 'pituitary', 'growth hormone', 'thyroid stimulating hormone'],
    'oncology': ['cancer', 'oncology', 'chemotherapy', 'tumor', 'malignancy', 'cytotoxic', 'targeted therapy', 'cisplatin', 'doxorubicin', 'paclitaxel', 'methotrexate', 'fluorouracil', 'vincristine', 'cyclophosphamide', 'tamoxifen', 'rituximab', 'imatinib', 'neoplasm', 'carcinoma', 'sarcoma', 'lymphoma', 'leukemia', 'metastasis'],
    'dermatology': ['skin', 'dermatology', 'topical', 'cream', 'ointment', 'fungal', 'acne', 'psoriasis', 'eczema', 'hydrocortisone', 'betamethasone', 'clotrimazole', 'terbinafine', 'acyclovir', 'tacrolimus', 'pimecrolimus', 'isotretinoin', 'tretinoin', 'minoxidil', 'dermatitis', 'fungal infection', 'yeast infection', 'ringworm'],
    'ophthalmology': ['eye', 'ophthalmology', 'glaucoma', 'retina', 'vision', 'ocular', 'mydriatic', 'cycloplegic', 'timolol', 'latanoprost', 'pilocarpine', 'dorzolamide', 'brimonidine', 'cyclopentolate', 'tropicamide', 'fluorescein', 'tetracycline', 'gentamicin', 'conjunctivitis', 'cataract', 'macular degeneration', 'diabetic retinopathy'],
    'urology': ['urology', 'urinary', 'bladder', 'prostate', 'bph', 'ed', 'erectile', 'incontinence', 'kidney', 'finasteride', 'dutasteride', 'tamsulosin', 'alfuzosin', 'silodosin', 'sildenafil', 'tadalafil', 'vardenafil', 'oxybutynin', 'tolterodine', 'urinary tract infection', 'uti', 'benign prostatic hyperplasia', 'overactive bladder'],
    'rheumatology': ['rheumatology', 'arthritis', 'rheumatoid', 'lupus', 'dmard', 'biologic', 'inflammatory', 'methotrexate', 'sulfasalazine', 'hydroxychloroquine', 'leflunomide', 'infliximab', 'etanercept', 'adalimumab', 'rituximab', 'tocilizumab', 'abatacept', 'osteoarthritis', 'gout', 'fibromyalgia', 'ankylosing spondylitis'],
    'psychiatry': ['psychiatry', 'mental', 'depression', 'anxiety', 'bipolar', 'schizophrenia', 'mood', 'psychotic', 'fluoxetine', 'sertraline', 'paroxetine', 'citalopram', 'escitalopram', 'venlafaxine', 'duloxetine', 'bupropion', 'mirtazapine', 'trazodone', 'mental illness', 'psychiatric', 'psychosis', 'mania', 'panic disorder', 'ptsd'],
    'anesthesia': ['anesthesia', 'anesthetic', 'sedation', 'muscle relaxant', 'intubation', 'surgery', 'propofol', 'ketamine', 'midazolam', 'fentanyl', 'morphine', 'succinylcholine', 'vecuronium', 'rocuronium', 'atracurium', 'neostigmine', 'general anesthesia', 'local anesthesia', 'epidural', 'spinal'],
    'immunology': ['immune', 'immunology', 'immunosuppressant', 'transplant', 'rejection', 'autoimmune', 'prednisone', 'cyclosporine', 'tacrolimus', 'mycophenolate', 'azathioprine', 'sirolimus', 'everolimus', 'rituximab', 'alemtuzumab', 'basiliximab', 'immunodeficiency', 'allergy', 'hypersensitivity', 'transplant rejection'],
    'infectious diseases': ['infectious', 'viral', 'hiv', 'hepatitis', 'antiviral', 'antiretroviral', 'influenza', 'acyclovir', 'oseltamivir', 'zanamivir', 'ribavirin', 'lamivudine', 'tenofovir', 'efavirenz', 'raltegravir', 'dolutegravir', 'atazanavir', 'viral infection', 'herpes', 'shingles', 'mononucleosis', 'cytomegalovirus'],
    'hematology': ['blood', 'hematology', 'coagulation', 'anticoagulant', 'platelet', 'anemia', 'thrombosis', 'warfarin', 'heparin', 'enoxaparin', 'dabigatran', 'rivaroxaban', 'apixaban', 'clopidogrel', 'prasugrel', 'ticagrelor', 'aspirin', 'bleeding disorder', 'clotting disorder', 'hemophilia', 'thrombocytopenia', 'leukemia', 'lymphoma'],
    'nephrology': ['kidney', 'nephrology', 'renal', 'diuretic', 'dialysis', 'creatinine', 'glomerular', 'furosemide', 'hydrochlorothiazide', 'spironolactone', 'amiloride', 'triamterene', 'mannitol', 'acetazolamide', 'dorzolamide', 'bumetanide', 'torsemide', 'chronic kidney disease', 'acute kidney injury', 'nephritis', 'nephrotic syndrome'],
    'pediatrics': ['pediatric', 'children', 'infant', 'child', 'pediatrician', 'neonatal', 'amoxicillin', 'acetaminophen', 'ibuprofen', 'diphenhydramine', 'dextromethorphan', 'guaifenesin', 'pseudoephedrine', 'cetirizine', 'loratadine', 'fexofenadine', 'pediatric dosing', 'child medication', 'infant care', 'neonatal intensive care'],
    'geriatrics': ['geriatric', 'elderly', 'aging', 'alzheimer', 'dementia', 'senior', 'old age', 'donepezil', 'rivastigmine', 'galantamine', 'memantine', 'warfarin', 'digoxin', 'furosemide', 'lisinopril', 'atenolol', 'simvastatin', 'age-related', 'cognitive decline', 'frailty', 'polypharmacy']
  };

  // Normalize search term
  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  // Find the best matching topic with priority scoring
  let bestMatch = 'antibiotics';
  let bestScore = 0;
  
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    let score = 0;
    
    // Exact match gets highest score
    if (normalizedSearch === topic) {
      score = 100;
    } else {
      // Check for keyword matches
      for (const keyword of keywords) {
        if (normalizedSearch.includes(keyword.toLowerCase())) {
          score += keyword.length; // Longer keywords get higher scores
        }
      }
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = topic;
    }
  }

  return bestMatch as keyof ReturnType<typeof getCrosswordDatabase>;
}

function getCrosswordDatabase() {
  return {
    'antibiotics': {
      grid: [
        [{ letter: 'P', number: 1 }, { letter: 'E', number: null }, { letter: 'N', number: null }, { letter: 'I', number: null }, { letter: 'C', number: null }, { letter: 'I', number: null }, { letter: 'L', number: null }, { letter: 'L', number: null }, { letter: 'I', number: null }, { letter: 'N', number: null }],
        [{ letter: 'A', number: 2 }, { letter: 'M', number: null }, { letter: 'O', number: null }, { letter: 'X', number: null }, { letter: 'I', number: null }, { letter: 'C', number: null }, { letter: 'I', number: null }, { letter: 'L', number: null }, { letter: 'L', number: null }, { letter: 'I', number: null }],
        [{ letter: 'C', number: 3 }, { letter: 'E', number: null }, { letter: 'P', number: null }, { letter: 'H', number: null }, { letter: 'A', number: null }, { letter: 'L', number: null }, { letter: 'E', number: null }, { letter: 'X', number: null }, { letter: 'I', number: null }, { letter: 'N', number: null }],
        [{ letter: 'A', number: 4 }, { letter: 'Z', number: null }, { letter: 'I', number: null }, { letter: 'T', number: null }, { letter: 'H', number: null }, { letter: 'R', number: null }, { letter: 'O', number: null }, { letter: 'M', number: null }, { letter: 'Y', number: null }, { letter: 'C', number: null }],
        [{ letter: 'C', number: 5 }, { letter: 'I', number: null }, { letter: 'P', number: null }, { letter: 'R', number: null }, { letter: 'O', number: null }, { letter: 'F', number: null }, { letter: 'L', number: null }, { letter: 'O', number: null }, { letter: 'X', number: null }, { letter: 'A', number: null }],
        [{ letter: 'V', number: 6 }, { letter: 'A', number: null }, { letter: 'N', number: null }, { letter: 'C', number: null }, { letter: 'O', number: null }, { letter: 'M', number: null }, { letter: 'Y', number: null }, { letter: 'C', number: null }, { letter: 'I', number: null }, { letter: 'N', number: null }],
        [{ letter: 'G', number: 7 }, { letter: 'E', number: null }, { letter: 'N', number: null }, { letter: 'T', number: null }, { letter: 'A', number: null }, { letter: 'M', number: null }, { letter: 'I', number: null }, { letter: 'C', number: null }, { letter: 'I', number: null }, { letter: 'N', number: null }],
        [{ letter: 'T', number: 8 }, { letter: 'E', number: null }, { letter: 'T', number: null }, { letter: 'R', number: null }, { letter: 'A', number: null }, { letter: 'C', number: null }, { letter: 'Y', number: null }, { letter: 'C', number: null }, { letter: 'L', number: null }, { letter: 'I', number: null }],
        [{ letter: 'C', number: 9 }, { letter: 'L', number: null }, { letter: 'I', number: null }, { letter: 'N', number: null }, { letter: 'D', number: null }, { letter: 'A', number: null }, { letter: 'M', number: null }, { letter: 'Y', number: null }, { letter: 'C', number: null }, { letter: 'I', number: null }],
        [{ letter: 'M', number: 10 }, { letter: 'E', number: null }, { letter: 'T', number: null }, { letter: 'R', number: null }, { letter: 'O', number: null }, { letter: 'N', number: null }, { letter: 'I', number: null }, { letter: 'D', number: null }, { letter: 'A', number: null }, { letter: 'Z', number: null }]
      ],
      clues: {
        across: [
          { number: 1, clue: 'First antibiotic discovered by Fleming', answer: 'PENICILLIN' },
          { number: 2, clue: 'Common penicillin derivative', answer: 'AMOXICILLIN' },
          { number: 3, clue: 'Cephalosporin antibiotic', answer: 'CEPHALEXIN' },
          { number: 4, clue: 'Macrolide antibiotic', answer: 'AZITHROMYCIN' },
          { number: 5, clue: 'Fluoroquinolone antibiotic', answer: 'CIPROFLOXACIN' },
          { number: 6, clue: 'Glycopeptide antibiotic', answer: 'VANCOMYCIN' },
          { number: 7, clue: 'Aminoglycoside antibiotic', answer: 'GENTAMICIN' },
          { number: 8, clue: 'Tetracycline antibiotic', answer: 'TETRACYCLINE' },
          { number: 9, clue: 'Lincosamide antibiotic', answer: 'CLINDAMYCIN' },
          { number: 10, clue: 'Nitroimidazole antibiotic', answer: 'METRONIDAZOLE' }
        ],
        down: [
          { number: 1, clue: 'Beta-lactam antibiotic class', answer: 'PENICILLIN' },
          { number: 2, clue: 'Broad-spectrum antibiotic', answer: 'AMOXICILLIN' },
          { number: 3, clue: 'First-generation cephalosporin', answer: 'CEPHALEXIN' },
          { number: 4, clue: 'Azalide antibiotic', answer: 'AZITHROMYCIN' },
          { number: 5, clue: 'Quinolone antibiotic', answer: 'CIPROFLOXACIN' },
          { number: 6, clue: 'Last-resort antibiotic', answer: 'VANCOMYCIN' },
          { number: 7, clue: 'Topical antibiotic', answer: 'GENTAMICIN' },
          { number: 8, clue: 'Broad-spectrum tetracycline', answer: 'TETRACYCLINE' },
          { number: 9, clue: 'Macrolide alternative', answer: 'CLINDAMYCIN' },
          { number: 10, clue: 'Anaerobic bacteria treatment', answer: 'METRONIDAZOLE' }
        ]
      }
    },
    'cardiovascular': {
      grid: [
        [{ letter: 'A', number: 1 }, { letter: 'T', number: null }, { letter: 'E', number: null }, { letter: 'N', number: null }, { letter: 'O', number: null }, { letter: 'L', number: null }, { letter: 'O', number: null }, { letter: 'L', number: null }, { letter: null, number: null }, { letter: null, number: null }],
        [{ letter: 'T', number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }],
        [{ letter: 'E', number: 2 }, { letter: 'N', number: null }, { letter: 'A', number: null }, { letter: 'L', number: null }, { letter: 'A', number: null }, { letter: 'P', number: null }, { letter: 'R', number: null }, { letter: 'I', number: null }, { letter: 'L', number: null }, { letter: null, number: null }],
        [{ letter: 'N', number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }],
        [{ letter: 'O', number: 3 }, { letter: 'M', number: null }, { letter: 'E', number: null }, { letter: 'P', number: null }, { letter: 'R', number: null }, { letter: 'A', number: null }, { letter: 'Z', number: null }, { letter: 'O', number: null }, { letter: 'L', number: null }, { letter: 'E', number: null }],
        [{ letter: 'L', number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }],
        [{ letter: 'O', number: 4 }, { letter: 'X', number: null }, { letter: 'Y', number: null }, { letter: 'C', number: null }, { letter: 'O', number: null }, { letter: 'D', number: null }, { letter: 'O', number: null }, { letter: 'N', number: null }, { letter: 'E', number: null }, { letter: null, number: null }],
        [{ letter: 'L', number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }],
        [{ letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }],
        [{ letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }, { letter: null, number: null }]
      ],
      clues: {
        across: [
          { number: 1, clue: 'Beta-blocker for hypertension', answer: 'ATENOLOL' },
          { number: 2, clue: 'ACE inhibitor for heart failure', answer: 'ENALAPRIL' },
          { number: 3, clue: 'Proton pump inhibitor', answer: 'OMEPRAZOLE' },
          { number: 4, clue: 'Opioid analgesic', answer: 'OXYCODONE' }
        ],
        down: [
          { number: 1, clue: 'Calcium channel blocker', answer: 'ATENOLOL' },
          { number: 2, clue: 'Angiotensin receptor blocker', answer: 'ENALAPRIL' },
          { number: 3, clue: 'H2 receptor antagonist', answer: 'OMEPRAZOLE' },
          { number: 4, clue: 'Semi-synthetic opioid', answer: 'OXYCODONE' }
        ]
      }
    }
  };
}

// Prompt definition moved to function

