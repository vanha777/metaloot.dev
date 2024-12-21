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
                        <motion.div 
                            className="modal-box relative bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#0CC0DF] shadow-xl shadow-[#0CC0DF]/20 rounded-2xl max-w-4xl"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            <motion.button
                                onClick={() => resetSwapState()}
                                className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
                                whileHover={{ rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <FaTimes size={24} />
                            </motion.button>

                            {/* <motion.h3 
                                className="font-bold text-3xl text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#0CC0DF] to-[#0AA0BF]"
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                Swap from MTL
                            </motion.h3> */}

                            {isSwappingDone === "success" ? (
                                <motion.div 
                                    className="flex flex-col items-center justify-center p-8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <motion.div
                                        className="w-24 h-24 mb-6 text-[#0CC0DF]"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1, rotate: 360 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </motion.div>
                                    
                                    <motion.h2
                                        className="text-2xl font-bold text-[#0CC0DF] mb-4"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        Swap Successful!
                                    </motion.h2>
                                    
                                    <motion.p
                                        className="text-gray-300 text-center mb-8"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        Please check your wallet to view your new assets.
                                    </motion.p>

                                    <motion.div
                                        className="grid grid-cols-2 gap-8"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <div className="text-center">
                                            <div className="bg-gray-800/50 p-4 rounded-xl mb-2">
                                                <Image
                                                    src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/MTL.png"
                                                    width={80}
                                                    height={80}
                                                    className="mx-auto"
                                                    alt="MTL"
                                                />
                                            </div>
                                            <p className="text-gray-400">From: $MTL</p>
                                        </div>
                                        
                                        <div className="text-center">
                                            <div className="bg-gray-800/50 p-4 rounded-xl mb-2">
                                                {selectedAsset === 'crypto' ? (
                                                    <div className="h-20 flex items-center justify-center">
                                                        {assets.crypto.name === 'Bitcoin' && <FaBitcoin className="text-[#F7931A]" size={48} />}
                                                        {assets.crypto.name === 'Ethereum' && <FaEthereum className="text-[#627EEA]" size={48} />}
                                                        {assets.crypto.name === 'Solana' && <SiSolana className="text-[#00FFA3]" size={48} />}
                                                        {assets.crypto.name === 'Tether' && <SiTether className="text-[#26A17B]" size={48} />}
                                                    </div>
                                                ) : (
                                                    <Image
                                                        src={assets[selectedAsset].image}
                                                        width={80}
                                                        height={80}
                                                        className="mx-auto"
                                                        alt={assets[selectedAsset].name}
                                                    />
                                                )}
                                            </div>
                                            <p className="text-gray-400">To: {selectedAsset === 'crypto' ? assets.crypto.name : assets[selectedAsset].name}</p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ) : isSwappingDone && isSwappingDone !== "success" ? (
                                <motion.div 
                                    className="flex flex-col items-center justify-center p-8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <motion.div
                                        className="w-24 h-24 mb-6 text-red-500"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </motion.div>
                                    
                                    <motion.h2
                                        className="text-2xl font-bold text-red-500 mb-4"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        Swap Failed
                                    </motion.h2>
                                    
                                    <motion.p
                                        className="text-gray-300 text-center mb-8"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        Error: {isSwappingDone}
                                    </motion.p>
                                </motion.div>
                            ) : transferStatus === 'loading' ? (
                                <motion.div 
                                    className="flex flex-col items-center justify-center p-6"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    <div className="relative">
                                        <div className="w-24 h-24 relative">
                                            <motion.div 
                                                className="absolute inset-0 border-4 border-[#0CC0DF]/20 rounded-full"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            />
                                            <motion.div 
                                                className="absolute inset-2 border-4 border-[#0CC0DF]/40 rounded-full"
                                                animate={{ rotate: -360 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            >
                                                {[0, 90, 180, 270].map((degree) => (
                                                    <motion.div
                                                        key={degree}
                                                        className="absolute w-2 h-2 bg-[#0CC0DF] rounded-full"
                                                        style={{ 
                                                            transformOrigin: "center",
                                                            rotate: `${degree}deg`,
                                                            translateY: "-50%"
                                                        }}
                                                        animate={{ scale: [1, 1.5, 1] }}
                                                        transition={{ duration: 1, repeat: Infinity }}
                                                    />
                                                ))}
                                            </motion.div>
                                            <motion.div 
                                                className="absolute inset-6 bg-[#0CC0DF] rounded-full"
                                                animate={{ scale: [1, 1.2, 1], opacity: [0.75, 0.5, 0.75] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        </div>
                                    </div>
                                    <motion.p 
                                        className="mt-6 text-center text-lg font-medium text-gray-200"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        {transferMessage}
                                    </motion.p>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col gap-8">
                                    <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-4">
                                        <motion.div
                                            className={`bg-gray-800/50 p-6 rounded-xl transform transition-all duration-300 ${isHovered ? 'scale-105 shadow-lg shadow-[#0CC0DF]/30' : ''}`}
                                            onHoverStart={() => setIsHovered(true)}
                                            onHoverEnd={() => setIsHovered(false)}
                                            initial={{ x: -50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 100 }}
                                        >
                                            <div className="flex justify-between mb-4">
                                                <span className="text-gray-400 text-lg">From</span>
                                                <motion.div 
                                                    className="flex items-center gap-2 bg-[#0CC0DF]/20 px-4 py-2 rounded-lg"
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <span>$MTL</span>
                                                </motion.div>
                                            </div>

                                            <motion.div 
                                                className="relative h-48 mb-4 rounded-xl overflow-hidden"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <Image
                                                    src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/MTL.png"
                                                    fill
                                                    className="object-contain p-8"
                                                    alt="MTL"
                                                />
                                            </motion.div>

                                            <input
                                                type="number"
                                                value={selectedAsset !== 'crypto' ? assets[selectedAsset].price : fromAmount}
                                                onChange={(e) => setFromAmount(e.target.value)}
                                                className="bg-transparent text-2xl w-full focus:outline-none text-center hover:bg-[#0CC0DF]/10 transition-colors rounded-lg p-2"
                                                placeholder="0.0"
                                                readOnly={selectedAsset !== 'crypto'}
                                            />
                                        </motion.div>

                                        <motion.button
                                            onClick={handleSwap}
                                            className={`bg-[#0CC0DF]/20 p-4 rounded-full cursor-pointer ${
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
                                                    <svg className="w-8 h-8 text-[#0CC0DF]" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z"/>
                                                        <path fill="currentColor" d="M12 20v2a10 10 0 0 0 10-10h-2a8 8 0 0 1-8 8Z"/>
                                                    </svg>
                                                </motion.div>
                                            ) : (
                                                <FaExchangeAlt className="text-[#0CC0DF] text-3xl" />
                                            )}
                                        </motion.button>

                                        <motion.div
                                            className={`bg-gray-800/50 p-6 rounded-xl transform transition-all duration-300 ${isHovered ? 'scale-105 shadow-lg shadow-[#0CC0DF]/30' : ''}`}
                                            onHoverStart={() => setIsHovered(true)}
                                            onHoverEnd={() => setIsHovered(false)}
                                            initial={{ x: 50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 100 }}
                                        >
                                            <div className="flex justify-between mb-4">
                                                <span className="text-gray-400 text-lg">To</span>
                                                <motion.div 
                                                    className="flex items-center gap-2 bg-[#0CC0DF]/20 px-4 py-2 rounded-lg"
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <span>{selectedAsset === 'crypto' ? assets.crypto.name : 'Asset'}</span>
                                                </motion.div>
                                            </div>

                                            <motion.div 
                                                className="relative h-48 mb-4 rounded-xl overflow-hidden"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {selectedAsset === 'crypto' ? (
                                                    <div className="h-full flex items-center justify-center bg-gradient-to-br from-[#00FFA3]/20 to-transparent">
                                                        <motion.div
                                                            whileHover={{ scale: 1.2 }}
                                                            transition={{ type: "spring", stiffness: 300 }}
                                                        >
                                                            {assets.crypto.name === 'Bitcoin' && <FaBitcoin className="text-[#F7931A]" size={66} />}
                                                            {assets.crypto.name === 'Ethereum' && <FaEthereum className="text-[#627EEA]" size={66} />}
                                                            {assets.crypto.name === 'Solana' && <SiSolana className="text-[#00FFA3]" size={66} />}
                                                            {assets.crypto.name === 'Tether' && <SiTether className="text-[#26A17B]" size={66} />}
                                                        </motion.div>
                                                    </div>
                                                ) : (
                                                    <Image
                                                        src={assets[selectedAsset].image}
                                                        fill
                                                        className="object-cover"
                                                        alt={assets[selectedAsset].name}
                                                    />
                                                )}
                                            </motion.div>

                                            <motion.div 
                                                className="text-2xl text-center text-gray-400"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {selectedAsset === 'crypto' ? toAmount : `1x ${assets[selectedAsset].name}`}
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
