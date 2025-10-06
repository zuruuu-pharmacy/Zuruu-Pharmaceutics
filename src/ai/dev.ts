
import { config } from 'dotenv';
config();

// Core AI flows - load these first
import '@/ai/flows/ai-interaction-engine.ts';
import '@/ai/flows/ai-dose-calculator.ts';
import '@/ai/flows/allergy-checker.ts';
import '@/ai/flows/drug-monograph-lookup.ts';
import '@/ai/flows/prescription-reader.ts';
import '@/ai/flows/drug-food-interaction.ts';
import '@/ai/flows/lab-report-analyzer.ts';
import '@/ai/flows/adherence-reporter.ts';
import '@/ai/flows/symptom-checker.ts';
import '@/ai/flows/refill-manager.ts';

// Tools
import '@/ai/tools/healthcare-finder.ts';
import '@/ai/tools/pharmacy-finder.ts';

// Educational flows
import '@/ai/flows/lecture-notes-analyzer.ts';
import '@/ai/flows/flashcard-generator.ts';
import '@/ai/flows/clinical-case-simulator.ts';
import '@/ai/flows/sop-generator.ts';
import '@/ai/flows/osce-station-generator.ts';
import '@/ai/flows/question-generator.ts';
import '@/ai/flows/study-planner.ts';
import '@/ai/flows/plagiarism-checker.ts';
import '@/ai/flows/reference-generator.ts';
import '@/ai/flows/text-to-speech.ts';

// Game flows
import '@/ai/flows/anagram-generator.ts';
import '@/ai/flows/crossword-generator.ts';
import '@/ai/flows/word-search-generator.ts';
import '@/ai/flows/matching-game-generator.ts';
import '@/ai/flows/mnemonic-generator.ts';

// Calculator flows
import '@/ai/flows/bsa-dose-calculator.ts';
import '@/ai/flows/iv-rate-calculator.ts';
import '@/ai/flows/compounding-calculator.ts';

// Lifestyle flows
import '@/ai/flows/diet-planner.ts';
import '@/ai/flows/lifestyle-suggester.ts';
import '@/ai/flows/nutrition-coach.ts';
import '@/ai/flows/herbal-knowledge-hub.ts';

// Specialized flows
import '@/ai/flows/drug-card-flashcard-generator.ts';
import '@/ai/flows/drug-card-quiz-generator.ts';
import '@/ai/flows/drug-card-case-mcq-generator.ts';
import '@/ai/flows/virtual-lab-simulator.ts';
