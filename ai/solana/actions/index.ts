import { SolanaGetTrendingTokensAction } from './market';

import type { SolanaAction, SolanaActionSchemaAny } from './solana-action';

export function getAllSolanaActions(): SolanaAction<SolanaActionSchemaAny, any>[] {
    return [new SolanaGetTrendingTokensAction()];
}

export const SOLANA_ACTIONS = getAllSolanaActions();

export * from './types';
export * from './solana-action';

export * from './market';
export * from './token';
