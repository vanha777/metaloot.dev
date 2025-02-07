'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SimpleLoading() {
    const [opacity, setOpacity] = useState(1)

    return (
        <div className="min-h-screen bg-[#020309] flex flex-col items-center justify-center gap-8"
            style={{ opacity: opacity }}>
            <motion.div
                className="relative w-32 h-32"
                animate={{
                    rotate: 360
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {/* Player 1 style sync rings */}
                <div className="absolute inset-0 rounded-full border-4 border-[#0CC0DF]/20" />
                <motion.div
                    className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-[#0CC0DF] to-[#14F195] border-t-transparent"
                    style={{
                        filter: "drop-shadow(0 0 8px #0CC0DF)"
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8],
                        rotate: 360
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute inset-2 rounded-full border-4 border-[#14F195]/40 border-t-transparent"
                    animate={{
                        rotate: -360
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="w-16 h-16 bg-gradient-to-r from-[#0CC0DF]/10 to-[#14F195]/10 rounded-full"
                        style={{
                            boxShadow: "0 0 20px #14F195"
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
            </motion.div>

            {/* Syncing text */}
            {/* <motion.div
                className="text-transparent bg-gradient-to-r from-[#0CC0DF] to-[#14F195] bg-clip-text font-medium"
                animate={{
                    opacity: [0.7, 1, 0.7]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity
                }}
            >
                Syncing into Sources...
            </motion.div> */}
        </div>
    )
}