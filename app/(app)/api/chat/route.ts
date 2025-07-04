'use server';

import { NextResponse, NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { appendResponseMessages, CoreAssistantMessage, generateId, Message, streamText, StreamTextResult } from 'ai';
import { ollama } from '@/ai/ollamaProvider';
import { geminiModel } from '@/ai/geminiProvider';
import { updateMessagesByChatId } from '@/services/mongodb/chats';
import { generateCharacterPrompt, getPersonalityById, hashleyConfig } from '@/ai/character';
import { Models } from '@/types';
import { chooseAgent } from './utils';

// STREAM LLM ANSWER
export const POST = async (req: NextRequest) => {
    let messages: Message[] = [];
    let chatId: string | null = null;
    let userId: string | null = null;

    try {
        const {
            messages: providedMessages,
            model: modelType,
            chatId: providedChatId,
            personalityId,
        } = await req.json();
        chatId = providedChatId;
        messages = providedMessages;

        const { userId: id, error } = await verifyToken(req);
        userId = id ? id : null;
        if (!userId || error) return NextResponse.json({ error: error || 'Missing user ID' }, { status: 401 });

        const model = modelType === Models.Gemini ? geminiModel : ollama('llama3.2');

        const character = getPersonalityById(personalityId) || hashleyConfig;

        const validMessages = messages.filter((msg, i) => {
            const isValid = msg.content && msg.content.trim() !== '';
            if (!isValid) {
                console.warn(`Filtered empty message at index ${i}:`, msg);
            }
            return isValid;
        });

        if (validMessages.length === 0) {
            console.warn('No valid messages to process.');
            return NextResponse.json({ error: 'All messages were empty or invalid.' }, { status: 400 });
        }

        const chosenAgent = await chooseAgent(model, validMessages);

        const result: StreamTextResult<Record<string, any>, any> = streamText({
            model: model,
            messages: validMessages,
            async onFinish({ response }) {
                const newMessages = appendResponseMessages({
                    messages,
                    responseMessages: response.messages,
                });

                if (chatId && userId) await updateMessagesByChatId(chatId, userId, newMessages);
            },
            system: generateCharacterPrompt(character),
            tools: chosenAgent?.tools,
        });

        result.consumeStream();

        return result.toDataStreamResponse({ sendReasoning: true });
    } catch (error: any) {
        console.error('Error:', error.message);

        // Prepare an error message for the user
        const errorMessage: CoreAssistantMessage = {
            role: 'assistant',
            content: `⚠️ Error: ${error.message} Please try again later.`,
        };

        // Append the error message to the chat history
        if (chatId && userId) {
            const newMessages = appendResponseMessages({
                messages,
                responseMessages: [{ id: generateId(), ...errorMessage }],
            });
            await updateMessagesByChatId(chatId, userId, newMessages);
        }

        // Return error as a streamed response so the frontend receives it
        return new Response(
            new ReadableStream({
                start(controller) {
                    controller.enqueue(
                        `data: ${JSON.stringify({ role: 'assistant', content: errorMessage.content })}\n\n`
                    );
                    controller.close();
                },
            }),
            {
                headers: { 'Content-Type': 'text/event-stream' },
                status: 500,
            }
        );
    }
};
