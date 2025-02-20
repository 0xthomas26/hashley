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
    setChat: (chatId: string) => void;
    resetChat: () => void;
    chatId: string;
    isError: string | null;
    stop: () => void;
    loadingChat: boolean;
}

const ChatContext = createContext<ChatContextType>({
    messages: [],
    isLoading: false,
    sendMessage: async (message: string) => null,
    isResponseLoading: false,
    setIsResponseLoading: () => {},
    append: async (message: Partial<CreateMessage>, chatRequestOptions?: ChatRequestOptions) => null,
    model: Models.Meta,
    setModel: () => {},
    setChat: () => {},
    resetChat: () => {},
    chatId: '',
    isError: null,
    stop: () => {},
    loadingChat: false,
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
    const [model, setModel] = useState<Models>(Models.Meta);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [isError, setIsError] = useState<string | null>(null);

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
            model,
            chatId,
        },
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        onResponse: () => {
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
        if (!message.trim()) return;
        setIsResponseLoading(true);
        await append({ role: 'user', content: message });
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
                setChat,
                resetChat,
                chatId,
                isError,
                stop: stopStreaming,
                loadingChat: loadingChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
