'use client';

import React from 'react';
import { Typography, List, ListItem, ListItemText, Box, useTheme, useMediaQuery } from '@mui/material';
import { usePrivy } from '@privy-io/react-auth';
import { formatWalletAddress } from '@/lib/utils';

const ConnectedAccounts: React.FC = () => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    const { user } = usePrivy();

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Connected Accounts
            </Typography>
            <List>
                {user?.linkedAccounts &&
                    user?.linkedAccounts.map((account, index) => {
                        return (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={account?.type}
                                    secondary={
                                        'address' in account
                                            ? isXs && account?.type === 'wallet'
                                                ? formatWalletAddress(account.address)
                                                : account.address
                                            : 'Not Connected'
                                    }
                                />
                            </ListItem>
                        );
                    })}
            </List>
        </Box>
    );
};

export default ConnectedAccounts;
