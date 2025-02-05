'use client';

import React from 'react';
import { Container, Typography } from '@mui/material';
import FooterButtons from './_components/FooterButtons';
import ChatInput from './_components/ChatInput';

const ChatPage: React.FC = () => {
    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                {`Good afternoon, from HashLEY!`}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
                Your AI-powered DeFi agents.
            </Typography>
            <ChatInput />
            <FooterButtons />
        </Container>
    );
};

export default ChatPage;
