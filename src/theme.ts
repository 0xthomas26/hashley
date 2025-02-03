import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Chakra_Petch, IBM_Plex_Mono } from 'next/font/google';

const chakraPetch = Chakra_Petch({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

const commonTypography = {
    fontFamily: `${chakraPetch.style.fontFamily}, ${ibmPlexMono.style.fontFamily}, sans-serif`,
};

// Define Custom Colors
const customColors = {
    primary: '#97fce4',
    lightBackground: '#DBFBF6',
    darkSecondary: '#284c47',
};

// Create the base light and dark themes
let lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: customColors.primary,
            contrastText: '#000',
        },
        background: {
            default: customColors.lightBackground,
            paper: '#fff',
        },
        text: {
            primary: '#000000',
            secondary: '#555555',
        },
    },
    typography: {
        ...commonTypography,
        h1: {
            fontFamily: chakraPetch.style.fontFamily,
            fontWeight: 600,
            fontSize: '3rem',
            lineHeight: 1.2,
        },
        h2: {
            fontFamily: chakraPetch.style.fontFamily,
            fontWeight: 500,
            fontSize: '2rem',
            lineHeight: 1.3,
        },
        h3: {
            fontFamily: chakraPetch.style.fontFamily,
            fontWeight: 500,
            fontSize: '1.75rem',
            lineHeight: 1.4,
        },
        h4: {
            fontFamily: chakraPetch.style.fontFamily,
            fontWeight: 500,
            fontSize: '1.5rem',
            lineHeight: 1.4,
        },
        h5: {
            fontFamily: chakraPetch.style.fontFamily,
            fontWeight: 500,
            fontSize: '1.25rem',
            lineHeight: 1.5,
        },
        h6: {
            fontFamily: chakraPetch.style.fontFamily,
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body1: {
            fontFamily: ibmPlexMono.style.fontFamily,
            fontSize: '1rem',
        },
        body2: {
            fontFamily: ibmPlexMono.style.fontFamily,
            fontSize: '.8rem',
        },
        button: {
            fontFamily: ibmPlexMono.style.fontFamily,
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 16px',
                    color: '#000',
                    background: customColors.primary,
                    transition: 'all 0.3s ease',
                    fontFamily: ibmPlexMono.style.fontFamily,
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                },
            },
        },
    },
});

let darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: customColors.primary,
            contrastText: '#000',
        },
        background: {
            default: customColors.darkSecondary,
            paper: '#1B2F2A',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#B3B3B3',
        },
    },
    typography: {
        ...commonTypography,
        h1: {
            fontFamily: chakraPetch.style.fontFamily,
            fontWeight: 600,
            fontSize: '3rem',
            lineHeight: 1.2,
        },
        h2: {
            fontFamily: chakraPetch.style.fontFamily,
            fontWeight: 500,
            fontSize: '2rem',
            lineHeight: 1.3,
        },
        h3: {
            fontFamily: chakraPetch.style.fontFamily,
            fontWeight: 500,
            fontSize: '1.75rem',
            lineHeight: 1.4,
        },
        h4: {
            fontFamily: chakraPetch.style.fontFamily,
            fontWeight: 500,
            fontSize: '1.5rem',
            lineHeight: 1.4,
        },
        h5: {
            fontFamily: chakraPetch.style.fontFamily,
            fontWeight: 500,
            fontSize: '1.25rem',
            lineHeight: 1.5,
        },
        h6: {
            fontFamily: chakraPetch.style.fontFamily,
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body1: {
            fontFamily: ibmPlexMono.style.fontFamily,
            fontSize: '1rem',
        },
        body2: {
            fontFamily: ibmPlexMono.style.fontFamily,
            fontSize: '.8rem',
        },
        button: {
            fontFamily: ibmPlexMono.style.fontFamily,
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 16px',
                    color: '#000',
                    background: customColors.primary,
                    transition: 'all 0.3s ease',
                    fontFamily: ibmPlexMono.style.fontFamily,
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                },
            },
        },
    },
});

// Apply responsive font sizes
lightTheme = responsiveFontSizes(lightTheme);
darkTheme = responsiveFontSizes(darkTheme);

export { lightTheme, darkTheme };
