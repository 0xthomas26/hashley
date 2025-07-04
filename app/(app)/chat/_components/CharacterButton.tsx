import React from 'react';
import { Button } from '@mui/material';
import { KeyboardArrowDownRounded } from '@mui/icons-material';
import { useChat } from '../_contexts/chat';
import { personalityStore } from '@/ai/character';

interface CharacterButtonProps {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const CharacterButton: React.FC<CharacterButtonProps> = ({ setAnchorEl }) => {
    const { personalityId } = useChat();

    return (
        <Button
            variant="text"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)}
            endIcon={<KeyboardArrowDownRounded />}
            sx={{
                color: 'text.primary',
                backgroundColor: 'transparent',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            {personalityStore.find((char) => char.id === personalityId)?.displayName}
        </Button>
    );
};

export default CharacterButton;
