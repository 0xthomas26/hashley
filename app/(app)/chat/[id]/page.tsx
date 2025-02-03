'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Button from '@/components/ui/Button';
import { useParams, useRouter } from 'next/navigation';

const ChatIdPage: React.FC = () => {
    const router = useRouter();
    const params = useParams();

    const { id } = params;

    return (
        <Box sx={{ height: '100%' }}>
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        height: '50vh',
                    }}
                >
                    <Typography variant="h1" gutterBottom>
                        Chat {id} Page!
                    </Typography>
                    <Typography variant="body1" sx={{ my: 2, width: '80%', fontSize: '1.4rem' }} gutterBottom>
                        AI-powered DeFi assistant that helps you track trending tokens, access real-time on-chain data,
                        and execute swaps.
                    </Typography>
                    <Button sx={{ mt: 2 }} onClick={() => router.back()}>
                        Back
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default ChatIdPage;
