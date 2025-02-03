'use client';

import { ReactNode } from 'react';
import { CacheProvider } from '@emotion/react';
import { emotionCache } from '@/src/emotionCache';

interface CacheProviderProps {
    children: ReactNode;
}

export const CssProvider: React.FC<CacheProviderProps> = ({ children }) => {
    return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
};
