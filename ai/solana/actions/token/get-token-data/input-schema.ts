import { z } from 'zod';

export const GetTokenDataInputSchema = z.object({
    contractAddress: z.string().describe('The contract address of a token on EVM or Solana.'),
});
