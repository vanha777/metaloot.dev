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
        name: 'Bravery Medal #1347',
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
        // const checkAndConnectWallet = async () => {
        //     const address = await connectWallet();
        //     if (address) {
        //         setUser({
        //             publicKey: address.publicKey,
        //             mtl: address.mtl
        //         });
        //     }
        // }
        // checkAndConnectWallet();
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // useEffect(() => {
    //     console.log("publicKey is ", publicKey);
      
    //     if (publicKey) {
    //       // Define an async function to fetch the token balance
    //       const fetchTokenBalance = async () => {
    //         try {
    //           // Connection to the Solana testnet
    //           const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
    //           const ownerPublicKey = new PublicKey(publicKey.toBase58());
    //           const mintPublicKey = new PublicKey(TOKEN_MINT_ADDRESS);
      
    //           // Fetch all token accounts owned by the wallet
    //           const tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerPublicKey, {
    //             mint: mintPublicKey,
    //           });
      
    //           // Sum up balances from all accounts holding the specified token
    //           const tokenBalance = tokenAccounts.value.reduce((sum, accountInfo) => {
    //             const amount = accountInfo.account.data.parsed.info.tokenAmount.uiAmount;
    //             return sum + amount;
    //           }, 0);
    //           console.log("tokenBalance is ", tokenBalance);

    //           // Helper function to format decimals
    //           const formatDecimals = (num: number) => {
    //             const decimals = num % 1;
    //             if (decimals === 0) return '';
    //             return decimals.toFixed(9).substring(1);
    //           };

    //           // Format balance with appropriate units
    //           const millions = Math.floor(tokenBalance / 1000000);
    //           const thousands = Math.floor((tokenBalance % 1000000) / 1000);
    //           const ones = Math.floor(tokenBalance % 1000);
    //           const decimals = formatDecimals(tokenBalance);

    //           let formattedBalance = '';
              
    //           if (millions > 0) {
    //             formattedBalance += `${millions} Million `;
    //           }
    //           if (thousands > 0) {
    //             formattedBalance += `${thousands} Thousand `;
    //           }
    //           if (ones > 0) {
    //             formattedBalance += ones;
    //           }
              
    //           // Add decimals if they exist
    //           if (decimals) {
    //             formattedBalance += decimals;
    //           }

    //           // Handle case where balance is 0
    //           if (formattedBalance === '') {
    //             formattedBalance = '0';
    //           }

    //           return formattedBalance.trim();
    //         } catch (error) {
    //           console.error("Failed to fetch token balance:", error);
    //           return "0";
    //         }
    //       };
      
    //       // Call the async function
    //       fetchTokenBalance().then((mtl) => {
    //         console.log("mtl is ", mtl);
    //         setMtl(mtl);
    //       });
    //     } else {
    //         setMtl("~");
    //       }
    //   }, [publicKey]); // Add dependencies

    // useEffect(() => {
    //     // Simulating fetching wallet data
    //     const fetchWalletData = async () => {
    //         // This would normally come from your wallet connection
    //         setWalletAddress('0x1234567890abcdef')
    //         setMtlBalance(1000)
    //     }

    //     fetchWalletData()
    // }, [])

    return (
        <div className="p-6 space-y-8">
            {/* MTL Card Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative h-72 w-full max-w-3xl mx-auto rounded-[3rem] overflow-hidden backdrop-blur-sm
                          border-4 border-[#0CC0DF] text-white shadow-lg shadow-[#0CC0DF]/30"
            >
                <div className="absolute inset-0">
                    {/* Background gradient */}
                    <div className="absolute w-full h-full bg-gradient-to-r from-gray-900 to-gray-800 opacity-90" />

                    {/* Grid pattern */}
                    <div className="grid grid-cols-12 gap-4 absolute inset-0 opacity-15">
                        {[...Array(48)].map((_, i) => (
                            <div
                                key={i}
                                className="h-1 bg-white/20 rounded-full"
                            />
                        ))}
                    </div>
                </div>

                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    {/* Card Header */}
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-white text-3xl font-bold">$MTL</h3>
                            <p className="text-white/70 text-lg">MetaLoot Token</p>
                        </div>
                        <img
                            src="/coin.png"
                            alt="MetaLoot Token"
                            className="w-16 h-16 object-contain"
                            style={{
                                filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))"
                            }}
                        />
                    </div>

                    {/* Card Number */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <p className="font-mono text-white text-xl tracking-wider">
                              {publicKey?.toBase58()}
                            </p>
                        </div>

                        {/* Balance and Name */}
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-white/70 text-lg">Balance</p>
                                <p className="text-white text-2xl font-bold">${balance} MTL</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white text-xl font-bold">METALOOT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* NFTs Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Your NFTs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {nfts.map((nft) => (
                        <motion.div
                            key={nft.id}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm 
                         rounded-xl p-4 border border-[#0CC0DF]/20"
                        >
                            <div className="relative h-96 mb-4 rounded-lg overflow-hidden">
                                <Image src={nft.image} alt={nft.name} fill className="object-cover" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{nft.name}</h3>
                            <div className="flex justify-between items-center">
                                <span className="text-[#0CC0DF]">{nft.description}</span>
                                <div className="flex gap-2">
                                    <button className="bg-[#0CC0DF] px-4 py-2 rounded-lg">Trade</button>
                                    <button className="bg-gray-800 px-4 py-2 rounded-lg border border-[#0CC0DF]/20">View</button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
