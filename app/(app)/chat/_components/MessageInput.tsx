import React, { useState } from 'react';
import { Box, IconButton, TextField, useTheme } from '@mui/material';
import { FaArrowUp } from 'react-icons/fa';
import { useChat } from '../_contexts/chat';
import { useParams, useRouter } from 'next/navigation';
// import CircularLoading from '@/components/ui/CircularLoading';
import { StopCircleRounded } from '@mui/icons-material';
import { createChat } from '@/services/chats/chatServices';
import { usePrivy } from '@privy-io/react-auth';

const MessageInput: React.FC = () => {
    const theme = useTheme();
    const router = useRouter();

    const { getAccessToken } = usePrivy();
    const { id } = useParams();

    const { chatId, isLoading, isResponseLoading, isError, sendMessage, stop } = useChat();

    const [input, setInput] = useState<string>('');

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        if (id !== chatId) {
            const token = await getAccessToken();
            await createChat(chatId, token!);
            router.push(`/chat/${chatId}`);
        }
        sendMessage(input);

        setInput('');
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
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
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
                    disabled={isLoading || isResponseLoading}
                />
                <IconButton
                    onClick={() => (isLoading ? stop() : handleSubmit())}
                    disabled={input.length === 0 && !isLoading}
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
                        <StopCircleRounded />
                    ) : (
                        <FaArrowUp style={{ fontSize: theme.typography.fontSize * 1.4 }} />
                    )}
                </IconButton>
            </Box>
            {isError && <Box sx={{ color: 'error.main', mt: 1 }}>An error occured. Please try again.</Box>}
        </Box>
    );
};

export default MessageInput;
