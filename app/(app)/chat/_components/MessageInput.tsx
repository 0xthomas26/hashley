import React, { useState } from 'react';
import { Box, CircularProgress, IconButton, TextField, useTheme } from '@mui/material';
import { FaArrowUp } from 'react-icons/fa';
import { createChat, sendMessage } from '@/services/chats/chatServices';
import { usePrivy } from '@privy-io/react-auth';
import { useChatMessages, useUserChats } from '@/hooks/useChats';
import { useRouter } from 'next/navigation';

interface MessageInputProps {
    selectedModel: string;
    chatId: string | null;
}

const MessageInput: React.FC<MessageInputProps> = ({ selectedModel, chatId }) => {
    const theme = useTheme();
    const router = useRouter();
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const { getAccessToken } = usePrivy();
    const { mutateChats } = useUserChats();
    const { mutateMessages } = useChatMessages(chatId);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        if (!message) return;

        setIsLoading(true);
        setError('');

        try {
            const token = await getAccessToken();
            if (chatId) {
                const data = await sendMessage(chatId, message, selectedModel, token!);
                console.log('Message sent successfully:', data);
            } else {
                const data = await createChat(message, selectedModel, token!);
                router.push(`/chat/${data.id}`);
                console.log('Chat created successfully:', data);
            }
            mutateChats();
            mutateMessages();
            setMessage('');
        } catch (error: any) {
            console.error('Error sending message:', error);
            setError('Failed to send message. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                }}
            >
                <TextField
                    fullWidth
                    placeholder="Ask HashLEY anything..."
                    variant="standard"
                    multiline
                    maxRows={10}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    slotProps={{
                        input: {
                            disableUnderline: true,
                        },
                    }}
                    sx={{
                        '& .MuiInputBase-inputMultiline': {
                            borderBottom: 'none',
                        },
                    }}
                />
                <IconButton
                    onClick={handleSubmit}
                    disabled={message.length === 0}
                    sx={{
                        background: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        transition: '.3s',
                        '&:hover': {
                            background: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            opacity: 0.5,
                        },
                    }}
                >
                    {isLoading ? (
                        <CircularProgress size={20} />
                    ) : (
                        <FaArrowUp style={{ fontSize: theme.typography.fontSize * 1.4 }} />
                    )}
                </IconButton>
            </Box>
            {error && <Box sx={{ color: 'error.main', mt: 1 }}>{error}</Box>}
        </Box>
    );
};

export default MessageInput;
