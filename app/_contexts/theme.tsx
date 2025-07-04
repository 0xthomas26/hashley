'use client';

import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '@/src/theme';
import Cookies from 'js-cookie';

export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark',
    SYSTEM = 'system',
}

interface ThemeContextType {
    mode: ThemeMode;
    setMode: React.Dispatch<React.SetStateAction<ThemeMode | null>>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode | null>(null);

    useEffect(() => {
        const savedMode = Cookies.get('theme') as ThemeMode | undefined;
        if (savedMode) {
            setMode(savedMode);
        } else {
            if (typeof window !== 'undefined') {
                const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? ThemeMode.DARK
                    : ThemeMode.LIGHT;
                setMode(systemPreference);
                Cookies.set('theme', systemPreference, { expires: 365 });
            }
        }
    }, []);

    useEffect(() => {
        if (mode !== null) Cookies.set('theme', mode, { expires: 365 });
    }, [mode]);

    if (mode === null) return null;

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
