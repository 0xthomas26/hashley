export const queryCoingecko = async <T>(endpoint: string, params?: Record<string, string | number>): Promise<T> => {
    try {
        const url = new URL(`https://api.coingecko.com/api/v3${endpoint}`);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, String(value));
            });
        }

        const response = await fetch(url.toString(), {
            headers: {
                'x-cg-pro-api-key': process.env.COINGECKO_API_KEY || '',
                accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Coingecko API error: ${response.status}`);
        }

        const data: T = await response.json();

        return data;
    } catch (error) {
        // Log error or rethrow it to be handled by the caller
        console.error('Failed to query Coingecko:', error);
        throw error; // Rethrow if you want the caller to handle the exception
    }
};
