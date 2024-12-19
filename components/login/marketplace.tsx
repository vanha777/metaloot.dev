'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Auth } from '../../app/auth'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, PerspectiveCamera } from '@react-three/drei'
import { FaBitcoin, FaEthereum, FaWallet, FaShoppingCart, FaTicketAlt, FaStore, FaCoins, FaTicketAlt as FaTicket } from 'react-icons/fa'
import { SiSolana, SiTether } from 'react-icons/si'
import Modal from './modal'

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

interface Voucher {
    id: string
    title: string
    discount: string
    validUntil: string
    image: string
    price: number
}

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
        name: 'Bitcoin',
        balance: 0.25,
        price: 45000,
        icon: <FaBitcoin className="text-[#F7931A]" size={36} />
    },
    {
        symbol: 'ETH',
        name: 'Ethereum',
        balance: 2.5,
        price: 3000,
        icon: <FaEthereum className="text-[#627EEA]" size={36} />
    },
    {
        symbol: 'SOL',
        name: 'Solana',
        balance: 15.0,
        price: 100,
        icon: <SiSolana className="text-[#00FFA3]" size={36} />
    },
    {
        symbol: 'USDT',
        name: 'Tether',
        balance: 1000,
        price: 1,
        icon: <SiTether className="text-[#26A17B]" size={24} />
    }
    // {
    //     symbol: 'MTL',
    //     name: 'MetaLoot',
    //     balance: 1250,
    //     price: 1,
    //     icon: <Image src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/MTL.png" width={36} height={36} alt="MTL" />
    // }
]

const vouchers: Voucher[] = [
    {
        id: '1',
        title: '50% Off Jetstar',
        discount: '50%',
        validUntil: '2024-12-31',
        image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%2010.jpeg',
        price: 100
    },
    {
        id: '2',
        title: '30% Off Bunnings',
        discount: '30%',
        validUntil: '2024-12-31',
        image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%2012.jpeg',
        price: 100
    },
    {
        id: '3',
        title: '10% Off Coles',
        discount: '10%',
        validUntil: '2024-12-31',
        image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%2013.jpeg',
        price: 100
    },
    {
        id: '4',
        title: '10% Off Woolworths',
        discount: '10%',
        validUntil: '2024-12-31',
        image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%2015.jpeg',
        price: 100
    },
]

const tabIcons = {
    nfts: <FaStore size={64} />,
    deals: <FaCoins size={64} />
}

export default function Marketplace() {
    const [walletAddress, setWalletAddress] = useState<string>('')
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
        const getWalletDetails = async () => {
            const supabase = await Auth
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setWalletAddress(user.email || '')
            }
        }
        getWalletDetails()
    }, [])

    const handleClaim = async (voucher: Voucher) => {
        setSelectedAssets({ voucher })
        setShowModal(true)
        setTransferStatus('loading')
        setTransferMessage('Processing your claim...')

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            setTransferStatus('success')
            setTransferMessage(`Successfully claimed ${voucher.title}!`)
        } catch (error) {
            setTransferStatus('error')
            setTransferMessage('Failed to claim voucher. Please try again.')
        }
    }

    const handleCryptoClick = async (crypto: CryptoAsset) => {
        setSelectedAssets({ crypto })
        setShowModal(true)
        setTransferStatus('loading')
        setTransferMessage('Preparing to swap...')

        try {
            // Simulate API call
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
            // Simulate API call
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
            <div className="flex gap-24 mb-26 p-24">
                {(['nfts', 'deals'] as const).map((tab) => (
                    <motion.button
                        key={tab}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTab(tab)}
                        className={`px-24 py-16 rounded-[3rem] backdrop-blur-sm relative
                ${selectedTab === tab
                                ? 'border-4 border-[#0CC0DF] text-[#0CC0DF] shadow-lg shadow-[#0CC0DF]/30'
                                : 'border-2 border-white/30 text-white'} 
                before:content-[""] before:absolute before:inset-0 before:rounded-[3rem] 
                before:bg-gradient-to-r before:from-gray-900 before:to-gray-800 before:z-[-1]
                hover:border-[#0CC0DF]/60 transition-colors duration-300`}
                    >
                        {tabIcons[tab]}
                    </motion.button>
                ))}
            </div>

            {/* Content Sections */}
            <div className="flex flex-col gap-8">
                {selectedTab === 'nfts' && (
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
                                <p className="text-gray-300 mb-4">{nft.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#0CC0DF]">{nft.price} {nft.currency}</span>
                                    <button 
                                        onClick={() => handleNFTBuy(nft)}
                                        className="bg-[#0CC0DF] px-4 py-2 rounded-lg flex items-center gap-2"
                                    >
                                        <FaShoppingCart />
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cryptoAssets.map((asset) => (
                                <motion.div
                                    key={asset.symbol}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => handleCryptoClick(asset)}
                                    className="bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm 
                                     rounded-xl p-6 border border-[#0CC0DF]/20 cursor-pointer"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        {asset.icon}
                                        <div>
                                            <h3 className="text-xl font-bold">{asset.name}</h3>
                                            <p className="text-gray-300">{asset.symbol}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-300">Balance</p>
                                            <p className="text-xl font-bold">{asset.balance} {asset.symbol}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-300">Value</p>
                                            <p className="text-xl font-bold">${(asset.balance * asset.price).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Vouchers Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {vouchers.map((voucher) => (
                                <motion.div
                                    key={voucher.id}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm 
                                 rounded-xl p-4 border border-[#0CC0DF]/20"
                                >
                                    <div className="relative h-72 mb-4 rounded-lg overflow-hidden">
                                        <Image src={voucher.image} alt={voucher.title} fill className="object-cover" />
                                        <div className="absolute top-2 right-2 bg-[#0CC0DF] px-3 py-1 rounded-full">
                                            {voucher.discount} OFF
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{voucher.title}</h3>
                                    <p className="text-gray-300 mb-4">Valid until: {voucher.validUntil}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#0CC0DF]">${voucher.price}</span>
                                        <button 
                                            onClick={() => handleClaim(voucher)}
                                            className="bg-[#0CC0DF] px-4 py-2 rounded-lg flex items-center gap-2"
                                        >
                                            <FaTicketAlt />
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
                        name: selectedAssets.voucher.title,
                        image: selectedAssets.voucher.image,
                        price: selectedAssets.voucher.price
                    } : {
                        name: '',
                        image: '',
                        price: 0
                    },
                    crypto: selectedAssets.crypto ? {
                        name: selectedAssets.crypto.name,
                        symbol: selectedAssets.crypto.symbol,
                        balance: selectedAssets.crypto.balance,
                        price: selectedAssets.crypto.price,
                        icon: selectedAssets.crypto.icon
                    } : {
                        name: '',
                        symbol: '',
                        balance: 0,
                        price: 0,
                        icon: <></>
                    },
                    nft: selectedAssets.nft ? {
                        name: selectedAssets.nft.name,
                        image: selectedAssets.nft.image,
                        price: selectedAssets.nft.price
                    } : {
                        name: '',
                        image: '',
                        price: 0
                    }
                }}
            />
        </>
    )
}
