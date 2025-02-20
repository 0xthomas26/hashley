import React, { useMemo, useState } from 'react';
import { Box, Button, Paper, Typography, useTheme } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { styled } from '@mui/material/styles';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import hljs from 'highlight.js';
import { CheckRounded } from '@mui/icons-material';

// Style the paper component for the code block
const StyledPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.code,
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.text.secondary}`,
    borderRadius: '10px',
}));

interface CodeSnippetProps {
    code: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code }) => {
    const theme = useTheme();

    const detectedLanguage = useMemo(() => {
        const result = hljs.highlightAuto(code);
        return result.language;
    }, [code]);

    const [copied, setCopied] = useState(false);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const syntaxStyle = theme.palette.mode === 'dark' ? materialDark : materialLight;

    return (
        <StyledPaper elevation={0} sx={{ my: 1 }}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {detectedLanguage && <Typography variant="body2">{detectedLanguage}</Typography>}
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Button
                        variant="text"
                        sx={{ color: theme.palette.text.primary, background: 'transparent' }}
                        startIcon={
                            copied ? (
                                <CheckRounded sx={{ width: '15px', height: '15px' }} />
                            ) : (
                                <FileCopyOutlinedIcon sx={{ width: '15px', height: '15px' }} />
                            )
                        }
                        onClick={() => copyToClipboard(code)}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </Button>
                </Box>
            </Box>
            <SyntaxHighlighter language={detectedLanguage || 'plaintext'} style={syntaxStyle}>
                {code}
            </SyntaxHighlighter>
        </StyledPaper>
    );
};

export default CodeSnippet;
