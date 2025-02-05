export const formatWalletAddress = (address: string | undefined) => {
    return address ? `${address?.slice(0, 4)}...${address.slice(-4)}` : '';
};
