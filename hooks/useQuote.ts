'use client';

import { useState, useCallback } from 'react';

type Token = { symbol: string; address: string; decimals: number };

export const useSwapQuote = (walletAddress: string | null) => {
    const [quote, setQuote] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchQuote = useCallback(
        async (amount: string, sellToken: Token, buyToken: Token) => {
            if (!walletAddress) {
                setError('Wallet not connected');
                return;
            }
            if (!amount || isNaN(Number(amount))) {
                setError('Invalid amount');
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const sellAmount = BigInt(Math.floor(Number(amount) * Math.pow(10, sellToken.decimals))).toString();

                const res = await fetch('/api/swap/quote', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        buyToken: buyToken.address,
                        sellToken: sellToken.address,
                        sellAmount,
                        taker: walletAddress,
                    }),
                });

                const data = await res.json();

                if (res.ok) {
                    setQuote(data.data?.swapQuote || null);
                } else {
                    setQuote(null);
                    setError(data.error || 'Failed to fetch quote');
                }
            } catch (err: any) {
                setQuote(null);
                setError(err.message || 'Unexpected error');
            } finally {
                setLoading(false);
            }
        },
        [walletAddress]
    );

    return { quote, loading, error, fetchQuote };
};
