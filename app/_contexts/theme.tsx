'use client';

import { createContext, useState, useMemo, useEffect, ReactNode, useContext } from 'react';
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
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('theme') as ThemeMode;
        setMode(savedMode || ThemeMode.SYSTEM);
        setHydrated(true);
    }, []);

    const theme = useMemo(() => {
        if (!hydrated) return lightTheme; // Return a default theme during SSR

        if (mode === ThemeMode.SYSTEM && typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme;
        }
        return mode === ThemeMode.DARK ? darkTheme : lightTheme;
    }, [mode, hydrated]);

    useEffect(() => {
        if (hydrated) {
            localStorage.setItem('theme', mode);
        }
    }, [mode, hydrated]);

    if (!hydrated) {
        // Prevent rendering until hydration is complete
        return null;
    }

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
