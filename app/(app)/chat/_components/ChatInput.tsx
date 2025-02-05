import React, { useState } from 'react';
import { Paper, Box, Typography, useTheme } from '@mui/material';
import MessageInput from './MessageInput';
import MenuButton from './MenuButton';
import ModelMenu from './ModelMenu';
import { Models } from '@/types';
import { ThemeMode, useThemeMode } from '@/app/_contexts/theme';

const ChatInput: React.FC = () => {
    const theme = useTheme();
    const { mode } = useThemeMode();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedModel, setSelectedModel] = useState<string>(Models.OpenAI);

    return (
        <Paper sx={{ width: '100%', px: 2, py: 2, mb: 4, borderRadius: '10px' }} elevation={3}>
            <MessageInput selectedModel={selectedModel} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 2,
                }}
            >
                <MenuButton setAnchorEl={setAnchorEl} selectedModel={selectedModel} />
                <ModelMenu
                    selectedModel={selectedModel}
                    setSelectedModel={setSelectedModel}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                />
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: { xs: 2, md: 0 } }}>
                    Use{' '}
                    <Box
                        component="span"
                        sx={{
                            p: 0.5,
                            borderRadius: '5px',
                            backgroundColor:
                                mode === ThemeMode.LIGHT ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        shift+return
                    </Box>{' '}
                    for new line
                </Typography>
            </Box>
        </Paper>
    );
};

export default ChatInput;
