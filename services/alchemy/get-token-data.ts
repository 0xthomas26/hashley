import { ethers } from 'ethers';
import { getTokenLogo } from '@/lib/getTokenLogo';
import { ExtendedTokenMetadataResponse } from '../token/types';

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const PROVIDER_URLS: Record<string, string> = {
    'eth-mainnet': `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    'polygon-mainnet': `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    'base-mainnet': `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
};

// ERC-20 Standard ABI
const ERC20_ABI = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function totalSupply() view returns (uint256)',
];

/**
 * Fetch token metadata using RPC (EVM chains)
 */
export const fetchTokenMetadataRPC = async (
    chain: string,
    contractAddress: string
): Promise<ExtendedTokenMetadataResponse | null> => {
    if (!PROVIDER_URLS[chain]) return null;

    try {
        const provider = new ethers.JsonRpcProvider(PROVIDER_URLS[chain]);
        const tokenContract = new ethers.Contract(contractAddress, ERC20_ABI, provider);

        const [name, symbol, decimals, totalSupply] = await Promise.all([
            tokenContract.name(),
            tokenContract.symbol(),
            tokenContract.decimals(),
            tokenContract.totalSupply(),
        ]);

        return {
            name,
            symbol,
            decimals: decimals ? parseInt(decimals.toString()) : null,
            logo: await getTokenLogo(chain, contractAddress),
            mkcap: totalSupply ? totalSupply.toString() : null, // Store total supply for market cap calculation
            usdPrice: null,
            chain: chain,
        };
    } catch (error) {
        console.error(`Error fetching metadata via RPC on ${chain}.`);
        return null;
    }
};

/**
 * Fetch token price from Alchemy API (for Ethereum, Polygon, Base)
 */
export const fetchTokenPriceAlchemy = async (chain: string, contractAddress: string): Promise<number | null> => {
    try {
        const response = await fetch(`https://api.g.alchemy.com/prices/v1/${ALCHEMY_API_KEY}/tokens/by-address`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ addresses: [{ network: chain, address: contractAddress }] }),
        });

        if (!response.ok) throw new Error(`Failed to fetch price on ${chain}`);

        const data = await response.json();
        return data?.data?.[0]?.prices?.[0]?.value ? parseFloat(data.data[0].prices[0].value) : null;
    } catch (error) {
        console.error(`Error fetching price from ${chain}.`);
        return null;
    }
};
