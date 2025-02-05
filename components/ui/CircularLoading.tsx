'use client';

import React from 'react';
import { CircularProgress, CircularProgressProps } from '@mui/material';

type CircularLoadingProps = CircularProgressProps;

const CircularLoading: React.FC<CircularLoadingProps> = ({ ...props }) => {
    return <CircularProgress {...props} color="inherit" />;
};

export default CircularLoading;
