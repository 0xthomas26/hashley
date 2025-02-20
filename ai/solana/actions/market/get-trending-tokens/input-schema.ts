import { z } from 'zod';

export const GetTrendingTokensInputSchema = z.object({
    // limit: z.number().default(10).describe('The number of trending tokens to return. Defaults to 10'),
});
