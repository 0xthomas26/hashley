import { NextRequest } from 'next/server';
import { privy } from '@/services/privy';

interface AuthResult {
    userId?: string;
    error?: string;
}

export const verifyToken = async (req: NextRequest): Promise<AuthResult> => {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        return { error: 'Missing or invalid authorization header' };
    }

    const token = authHeader.split(' ')[1];
    try {
        const { userId } = await privy.verifyAuthToken(token);
        if (!userId) {
            return { error: 'Invalid token' };
        }
        return { userId: userId?.split(':')[2] };
    } catch (error: any) {
        console.error('Token verification failed:', error.message);
        return { error: 'Server error during token verification' };
    }
};
