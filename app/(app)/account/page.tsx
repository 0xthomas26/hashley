'use client';

import React from 'react';
import { Box, Container, Divider, Paper, Typography } from '@mui/material';
import AccountInfo from './_components/AccountInfo';
import ConnectedAccounts from './_components/ConnectedAccounts';
import CircularLoading from '@/components/ui/CircularLoading';
import { usePrivy } from '@privy-io/react-auth';

const ChatPage: React.FC = () => {
    const { user } = usePrivy();

    return (
        <Box sx={{ height: '100%' }}>
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Typography variant="h1" gutterBottom sx={{ textAlign: 'center' }}>
                    Account
                </Typography>
                {!user ? (
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularLoading size={30} />
                    </Box>
                ) : (
                    <Paper
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            px: 2,
                            py: 2,
                            mt: 4,
                            borderRadius: '10px',
                        }}
                        elevation={3}
                    >
                        <AccountInfo />
                        <Divider sx={{ width: '100%', my: 2 }} />
                        <ConnectedAccounts />
                    </Paper>
                )}
            </Container>
        </Box>
    );
};

export default ChatPage;
