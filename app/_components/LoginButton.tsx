'use client';

import React, { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { ButtonProps } from '@mui/material';

interface LoginButtonProps extends ButtonProps {
    text: string;
    loading?: boolean | null;
}

const LoginButton: React.FC<LoginButtonProps> = ({ text, loading, ...props }) => {
    const router = useRouter();
    const { ready, authenticated, login } = usePrivy();

    const disableLogin = !ready || (ready && authenticated);

    useEffect(() => {
        if (authenticated) {
            router.push('/chat');
        }
    }, [authenticated, router]);

    return (
        <Button
            {...props}
            disabled={disableLogin}
            onClick={(e) => {
                e.preventDefault();
                login();
            }}
        >
            {text}
        </Button>
    );
};

export default LoginButton;
