'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function Statements() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

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

  const contentVariants = {
    collapsed: { opacity: 0, height: 0 },
    expanded: { opacity: 1, height: "auto" }
  }

  return (
    <section className="bg-gradient-to-br from-gray-900 to-black min-h-screen flex items-center justify-center px-2 md:px-4 text-white overflow-hidden py-6 md:py-10">
      <motion.div 
        className="max-w-6xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      > 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="relative h-[200px] md:h-[400px] rounded-xl overflow-hidden group cursor-pointer"
            onClick={() => setExpandedCard(expandedCard === 0 ? null : 0)}
          >
            <Image
              src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%2016.jpeg"
              alt="Play-to-Earn Gaming"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            
            <motion.div 
              className="absolute top-2 md:top-4 left-1/2 transform -translate-x-1/2 bg-purple-900/50 backdrop-blur-sm rounded-full p-2 md:p-5"
              whileHover={{ scale: 1.1 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-14 md:w-14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 p-3 md:p-6"
              initial="collapsed"
              animate={expandedCard === 0 ? "expanded" : "collapsed"}
              variants={contentVariants}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-base md:text-xl font-bold mb-1 md:mb-3 bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">Play-to-Earn Gaming</h3>
              <p className="text-xs md:text-base text-gray-300">Imagine your in-game currency can be converted to real-world assets.</p>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="relative h-[200px] md:h-[400px] rounded-xl overflow-hidden group cursor-pointer"
            onClick={() => setExpandedCard(expandedCard === 1 ? null : 1)}
          >
            <Image
              src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%2018.jpeg"
              alt="NFT Marketplace"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            
            <motion.div 
              className="absolute top-2 md:top-4 left-1/2 transform -translate-x-1/2 bg-purple-900/50 backdrop-blur-sm rounded-full p-2 md:p-5"
              whileHover={{ scale: 1.1 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-14 md:w-14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 p-3 md:p-6"
              initial="collapsed"
              animate={expandedCard === 1 ? "expanded" : "collapsed"}
              variants={contentVariants}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-base md:text-xl font-bold mb-1 md:mb-3 bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">NFT Marketplace</h3>
              <p className="text-xs md:text-base text-gray-300">List, trade, buy, or cash out your in-game items.</p>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="relative h-[200px] md:h-[400px] rounded-xl overflow-hidden group cursor-pointer"
            onClick={() => setExpandedCard(expandedCard === 2 ? null : 2)}
          >
            <Image
              src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%2017.jpeg"
              alt="Cross-Chain Gaming"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            
            <motion.div 
              className="absolute top-2 md:top-4 left-1/2 transform -translate-x-1/2 bg-purple-900/50 backdrop-blur-sm rounded-full p-2 md:p-5"
              whileHover={{ scale: 1.1 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-14 md:w-14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 p-3 md:p-6"
              initial="collapsed"
              animate={expandedCard === 2 ? "expanded" : "collapsed"}
              variants={contentVariants}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-base md:text-xl font-bold mb-1 md:mb-3 bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">Cross-Chain Gaming</h3>
              <p className="text-xs md:text-base text-gray-300">Play one game and use your rewards on another game.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
