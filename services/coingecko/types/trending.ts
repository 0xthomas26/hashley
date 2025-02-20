export interface CoingeckoAPIResponse {
    coins: Coin[];
    nfts: Nft[];
    categories: Category[];
}

export interface Coin {
    item: {
        id: string;
        coin_id: number;
        name: string;
        symbol: string;
        market_cap_rank: number;
        thumb: string;
        small: string;
        large: string;
        slug: string;
        price_btc: number;
        score: number;
        data: {
            price: number;
            price_btc: string;
            price_change_percentage_24h: { [key: string]: number };
            market_cap: string;
            market_cap_btc: string;
            total_volume: string;
            total_volume_btc: string;
            sparkline: string;
            content: Content | null;
        };
    };
}

interface Nft {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
    nft_contract_id: number;
    native_currency_symbol: string;
    floor_price_in_native_currency: number;
    floor_price_24h_percentage_change: number;
    data: {
        floor_price: string;
        floor_price_in_usd_24h_percentage_change: string;
        h24_volume: string;
        h24_average_sale_price: string;
        sparkline: string;
        content: Content | null;
    };
}

interface Category {
    id: number;
    name: string;
    market_cap_1h_change: number;
    slug: string;
    coins_count: string;
    data: {
        market_cap: number;
        market_cap_btc: number;
        total_volume: number;
        total_volume_btc: number;
        market_cap_change_percentage_24h: { [key: string]: number };
        sparkline: string;
    };
}

interface Content {
    title: string;
    description: string;
}
