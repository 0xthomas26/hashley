'use server';

import { NextResponse, NextRequest } from 'next/server';
import { getUserChats } from '@/services/supabase/chats';
import { verifyToken } from '@/lib/auth';
import { createChat } from '@/services/supabase/chats';

// GET USER'S CHATS
export const GET = async (req: NextRequest) => {
    try {
        const { userId, error } = await verifyToken(req);
        if (!userId || error) return NextResponse.json({ error: error || 'Missing user ID' }, { status: 401 });

        return NextResponse.json(await getUserChats(userId));
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

// CREATE A USER'S CHAT
export const POST = async (req: NextRequest) => {
    try {
        const { chatId } = await req.json();

        const { userId, error } = await verifyToken(req);
        if (!userId || error) return NextResponse.json({ error: error || 'Missing user ID' }, { status: 401 });

        return NextResponse.json(await createChat(userId, chatId));
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
