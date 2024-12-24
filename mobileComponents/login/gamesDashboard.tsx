'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaDesktop, FaMobile, FaGamepad, FaGlobe, FaTimes, FaSearch } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Details from './details'
import { transferSplToken } from "../../app/utilities/transfer";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { Game, useMTL } from '../../app/context/MtlContext'

const platformIcons = {
    all: <FaGlobe size={32} />,
    arcade: <FaDesktop size={32} />,
    rpg: <FaMobile size={32} />,
    indie: <FaMobile size={32} />,
    card: <FaGamepad size={32} />
}

export default function GamesDashboard() {
    const {
        balance,
        ownedNFTs,
        marketplaceNFTs,
        marketplaceVouchers,
        exchangeRates,
        games,
        fetchTokenBalance,
        fetchHistoryTransactions,
        fetchGames,
    } = useMTL()
    const TOKEN_MINT_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_MINT_ADDRESS || "813b3AwivU6uxBicnXdZsCNrfzJy4U3Cr4ejwvH4V1Fz";
    const { publicKey, connected, signMessage, sendTransaction } = useWallet();
    const [selectedGenre, setSelectedGenre] = useState<'arcade' | 'rpg' | 'indie' | 'card' | 'all'>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [focusedGame, setFocusedGame] = useState<Game | null>(null)
    const [filteredGames, setFilteredGames] = useState<Game[]>(games)
    const [showModal, setShowModal] = useState(false)
    const [transferStatus, setTransferStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [transferMessage, setTransferMessage] = useState('')

    useEffect(() => {
        fetchGames();
    }, [])

    useEffect(() => {
        let filtered = games
        if (selectedGenre !== 'all') {
            filtered = filtered.filter(game => game.genre === selectedGenre)
        }
        if (searchQuery) {
            filtered = filtered.filter(game =>
                game.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }
        setFilteredGames(filtered)
        setFocusedGame(null)
    }, [selectedGenre, searchQuery, games])

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
            const amount = Math.round(rewarding * 10 ** 9);

            const splSignature = await transferSplToken(
                senderKeypair,
                publicKey.toBase58(),
                TOKEN_MINT_ADDRESS,
                amount
            );

            setTransferStatus('success')
            setTransferMessage(splSignature.toString())
            fetchTokenBalance();
            saveLocalStorage(focusedGame!, 'success', `${amount / 10 ** 9} MTL tokens claimed successfully`);

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
        <div className="px-4">
            {/* Platform Filter and Search */}
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex gap-4 p-4 overflow-x-auto">
                    {Object.entries(platformIcons).map(([genre, icon]) => (
                        <motion.button
                            key={genre}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedGenre(genre as 'arcade' | 'rpg' | 'indie' | 'card' | 'all')}
                            className={`px-6 py-4 rounded-[3rem] backdrop-blur-sm relative flex-shrink-0
                                ${selectedGenre === genre
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
                    <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Game Grid/Carousel */}
            <div className="relative">
                <motion.div
                    className="grid grid-cols-1 gap-4 px-4 overflow-x-auto pb-8"
                >
                    {filteredGames.map((game) => (
                        <motion.div
                            key={game.id}
                            className="relative flex-shrink-0 cursor-pointer transition-all duration-300"
                            onClick={() => onGameFocus(game)}
                            layout
                        >
                            {focusedGame?.id === game.id ? (
                                <div className="w-full overflow-x-auto scrollbar-hide h-[400px]">
                                    <div className="flex snap-x snap-mandatory">
                                        {/* Main Game Card */}
                                        <div className="snap-center flex-shrink-0 w-full">
                                            <div className={`relative h-[400px] rounded-2xl overflow-hidden 
                                                bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm
                                                border ${game.rank <= 3 ?
                                                    game.rank === 1 ? 'border-yellow-400' :
                                                        game.rank === 2 ? 'border-gray-400' :
                                                            'border-amber-700' :
                                                    'border-[#0CC0DF]/20'}`}>
                                                <Image
                                                    src={game.image}
                                                    alt={game.title}
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

                                                <div className="absolute bottom-0 w-full p-4">
                                                    <motion.button
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => onGetRewards(game)}
                                                        className="w-full bg-[#0CC0DF] hover:bg-[#0AA0BF] text-white 
                                                            font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3
                                                            shadow-lg shadow-[#0CC0DF]/30 text-base"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                        </svg>
                                                        Play to Earn
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Game Analytics Card */}
                                        <div className="snap-center flex-shrink-0 w-full">
                                            <div className={`relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 backdrop-blur-md border-2 ${game.rank <= 3 ?
                                                game.rank === 1 ? 'border-yellow-400' :
                                                    game.rank === 2 ? 'border-gray-400' :
                                                        'border-amber-700' :
                                                'border-[#0CC0DF]/20'} p-6`}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0CC0DF]" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                                    </svg>
                                                    <h3 className="text-white text-lg font-bold">Game Stats</h3>
                                                </div>
                                                <div className="border-b border-[#0CC0DF]/30 mb-2"></div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {game.models?.playToEarn?.enabled && (
                                                        <motion.div
                                                            whileHover={{ scale: 1.02 }}
                                                            className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-3 rounded-xl shadow-lg"
                                                        >
                                                            <motion.div
                                                                className="absolute inset-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                                animate={{
                                                                    x: [-200, 400],
                                                                }}
                                                                transition={{
                                                                    duration: 2,
                                                                    ease: "linear",
                                                                    repeat: Infinity,
                                                                }}
                                                            />
                                                            <div className="flex flex-col gap-1">
                                                                <div className="flex items-center space-x-1">
                                                                    <span className="text-white font-bold text-sm">Play to Earn</span>
                                                                    <span className="text-yellow-200">🔥</span>
                                                                </div>
                                                                <div className="text-white font-bold text-lg">
                                                                    {game.models.playToEarn.price} MTL
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                    {game.models?.stakeToEarn?.enabled && (
                                                        <motion.div
                                                            whileHover={{ scale: 1.02 }}
                                                            className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 p-3 rounded-xl shadow-lg"
                                                        >
                                                            <motion.div
                                                                className="absolute inset-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                                animate={{
                                                                    x: [-200, 400],
                                                                }}
                                                                transition={{
                                                                    duration: 2,
                                                                    ease: "linear",
                                                                    repeat: Infinity,
                                                                }}
                                                            />
                                                            <div className="flex flex-col gap-1">
                                                                <div className="flex items-center space-x-1">
                                                                    <span className="text-white font-bold text-sm">Stake to Earn</span>
                                                                    <span className="text-purple-200">💎</span>
                                                                </div>
                                                                <div className="text-white font-bold text-lg">
                                                                    {game.models.stakeToEarn.price} APR
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                    <motion.div
                                                        whileHover={{ scale: 1.02 }}
                                                        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 p-3 rounded-xl shadow-lg"
                                                    >
                                                        <motion.div
                                                            className="absolute inset-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                            animate={{
                                                                x: [-200, 400],
                                                            }}
                                                            transition={{
                                                                duration: 2,
                                                                ease: "linear",
                                                                repeat: Infinity,
                                                            }}
                                                        />
                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex items-center space-x-1">
                                                                <span className="text-white font-bold text-sm">Times Played</span>
                                                                <span className="text-blue-200">🎮</span>
                                                            </div>
                                                            <div className="text-white font-bold text-lg">
                                                                {game.played}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                    <motion.div
                                                        whileHover={{ scale: 1.02 }}
                                                        className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-3 rounded-xl shadow-lg"
                                                    >
                                                        <motion.div
                                                            className="absolute inset-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                            animate={{
                                                                x: [-200, 400],
                                                            }}
                                                            transition={{
                                                                duration: 2,
                                                                ease: "linear",
                                                                repeat: Infinity,
                                                            }}
                                                        />
                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex items-center space-x-1">
                                                                <span className="text-white font-bold text-sm">Total Rewards</span>
                                                                <span className="text-green-200">💰</span>
                                                            </div>
                                                            <div className="text-white font-bold text-lg">
                                                                {game.rewarded} MTL
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Trailer Card */}
                                        <div className="snap-center flex-shrink-0 w-full">
                                            <div className={`relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 backdrop-blur-md border-2 ${game.rank <= 3 ?
                                                game.rank === 1 ? 'border-yellow-400' :
                                                    game.rank === 2 ? 'border-gray-400' :
                                                        'border-amber-700' :
                                                'border-[#0CC0DF]/20'} p-6`}>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0CC0DF]" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                    </svg>
                                                    <h3 className="text-white text-xl font-bold">Official Trailer</h3>
                                                </div>
                                                <div className="aspect-video w-full">
                                                    <iframe
                                                        className="w-full h-full rounded-xl"
                                                        src={game.trailer}
                                                        title={`${game.title} Trailer`}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Gameplay Preview Card */}
                                        <div className="snap-center flex-shrink-0 w-full">
                                            <div className={`relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 backdrop-blur-md border-2 ${game.rank <= 3 ?
                                                game.rank === 1 ? 'border-yellow-400' :
                                                    game.rank === 2 ? 'border-gray-400' :
                                                        'border-amber-700' :
                                                'border-[#0CC0DF]/20'} p-6`}>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0CC0DF]" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M13 6H7v6h6V6z" />
                                                        <path fillRule="evenodd" d="M7 4a1 1 0 00-1 1v10a1 1 0 001 1h6a1 1 0 001-1V5a1 1 0 00-1-1H7zm8 12V4h3a1 1 0 011 1v10a1 1 0 01-1 1h-3zM2 5a1 1 0 011-1h3v12H3a1 1 0 01-1-1V5z" clipRule="evenodd" />
                                                    </svg>
                                                    <h3 className="text-white text-xl font-bold">Gameplay Preview</h3>
                                                </div>
                                                <div className="aspect-video w-full">
                                                    <iframe
                                                        className="w-full h-full rounded-xl"
                                                        src={game.gameplay}
                                                        title={`${game.title} Gameplay`}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Game Info Card */}
                                        <div className="snap-center flex-shrink-0 w-full">
                                            <div className={`relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 backdrop-blur-md border-2 ${game.rank <= 3 ?
                                                game.rank === 1 ? 'border-yellow-400' :
                                                    game.rank === 2 ? 'border-gray-400' :
                                                        'border-amber-700' :
                                                'border-[#0CC0DF]/20'} p-6`}>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0CC0DF]" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                                                    </svg>
                                                    <h3 className="text-white text-xl font-bold">Game Info</h3>
                                                </div>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div>
                                                        <p className="text-[#0CC0DF] text-sm font-medium mb-1">Developer</p>
                                                        <p className="text-white">{game.developer}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[#0CC0DF] text-sm font-medium mb-1">Publisher</p>
                                                        <p className="text-white">{game.publisher}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[#0CC0DF] text-sm font-medium mb-1">Release Date</p>
                                                        <p className="text-white">{game.releaseDate}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[#0CC0DF] text-sm font-medium mb-1">Genre</p>
                                                        <p className="text-white">{game.genre}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ) : (
                                <div className={`relative h-[300px] rounded-2xl overflow-hidden 
                                    bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm
                                    border-2 ${game.rank <= 3 ?
                                        game.rank === 1 ? 'border-yellow-400' :
                                            game.rank === 2 ? 'border-gray-400' :
                                                'border-amber-700' :
                                        'border-[#0CC0DF]/20'}`}>
                                    <Image
                                        src={game.image}
                                        alt={game.title}
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
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Transfer Modal */}
            <input type="checkbox" id="transfer-modal" className="modal-toggle" checked={showModal} onChange={() => setShowModal(!showModal)} />
            <div className="modal backdrop-blur-sm">
                {transferStatus === 'loading' ? (
                    <motion.div
                        className="flex flex-col items-center justify-center p-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <div className="relative">
                            <div className="w-20 h-20 relative">
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
                    <div className="modal-box relative bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#0CC0DF] shadow-xl shadow-[#0CC0DF]/20 rounded-2xl max-w-[95vw] mx-4">
                        <motion.button
                            onClick={() => setShowModal(false)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                            whileHover={{ rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FaTimes size={20} />
                        </motion.button>
                        <h3 className="font-bold text-xl text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#0CC0DF] to-[#0AA0BF]">
                            Claim Your Rewards!
                        </h3>
                        <div className="flex flex-col items-center justify-center p-4">
                            <>
                                {transferStatus === 'success' && (
                                    <motion.div
                                        className="p-4 relative overflow-hidden"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <motion.div
                                            className="flex justify-center mb-6"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring" }}
                                        >
                                            <div className="relative">
                                                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                                                    <svg className="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="none">
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

                                        <div className="max-w-md mx-auto space-y-4">
                                            <div className="text-center">
                                                <h2 className="text-xl font-bold text-white mb-2">Transaction Successful!</h2>
                                                <p className="text-sm text-gray-400">Your swap has been completed</p>
                                            </div>

                                            <div className="bg-gray-800/50 rounded-lg p-3">
                                                <p className="text-xs text-gray-400 mb-1">Transaction ID</p>
                                                <div className="flex items-center gap-2">
                                                    <code className="text-[#0CC0DF] font-mono text-sm">
                                                        {transferMessage.slice(0, 6)}...{transferMessage.slice(-6)}
                                                    </code>
                                                    <button
                                                        className="text-gray-400 hover:text-[#0CC0DF]"
                                                        onClick={() => navigator.clipboard.writeText(transferMessage)}
                                                    >
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                                                <div className="flex gap-2">
                                                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <p className="text-xs text-gray-300">
                                                        Please check your wallet to view your new assets. It may take a few minutes for the transaction to be confirmed on the blockchain.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                {transferStatus === 'error' && (
                                    <motion.div
                                        className="p-4 relative overflow-hidden"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <motion.div
                                            className="flex justify-center mb-6"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring" }}
                                        >
                                            <div className="relative">
                                                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                                                    <svg className="w-10 h-10 text-red-500" viewBox="0 0 24 24" fill="none">
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

                                        <div className="max-w-md mx-auto space-y-4">
                                            <div className="text-center">
                                                <h2 className="text-xl font-bold text-white mb-3">Transaction Failed</h2>
                                                <div className="bg-gray-800/50 p-3 rounded-lg">
                                                    <p className="text-sm text-gray-400 break-words">
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
