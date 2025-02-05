'use client'
import { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function SimpleLoading() {
    const [progress, setProgress] = useState(0)
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
        // Start progress animation
        const startTime = Date.now()
        const minLoadTime = 8000 // 3 seconds minimum

        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime
            const progressValue = Math.min((elapsed / minLoadTime) * 100, 100)
            setProgress(progressValue)

            if (elapsed >= minLoadTime) {
                clearInterval(timer)
                setShowContent(true)
            }
        }, 50)

        return () => clearInterval(timer)
    }, [])

    if (showContent) {
        return null
    }

    return (
        <div className="min-h-screen bg-[#020309] flex flex-col items-center justify-center gap-8">
            <motion.div
                className="relative w-32 h-32"
                animate={{
                    rotate: 360
                }}
                transition={{
                    duration: 2,
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
                        duration: 1.5,
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
                        duration: 3,
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

            {/* Progress bar with glow effect */}
            <div className="w-64 h-2 bg-gradient-to-r from-[#0CC0DF]/20 to-[#14F195]/20 rounded-full overflow-hidden"
                style={{
                    boxShadow: "0 0 10px rgba(20, 241, 149, 0.3)"
                }}>
                <motion.div
                    className="h-full bg-gradient-to-r from-[#0CC0DF] to-[#14F195]"
                    style={{
                        width: `${progress}%`,
                        boxShadow: "0 0 10px #14F195"
                    }}
                    animate={{
                        opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity
                    }}
                />
            </div>

            {/* Syncing text */}
            <motion.div
                className="text-transparent bg-gradient-to-r from-[#0CC0DF] to-[#14F195] bg-clip-text font-medium"
                animate={{
                    opacity: [0.7, 1, 0.7]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity
                }}
            >
                Syncing into Sources... {Math.round(progress)}%
            </motion.div>
        </div>
    )
}