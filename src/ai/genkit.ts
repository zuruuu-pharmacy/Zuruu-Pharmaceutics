import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Check if Google AI API key is available
const hasGoogleAiApiKey = process.env.GOOGLE_AI_API_KEY;

export const ai = genkit({
  plugins: [googleAI()],
  // Don't set a default model here, let each flow specify its own
});
