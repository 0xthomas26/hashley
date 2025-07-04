import React from 'react';
import { Menu, MenuItem, Box } from '@mui/material';
import { CheckRounded } from '@mui/icons-material';
import { useChat } from '../_contexts/chat';
import { personalityStore } from '@/ai/character';

interface CharacterMenuProps {
    anchorEl: HTMLElement | null;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const CharacterMenu: React.FC<CharacterMenuProps> = ({ anchorEl, setAnchorEl }) => {
    const { personalityId, setPersonalityId } = useChat();

    const handleClose = () => setAnchorEl(null);

    const handleMenuItemClick = (personalityId: string) => {
        setPersonalityId(personalityId);
        setAnchorEl(null);
    };

    return (
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
        >
            {personalityStore.map((personality) => (
                <MenuItem
                    key={personality.id}
                    onClick={() => handleMenuItemClick(personality.id)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        fontSize: '0.8rem',
                        minWidth: '165px',
                        fontWeight: personality.id === personalityId ? 'bold' : 'normal',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        {personalityStore.find((char) => char.id === personality.id)?.displayName}
                    </Box>
                    {personality.id === personalityId && <CheckRounded sx={{ fontSize: '18px' }} />}
                </MenuItem>
            ))}
        </Menu>
    );
};

export default CharacterMenu;
