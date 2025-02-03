'use client';

import { ThemeMode, useThemeMode } from '@/app/_contexts/theme';
import { IconButton, useTheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';

const ThemeSwitcher: React.FC = () => {
    const theme = useTheme();
    const { mode, setMode } = useThemeMode();

    // Toggle between light and dark modes
    const toggleTheme = () => {
        setMode(mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT);
    };

    return (
        <IconButton
            onClick={toggleTheme}
            color="inherit"
            aria-label="Toggle theme"
            sx={{
                transition: 'background-color 0.3s',
                // backgroundColor: mode === ThemeMode.LIGHT ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
            }}
        >
            {mode === ThemeMode.LIGHT ? (
                <LightModeIcon sx={{ fontSize: theme.typography.fontSize * 1.4 }} />
            ) : (
                <DarkModeIcon sx={{ fontSize: theme.typography.fontSize * 1.4 }} />
            )}
        </IconButton>
    );
};

export default ThemeSwitcher;
