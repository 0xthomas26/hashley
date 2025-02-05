import { supabase } from './client';
import { Message } from '@/types/messages';

export const createMessage = async (
    chatId: string,
    userId: string,
    text: string,
    role: 'user' | 'agent'
): Promise<Message | null> => {
    try {
        const { data, error } = await supabase
            .from('messages')
            .insert([{ chat_id: chatId, user_id: userId, text: text, role: role }]);

        if (error) {
            console.error('Error creating message:', error);
            return null;
        }

        return data ? data[0] : null;
    } catch (error: any) {
        console.error('Unexpected error creating message:', error.message);
        return null;
    }
};

export const getMessagesByChatId = async (chatId: string): Promise<Message[] | null> => {
    try {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('chat_id', chatId)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching messages:', error);
            return null;
        }

        return data;
    } catch (error: any) {
        console.error('Unexpected error fetching messages:', error.message);
        return null;
    }
};
