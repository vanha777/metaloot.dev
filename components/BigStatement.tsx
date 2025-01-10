'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

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

            <div className="hero-content relative z-10">
                <div className="flex flex-col items-center gap-16">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-center mt-32 mb-32">
                        <span className="text-white">ANALYTICS DASHBOARD</span>
                        <br className="mb-4"/>
                        <span className="bg-gradient-to-r from-[#0CC0DF] to-[#14F195] bg-clip-text text-transparent">FOR BETTER DECISIONS</span>
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                            duration: 0.5,
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                        className="relative w-full max-w-4xl mx-auto"
                    >
                        <Image
                            src="/apiDashboard.png"
                            alt="API Dashboard"
                            width={1200}
                            height={800}
                            className="w-full h-auto"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
