import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    env: {
        PRIVY_APP_ID: process.env.PRIVY_APP_ID,
        PRIVY_APP_SECRET: process.env.PRIVY_APP_SECRET,
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
        OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL,
        SOLANA_RPC_URL: process.env.SOLANA_RPC_URL,
        BIRDEYE_API_KEY: process.env.BIRDEYE_API_KEY,
        GEMINI_API_KEY: process.env.GEMINI_API_KEY,
        COINGECKO_API_KEY: process.env.COINGECKO_API_KEY,
        ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
        HELIUS_API_KEY: process.env.HELIUS_API_KEY,
        MONGODB_URI: process.env.MONGODB_URI,
        MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
        ZEROX_API_KEY: process.env.ZEROX_API_KEY,
    },
    images: {
        domains: [
            'cryptologos.cc',
            'coin-images.coingecko.com',
            'ipfs.io',
            'raw.githubusercontent.com',
            'file.dexlab.space',
        ],
    },
};

export default nextConfig;
