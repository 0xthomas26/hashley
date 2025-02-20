// theme.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        code?: Palette['background']; // Assuming you want it to be optional
    }
    interface PaletteOptions {
        code?: PaletteOptions['background'];
    }
}

declare module '@mui/material/styles/createPalette' {
    interface TypeBackground {
        code?: string;
    }
}
