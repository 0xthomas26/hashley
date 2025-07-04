import { z } from 'zod';

import type { GetTokenDataInputSchema } from './input-schema';
import type { SolanaActionResult } from '../../solana-action';
import { ExtendedTokenMetadataResponse } from '@/services/token/types';

export type GetTokenDataSchemaType = typeof GetTokenDataInputSchema;

export type GetTokenDataArgumentsType = z.infer<GetTokenDataSchemaType>;

export type GetTokenDataResultBodyType = {
    token: ExtendedTokenMetadataResponse | null;
};

export type GetTokenDataResultType = SolanaActionResult<GetTokenDataResultBodyType>;
