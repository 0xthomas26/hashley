export const formatWalletAddress = (address: string | undefined) => {
    return address ? `${address?.slice(0, 4)}...${address.slice(-4)}` : '';
};

export const nFormatter = (num: number) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    if (num < 1000 && num % 1 !== 0) {
        return num.toFixed(2).replace(/\.?0+$/, '');
    }
    return num.toString();
};
