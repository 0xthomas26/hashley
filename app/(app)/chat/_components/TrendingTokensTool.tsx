import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { ToolInvocation } from 'ai';
import Image from 'next/image';
import { nFormatter } from '@/lib/utils';

interface ToolResult {
    message: string;
    body: {
        tokens: Token[];
    };
}

interface Token {
    item: {
        name: string;
        data: {
            price: string;
        };
    };
}

export type TrendingToolInvocation = ToolInvocation & {
    result: ToolResult;
};

interface TrendingTokensToolProps {
    toolInvocation: TrendingToolInvocation;
}

const TrendingTokensTool: React.FC<TrendingTokensToolProps> = ({ toolInvocation }) => {
    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <Typography variant="body1" gutterBottom>
                {toolInvocation?.result?.message}
            </Typography>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ mt: 1, gap: 1 }}>
                    {toolInvocation?.result?.body?.tokens?.map((token: any, tokenIndex: number) => {
                        // Parse out the needed values safely
                        const price = token?.item?.data?.price || 0;
                        const marketCapStr = token?.item?.data?.market_cap || '0';
                        const volumeStr = token?.item?.data?.total_volume || '0';
                        const change24h = token?.item?.data?.price_change_percentage_24h?.usd ?? 0;

                        // Convert from string to number for market cap & volume
                        const marketCapNum = parseFloat(marketCapStr.replace(/[^\d.-]/g, '')) || 0;
                        const volumeNum = parseFloat(volumeStr.replace(/[^\d.-]/g, '')) || 0;

                        // Determine color based on positive or negative
                        const changeColor = change24h >= 0 ? 'green' : 'red';

                        return (
                            <Box
                                key={tokenIndex}
                                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 1, ml: 2 }}
                            >
                                <Typography variant="body1" sx={{ mr: 1 }}>
                                    {tokenIndex + 1}
                                </Typography>

                                {token?.item?.small && (
                                    <Image
                                        src={token?.item?.small}
                                        alt={token?.item?.name}
                                        width={25}
                                        height={25}
                                        style={{ borderRadius: '5px' }}
                                    />
                                )}

                                <Typography variant="body2" sx={{ ml: 1 }}>
                                    {token?.item?.name} - ${price.toFixed(2)} - rank {token?.item?.market_cap_rank} -
                                    Mkcap {nFormatter(marketCapNum)} - change 24hr {/*  Change 24h with color */}
                                    <Box component="span" sx={{ color: changeColor }}>
                                        {change24h >= 0 ? `+${change24h.toFixed(2)}` : change24h.toFixed(2)}%
                                    </Box>{' '}
                                    - volume {nFormatter(volumeNum)}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </Paper>
        </Box>
    );
};

export default TrendingTokensTool;
