import { Connection } from '@solana/web3.js';
import { BaseAction, BaseActionResult, BaseActionSchemaAny } from '../../base-action';

export type SolanaActionSchemaAny = BaseActionSchemaAny;
export type SolanaActionResult<TBody> = BaseActionResult<TBody>;

/**
 * Represents the structure for Solana Actions.
 */
export interface SolanaAction<TActionSchema extends SolanaActionSchemaAny, TBody>
    extends BaseAction<TActionSchema, TBody, Connection> {}
