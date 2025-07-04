import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { ToolInvocation } from 'ai';
import Image from 'next/image';
import { ExtendedTokenMetadataResponse } from '@/services/token/types';

interface ToolResult {
    message: string;
    body: {
        token: ExtendedTokenMetadataResponse;
    };
}

export type TokenDataToolInvocation = ToolInvocation & {
    result: ToolResult;
};

interface TokenDataToolProps {
    toolInvocation: TokenDataToolInvocation;
}

const TokenDataTool: React.FC<TokenDataToolProps> = ({ toolInvocation }) => {
    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
                {toolInvocation?.result?.message}
            </Typography>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ mt: 1, gap: 1 }}>
                    {toolInvocation?.result?.body?.token && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 1 }}>
                                {toolInvocation?.result?.body?.token?.logo && (
                                    <Image
                                        src={toolInvocation?.result?.body?.token?.logo}
                                        alt={toolInvocation?.result?.body?.token?.name}
                                        width={25}
                                        height={25}
                                        style={{ borderRadius: '5px' }}
                                    />
                                )}
                                <Typography variant="body1" sx={{ ml: 1 }}>
                                    {`$${toolInvocation?.result?.body?.token?.symbol} - ${toolInvocation?.result?.body?.token?.name}`}
                                </Typography>
                            </Box>
                            <Typography variant="body2">
                                {`Price: $${toolInvocation?.result?.body?.token?.usdPrice}`}
                            </Typography>
                            <Typography variant="body2">
                                {`Mkcap: ${toolInvocation?.result?.body?.token?.mkcap}`}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default TokenDataTool;
