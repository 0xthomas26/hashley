import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import { ThemeMode, useThemeMode } from '@/app/_contexts/theme';

const footerButtons = [{ title: 'Trending' }, { title: 'Trade' }, { title: 'Stake' }, { title: 'Knowledge' }];

const FooterButtons: React.FC = () => {
    const { mode } = useThemeMode();
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 2,
                width: '100%',
            }}
        >
            {footerButtons.map((elem, index) => (
                <Card
                    key={index}
                    variant="elevation"
                    sx={{
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: '.3s',
                        '&:hover': {
                            transform: 'scale(1.03)',
                        },
                    }}
                    elevation={3}
                >
                    <CardContent
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                            p: 2,
                        }}
                    >
                        {elem.title}
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default FooterButtons;
