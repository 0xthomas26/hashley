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
import TrendingTokensTool, { TrendingToolInvocation } from '../_components/TrendingTokensTool';
import { FilePresentOutlined } from '@mui/icons-material';
import Image from 'next/image';
import TokenDataTool, { TokenDataToolInvocation } from '../_components/TokenData';

const ChatIdPage: React.FC = () => {
    const router = useRouter();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const prevChatIdRef = useRef<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [atBottom, setAtBottom] = useState<boolean>(true);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const { id } = useParams();
    const { messages, loadingChat, isResponseLoading, isLoading, isError, setChat, files, setFiles } = useChat();

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

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (!e.dataTransfer || !e.dataTransfer.files || e.dataTransfer.files.length === 0) return;

        const droppedFiles: File[] = Array.from(e.dataTransfer.files);

        setFiles(files ? [...files, ...droppedFiles] : droppedFiles);
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
    console.log(messages);

    return (
        <Box
            component="div"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {isDragging && (
                <Box
                    sx={(theme) => ({
                        position: 'fixed', // Covers the entire viewport
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor:
                            theme.palette.mode === 'dark'
                                ? theme.palette.background.default + 'CC' // Dark mode semi-transparent
                                : theme.palette.background.default + '80', // Light mode semi-transparent
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1300, // Ensures it's above everything
                        backdropFilter: 'blur(4px)', // ✅ Smooth Glassmorphism Effect
                    })}
                >
                    <Typography
                        variant="body1"
                        sx={(theme) => ({
                            fontSize: theme.typography.h4.fontSize,
                            fontWeight: theme.typography.h4.fontWeight,
                            fontFamily: theme.typography.h4.fontFamily,
                            padding: '20px 40px',
                            borderRadius: '12px',
                            backgroundColor: theme.palette.background.paper, // ✅ Uses themed background
                            color: theme.palette.text.primary, // ✅ Adaptive text color
                            boxShadow: theme.shadows[10], // ✅ Uses theme shadows
                            transition: theme.transitions.create(['opacity', 'transform'], {
                                duration: theme.transitions.duration.short, // ✅ Smooth animations
                            }),
                        })}
                    >
                        Drop your files here
                    </Typography>
                </Box>
            )}
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
                        messages.map((message) =>
                            message.parts?.map((part, index) => {
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        {/* Display Attachments Before Message Content */}
                                        {message?.experimental_attachments &&
                                            message?.experimental_attachments?.length > 0 && (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        gap: 1,
                                                        mb: 1,
                                                        justifyContent:
                                                            message.role === 'user' ? 'flex-end' : 'flex-start',
                                                    }}
                                                >
                                                    {message?.experimental_attachments?.map((attachment, i) => (
                                                        <Box
                                                            key={i}
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                maxWidth: '50%',
                                                                borderRadius: '12px',
                                                            }}
                                                        >
                                                            {/* Render image or PDF */}
                                                            {attachment?.contentType?.startsWith('image/') ? (
                                                                <Box
                                                                    sx={{
                                                                        position: 'relative',
                                                                        width: '100%',
                                                                        overflow: 'hidden',
                                                                    }}
                                                                >
                                                                    <Image
                                                                        src={attachment.url}
                                                                        alt={`attachment: ${attachment.name}`}
                                                                        width={200}
                                                                        height={0}
                                                                        sizes="auto"
                                                                        style={{
                                                                            height: 'auto',
                                                                            objectFit: 'contain',
                                                                            borderRadius: '8px',
                                                                        }}
                                                                    />
                                                                </Box>
                                                            ) : (
                                                                <Paper
                                                                    sx={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: 1,
                                                                        p: 1,
                                                                    }}
                                                                    elevation={0}
                                                                >
                                                                    <FilePresentOutlined />
                                                                    <Typography fontSize={12}>
                                                                        {attachment.name}
                                                                    </Typography>
                                                                </Paper>
                                                            )}
                                                        </Box>
                                                    ))}
                                                </Box>
                                            )}

                                        {/* Display Text Content */}
                                        {part.type === 'text' && (
                                            <Paper
                                                sx={{
                                                    alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                                                    padding: message.role === 'user' ? 2 : 0,
                                                    borderRadius: 2,
                                                    maxWidth: message.role === 'user' ? '75%' : '100%',
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
                                        )}

                                        {/* Tool Invocation (if any) */}
                                        {part.type === 'tool-invocation' && (
                                            <Box
                                                sx={{
                                                    alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                                                }}
                                            >
                                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                    {part.toolInvocation.toolName}
                                                </Typography>
                                                {part.toolInvocation.toolName === 'market-get-trending-tokens' && (
                                                    <TrendingTokensTool
                                                        toolInvocation={part.toolInvocation as TrendingToolInvocation}
                                                    />
                                                )}
                                                {part.toolInvocation.toolName === 'token-get-token-data' && (
                                                    <TokenDataTool
                                                        toolInvocation={part.toolInvocation as TokenDataToolInvocation}
                                                    />
                                                )}
                                            </Box>
                                        )}
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
