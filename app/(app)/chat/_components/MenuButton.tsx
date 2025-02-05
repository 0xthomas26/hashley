import React from 'react';
import { Button } from '@mui/material';
import { KeyboardArrowDownRounded } from '@mui/icons-material';
import Image from 'next/image';
import { modelLogos } from '@/types';

interface MenuButtonProps {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    selectedModel: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ setAnchorEl, selectedModel }) => {
    return (
        <Button
            variant="text"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)}
            startIcon={
                <Image
                    src={modelLogos[selectedModel as keyof typeof modelLogos]}
                    width={18}
                    height={18}
                    alt={selectedModel}
                />
            }
            endIcon={<KeyboardArrowDownRounded />}
            sx={{
                color: 'text.primary',
                backgroundColor: 'transparent',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            {selectedModel}
        </Button>
    );
};

export default MenuButton;
