'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Features() {
  const [cardOrder, setCardOrder] = useState([0, 1, 2])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  const rotateCards = () => {
    setCardOrder(prev => [(prev[1]), (prev[2]), (prev[0])])
  }

  const cards = [
    {
      title: "Simple Player Login",
      description: "Let your players log in using Google or Apple accounts—no wallets, no seed phrases, no friction. A Web2-like onboarding experience powered by Web3 technology.",
      image: "/login.jpeg"
    },
    {
      title: "One-Click Asset Minting",
      description: "Mint NFTs, game items, and tokens effortlessly with a single API call. No need for smart contract development or blockchain expertise—our API handles it all.",
      image: "/rewards.jpeg",
    },
    {
      title: "Custom Tokenomics in Minutes",
      description: "Define your game’s economy and create in-game currencies or rewards systems with a few API calls. Build tokenomics tailored to your game’s unique vision without writing blockchain code.",
      image: "/tokenomic.jpeg"
    },
    {
      title: "Launch a Branded Marketplace",
      description: "Create your own fully-branded, decentralized marketplace. Publicly accessible on the Solana blockchain, enabling players to trade assets seamlessly and securely.",
      image: "/marketplaces.jpeg",
    },
    {
      title: "No Blockchain Expertise Needed",
      description: "Focus on building amazing gameplay. We provide all the tools—minting, transactions, token management—through an intuitive API, so you never need to worry about blockchain intricacies.",
      image: "/zeroknowledge.png",
    },
    {
      title: "True On-Chain Ownership",
      description: "Every asset is real, on-chain, and belongs to the player. They can withdraw items or tokens to their personal wallets anytime, ensuring transparency and true ownership.",
      image: "/ownership.jpeg",
    },
  ];


  return (
    <section className="relative overflow-hidden flex items-center justify-center px-2 md:px-4 text-white py-24">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[#0f1c3d]">
        {/* Glowing orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#14F195] rounded-full filter blur-[120px] opacity-100" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#9945FF] rounded-full filter blur-[120px] opacity-100" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#14F195] rounded-full filter blur-[150px] opacity-100" />

        {/* Gradient mesh */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-[#0f1c3d]/80 via-[#132552]/75 to-[#1b2f66]/70" /> */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#071A2F]/90 via-[#0A527A]/80 to-[#0CC0DF]/70" />

        {/* Subtle grid overlay */}
        {/* <div className="absolute inset-0 bg-[url('/grid.png')] opacity-40 bg-repeat bg-center"
          style={{ backgroundSize: '50px 50px' }} /> */}
      </div>

      <motion.div
        className="w-full relative z-10 px-4 md:px-8 lg:px-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-left my-32">
          <span className="text-white">DESIGNED BY DEVS</span>
          <br className="mb-12" />
          <span className="bg-gradient-to-r from-[#0CC0DF] to-[#14F195] bg-clip-text text-transparent">FOR DEVS</span>
        </h1>
        <div className="flex flex-col gap-48 w-full max-w-7xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 w-full`}
            >
              {/* Text Content */}
              <div className="w-full md:w-1/2 text-left">
                <h2 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-[#0CC0DF] to-[#0CC0DF]/70 bg-clip-text text-transparent">
                  {card.title}
                </h2>
                <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Image Display */}
              <div className="w-full md:w-1/2 relative aspect-[4/3]">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    priority
                    loading="eager"
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
