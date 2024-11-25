'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="hero min-h-screen bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-primary rounded-full animate-pulse" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-secondary rounded-full animate-pulse animation-delay-1000" />
      </div>

      <div className="hero-content flex-col lg:flex-row-reverse px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="relative w-full max-w-2xl lg:max-w-3xl mx-auto lg:mx-0" // Further increased max-width
        >
          {/* Creative floating elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-10 -left-10 w-20 h-20 bg-primary/20 backdrop-blur-lg rounded-2xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-10 -right-10 w-16 h-16 bg-secondary/20 backdrop-blur-lg rounded-full"
          />

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
            <Image
              src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Black%20&%20white%20technology%20store%20Desktop%20Prototype-3.png"
              alt="MetaLoot Character"
              width={1500}
              height={1500}
              className="relative rounded-xl w-full h-auto max-w-[600px] sm:max-w-full mx-auto transform transition duration-500 hover:scale-105" // Significantly increased max-width and base dimensions
            />
          </div>
        </motion.div>

        <div className="text-center lg:text-left mt-8 lg:mt-0 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                Meta
              </span>
              <span className="bg-gradient-to-l from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                Loot
              </span>
            </h1>
            <p className="py-6 text-lg sm:text-xl leading-relaxed max-w-2xl">
              Bridge your gaming experience to the max with cross-game  items, a built-in marketplace, and 100% ownership of items in your personal blockchain wallet.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}