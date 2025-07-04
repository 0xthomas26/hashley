import { nFormatter } from '@/lib/utils';
import { ExtendedTokenMetadataResponse } from '../token/types';

const HELIUS_API_KEY = process.env.HELIUS_API_KEY;

/**
 * Fetch token metadata for Solana (using Helius API)
 */
export const fetchTokenMetadataSolana = async (
    contractAddress: string
): Promise<ExtendedTokenMetadataResponse | null> => {
    try {
        const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`, {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getAsset',
                params: { id: contractAddress },
            }),
        });

        if (!response.ok) throw new Error(`Failed on Solana: ${response.statusText}`);

        const data = await response.json();
        const result = data.result;

        const supply = result?.token_info?.supply || null;
        const decimals = result?.token_info?.decimals ?? null;
        const price_per_token = result?.token_info?.price_info?.price_per_token || null;

        const adjustedSupply = supply && decimals ? supply / Math.pow(10, decimals) : null;
        const mkcap = adjustedSupply && price_per_token ? adjustedSupply * price_per_token : null;

        return {
            name: result?.content?.metadata?.name || null,
            symbol: result?.content?.metadata?.symbol || null,
            logo: result?.content?.links?.image || null,
            decimals,
            mkcap: mkcap ? `$${nFormatter(mkcap)}` : null,
            usdPrice: price_per_token,
            chain: 'solana',
        };
    } catch (error: any) {
        console.error(`Error fetching from Solana:`, error?.message);
        return null;
    }
};
