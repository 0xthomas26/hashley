import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Typography, Link, Box } from '@mui/material';
import CodeSnippet from './CodeSnippet';
import { ThemeMode, useThemeMode } from '@/app/_contexts/theme';

interface MarkdownProps {
    children: string;
    asSpan?: boolean;
}

const Markdown: React.FC<MarkdownProps> = ({ children, asSpan = false }) => {
    const { mode } = useThemeMode();

    const transformedMarkdown = useMemo(() => children, [children]);

    const markdownComponents: any = {
        h1: ({ ...props }) => <Typography variant="h1" component="div" gutterBottom {...props} />,
        h2: ({ ...props }) => <Typography variant="h2" component="div" gutterBottom {...props} />,
        h3: ({ ...props }) => <Typography variant="h3" component="div" gutterBottom {...props} />,
        h4: ({ ...props }) => <Typography variant="h4" component="div" gutterBottom {...props} />,
        h5: ({ ...props }) => <Typography variant="h5" component="div" gutterBottom {...props} />,
        h6: ({ ...props }) => <Typography variant="h6" component="div" gutterBottom {...props} />,
        p: ({ ...props }) =>
            asSpan ? (
                <Box
                    component="span"
                    sx={{
                        p: 0.5,
                        borderRadius: '5px',
                        backgroundColor: mode === ThemeMode.LIGHT ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                    }}
                    {...props}
                />
            ) : (
                <Typography variant="body1" component="div" {...props} />
            ),
        code: ({ inline, children, ...props }: any) => {
            if (inline) {
                return (
                    <Typography component="code" {...props}>
                        {children}
                    </Typography>
                );
            }
            return <CodeSnippet code={String(children)} />;
        },
        a: ({ href, children, ...props }: any) => (
            <Link href={href} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
            </Link>
        ),
        ol: ({ children, ...props }: any) => <ol {...props}>{children}</ol>,
        ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
        li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
        img: ({ src, alt, ...props }: any) => (
            <Box component="img" src={src} alt={alt} sx={{ maxWidth: '100%', height: 'auto' }} {...props} />
        ),
    };

    return <ReactMarkdown components={markdownComponents}>{transformedMarkdown}</ReactMarkdown>;
};

export default Markdown;
