'use server';

import { NextResponse, NextRequest } from 'next/server';
import { deleteChatById, getChatById } from '@/services/supabase/chats';
import { createMessage } from '@/services/supabase/messages';
import { verifyToken } from '@/lib/auth';

export const GET = async (req: NextRequest, { params }: { params: Promise<{ chatId: string }> }) => {
    try {
        const { chatId } = await params;

        const { userId, error } = await verifyToken(req);
        if (!userId || error) return NextResponse.json({ error: error || 'Missing user ID' }, { status: 401 });

        if (typeof chatId !== 'string') return NextResponse.json({ error: 'Invalid Chat Id' }, { status: 401 });

        const chat = await getChatById(chatId);

        return NextResponse.json(chat);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export const POST = async (req: NextRequest, { params }: { params: Promise<{ chatId: string }> }) => {
    try {
        const { chatId } = await params;

        const { message } = await req.json();

        const { userId, error } = await verifyToken(req);
        if (!userId || error) return NextResponse.json({ error: error || 'Missing user ID' }, { status: 401 });

        const chat = await getChatById(chatId);
        if (chat?.id) await createMessage(chat.id, userId, message, 'user');

        return NextResponse.json(chat);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ chatId: string }> }) => {
    try {
        const { chatId } = await params;

        const { userId, error } = await verifyToken(req);
        if (!userId || error) return NextResponse.json({ error: error || 'Missing user ID' }, { status: 401 });

        const chat = await getChatById(chatId);
        if (!chat) return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
        else if (chat?.user_id === userId) await deleteChatById(chat.id);
        else return NextResponse.json({ error: 'User not allowed' }, { status: 403 });

        return NextResponse.json({ status: 'done' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
