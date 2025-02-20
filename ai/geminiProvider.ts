import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { LanguageModelV1 } from 'ai';

export const geminiModel = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY })(
    'gemini-1.5-flash'
) as LanguageModelV1;
