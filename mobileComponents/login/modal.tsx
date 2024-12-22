import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaBitcoin, FaEthereum, FaExchangeAlt, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
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
    const [isHovered, setIsHovered] = useState(false);
    const [isExchangeHovered, setIsExchangeHovered] = useState(false);
    const [isSwapping, setIsSwapping] = useState(false);
    const [isSwappingDone, setIsSwappingDone] = useState("");

    useEffect(() => {
        if (selectedAsset === 'crypto') {
            const fromValue = parseFloat(fromAmount) || 0;
            const toValue = fromValue * (assets.crypto?.price || 0);
            setToAmount(toValue.toString());
        }
    }, [fromAmount]);

    const resetSwapState = () => {
        console.log("resetting swap state");
            setIsSwapping(false);
            setIsHovered(false);
            setIsExchangeHovered(false);
            setIsSwappingDone("");
            setShowModal(false);
    };

    const swap = async (): Promise<string> => {
        console.log("swapping now !");
        console.log("selected asset is ", assets[selectedAsset]);
        const amount = selectedAsset !== 'crypto' ? assets[selectedAsset].price : fromAmount;
        console.log("amount MTL is ", amount);

        try {
            const result = await new Promise<string>((resolve, reject) => {
                setTimeout(() => {
                    if (Number(amount) > 0) {
                        resolve("success");
                    } else {
                        reject("Not enough funds");
                    }
                }, 3000);
            });
            return result;
        } catch (error) {
            return error as string;
        }
    };

    const handleSwap = async () => {
        setIsSwapping(true);
        setIsHovered(true);
        setIsExchangeHovered(true);

        try {
            const result = await swap();
            setIsSwappingDone(result);
        } catch (error) {
            setIsSwappingDone(error as string);
        } finally {
            setIsSwapping(false);
            setIsHovered(false);
            setIsExchangeHovered(false);
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", duration: 0.5 } }
    };

    return (
        <AnimatePresence>
            {showModal && (
                <>
                    <input
                        type="checkbox"
                        id="transfer-modal"
                        className="modal-toggle"
                        checked={showModal}
                        onChange={() => setShowModal(!showModal)}
                    />
                    <motion.div 
                        className="modal backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
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
                            <motion.div 
                                className="modal-box relative bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#0CC0DF] shadow-xl shadow-[#0CC0DF]/20 rounded-2xl max-w-[95vw] sm:max-w-4xl mx-4"
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <motion.button
                                    onClick={() => resetSwapState()}
                                    className="absolute right-2 sm:right-4 top-2 sm:top-4 text-gray-400 hover:text-white transition-colors"
                                    whileHover={{ rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FaTimes size={20} className="sm:text-2xl" />
                                </motion.button>

                                {isSwappingDone === "success" ? (
                                    <motion.div 
                                        className="p-4 sm:p-8 relative overflow-hidden"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        {/* Success Icon */}
                                        <motion.div 
                                            className="flex justify-center mb-6 sm:mb-8"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring" }}
                                        >
                                            <div className="relative">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                                                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" viewBox="0 0 24 24" fill="none">
                                                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
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
                                        <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
                                            <div className="text-center">
                                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Transaction Successful!</h2>
                                                <p className="text-sm sm:text-base text-gray-400">Your swap has been completed</p>
                                            </div>

                                            {/* Transaction ID */}
                                            <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
                                                <p className="text-xs sm:text-sm text-gray-400 mb-1">Transaction ID</p>
                                                <div className="flex items-center gap-2">
                                                    <code className="text-[#0CC0DF] font-mono text-sm">
                                                        0x7d3c...f8a2
                                                    </code>
                                                    <button 
                                                        className="text-gray-400 hover:text-[#0CC0DF]"
                                                        onClick={() => navigator.clipboard.writeText('0x7d3c...f8a2')}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Swap Details */}
                                            <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2 sm:gap-3">
                                                        <Image
                                                            src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/MTL.png"
                                                            width={24}
                                                            height={24}
                                                            alt="MTL"
                                                            className="rounded-full sm:w-8 sm:h-8"
                                                        />
                                                        <div>
                                                            <p className="text-xs sm:text-sm text-gray-400">From</p>
                                                            <p className="text-sm sm:text-base font-medium">MTL Token</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xs sm:text-sm text-gray-400">Amount</p>
                                                        <p className="text-sm sm:text-base font-medium">{fromAmount} MTL</p>
                                                    </div>
                                                </div>

                                                <div className="my-3 border-t border-gray-700" />

                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2 sm:gap-3">
                                                        {selectedAsset === 'crypto' ? (
                                                            <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                                                                {assets.crypto.icon}
                                                            </div>
                                                        ) : (
                                                            <Image
                                                                src={assets[selectedAsset].image}
                                                                width={24}
                                                                height={24}
                                                                alt={assets[selectedAsset].name}
                                                                className="rounded-full sm:w-8 sm:h-8"
                                                            />
                                                        )}
                                                        <div>
                                                            <p className="text-xs sm:text-sm text-gray-400">To</p>
                                                            <p className="text-sm sm:text-base font-medium">
                                                                {selectedAsset === 'crypto' ? assets.crypto.name : assets[selectedAsset].name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xs sm:text-sm text-gray-400">Amount</p>
                                                        <p className="text-sm sm:text-base font-medium">{toAmount}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Wallet Notice */}
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
                                ) : isSwappingDone && isSwappingDone !== "success" ? (
                                    <motion.div 
                                        className="p-4 sm:p-8 relative overflow-hidden"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        {/* Error Icon */}
                                        <motion.div 
                                            className="flex justify-center mb-6 sm:mb-8"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring" }}
                                        >
                                            <div className="relative">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                                                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" viewBox="0 0 24 24" fill="none">
                                                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
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
                                        <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
                                            <div className="text-center">
                                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Transaction Failed</h2>
                                                <p className="text-sm sm:text-base text-gray-400">Error: {isSwappingDone}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col gap-6 sm:gap-8 p-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr] items-center gap-4">
                                            <motion.div
                                                className={`bg-gray-800/50 p-4 sm:p-6 rounded-xl transform transition-all duration-300 ${isHovered ? 'scale-105 shadow-lg shadow-[#0CC0DF]/30' : ''}`}
                                                onHoverStart={() => setIsHovered(true)}
                                                onHoverEnd={() => setIsHovered(false)}
                                                initial={{ x: -50, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ type: "spring", stiffness: 100 }}
                                            >
                                                <div className="flex justify-between mb-4">
                                                    <span className="text-gray-400 text-base sm:text-lg">From</span>
                                                    <div className="flex items-center gap-2 bg-[#0CC0DF]/20 px-3 py-1 sm:px-4 sm:py-2 rounded-lg transition-transform">
                                                        <span className="text-sm sm:text-base">$MTL</span>
                                                    </div>
                                                </div>

                                                <div className="relative h-32 sm:h-48 mb-4 rounded-xl overflow-hidden">
                                                    <Image
                                                        src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/MTL.png"
                                                        fill
                                                        className="object-contain p-6 sm:p-8"
                                                        alt="MTL"
                                                    />
                                                </div>

                                                <input
                                                    type="number"
                                                    value={selectedAsset !== 'crypto' ? assets[selectedAsset].price : fromAmount}
                                                    onChange={(e) => setFromAmount(e.target.value)}
                                                    className="bg-transparent text-xl sm:text-2xl w-full focus:outline-none text-center hover:bg-[#0CC0DF]/10 transition-colors rounded-lg p-2"
                                                    placeholder="0.0"
                                                    readOnly={selectedAsset !== 'crypto'}
                                                />
                                            </motion.div>

                                            <motion.button
                                                onClick={handleSwap}
                                                className={`bg-[#0CC0DF]/20 p-3 sm:p-4 rounded-full cursor-pointer ${
                                                    isExchangeHovered || isSwapping ? 'shadow-lg shadow-[#0CC0DF]/30 ring-2 ring-[#0CC0DF]/50' : ''
                                                }`}
                                                animate={{ 
                                                    rotate: isSwapping ? [0, 360, 0] : (isExchangeHovered ? 360 : 0),
                                                    scale: isSwapping ? [1, 1.1, 1] : 1,
                                                    boxShadow: isSwapping ? [
                                                        '0 0 0 rgba(12, 192, 223, 0.4)',
                                                        '0 0 20px rgba(12, 192, 223, 0.6)',
                                                        '0 0 0 rgba(12, 192, 223, 0.4)'
                                                    ] : ''
                                                }}
                                                transition={{ 
                                                    duration: isSwapping ? 2 : 0.5,
                                                    repeat: isSwapping ? Infinity : 0,
                                                    ease: "linear"
                                                }}
                                                onHoverStart={() => setIsExchangeHovered(true)}
                                                onHoverEnd={() => setIsExchangeHovered(false)}
                                            >
                                                {isSwapping ? (
                                                    <motion.div
                                                        animate={{
                                                            opacity: [1, 0.5, 1],
                                                            filter: [
                                                                'drop-shadow(0 0 0 #0CC0DF)',
                                                                'drop-shadow(0 0 8px #0CC0DF)',
                                                                'drop-shadow(0 0 0 #0CC0DF)'
                                                            ]
                                                        }}
                                                        transition={{
                                                            duration: 1,
                                                            repeat: Infinity,
                                                            ease: "linear"
                                                        }}
                                                    >
                                                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#0CC0DF]" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z"/>
                                                            <path fill="currentColor" d="M12 20v2a10 10 0 0 0 10-10h-2a8 8 0 0 1-8 8Z"/>
                                                        </svg>
                                                    </motion.div>
                                                ) : (
                                                    <FaExchangeAlt className="text-[#0CC0DF] text-2xl sm:text-3xl" />
                                                )}
                                            </motion.button>

                                            <motion.div
                                                className={`bg-gray-800/50 p-4 sm:p-6 rounded-xl transform transition-all duration-300 ${isHovered ? 'scale-105 shadow-lg shadow-[#0CC0DF]/30' : ''}`}
                                                onHoverStart={() => setIsHovered(true)}
                                                onHoverEnd={() => setIsHovered(false)}
                                                initial={{ x: 50, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ type: "spring", stiffness: 100 }}
                                            >
                                                <div className="flex justify-between mb-4">
                                                    <span className="text-gray-400 text-base sm:text-lg">To</span>
                                                    <div className="flex items-center gap-2 bg-[#0CC0DF]/20 px-3 py-1 sm:px-4 sm:py-2 rounded-lg transition-transform">
                                                        <span className="text-sm sm:text-base">{selectedAsset === 'crypto' ? assets.crypto.name : 'Asset'}</span>
                                                    </div>
                                                </div>

                                                <div className="relative h-32 sm:h-48 mb-4 rounded-xl overflow-hidden transition-transform">
                                                    {selectedAsset === 'crypto' ? (
                                                        <div className="h-full flex items-center justify-center bg-gradient-to-br from-[#00FFA3]/20 to-transparent">
                                                            <div className="transition-transform scale-75 sm:scale-100">
                                                                {assets.crypto.name === 'Bitcoin' && <FaBitcoin className="text-[#F7931A]" size={66} />}
                                                                {assets.crypto.name === 'Ethereum' && <FaEthereum className="text-[#627EEA]" size={66} />}
                                                                {assets.crypto.name === 'Solana' && <SiSolana className="text-[#00FFA3]" size={66} />}
                                                                {assets.crypto.name === 'Tether' && <SiTether className="text-[#26A17B]" size={66} />}
                                                            </div>
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

                                                <div className="text-xl sm:text-2xl text-center text-gray-400">
                                                    {selectedAsset === 'crypto' ? toAmount : `1x ${assets[selectedAsset].name}`}
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
