'use client';

import React from 'react';
import { CircularProgress, CircularProgressProps } from '@mui/material';

interface CircularLoadingProps extends CircularProgressProps {}

const CircularLoading: React.FC<CircularLoadingProps> = ({ ...props }) => {
    return <CircularProgress {...props} color="inherit" />;
};

export default CircularLoading;
