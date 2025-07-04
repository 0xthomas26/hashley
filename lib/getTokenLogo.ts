/**
 * Fetch token logo from TrustWallet assets repo
 */
export const getTokenLogo = async (chain: string, contractAddress: string): Promise<string | null> => {
    const chainMap: Record<string, string> = {
        'eth-mainnet': 'ethereum',
        'polygon-mainnet': 'polygon',
        'base-mainnet': 'base',
    };

    const blockchain = chainMap[chain];
    if (!blockchain) return null;

    const logoUrl = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${blockchain}/assets/${contractAddress}/logo.png`;

    try {
        const response = await fetch(logoUrl, { method: 'HEAD' });
        if (response.ok) return logoUrl;
    } catch {
        console.warn(`Logo not found for ${contractAddress} on ${chain}`);
    }

    return null;
};
