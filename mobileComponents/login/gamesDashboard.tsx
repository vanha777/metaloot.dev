'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaDesktop, FaMobile, FaGamepad, FaGlobe, FaTimes } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Details from './details'
import { transferSplToken } from "../../app/utilities/transfer";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMTL } from '../../app/context/MtlContext'
import { useMediaQuery } from 'react-responsive'

interface Game {
    id: string
    title: string
    image: string
    platform: 'desktop' | 'mobile' | 'console'
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

const platformIcons = {
    all: <FaGlobe size={32} />,
    desktop: <FaDesktop size={32} />,
    mobile: <FaMobile size={32} />,
    console: <FaGamepad size={32} />
}

export default function GamesDashboard({ games }: { games: Game[] }) {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    const {
        balance,
        ownedNFTs,
        marketplaceNFTs,
        marketplaceVouchers,
        exchangeRates,
        fetchTokenBalance,
        fetchHistoryTransactions
    } = useMTL()
    const TOKEN_MINT_ADDRESS = "813b3AwivU6uxBicnXdZsCNrfzJy4U3Cr4ejwvH4V1Fz";
    const { publicKey, connected, signMessage, sendTransaction } = useWallet();
    const [selectedPlatform, setSelectedPlatform] = useState<'desktop' | 'mobile' | 'console' | 'all'>('all')
    const [focusedGame, setFocusedGame] = useState<Game | null>(null)
    const [filteredGames, setFilteredGames] = useState<Game[]>(games)
    const [showModal, setShowModal] = useState(false)
    const [transferStatus, setTransferStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [transferMessage, setTransferMessage] = useState('')

    useEffect(() => {
        if (selectedPlatform === 'all') {
            setFilteredGames(games)
        } else {
            setFilteredGames(games.filter(game => game.platform === selectedPlatform))
        }
        setFocusedGame(null)
    }, [selectedPlatform, games])

    const onGameFocus = (game: Game) => {
        setFocusedGame(focusedGame?.id === game.id ? null : game)
    }

    const saveLocalStorage = async (game: Game, status: string, message: string) => {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        transactions.push({
            gameTitle: game.title,
            gameId: game.id,
            timestamp: Date.now(),
            status: status,
            message: message
        });
        localStorage.setItem('transactions', JSON.stringify(transactions));
        fetchHistoryTransactions();
    }

    const transferMTL = async () => {
        setShowModal(true);
        if (!publicKey) {
            setTransferStatus('error')
            setTransferMessage('Wallet not connected')
            return;
        }

        try {
            setTransferStatus('loading')
            setTransferMessage('Authorizing MTL tokens...')

            const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
            const tokenMint = new PublicKey(TOKEN_MINT_ADDRESS);
            const destPublicKey = new PublicKey(publicKey);

            const tokenAccounts = await connection.getParsedTokenAccountsByOwner(destPublicKey, {
                mint: tokenMint
            });

            if (tokenAccounts.value.length) {
                const tokenAccountAddress = tokenAccounts.value[0].pubkey.toBase58();
                let signatures = await connection.getSignaturesForAddress(
                    new PublicKey(tokenAccountAddress),
                    { limit: 10 }
                );
                let receiveCount = 0;
                for (let sig of signatures) {
                    const tx = await connection.getParsedTransaction(sig.signature, {
                        maxSupportedTransactionVersion: 0
                    });
                    if (tx?.blockTime &&
                        (Date.now() / 1000 - tx.blockTime) < 24 * 60 * 60) {
                        receiveCount++;
                    }
                }
                if (receiveCount >= 10) {
                    setTransferStatus('error')
                    setTransferMessage('Daily claim limit reached (10 times per 24 hours)')
                    saveLocalStorage(focusedGame!, 'error', 'Daily claim limit reached (10 times per 24 hours)');
                    return;
                }
            }

            const senderKeypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.NEXT_PUBLIC_METALOOT_KEY!)));
            const amount = Math.round(1000 * 10 ** 9);

            const splSignature = await transferSplToken(
                senderKeypair,
                publicKey.toBase58(),
                TOKEN_MINT_ADDRESS,
                amount
            );

            setTransferStatus('success')
            setTransferMessage(splSignature.toString())
            fetchTokenBalance();
            saveLocalStorage(focusedGame!, 'success', `${amount / 10**9} MTL tokens claimed successfully`);

        } catch (error) {
            console.error("Transfer Error:", error);
            setTransferStatus('error')
            setTransferMessage(error instanceof Error ? error.message : 'An unknown error occurred')
            saveLocalStorage(focusedGame!, 'error', 'An unknown error occurred');
        }
    }

    const redirect = async (link: string) => {
        window.open(link, '_blank')
    }

    const onGetRewards = async (game: Game) => {
        redirect(game.link || '');
        await transferMTL();
    }

    return (
        <div className="px-4 md:px-8">
            {/* Platform Filter */}
            <div className={`flex ${isMobile ? 'gap-4 mb-8 p-4' : 'gap-24 mb-26 p-24'} overflow-x-auto`}>
                {Object.entries(platformIcons).map(([platform, icon]) => (
                    <motion.button
                        key={platform}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPlatform(platform as 'desktop' | 'mobile' | 'console' | 'all')}
                        className={`${isMobile ? 'px-6 py-4' : 'px-24 py-16'} rounded-[3rem] backdrop-blur-sm relative flex-shrink-0
                            ${selectedPlatform === platform
                                ? 'border-4 border-[#0CC0DF] text-[#0CC0DF] shadow-lg shadow-[#0CC0DF]/30'
                                : 'border-2 border-white/30 text-white'} 
                            before:content-[""] before:absolute before:inset-0 before:rounded-[3rem] 
                            before:bg-gradient-to-r before:from-gray-900 before:to-gray-800 before:z-[-1]
                            hover:border-[#0CC0DF]/60 transition-colors duration-300`}
                    >
                        {icon}
                    </motion.button>
                ))}
            </div>

            {/* Game Grid/Carousel */}
            <div className="relative">
                <motion.div
                    className={`${isMobile ? 'grid grid-cols-1 gap-4' : 'flex space-x-6'} px-4 overflow-x-auto pb-8`}
                    drag={isMobile ? undefined : "x"}
                    dragConstraints={isMobile ? undefined : { left: -1000, right: 0 }}
                >
                    {filteredGames.map((game) => (
                        <motion.div
                            key={game.id}
                            className={`relative flex-shrink-0 cursor-pointer transition-all duration-300
                                ${focusedGame?.id === game.id 
                                    ? (isMobile ? 'w-full h-[500px]' : 'w-[500px] h-[700px]') 
                                    : (isMobile ? 'w-full h-[300px]' : 'w-[300px] h-[450px]')}`}
                            onClick={() => onGameFocus(game)}
                            layout
                        >
                            <div className="relative h-full rounded-2xl overflow-hidden 
                                bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm
                                border border-[#0CC0DF]/20">
                                <Image
                                    src={game.image}
                                    alt={game.title}
                                    fill
                                    className="object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-0 w-full p-4 md:p-8">
                                    {focusedGame?.id === game.id && (
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => onGetRewards(game)}
                                            className="w-full bg-[#0CC0DF] hover:bg-[#0AA0BF] text-white 
                                                font-bold py-3 md:py-4 px-4 md:px-6 rounded-xl flex items-center justify-center gap-3
                                                shadow-lg shadow-[#0CC0DF]/30 text-base md:text-lg"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                            </svg>
                                            Play to Earn
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Game Details Section */}
            {/* {focusedGame && (
                <Details focusedGame={focusedGame} />
            )} */}

            {/* Transfer Modal */}
            <input type="checkbox" id="transfer-modal" className="modal-toggle" checked={showModal} onChange={() => setShowModal(!showModal)} />
            <div className="modal backdrop-blur-sm">
                {transferStatus === 'loading' ? (
                    <motion.div
                        className="flex flex-col items-center justify-center p-4 sm:p-6" 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <div className="relative">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 relative">
                                <motion.div
                                    className="absolute inset-0"
                                    animate={{
                                        background: [
                                            "radial-gradient(circle at 30% 30%, #0CC0DF 0%, transparent 70%)",
                                            "radial-gradient(circle at 70% 70%, #0CC0DF 0%, transparent 70%)",
                                            "radial-gradient(circle at 30% 30%, #0CC0DF 0%, transparent 70%)"
                                        ]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-lg overflow-hidden"
                                    style={{ background: "rgba(12, 192, 223, 0.1)" }}
                                >
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-full h-1 bg-[#0CC0DF]/30"
                                            style={{ top: `${i * 25}%` }}
                                            animate={{
                                                x: [-500, 500],
                                                opacity: [0.2, 0.5, 0.2]
                                            }}
                                            transition={{
                                                duration: 2.5,
                                                delay: i * 0.2,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        />
                                    ))}
                                </motion.div>
                                <motion.div
                                    className="absolute inset-4 bg-[#0CC0DF]/10 rounded-full backdrop-blur-sm"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 180, 360],
                                        borderRadius: ["50%", "30%", "50%"]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="modal-box relative bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#0CC0DF] shadow-xl shadow-[#0CC0DF]/20 rounded-2xl max-w-[95vw] sm:max-w-xl mx-4">
                        <motion.button
                            onClick={() => setShowModal(false)}
                            className="absolute right-3 sm:right-4 top-3 sm:top-4 text-gray-400 hover:text-white transition-colors"
                            whileHover={{ rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FaTimes size={20} className="sm:w-6 sm:h-6" />
                        </motion.button>
                        <h3 className="font-bold text-xl sm:text-2xl text-center mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#0CC0DF] to-[#0AA0BF]">
                            Claim Your Rewards!
                        </h3>
                        <div className="flex flex-col items-center justify-center p-4 sm:p-6">
                            <>
                                {transferStatus === 'success' && (
                                    <motion.div
                                        className="p-4 sm:p-8 relative overflow-hidden"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <motion.div
                                            className="flex justify-center mb-6 sm:mb-8"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring" }}
                                        >
                                            <div className="relative">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                                                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" viewBox="0 0 24 24" fill="none">
                                                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <motion.div
                                                    className="absolute inset-0 rounded-full border-2 border-green-500"
                                                    animate={{
                                                        scale: [1, 1.5],
                                                        opacity: [0.5, 0]
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity
                                                    }}
                                                />
                                            </div>
                                        </motion.div>

                                        <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
                                            <div className="text-center">
                                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Transaction Successful!</h2>
                                                <p className="text-sm sm:text-base text-gray-400">Your swap has been completed</p>
                                            </div>

                                            <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
                                                <p className="text-xs sm:text-sm text-gray-400 mb-1">Transaction ID</p>
                                                <div className="flex items-center gap-2">
                                                    <code className="text-[#0CC0DF] font-mono text-sm sm:text-base">
                                                        {transferMessage.slice(0, 6)}...{transferMessage.slice(-6)}
                                                    </code>
                                                    <button
                                                        className="text-gray-400 hover:text-[#0CC0DF]"
                                                        onClick={() => navigator.clipboard.writeText(transferMessage)}
                                                    >
                                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 sm:p-4">
                                                <div className="flex gap-2 sm:gap-3">
                                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <p className="text-xs sm:text-sm text-gray-300">
                                                        Please check your wallet to view your new assets. It may take a few minutes for the transaction to be confirmed on the blockchain.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                {transferStatus === 'error' && (
                                    <motion.div
                                        className="p-4 sm:p-8 relative overflow-hidden"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <motion.div
                                            className="flex justify-center mb-6 sm:mb-8"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring" }}
                                        >
                                            <div className="relative">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                                                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" viewBox="0 0 24 24" fill="none">
                                                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <motion.div
                                                    className="absolute inset-0 rounded-full border-2 border-red-500"
                                                    animate={{
                                                        scale: [1, 1.5],
                                                        opacity: [0.5, 0]
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity
                                                    }}
                                                />
                                            </div>
                                        </motion.div>

                                        <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
                                            <div className="text-center">
                                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Transaction Failed</h2>
                                                <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg">
                                                    <p className="text-sm sm:text-base text-gray-400 break-words">
                                                        Error: {transferMessage}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
