import React, { useState, ChangeEvent } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useChat } from '../_contexts/chat';

const Attachments: React.FC = () => {
    const { setFiles, files } = useChat(); // Access current files
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            setFiles(files ? [...files, ...newFiles] : newFiles);
        }
        handleClose();
    };

    return (
        <>
            {/* Attachment Button */}
            <IconButton onClick={handleOpen}>
                <AttachFileIcon />
            </IconButton>

            {/* Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <MenuItem>
                    <label style={{ cursor: 'pointer', width: '100%' }}>
                        Upload from computer
                        <input
                            type="file"
                            multiple
                            accept="image/png, image/jpeg, image/jpg, image/webp, application/pdf"
                            hidden
                            onChange={handleFileChange}
                        />
                    </label>
                </MenuItem>
            </Menu>
        </>
    );
};

export default Attachments;
