export type Message = {
    id: string;
    chat_id: string;
    user_id: string;
    text: string;
    role: 'user' | 'agent';
    created_at: Date;
};
