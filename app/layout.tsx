import type { Metadata } from 'next';
import Providers from './_contexts';

export const metadata: Metadata = {
    title: 'HashLEY – AI-Powered DeFi Assistant',
    description:
        'HashLEY is an AI-powered DeFi assistant that helps you track trending tokens, access real-time on-chain data, and execute swaps.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
