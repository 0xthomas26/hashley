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
    },
    images: {
        domains: ['coin-images.coingecko.com'],
    },
};

export default nextConfig;
