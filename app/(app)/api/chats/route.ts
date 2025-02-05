'use server';

import { NextResponse, NextRequest } from 'next/server';
import { createChat, getUserChats } from '@/services/supabase/chats';
import { createMessage } from '@/services/supabase/messages';
import { verifyToken } from '@/lib/auth';

export const GET = async (req: NextRequest) => {
    try {
        const { userId, error } = await verifyToken(req);
        if (!userId || error) return NextResponse.json({ error: error || 'Missing user ID' }, { status: 401 });

        return NextResponse.json(await getUserChats(userId));
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export const POST = async (req: NextRequest) => {
    try {
        const { message } = await req.json();

        const { userId, error } = await verifyToken(req);
        if (!userId || error) return NextResponse.json({ error: error || 'Missing user ID' }, { status: 401 });

        const chat = await createChat(userId);
        if (chat?.id) await createMessage(chat.id, userId, message, 'user');

        return NextResponse.json(chat);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
