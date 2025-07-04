import { SOLANA_GET_TOKEN_DATA_NAME } from './name';
import { SOLANA_GET_TOKEN_DATA_PROMPT } from './prompt';
import { GetTokenDataInputSchema } from './input-schema';

import type { GetTokenDataResultBodyType } from './types';
import type { SolanaAction } from '../../solana-action';
import { getTokenData } from './function';

export class SolanaGetTokenDataAction
    implements SolanaAction<typeof GetTokenDataInputSchema, GetTokenDataResultBodyType>
{
    public name = SOLANA_GET_TOKEN_DATA_NAME;
    public description = SOLANA_GET_TOKEN_DATA_PROMPT;
    public argsSchema = GetTokenDataInputSchema;
    public func = getTokenData;
}
