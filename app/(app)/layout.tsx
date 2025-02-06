import React from 'react';

import { ChatProvider } from './chat/_contexts/chat';

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return <ChatProvider>{children}</ChatProvider>;
};

export default Layout;
