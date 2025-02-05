import React, { useState } from 'react';
import { Box, IconButton, TextField, useTheme } from '@mui/material';
import { FaArrowUp } from 'react-icons/fa';

interface MessageInputProps {
    selectedModel: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ selectedModel }) => {
    const theme = useTheme();
    const [message, setMessage] = useState<string>('');

    console.log(selectedModel);
    const handleSubmit = () => setMessage('');

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
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
                <FaArrowUp style={{ fontSize: theme.typography.fontSize * 1.4 }} />
            </IconButton>
        </Box>
    );
};

export default MessageInput;
