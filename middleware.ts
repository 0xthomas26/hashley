// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { privy } from '@/services/privy';

export const middleware = async (request: NextRequest) => {
    const sessionToken = request.cookies.get('privy-token')?.value;

    // Redirect to login if no session token is found
    if (!sessionToken) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    const isValidSession = await privy.verifyAuthToken(sessionToken);
    if (!isValidSession) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
};

// Apply this middleware to all routes under /app/pages/chat
export const config = {
    matcher: '/chat/:path*',
};
