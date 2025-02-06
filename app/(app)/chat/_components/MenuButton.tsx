import React from 'react';
import { Button } from '@mui/material';
import { KeyboardArrowDownRounded } from '@mui/icons-material';
import Image from 'next/image';
import { modelLogos } from '@/types';
import { useChat } from '../_contexts/chat';

interface MenuButtonProps {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const MenuButton: React.FC<MenuButtonProps> = ({ setAnchorEl }) => {
    const { model } = useChat();

    return (
        <Button
            variant="text"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)}
            startIcon={<Image src={modelLogos[model as keyof typeof modelLogos]} width={18} height={18} alt={model} />}
            endIcon={<KeyboardArrowDownRounded />}
            sx={{
                color: 'text.primary',
                backgroundColor: 'transparent',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            {model}
        </Button>
    );
};

export default MenuButton;
