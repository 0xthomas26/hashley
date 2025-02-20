import { Connection } from '@solana/web3.js';

import { SolanaGetTrendingTokensAction } from '@/ai/solana/actions';

import { SOLANA_GET_TRENDING_TOKENS_NAME } from '@/ai/action-names';

import { solanaTool } from '@/ai/solana';

export const MARKET_TOOLS = {
    [`market-${SOLANA_GET_TRENDING_TOKENS_NAME}`]: solanaTool(
        new SolanaGetTrendingTokensAction(),
        new Connection(process.env.SOLANA_RPC_URL!)
    ),
};
