'use client';

import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '@/src/theme';

export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark',
    SYSTEM = 'system',
}

interface ThemeContextType {
    mode: ThemeMode;
    setMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
}

export const ThemeContext = createContext<ThemeContextType>({
    mode: ThemeMode.SYSTEM,
    setMode: () => {},
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>(ThemeMode.SYSTEM);

    useEffect(() => {
        const savedMode = localStorage.getItem('theme') as ThemeMode | null;
        if (savedMode) {
            setMode(savedMode);
        } else {
            if (typeof window !== 'undefined') {
                const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? ThemeMode.DARK
                    : ThemeMode.LIGHT;
                setMode(systemPreference);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') localStorage.setItem('theme', mode);
    }, [mode]);

    const theme = mode === ThemeMode.DARK ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ mode, setMode }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeMode = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeMode must be used within a ThemeProvider');
    }
    return context;
};
