'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaDesktop, FaMobile, FaGamepad, FaGlobe, FaTimes, FaSearchengin } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Details from './details'
import { transferSplToken } from "../../app/utilities/transfer";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { Game, useMTL } from '../../app/context/MtlContext'

const platformIcons = {
    all: <FaGlobe size={64} />,
    desktop: <FaDesktop size={64} />,
    mobile: <FaMobile size={64} />,
    console: <FaGamepad size={64} />
}

export default function GamesDashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const {
        balance,
        ownedNFTs,
        marketplaceNFTs,
        marketplaceVouchers,
        exchangeRates,
        games,
        fetchTokenBalance,
        fetchHistoryTransactions,
        fetchGames
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
        let filtered = games
        if (selectedPlatform !== 'all') {
            filtered = filtered.filter(game => game.platform === selectedPlatform)
        }
        if (searchQuery) {
            filtered = filtered.filter(game =>
                game.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }
        setFilteredGames(filtered)
        setFocusedGame(null)
    }, [selectedPlatform, searchQuery, games])

    useEffect(() => {
        fetchGames();
    }, [])

    const onGameFocus = (game: Game) => {
        setFocusedGame(focusedGame?.id === game.id ? null : game)
    }

    const saveLocalStorage = async (title: string, id: string, status: string, message: string) => {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        transactions.push({
            title: title,
            id: id,
            timestamp: Date.now(),
            status: status,
            message: message
        });
        localStorage.setItem('transactions', JSON.stringify(transactions));
        // refersh read from local storage
        fetchHistoryTransactions();
    }

    const transferMTL = async () => {
        setShowModal(true);
        const rewarding = focusedGame?.models?.playToEarn?.price;
        if (!rewarding) {
            // setTransferStatus('error')
            // setTransferMessage('No reward amount configured for this game')
            return;
        }
        if (!publicKey) {
            setTransferStatus('error')
            setTransferMessage('Wallet not connected')
            return;
        }

        try {
            setTransferStatus('loading')
            setTransferMessage('Authorizing MTL tokens...')

            // Check token transfer history in last 24 hours
            const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
            const tokenMint = new PublicKey(TOKEN_MINT_ADDRESS);
            const destPublicKey = new PublicKey(publicKey);
            console.log('debug 1')
            // Get all token accounts for this wallet
            const tokenAccounts = await connection.getParsedTokenAccountsByOwner(destPublicKey, {
                mint: tokenMint
            });
            console.log('debug 2')

            // Check if token accounts exist before accessing
            if (tokenAccounts.value.length) {
                const tokenAccountAddress = tokenAccounts.value[0].pubkey.toBase58();
                let signatures = await connection.getSignaturesForAddress(
                    new PublicKey(tokenAccountAddress),
                    {
                        limit: 10
                    }
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
                    saveLocalStorage(focusedGame!.name, focusedGame!.id, 'error', 'Daily claim limit reached (10 times per 24 hours)');
                    return;
                }
            }
            //end. 

            const senderKeypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.NEXT_PUBLIC_METALOOT_KEY!)));
            console.log("Sender Keypair:", senderKeypair.publicKey.toBase58());

            const amount = Math.round(rewarding * 10 ** 9);

            const splSignature = await transferSplToken(
                senderKeypair,
                publicKey.toBase58(),
                TOKEN_MINT_ADDRESS,
                amount
            );

            setTransferStatus('success')
            setTransferMessage(splSignature.toString())
            console.log("MTL Token Transaction Signature:", splSignature);
            fetchTokenBalance();
            saveLocalStorage(focusedGame!.name, focusedGame!.id, 'success', `${amount / 10 ** 9} MTL tokens claimed successfully`);
        } catch (error) {
            console.error("Transfer Error:", error);
            setTransferStatus('error')
            setTransferMessage(error instanceof Error ? error.message : 'An unknown error occurred')
            saveLocalStorage(focusedGame!.name, focusedGame!.id, 'error', 'An unknown error occurred');
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
        <>
            {/* Platform Filter and Search */}
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex gap-4 p-4 overflow-x-auto">
                    {Object.entries(platformIcons).map(([platform, icon]) => (
                        <motion.button
                            key={platform}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedPlatform(platform as 'desktop' | 'mobile' | 'console' | 'all')}
                            className={`px-24 py-16 rounded-[3rem] backdrop-blur-sm relative
                            ${selectedPlatform === platform
                                    ? 'border-4 border-[#0CC0DF] text-[#0CC0DF] shadow-lg shadow-[#0CC0DF]/50'
                                    : 'border-2 border-white/50 text-white'} 
                            before:content-[""] before:absolute before:inset-0 before:rounded-[3rem] 
                            before:bg-gradient-to-r before:from-[#0A1628] before:to-[#162A44] before:z-[-1]
                            hover:border-[#0CC0DF]/80 transition-colors duration-300`}
                        >
                            <div className="flex justify-center">
                                {icon}
                            </div>
                        </motion.button>
                    ))}
                </div>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search games..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800/50 border-2 border-[#0CC0DF]/30 rounded-xl
                            focus:outline-none focus:border-[#0CC0DF] text-white placeholder-gray-400
                            transition-colors duration-300"
                    />
                    <FaSearchengin className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Horizontal Game Carousel */}
            <div className="relative">
                <motion.div
                    className="flex space-x-6 px-4 overflow-x-auto pb-8"
                    drag="x"
                    dragConstraints={{ left: -1000, right: 0 }}
                >
                    {filteredGames.map((game) => (
                        <motion.div
                            key={game.id}
                            className={`relative flex-shrink-0 cursor-pointer transition-all duration-300
                         ${focusedGame?.id === game.id ? 'w-[500px] h-[700px]' : 'w-[300px] h-[450px]'}`}
                            onClick={() => onGameFocus(game)}
                            layout
                        >
                            <div className={`relative h-full rounded-2xl overflow-hidden 
                             bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm
                             border ${game.rank <= 3 ?
                                    game.rank === 1 ? 'border-yellow-400' :
                                        game.rank === 2 ? 'border-gray-400' :
                                            'border-amber-700' :
                                    'border-[#0CC0DF]/20'}`}>
                                <Image
                                    src={game.image}
                                    alt={game.name}
                                    fill
                                    className="object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                {game.rank <= 3 && (
                                    <div className="absolute top-4 right-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center
                                            ${game.rank === 1 ? 'bg-yellow-400' :
                                                game.rank === 2 ? 'bg-gray-400' :
                                                    'bg-amber-700'}`}>
                                            <div className="absolute w-full h-full animate-spin-slow">
                                                <div className="w-full h-full rounded-full bg-white opacity-20 blur-sm" />
                                            </div>
                                            <span className="text-white text-xl font-bold relative z-10">
                                                {game.rank === 1 ? '🏆' :
                                                    game.rank === 2 ? '🥈' :
                                                        '🥉'}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="absolute bottom-0 w-full p-8">
                                    {focusedGame?.id === game.id && (
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => onGetRewards(game)}
                                            className="w-full bg-[#0CC0DF] hover:bg-[#0AA0BF] text-white 
                               font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3
                               shadow-lg shadow-[#0CC0DF]/30 text-lg"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
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
            {focusedGame && (
                <Details game={focusedGame} />
            )}

            {/* Transfer Modal */}
            <input type="checkbox" id="transfer-modal" className="modal-toggle" checked={showModal} onChange={() => setShowModal(!showModal)} />
            <div className="modal backdrop-blur-sm">
                {transferStatus === 'loading' ? (
                    <motion.div
                        className="flex flex-col items-center justify-center p-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <div className="relative">
                            <div className="w-24 h-24 relative">
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
                    <div className="modal-box relative bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#0CC0DF] shadow-xl shadow-[#0CC0DF]/20 rounded-2xl">
                        <motion.button
                            onClick={() => setShowModal(false)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
                            whileHover={{ rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FaTimes size={24} />
                        </motion.button>
                        <h3 className="font-bold text-2xl text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#0CC0DF] to-[#0AA0BF]">
                            Claim Your Rewards!
                        </h3>
                        <div className="flex flex-col items-center justify-center p-6">
                            <>
                                {transferStatus === 'success' && (
                                    <motion.div
                                        className="p-8 relative overflow-hidden"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        {/* Success Icon */}
                                        <motion.div
                                            className="flex justify-center mb-8"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring" }}
                                        >
                                            <div className="relative">
                                                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                                                    <svg className="w-12 h-12 text-green-500" viewBox="0 0 24 24" fill="none">
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

                                        {/* Transaction Details */}
                                        <div className="max-w-md mx-auto space-y-6">
                                            <div className="text-center">
                                                <h2 className="text-2xl font-bold text-white mb-2">Transaction Successful!</h2>
                                                <p className="text-gray-400">Your swap has been completed</p>
                                            </div>

                                            {/* Transaction ID */}
                                            <div className="bg-gray-800/50 rounded-lg p-4">
                                                <p className="text-sm text-gray-400 mb-1">Transaction ID</p>
                                                <div className="flex items-center gap-2">
                                                    <code className="text-[#0CC0DF] font-mono">
                                                        {transferMessage.slice(0, 6)}...{transferMessage.slice(-6)}
                                                    </code>
                                                    <button
                                                        className="text-gray-400 hover:text-[#0CC0DF]"
                                                        onClick={() => navigator.clipboard.writeText(transferMessage)}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Wallet Notice */}
                                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                                                <div className="flex gap-3">
                                                    <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <p className="text-sm text-gray-300">
                                                        Please check your wallet to view your new assets. It may take a few minutes for the transaction to be confirmed on the blockchain.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                {transferStatus === 'error' && (
                                    <motion.div
                                        className="p-8 relative overflow-hidden"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        {/* Error Icon */}
                                        <motion.div
                                            className="flex justify-center mb-8"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring" }}
                                        >
                                            <div className="relative">
                                                <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                                                    <svg className="w-12 h-12 text-red-500" viewBox="0 0 24 24" fill="none">
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

                                        {/* Error Details */}
                                        <div className="max-w-md mx-auto space-y-6">
                                            <div className="text-center">
                                                <h2 className="text-2xl font-bold text-white mb-4">Transaction Failed</h2>
                                                <div className="bg-gray-800/50 p-4 rounded-lg">
                                                    <p className="text-gray-400 break-words">
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
        </>
    )
}
