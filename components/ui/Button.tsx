'use client';

import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

interface ButtonProps extends MuiButtonProps {
    loading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, loading, startIcon, endIcon, ...props }) => {
    return (
        <MuiButton
            {...props}
            disabled={loading || props.disabled}
            startIcon={!loading ? startIcon : undefined}
            endIcon={!loading ? endIcon : undefined}
        >
            {loading ? <CircularProgress size={20} color="inherit" /> : children}
        </MuiButton>
    );
};

export default Button;
