
'use server';
/**
 * @fileOverview AI-powered Mnemonic Generator with a focus on Roman Urdu.
 *
 * - generateMnemonics - A function that creates mnemonics for a given topic and style.
 * - MnemonicGeneratorInput - The input type for the function.
 * - MnemonicGeneratorOutput - The return type for the function.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const MnemonicSchema = z.object({
  mnemonic: z.string().describe('The Roman Urdu mnemonic sentence or phrase.'),
  mapping: z.string().describe('A brief explanation of how the mnemonic maps to the English medical terms.'),
});

const MnemonicGeneratorInputSchema = z.object({
  topic: z.string().describe('The topic for the mnemonics (e.g., a drug class, ADRs, plant constituents).'),
  style: z.enum(['Funny', 'Serious', 'Story-based', 'Acronym', 'Visual']).describe('The desired style of the mnemonics.'),
});
export type MnemonicGeneratorInput = z.infer<typeof MnemonicGeneratorInputSchema>;

const MnemonicGeneratorOutputSchema = z.object({
  topic: z.string(),
  style: z.string(),
  mnemonics: z.array(MnemonicSchema).describe('A list of exactly 10 unique mnemonics.'),
});
export type MnemonicGeneratorOutput = z.infer<typeof MnemonicGeneratorOutputSchema>;

export async function generateMnemonics(input: MnemonicGeneratorInput): Promise<MnemonicGeneratorOutput> {
  console.log('Mnemonic generator called with input:', input);
  
  try {
    // Validate input
    const validatedInput = MnemonicGeneratorInputSchema.parse(input);
    console.log('Validated input:', validatedInput);
    
    // Create a comprehensive prompt for mnemonic generation
    const prompt = `You are an expert pharmacy educator and memory specialist specializing in creating memorable mnemonics for medical and pharmaceutical concepts. 

For the topic "${validatedInput.topic}", provide a COMPREHENSIVE study guide with detailed explanations, mechanisms, and exactly 10 unique, creative mnemonics in the style "${validatedInput.style}".

IMPORTANT: Provide FULL educational content, not just mnemonics. The student should be able to learn everything about this topic from your response.

Include:
1. TOPIC OVERVIEW: Detailed explanation of what ${validatedInput.topic} is, its importance, and key concepts
2. KEY CONCEPTS: 3-5 most important concepts with detailed explanations
3. MECHANISMS: How it works, with specific examples and clinical applications
4. CLINICAL SIGNIFICANCE: Why this topic matters in pharmacy practice
5. MNEMONICS: Exactly 10 unique, creative mnemonics with detailed explanations
6. STUDY TIPS: How to study and remember this topic effectively
7. PRACTICAL EXAMPLES: Real-world applications and case studies

Requirements for mnemonics:
- Each mnemonic should be in Roman Urdu (English script) for easy pronunciation
- Include a clear mapping explanation for each mnemonic
- Make them memorable and educational
- Ensure variety in approach (acronyms, stories, visual associations, etc.)
- Focus on medical/pharmaceutical accuracy
- Make them appropriate for pharmacy students and professionals
- Connect each mnemonic to specific learning objectives

Topic: ${validatedInput.topic}
Style: ${validatedInput.style}

Generate exactly 10 mnemonics with their mappings.

Respond with valid JSON in this exact format:
{
  "topic": "${validatedInput.topic}",
  "style": "${validatedInput.style}",
  "mnemonics": [
    {
      "mnemonic": "Your mnemonic here",
      "mapping": "Explanation here"
    }
  ]
}`;

    console.log('Calling AI with prompt...');
    // Use the structured response generator with proper schema
    const result = await generateStructuredResponse<MnemonicGeneratorOutput>(prompt);
    console.log('AI result:', result);

    // Validate the result has the expected structure
    if (result && typeof result === 'object' && 'mnemonics' in result && Array.isArray(result.mnemonics)) {
      console.log('AI response valid, returning result');
      return result;
    } else {
      console.log('AI response invalid, using fallback');
      return generateFallbackMnemonics(input);
    }
  } catch (error) {
    console.error('Mnemonic generation error:', error);
    
    // Fallback with hardcoded mnemonics based on topic and style
    console.log('Using fallback mnemonics');
    return generateFallbackMnemonics(input);
  }
}

function generateFallbackMnemonics(input: MnemonicGeneratorInput): MnemonicGeneratorOutput {
  console.log('Generating fallback mnemonics for:', input);
  const topic = input.topic?.toLowerCase() || 'pharmacology';
  const style = input.style || 'Serious';
  console.log('Detected topic:', topic, 'Style:', style);
  
  // Topic-based mnemonic database
  const mnemonicDatabase = {
    'pharmacology': {
      'Funny': [
        { mnemonic: "Pharmacology Pharmacy hai, Medicine study", mapping: "Pharmacology is the study of medicines" },
        { mnemonic: "Dosage Dose hai, Amount important", mapping: "Dosage is the amount of medicine to take" },
        { mnemonic: "Side effects Side effects hai, Unwanted results", mapping: "Side effects are unwanted effects of medicines" },
        { mnemonic: "Contraindication Contraindication hai, Avoid karo", mapping: "Contraindications are conditions where medicine should be avoided" },
        { mnemonic: "Interaction Interaction hai, Medicines mix", mapping: "Drug interactions occur when medicines affect each other" },
        { mnemonic: "Bioavailability Bioavailability hai, Body absorb", mapping: "Bioavailability is how much medicine the body absorbs" },
        { mnemonic: "Half-life Half-life hai, Medicine stay", mapping: "Half-life is how long medicine stays in the body" },
        { mnemonic: "Therapeutic window Therapeutic window hai, Safe range", mapping: "Therapeutic window is the safe range of medicine levels" },
        { mnemonic: "Placebo Placebo hai, Fake medicine", mapping: "Placebo is a fake medicine used in studies" },
        { mnemonic: "Generic Generic hai, Same medicine", mapping: "Generic medicines are copies of brand name medicines" }
      ],
      'Serious': [
        { mnemonic: "Pharmacology studies drug action and effects", mapping: "Definition of pharmacology" },
        { mnemonic: "Dosage determines therapeutic response", mapping: "Importance of correct dosage" },
        { mnemonic: "Side effects are adverse drug reactions", mapping: "Definition of side effects" },
        { mnemonic: "Contraindications prevent harmful drug use", mapping: "Purpose of contraindications" },
        { mnemonic: "Drug interactions alter medication effects", mapping: "Definition of drug interactions" },
        { mnemonic: "Bioavailability affects drug absorption", mapping: "Importance of bioavailability" },
        { mnemonic: "Half-life determines dosing frequency", mapping: "Clinical significance of half-life" },
        { mnemonic: "Therapeutic window ensures safe treatment", mapping: "Importance of therapeutic window" },
        { mnemonic: "Placebo controls clinical trials", mapping: "Role of placebo in research" },
        { mnemonic: "Generic drugs provide cost-effective treatment", mapping: "Benefits of generic medications" }
      ]
    },
    'antibiotics': {
      'Funny': [
        { mnemonic: "Penicillin Pehle, Cephalosporin Chalo, Macrolide Main", mapping: "PCM - Penicillin, Cephalosporin, Macrolide drug classes" },
        { mnemonic: "Beta-lactam Beta hai, Resistance Resist karo", mapping: "Beta-lactam antibiotics and resistance mechanisms" },
        { mnemonic: "Aminoglycoside Aata hai, Ototoxicity Ouch!", mapping: "Aminoglycosides cause ototoxicity" },
        { mnemonic: "Quinolone Quick hai, Tendon Toot sakta hai", mapping: "Quinolones can cause tendon rupture" },
        { mnemonic: "Tetracycline Teeth pe stain, Calcium ke saath nahi", mapping: "Tetracycline stains teeth, avoid with calcium" },
        { mnemonic: "Vancomycin Very strong, Red man syndrome", mapping: "Vancomycin causes red man syndrome" },
        { mnemonic: "Clindamycin Clindamycin hai, C. diff cause karta hai", mapping: "Clindamycin can cause C. difficile infection" },
        { mnemonic: "Metronidazole Metronidazole hai, Alcohol avoid karo", mapping: "Metronidazole causes disulfiram-like reaction with alcohol" },
        { mnemonic: "Sulfonamide Sulfur hai, Allergy Alert!", mapping: "Sulfonamides can cause allergic reactions" },
        { mnemonic: "Chloramphenicol Chlorine hai, Aplastic anemia", mapping: "Chloramphenicol can cause aplastic anemia" }
      ],
      'Serious': [
        { mnemonic: "Penicillin inhibits cell wall synthesis", mapping: "Mechanism of action for penicillin antibiotics" },
        { mnemonic: "Cephalosporins are beta-lactam antibiotics", mapping: "Classification of cephalosporin antibiotics" },
        { mnemonic: "Macrolides bind to 50S ribosomal subunit", mapping: "Mechanism of macrolide antibiotics" },
        { mnemonic: "Aminoglycosides cause protein synthesis inhibition", mapping: "Mechanism of aminoglycoside antibiotics" },
        { mnemonic: "Quinolones inhibit DNA gyrase enzyme", mapping: "Mechanism of quinolone antibiotics" },
        { mnemonic: "Tetracyclines bind to 30S ribosomal subunit", mapping: "Mechanism of tetracycline antibiotics" },
        { mnemonic: "Vancomycin prevents cell wall cross-linking", mapping: "Mechanism of vancomycin" },
        { mnemonic: "Clindamycin inhibits protein synthesis", mapping: "Mechanism of clindamycin" },
        { mnemonic: "Metronidazole disrupts DNA structure", mapping: "Mechanism of metronidazole" },
        { mnemonic: "Sulfonamides inhibit folic acid synthesis", mapping: "Mechanism of sulfonamide antibiotics" }
      ],
      'Story-based': [
        { mnemonic: "Once upon a time, Penicillin saved the kingdom from bacterial invasion", mapping: "Penicillin was the first antibiotic discovered" },
        { mnemonic: "The Cephalosporin family had four generations of warriors", mapping: "Cephalosporins are classified into four generations" },
        { mnemonic: "Macrolide the magician cast spells on ribosomes", mapping: "Macrolides bind to ribosomes to inhibit protein synthesis" },
        { mnemonic: "Aminoglycoside the archer shot arrows at bacterial proteins", mapping: "Aminoglycosides inhibit protein synthesis" },
        { mnemonic: "Quinolone the quick fighter attacked DNA gyrase", mapping: "Quinolones inhibit DNA gyrase enzyme" },
        { mnemonic: "Tetracycline the teacher taught bacteria to stop growing", mapping: "Tetracyclines inhibit bacterial growth" },
        { mnemonic: "Vancomycin the vanquisher defeated resistant bacteria", mapping: "Vancomycin is used for resistant infections" },
        { mnemonic: "Clindamycin the cleaner swept away anaerobic bacteria", mapping: "Clindamycin is effective against anaerobes" },
        { mnemonic: "Metronidazole the mighty warrior fought protozoa", mapping: "Metronidazole is effective against protozoa" },
        { mnemonic: "Sulfonamide the sulfur soldier blocked folic acid", mapping: "Sulfonamides inhibit folic acid synthesis" }
      ],
      'Acronym': [
        { mnemonic: "PCM - Penicillin, Cephalosporin, Macrolide", mapping: "Three main classes of antibiotics" },
        { mnemonic: "BLAST - Beta-lactam, Lincosamide, Aminoglycoside, Sulfonamide, Tetracycline", mapping: "Major antibiotic classes" },
        { mnemonic: "QUIN - Quinolone, Unique, Inhibits, Nucleic acid", mapping: "Quinolone mechanism of action" },
        { mnemonic: "VAN - Vancomycin, Against, Nosocomial", mapping: "Vancomycin for hospital-acquired infections" },
        { mnemonic: "CLIN - Clindamycin, Lincosamide, Inhibits, Nucleic acid", mapping: "Clindamycin classification and mechanism" },
        { mnemonic: "MET - Metronidazole, Effective, Trichomoniasis", mapping: "Metronidazole for protozoal infections" },
        { mnemonic: "SULF - Sulfonamide, Useful, Low-cost, Folic acid", mapping: "Sulfonamide characteristics" },
        { mnemonic: "CHLOR - Chloramphenicol, Hematologic, Ototoxic, Liver", mapping: "Chloramphenicol adverse effects" },
        { mnemonic: "TETRA - Tetracycline, Effective, Teeth, Resistance, Anaerobes", mapping: "Tetracycline characteristics" },
        { mnemonic: "MACRO - Macrolide, Azithromycin, Clarithromycin, Roxithromycin, Oral", mapping: "Macrolide examples" }
      ],
      'Visual': [
        { mnemonic: "🔬 Penicillin - Cell wall builder", mapping: "Penicillin builds bacterial cell walls" },
        { mnemonic: "🛡️ Cephalosporin - Shield against bacteria", mapping: "Cephalosporins protect against bacterial infections" },
        { mnemonic: "🎯 Macrolide - Target ribosomes", mapping: "Macrolides target bacterial ribosomes" },
        { mnemonic: "⚡ Aminoglycoside - Electric shock to proteins", mapping: "Aminoglycosides disrupt protein synthesis" },
        { mnemonic: "🧬 Quinolone - DNA destroyer", mapping: "Quinolones damage bacterial DNA" },
        { mnemonic: "🦷 Tetracycline - Teeth stainer", mapping: "Tetracycline stains developing teeth" },
        { mnemonic: "💪 Vancomycin - Strong fighter", mapping: "Vancomycin is a powerful antibiotic" },
        { mnemonic: "🧹 Clindamycin - Cleaner of anaerobes", mapping: "Clindamycin cleans anaerobic infections" },
        { mnemonic: "🔬 Metronidazole - Microscope for protozoa", mapping: "Metronidazole targets protozoa" },
        { mnemonic: "⚗️ Sulfonamide - Chemistry lab", mapping: "Sulfonamides are synthetic antibiotics" }
      ]
    },
    'cardiovascular': {
      'Funny': [
        { mnemonic: "ACE Inhibitor Aapka Blood Pressure", mapping: "ACE inhibitors lower blood pressure" },
        { mnemonic: "Beta Blocker Beta hai, Heart rate slow", mapping: "Beta blockers slow heart rate" },
        { mnemonic: "Calcium Channel Blocker Calcium block, Vessels relax", mapping: "CCBs relax blood vessels" },
        { mnemonic: "Diuretic Diuresis karta hai, Water nikalta hai", mapping: "Diuretics increase urine output" },
        { mnemonic: "Statin Statin hai, Cholesterol kam", mapping: "Statins lower cholesterol" },
        { mnemonic: "Warfarin Warfarin hai, Blood thin", mapping: "Warfarin is an anticoagulant" },
        { mnemonic: "Aspirin Aspirin hai, Platelet block", mapping: "Aspirin inhibits platelet aggregation" },
        { mnemonic: "Digoxin Digoxin hai, Heart strong", mapping: "Digoxin increases cardiac contractility" },
        { mnemonic: "Nitroglycerin Nitro hai, Vessels dilate", mapping: "Nitroglycerin dilates blood vessels" },
        { mnemonic: "Heparin Heparin hai, Clot prevent", mapping: "Heparin prevents blood clotting" }
      ],
      'Serious': [
        { mnemonic: "ACE inhibitors block angiotensin conversion", mapping: "Mechanism of ACE inhibitors" },
        { mnemonic: "Beta blockers antagonize beta-adrenergic receptors", mapping: "Mechanism of beta blockers" },
        { mnemonic: "Calcium channel blockers inhibit calcium influx", mapping: "Mechanism of calcium channel blockers" },
        { mnemonic: "Diuretics increase sodium and water excretion", mapping: "Mechanism of diuretics" },
        { mnemonic: "Statins inhibit HMG-CoA reductase enzyme", mapping: "Mechanism of statins" },
        { mnemonic: "Warfarin inhibits vitamin K-dependent clotting factors", mapping: "Mechanism of warfarin" },
        { mnemonic: "Aspirin irreversibly inhibits COX enzyme", mapping: "Mechanism of aspirin" },
        { mnemonic: "Digoxin inhibits Na-K ATPase pump", mapping: "Mechanism of digoxin" },
        { mnemonic: "Nitroglycerin releases nitric oxide", mapping: "Mechanism of nitroglycerin" },
        { mnemonic: "Heparin activates antithrombin III", mapping: "Mechanism of heparin" }
      ],
      'Story-based': [
        { mnemonic: "The ACE inhibitor prince saved the kingdom from high blood pressure", mapping: "ACE inhibitors treat hypertension" },
        { mnemonic: "Beta blocker the brave knight protected the heart from stress", mapping: "Beta blockers protect the heart" },
        { mnemonic: "Calcium channel blocker the gatekeeper controlled calcium flow", mapping: "CCBs control calcium channels" },
        { mnemonic: "Diuretic the water wizard removed excess fluid", mapping: "Diuretics remove excess water" },
        { mnemonic: "Statin the cholesterol crusader fought fat demons", mapping: "Statins fight high cholesterol" },
        { mnemonic: "Warfarin the blood thinner prevented clot formation", mapping: "Warfarin prevents blood clots" },
        { mnemonic: "Aspirin the platelet stopper prevented aggregation", mapping: "Aspirin prevents platelet aggregation" },
        { mnemonic: "Digoxin the heart strengthener improved contractility", mapping: "Digoxin strengthens heart contractions" },
        { mnemonic: "Nitroglycerin the vessel dilator opened blood vessels", mapping: "Nitroglycerin dilates blood vessels" },
        { mnemonic: "Heparin the clot buster dissolved blood clots", mapping: "Heparin dissolves blood clots" }
      ],
      'Acronym': [
        { mnemonic: "ACE - Angiotensin Converting Enzyme", mapping: "ACE inhibitor mechanism" },
        { mnemonic: "BB - Beta Blocker", mapping: "Beta blocker abbreviation" },
        { mnemonic: "CCB - Calcium Channel Blocker", mapping: "Calcium channel blocker abbreviation" },
        { mnemonic: "DIU - Diuretic", mapping: "Diuretic abbreviation" },
        { mnemonic: "STAT - Statin", mapping: "Statin abbreviation" },
        { mnemonic: "WAR - Warfarin", mapping: "Warfarin abbreviation" },
        { mnemonic: "ASA - Aspirin", mapping: "Aspirin abbreviation" },
        { mnemonic: "DIG - Digoxin", mapping: "Digoxin abbreviation" },
        { mnemonic: "NTG - Nitroglycerin", mapping: "Nitroglycerin abbreviation" },
        { mnemonic: "HEP - Heparin", mapping: "Heparin abbreviation" }
      ],
      'Visual': [
        { mnemonic: "🫀 ACE Inhibitor - Heart protector", mapping: "ACE inhibitors protect the heart" },
        { mnemonic: "💓 Beta Blocker - Heart rate controller", mapping: "Beta blockers control heart rate" },
        { mnemonic: "🩸 Calcium Channel Blocker - Vessel relaxer", mapping: "CCBs relax blood vessels" },
        { mnemonic: "💧 Diuretic - Water remover", mapping: "Diuretics remove water" },
        { mnemonic: "🧬 Statin - Cholesterol fighter", mapping: "Statins fight cholesterol" },
        { mnemonic: "🩸 Warfarin - Blood thinner", mapping: "Warfarin thins blood" },
        { mnemonic: "💊 Aspirin - Platelet stopper", mapping: "Aspirin stops platelets" },
        { mnemonic: "💪 Digoxin - Heart strengthener", mapping: "Digoxin strengthens heart" },
        { mnemonic: "🫁 Nitroglycerin - Vessel opener", mapping: "Nitroglycerin opens vessels" },
        { mnemonic: "🩸 Heparin - Clot buster", mapping: "Heparin busts clots" }
      ]
    },
    'diabetes': {
      'Funny': [
        { mnemonic: "Metformin Metformin hai, Glucose kam", mapping: "Metformin lowers blood glucose" },
        { mnemonic: "Insulin Insulin hai, Sugar control", mapping: "Insulin controls blood sugar" },
        { mnemonic: "Sulfonylurea Sugar kam, Weight badh", mapping: "Sulfonylureas lower sugar but increase weight" },
        { mnemonic: "GLP-1 GLP-1 hai, Appetite kam", mapping: "GLP-1 agonists reduce appetite" },
        { mnemonic: "SGLT2 SGLT2 hai, Sugar nikal", mapping: "SGLT2 inhibitors excrete sugar" },
        { mnemonic: "DPP-4 DPP-4 hai, GLP-1 badh", mapping: "DPP-4 inhibitors increase GLP-1" },
        { mnemonic: "Thiazolidinedione Thiazolidinedione hai, Insulin sensitivity", mapping: "TZDs improve insulin sensitivity" },
        { mnemonic: "Alpha-glucosidase Alpha-glucosidase hai, Sugar absorb kam", mapping: "Alpha-glucosidase inhibitors reduce sugar absorption" },
        { mnemonic: "Meglitinide Meglitinide hai, Quick sugar kam", mapping: "Meglitinides quickly lower sugar" },
        { mnemonic: "Biguanide Biguanide hai, Liver sugar kam", mapping: "Biguanides reduce liver glucose production" }
      ],
      'Serious': [
        { mnemonic: "Metformin inhibits hepatic gluconeogenesis", mapping: "Mechanism of metformin" },
        { mnemonic: "Insulin promotes glucose uptake", mapping: "Mechanism of insulin" },
        { mnemonic: "Sulfonylureas stimulate insulin secretion", mapping: "Mechanism of sulfonylureas" },
        { mnemonic: "GLP-1 agonists enhance insulin secretion", mapping: "Mechanism of GLP-1 agonists" },
        { mnemonic: "SGLT2 inhibitors block glucose reabsorption", mapping: "Mechanism of SGLT2 inhibitors" },
        { mnemonic: "DPP-4 inhibitors prevent GLP-1 degradation", mapping: "Mechanism of DPP-4 inhibitors" },
        { mnemonic: "Thiazolidinediones improve insulin sensitivity", mapping: "Mechanism of TZDs" },
        { mnemonic: "Alpha-glucosidase inhibitors delay carbohydrate absorption", mapping: "Mechanism of alpha-glucosidase inhibitors" },
        { mnemonic: "Meglitinides stimulate rapid insulin release", mapping: "Mechanism of meglitinides" },
        { mnemonic: "Biguanides reduce hepatic glucose production", mapping: "Mechanism of biguanides" }
      ]
    },
    'cns drugs': {
      'Funny': [
        { mnemonic: "Benzodiazepine Benzodiazepine hai, Anxiety kam", mapping: "Benzodiazepines reduce anxiety" },
        { mnemonic: "SSRI SSRI hai, Serotonin badh", mapping: "SSRIs increase serotonin" },
        { mnemonic: "Antipsychotic Antipsychotic hai, Psychosis kam", mapping: "Antipsychotics treat psychosis" },
        { mnemonic: "Mood stabilizer Mood stabilizer hai, Bipolar control", mapping: "Mood stabilizers control bipolar disorder" },
        { mnemonic: "Anticonvulsant Anticonvulsant hai, Seizure kam", mapping: "Anticonvulsants prevent seizures" },
        { mnemonic: "Anxiolytic Anxiolytic hai, Worry kam", mapping: "Anxiolytics reduce worry" },
        { mnemonic: "Hypnotic Hypnotic hai, Sleep good", mapping: "Hypnotics improve sleep" },
        { mnemonic: "Stimulant Stimulant hai, Alert badh", mapping: "Stimulants increase alertness" },
        { mnemonic: "Analgesic Analgesic hai, Pain kam", mapping: "Analgesics reduce pain" },
        { mnemonic: "Sedative Sedative hai, Calm down", mapping: "Sedatives calm the patient" }
      ],
      'Serious': [
        { mnemonic: "Benzodiazepines enhance GABA activity", mapping: "Mechanism of benzodiazepines" },
        { mnemonic: "SSRIs inhibit serotonin reuptake", mapping: "Mechanism of SSRIs" },
        { mnemonic: "Antipsychotics block dopamine receptors", mapping: "Mechanism of antipsychotics" },
        { mnemonic: "Mood stabilizers modulate neurotransmitter activity", mapping: "Mechanism of mood stabilizers" },
        { mnemonic: "Anticonvulsants stabilize neuronal membranes", mapping: "Mechanism of anticonvulsants" },
        { mnemonic: "Anxiolytics reduce anxiety symptoms", mapping: "Mechanism of anxiolytics" },
        { mnemonic: "Hypnotics promote sleep induction", mapping: "Mechanism of hypnotics" },
        { mnemonic: "Stimulants increase CNS activity", mapping: "Mechanism of stimulants" },
        { mnemonic: "Analgesics block pain pathways", mapping: "Mechanism of analgesics" },
        { mnemonic: "Sedatives depress CNS activity", mapping: "Mechanism of sedatives" }
      ]
    }
  };

  // Intelligent topic detection
  let detectedTopic = 'pharmacology';
  
  if (topic.includes('antibiotic') || topic.includes('bacterial') || topic.includes('infection')) {
    detectedTopic = 'antibiotics';
  } else if (topic.includes('cardiovascular') || topic.includes('heart') || topic.includes('blood pressure') || topic.includes('hypertension')) {
    detectedTopic = 'cardiovascular';
  } else if (topic.includes('diabetes') || topic.includes('diabetic') || topic.includes('glucose') || topic.includes('insulin')) {
    detectedTopic = 'diabetes';
  } else if (topic.includes('cns') || topic.includes('brain') || topic.includes('neurological') || topic.includes('psychiatric') || topic.includes('mental')) {
    detectedTopic = 'cns drugs';
  }
  
  // Get topic-specific mnemonics or default to general pharmacology
  const topicMnemonics = mnemonicDatabase[detectedTopic as keyof typeof mnemonicDatabase] || mnemonicDatabase['pharmacology'];
  const styleMnemonics = topicMnemonics[style as keyof typeof topicMnemonics] || topicMnemonics['Serious'];
  
  // Shuffle and select 10 mnemonics
  const shuffledMnemonics = [...styleMnemonics].sort(() => Math.random() - 0.5).slice(0, 10);

  return {
    topic: input.topic || 'pharmacology',
    style: input.style || 'Serious',
    mnemonics: shuffledMnemonics
  };
  }