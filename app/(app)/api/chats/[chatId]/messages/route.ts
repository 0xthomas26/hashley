'use server';

import { NextResponse, NextRequest } from 'next/server';
import { getChatById } from '@/services/supabase/chats';
import { getMessagesByChatId } from '@/services/supabase/messages';
import { verifyToken } from '@/lib/auth';

export const GET = async (req: NextRequest, { params }: { params: Promise<{ chatId: string }> }) => {
    try {
        const { chatId } = await params;

        const { userId, error } = await verifyToken(req);
        if (!userId || error) return NextResponse.json({ error: error || 'Missing user ID' }, { status: 401 });

        if (typeof chatId !== 'string') return NextResponse.json({ error: 'Invalid Chat Id' }, { status: 401 });

        const chat = await getChatById(chatId);
        if (!chat) return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
        else if (chat.user_id !== userId) return NextResponse.json({ error: 'User not authorized' }, { status: 403 });

        const messages = await getMessagesByChatId(chat.id);

        return NextResponse.json(messages);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
