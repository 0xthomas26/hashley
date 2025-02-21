import React from 'react';
import { IconButton, Box, Typography } from '@mui/material';
import { useChat } from '../_contexts/chat';
import CloseIcon from '@mui/icons-material/Close';
import { FilePresentOutlined } from '@mui/icons-material';

const FilePreview: React.FC = () => {
    const { files, setFiles } = useChat();

    if (!files || files.length === 0) return null;

    const handleRemoveFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    return (
        <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
            {files.map((file, index) => (
                <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    p={1}
                    border="1px solid #ccc"
                    borderRadius="8px"
                    position="relative"
                >
                    {file.type.startsWith('image/') ? (
                        <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            width={30}
                            height={30}
                            style={{ objectFit: 'cover', borderRadius: '4px' }}
                        />
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <FilePresentOutlined />
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 1 }}>
                                <Typography fontSize="10px" textAlign="center">
                                    {file.name}
                                </Typography>
                                <Typography fontSize="10px" textAlign="center">
                                    {file.name.split('.').pop()?.toUpperCase()}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {/* Remove Button */}
                    <IconButton
                        size="small"
                        onClick={() => handleRemoveFile(index)}
                        sx={{
                            position: 'absolute',
                            top: -5,
                            right: -5,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            color: 'white',
                            width: 16,
                            height: 16,
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                color: 'white',
                            },
                        }}
                    >
                        <CloseIcon sx={{ fontSize: 12 }} />
                    </IconButton>
                </Box>
            ))}
        </Box>
    );
};

export default FilePreview;
