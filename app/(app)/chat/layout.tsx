import type { Metadata } from 'next';
import { Box } from '@mui/material';
import SideMenu from '@/components/ui/SideMenu/SideMenu';

export const metadata: Metadata = {
    title: 'Chat with HashLEY',
    description:
        'HashLEY is an AI-powered DeFi assistant that helps you track trending tokens, access real-time on-chain data, and execute swaps.',
};

export default function ChatLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <SideMenu />
            <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>{children}</Box>
        </Box>
    );
}
