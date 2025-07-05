'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SwapComponent from './SwapComp';

interface SwapDialogProps {
    open: boolean;
    onClose: () => void;
}

const SwapDialog: React.FC<SwapDialogProps> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 2 } }}>
            <DialogTitle>
                Swap Tokens on Polygon
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <SwapComponent />
            </DialogContent>
        </Dialog>
    );
};

export default SwapDialog;
