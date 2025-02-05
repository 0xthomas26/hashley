'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Avatar, Tooltip, useTheme, useMediaQuery } from '@mui/material';
import { usePrivy } from '@privy-io/react-auth';
import { formatWalletAddress } from '@/lib/utils';

const AccountInfo: React.FC = () => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    const { user } = usePrivy();

    const [copied, setCopied] = useState(false);

    const handleCopyAddress = async () => {
        const address = user?.wallet?.address || user?.smartWallet?.address || '';
        if (address) {
            await navigator.clipboard.writeText(address);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getAddressDisplay = () => {
        const walletAddress = user?.wallet?.address;
        const smartWalletAddress = user?.smartWallet?.address;

        if (isXs) {
            if (walletAddress) return formatWalletAddress(walletAddress);
            if (smartWalletAddress) return formatWalletAddress(smartWalletAddress);
            return 'No wallet connected';
        } else {
            return walletAddress || smartWalletAddress || 'No wallet connected';
        }
    };

    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar sx={{ width: '70px', height: '70px' }} />
            </Box>
            {user?.createdAt && (
                <Typography variant="body2" sx={{ my: 2 }}>
                    Joined on {new Date(user.createdAt).toLocaleDateString()}
                </Typography>
            )}
            <Typography variant="body2" sx={{ mb: 2 }}>
                User ID: {user?.id?.split(':')[2]}
            </Typography>
            {user?.wallet?.address || user?.smartWallet?.address ? (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Tooltip title={copied ? 'Copied!' : 'Copy'} placement="top">
                        <Button
                            variant="text"
                            onClick={handleCopyAddress}
                            sx={{
                                ml: 2,
                                color: 'text.primary',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                },
                            }}
                        >
                            {getAddressDisplay()}
                        </Button>
                    </Tooltip>
                </Box>
            ) : (
                <Typography variant="body1">No wallet connected</Typography>
            )}
        </Box>
    );
};

export default AccountInfo;
