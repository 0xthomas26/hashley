'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, IconButton, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import ChatInput from '../_components/ChatInput';
import { formatWalletAddress } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { useChat } from '../_contexts/chat';
import Markdown from '@/components/ui/MarkDown';
import { ArrowDownward } from '@mui/icons-material';
import CircularLoading from '@/components/ui/CircularLoading';
import TrendingTokensTool, { ExtendedToolInvocation } from '../_components/TrendingTokensTool';

const ChatIdPage: React.FC = () => {
    const router = useRouter();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const prevChatIdRef = useRef<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [atBottom, setAtBottom] = useState<boolean>(true);

    const { id } = useParams();
    const { messages, loadingChat, isResponseLoading, isLoading, isError, setChat } = useChat();

    const scrollToBottom = () => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        if (containerRef && containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold
            setAtBottom(isAtBottom);
        }
    };

    useEffect(() => {
        let container = null;
        if (containerRef.current) {
            container = containerRef.current;
            container.addEventListener('scroll', handleScroll);
        }
        return () => container?.removeEventListener('scroll', handleScroll);
    }, []);

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
                Chat {isXs && id ? formatWalletAddress(id as string) : id}
            </Typography>
            <Container
                maxWidth="md"
                sx={{ position: 'relative', width: '100%', flexGrow: 1, pb: 4, overflowY: 'auto' }}
                ref={containerRef}
            >
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
                    {messages && messages.length > 0 ? (
                        messages.map((message, index) =>
                            message.parts?.map((part, index) => {
                                if (part.type === 'text')
                                    return (
                                        <Paper
                                            key={index}
                                            sx={{
                                                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                                                padding: 2,
                                                borderRadius: 2,
                                                maxWidth: '100%',
                                                background:
                                                    message.role === 'user'
                                                        ? theme.palette.background.paper
                                                        : 'transparent',
                                                zIndex: 1,
                                            }}
                                            elevation={0}
                                        >
                                            {message.role === 'user' ? (
                                                <Typography variant="body1">{part.text}</Typography>
                                            ) : (
                                                <Markdown>{part.text}</Markdown>
                                            )}
                                        </Paper>
                                    );
                                else if (part.type === 'tool-invocation')
                                    return (
                                        <Box
                                            key={index}
                                            sx={{
                                                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                {part.toolInvocation.toolName}
                                            </Typography>
                                            <TrendingTokensTool
                                                toolInvocation={part.toolInvocation as ExtendedToolInvocation}
                                            />
                                        </Box>
                                    );
                            })
                        )
                    ) : !isError && !isResponseLoading && !isLoading && !loadingChat ? (
                        <Typography align="center" color="textSecondary">
                            No messages yet. Start the conversation!
                        </Typography>
                    ) : (
                        loadingChat && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <CircularLoading size={25} />
                                <Typography align="center" color="textSecondary" sx={{ ml: 1 }}>
                                    Loading chat messages...
                                </Typography>
                            </Box>
                        )
                    )}
                    {isResponseLoading && (
                        <Typography variant="body1" sx={{ alignSelf: 'flex-start' }}>
                            Thinking...
                        </Typography>
                    )}
                    <Box component="div" ref={lastMessageRef} />
                </Box>
            </Container>
            <Box maxWidth="md" sx={{ width: '100%', position: 'relative' }}>
                {!atBottom && (
                    <IconButton
                        onClick={() => scrollToBottom()}
                        sx={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: theme.palette.background.paper,
                            zIndex: 1000,
                            opacity: 0.7,
                            bottom: 30,
                        }}
                    >
                        <ArrowDownward />
                    </IconButton>
                )}
            </Box>
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
