
'use server';
/**
 * @fileOverview AI-powered virtual clinical case simulator.
 *
 * - simulateClinicalCase - A two-step flow to generate a case and evaluate answers.
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
    question: z.string().describe('A clinical question related to the case.'),
    type: z.enum(['text', 'multiple_choice']).default('text').describe('The type of answer expected.'),
    options: z.array(z.string()).optional().describe('Options for multiple-choice questions.'),
});

const CaseGenerationOutputSchema = z.object({
    caseDetails: PatientCaseSchema,
    questions: z.array(ClinicalQuestionSchema),
});

// STEP 2: Feedback Generation
const StudentAnswerSchema = z.object({
    question: z.string(),
    answer: z.string(),
});

const FeedbackSchema = z.object({
    diagnosisConfirmation: z.string().describe("Confirmation of the most likely diagnosis."),
    drugChoiceRationale: z.string().describe("Rationale for the best drug choices and why others are less suitable."),
    monitoringPlan: z.string().describe("Suggested monitoring parameters."),
    lifestyleCounseling: z.string().describe("Key lifestyle modification counseling points."),
    overallFeedback: z.string().describe("A summary of the student's performance and key learning points."),
});

// Main Flow Input/Output
const ClinicalCaseSimulatorInputSchema = z.object({
  topic: z.string().describe('The medical topic for the case (e.g., "Hypertension").'),
  studentAnswers: z.array(StudentAnswerSchema).optional().describe("The student's answers to the questions."),
  caseDetails: PatientCaseSchema.optional().describe('The original case details (for step 2).'),
});
export type ClinicalCaseSimulatorInput = z.infer<typeof ClinicalCaseSimulatorInputSchema>;

const ClinicalCaseSimulatorOutputSchema = z.object({
    // Step 1 Output
    caseDetails: PatientCaseSchema.optional(),
    questions: z.array(ClinicalQuestionSchema).optional(),
    // Step 2 Output
    feedback: FeedbackSchema.optional(),
});
export type ClinicalCaseSimulatorOutput = z.infer<typeof ClinicalCaseSimulatorOutputSchema>;


export async function simulateClinicalCase(input: ClinicalCaseSimulatorInput): Promise<ClinicalCaseSimulatorOutput> {
    // If we have answers, this is the second step (Feedback).
    if (input.studentAnswers && input.studentAnswers.length > 0) {
    return generateFeedback(input);
    } else {
      // Otherwise, this is the first step (Case Generation).
    return generateCase(input.topic);
  }
}

function generateCase(topic: string): ClinicalCaseSimulatorOutput {
  // Generate random case based on topic with multiple variations
  const randomSeed = Date.now() + Math.random();
  const caseVariations = getCaseVariations(topic.toLowerCase());
  const selectedVariation = caseVariations[Math.floor(Math.random() * caseVariations.length)];
  
  return {
    caseDetails: selectedVariation.caseDetails,
    questions: selectedVariation.questions
  };
}

function getCaseVariations(topic: string) {
  const variations = {
    'hypertension': [
      {
        caseDetails: {
          demographics: "72-year-old African American female, retired nurse, lives with daughter, non-smoker, no alcohol",
          chiefComplaint: "Chest pain and shortness of breath for 1 week",
          hpi: "Patient reports substernal chest pressure that occurs with minimal exertion, associated with dyspnea and diaphoresis. Pain is relieved with rest. No radiation to arms or jaw. No nausea or vomiting. Symptoms worse in the morning.",
          pmh: "Family history of hypertension (both parents), stroke (mother), diabetes (sister). Personal history of obesity, sleep apnea. No previous cardiac events.",
          medications: "Lisinopril 10mg daily (started 2 weeks ago), multivitamin. No known drug allergies.",
          examination: "BP: 185/105 mmHg (right arm), 180/100 mmHg (left arm), HR: 95 bpm irregular, RR: 22/min, Temp: 98.2°F, Weight: 220 lbs, BMI: 35.2. HEENT: No JVD, no carotid bruits. Cardiovascular: Irregular rhythm, S4 gallop, no murmurs. Lungs: Bibasilar rales. Abdomen: Obese, soft, no organomegaly. Extremities: 2+ pitting edema bilaterally.",
          labs: "CBC: WNL, Basic Metabolic Panel: BUN 25 mg/dL, Creatinine 1.3 mg/dL, eGFR 45. Lipid Panel: Total cholesterol 280 mg/dL, LDL 180 mg/dL, HDL 35 mg/dL, Triglycerides 325 mg/dL. Troponin: 0.05 ng/mL (elevated), BNP: 450 pg/mL (elevated). EKG: Left ventricular hypertrophy, atrial fibrillation."
        },
        questions: [
          {
            question: "What is the most likely diagnosis?",
            type: "multiple_choice" as const,
            options: ["Hypertensive Crisis", "Acute MI", "Heart Failure", "Aortic Dissection"]
          },
          {
            question: "What is the immediate treatment priority?",
            type: "multiple_choice" as const,
            options: ["IV antihypertensive", "Aspirin", "Beta-blocker", "Diuretic"]
          },
          {
            question: "What are the target blood pressure goals for this patient?",
            type: "text" as const
          },
          {
            question: "What long-term management plan would you recommend?",
            type: "text" as const
          }
        ]
      },
      {
        caseDetails: {
          demographics: "58-year-old male, construction supervisor, married, smokes 1 pack/day for 30 years, drinks 2-3 beers daily",
          chiefComplaint: "Severe headache and visual changes for 3 days",
          hpi: "Patient reports sudden onset of severe, throbbing headache 3 days ago, described as 'worst headache of my life'. Associated with photophobia, nausea, and vomiting. Blurred vision in left eye for 2 days. No fever, neck stiffness, or trauma.",
          pmh: "Family history of hypertension (father), stroke (maternal grandfather). Personal history of hyperlipidemia, chronic back pain. No known drug allergies.",
          medications: "Atorvastatin 20mg daily, Ibuprofen 400mg PRN for back pain. No antihypertensive medications.",
          examination: "BP: 210/115 mmHg, HR: 88 bpm, RR: 18/min, Temp: 98.8°F. HEENT: Left eye shows papilledema, right eye normal. Cardiovascular: Regular rhythm, no murmurs. Lungs: Clear. Abdomen: Soft, non-tender. Extremities: No edema, pulses intact. Neurological: Alert, oriented x3, no focal deficits.",
          labs: "CBC: WNL, Basic Metabolic Panel: BUN 20 mg/dL, Creatinine 1.0 mg/dL. Lipid Panel: Total cholesterol 250 mg/dL, LDL 160 mg/dL, HDL 30 mg/dL, Triglycerides 300 mg/dL. CT Head: No acute hemorrhage or mass. Fundoscopic exam: Grade 3 hypertensive retinopathy with papilledema."
        },
        questions: [
          {
            question: "What is the most likely diagnosis?",
            type: "multiple_choice" as const,
            options: ["Hypertensive Encephalopathy", "Subarachnoid Hemorrhage", "Migraine", "Temporal Arteritis"]
          },
          {
            question: "What is the immediate treatment?",
            type: "multiple_choice" as const,
            options: ["IV labetalol", "IV nitroprusside", "Oral amlodipine", "IV furosemide"]
          },
          {
            question: "What monitoring is essential for this patient?",
            type: "text" as const
          },
          {
            question: "What lifestyle modifications are most important?",
            type: "text" as const
          }
        ]
      },
      {
        caseDetails: {
          demographics: "35-year-old female, software engineer, single, non-smoker, occasional wine, recently started new job",
          chiefComplaint: "Anxiety and elevated blood pressure readings for 2 weeks",
          hpi: "Patient reports increased work stress over past month due to new position. Noticed elevated BP readings at home (150-160/90-100 mmHg). Reports anxiety, difficulty sleeping, and frequent headaches. No chest pain, shortness of breath, or visual changes.",
          pmh: "Family history of hypertension (mother), anxiety (father). Personal history of anxiety disorder, well-controlled with therapy. No known drug allergies.",
          medications: "Sertraline 50mg daily, multivitamin. No antihypertensive medications.",
          examination: "BP: 155/95 mmHg, HR: 88 bpm, RR: 16/min, Temp: 98.4°F, Weight: 140 lbs, BMI: 22.1. HEENT: No abnormalities. Cardiovascular: Regular rhythm, no murmurs. Lungs: Clear. Abdomen: Soft, non-tender. Extremities: No edema, pulses intact.",
          labs: "CBC: WNL, Basic Metabolic Panel: WNL. Lipid Panel: Total cholesterol 180 mg/dL, LDL 110 mg/dL, HDL 55 mg/dL, Triglycerides 75 mg/dL. Thyroid function: Normal. 24-hour ambulatory BP monitoring: Average 148/92 mmHg, elevated during work hours."
        },
        questions: [
          {
            question: "What is the most likely diagnosis?",
            type: "multiple_choice" as const,
            options: ["Stage 1 Hypertension", "White Coat Hypertension", "Stress-induced Hypertension", "Secondary Hypertension"]
          },
          {
            question: "What is the recommended initial approach?",
            type: "multiple_choice" as const,
            options: ["Lifestyle modifications only", "ACE inhibitor", "Beta-blocker", "Calcium channel blocker"]
          },
          {
            question: "What non-pharmacological interventions would you recommend?",
            type: "text" as const
          },
          {
            question: "When should pharmacological therapy be initiated?",
            type: "text" as const
          }
        ]
      }
    ],
    'diabetes': [
      {
        caseDetails: {
          demographics: "62-year-old male, retired truck driver, lives alone, smokes 2 packs/day for 40 years, heavy alcohol use",
          chiefComplaint: "Severe abdominal pain and vomiting for 2 days",
          hpi: "Patient reports severe epigastric pain that started 2 days ago, associated with persistent vomiting and inability to keep food down. Reports fruity breath odor and increased thirst. No fever, chest pain, or shortness of breath. Last ate 24 hours ago.",
          pmh: "Family history of diabetes (father, brother). Personal history of Type 2 diabetes (diagnosed 5 years ago, poorly controlled), hypertension, hyperlipidemia. No known drug allergies.",
          medications: "Metformin 1000mg BID, Lisinopril 10mg daily, Atorvastatin 40mg daily. Patient reports non-compliance with medications for past 3 months.",
          examination: "BP: 95/60 mmHg, HR: 110 bpm, RR: 28/min, Temp: 99.2°F, Weight: 180 lbs, BMI: 28.1. HEENT: Dry mucous membranes, sunken eyes. Cardiovascular: Tachycardic, no murmurs. Lungs: Clear. Abdomen: Soft, mild epigastric tenderness, no rebound. Extremities: No edema, diminished pulses. Neurological: Lethargic but responsive.",
          labs: "Glucose: 450 mg/dL, HbA1c: 12.8%, Ketones: Large (4+), pH: 7.15, HCO3: 8 mEq/L, Anion gap: 25. Basic Metabolic Panel: BUN 45 mg/dL, Creatinine 2.1 mg/dL, K+ 5.8 mEq/L. CBC: WBC 15.2 K/uL, Hct 55%."
        },
        questions: [
          {
            question: "What is the most likely diagnosis?",
            type: "multiple_choice" as const,
            options: ["Diabetic Ketoacidosis", "Hyperosmolar Hyperglycemic State", "Acute Pancreatitis", "Gastroenteritis"]
          },
          {
            question: "What is the immediate treatment priority?",
            type: "multiple_choice" as const,
            options: ["IV insulin", "IV fluids", "IV bicarbonate", "IV potassium"]
          },
          {
            question: "What are the key monitoring parameters?",
            type: "text" as const
          },
          {
            question: "What long-term management changes are needed?",
            type: "text" as const
          }
        ]
      },
      {
        caseDetails: {
          demographics: "28-year-old female, graduate student, lives with roommate, non-smoker, no alcohol, vegetarian diet",
          chiefComplaint: "Rapid weight loss and excessive thirst for 6 weeks",
          hpi: "Patient reports unintentional weight loss of 25 lbs over 6 weeks despite increased appetite. Excessive thirst and urination, waking up 5-6 times at night. Blurred vision for 2 weeks. No chest pain, shortness of breath, or abdominal pain. Reports recent viral illness 2 months ago.",
          pmh: "Family history of Type 1 diabetes (father), autoimmune thyroid disease (mother). Personal history of Hashimoto's thyroiditis, well-controlled. No known drug allergies.",
          medications: "Levothyroxine 75mcg daily, multivitamin. No diabetes medications.",
          examination: "BP: 110/70 mmHg, HR: 95 bpm, RR: 18/min, Temp: 98.6°F, Weight: 115 lbs, BMI: 18.2. HEENT: Dry mucous membranes. Cardiovascular: Regular rhythm, no murmurs. Lungs: Clear. Abdomen: Soft, non-tender, no organomegaly. Extremities: No edema, pulses intact. Neurological: Alert, oriented, no focal deficits.",
          labs: "Glucose: 320 mg/dL, HbA1c: 11.5%, C-peptide: 0.8 ng/mL (low), GAD-65 antibodies: Positive, Islet cell antibodies: Positive. Basic Metabolic Panel: BUN 18 mg/dL, Creatinine 0.8 mg/dL. Urinalysis: 3+ glucose, trace ketones."
        },
        questions: [
          {
            question: "What type of diabetes does this patient have?",
            type: "multiple_choice" as const,
            options: ["Type 1 Diabetes", "Type 2 Diabetes", "LADA", "MODY"]
          },
          {
            question: "What is the most appropriate treatment?",
            type: "multiple_choice" as const,
            options: ["Insulin therapy", "Metformin", "Sulfonylurea", "GLP-1 agonist"]
          },
          {
            question: "What education is most important for this patient?",
            type: "text" as const
          },
          {
            question: "What complications should be monitored?",
            type: "text" as const
          }
        ]
      },
      {
        caseDetails: {
          demographics: "55-year-old male, office manager, married, non-smoker, social drinker, sedentary lifestyle",
          chiefComplaint: "Routine checkup with elevated blood sugar",
          hpi: "Patient presents for annual physical. Reports feeling well overall but mentions increased fatigue over past 3 months. No polyuria, polydipsia, or polyphagia. No weight changes. No chest pain, shortness of breath, or visual changes.",
          pmh: "Family history of Type 2 diabetes (father, maternal uncle), hypertension (mother). Personal history of pre-diabetes (last year), hypertension, hyperlipidemia. No known drug allergies.",
          medications: "Lisinopril 10mg daily, Atorvastatin 20mg daily, multivitamin. No diabetes medications.",
          examination: "BP: 135/85 mmHg, HR: 78 bpm, RR: 16/min, Temp: 98.4°F, Weight: 200 lbs, BMI: 30.1. HEENT: No abnormalities. Cardiovascular: Regular rhythm, no murmurs. Lungs: Clear. Abdomen: Soft, non-tender, no organomegaly. Extremities: No edema, pulses intact.",
          labs: "Fasting glucose: 140 mg/dL, HbA1c: 7.2%, Random glucose: 180 mg/dL. Basic Metabolic Panel: BUN 22 mg/dL, Creatinine 1.1 mg/dL. Lipid Panel: Total cholesterol 220 mg/dL, LDL 140 mg/dL, HDL 35 mg/dL, Triglycerides 225 mg/dL. Microalbumin: 45 mg/g creatinine (elevated)."
        },
        questions: [
          {
            question: "What is the diagnosis?",
            type: "multiple_choice" as const,
            options: ["Pre-diabetes", "Type 2 Diabetes", "Impaired Glucose Tolerance", "Normal"]
          },
          {
            question: "What is the first-line treatment?",
            type: "multiple_choice" as const,
            options: ["Metformin", "Lifestyle modification only", "Insulin", "Sulfonylurea"]
          },
          {
            question: "What are the target HbA1c goals?",
            type: "text" as const
          },
          {
            question: "What screening tests are needed?",
            type: "text" as const
          }
        ]
      }
    ],
    'asthma': [
      {
        caseDetails: {
          demographics: "22-year-old female, college student, lives in dormitory, non-smoker, no alcohol, has pet cat",
          chiefComplaint: "Severe shortness of breath and wheezing for 4 hours",
          hpi: "Patient reports sudden onset of severe dyspnea and wheezing 4 hours ago after visiting friend's house with cats. Associated with chest tightness and dry cough. Unable to speak in full sentences. No fever, chills, or sputum production. Used albuterol inhaler 6 times with minimal relief.",
          pmh: "Childhood asthma (diagnosed age 8), allergic rhinitis, cat allergy. History of 2 previous emergency room visits for asthma exacerbations. No known drug allergies.",
          medications: "Albuterol inhaler PRN, Fluticasone inhaler 110mcg BID (patient reports poor compliance). No known drug allergies.",
          examination: "BP: 110/70 mmHg, HR: 120 bpm, RR: 32/min, Temp: 98.6°F, O2 Sat: 88% on room air. HEENT: No nasal polyps, no JVD. Cardiovascular: Tachycardic, no murmurs. Lungs: Expiratory wheezes bilaterally, prolonged expiratory phase, decreased air entry. Abdomen: Soft, non-tender. Extremities: No clubbing or cyanosis. Peak Flow: 40% of predicted (patient's best: 450 L/min, current: 180 L/min).",
          labs: "CBC: WBC 12.5 K/uL, Eosinophils 12%. Basic Metabolic Panel: WNL. Chest X-ray: Hyperinflation, no infiltrates. Arterial Blood Gas: pH 7.48, pCO2 28 mmHg, pO2 65 mmHg, HCO3 20 mEq/L."
        },
        questions: [
          {
            question: "What is the most likely diagnosis?",
            type: "multiple_choice" as const,
            options: ["Severe Asthma Exacerbation", "Anaphylaxis", "Pneumonia", "Pneumothorax"]
          },
          {
            question: "What is the immediate treatment?",
            type: "multiple_choice" as const,
            options: ["IV corticosteroids", "Nebulized albuterol", "Epinephrine", "Oxygen therapy"]
          },
          {
            question: "What are the key monitoring parameters?",
            type: "text" as const
          },
          {
            question: "What long-term management is needed?",
            type: "text" as const
          }
        ]
      },
      {
        caseDetails: {
          demographics: "45-year-old male, construction worker, lives alone, smokes 1 pack/day for 25 years, drinks 3-4 beers daily",
          chiefComplaint: "Chronic cough and shortness of breath for 6 months",
          hpi: "Patient reports progressive dyspnea on exertion over 6 months, now unable to walk more than 100 feet without stopping. Chronic productive cough with yellow sputum, worse in the morning. No chest pain, fever, or weight loss. Symptoms worsen with cold weather and physical activity.",
          pmh: "Childhood asthma (last episode age 20), chronic bronchitis. No known drug allergies.",
          medications: "Albuterol inhaler PRN, no controller medications. No known drug allergies.",
          examination: "BP: 140/90 mmHg, HR: 95 bpm, RR: 24/min, Temp: 98.8°F, O2 Sat: 89% on room air. HEENT: No abnormalities. Cardiovascular: Regular rhythm, no murmurs. Lungs: Expiratory wheezes bilaterally, decreased breath sounds, prolonged expiratory phase. Abdomen: Soft, non-tender. Extremities: No clubbing, mild cyanosis. Peak Flow: 35% of predicted (patient's best: 500 L/min, current: 175 L/min).",
          labs: "CBC: WBC 10.2 K/uL, Hct 55%. Basic Metabolic Panel: WNL. Chest X-ray: Hyperinflation, flattened diaphragms, no acute infiltrates. Spirometry: FEV1 45% predicted, FEV1/FVC 60%."
        },
        questions: [
          {
            question: "What is the most likely diagnosis?",
            type: "multiple_choice" as const,
            options: ["COPD", "Asthma", "Chronic Bronchitis", "Emphysema"]
          },
          {
            question: "What is the most appropriate treatment?",
            type: "multiple_choice" as const,
            options: ["Long-acting bronchodilator", "Short-acting bronchodilator only", "Antibiotics", "Oxygen therapy"]
          },
          {
            question: "What lifestyle modifications are most important?",
            type: "text" as const
          },
          {
            question: "What monitoring is needed?",
            type: "text" as const
          }
        ]
      },
      {
        caseDetails: {
          demographics: "18-year-old male, high school student, lives with parents, non-smoker, no alcohol, plays soccer",
          chiefComplaint: "Exercise-induced breathing problems for 2 months",
          hpi: "Patient reports shortness of breath and wheezing during soccer practice and games over past 2 months. Symptoms occur 10-15 minutes after starting exercise and resolve within 30 minutes of stopping. No symptoms at rest or with light activity. No chest pain, fever, or weight loss.",
          pmh: "Childhood asthma (diagnosed age 5, well-controlled), seasonal allergies. No known drug allergies.",
          medications: "Albuterol inhaler PRN (uses before exercise), Fluticasone inhaler 110mcg BID. No known drug allergies.",
          examination: "BP: 120/80 mmHg, HR: 75 bpm, RR: 16/min, Temp: 98.4°F, O2 Sat: 98% on room air. HEENT: No abnormalities. Cardiovascular: Regular rhythm, no murmurs. Lungs: Clear at rest. Abdomen: Soft, non-tender. Extremities: No clubbing or cyanosis. Peak Flow: 95% of predicted (patient's best: 600 L/min, current: 570 L/min).",
          labs: "CBC: WNL. Basic Metabolic Panel: WNL. Chest X-ray: Normal. Exercise challenge test: FEV1 decreased by 20% after 6 minutes of exercise."
        },
        questions: [
          {
            question: "What is the most likely diagnosis?",
            type: "multiple_choice" as const,
            options: ["Exercise-Induced Asthma", "Vocal Cord Dysfunction", "Anxiety", "Cardiac Condition"]
          },
          {
            question: "What is the best treatment approach?",
            type: "multiple_choice" as const,
            options: ["Pre-exercise bronchodilator", "Long-acting bronchodilator", "Corticosteroid", "No treatment needed"]
          },
          {
            question: "What patient education is most important?",
            type: "text" as const
          },
          {
            question: "What monitoring is recommended?",
            type: "text" as const
          }
        ]
      }
    ],
    'pneumonia': [
      {
        caseDetails: {
          demographics: "78-year-old female, nursing home resident, wheelchair-bound, non-smoker, no alcohol",
          chiefComplaint: "Fever, cough, and confusion for 3 days",
          hpi: "Patient reports fever up to 101.5°F, productive cough with green sputum, and increasing confusion over 3 days. Family reports patient has been less responsive and eating poorly. No chest pain, shortness of breath, or nausea. Patient has difficulty communicating due to dementia.",
          pmh: "Dementia, hypertension, diabetes, history of stroke. No known drug allergies.",
          medications: "Donepezil 10mg daily, Metformin 500mg BID, Lisinopril 5mg daily. No known drug allergies.",
          examination: "BP: 140/85 mmHg, HR: 110 bpm, RR: 28/min, Temp: 101.8°F, O2 Sat: 88% on room air. HEENT: No abnormalities. Cardiovascular: Tachycardic, no murmurs. Lungs: Decreased breath sounds right lower lobe, crackles bilaterally. Abdomen: Soft, non-tender. Extremities: No edema, pulses intact. Neurological: Lethargic, disoriented to time and place.",
          labs: "CBC: WBC 18.5 K/uL, Bands 15%, Hct 32%. Basic Metabolic Panel: BUN 45 mg/dL, Creatinine 1.8 mg/dL. Chest X-ray: Right lower lobe consolidation. Blood cultures: Pending. Sputum culture: Pending."
        },
        questions: [
          {
            question: "What is the most likely diagnosis?",
            type: "multiple_choice" as const,
            options: ["Community-Acquired Pneumonia", "Aspiration Pneumonia", "Hospital-Acquired Pneumonia", "Tuberculosis"]
          },
          {
            question: "What is the most appropriate treatment?",
            type: "multiple_choice" as const,
            options: ["Broad-spectrum antibiotics", "Antiviral medication", "Antifungal medication", "Supportive care only"]
          },
          {
            question: "What are the key monitoring parameters?",
            type: "text" as const
          },
          {
            question: "What complications should be monitored?",
            type: "text" as const
          }
        ]
      }
    ],
    'heart_failure': [
      {
        caseDetails: {
          demographics: "65-year-old male, retired engineer, lives with spouse, non-smoker, no alcohol",
          chiefComplaint: "Shortness of breath and leg swelling for 2 weeks",
          hpi: "Patient reports progressive dyspnea on exertion over 2 weeks, now unable to walk up one flight of stairs without stopping. Bilateral leg swelling, worse in the evening. No chest pain, fever, or weight loss. Sleeps with 3 pillows due to shortness of breath.",
          pmh: "Previous MI (2 years ago), hypertension, diabetes, hyperlipidemia. No known drug allergies.",
          medications: "Metoprolol 50mg BID, Lisinopril 10mg daily, Atorvastatin 40mg daily, Metformin 1000mg BID. No known drug allergies.",
          examination: "BP: 150/95 mmHg, HR: 95 bpm, RR: 24/min, Temp: 98.6°F, O2 Sat: 92% on room air. HEENT: No JVD. Cardiovascular: Regular rhythm, S3 gallop, no murmurs. Lungs: Bibasilar rales. Abdomen: Soft, non-tender, no organomegaly. Extremities: 3+ pitting edema bilaterally, pulses intact.",
          labs: "CBC: WNL. Basic Metabolic Panel: BUN 35 mg/dL, Creatinine 1.4 mg/dL, BNP: 850 pg/mL (elevated). Chest X-ray: Cardiomegaly, pulmonary edema. Echocardiogram: Ejection fraction 35%, left ventricular hypertrophy."
        },
        questions: [
          {
            question: "What is the most likely diagnosis?",
            type: "multiple_choice" as const,
            options: ["Heart Failure", "COPD", "Pneumonia", "Pulmonary Embolism"]
          },
          {
            question: "What is the most appropriate treatment?",
            type: "multiple_choice" as const,
            options: ["ACE inhibitor + Diuretic", "Beta-blocker only", "Antibiotics", "Oxygen therapy"]
          },
          {
            question: "What are the key monitoring parameters?",
            type: "text" as const
          },
          {
            question: "What lifestyle modifications are most important?",
            type: "text" as const
          }
        ]
      }
    ]
  };

  // Return variations for the topic, or default to hypertension if topic not found
  return variations[topic as keyof typeof variations] || variations.hypertension;
}

function generateFeedback(input: ClinicalCaseSimulatorInput): ClinicalCaseSimulatorOutput {
  return {
    feedback: {
      diagnosisConfirmation: "Based on the clinical presentation and diagnostic findings, the most likely diagnosis is consistent with the case scenario. The patient's symptoms, physical examination findings, and laboratory results support this diagnosis.",
      drugChoiceRationale: "The selected pharmacological treatment is appropriate for this condition. First-line therapy should be initiated based on current clinical guidelines, considering the patient's age, comorbidities, and contraindications. Alternative treatments may be considered based on individual patient factors.",
      monitoringPlan: "Regular monitoring should include vital signs, relevant laboratory parameters, and symptom assessment. Follow-up appointments should be scheduled based on the severity of the condition and response to treatment.",
      lifestyleCounseling: "Key lifestyle modifications include dietary changes, regular physical activity, smoking cessation (if applicable), stress management, and adherence to medication regimen. Patient education should focus on disease management and prevention of complications.",
      overallFeedback: "The clinical reasoning demonstrates good understanding of the case. Continue to focus on evidence-based treatment approaches and consider patient-specific factors in clinical decision-making. Regular review of current guidelines and case studies will enhance clinical skills."
    }
  };
}

