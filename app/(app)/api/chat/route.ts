'use server';

import { NextResponse, NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { appendResponseMessages, Message, streamText, StreamTextResult } from 'ai';
import { ollama } from '@/ai/ollamaProvider';
import { geminiModel } from '@/ai/geminiProvider';
import { updateMessagesByChatId } from '@/services/supabase/chats';
import { generateCharacterPrompt, hashleyConfig } from '@/ai/character';
import { Models } from '@/types';
import { chooseAgent } from './utils';

// STREAM LLM ANSWER
export const POST = async (req: NextRequest) => {
    try {
        const { messages, model: modelType, chatId } = await req.json();

        const { userId, error } = await verifyToken(req);
        if (!userId || error) return NextResponse.json({ error: error || 'Missing user ID' }, { status: 401 });

        const model = modelType === Models.Gemini ? geminiModel : ollama('llama3.2');

        const chosenAgent = await chooseAgent(model, messages);

        const result: StreamTextResult<Record<string, any>, any> = streamText({
            model: model,
            messages: messages,
            async onFinish({ response }) {
                const newMessages = appendResponseMessages({
                    messages,
                    responseMessages: response.messages,
                });

                await updateMessagesByChatId(chatId, userId, newMessages);
            },
            system: generateCharacterPrompt(hashleyConfig),
            tools: chosenAgent?.tools,
        });

        result.consumeStream();

        return result.toDataStreamResponse({ sendReasoning: true });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
