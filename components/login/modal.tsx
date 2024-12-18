import { useState } from 'react';
import Image from 'next/image';
import { FaExchangeAlt, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { SiSolana } from 'react-icons/si';

interface ModalProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    transferStatus: 'loading' | 'success' | 'error';
    transferMessage: string;
}

export default function Modal({ showModal, setShowModal, transferStatus, transferMessage }: ModalProps) {
    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');
    const [selectedAsset, setSelectedAsset] = useState('voucher');

    const assets = {
        voucher: {
            name: '50% Off Jetstar',
            image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%2010.jpeg',
            price: 100
        },
        crypto: {
            name: 'Solana',
            symbol: 'SOL',
            balance: 15.0,
            price: 100,
            icon: <SiSolana className="text-[#00FFA3]" size={64} />
        },
        nft: {
            name: 'Optimus Prime Weapon #1347',
            image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/fantasy-warrior-sword-artwork-2.png',
            price: 0.5
        }
    };

    const handleSwap = () => {
        // Swap logic would go here
        setFromAmount('');
        setToAmount('');
    };

    return (
        <>
            <input 
                type="checkbox" 
                id="transfer-modal" 
                className="modal-toggle" 
                checked={showModal} 
                onChange={() => setShowModal(!showModal)} 
            />
            <div className="modal backdrop-blur-sm">
                <div className="modal-box relative bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#0CC0DF] shadow-xl shadow-[#0CC0DF]/20 rounded-2xl max-w-4xl">
                    <button
                        onClick={() => setShowModal(false)}
                        className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <FaTimes size={24} />
                    </button>
                    
                    <h3 className="font-bold text-3xl text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#0CC0DF] to-[#0AA0BF]">
                        Swap to MTL
                    </h3>

                    {transferStatus === 'loading' ? (
                        <div className="flex flex-col items-center justify-center p-6">
                            <div className="relative">
                                <div className="w-32 h-32 relative">
                                    <div className="absolute inset-0 border-4 border-[#0CC0DF]/20 rounded-full animate-[spin_3s_linear_infinite]" />
                                    <div className="absolute inset-2 border-4 border-[#0CC0DF]/40 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
                                    <div className="absolute inset-6 bg-[#0CC0DF] rounded-full animate-pulse opacity-75" />
                                </div>
                            </div>
                            <p className="mt-6 text-center text-xl font-medium text-gray-200">{transferMessage}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-8">
                            <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-4">
                                {/* From Asset */}
                                <motion.div 
                                    className="bg-gray-800/50 p-6 rounded-xl"
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                >
                                    <div className="flex justify-between mb-4">
                                        <span className="text-gray-400 text-lg">From</span>
                                        <select 
                                            value={selectedAsset}
                                            onChange={(e) => setSelectedAsset(e.target.value)}
                                            className="bg-[#0CC0DF]/20 px-4 py-2 rounded-lg"
                                        >
                                            <option value="voucher">Jetstar Voucher</option>
                                            <option value="crypto">SOL</option>
                                            <option value="nft">Optimus Prime NFT</option>
                                        </select>
                                    </div>
                                    
                                    <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                                        {selectedAsset === 'crypto' ? (
                                            <div className="h-full flex items-center justify-center bg-gradient-to-br from-[#00FFA3]/20 to-transparent">
                                                {assets.crypto.icon}
                                            </div>
                                        ) : (
                                            <Image 
                                                src={assets[selectedAsset as 'voucher' | 'nft'].image}
                                                fill
                                                className="object-cover"
                                                alt={assets[selectedAsset as 'voucher' | 'nft'].name}
                                            />
                                        )}
                                    </div>

                                    <input
                                        type="number"
                                        value={fromAmount}
                                        onChange={(e) => setFromAmount(e.target.value)}
                                        className="bg-transparent text-2xl w-full focus:outline-none text-center"
                                        placeholder="0.0"
                                    />
                                </motion.div>

                                {/* Exchange Icon */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="bg-[#0CC0DF]/20 p-4 rounded-full"
                                >
                                    <FaExchangeAlt className="text-[#0CC0DF] text-3xl" />
                                </motion.div>

                                {/* To Asset (MTL) */}
                                <motion.div 
                                    className="bg-gray-800/50 p-6 rounded-xl"
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                >
                                    <div className="flex justify-between mb-4">
                                        <span className="text-gray-400 text-lg">To</span>
                                        <div className="flex items-center gap-2 bg-[#0CC0DF]/20 px-4 py-2 rounded-lg">
                                            <span>MTL</span>
                                        </div>
                                    </div>

                                    <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                                        <Image 
                                            src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/MTL.png"
                                            fill
                                            className="object-contain p-8"
                                            alt="MTL"
                                        />
                                    </div>

                                    <input
                                        type="number"
                                        value={toAmount}
                                        onChange={(e) => setToAmount(e.target.value)}
                                        className="bg-transparent text-2xl w-full focus:outline-none text-center"
                                        placeholder="0.0"
                                    />
                                </motion.div>
                            </div>

                            <motion.button 
                                onClick={handleSwap}
                                className="bg-[#0CC0DF] text-white py-4 rounded-xl font-bold text-xl hover:bg-[#0AA0BF] transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Swap to MTL
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
