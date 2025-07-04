import { getMongoDb } from './client';
import { Message, Role } from '@/types/messages';

export const createMessage = async (
    chatId: string,
    userId: string,
    content: string,
    role: Role
): Promise<Message | null> => {
    try {
        const db = await getMongoDb();

        const doc: Message = {
            chat_id: chatId,
            user_id: userId,
            content,
            role,
            created_at: new Date(),
        };

        const result = await db.collection<Message>('messages').insertOne(doc);

        if (!result.insertedId) {
            console.error('Error creating message: no ID returned');
            return null;
        }

        return doc;
    } catch (error: any) {
        console.error('Unexpected error creating message:', error.message);
        return null;
    }
};

export const getMessagesByChatId = async (chatId: string): Promise<Message[] | null> => {
    try {
        const db = await getMongoDb();
        const messages = await db
            .collection<Message>('messages')
            .find({ chat_id: chatId })
            .sort({ created_at: 1 })
            .toArray();

        return messages;
    } catch (error: any) {
        console.error('Unexpected error fetching messages:', error.message);
        return null;
    }
};
