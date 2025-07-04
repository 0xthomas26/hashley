'use client';

import React from 'react';
import { Box, IconButton, List, Divider, Typography, ListItemButton, Collapse, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ThemeSwitcher from '../ThemeSwitcher';
import { FiSidebar } from 'react-icons/fi';
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

interface MenuDesktopProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    chats: Chat[] | undefined;
    chatsExpanded: boolean;
    toggleChatsExpanded: () => void;
    handleAddChat: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleDeleteChat: (e: React.MouseEvent<HTMLButtonElement>, chatId: string) => void;
}

const MenuDesktop: React.FC<MenuDesktopProps> = ({
    collapsed,
    setCollapsed,
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

    const toggleCollapse = () => setCollapsed((prev) => !prev);

    const navigateToChat = (chatId: string) => {
        router.push(`/chat/${chatId}`);
    };

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    const navigateToMain = () => {
        router.push('/chat');
        resetChat();
    };

    return (
        <Box
            sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                height: '100vh',
                width: collapsed ? 80 : 250,
                borderRight: '1px solid #ddd',
            }}
        >
            {/* Header for Side Menu */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    borderBottom: '1px solid #ddd',
                    px: 2,
                    py: 2,
                }}
            >
                {!collapsed && (
                    <Box onClick={() => navigateToMain()} sx={{ cursor: 'pointer' }}>
                        <Typography variant="h3" sx={{ display: collapsed ? 'none' : 'block', fontSize: '20px' }}>
                            HashLEY
                        </Typography>
                    </Box>
                )}
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {!collapsed && <ThemeSwitcher />}
                    <IconButton
                        onClick={toggleCollapse}
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontSize: '1rem',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <FiSidebar style={{ fontSize: theme.typography.fontSize * 1.4 }} />
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
                            justifyContent: collapsed ? 'center' : 'space-between',
                            alignItems: 'center',
                            px: 2,
                            py: 1,
                        }}
                        onClick={collapsed ? toggleCollapse : toggleChatsExpanded}
                    >
                        {collapsed && <BsChatLeft style={{ fontSize: theme.typography.fontSize * 1.4 }} />}
                        {!collapsed && (
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                                    <BsChatLeft style={{ fontSize: theme.typography.fontSize * 1.4 }} />
                                    <Typography variant="body1">Chats</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <IconButton size="small" onClick={handleAddChat}>
                                        <AddIcon fontSize="inherit" />
                                    </IconButton>
                                    <IconButton size="small" disableRipple>
                                        {chatsExpanded ? (
                                            <ExpandLessIcon fontSize="inherit" />
                                        ) : (
                                            <ExpandMoreIcon fontSize="inherit" />
                                        )}
                                    </IconButton>
                                </Box>
                            </Box>
                        )}
                    </ListItemButton>
                    {!collapsed && (
                        <Collapse in={chatsExpanded} timeout="auto" unmountOnExit>
                            <List>
                                {chats &&
                                    chats?.map((chat, index) => (
                                        <ListItemButton
                                            key={index}
                                            sx={{
                                                justifyContent: collapsed ? 'center' : 'flex-start',
                                                px: 2,
                                                py: 0.5,
                                            }}
                                            onClick={() => navigateToChat(chat.id)}
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
                    )}
                </Box>
                <ListItemButton
                    sx={{ justifyContent: collapsed ? 'center' : 'flex-start', px: 2 }}
                    onClick={() => router.push('/account')}
                >
                    <ListItemText
                        primary={
                            collapsed ? (
                                <IoPersonOutline style={{ fontSize: theme.typography.fontSize * 1.4 }} />
                            ) : (
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
                            )
                        }
                        sx={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-start' }}
                    />
                </ListItemButton>
            </List>

            {/* Divider at the bottom */}
            <Divider />

            {/* Footer Menu Items */}
            <List>
                <ListItemButton sx={{ px: 2 }} onClick={() => handleLogout()}>
                    <ListItemText
                        primary={
                            collapsed ? (
                                <IoIosLogOut style={{ fontSize: theme.typography.fontSize * 1.4 }} />
                            ) : (
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
                            )
                        }
                        sx={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-start' }}
                    />
                </ListItemButton>
                {/* <ListItemButton sx={{ px: 2 }}>
                    <ListItemText
                        primary={
                            collapsed ? (
                                <FaXTwitter style={{ fontSize: theme.typography.fontSize * 1.4 }} />
                            ) : (
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
                            )
                        }
                        sx={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-start' }}
                    />
                </ListItemButton>
                <ListItemButton sx={{ px: 2 }}>
                    <ListItemText
                        primary={
                            collapsed ? (
                                <FaDiscord style={{ fontSize: theme.typography.fontSize * 1.4 }} />
                            ) : (
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
                            )
                        }
                        sx={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-start' }}
                    />
                </ListItemButton> */}
            </List>
        </Box>
    );
};

export default MenuDesktop;
