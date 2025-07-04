import { Connection } from '@solana/web3.js';

import { SOLANA_GET_TOKEN_DATA_NAME } from '@/ai/action-names';

import { solanaTool } from '@/ai/solana';
import { SolanaGetTokenDataAction } from '@/ai/solana/actions/token';

export const TOKEN_TOOLS = {
    [`token-${SOLANA_GET_TOKEN_DATA_NAME}`]: solanaTool(
        new SolanaGetTokenDataAction(),
        new Connection(process.env.SOLANA_RPC_URL!)
    ),
};
