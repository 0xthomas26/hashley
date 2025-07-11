import React, { useState } from 'react';
import { Paper, Box, Typography, useTheme } from '@mui/material';
import MessageInput from './MessageInput';
import MenuButton from './MenuButton';
import ModelMenu from './ModelMenu';
import { ThemeMode, useThemeMode } from '@/app/_contexts/theme';
import Attachments from './Attachments';
import FilePreview from './FilePreview';
import CharacterMenu from './CharacterMenu';
import CharacterButton from './CharacterButton';

const ChatInput: React.FC = () => {
    const theme = useTheme();
    const { mode } = useThemeMode();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorElCharacter, setAnchorElCharacter] = useState<null | HTMLElement>(null);

    return (
        <Paper sx={{ width: '100%', px: 2, py: 2, mb: 4, borderRadius: '10px' }} elevation={3}>
            <FilePreview />
            <MessageInput />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 2,
                }}
            >
                <Box>
                    <Attachments />
                    <MenuButton setAnchorEl={setAnchorEl} />
                    <CharacterButton setAnchorEl={setAnchorElCharacter} />
                </Box>
                <ModelMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                <CharacterMenu anchorEl={anchorElCharacter} setAnchorEl={setAnchorElCharacter} />
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
