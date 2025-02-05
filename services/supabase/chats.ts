import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from './client';
import { Chat } from '@/types/chats';

export const getUserChats = async (userId: string): Promise<Chat[] | null> => {
    try {
        const { data, error } = await supabase
            .from('chats')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching user chats:', error);
            return null;
        }

        return data;
    } catch (error: any) {
        console.error('Unexpected error fetching user chats:', error?.message);
        return null;
    }
};

export const getChatById = async (chatId: string): Promise<Chat | null> => {
    try {
        const { data, error } = await supabase.from('chats').select('*').eq('id', chatId).single();

        if (error) {
            console.error('Error fetching chat:', error);
            return null;
        }

        return data;
    } catch (error: any) {
        console.error('Unexpected error fetching user chats:', error?.message);
        return null;
    }
};

export const createChat = async (userId: string): Promise<Chat | null> => {
    try {
        const response: PostgrestSingleResponse<Chat | null> = await supabase
            .from('chats')
            .insert([{ user_id: userId }])
            .select('*')
            .single();

        const { data, error } = response;

        if (error) {
            console.error('Error creating chat:', error);
            return null;
        }

        if (!data) {
            console.error('No data returned on chat creation');
            return null;
        }

        return data;
    } catch (error: any) {
        console.error('Unexpected error fetching user chats:', error?.message);
        return null;
    }
};

export const deleteChatById = async (chatId: string): Promise<boolean> => {
    try {
        const { error } = await supabase.from('chats').delete().eq('id', chatId);

        if (error) {
            console.error('Error deleting chat:', error);
            return false;
        }

        return true;
    } catch (error: any) {
        console.error('Unexpected error fetching user chats:', error?.message);
        return false;
    }
};
