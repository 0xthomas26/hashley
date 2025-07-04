import type { GetTokenDataArgumentsType, GetTokenDataResultBodyType } from './types';
import type { SolanaActionResult } from '../../solana-action';
import { getTokenMetadataByContract } from '@/services/token';

export async function getTokenData(
    args: GetTokenDataArgumentsType
): Promise<SolanaActionResult<GetTokenDataResultBodyType>> {
    try {
        const tokenMetadata = await getTokenMetadataByContract(args.contractAddress);

        return {
            message: `Found $${tokenMetadata?.symbol}:`,
            body: {
                token: tokenMetadata,
            },
        };
    } catch (error) {
        return {
            message: `Error getting trending tokens: ${error}`,
            body: {
                token: null,
            },
        };
    }
}
