
'use server';
/**
 * @fileOverview AI-powered anagram generator for pharma games.
 *
 * - generateAnagrams - Creates a list of drug name anagrams based on a topic.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const AnagramSchema = z.object({
    anagram: z.string().describe("The scrambled drug name. Must be uppercase."),
    answer: z.string().describe("The correct, unscrambled drug name."),
    clue: z.string().describe("A short clue, such as the drug's class or a key use."),
});

const AnagramGeneratorInputSchema = z.object({
  topic: z.string().describe("The topic for the anagrams (e.g., 'Antibiotics', 'Cardiovascular Drugs')."),
  count: z.coerce.number().optional().default(10).describe("The desired number of anagrams."),
});
export type AnagramGeneratorInput = z.infer<typeof AnagramGeneratorInputSchema>;

const AnagramGeneratorOutputSchema = z.object({
    anagrams: z.array(AnagramSchema),
});
export type AnagramGeneratorOutput = z.infer<typeof AnagramGeneratorOutputSchema>;


export async function generateAnagrams(input: AnagramGeneratorInput): Promise<AnagramGeneratorOutput> {
  console.log('Anagram generator called with input:', input);
  
  try {
    const count = input.count || 10;
    
    // Create comprehensive AI prompt for anagram generation
    const prompt = `You are an expert pharmacy educator and game designer creating comprehensive anagram puzzles for pharmacy students. 

For the topic "${input.topic}", provide a COMPLETE educational experience with detailed explanations, mechanisms, and exactly ${count} unique anagram puzzles.

IMPORTANT: Provide FULL educational content, not just anagrams. The student should be able to learn everything about this topic from your response.

Include:
1. TOPIC OVERVIEW: Detailed explanation of what ${input.topic} are, their importance, and key concepts
2. KEY CONCEPTS: 3-5 most important concepts with detailed explanations
3. MECHANISMS: How these drugs work, with specific examples and clinical applications
4. CLINICAL SIGNIFICANCE: Why this topic matters in pharmacy practice
5. ANAGRAMS: Exactly ${count} unique, educational anagram puzzles with detailed explanations
6. STUDY TIPS: How to study and remember this topic effectively
7. PRACTICAL EXAMPLES: Real-world applications and case studies

Requirements for anagrams:
- Each anagram should be a scrambled drug name (uppercase letters only)
- Provide the correct unscrambled drug name as the answer
- Include a helpful clue about the drug's class or use
- Focus on commonly used medications in the specified topic
- Make the anagrams educational and appropriate for pharmacy students
- Connect each anagram to specific learning objectives
- Provide additional educational context for each drug

Topic: ${input.topic}
Number of anagrams: ${count}

Respond with valid JSON in this exact format:
{
  "anagrams": [
    {
      "anagram": "SCRAMBLED_DRUG_NAME",
      "answer": "Correct Drug Name",
      "clue": "Drug class or key use"
    }
  ]
}`;

    console.log('Calling AI for anagram generation...');
    const result = await generateStructuredResponse<AnagramGeneratorOutput>(prompt);
    console.log('AI anagram result:', result);

    // Validate the result has the expected structure
    if (result && typeof result === 'object' && 'anagrams' in result && Array.isArray(result.anagrams)) {
      console.log('AI anagram response valid, returning result');
      return result;
    } else {
      console.log('AI anagram response invalid, using fallback');
      return generateFallbackAnagrams(input);
    }
  } catch (error) {
    console.error('Anagram generation error:', error);
    console.log('Using fallback anagrams');
    return generateFallbackAnagrams(input);
  }
}

function generateFallbackAnagrams(input: AnagramGeneratorInput): AnagramGeneratorOutput {
  const count = input.count || 10;
  
  // Intelligent topic detection
  const detectedTopic = detectPharmacyTopic(input.topic?.toLowerCase() || '');
  
  // Generate anagrams based on detected topic
  const anagramDatabase = getAnagramDatabase();
  const topicAnagrams = anagramDatabase[detectedTopic] || anagramDatabase['antibiotics'];
  
  // Enhanced randomization with Fisher-Yates shuffle
  const shuffledAnagrams = [...topicAnagrams];
  for (let i = shuffledAnagrams.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledAnagrams[i], shuffledAnagrams[j]] = [shuffledAnagrams[j], shuffledAnagrams[i]];
  }
  
  // Select random anagrams up to the requested count
  const selectedAnagrams = shuffledAnagrams.slice(0, Math.min(count, topicAnagrams.length));
  
  return {
    anagrams: selectedAnagrams
  };
}

function detectPharmacyTopic(searchTerm: string): keyof ReturnType<typeof getAnagramDatabase> {
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

  return bestMatch as keyof ReturnType<typeof getAnagramDatabase>;
}

function getAnagramDatabase() {
  return {
    'antibiotics': [
      { anagram: 'PENICILLIN', answer: 'Penicillin', clue: 'First antibiotic discovered by Fleming' },
      { anagram: 'AMOXICILLIN', answer: 'Amoxicillin', clue: 'Broad-spectrum penicillin antibiotic' },
      { anagram: 'CEPHALEXIN', answer: 'Cephalexin', clue: 'First-generation cephalosporin' },
      { anagram: 'AZITHROMYCIN', answer: 'Azithromycin', clue: 'Macrolide antibiotic for respiratory infections' },
      { anagram: 'CIPROFLOXACIN', answer: 'Ciprofloxacin', clue: 'Fluoroquinolone antibiotic' },
      { anagram: 'VANCOMYCIN', answer: 'Vancomycin', clue: 'Glycopeptide antibiotic for MRSA' },
      { anagram: 'GENTAMICIN', answer: 'Gentamicin', clue: 'Aminoglycoside antibiotic' },
      { anagram: 'TETRACYCLINE', answer: 'Tetracycline', clue: 'Broad-spectrum antibiotic' },
      { anagram: 'CLINDAMYCIN', answer: 'Clindamycin', clue: 'Lincosamide antibiotic' },
      { anagram: 'METRONIDAZOLE', answer: 'Metronidazole', clue: 'Antiprotozoal and antibacterial' }
    ],
    'cardiovascular': [
      { anagram: 'ATENOLOL', answer: 'Atenolol', clue: 'Beta-blocker for hypertension' },
      { anagram: 'LISINOPRIL', answer: 'Lisinopril', clue: 'ACE inhibitor for heart failure' },
      { anagram: 'AMLODIPINE', answer: 'Amlodipine', clue: 'Calcium channel blocker' },
      { anagram: 'FUROSEMIDE', answer: 'Furosemide', clue: 'Loop diuretic' },
      { anagram: 'DIGOXIN', answer: 'Digoxin', clue: 'Cardiac glycoside' },
      { anagram: 'WARFARIN', answer: 'Warfarin', clue: 'Anticoagulant' },
      { anagram: 'SIMVASTATIN', answer: 'Simvastatin', clue: 'HMG-CoA reductase inhibitor' },
      { anagram: 'NITROGLYCERIN', answer: 'Nitroglycerin', clue: 'Vasodilator for angina' },
      { anagram: 'CLOPIDOGREL', answer: 'Clopidogrel', clue: 'Antiplatelet agent' },
      { anagram: 'LOSARTAN', answer: 'Losartan', clue: 'Angiotensin receptor blocker' }
    ],
    'cns drugs': [
      { anagram: 'DIAZEPAM', answer: 'Diazepam', clue: 'Benzodiazepine anxiolytic' },
      { anagram: 'LORAZEPAM', answer: 'Lorazepam', clue: 'Short-acting benzodiazepine' },
      { anagram: 'FLUOXETINE', answer: 'Fluoxetine', clue: 'SSRI antidepressant' },
      { anagram: 'SERTRALINE', answer: 'Sertraline', clue: 'SSRI for depression and anxiety' },
      { anagram: 'CARBAMAZEPINE', answer: 'Carbamazepine', clue: 'Anticonvulsant and mood stabilizer' },
      { anagram: 'PHENYTOIN', answer: 'Phenytoin', clue: 'Antiepileptic drug' },
      { anagram: 'MORPHINE', answer: 'Morphine', clue: 'Opioid analgesic' },
      { anagram: 'FENTANYL', answer: 'Fentanyl', clue: 'Potent synthetic opioid' },
      { anagram: 'DIPHENHYDRAMINE', answer: 'Diphenhydramine', clue: 'First-generation antihistamine' },
      { anagram: 'DONEPEZIL', answer: 'Donepezil', clue: 'Cholinesterase inhibitor for Alzheimer\'s' }
    ],
    'diabetes': [
      { anagram: 'METFORMIN', answer: 'Metformin', clue: 'First-line treatment for Type 2 diabetes' },
      { anagram: 'INSULIN', answer: 'Insulin', clue: 'Hormone for glucose regulation' },
      { anagram: 'GLIPIZIDE', answer: 'Glipizide', clue: 'Sulfonylurea antidiabetic' },
      { anagram: 'PIOGLITAZONE', answer: 'Pioglitazone', clue: 'Thiazolidinedione antidiabetic' },
      { anagram: 'SITAGLIPTIN', answer: 'Sitagliptin', clue: 'DPP-4 inhibitor' },
      { anagram: 'CANAGLIFLOZIN', answer: 'Canagliflozin', clue: 'SGLT2 inhibitor' },
      { anagram: 'ACARBOSE', answer: 'Acarbose', clue: 'Alpha-glucosidase inhibitor' },
      { anagram: 'REPAGLINIDE', answer: 'Repaglinide', clue: 'Meglitinide antidiabetic' },
      { anagram: 'EXENATIDE', answer: 'Exenatide', clue: 'GLP-1 receptor agonist' },
      { anagram: 'GLIMEPIRIDE', answer: 'Glimepiride', clue: 'Second-generation sulfonylurea' }
    ],
    'pain management': [
      { anagram: 'IBUPROFEN', answer: 'Ibuprofen', clue: 'NSAID for pain and inflammation' },
      { anagram: 'ACETAMINOPHEN', answer: 'Acetaminophen', clue: 'Analgesic and antipyretic' },
      { anagram: 'NAPROXEN', answer: 'Naproxen', clue: 'NSAID with longer half-life' },
      { anagram: 'TRAMADOL', answer: 'Tramadol', clue: 'Synthetic opioid analgesic' },
      { anagram: 'OXYCODONE', answer: 'Oxycodone', clue: 'Semi-synthetic opioid' },
      { anagram: 'HYDROCODONE', answer: 'Hydrocodone', clue: 'Opioid often combined with acetaminophen' },
      { anagram: 'GABAPENTIN', answer: 'Gabapentin', clue: 'Anticonvulsant used for neuropathic pain' },
      { anagram: 'PREDNISONE', answer: 'Prednisone', clue: 'Corticosteroid for inflammation' },
      { anagram: 'DICLOFENAC', answer: 'Diclofenac', clue: 'NSAID available in topical form' },
      { anagram: 'MELOXICAM', answer: 'Meloxicam', clue: 'Selective COX-2 inhibitor' }
    ],
    'respiratory': [
      { anagram: 'ALBUTEROL', answer: 'Albuterol', clue: 'Short-acting beta-2 agonist' },
      { anagram: 'SALMETEROL', answer: 'Salmeterol', clue: 'Long-acting beta-2 agonist' },
      { anagram: 'BUDESONIDE', answer: 'Budesonide', clue: 'Inhaled corticosteroid' },
      { anagram: 'FLUTICASONE', answer: 'Fluticasone', clue: 'Inhaled corticosteroid for asthma' },
      { anagram: 'THEOPHYLLINE', answer: 'Theophylline', clue: 'Methylxanthine bronchodilator' },
      { anagram: 'IPRATROPIUM', answer: 'Ipratropium', clue: 'Anticholinergic bronchodilator' },
      { anagram: 'MONTELUKAST', answer: 'Montelukast', clue: 'Leukotriene receptor antagonist' },
      { anagram: 'PREDNISOLONE', answer: 'Prednisolone', clue: 'Oral corticosteroid' },
      { anagram: 'ACETYLCYSTEINE', answer: 'Acetylcysteine', clue: 'Mucolytic agent' },
      { anagram: 'CROMOLYN', answer: 'Cromolyn', clue: 'Mast cell stabilizer' }
    ],
    'gastrointestinal': [
      { anagram: 'OMEPRAZOLE', answer: 'Omeprazole', clue: 'Proton pump inhibitor' },
      { anagram: 'RANITIDINE', answer: 'Ranitidine', clue: 'H2 receptor antagonist' },
      { anagram: 'SUCRALFATE', answer: 'Sucralfate', clue: 'Cytoprotective agent' },
      { anagram: 'MISOPROSTOL', answer: 'Misoprostol', clue: 'Prostaglandin analog' },
      { anagram: 'ONDANSETRON', answer: 'Ondansetron', clue: '5-HT3 receptor antagonist' },
      { anagram: 'METOCLOPRAMIDE', answer: 'Metoclopramide', clue: 'Dopamine antagonist' },
      { anagram: 'LOPERAMIDE', answer: 'Loperamide', clue: 'Antidiarrheal agent' },
      { anagram: 'SENNA', answer: 'Senna', clue: 'Stimulant laxative' },
      { anagram: 'BISACODYL', answer: 'Bisacodyl', clue: 'Stimulant laxative' },
      { anagram: 'DICYCLOMINE', answer: 'Dicyclomine', clue: 'Anticholinergic for IBS' }
    ],
    'endocrine': [
      { anagram: 'LEVOTHYROXINE', answer: 'Levothyroxine', clue: 'Thyroid hormone replacement' },
      { anagram: 'METHIMAZOLE', answer: 'Methimazole', clue: 'Antithyroid medication' },
      { anagram: 'PREDNISONE', answer: 'Prednisone', clue: 'Synthetic corticosteroid' },
      { anagram: 'HYDROCORTISONE', answer: 'Hydrocortisone', clue: 'Natural corticosteroid' },
      { anagram: 'TESTOSTERONE', answer: 'Testosterone', clue: 'Male sex hormone' },
      { anagram: 'ESTRADIOL', answer: 'Estradiol', clue: 'Female sex hormone' },
      { anagram: 'PROGESTERONE', answer: 'Progesterone', clue: 'Progestin hormone' },
      { anagram: 'OCTREOTIDE', answer: 'Octreotide', clue: 'Somatostatin analogue' },
      { anagram: 'BROMOCRIPTINE', answer: 'Bromocriptine', clue: 'Dopamine agonist' },
      { anagram: 'CABERGOLINE', answer: 'Cabergoline', clue: 'Dopamine agonist for prolactinoma' }
    ],
    'oncology': [
      { anagram: 'CISPLATIN', answer: 'Cisplatin', clue: 'Platinum-based chemotherapy' },
      { anagram: 'DOXORUBICIN', answer: 'Doxorubicin', clue: 'Anthracycline chemotherapy' },
      { anagram: 'PACLITAXEL', answer: 'Paclitaxel', clue: 'Taxane chemotherapy' },
      { anagram: 'METHOTREXATE', answer: 'Methotrexate', clue: 'Antimetabolite chemotherapy' },
      { anagram: 'FLUOROURACIL', answer: 'Fluorouracil', clue: 'Pyrimidine antimetabolite' },
      { anagram: 'VINCRISTINE', answer: 'Vincristine', clue: 'Vinca alkaloid chemotherapy' },
      { anagram: 'CYCLOPHOSPHAMIDE', answer: 'Cyclophosphamide', clue: 'Alkylating agent' },
      { anagram: 'TAMOXIFEN', answer: 'Tamoxifen', clue: 'Selective estrogen receptor modulator' },
      { anagram: 'RITUXIMAB', answer: 'Rituximab', clue: 'Monoclonal antibody' },
      { anagram: 'IMATINIB', answer: 'Imatinib', clue: 'Tyrosine kinase inhibitor' }
    ],
    'dermatology': [
      { anagram: 'HYDROCORTISONE', answer: 'Hydrocortisone', clue: 'Topical corticosteroid' },
      { anagram: 'BETAMETHASONE', answer: 'Betamethasone', clue: 'Potent topical steroid' },
      { anagram: 'CLOTRIMAZOLE', answer: 'Clotrimazole', clue: 'Antifungal medication' },
      { anagram: 'TERBINAFINE', answer: 'Terbinafine', clue: 'Antifungal for nail infections' },
      { anagram: 'ACYCLOVIR', answer: 'Acyclovir', clue: 'Antiviral for herpes' },
      { anagram: 'TACROLIMUS', answer: 'Tacrolimus', clue: 'Topical calcineurin inhibitor' },
      { anagram: 'PIMECROLIMUS', answer: 'Pimecrolimus', clue: 'Topical immunomodulator' },
      { anagram: 'ISOTRETINOIN', answer: 'Isotretinoin', clue: 'Retinoid for acne' },
      { anagram: 'TREATINOIN', answer: 'Tretinoin', clue: 'Topical retinoid' },
      { anagram: 'MINOXIDIL', answer: 'Minoxidil', clue: 'Hair growth stimulant' }
    ],
    'ophthalmology': [
      { anagram: 'TIMOLOL', answer: 'Timolol', clue: 'Beta-blocker for glaucoma' },
      { anagram: 'LATANOPROST', answer: 'Latanoprost', clue: 'Prostaglandin analogue for glaucoma' },
      { anagram: 'PILOCARPINE', answer: 'Pilocarpine', clue: 'Cholinergic for glaucoma' },
      { anagram: 'DORZOLAMIDE', answer: 'Dorzolamide', clue: 'Carbonic anhydrase inhibitor' },
      { anagram: 'BRIMONIDINE', answer: 'Brimonidine', clue: 'Alpha-2 agonist for glaucoma' },
      { anagram: 'CYCLOPENTOLATE', answer: 'Cyclopentolate', clue: 'Cycloplegic mydriatic' },
      { anagram: 'TROPICAMIDE', answer: 'Tropicamide', clue: 'Mydriatic for eye examination' },
      { anagram: 'FLUORESCEIN', answer: 'Fluorescein', clue: 'Diagnostic dye for eye examination' },
      { anagram: 'TETRACYCLINE', answer: 'Tetracycline', clue: 'Antibiotic for eye infections' },
      { anagram: 'GENTAMICIN', answer: 'Gentamicin', clue: 'Aminoglycoside for eye infections' }
    ],
    'urology': [
      { anagram: 'FINASTERIDE', answer: 'Finasteride', clue: '5-alpha reductase inhibitor' },
      { anagram: 'DUTASTERIDE', answer: 'Dutasteride', clue: '5-alpha reductase inhibitor for BPH' },
      { anagram: 'TAMSULOSIN', answer: 'Tamsulosin', clue: 'Alpha-1 blocker for BPH' },
      { anagram: 'ALFUZOSIN', answer: 'Alfuzosin', clue: 'Alpha-1 adrenergic antagonist' },
      { anagram: 'SILODOSIN', answer: 'Silodosin', clue: 'Selective alpha-1A blocker' },
      { anagram: 'SILDENAFIL', answer: 'Sildenafil', clue: 'PDE-5 inhibitor for ED' },
      { anagram: 'TADALAFIL', answer: 'Tadalafil', clue: 'Long-acting PDE-5 inhibitor' },
      { anagram: 'VARDENAFIL', answer: 'Vardenafil', clue: 'PDE-5 inhibitor for erectile dysfunction' },
      { anagram: 'OXYBUTYNIN', answer: 'Oxybutynin', clue: 'Anticholinergic for overactive bladder' },
      { anagram: 'TOLTERODINE', answer: 'Tolterodine', clue: 'Muscarinic antagonist for OAB' }
    ],
    'rheumatology': [
      { anagram: 'METHOTREXATE', answer: 'Methotrexate', clue: 'DMARD for rheumatoid arthritis' },
      { anagram: 'SULFASALAZINE', answer: 'Sulfasalazine', clue: 'DMARD for inflammatory arthritis' },
      { anagram: 'HYDROXYCHLOROQUINE', answer: 'Hydroxychloroquine', clue: 'Antimalarial DMARD' },
      { anagram: 'LEFLUNOMIDE', answer: 'Leflunomide', clue: 'DMARD for rheumatoid arthritis' },
      { anagram: 'INFLIXIMAB', answer: 'Infliximab', clue: 'TNF-alpha inhibitor' },
      { anagram: 'ETANERCEPT', answer: 'Etanercept', clue: 'TNF receptor blocker' },
      { anagram: 'ADALIMUMAB', answer: 'Adalimumab', clue: 'TNF-alpha monoclonal antibody' },
      { anagram: 'RITUXIMAB', answer: 'Rituximab', clue: 'CD20 monoclonal antibody' },
      { anagram: 'TOCILIZUMAB', answer: 'Tocilizumab', clue: 'IL-6 receptor antagonist' },
      { anagram: 'ABATACEPT', answer: 'Abatacept', clue: 'T-cell costimulation blocker' }
    ],
    'psychiatry': [
      { anagram: 'FLUOXETINE', answer: 'Fluoxetine', clue: 'SSRI antidepressant' },
      { anagram: 'SERTRALINE', answer: 'Sertraline', clue: 'SSRI for depression and anxiety' },
      { anagram: 'PAROXETINE', answer: 'Paroxetine', clue: 'SSRI antidepressant' },
      { anagram: 'CITALOPRAM', answer: 'Citalopram', clue: 'SSRI for depression' },
      { anagram: 'ESCITALOPRAM', answer: 'Escitalopram', clue: 'SSRI antidepressant' },
      { anagram: 'VENLAFAXINE', answer: 'Venlafaxine', clue: 'SNRI antidepressant' },
      { anagram: 'DULOXETINE', answer: 'Duloxetine', clue: 'SNRI for depression and pain' },
      { anagram: 'BUPROPION', answer: 'Bupropion', clue: 'NDRI antidepressant' },
      { anagram: 'MIRTAZAPINE', answer: 'Mirtazapine', clue: 'Tetracyclic antidepressant' },
      { anagram: 'TRAZODONE', answer: 'Trazodone', clue: 'SARI antidepressant' }
    ],
    'anesthesia': [
      { anagram: 'PROPOFOL', answer: 'Propofol', clue: 'Intravenous anesthetic' },
      { anagram: 'KETAMINE', answer: 'Ketamine', clue: 'Dissociative anesthetic' },
      { anagram: 'MIDAZOLAM', answer: 'Midazolam', clue: 'Benzodiazepine for sedation' },
      { anagram: 'FENTANYL', answer: 'Fentanyl', clue: 'Potent synthetic opioid' },
      { anagram: 'MORPHINE', answer: 'Morphine', clue: 'Opioid analgesic' },
      { anagram: 'SUCCINYLCHOLINE', answer: 'Succinylcholine', clue: 'Depolarizing muscle relaxant' },
      { anagram: 'VECURONIUM', answer: 'Vecuronium', clue: 'Non-depolarizing muscle relaxant' },
      { anagram: 'ROCURONIUM', answer: 'Rocuronium', clue: 'Non-depolarizing muscle relaxant' },
      { anagram: 'ATRACURIUM', answer: 'Atracurium', clue: 'Non-depolarizing muscle relaxant' },
      { anagram: 'NEOSTIGMINE', answer: 'Neostigmine', clue: 'Cholinesterase inhibitor' }
    ],
    'immunology': [
      { anagram: 'PREDNISONE', answer: 'Prednisone', clue: 'Immunosuppressive corticosteroid' },
      { anagram: 'CYCLOSPORINE', answer: 'Cyclosporine', clue: 'Calcineurin inhibitor immunosuppressant' },
      { anagram: 'TACROLIMUS', answer: 'Tacrolimus', clue: 'Calcineurin inhibitor' },
      { anagram: 'MYCOPHENOLATE', answer: 'Mycophenolate', clue: 'Antimetabolite immunosuppressant' },
      { anagram: 'AZATHIOPRINE', answer: 'Azathioprine', clue: 'Purine antimetabolite' },
      { anagram: 'SIROLIMUS', answer: 'Sirolimus', clue: 'mTOR inhibitor immunosuppressant' },
      { anagram: 'EVEROLIMUS', answer: 'Everolimus', clue: 'mTOR inhibitor' },
      { anagram: 'RITUXIMAB', answer: 'Rituximab', clue: 'CD20 monoclonal antibody' },
      { anagram: 'ALEMTUZUMAB', answer: 'Alemtuzumab', clue: 'CD52 monoclonal antibody' },
      { anagram: 'BASILIXIMAB', answer: 'Basiliximab', clue: 'IL-2 receptor antagonist' }
    ],
    'infectious diseases': [
      { anagram: 'ACYCLOVIR', answer: 'Acyclovir', clue: 'Antiviral for herpes infections' },
      { anagram: 'OSELTAMIVIR', answer: 'Oseltamivir', clue: 'Neuraminidase inhibitor for influenza' },
      { anagram: 'ZANAMIVIR', answer: 'Zanamivir', clue: 'Inhaled neuraminidase inhibitor' },
      { anagram: 'RIBAVIRIN', answer: 'Ribavirin', clue: 'Antiviral for hepatitis C' },
      { anagram: 'LAMIVUDINE', answer: 'Lamivudine', clue: 'NRTI for HIV and hepatitis B' },
      { anagram: 'TENOFOVIR', answer: 'Tenofovir', clue: 'NRTI for HIV and hepatitis B' },
      { anagram: 'EFAVIRENZ', answer: 'Efavirenz', clue: 'NNRTI for HIV' },
      { anagram: 'RALTEGRAVIR', answer: 'Raltegravir', clue: 'Integrase inhibitor for HIV' },
      { anagram: 'DOLUTEGRAVIR', answer: 'Dolutegravir', clue: 'Integrase inhibitor for HIV' },
      { anagram: 'ATAZANAVIR', answer: 'Atazanavir', clue: 'Protease inhibitor for HIV' }
    ],
    'hematology': [
      { anagram: 'WARFARIN', answer: 'Warfarin', clue: 'Vitamin K antagonist anticoagulant' },
      { anagram: 'HEPARIN', answer: 'Heparin', clue: 'Anticoagulant for thrombosis' },
      { anagram: 'ENOXAPARIN', answer: 'Enoxaparin', clue: 'Low molecular weight heparin' },
      { anagram: 'DABIGATRAN', answer: 'Dabigatran', clue: 'Direct thrombin inhibitor' },
      { anagram: 'RIVAROXABAN', answer: 'Rivaroxaban', clue: 'Factor Xa inhibitor' },
      { anagram: 'APIXABAN', answer: 'Apixaban', clue: 'Factor Xa inhibitor' },
      { anagram: 'CLOPIDOGREL', answer: 'Clopidogrel', clue: 'P2Y12 receptor antagonist' },
      { anagram: 'PRASUGREL', answer: 'Prasugrel', clue: 'P2Y12 receptor antagonist' },
      { anagram: 'TICAGRELOR', answer: 'Ticagrelor', clue: 'P2Y12 receptor antagonist' },
      { anagram: 'ASPIRIN', answer: 'Aspirin', clue: 'COX-1 inhibitor antiplatelet' }
    ],
    'nephrology': [
      { anagram: 'FUROSEMIDE', answer: 'Furosemide', clue: 'Loop diuretic' },
      { anagram: 'HYDROCHLOROTHIAZIDE', answer: 'Hydrochlorothiazide', clue: 'Thiazide diuretic' },
      { anagram: 'SPIRONOLACTONE', answer: 'Spironolactone', clue: 'Potassium-sparing diuretic' },
      { anagram: 'AMILORIDE', answer: 'Amiloride', clue: 'Potassium-sparing diuretic' },
      { anagram: 'TRIAMTERENE', answer: 'Triamterene', clue: 'Potassium-sparing diuretic' },
      { anagram: 'MANNITOL', answer: 'Mannitol', clue: 'Osmotic diuretic' },
      { anagram: 'ACETAZOLAMIDE', answer: 'Acetazolamide', clue: 'Carbonic anhydrase inhibitor' },
      { anagram: 'DORZOLAMIDE', answer: 'Dorzolamide', clue: 'Topical carbonic anhydrase inhibitor' },
      { anagram: 'BUMETANIDE', answer: 'Bumetanide', clue: 'Loop diuretic' },
      { anagram: 'TORSEMIDE', answer: 'Torsemide', clue: 'Loop diuretic' }
    ],
    'pediatrics': [
      { anagram: 'AMOXICILLIN', answer: 'Amoxicillin', clue: 'First-line antibiotic for children' },
      { anagram: 'ACETAMINOPHEN', answer: 'Acetaminophen', clue: 'Pediatric antipyretic' },
      { anagram: 'IBUPROFEN', answer: 'Ibuprofen', clue: 'Pediatric NSAID' },
      { anagram: 'DIPHENHYDRAMINE', answer: 'Diphenhydramine', clue: 'Antihistamine for children' },
      { anagram: 'DEXTROMETHORPHAN', answer: 'Dextromethorphan', clue: 'Pediatric cough suppressant' },
      { anagram: 'GUAIFENESIN', answer: 'Guaifenesin', clue: 'Expectorant for children' },
      { anagram: 'PSEUDOEPHEDRINE', answer: 'Pseudoephedrine', clue: 'Decongestant for children' },
      { anagram: 'CETIRIZINE', answer: 'Cetirizine', clue: 'Second-generation antihistamine' },
      { anagram: 'LORATADINE', answer: 'Loratadine', clue: 'Non-sedating antihistamine' },
      { anagram: 'FEXOFENADINE', answer: 'Fexofenadine', clue: 'Non-sedating antihistamine' }
    ],
    'geriatrics': [
      { anagram: 'DONEPEZIL', answer: 'Donepezil', clue: 'Cholinesterase inhibitor for Alzheimer\'s' },
      { anagram: 'RIVASTIGMINE', answer: 'Rivastigmine', clue: 'Cholinesterase inhibitor' },
      { anagram: 'GALANTAMINE', answer: 'Galantamine', clue: 'Cholinesterase inhibitor' },
      { anagram: 'MEMANTINE', answer: 'Memantine', clue: 'NMDA receptor antagonist' },
      { anagram: 'WARFARIN', answer: 'Warfarin', clue: 'Anticoagulant for elderly' },
      { anagram: 'DIGOXIN', answer: 'Digoxin', clue: 'Cardiac glycoside for elderly' },
      { anagram: 'FUROSEMIDE', answer: 'Furosemide', clue: 'Loop diuretic for elderly' },
      { anagram: 'LISINOPRIL', answer: 'Lisinopril', clue: 'ACE inhibitor for elderly' },
      { anagram: 'ATENOLOL', answer: 'Atenolol', clue: 'Beta-blocker for elderly' },
      { anagram: 'SIMVASTATIN', answer: 'Simvastatin', clue: 'Statin for elderly' }
    ]
  };
}


// Prompt definition moved to function


