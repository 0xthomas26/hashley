'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Container, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import ChatInput from '../_components/ChatInput';
import { formatWalletAddress } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { useChat } from '../_contexts/chat';

const ChatIdPage: React.FC = () => {
    const router = useRouter();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const prevChatIdRef = useRef<string | null>(null);

    const { id } = useParams();
    const { messages, isResponseLoading, isError, setChat } = useChat();

    useEffect(() => {
        if (!id || Array.isArray(id)) return;

        if (prevChatIdRef.current !== id) {
            setChat(id);
            prevChatIdRef.current = id;
        }
    }, [id, setChat]);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
                Chat {isXs && id ? formatWalletAddress(id as string) : id}
            </Typography>
            <Container maxWidth="md" sx={{ flexGrow: 1, pb: 4, overflowY: 'auto' }}>
                {/* Loading state */}
                {/* {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularLoading size={30} />
                    </Box>
                )} */}

                {/* Error state */}
                {isError && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography color="error" align="center" sx={{ mt: 4 }}>
                            Error loading chat. Please go back.
                        </Typography>
                        <Button onClick={() => router.push('/chat')} sx={{ mt: 4 }}>
                            Back
                        </Button>
                    </Box>
                )}

                {/* Messages list */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
                    {!isError && messages && messages.length > 0
                        ? messages.map((message, index) => (
                              <Paper
                                  key={index}
                                  sx={{
                                      alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                                      padding: 2,
                                      borderRadius: 2,
                                      maxWidth: '75%',
                                  }}
                                  elevation={3}
                              >
                                  <Typography variant="body1">{message.content}</Typography>
                              </Paper>
                          ))
                        : !isError && (
                              <Typography align="center" color="textSecondary">
                                  No messages yet. Start the conversation!
                              </Typography>
                          )}
                    {isResponseLoading && (
                        <Typography variant="body1" sx={{ alignSelf: 'flex-start' }}>
                            Thinking...
                        </Typography>
                    )}
                    <Box component="div" ref={lastMessageRef} />
                </Box>
            </Container>

            {/* Chat input at the bottom */}
            {!isError && (
                <Container maxWidth="md" sx={{ pt: 2, position: 'sticky', bottom: 0 }}>
                    <ChatInput />
                </Container>
            )}
        </Box>
    );
};

export default ChatIdPage;
