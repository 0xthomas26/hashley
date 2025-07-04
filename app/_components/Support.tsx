'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { ThemeMode, useThemeMode } from '../_contexts/theme';

const Support: React.FC = () => {
    const { mode } = useThemeMode();

    const isThemeDark =
        mode === ThemeMode.DARK ||
        (mode === ThemeMode.SYSTEM &&
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
            ? true
            : false;

    return (
        <Box
            sx={{
                textAlign: 'center',
                borderRadius: 4,
                padding: 2,
                mt: 4,
            }}
        >
            <Typography variant="h6" gutterBottom sx={{}}>
                Supported by
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: { xs: 2, sm: 4, md: 6 },
                    flexWrap: 'wrap',
                    mt: 2,
                }}
            >
                {[
                    {
                        href: 'https://polygon.technology',
                        src: isThemeDark ? '/logos/polygon-white-logo.svg' : '/logos/polygon-logo.png',
                        alt: 'Polygon logo',
                    },
                    {
                        href: 'https://angelhack.com',
                        src: isThemeDark ? '/logos/angelhack-white-logo.png' : '/logos/angelhack-logo.svg',
                        alt: 'AngelHack logo',
                    },
                ].map((logo) => (
                    <Box
                        key={logo.href}
                        component="a"
                        href={logo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'scale(1.1)' },
                            display: 'inline-block',
                        }}
                    >
                        <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={200}
                            height={0}
                            style={{
                                minWidth: '100%',
                                maxWidth: '200px', // Control max size
                                height: 'auto',
                            }}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Support;
