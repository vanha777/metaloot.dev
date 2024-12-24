'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Auth } from '../../app/auth'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, PerspectiveCamera } from '@react-three/drei'
import { FaBitcoin, FaEthereum, FaWallet, FaShoppingCart, FaTicketAlt, FaStore, FaCoins, FaTicketAlt as FaTicket } from 'react-icons/fa'
import { SiSolana, SiTether } from 'react-icons/si'
import { GiSpinningSword,GiToken } from "react-icons/gi";
import Modal from './modal'
import { CryptoAsset, NFT, useMTL, Voucher } from '../../app/context/MtlContext'
import { transferSplToken } from "../../app/utilities/transfer";
import { clusterApiUrl, Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'

const nfts: NFT[] = [
    {
        id: '1',
        name: 'Optimus Prime Weapon #1347',
        image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/fantasy-warrior-sword-artwork-2.png',
        description: 'Rare Optimus Prime Weapon NFT',
        price: 600,
        currency: '$MTL'
    },
    {
        id: '2',
        name: 'Cybertron All-spark #1666',
        image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/view-3d-islamic-mecca-cube.png',
        description: 'Rare All-spark cube NFT',
        price: 5000,
        currency: '$MTL'
    },
    {
        id: '3',
        name: 'Cybertron Laser Gun #1686',
        image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/3d-view-powerful-gun.png',
        description: 'Cybertron Laser Gun NFT',
        price: 1200,
        currency: '$MTL'
    }
]

const cryptoAssets: CryptoAsset[] = [
    {
        symbol: 'BTC',
        id: "1",
        name: 'Bitcoin',
        balance: 0.25,
        price: 0.0000065,
        icon: <FaBitcoin className="text-[#F7931A]" size={24} />
    },
    {
        symbol: 'ETH',
        name: 'Ethereum',
        id: "2",
        balance: 2.5,
        price: 0.000085,
        icon: <FaEthereum className="text-[#627EEA]" size={24} />
    },
    {
        symbol: 'SOL',
        name: 'Solana',
        id: "3",
        balance: 15.0,
        price: 0.0025,
        icon: <SiSolana className="text-[#00FFA3]" size={24} />
    },
    {
        symbol: 'USDT',
        id: "4",
        name: 'Tether',
        balance: 1000,
        price: 0.15,
        icon: <SiTether className="text-[#26A17B]" size={20} />
    }
]

const tabIcons = {
    nfts: <GiSpinningSword size={32} />,
    deals: <GiToken size={32} />
}

export default function Marketplace() {
    const { fetchHistoryTransactions } = useMTL();
    const { balance, ownedNFTs, marketplaceNFTs, marketplaceVouchers, exchangeRates, fetchTokenBalance, fetchGiftCards } = useMTL();
    const { publicKey, connected, signMessage, sendTransaction } = useWallet();
    const [selectedTab, setSelectedTab] = useState<'nfts' | 'deals'>('nfts')
    const [showModal, setShowModal] = useState(false)
    const [transferStatus, setTransferStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [transferMessage, setTransferMessage] = useState('')
    const [selectedAssets, setSelectedAssets] = useState<{
        voucher?: Voucher;
        crypto?: CryptoAsset;
        nft?: NFT;
    }>({})

    useEffect(() => {
        console.log("this is vouchers", marketplaceVouchers);
        fetchGiftCards();
        // fetchHistoryTransactions();
    }, [])

    const handleClaim = async (voucher: Voucher) => {
        setSelectedAssets({ voucher })
        setShowModal(true)
        setTransferStatus('loading')
        setTransferMessage('Processing your claim...')

        try {
            setTransferStatus('success')
            setTransferMessage(`Successfully claimed ${voucher.name}!`)
        } catch (error) {
            setTransferStatus('error')
            setTransferMessage('Failed to claim voucher. Please try again.')
        }
        fetchGiftCards();
    }

    const handleCryptoClick = async (crypto: CryptoAsset) => {
        setSelectedAssets({ crypto })
        setShowModal(true)
        setTransferStatus('loading')
        setTransferMessage('Preparing to swap...')

        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            setTransferStatus('success')
            setTransferMessage(`Successfully claimed ${crypto.name}!`)
        } catch (error) {
            setTransferStatus('error')
            setTransferMessage('Failed to claim crypto. Please try again.')
        }
    }

    const handleNFTBuy = async (nft: NFT) => {
        setSelectedAssets({ nft })
        setShowModal(true)
        setTransferStatus('loading')
        setTransferMessage('Processing your purchase...')

        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            setTransferStatus('success')
            setTransferMessage(`Successfully purchased ${nft.name}!`)
        } catch (error) {
            setTransferStatus('error')
            setTransferMessage('Failed to purchase NFT. Please try again.')
        }
    }

    return (
        <>
            {/* Tab Navigation */}
            <div className="flex gap-4 sm:gap-24 mb-6 sm:mb-26 p-4 sm:p-24">
                {(['nfts', 'deals'] as const).map((tab) => (
                    <motion.button
                        key={tab}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTab(tab)}
                        className={`px-6 sm:px-24 py-4 sm:py-16 rounded-2xl sm:rounded-[3rem] backdrop-blur-sm relative flex-1
                ${selectedTab === tab
                                ? 'border-2 sm:border-4 border-[#0CC0DF] text-[#0CC0DF] shadow-lg shadow-[#0CC0DF]/30'
                                : 'border border-white/30 text-white'} 
                before:content-[""] before:absolute before:inset-0 before:rounded-2xl sm:before:rounded-[3rem] 
                before:bg-gradient-to-r before:from-gray-900 before:to-gray-800 before:z-[-1]
                hover:border-[#0CC0DF]/60 transition-colors duration-300`}
                    >
                        <div className="flex justify-center">
                            {tabIcons[tab]}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Content Sections */}
            <div className="flex flex-col gap-8 px-4 sm:px-0">
                {selectedTab === 'nfts' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {nfts.map((nft) => (
                            <motion.div
                                key={nft.id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm 
                                 rounded-xl p-4 border border-[#0CC0DF]/20"
                            >
                                <div className="relative h-48 sm:h-96 mb-4 rounded-lg overflow-hidden">
                                    <Image src={nft.image} alt={nft.name} fill className="object-cover" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold mb-2">{nft.name}</h3>
                                <p className="text-sm sm:text-base text-gray-300 mb-4">{nft.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#0CC0DF] text-sm sm:text-base">{nft.price} {nft.currency}</span>
                                    <button
                                        onClick={() => handleNFTBuy(nft)}
                                        className="bg-[#0CC0DF] px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 text-sm sm:text-base"
                                    >
                                        <FaShoppingCart size={16} />
                                        Buy Now
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {selectedTab === 'deals' && (
                    <>
                        {/* Crypto Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {cryptoAssets.map((asset) => (
                                <motion.div
                                    key={asset.symbol}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => handleCryptoClick(asset)}
                                    className="bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm 
                                     rounded-xl p-4 sm:p-6 border border-[#0CC0DF]/20 cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                                        {asset.icon}
                                        <div>
                                            <h3 className="text-base sm:text-xl font-bold">{asset.name}</h3>
                                            <p className="text-sm text-gray-300">{asset.symbol}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-xs sm:text-sm text-gray-300">Exchange Rate</p>
                                            <p className="text-base sm:text-xl font-bold">1 MTL = <span className="text-[#0CC0DF]">{asset.price} {asset.symbol}</span></p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Vouchers Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {marketplaceVouchers.map((voucher) => (
                                <motion.div
                                    key={voucher.id}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm 
                                 rounded-xl p-4 border border-[#0CC0DF]/20"
                                >
                                    <div className="relative h-48 sm:h-72 mb-4 rounded-lg overflow-hidden">
                                        <Image src={voucher.image} alt={voucher.name} fill className="object-cover" />
                                        <div className="absolute top-2 right-2 bg-[#0CC0DF] px-2 sm:px-3 py-1 rounded-full text-sm">
                                            {voucher.discount} OFF
                                        </div>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-2">{voucher.name}</h3>
                                    <p className="text-sm sm:text-base text-gray-300 mb-4">Valid until: {voucher.validUntil}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#0CC0DF] text-sm sm:text-base">${voucher.price}</span>
                                        <button
                                            onClick={() => handleClaim(voucher)}
                                            className="bg-[#0CC0DF] px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 text-sm sm:text-base"
                                        >
                                            <FaTicketAlt size={16} />
                                            Claim
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                transferStatus={transferStatus}
                transferMessage={transferMessage}
                selectedAsset={selectedAssets.crypto ? 'crypto' : selectedAssets.voucher ? 'voucher' : 'nft'}
                assets={{
                    voucher: selectedAssets.voucher ? {
                        name: selectedAssets.voucher.name,
                        image: selectedAssets.voucher.image,
                        price: selectedAssets.voucher.price,
                        id: selectedAssets.voucher.id,
                        discount: selectedAssets.voucher.discount,
                        validUntil: selectedAssets.voucher.validUntil,
                        e_gift: selectedAssets.voucher.e_gift
                    } : {
                        name: '',
                        image: '',
                        price: 0,
                        id: '',
                        discount: '',
                        validUntil: '',
                        e_gift: ''
                    },
                    crypto: selectedAssets.crypto ? {
                        name: selectedAssets.crypto.name,
                        symbol: selectedAssets.crypto.symbol,
                        balance: selectedAssets.crypto.balance,
                        price: selectedAssets.crypto.price,
                        id: selectedAssets.crypto.id,
                        icon: selectedAssets.crypto.icon,
                    } : {
                        name: '',
                        symbol: '',
                        balance: 0,
                        price: 0,
                        icon: <></>,
                        id: ''
                    },
                    nft: selectedAssets.nft ? {
                        name: selectedAssets.nft.name,
                        image: selectedAssets.nft.image,
                        price: selectedAssets.nft.price,
                        id: selectedAssets.nft.id,
                        description: selectedAssets.nft.description,
                        currency: selectedAssets.nft.currency
                    } : {
                        name: '',
                        image: '',
                        price: 0,
                        id: '',
                        description: '',
                        currency: ''
                    }
                }}
            />
        </>
    )
}
