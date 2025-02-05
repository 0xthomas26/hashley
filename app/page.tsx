'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Header from './_components/Header';
import LoginButton from './_components/LoginButton';

const HomePage: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '100vh' }}>
            <Header />
            <Container maxWidth="lg" sx={{ py: 8, flexGrow: 1 }}>
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
                        {"Hi, I'm HashLEY 👋"}
                    </Typography>
                    <Typography variant="body1" sx={{ my: 2, width: '80%' }} gutterBottom>
                        AI-powered DeFi assistant that helps you track trending tokens, access real-time on-chain data,
                        and execute swaps.
                    </Typography>
                    <LoginButton text="Get Started" sx={{ mt: 2 }} />
                </Box>
            </Container>
        </Box>
    );
};

export default HomePage;
