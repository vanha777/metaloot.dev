'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Demo() {
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
        duration: 0.5
      }
    }
  }

  return (
    <section className="relative overflow-hidden flex items-center justify-center px-2 md:px-4 text-white py-24">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[#0f1c3d]">
        {/* Glowing orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#14F195] rounded-full filter blur-[120px] opacity-75 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#9945FF] rounded-full filter blur-[120px] opacity-70 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#14F195] rounded-full filter blur-[150px] opacity-65 animate-pulse delay-500" />
        
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1c3d]/80 via-[#132552]/75 to-[#1b2f66]/70" />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-40 bg-repeat bg-center" 
             style={{ backgroundSize: '50px 50px' }} />
      </div>

      <motion.div
        className="w-full max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-[300px] md:h-auto">
              <Image
                src="/demo.jpg"
                alt="Demo Game Preview"
                fill
                priority
                className="object-cover"
              />
            </div>
            
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
                Try Our Demo Game
              </h2>
              <p className="text-gray-200 mb-6 text-lg leading-relaxed">
                Experience the future of blockchain gaming with our interactive demo. 
                Features NFT integration, real-time transactions, and seamless wallet connectivity.
              </p>
              <button className="bg-gradient-to-r from-[#14F195] to-[#9945FF] text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity w-fit">
                Play Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
