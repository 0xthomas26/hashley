import { getTrendingTokens as getTrendingTokensCoingecko } from '@/services/coingecko';

import type { GetTrendingTokensArgumentsType, GetTrendingTokensResultBodyType } from './types';
import type { SolanaActionResult } from '../../solana-action';

export async function getTrendingTokens(
    args: GetTrendingTokensArgumentsType
): Promise<SolanaActionResult<GetTrendingTokensResultBodyType>> {
    try {
        const response = await getTrendingTokensCoingecko();

        return {
            message: `Found ${response.coins.length} trending tokens. The user is shown the tokens, do not list them. Ask the user what they want to do with the coin.`,
            body: {
                tokens: response.coins,
            },
        };
    } catch (error) {
        return {
            message: `Error getting trending tokens: ${error}`,
            body: {
                tokens: [],
            },
        };
    }
}
