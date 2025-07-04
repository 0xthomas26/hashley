'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect, useRef } from 'react';

import { Models } from '@/types/models';
import { usePrivy } from '@privy-io/react-auth';
import { ChatRequestOptions, CreateMessage, generateId } from 'ai';
import { Message, useChat as useAiChat } from 'ai/react';
import { useUserChats } from '@/hooks/useChats';

interface ChatContextType {
    messages: Message[];
    isLoading: boolean;
    sendMessage: (message: string) => Promise<void | null>;
    isResponseLoading: boolean;
    setIsResponseLoading: (loading: boolean) => void;
    append: (
        message: Message | CreateMessage,
        chatRequestOptions?: ChatRequestOptions
    ) => Promise<string | null | undefined>;
    model: Models;
    setModel: (model: Models) => void;
    personalityId: string;
    setPersonalityId: (id: string) => void;
    setChat: (chatId: string) => void;
    resetChat: () => void;
    chatId: string;
    isError: string | null;
    stop: () => void;
    loadingChat: boolean;
    setFiles: (file: File[] | null) => void;
    files: File[] | null;
}

const ChatContext = createContext<ChatContextType>({
    messages: [],
    isLoading: false,
    sendMessage: async (_message: string) => null,
    isResponseLoading: false,
    setIsResponseLoading: () => {},
    append: async (_message: Partial<CreateMessage>, _chatRequestOptions?: ChatRequestOptions) => null,
    model: Models.Meta,
    setModel: () => {},
    personalityId: '',
    setPersonalityId: (id: string) => {},
    setChat: () => {},
    resetChat: () => {},
    chatId: '',
    isError: null,
    stop: () => {},
    loadingChat: false,
    setFiles: () => {},
    files: null,
});

interface ChatProviderProps {
    children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const { getAccessToken } = usePrivy();
    const { mutateChats } = useUserChats();

    const authTokenRef = useRef<string | null>(null);
    const [chatId, setChatId] = useState<string>(generateId());
    const [loadingChat, setLoadingChat] = useState<boolean>(false);
    const [isResponseLoading, setIsResponseLoading] = useState<boolean>(false);
    const [model, setModel] = useState<Models>(Models.Gemini);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [isError, setIsError] = useState<string | null>(null);
    const [files, setFiles] = useState<File[] | null>(null);
    const [personalityId, setPersonalityId] = useState<string>('hashley-default');

    useEffect(() => {
        const fetchToken = async () => {
            const token = await getAccessToken();
            authTokenRef.current = token;
            setAuthToken(token);
        };

        if (!authTokenRef.current) fetchToken();
    }, [getAccessToken]);

    const { messages, append, isLoading, setMessages, stop } = useAiChat({
        maxSteps: 8,
        api: `/api/chat`,
        body: {
            personalityId,
        },
        // headers: {
        //     Authorization: `Bearer ${authToken}`,
        // },
        onResponse: async (response: any) => {
            if (!response?.ok) {
                try {
                    // Read and parse the streamed response
                    const reader = response.body?.getReader();
                    if (!reader) throw new Error('Failed to get reader from response body');

                    const decoder = new TextDecoder();
                    let resultText = '';

                    while (true) {
                        const { value, done } = await reader.read();
                        if (done) break;
                        resultText += decoder.decode(value, { stream: true });
                    }

                    // Attempt to parse JSON from the stream
                    const parsedMessages = resultText
                        .split('\n')
                        .filter((line) => line.startsWith('data: '))
                        .map((line) => JSON.parse(line.replace('data: ', '').trim()));

                    if (parsedMessages.length > 0) {
                        parsedMessages.forEach((msg) => {
                            setMessages((prev) => [
                                ...prev,
                                { id: generateId(), role: 'assistant', content: msg.content },
                            ]);
                        });
                    }
                } catch (err: any) {
                    console.log(err?.message);
                    setMessages((prev) => [
                        ...prev,
                        { id: generateId(), role: 'assistant', content: '⚠️ Error processing response' },
                    ]);
                }
            }
            setIsResponseLoading(false);
            mutateChats();
        },
    });

    const setChat = async (newChatId: string) => {
        if (!newChatId) return;
        setIsError(null);
        setChatId(newChatId);
        setLoadingChat(true);

        const chat = await fetch(`/api/chats/${newChatId}`, {
            headers: {
                Authorization: `Bearer ${await getAccessToken()}`,
            },
        });
        const chatData = await chat.json();
        if (chatData && chatData?.messages?.length > 0) setMessages(chatData.messages || []);
        setLoadingChat(false);
        // else setIsError('Chat does not exist');
    };

    const resetChat = () => {
        setChatId(generateId());
        setMessages([]);
    };

    const sendMessage = async (message: string) => {
        if ((!message || message.trim() === '') && (!files || files.length === 0)) return;
        setIsResponseLoading(true);

        let attachments: FileList | undefined = undefined;

        if (files && files.length > 0) {
            const dataTransfer = new DataTransfer();
            files.forEach((file) => dataTransfer.items.add(file));
            attachments = dataTransfer.files;
        }

        try {
            setFiles(null);
            await append(
                { role: 'user', content: message },
                {
                    headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'multipart/form-data' },
                    experimental_attachments: attachments,
                    body: { model, chatId },
                }
            );
        } catch (err: any) {
            console.error('Error sending message:', err?.message);
            setIsResponseLoading(false);
        }
    };

    const stopStreaming = () => {
        stop();
        setIsResponseLoading(false);
    };

    return (
        <ChatContext.Provider
            value={{
                messages,
                isLoading,
                sendMessage,
                isResponseLoading,
                setIsResponseLoading,
                append,
                model,
                setModel,
                personalityId,
                setPersonalityId,
                setChat,
                resetChat,
                chatId,
                isError,
                stop: stopStreaming,
                loadingChat: loadingChat,
                setFiles,
                files,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
