import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { getAccessToken } from '@privy-io/react-auth';
import { Chat, Message } from '@/types';

const fetcher = async ([url, token]: [string, string]) => {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        const error = new Error('An error occurred while fetching chats.');
        (error as any).info = await res.json();
        (error as any).status = res.status;
        throw error;
    }

    return res.json();
};

export const useUserChats = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const authToken = await getAccessToken();
            setToken(authToken);
        };
        fetchToken();
    }, []);

    // Fetch only when token is available
    const { data, mutate, error, isLoading } = useSWR<Chat[]>(token ? ['/api/chats', token] : null, fetcher, {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
    });

    return {
        chats: data || [],
        mutateChats: mutate,
        isLoading,
        isError: error,
    };
};

export const useChatId = (chatId: string | null) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const authToken = await getAccessToken();
            setToken(authToken);
        };
        fetchToken();
    }, []);

    const { data, error, mutate, isLoading } = useSWR<Chat>(
        chatId && token ? [`/api/chats/${chatId}`, token] : null,
        fetcher,
        {
            refreshInterval: 5000,
        }
    );

    return {
        chat: data,
        mutateChat: mutate,
        isLoading: isLoading,
        isError: error,
    };
};

export const useChatMessages = (chatId: string | null) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const authToken = await getAccessToken();
            setToken(authToken);
        };
        fetchToken();
    }, []);

    const { data, error, mutate, isLoading } = useSWR<Message[]>(
        chatId && token ? [`/api/chats/${chatId}/messages`, token] : null,
        fetcher,
        {
            refreshInterval: 5000,
        }
    );

    return {
        messages: data,
        mutateMessages: mutate,
        isLoading: isLoading,
        isError: error,
    };
};
