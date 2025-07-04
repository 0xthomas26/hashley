import { fetchTokenMetadataRPC, fetchTokenPriceAlchemy } from '../alchemy';
import { fetchTokenMetadataSolana } from '../helius/get-token-data';
import { ExtendedTokenMetadataResponse } from './types/token-data';
import { nFormatter } from '@/lib/utils';

// Chains to try in order
const CHAINS = ['eth-mainnet', 'polygon-mainnet', 'base-mainnet', 'solana'];

/**
 * Fetches token metadata and price from available sources
 */
export const getTokenMetadataByContract = async (
    contractAddress: string
): Promise<ExtendedTokenMetadataResponse | null> => {
    for (const chain of CHAINS) {
        let tokenMetadata: ExtendedTokenMetadataResponse | null = null;
        let tokenPrice: number | null = null;

        try {
            if (chain === 'solana') {
                tokenMetadata = await fetchTokenMetadataSolana(contractAddress);
                return tokenMetadata;
            } else {
                tokenMetadata = await fetchTokenMetadataRPC(chain, contractAddress);

                if (!tokenMetadata?.name) {
                    console.warn(`RPC metadata not found, skipping ${chain}`);
                    continue;
                }

                tokenPrice = await fetchTokenPriceAlchemy(chain, contractAddress);
                tokenMetadata.usdPrice = tokenPrice ?? null;

                if (tokenMetadata.mkcap && tokenMetadata.decimals !== null && tokenPrice) {
                    const adjustedSupply = parseInt(tokenMetadata.mkcap) / Math.pow(10, tokenMetadata.decimals);
                    tokenMetadata.mkcap = `$${nFormatter(adjustedSupply * tokenPrice)}`;
                }

                return tokenMetadata;
            }
        } catch (error: any) {
            console.error(`Error fetching metadata from ${chain}.`);
        }
    }

    console.error('Token metadata could not be retrieved from any chain.');
    return null;
};
