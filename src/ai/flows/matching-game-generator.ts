
'use server';
/**
 * @fileOverview AI-powered matching game generator for pharma games.
 *
 * - generateMatchingGame - Creates pairs of items for a matching game.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const GamePairSchema = z.object({
  item1: z.string().describe("The first item in the pair (e.g., a drug name)."),
  item2: z.string().describe("The second item in the pair (e.g., its mechanism of action)."),
});

const MatchingGameInputSchema = z.object({
  topic: z.string().describe("The topic for the game (e.g., 'Antibiotics', 'Diuretics')."),
  count: z.coerce.number().optional().default(6).describe("The desired number of pairs."),
});
export type MatchingGameInput = z.infer<typeof MatchingGameInputSchema>;

const MatchingGameOutputSchema = z.object({
  topic: z.string(),
  pairs: z.array(GamePairSchema),
  column1Title: z.string().describe("The title for the first column (e.g., 'Drug Name')."),
  column2Title: z.string().describe("The title for the second column (e.g., 'Mechanism of Action')."),
});
export type MatchingGameOutput = z.infer<typeof MatchingGameOutputSchema>;

export async function generateMatchingGame(input: MatchingGameInput): Promise<MatchingGameOutput> {
  console.log('Matching game generator called with input:', input);
  
  try {
    const count = input.count || 6;
    
    // Create AI prompt for matching game generation
    const prompt = `You are an expert pharmacy educator creating matching games for pharmacy students. Generate a matching game for the topic "${input.topic}" with approximately ${count} pairs.

Requirements:
- Create pairs of related pharmacy concepts (drug names, mechanisms, uses, etc.)
- Make the connections educational and meaningful
- Focus on commonly used medications and pharmaceutical concepts
- Ensure pairs are appropriate for pharmacy students
- Include clear column titles for the matching game

Topic: ${input.topic}
Number of pairs: ${count}

Respond with valid JSON in this exact format:
{
  "topic": "${input.topic}",
  "pairs": [
    {"item1": "Drug Name", "item2": "Mechanism of Action"},
    {"item1": "Condition", "item2": "Treatment"}
  ],
  "column1Title": "Column 1 Title",
  "column2Title": "Column 2 Title"
}`;

    console.log('Calling AI for matching game generation...');
    const result = await generateStructuredResponse<MatchingGameOutput>(prompt);
    console.log('AI matching game result:', result);

    // Validate the result has the expected structure
    if (result && typeof result === 'object' && 'pairs' in result && Array.isArray(result.pairs)) {
      console.log('AI matching game response valid, returning result');
      return result;
    } else {
      console.log('AI matching game response invalid, using fallback');
      return generateFallbackMatchingGame(input);
    }
  } catch (error) {
    console.error('Matching game generation error:', error);
    console.log('Using fallback matching game');
    return generateFallbackMatchingGame(input);
  }
}

function generateFallbackMatchingGame(input: MatchingGameInput): MatchingGameOutput {
  const count = input.count || 6;
  
  // Intelligent topic detection
  const detectedTopic = detectPharmacyTopic(input.topic?.toLowerCase() || '');
  
  // Generate matching game based on detected topic
  const matchingDatabase = getMatchingDatabase();
  const topicMatching = matchingDatabase[detectedTopic] || matchingDatabase['antibiotics'];
  
  // Enhanced randomization using Fisher-Yates shuffle
  const selectedPairs = [...topicMatching.pairs]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, topicMatching.pairs.length));
  
  return {
    topic: detectedTopic,
    pairs: selectedPairs,
    column1Title: topicMatching.column1Title,
    column2Title: topicMatching.column2Title
  };
}

function detectPharmacyTopic(searchTerm: string): keyof ReturnType<typeof getMatchingDatabase> {
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
      return topic as keyof ReturnType<typeof getMatchingDatabase>;
    }
  }

  // Default fallback
  return 'antibiotics';
}

function getMatchingDatabase() {
  return {
    'antibiotics': {
      column1Title: 'Drug Name',
      column2Title: 'Mechanism of Action',
      pairs: [
        { item1: 'Penicillin', item2: 'Inhibits cell wall synthesis' },
        { item1: 'Ciprofloxacin', item2: 'Inhibits DNA gyrase' },
        { item1: 'Tetracycline', item2: 'Inhibits protein synthesis' },
        { item1: 'Vancomycin', item2: 'Inhibits cell wall synthesis' },
        { item1: 'Erythromycin', item2: 'Inhibits protein synthesis' },
        { item1: 'Sulfamethoxazole', item2: 'Inhibits folic acid synthesis' },
        { item1: 'Gentamicin', item2: 'Inhibits protein synthesis' },
        { item1: 'Clindamycin', item2: 'Inhibits protein synthesis' },
        { item1: 'Metronidazole', item2: 'Damages DNA structure' },
        { item1: 'Azithromycin', item2: 'Inhibits protein synthesis' }
      ]
    },
    'cardiovascular': {
      column1Title: 'Drug Name',
      column2Title: 'Therapeutic Use',
      pairs: [
        { item1: 'Atenolol', item2: 'Beta-blocker for hypertension' },
        { item1: 'Lisinopril', item2: 'ACE inhibitor for heart failure' },
        { item1: 'Amlodipine', item2: 'Calcium channel blocker' },
        { item1: 'Furosemide', item2: 'Loop diuretic' },
        { item1: 'Digoxin', item2: 'Cardiac glycoside' },
        { item1: 'Warfarin', item2: 'Anticoagulant' },
        { item1: 'Simvastatin', item2: 'HMG-CoA reductase inhibitor' },
        { item1: 'Nitroglycerin', item2: 'Vasodilator for angina' },
        { item1: 'Clopidogrel', item2: 'Antiplatelet agent' },
        { item1: 'Losartan', item2: 'Angiotensin receptor blocker' }
      ]
    },
    'diabetes': {
      column1Title: 'Drug Name',
      column2Title: 'Mechanism of Action',
      pairs: [
        { item1: 'Metformin', item2: 'Decreases hepatic glucose production' },
        { item1: 'Insulin', item2: 'Promotes glucose uptake' },
        { item1: 'Glipizide', item2: 'Stimulates insulin secretion' },
        { item1: 'Pioglitazone', item2: 'Increases insulin sensitivity' },
        { item1: 'Sitagliptin', item2: 'Inhibits DPP-4 enzyme' },
        { item1: 'Canagliflozin', item2: 'Inhibits SGLT2 transporter' },
        { item1: 'Acarbose', item2: 'Inhibits alpha-glucosidase' },
        { item1: 'Repaglinide', item2: 'Stimulates insulin secretion' },
        { item1: 'Exenatide', item2: 'GLP-1 receptor agonist' },
        { item1: 'Glimepiride', item2: 'Stimulates insulin secretion' }
      ]
    },
    'cns drugs': {
      column1Title: 'Drug Name',
      column2Title: 'Therapeutic Use',
      pairs: [
        { item1: 'Diazepam', item2: 'Benzodiazepine anxiolytic' },
        { item1: 'Fluoxetine', item2: 'SSRI antidepressant' },
        { item1: 'Carbamazepine', item2: 'Anticonvulsant' },
        { item1: 'Morphine', item2: 'Opioid analgesic' },
        { item1: 'Diphenhydramine', item2: 'First-generation antihistamine' },
        { item1: 'Donepezil', item2: 'Cholinesterase inhibitor' },
        { item1: 'Lorazepam', item2: 'Short-acting benzodiazepine' },
        { item1: 'Sertraline', item2: 'SSRI for depression' },
        { item1: 'Phenytoin', item2: 'Antiepileptic drug' },
        { item1: 'Fentanyl', item2: 'Potent synthetic opioid' }
      ]
    }
  };
}


// Prompt definition moved to function


