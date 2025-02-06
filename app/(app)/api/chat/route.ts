'use server';

import { NextResponse, NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { appendResponseMessages, streamText } from 'ai';
import { ollama } from '@/ai/ollamaProvider';
import { updateMessagesByChatId } from '@/services/supabase/chats';

// STREAM LLM ANSWER
export const POST = async (req: NextRequest) => {
    try {
        const { messages, model, chatId } = await req.json();

        const { userId, error } = await verifyToken(req);
        if (!userId || error) return NextResponse.json({ error: error || 'Missing user ID' }, { status: 401 });

        console.log(model, chatId);

        const result = streamText({
            model: ollama.chat('llama3.2'),
            messages: messages,
            async onFinish({ response }) {
                const newMessages = appendResponseMessages({
                    messages,
                    responseMessages: response.messages,
                });

                await updateMessagesByChatId(chatId, userId, newMessages);
            },
        });

        result.consumeStream();

        return result.toDataStreamResponse({ sendReasoning: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
