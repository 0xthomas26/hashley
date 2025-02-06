'use client';

import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { HiMenuAlt2 } from 'react-icons/hi';
import DrawerMobile from './DrawerMobile';
import MenuDesktop from './MenuDesktop';
import { useUserChats } from '@/hooks/useChats';
import { useParams, useRouter } from 'next/navigation';
import { deleteChat } from '@/services/chats/chatServices';
import { getAccessToken } from '@privy-io/react-auth';
import { useChat } from '@/app/(app)/chat/_contexts/chat';

const SideMenu: React.FC<object> = ({}) => {
    const theme = useTheme();
    const router = useRouter();
    const params = useParams();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [chatsExpanded, setChatsExpanded] = useState(true);

    const { chats, mutateChats } = useUserChats();
    const { resetChat } = useChat();

    const toggleDrawer = () => setDrawerOpen((prev) => !prev);

    const toggleChatsExpanded = () => setChatsExpanded((prev) => !prev);

    const handleAddChat = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        router.push('/chat');
        setChatsExpanded(true);
        resetChat();
    };

    const handleDeleteChat = async (e: React.MouseEvent<HTMLButtonElement>, chatId: string) => {
        e.stopPropagation();

        const token = await getAccessToken();
        await deleteChat(chatId, token!);
        mutateChats();

        if (params?.id === chatId) {
            router.push('/chat');
            resetChat();
        }
    };

    return (
        <Box sx={{ position: 'relative' }}>
            {/* Icon to toggle the mobile drawer */}
            <IconButton
                onClick={toggleDrawer}
                sx={{ display: { xs: 'flex', md: 'none' }, position: 'absolute', top: 16, left: 16 }}
            >
                <HiMenuAlt2 style={{ fontSize: theme.typography.fontSize * 1.8 }} />
            </IconButton>

            <DrawerMobile
                drawerOpen={drawerOpen}
                toggleDrawer={toggleDrawer}
                chats={chats}
                chatsExpanded={chatsExpanded}
                toggleChatsExpanded={toggleChatsExpanded}
                handleAddChat={handleAddChat}
                handleDeleteChat={handleDeleteChat}
            />

            <MenuDesktop
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                chats={chats}
                chatsExpanded={chatsExpanded}
                toggleChatsExpanded={toggleChatsExpanded}
                handleAddChat={handleAddChat}
                handleDeleteChat={handleDeleteChat}
            />
        </Box>
    );
};

export default SideMenu;
