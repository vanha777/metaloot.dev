import { useState } from 'react';
import Image from 'next/image';
import { FaBitcoin, FaEthereum, FaExchangeAlt, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { SiSolana, SiTether } from 'react-icons/si';

type VoucherAsset = {
    name: string;
    image: string;
    price: number;
}

type CryptoAsset = {
    name: string;
    symbol: string;
    balance: number;
    price: number;
    icon: JSX.Element;
}

type NFTAsset = {
    name: string;
    image: string;
    price: number;
}

interface Assets {
    voucher: VoucherAsset;
    crypto: CryptoAsset;
    nft: NFTAsset;
}

interface ModalProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    transferStatus: 'loading' | 'success' | 'error';
    transferMessage: string;
    assets: Assets;
    selectedAsset: 'voucher' | 'crypto' | 'nft';
}

export default function Modal({ showModal, setShowModal, transferStatus, transferMessage, assets, selectedAsset }: ModalProps) {
    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');

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
                        Swap from MTL
                    </h3>

                    {transferStatus === 'loading' ? (
                        <div className="flex flex-col items-center justify-center p-6">
                            <div className="relative">
                                <div className="w-24 h-24 relative">
                                    {/* Outer rotating ring */}
                                    <div className="absolute inset-0 border-4 border-[#0CC0DF]/20 rounded-full animate-[spin_3s_linear_infinite]" />
                                    
                                    {/* Inner counter-rotating ring with particles */}
                                    <div className="absolute inset-2 border-4 border-[#0CC0DF]/40 rounded-full animate-[spin_2s_linear_infinite_reverse]">
                                        <div className="absolute -top-1 left-1/2 w-2 h-2 bg-[#0CC0DF] rounded-full animate-pulse" />
                                        <div className="absolute top-1/2 -right-1 w-2 h-2 bg-[#0CC0DF] rounded-full animate-pulse" />
                                        <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-[#0CC0DF] rounded-full animate-pulse" />
                                        <div className="absolute top-1/2 -left-1 w-2 h-2 bg-[#0CC0DF] rounded-full animate-pulse" />
                                    </div>
                                    
                                    {/* Center pulsing orb */}
                                    <div className="absolute inset-6 bg-[#0CC0DF] rounded-full animate-pulse opacity-75" />
                                </div>
                            </div>
                            <p className="mt-6 text-center text-lg font-medium text-gray-200">{transferMessage}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-8">
                            <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-4">
                                {/* From Asset (MTL) */}
                                <motion.div 
                                    className="bg-gray-800/50 p-6 rounded-xl"
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                >
                                    <div className="flex justify-between mb-4">
                                        <span className="text-gray-400 text-lg">From</span>
                                        <div className="flex items-center gap-2 bg-[#0CC0DF]/20 px-4 py-2 rounded-lg">
                                            <span>$MTL</span>
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
                                        value={selectedAsset === 'crypto' ? fromAmount : assets[selectedAsset].price.toString()}
                                        onChange={(e) => setFromAmount(e.target.value)}
                                        className="bg-transparent text-2xl w-full focus:outline-none text-center"
                                        placeholder="0.0"
                                        readOnly={selectedAsset !== 'crypto'}
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

                                {/* To Asset */}
                                <motion.div 
                                    className="bg-gray-800/50 p-6 rounded-xl"
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                >
                                    <div className="flex justify-between mb-4">
                                        <span className="text-gray-400 text-lg">To</span>
                                        <div className="flex items-center gap-2 bg-[#0CC0DF]/20 px-4 py-2 rounded-lg">
                                            <span>{selectedAsset === 'crypto' ? assets.crypto.name : 'Asset'}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                                        {selectedAsset === 'crypto' ? (
                                            <div className="h-full flex items-center justify-center bg-gradient-to-br from-[#00FFA3]/20 to-transparent">
                                                {assets.crypto.name === 'Bitcoin' && <FaBitcoin className="text-[#F7931A]" size={66} />}
                                                {assets.crypto.name === 'Ethereum' && <FaEthereum className="text-[#627EEA]" size={66} />}
                                                {assets.crypto.name === 'Solana' && <SiSolana className="text-[#00FFA3]" size={66} />}
                                                {assets.crypto.name === 'Tether' && <SiTether className="text-[#26A17B]" size={66} />}
                                            </div>
                                        ) : (
                                            <Image 
                                                src={assets[selectedAsset].image}
                                                fill
                                                className="object-cover"
                                                alt={assets[selectedAsset].name}
                                            />
                                        )}
                                    </div>

                                    {selectedAsset === 'crypto' ? (
                                        <input
                                            type="number"
                                            value={toAmount}
                                            onChange={(e) => setToAmount(e.target.value)}
                                            className="bg-transparent text-2xl w-full focus:outline-none text-center"
                                            placeholder="0.0"
                                        />
                                    ) : (
                                        <div className="text-2xl text-center text-gray-400">1x {assets[selectedAsset].name}</div>
                                    )}
                                </motion.div>
                            </div>

                            <motion.button 
                                onClick={handleSwap}
                                className="bg-[#0CC0DF] text-white py-4 rounded-xl font-bold text-xl hover:bg-[#0AA0BF] transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Swap from MTL
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
