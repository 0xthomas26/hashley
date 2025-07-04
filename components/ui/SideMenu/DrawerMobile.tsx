'use client';

import React from 'react';
import { Box, IconButton, List, Drawer, Divider, Typography, ListItemButton, Collapse } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ThemeSwitcher from '../ThemeSwitcher';
import { IoIosLogOut } from 'react-icons/io';
import { FaDiscord } from 'react-icons/fa';
import { CiTrash } from 'react-icons/ci';
import { FaXTwitter } from 'react-icons/fa6';
import { BsChatLeft } from 'react-icons/bs';
import { IoPersonOutline } from 'react-icons/io5';
import AddIcon from '@mui/icons-material/Add';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation';
import { usePrivy } from '@privy-io/react-auth';
import { Chat } from '@/types';
import { useChat } from '@/app/(app)/chat/_contexts/chat';

interface DrawerMobileProps {
    drawerOpen: boolean;
    toggleDrawer: () => void;
    chats: Chat[] | undefined;
    chatsExpanded: boolean;
    toggleChatsExpanded: () => void;
    handleAddChat: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleDeleteChat: (e: React.MouseEvent<HTMLButtonElement>, chatId: string) => void;
}

const DrawerMobile: React.FC<DrawerMobileProps> = ({
    drawerOpen,
    toggleDrawer,
    chats,
    chatsExpanded,
    toggleChatsExpanded,
    handleAddChat,
    handleDeleteChat,
}) => {
    const theme = useTheme();
    const router = useRouter();
    const { logout } = usePrivy();
    const { resetChat } = useChat();

    const navigateAccount = () => {
        router.push('/account');
        toggleDrawer();
    };

    const navigateToChat = (e: React.MouseEvent, chatId: string) => {
        router.push(`/chat/${chatId}`);
        toggleDrawer();
    };

    const navigateToMain = () => {
        router.push('/chat');
        toggleDrawer();
        resetChat();
    };

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    return (
        <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
            sx={{ display: { xs: 'block', md: 'none' } }}
            PaperProps={{
                sx: {
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    width: 250,
                },
            }}
        >
            <Box
                sx={{
                    width: 250,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    overflow: 'auto',
                }}
            >
                {/* Header for Side Menu */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid #ddd',
                        px: 2,
                        py: 2,
                    }}
                >
                    <Box onClick={navigateToMain} sx={{ cursor: 'pointer' }}>
                        <Typography variant="h3" sx={{ fontSize: '20px' }}>
                            HashLEY
                        </Typography>
                    </Box>
                    <Box>
                        <ThemeSwitcher />
                        <IconButton size="small" onClick={toggleDrawer}>
                            <CloseIcon sx={{ fontSize: theme.typography.fontSize * 1.4 }} />
                        </IconButton>
                    </Box>
                </Box>

                {/* Menu Items */}
                <List sx={{ flexGrow: 1 }}>
                    {/* Chats Section */}
                    <Box>
                        <ListItemButton
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                px: 2,
                                py: 1,
                            }}
                            onClick={toggleChatsExpanded}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                                <BsChatLeft style={{ fontSize: theme.typography.fontSize * 1.4 }} />
                                <Typography variant="body1">Chats</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IconButton size="small" onClick={handleAddChat}>
                                    <AddIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton size="small">
                                    {chatsExpanded ? (
                                        <ExpandLessIcon fontSize="inherit" />
                                    ) : (
                                        <ExpandMoreIcon fontSize="inherit" />
                                    )}
                                </IconButton>
                            </Box>
                        </ListItemButton>
                        <Collapse in={chatsExpanded} timeout="auto" unmountOnExit>
                            <List>
                                {chats &&
                                    chats?.map((chat, index) => (
                                        <ListItemButton
                                            key={index}
                                            sx={{
                                                justifyContent: 'flex-start',
                                                px: 2,
                                                py: 0.5,
                                            }}
                                            onClick={(e) => navigateToChat(e, chat.id)}
                                        >
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Typography noWrap variant="body2">
                                                    {chat.id}
                                                </Typography>
                                                <IconButton size="small" onClick={(e) => handleDeleteChat(e, chat.id)}>
                                                    <CiTrash />
                                                </IconButton>
                                            </Box>
                                        </ListItemButton>
                                    ))}
                            </List>
                        </Collapse>
                    </Box>
                    <ListItemButton onClick={navigateAccount}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <IoPersonOutline style={{ fontSize: theme.typography.fontSize * 1.4 }} />
                            <Typography variant="body1">Account</Typography>
                        </Box>
                    </ListItemButton>
                </List>

                {/* Divider at the bottom */}
                <Divider />

                {/* Footer Menu Items */}
                <List>
                    <ListItemButton onClick={() => handleLogout()}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <IoIosLogOut style={{ fontSize: theme.typography.fontSize * 1.4 }} />
                            <Typography variant="body1">Logout</Typography>
                        </Box>
                    </ListItemButton>
                    {/* <ListItemButton>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <FaXTwitter style={{ fontSize: theme.typography.fontSize * 1.4 }} />
                            <Typography variant="body1">Follow us</Typography>
                        </Box>
                    </ListItemButton> */}
                    {/* <ListItemButton>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <FaDiscord style={{ fontSize: theme.typography.fontSize * 1.4 }} />
                            <Typography variant="body1">Join Discord</Typography>
                        </Box>
                    </ListItemButton> */}
                </List>
            </Box>
        </Drawer>
    );
};

export default DrawerMobile;
