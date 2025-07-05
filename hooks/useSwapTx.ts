import { useState, useCallback } from 'react';

export const useSwapTx = () => {
    const [swapTx, setSwapTx] = useState<any | null>(null);
    const [loadingSwap, setLoadingSwap] = useState(false);

    const fetchSwapTx = useCallback(
        async (amount: string, sellToken: any, buyToken: any, taker: string, slippage = 1) => {
            if (!amount || isNaN(Number(amount))) {
                setSwapTx(null);
                return;
            }

            if (!('address' in sellToken) || !('address' in buyToken) || !taker) {
                setSwapTx(null);
                return;
            }

            try {
                setLoadingSwap(true);
                const sellAmount = BigInt(Math.floor(Number(amount) * Math.pow(10, sellToken.decimals))).toString();

                const res = await fetch('/api/swap/tx', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        buyToken: buyToken.address,
                        sellToken: sellToken.address,
                        sellAmount,
                        taker,
                        slippage,
                    }),
                });

                const data = await res.json();
                if (res.ok) {
                    setSwapTx(data.data.swapTx); // If you want, also expose data.data.fullSwapData
                } else {
                    console.error('Swap API error:', data);
                    setSwapTx(null);
                }
            } catch (err) {
                console.error('Fetch swap tx failed:', err);
                setSwapTx(null);
            } finally {
                setLoadingSwap(false);
            }
        },
        []
    );

    return { swapTx, loadingSwap, fetchSwapTx };
};
