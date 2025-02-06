export enum Roles {
    User = 'user',
    Assistant = 'assistant',
    System = 'system',
}

export type Role = 'user' | 'assistant' | 'system';

export type Message = {
    id: string;
    chat_id: string;
    user_id: string;
    role: Role;
    content: string;
    created_at: Date;
};
