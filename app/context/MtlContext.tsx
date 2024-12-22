'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Auth } from '../auth'
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
interface NFT {
    id: string
    name: string
    image: string
    description: string
    price: number
    currency: string
}

interface CryptoRate {
    symbol: string
    name: string
    rate: number // Exchange rate to MTL
}

interface Voucher {
    id: string
    title: string
    discount: string
    validUntil: string
    image: string
    price: number // In MTL
}

interface Game {
    id: string
    title: string
    image: string
    platform: 'desktop' | 'mobile' | 'console'
    rewards: number
    description: string
    link: string
    developer?: string
    publisher?: string
    releaseDate?: string
    genre?: string
    intro?: string
    trailer?: string
    gameplay?: string
    models?: {
        playToEarn?: {
            enabled: boolean
            price?: string
        }
        stakeToEarn?: {
            enabled: boolean
            price?: string
        }
    }
}

interface MTLContextType {
    balance: string
    ownedNFTs: NFT[]
    marketplaceNFTs: NFT[]
    marketplaceVouchers: Voucher[]
    exchangeRates: CryptoRate[]
    games: Game[],
    historyTransactions: Transaction[],
    fetchTokenBalance: () => Promise<void>
    fetchHistoryTransactions: () => Promise<void>
}
interface Transaction {
    gameTitle: string
    gameId: string
    timestamp: number
    status: string
    message: string
}

const MTLContext = createContext<MTLContextType>({
    balance: "",
    ownedNFTs: [],
    marketplaceNFTs: [],
    marketplaceVouchers: [],
    exchangeRates: [],
    games: [],
    historyTransactions: [],
    fetchTokenBalance: async () => { },
    fetchHistoryTransactions: async () => { }
})

const TOKEN_MINT_ADDRESS = "813b3AwivU6uxBicnXdZsCNrfzJy4U3Cr4ejwvH4V1Fz";

export function MTLProvider({ children }: { children: ReactNode }) {
    const { publicKey, connected, signMessage, sendTransaction } = useWallet();
    const [balance, setBalance] = useState("")
    const [historyTransactions, setHistoryTransactions] = useState<Transaction[]>([])
    const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([])
    const [marketplaceNFTs, setMarketplaceNFTs] = useState<NFT[]>([])
    const [marketplaceVouchers, setMarketplaceVouchers] = useState<Voucher[]>([])
    const [exchangeRates, setExchangeRates] = useState<CryptoRate[]>([])
    const [games, setGames] = useState<Game[]>([])

    const fetchTokenBalance = async () => {
        const token = await TokenBalance();
        console.log("mtl is ", token);
        setBalance(token);
    }

    const fetchHistoryTransactions = async () => {
        if (!publicKey) {
            localStorage.removeItem('transactions');
            setHistoryTransactions([]);
            return;
        }
        const transactions = localStorage.getItem('transactions');
        const parsedTransactions = transactions ? JSON.parse(transactions) : [];
        setHistoryTransactions(parsedTransactions);
    }

    const TokenBalance = async () => {
        if (publicKey) {
            try {
                // Connection to the Solana testnet
                const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
                const ownerPublicKey = new PublicKey(publicKey.toBase58());
                const mintPublicKey = new PublicKey(TOKEN_MINT_ADDRESS);

                // Fetch all token accounts owned by the wallet
                const tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerPublicKey, {
                    mint: mintPublicKey,
                });

                // Sum up balances from all accounts holding the specified token
                const tokenBalance = tokenAccounts.value.reduce((sum, accountInfo) => {
                    const amount = accountInfo.account.data.parsed.info.tokenAmount.uiAmount;
                    return sum + amount;
                }, 0);
                console.log("tokenBalance is ", tokenBalance);

                // Helper function to format decimals
                const formatDecimals = (num: number) => {
                    const decimals = num % 1;
                    if (decimals === 0) return '';
                    return decimals.toFixed(9).substring(1);
                };

                // Format balance with appropriate units
                const millions = Math.floor(tokenBalance / 1000000);
                const thousands = Math.floor((tokenBalance % 1000000) / 1000);
                const ones = Math.floor(tokenBalance % 1000);
                const decimals = formatDecimals(tokenBalance);

                let formattedBalance = '';

                if (millions > 0) {
                    formattedBalance += `${millions} Million `;
                }
                if (thousands > 0) {
                    formattedBalance += `${thousands} Thousand `;
                }
                if (ones > 0) {
                    formattedBalance += ones;
                }

                // Add decimals if they exist
                if (decimals) {
                    formattedBalance += decimals;
                }

                // Handle case where balance is 0
                if (formattedBalance === '') {
                    formattedBalance = '0';
                }

                return formattedBalance.trim();
            } catch (error) {
                console.error("Failed to fetch token balance:", error);
                return "0";
            }
        }
        else {
            return "~";
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Initial data fetch
                // get MTL token
                const token = await TokenBalance();
                console.log("mtl is ", token);
                setBalance(token);

                // const supabase = Auth
                // const { data: { user } } = await supabase.auth.getUser()

                // if (user) {
                //     // Fetch user's NFTs
                //     const nftResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nfts/${user.id}`)
                //     const nftData = await nftResponse.json()
                //     setOwnedNFTs(nftData)

                //     // Fetch marketplace NFTs
                //     const marketNFTResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/marketplace/nfts`)
                //     const marketNFTData = await marketNFTResponse.json()
                //     setMarketplaceNFTs(marketNFTData)

                //     // Fetch marketplace vouchers
                //     const voucherResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/marketplace/vouchers`)
                //     const voucherData = await voucherResponse.json()
                //     setMarketplaceVouchers(voucherData)

                //     // Fetch exchange rates
                //     const ratesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exchange-rates`)
                //     const ratesData = await ratesResponse.json()
                //     setExchangeRates(ratesData)
                // }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [publicKey])

    return (
        <MTLContext.Provider value={{
            fetchHistoryTransactions,
            fetchTokenBalance,
            balance,
            ownedNFTs,
            marketplaceNFTs,
            marketplaceVouchers,
            exchangeRates,
            games,
            historyTransactions
        }}>
            {children}
        </MTLContext.Provider>
    )
}

export function useMTL() {
    const context = useContext(MTLContext)
    if (!context) {
        throw new Error('useMTL must be used within an MTLProvider')
    }
    return context
}
