'use client'

import { motion } from 'framer-motion'

export default function BigStatement() {
    return (
        <div className="hero min-h-screen bg-[#020309] relative overflow-hidden">
            {/* Deep space background with electronic effects */}
            <div className="absolute inset-0">
                <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0CC0DF] via-black to-[#020309] opacity-20" />
                <div className="grid grid-cols-12 gap-4 absolute inset-0 opacity-30">
                    {[...Array(48)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                opacity: [0.3, 1, 0.3],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                            className="h-1 bg-[#0CC0DF] rounded-full"
                        />
                    ))}
                </div>
            </div>

            <div className="hero-content text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, staggerChildren: 0.3 }}
                    className="max-w-7xl mx-auto"
                >
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.p
                            className="text-2xl md:text-4xl text-white font-medium max-w-4xl mx-auto"
                            animate={{
                                opacity: [0.8, 1, 0.8]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <span className="text-white text-6xl md:text-8xl font-black block mb-8 drop-shadow-[0_0_15px_rgba(12,192,223,0.5)]">
                                MetaLoot
                            </span>
                            Brings your favorite game on-chain
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline mx-4 text-[#0CC0DF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <br />
                            <span className="text-white text-3xl md:text-5xl font-bold block mt-8 drop-shadow-[0_0_10px_rgba(12,192,223,0.3)]">
                                Allowing you to earn money
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline mx-4 text-[#0CC0DF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                with just your skills.
                            </span>
                        </motion.p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}


