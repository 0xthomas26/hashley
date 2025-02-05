'use client';

import { ThemeProvider } from './theme';
import { CssProvider } from './css';
import { PrivyProvider } from './privy';

interface Props {
    children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
    return (
        <CssProvider>
            <ThemeProvider>
                <PrivyProvider>{children}</PrivyProvider>
            </ThemeProvider>
        </CssProvider>
    );
};

export default Providers;
