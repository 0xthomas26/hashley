import { SOLANA_GET_TRENDING_TOKENS_NAME } from './name';
import { SOLANA_GET_TRENDING_TOKENS_PROMPT } from './prompt';
import { GetTrendingTokensInputSchema } from './input-schema';
import { getTrendingTokens } from './function';

import type { GetTrendingTokensResultBodyType } from './types';
import type { SolanaAction } from '../../solana-action';

export class SolanaGetTrendingTokensAction
    implements SolanaAction<typeof GetTrendingTokensInputSchema, GetTrendingTokensResultBodyType>
{
    public name = SOLANA_GET_TRENDING_TOKENS_NAME;
    public description = SOLANA_GET_TRENDING_TOKENS_PROMPT;
    public argsSchema = GetTrendingTokensInputSchema;
    public func = getTrendingTokens;
}
