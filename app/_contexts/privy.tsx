'use client';

import { PrivyProvider as PrivyProviderBase } from '@privy-io/react-auth';
import { ThemeMode, useThemeMode } from './theme';

interface PrivyProviderProps {
    children: React.ReactNode;
}

export const PrivyProvider: React.FC<PrivyProviderProps> = ({ children }) => {
    const { mode } = useThemeMode();

    return (
        <PrivyProviderBase
            appId={process.env.PRIVY_APP_ID!}
            config={{
                appearance: {
                    theme:
                        mode === ThemeMode.DARK ||
                        (mode === ThemeMode.SYSTEM && window.matchMedia('(prefers-color-scheme: dark)').matches)
                            ? 'dark'
                            : 'light',
                    accentColor: '#284c47',
                    logo:
                        mode === ThemeMode.DARK ||
                        (mode === ThemeMode.SYSTEM && window.matchMedia('(prefers-color-scheme: dark)').matches)
                            ? 'https://hashley-two.vercel.app/logos/hashley-dark.svg'
                            : 'https://hashley-two.vercel.app/logos/hashley.svg',
                },
                embeddedWallets: {
                    createOnLogin: 'users-without-wallets',
                },
            }}
        >
            {children}
        </PrivyProviderBase>
    );
};
