'use client';

import { ThemeProvider } from './theme';
import { CssProvider } from './css';

interface Props {
    children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
    return (
        <CssProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </CssProvider>
    );
};

export default Providers;
