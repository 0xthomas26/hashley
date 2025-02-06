import { Message } from 'ai';

export type Chat = {
    id: string;
    user_id: string;
    title?: string;
    messages: Array<Message>;
    created_at: Date;
};
