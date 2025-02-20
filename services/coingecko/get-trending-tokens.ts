import { queryCoingecko } from './fetch';
import { CoingeckoAPIResponse } from './types/trending';

export const getTrendingTokens = async (offset: number = 0, limit: number = 20): Promise<CoingeckoAPIResponse> => {
    return queryCoingecko<CoingeckoAPIResponse>('/search/trending');
};
