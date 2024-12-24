'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaBitcoin, FaEthereum, FaWallet, FaShoppingCart, FaTicketAlt, FaStore, FaCoins, FaCreditCard } from 'react-icons/fa'
import { SiSolana, SiTether } from 'react-icons/si'
import { Auth } from '../../app/auth'
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useWallet } from "@solana/wallet-adapter-react";
import { useMTL } from '../../app/context/MtlContext'

interface NFT {
    id: string
    name: string
    image: string
    description: string
    price: number
    currency: string
}

interface CryptoAsset {
    symbol: string
    name: string
    balance: number
    price: number
    icon: JSX.Element
}

const nfts: NFT[] = [
    {
        id: '1',
        name: 'Pilot Wave Medal #1347',
        image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/rb_27087.png',
        description: 'Bravery Medal NFT',
        price: 0.5,
        currency: 'ETH'
    }
]

const cryptoAssets: CryptoAsset[] = [
    {
        symbol: 'BTC',
        name: 'Bitcoin',
        balance: 0.25,
        price: 45000,
        icon: <FaBitcoin className="text-[#F7931A]" size={24} />
    },
    {
        symbol: 'ETH',
        name: 'Ethereum',
        balance: 2.5,
        price: 3000,
        icon: <FaEthereum className="text-[#627EEA]" size={24} />
    },
    {
        symbol: 'SOL',
        name: 'Solana',
        balance: 15.0,
        price: 100,
        icon: <SiSolana className="text-[#00FFA3]" size={24} />
    },
    {
        symbol: 'USDT',
        name: 'Tether',
        balance: 1000,
        price: 1,
        icon: <SiTether className="text-[#26A17B]" size={24} />
    }
]

export default function Wallet() {
    const { balance, ownedNFTs, marketplaceNFTs, marketplaceVouchers, exchangeRates, fetchTokenBalance } = useMTL();
    const { publicKey, connected, signMessage, sendTransaction } = useWallet();
    const [isMobile, setIsMobile] = useState(false);
    //Metaloots token mint address
    const TOKEN_MINT_ADDRESS = "813b3AwivU6uxBicnXdZsCNrfzJy4U3Cr4ejwvH4V1Fz";

    const connectWallet = async () => {
        const solana = (window as any).solana;
        if (solana) {
            try {
                const resp = await solana.connect();
                if (resp.publicKey) {
                    const publicKey = resp.publicKey.toString();
                    // Check the user's balance for the specific token
                    const tokenBalance = await getTokenBalance(publicKey, TOKEN_MINT_ADDRESS);
                    return { publicKey, mtl: tokenBalance.toString() };
                }
            } catch (err) {
                console.error("User rejected the request or another error occurred:", err);
            }
        } else {
            console.error("Please install Phantom wallet");
        }
    };

    const getTokenBalance = async (walletAddress: string, tokenMintAddress: string) => {
        try {
            // Use devnet instead of mainnet-beta to avoid 403 errors
            const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
            const ownerPublicKey = new PublicKey(walletAddress);
            const mintPublicKey = new PublicKey(tokenMintAddress);

            // Fetch all token accounts owned by the wallet
            const tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerPublicKey, {
                mint: mintPublicKey,
            });

            // Sum up balances from all accounts holding the specified token
            const tokenBalance = tokenAccounts.value.reduce((sum, accountInfo) => {
                const amount = accountInfo.account.data.parsed.info.tokenAmount.uiAmount;
                return sum + amount;
            }, 0);

            return tokenBalance;
        } catch (error) {
            console.error("Failed to fetch token balance:", error);
            return 0;
        }
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <div className="p-3 md:p-6 space-y-6 md:space-y-8">
            {/* MTL Card Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-2xl mx-auto space-y-3"
            >
                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-2">
                    <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm border border-[#0CC0DF]/30">
                        <FaWallet className="text-[#0CC0DF] text-xl mb-1" />
                        <span className="text-xs text-white">Send</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm border border-[#0CC0DF]/30">
                        <FaCoins className="text-[#0CC0DF] text-xl mb-1" />
                        <span className="text-xs text-white">Receive</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm border border-[#0CC0DF]/30">
                        <FaCreditCard className="text-[#0CC0DF] text-xl mb-1" />
                        <span className="text-xs text-white">Buy</span>
                    </button>
                </div>

                {/* Balance Card */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 border-2 border-[#0CC0DF] shadow-lg shadow-[#0CC0DF]/20">
                    <div className="flex items-center justify-between mb-4">
                        <img
                            src="/coin.png"
                            alt="MTL"
                            className="w-10 h-10 object-contain"
                            style={{
                                filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))"
                            }}
                        />
                        <div className="text-right">
                            <p className="text-xl font-bold text-white">${balance}</p>
                            <p className="text-white/70 text-xs">MTL Balance</p>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <p className="text-white/70 text-xs">Wallet Address</p>
                        <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg">
                            <p className="font-mono text-white text-xs truncate flex-1">
                                {publicKey?.toBase58()}
                            </p>
                            <button 
                                className="p-1.5 hover:bg-[#0CC0DF]/20 rounded-lg transition-colors"
                                onClick={() => navigator.clipboard.writeText(publicKey?.toBase58() || '')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#0CC0DF]" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* NFTs Section */}
            <div>
                <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Your NFTs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {nfts.map((nft) => (
                        <motion.div
                            key={nft.id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm 
                                     rounded-lg md:rounded-xl p-3 md:p-4 border border-[#0CC0DF]/20"
                        >
                            <div className="relative h-64 md:h-96 mb-3 md:mb-4 rounded-lg overflow-hidden">
                                <Image src={nft.image} alt={nft.name} fill className="object-cover" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold mb-2">{nft.name}</h3>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
                                <span className="text-[#0CC0DF] text-sm md:text-base">{nft.description}</span>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <button className="flex-1 md:flex-none bg-[#0CC0DF] px-4 py-2 rounded-lg text-sm md:text-base">Trade</button>
                                    <button className="flex-1 md:flex-none bg-gray-800 px-4 py-2 rounded-lg border border-[#0CC0DF]/20 text-sm md:text-base">View</button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
