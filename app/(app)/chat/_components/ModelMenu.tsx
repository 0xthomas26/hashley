import React from 'react';
import { Menu, MenuItem, Box } from '@mui/material';
import { CheckRounded } from '@mui/icons-material';
import Image from 'next/image';
import { modelLogos, Models } from '@/types';

interface ModelMenuProps {
    selectedModel: string;
    setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
    anchorEl: HTMLElement | null;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const ModelMenu: React.FC<ModelMenuProps> = ({ selectedModel, setSelectedModel, anchorEl, setAnchorEl }) => {
    const handleClose = () => setAnchorEl(null);

    const handleMenuItemClick = (model: string) => {
        setSelectedModel(model);
        setAnchorEl(null);
    };

    return (
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            {Object.values(Models).map((modelValue) => (
                <MenuItem
                    key={modelValue}
                    onClick={() => handleMenuItemClick(modelValue)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        fontSize: '0.8rem',
                        minWidth: '165px',
                        fontWeight: modelValue === selectedModel ? 'bold' : 'normal',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <Image
                            src={modelLogos[modelValue]}
                            width={18}
                            height={18}
                            alt={modelValue}
                            style={{ marginRight: 8 }}
                        />
                        {modelValue}
                    </Box>
                    {modelValue === selectedModel && <CheckRounded sx={{ fontSize: '18px' }} />}
                </MenuItem>
            ))}
        </Menu>
    );
};

export default ModelMenu;
