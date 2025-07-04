import { getMongoDb } from './client';
import { Chat } from '@/types/chats';
import { Message } from 'ai';

export const getUserChats = async (userId: string): Promise<Chat[] | null> => {
    try {
        const db = await getMongoDb();
        const chats = await db.collection<Chat>('chats').find({ user_id: userId }).sort({ created_at: -1 }).toArray();

        return chats as Chat[] | null;
    } catch (error: any) {
        console.error('Error fetching user chats:', error.message);
        return null;
    }
};

export const getChatById = async (chatId: string): Promise<Chat | null> => {
    try {
        const db = await getMongoDb();
        const chat = await db.collection<Chat>('chats').findOne({ id: chatId });

        return chat as Chat | null;
    } catch (error: any) {
        console.error('Error fetching chat:', error.message);
        return null;
    }
};

export const createChat = async (userId: string, chatId: string): Promise<Chat | null> => {
    try {
        const db = await getMongoDb();
        const doc = {
            id: chatId,
            user_id: userId,
            created_at: new Date(),
            messages: [],
        };

        const result = await db.collection<Chat>('chats').insertOne(doc);
        if (!result.insertedId) {
            console.error('No data returned on chat creation');
            return null;
        }

        return doc as Chat;
    } catch (error: any) {
        console.error('Error creating chat:', error.message);
        return null;
    }
};

export const deleteChatById = async (chatId: string): Promise<boolean> => {
    try {
        const db = await getMongoDb();
        const result = await db.collection<Chat>('chats').deleteOne({ id: chatId });

        return result.deletedCount === 1;
    } catch (error: any) {
        console.error('Error deleting chat:', error.message);
        return false;
    }
};

export const updateMessagesByChatId = async (
    chatId: string,
    userId: string,
    newMessages: Message[]
): Promise<Chat | null> => {
    try {
        const db = await getMongoDb();
        const result = await db.collection<Chat>('chats').findOneAndUpdate(
            { id: chatId, user_id: userId },
            {
                $set: {
                    messages: newMessages,
                    updated_at: new Date(),
                },
            },
            { upsert: true, returnDocument: 'after' }
        );

        return result as Chat | null;
    } catch (error: any) {
        console.error('Error updating/inserting chat messages:', error.message);
        return null;
    }
};
