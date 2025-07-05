'use client';

import React, { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Typography, CircularProgress, IconButton } from '@mui/material';
import Button from '@/components/ui/Button';
import { useWallets as useEvmWallets } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useSwapQuote } from '@/hooks/useQuote';
import { type Hex } from 'viem';
import Image from 'next/image';

const formatNumberUS = (value: number, decimals: number = 10): string => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals,
    }).format(value);
};

type Token = { symbol: string; address: string; decimals: number; logoURI: string };

const tokensEvm: Token[] = [
    {
        symbol: 'POL',
        address: '0x0000000000000000000000000000000000001010',
        decimals: 18,
        logoURI: 'https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/pol.png',
    },
    {
        symbol: 'WPOL',
        address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
        decimals: 18,
        logoURI: 'https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/pol.png',
    },
    {
        symbol: 'USDC',
        address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
        decimals: 6,
        logoURI: 'https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg',
    },
    {
        symbol: 'WETH',
        address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
        decimals: 18,
        logoURI: 'https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/weth.svg',
    },
    {
        symbol: 'DAI',
        address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        decimals: 18,
        logoURI: 'https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/dai.svg',
    },
];

const SwapComponent: React.FC = () => {
    const [sellToken, setSellToken] = useState<Token>(tokensEvm[0]); // Default USDC
    const [buyToken, setBuyToken] = useState<Token>(tokensEvm[2]); // Default WPOL
    const [amount, setAmount] = useState('');
    const [balance, setBalance] = useState<string>('0');
    const [txHash, setTxHash] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [confirmed, setConfirmed] = useState(false);
    const [loadingTx, setLoadingTx] = useState(false);

    const { wallets } = useEvmWallets();
    const wallet = wallets[0];
    const walletAddress = wallet?.address;

    const { quote, loading: loadingQuote, error: quoteError, fetchQuote } = useSwapQuote(walletAddress);

    useEffect(() => {
        const loadBalance = async () => {
            if (!wallet || !walletAddress) return;

            try {
                const providerRaw = await wallet.getEthereumProvider();
                if (!providerRaw) return;

                const provider = new ethers.BrowserProvider(providerRaw);
                let bal: bigint;

                if (sellToken.symbol === 'POL') {
                    bal = await provider.getBalance(walletAddress);
                    setBalance(ethers.formatUnits(bal, 18));
                } else {
                    const erc20 = new ethers.Contract(
                        sellToken.address,
                        ['function balanceOf(address) view returns (uint256)'],
                        provider
                    );
                    bal = await erc20.balanceOf(walletAddress);
                    setBalance(ethers.formatUnits(bal, sellToken.decimals));
                }
            } catch (err) {
                console.error('Balance load error:', err);
                setBalance('0');
            }
        };

        loadBalance();
    }, [wallet, walletAddress, sellToken.address]); // eslint-disable-line

    const updateQuote = (val: string, sell: Token, buy: Token) => {
        if (walletAddress && val > '0') {
            fetchQuote(val, sell, buy);
            setError(null);
            setConfirmed(false);
            setTxHash(null);
        }
    };

    const handleSwapTokens = () => {
        setAmount('');
        setSellToken(buyToken);
        setBuyToken(sellToken);
        updateQuote('', buyToken, sellToken);
    };

    const handleSetMax = () => {
        setAmount(balance);
        updateQuote(balance, sellToken, buyToken);
    };

    const handleSwap = async () => {
        if (!quote || !wallet) return;
        try {
            setLoadingTx(true);
            setStatusMessage('Preparing swap...');

            const providerRaw = await wallet.getEthereumProvider();
            const provider = new ethers.BrowserProvider(providerRaw);
            const signer = await provider.getSigner();

            const txData: Hex = quote.transaction.data as Hex;
            const owner = await signer.getAddress();

            if (quote.sellToken.toLowerCase() !== '0x0000000000000000000000000000000000001010') {
                // ERC-20 path
                const erc20 = new ethers.Contract(
                    quote.sellToken,
                    [
                        'function allowance(address owner, address spender) view returns (uint256)',
                        'function approve(address spender, uint256 amount) returns (bool)',
                        'function balanceOf(address owner) view returns (uint256)',
                    ],
                    signer
                );

                const allowance = await erc20.allowance(owner, quote.transaction.to);
                console.log('ℹ️ Current allowance:', allowance.toString());

                if (BigInt(allowance) < BigInt(quote.sellAmount)) {
                    setStatusMessage('Requesting token approval...');
                    const approveTx = await erc20.approve(quote.transaction.to, ethers.MaxUint256);
                    console.log('✅ Approval tx submitted:', approveTx.hash);

                    await approveTx.wait();
                    setStatusMessage('Token approved! Proceeding with swap...');
                }
            }

            setStatusMessage('Sending swap transaction...');
            const tx = await signer.sendTransaction({
                to: quote.transaction.to,
                data: txData,
                value: quote.transaction.value ? BigInt(quote.transaction.value) : undefined,
                gasLimit: quote.transaction.gas ? BigInt(quote.transaction.gas) : undefined,
            });

            setTxHash(tx.hash);
            const receipt = await tx.wait();
            if (receipt?.status === 1) {
                setConfirmed(true);
                setStatusMessage('Transaction confirmed! Updating balance...');

                if (quote.sellToken.toLowerCase() === '0x0000000000000000000000000000000000001010') {
                    // POL balance update
                    const bal = await provider.getBalance(owner);
                    const formattedBal = ethers.formatUnits(bal, 18);
                    setBalance(formattedBal);
                    console.log('✅ Updated POL balance:', formattedBal);
                } else {
                    // ERC-20 balance update
                    const erc20 = new ethers.Contract(
                        quote.sellToken,
                        ['function balanceOf(address owner) view returns (uint256)'],
                        provider
                    );
                    const bal = await erc20.balanceOf(owner);
                    const formattedBal = ethers.formatUnits(bal, sellToken.decimals);
                    setBalance(formattedBal);
                    console.log('✅ Updated ERC-20 balance:', formattedBal);
                }

                setStatusMessage('Swap complete!');
            } else {
                setError('Swap failed or reverted');
            }
        } catch (err: any) {
            console.error('Swap failed:', err);
            let message = 'Swap failed';
            if (err.code === 'CALL_EXCEPTION') {
                message = 'Transaction would revert. Possible reason: insufficient balance or invalid data.';
            } else if (err.code === 'ACTION_REJECTED') {
                message = 'Transaction rejected by user.';
            }
            setError(message);
        } finally {
            setLoadingTx(false);
            setStatusMessage(null);
        }
    };

    return (
        <Box
            sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                backgroundColor: (theme) => theme.palette.background.paper,
            }}
        >
            {/* <Typography variant="h6" mb={2}>
                Swap Tokens on Polygon
            </Typography> */}
            <Typography variant="body2" mb={2}>
                Conntected Wallet:{' '}
                <Box component="span" sx={{ fontWeight: 'bold' }}>
                    {walletAddress ? walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4) : 'Not connected'}
                </Box>
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                    select
                    label="From"
                    value={sellToken.symbol}
                    onChange={(e) => {
                        const token = tokensEvm.find((t) => t.symbol === e.target.value)!;
                        setSellToken(token);
                        updateQuote(amount, token, buyToken);
                    }}
                    fullWidth
                >
                    {tokensEvm.map((t) => (
                        <MenuItem key={t.symbol} value={t.symbol}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Image src={t.logoURI} alt={t.symbol} width={20} height={20} />
                                {t.symbol}
                            </Box>
                        </MenuItem>
                    ))}
                </TextField>

                <IconButton onClick={handleSwapTokens}>
                    <SwapHorizIcon />
                </IconButton>

                <TextField
                    select
                    label="To"
                    value={buyToken.symbol}
                    onChange={(e) => {
                        const token = tokensEvm.find((t) => t.symbol === e.target.value)!;
                        setBuyToken(token);
                        updateQuote(amount, sellToken, token);
                    }}
                    fullWidth
                >
                    {tokensEvm.map((t) => (
                        <MenuItem key={t.symbol} value={t.symbol}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Image src={t.logoURI} alt={t.symbol} width={20} height={20} />
                                {t.symbol}
                            </Box>
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => {
                    setAmount(e.target.value);
                    updateQuote(e.target.value, sellToken, buyToken);
                    setError(null);
                }}
                error={
                    !!amount &&
                    BigInt(Math.floor(Number(amount) * Math.pow(10, sellToken.decimals))) >
                        BigInt(Math.floor(Number(balance) * Math.pow(10, sellToken.decimals)))
                }
                helperText={
                    amount &&
                    BigInt(Math.floor(Number(amount) * Math.pow(10, sellToken.decimals))) >
                        BigInt(Math.floor(Number(balance) * Math.pow(10, sellToken.decimals)))
                        ? `Entered amount exceeds your balance of ${formatNumberUS(Number(balance), 6)} ${sellToken.symbol}`
                        : ''
                }
                fullWidth
                sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2">Balance:</Typography>
                <Box
                    onClick={handleSetMax}
                    sx={{ ml: 1, fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    {formatNumberUS(Number(balance), 6)} {sellToken.symbol}
                </Box>
            </Box>
            {loadingQuote && <CircularProgress size={20} sx={{ color: (theme) => theme.palette.text.primary }} />}
            {quote && (
                <Box sx={{ mt: 2, p: 1, border: '1px solid', borderRadius: 1 }}>
                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 'bold' }}>
                        💰 Buy: {(Number(quote.buyAmount) / Math.pow(10, buyToken.decimals)).toFixed(6)}
                        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Image
                                src={buyToken.logoURI}
                                alt={buyToken.symbol}
                                width={20}
                                height={20}
                                style={{ borderRadius: '50%' }}
                            />
                            {buyToken.symbol}
                        </Box>
                    </Typography>
                    <Typography>🛠 Source: {quote.route?.fills?.map((f: any) => f.source).join(', ')}</Typography>
                </Box>
            )}
            {quoteError && <Typography color="error">{quoteError}</Typography>}
            {statusMessage && <Typography>{statusMessage}</Typography>}
            <Button
                onClick={handleSwap}
                disabled={
                    loadingTx ||
                    !quote ||
                    amount < '0' ||
                    (!!amount &&
                        BigInt(Math.floor(Number(amount) * Math.pow(10, sellToken.decimals))) >
                            BigInt(Math.floor(Number(balance) * Math.pow(10, sellToken.decimals))))
                }
                fullWidth
                sx={{ mt: 2 }}
            >
                {loadingTx ? <CircularProgress size={20} sx={{ color: 'inherit' }} /> : 'Swap'}
            </Button>
            {txHash && (
                <Typography>
                    ✅ Tx:{' '}
                    <a href={`https://polygonscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
                        {txHash.slice(0, 6)}...{txHash.slice(-6)}
                    </a>
                </Typography>
            )}
            {confirmed && <Typography color="success.main">🎉 Confirmed!</Typography>}
            {error && <Typography color="error">{error}</Typography>}
        </Box>
    );
};

export default SwapComponent;
