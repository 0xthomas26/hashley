'use client';

import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { HiMenuAlt2 } from 'react-icons/hi';
import DrawerMobile from './DrawerMobile';
import MenuDesktop from './MenuDesktop';

const SideMenu: React.FC<object> = ({}) => {
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [chatsExpanded, setChatsExpanded] = useState(true);
    const [chats, setChats] = useState(['chat1', 'chat2', 'chat3']);

    const toggleDrawer = () => setDrawerOpen((prev) => !prev);

    const toggleChatsExpanded = () => setChatsExpanded((prev) => !prev);

    const handleAddChat = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setChats((prev) => [...prev, `Chat ${prev.length + 1}`]);
        setChatsExpanded(true);
    };

    const handleDeleteChat = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.stopPropagation();
        setChats((prev) => prev.filter((_, i) => i !== index));
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
