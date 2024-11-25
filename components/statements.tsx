'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Statements() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }

  return (
    <section className="bg-gradient-to-br from-gray-900 to-black min-h-screen flex items-center justify-center px-4 text-white overflow-hidden py-20">
      <motion.div 
        className="max-w-6xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      > 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              rotate: [0, -2, 2, -2, 0],
              transition: { duration: 0.5 }
            }}
            className="bg-gray-800/40 backdrop-blur-lg rounded-xl p-6 relative"
          >
            <div className="hidden md:block mb-6">
              <Image
                src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%2016.jpeg"
                alt="Play-to-Earn Gaming"
                width={400}
                height={200}
                className="rounded-lg w-[400px] h-[200px] object-cover"
              />
            </div>
            <motion.div 
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-purple-900/50 backdrop-blur-sm rounded-full p-5"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </motion.div>
            <h3 className="text-xl font-bold mb-3 mt-4 bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">Play-to-Earn Gaming</h3>
            <p className="text-gray-400">Imagine your in-game currency can be converted to real-world assets.</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              rotate: [0, 2, -2, 2, 0],
              transition: { duration: 0.5 }
            }}
            className="bg-gray-800/40 backdrop-blur-lg rounded-xl p-6 relative"
          >
            <div className="hidden md:block mb-6">
              <Image
                src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%2018.jpeg"
                alt="NFT Marketplace"
                width={400}
                height={200}
                className="rounded-lg w-[400px] h-[200px] object-cover"
              />
            </div>
            <motion.div 
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-purple-900/50 backdrop-blur-sm rounded-full p-5"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </motion.div>
            <h3 className="text-xl font-bold mb-3 mt-4 bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">NFT Marketplace</h3>
            <p className="text-gray-400">List, trade, buy, or cash out your in-game items.</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              rotate: [0, -2, 2, -2, 0],
              transition: { duration: 0.5 }
            }}
            className="bg-gray-800/40 backdrop-blur-lg rounded-xl p-6 relative"
          >
            <div className="hidden md:block mb-6">
              <Image
                src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%2017.jpeg"
                alt="Cross-Chain Gaming"
                width={400}
                height={200}
                className="rounded-lg w-[400px] h-[200px] object-cover"
              />
            </div>
            <motion.div 
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-purple-900/50 backdrop-blur-sm rounded-full p-5"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </motion.div>
            <h3 className="text-xl font-bold mb-3 mt-4 bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">Cross-Chain Gaming</h3>
            <p className="text-gray-400">Play one game and use your rewards on another game.</p>
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="text-center"
        >
        </motion.div>
      </motion.div>
    </section>
  )
}
