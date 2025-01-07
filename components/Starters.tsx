'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Starters() {
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

  const tutorials = [
    {
      title: "Quick Start Guide",
      description: "Get up and running in 5 minutes with our basic starter template. Includes wallet integration, token transfers, and basic NFT display.",
      steps: [
        "Clone the repository",
        "Install dependencies",
        "Configure environment variables",
        "Run the development server"
      ],
      image: "/quickstart.png"
    },
    {
      title: "NFT Marketplace Setup",
      description: "Create your own NFT marketplace with our comprehensive starter kit. Includes minting, listing, and trading functionality.",
      steps: [
        "Set up smart contracts",
        "Configure marketplace parameters",
        "Implement frontend components",
        "Deploy to mainnet"
      ],
      image: "/nft-marketplace.png"
    },
    {
      title: "Token Gating Implementation",
      description: "Learn how to implement token gating for exclusive content and features in your dApp.",
      steps: [
        "Install token gating package",
        "Set up authentication",
        "Configure access rules",
        "Test gated content"
      ],
      image: "/token-gating.png"
    }
  ];

  return (
    <section className="relative overflow-hidden flex items-center justify-center px-2 md:px-4 text-white py-24">
      <div className="absolute inset-0 bg-[#0f1c3d]">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#14F195] rounded-full filter blur-[120px] opacity-75 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#9945FF] rounded-full filter blur-[120px] opacity-70 animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1c3d]/80 via-[#132552]/75 to-[#1b2f66]/70" />
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-40 bg-repeat bg-center" 
             style={{ backgroundSize: '50px 50px' }} />
      </div>

      <motion.div
        className="w-full relative z-10 px-4 md:px-8 lg:px-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-left my-32">
          <span className="text-white">Quick Start</span>
          <br className="mb-12"/>
          <span className="bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">Guides</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tutorials.map((tutorial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-[#14F195]/50 transition-all duration-300"
            >
              <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden">
                <Image
                  src={tutorial.image}
                  alt={tutorial.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
                {tutorial.title}
              </h3>
              
              <p className="text-gray-300 text-sm mb-4">
                {tutorial.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#14F195]">Quick Steps:</h4>
                {tutorial.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-[#14F195]">→</span>
                    {step}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
