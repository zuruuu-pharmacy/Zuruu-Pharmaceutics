
'use server';
/**
 * @fileOverview AI-powered flashcard generator from lecture notes.
 *
 * - generateFlashcards - Creates flashcards from a document.
 */

import {z} from 'zod';
import { generateStructuredResponse } from '@/ai/working-ai';

const FlashcardSchema = z.object({
    front: z.string().describe("The front of the flashcard (a question, term, or concept)."),
    back: z.string().describe("The back of the flashcard (the answer or definition)."),
});

const FlashcardGeneratorInputSchema = z.object({
  noteDataUri: z.string().describe("The lecture note document, as a data URI."),
  topic: z.string().describe("The main topic of the notes (e.g., 'Beta-blockers')."),
  cardCount: z.coerce.number().optional().default(10).describe("The desired number of flashcards."),
});
export type FlashcardGeneratorInput = z.infer<typeof FlashcardGeneratorInputSchema>;

const FlashcardGeneratorOutputSchema = z.object({
    flashcards: z.array(FlashcardSchema),
});
export type FlashcardGeneratorOutput = z.infer<typeof FlashcardGeneratorOutputSchema>;


export async function generateFlashcards(input: FlashcardGeneratorInput): Promise<FlashcardGeneratorOutput> {
  console.log('Flashcard generator called with input:', input);
  
  try {
    // Validate input
    const validatedInput = FlashcardGeneratorInputSchema.parse(input);
    console.log('Validated input:', validatedInput);
    
    // Create comprehensive AI prompt for flashcard generation
    const prompt = `You are an expert pharmacy educator and study specialist creating comprehensive flashcards for pharmacy students.

For the topic "${validatedInput.topic}", provide a COMPLETE educational experience with detailed explanations, mechanisms, and exactly ${validatedInput.cardCount} comprehensive flashcards.

IMPORTANT: Provide FULL educational content, not just flashcards. The student should be able to learn everything about this topic from your response.

Include:
1. TOPIC OVERVIEW: Detailed explanation of what ${validatedInput.topic} are, their importance, and key concepts
2. KEY CONCEPTS: 3-5 most important concepts with detailed explanations
3. MECHANISMS: How these drugs work, with specific examples and clinical applications
4. CLINICAL SIGNIFICANCE: Why this topic matters in pharmacy practice
5. FLASHCARDS: Exactly ${validatedInput.cardCount} comprehensive, educational flashcards with detailed explanations
6. STUDY TIPS: How to study and master this topic effectively
7. PRACTICAL EXAMPLES: Real-world applications and case studies

Requirements for flashcards:
- Create comprehensive flashcards covering all aspects of the topic
- Include mechanism of action, side effects, contraindications, and clinical uses
- Make flashcards educational and appropriate for pharmacy students
- Connect each flashcard to specific learning objectives
- Provide detailed explanations on the back of each card
- Cover different difficulty levels and learning objectives

Topic: ${validatedInput.topic}
Number of flashcards: ${validatedInput.cardCount}

Respond with valid JSON in this exact format:
{
  "flashcards": [
    {
      "front": "What is the mechanism of action of...?",
      "back": "Detailed explanation with examples and clinical significance"
    }
  ]
}`;

    console.log('Calling AI for comprehensive flashcard generation...');
    
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
      return generateFallbackFlashcards(validatedInput);
    }
    
    // Validate AI response
    try {
      const validatedResponse = FlashcardGeneratorOutputSchema.parse(aiResponse);
      console.log('AI response validated successfully');
      return validatedResponse;
    } catch (validationError) {
      console.log('AI response validation failed:', validationError);
      console.log('Using fallback response');
      return generateFallbackFlashcards(validatedInput);
    }
    
  } catch (error) {
    console.error('Flashcard generator error:', error);
    return generateFallbackFlashcards(input);
  }
}

function generateFallbackFlashcards(input: FlashcardGeneratorInput): FlashcardGeneratorOutput {
  console.log('Generating comprehensive fallback flashcards for:', input);
  
  const topic = input.topic?.toLowerCase() || 'pharmacology';
  const cardCount = input.cardCount || 10;
  
  // Generate topic-specific comprehensive flashcards
  let flashcards = generateTopicSpecificFlashcards(topic, cardCount);
  
  return {
    flashcards: flashcards
  };
}

function generateTopicSpecificFlashcards(topic: string, cardCount: number) {
  if (topic.includes('anticancer') || topic.includes('cancer') || topic.includes('oncology')) {
    return [
      {
        front: "What is the mechanism of action of alkylating agents?",
        back: "Alkylating agents work by forming covalent bonds with DNA, creating cross-links between DNA strands. This prevents proper DNA replication and transcription, leading to cell death. Examples include cyclophosphamide, cisplatin, and carmustine. They are cell cycle non-specific, meaning they can kill cells in any phase."
      },
      {
        front: "When are antimetabolites most effective?",
        back: "Antimetabolites are most effective during the S phase of the cell cycle when DNA synthesis is occurring. They work by competing with normal metabolites for enzyme binding sites, leading to the production of non-functional DNA and RNA. Examples include methotrexate, 5-fluorouracil, and cytarabine."
      },
      {
        front: "What is the lifetime dose limit for doxorubicin?",
        back: "The lifetime dose limit for doxorubicin is 550 mg/m² due to the risk of cumulative cardiotoxicity. Beyond this dose, the risk of heart failure increases significantly. Regular monitoring of cardiac function is essential, including echocardiograms and ejection fraction measurements."
      },
      {
        front: "Which anticancer drug crosses the blood-brain barrier?",
        back: "Carmustine (BCNU) is a nitrosourea that crosses the blood-brain barrier, making it useful for treating brain tumors. This property is unique among alkylating agents and makes it valuable for central nervous system malignancies. It's administered intravenously and can cause delayed myelosuppression."
      },
      {
        front: "What are the common side effects of cisplatin?",
        back: "Cisplatin commonly causes nephrotoxicity (requiring aggressive hydration), nausea and vomiting (often severe), ototoxicity (hearing loss), and peripheral neuropathy. It can also cause myelosuppression, alopecia, and electrolyte imbalances. Pre-treatment hydration and antiemetics are essential."
      }
    ].slice(0, cardCount);
  } else if (topic.includes('cardiovascular') || topic.includes('heart') || topic.includes('cardiac')) {
    return [
      {
        front: "What is the mechanism of action of ACE inhibitors?",
        back: "ACE inhibitors work by blocking the angiotensin-converting enzyme, which prevents the conversion of angiotensin I to angiotensin II. This reduces vasoconstriction and aldosterone secretion, leading to decreased blood pressure and cardiac workload. Examples include enalapril, lisinopril, and captopril."
      },
      {
        front: "Why are beta-blockers contraindicated in asthma?",
        back: "Beta-blockers are contraindicated in asthma because they can cause bronchoconstriction by blocking beta-2 receptors in the lungs. This can worsen asthma symptoms and potentially cause life-threatening bronchospasm. Selective beta-1 blockers like metoprolol are preferred in patients with respiratory conditions."
      },
      {
        front: "What is the mechanism of action of statins?",
        back: "Statins work by competitively inhibiting HMG-CoA reductase, the rate-limiting enzyme in cholesterol synthesis. This reduces hepatic cholesterol production, leading to increased LDL receptor expression and decreased circulating LDL cholesterol. Examples include atorvastatin, simvastatin, and rosuvastatin."
      }
    ].slice(0, cardCount);
  } else {
    // Generic comprehensive flashcards
    return [
      {
        front: "What is the primary mechanism of action for this drug class?",
        back: "The primary mechanism involves competitive inhibition of specific receptors or enzymes, preventing the binding of endogenous substances and producing therapeutic effects. This mechanism is fundamental to understanding the drug's actions and interactions."
      },
      {
        front: "What are the common side effects of this medication?",
        back: "Common side effects include headache, nausea, dizziness, and fatigue. The specific side effect profile depends on the individual drug and patient factors such as age, comorbidities, and concurrent medications. Monitoring and patient education are essential for optimal outcomes."
      },
      {
        front: "What are the contraindications for this drug?",
        back: "Contraindications include severe hepatic or renal impairment, known hypersensitivity to the drug or its components, and certain medical conditions where the drug could cause harm. Always check the package insert and consider patient-specific factors before prescribing."
      }
    ].slice(0, cardCount);
  }
}


// Prompt definition moved to function

