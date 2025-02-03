'use client';

import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Drawer,
    Container,
    useTheme,
    List,
    Typography,
    ListItemText,
    ListItemButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { HiMenuAlt3 } from 'react-icons/hi';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import Image from 'next/image';
import { ThemeMode, useThemeMode } from '../_contexts/theme';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

// interface HeaderProps {}

const Header: React.FC<object> = ({}) => {
    const router = useRouter();
    const theme = useTheme();
    const { mode } = useThemeMode();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen((prev) => !prev);
    };

    const handleNavigate = (path: string) => {
        router.push(path);
        setDrawerOpen(false);
    };

    return (
        <AppBar position="sticky" color="transparent" elevation={0}>
            <Container maxWidth="lg" sx={{ mt: 2 }}>
                <Toolbar
                    sx={{
                        p: 1,
                        px: 4,
                        borderRadius: 8,
                        justifyContent: 'space-between',
                        background: theme.palette.background.paper,
                    }}
                    disableGutters
                >
                    {/* Left: Logo */}
                    <Box display="flex" alignItems="center" gap={2}>
                        <Image
                            src={mode === ThemeMode.DARK ? '/logos/hashley-dark.svg' : '/logos/hashley.svg'}
                            alt="hashley logo"
                            width={120}
                            height={60}
                            style={{ objectFit: 'contain' }}
                        />
                    </Box>

                    {/* Right: Desktop Menu */}
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <ThemeSwitcher />
                        <Button onClick={() => handleNavigate('/chat')}>Get Started</Button>
                    </Box>

                    {/* Mobile Menu Icon */}
                    <Box
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <ThemeSwitcher />
                        <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                            <HiMenuAlt3 style={{ fontSize: theme.typography.fontSize * 1.4 }} />
                        </IconButton>
                    </Box>

                    {/* Drawer for Mobile Menu */}
                    <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
                        <Box
                            sx={{ width: 250 }}
                            role="presentation"
                            // onClick={handleDrawerToggle}
                            onKeyDown={handleDrawerToggle}
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
                                <Typography variant="h3" sx={{ fontSize: '20px' }}>
                                    HashLEY
                                </Typography>
                                <Box>
                                    <ThemeSwitcher />
                                    <IconButton size="small" onClick={handleDrawerToggle}>
                                        <CloseIcon sx={{ fontSize: theme.typography.fontSize * 1.4 }} />
                                    </IconButton>
                                </Box>
                            </Box>
                            <List>
                                <ListItemButton
                                    sx={{ cursor: 'pointer', gap: 1 }}
                                    onClick={() => handleNavigate('/chat')}
                                >
                                    <ListItemText primary={'Get Started'} />
                                </ListItemButton>
                            </List>
                        </Box>
                    </Drawer>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
