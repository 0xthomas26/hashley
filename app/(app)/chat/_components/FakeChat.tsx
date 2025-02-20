import React from 'react';
import { Paper, Box, Typography, useTheme, Container } from '@mui/material';
import ChatInput from './ChatInput';
import { Message } from 'ai';

interface FakeChatProps {
    message: Message;
}

const FakeChat: React.FC<FakeChatProps> = ({ message }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
                Chat ...
            </Typography>
            <Container
                maxWidth="md"
                sx={{ position: 'relative', width: '100%', flexGrow: 1, pb: 4, overflowY: 'auto' }}
            >
                {/* Messages list */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
                    <Paper
                        sx={{
                            alignSelf: 'flex-end',
                            padding: 2,
                            borderRadius: 2,
                            maxWidth: '100%',
                            background: theme.palette.background.paper,
                            zIndex: 1,
                        }}
                        elevation={0}
                    >
                        <Typography variant="body1">{message?.content}</Typography>
                    </Paper>

                    <Typography variant="body1" sx={{ alignSelf: 'flex-start' }}>
                        Thinking...
                    </Typography>
                </Box>
            </Container>
            <Container maxWidth="md" sx={{ pt: 2, position: 'sticky', bottom: 0 }}>
                <ChatInput />
            </Container>
        </Box>
    );
};

export default FakeChat;
