'use client'

import { motion } from 'framer-motion'
import { FaRocket, FaPiggyBank, FaChartLine, FaShieldAlt, FaCode, FaBolt } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export default function Statements() {
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

  const cards = [
    {
      title: "Save Development Time",
      description: "Developers spend an average of 6–12 months integrating blockchain from scratch. With our API, you can get your game on-chain in as little as 7 days, letting you focus on gameplay instead of infrastructure.",
      icon: FaRocket,
    },
    {
      title: "Cut Costs Significantly",
      description: "Building and maintaining blockchain infrastructure requires expensive DevOps teams and constant upgrades. Our managed services save you up to 70% in operational costs.",
      icon: FaPiggyBank,
    },
    {
      title: "Ensure Reliable Performance",
      description: "Our infrastructure is built to handle millions of transactions daily with low latency and high reliability. Whether it's player trades or on-chain rewards, scale confidently without disruptions.",
      icon: FaChartLine,
    },
    {
      title: "Stay Ahead with Future-Proof Tech",
      description: "Blockchain technology evolves rapidly. Our system ensures compatibility with emerging standards, so your game remains secure, scalable, and compatible with new Web3 advancements.",
      icon: FaShieldAlt,
    },
    {
      title: "Avoid Costly Mistakes",
      description: "Blockchain is complex, and poorly implemented solutions lead to downtime, exploits, or high costs. Our robust architecture ensures you avoid technical pitfalls and build on a solid foundation.",
      icon: FaCode,
    },
    {
      title: "Simple Integration, Immediate Results",
      description: "Our SDKs and step-by-step documentation make blockchain integration as easy as connecting to a traditional API. No need for Web3 expertise—get started in hours, not months.",
      icon: FaBolt,
    },
  ];


  return (
    <section className="bg-[#010205] relative overflow-hidden flex items-center justify-center px-2 md:px-4 text-white py-24">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0">
        {/* Dark gradient overlay */}
        <div className="absolute w-full h-full bg-gradient-to-b from-[#010205] via-[#010205]/90 to-[#010205]" />

        {/* Horizontal lines */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              initial={{ opacity: 0.2 }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                height: ['1px', '2px', '1px']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{ top: `${(i + 1) * 5}%` }}
              className="absolute w-full bg-[#0CC0DF]/40"
            />
          ))}
        </div>

        {/* Vertical lines */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              initial={{ opacity: 0.2 }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                width: ['1px', '2px', '1px']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{ left: `${(i + 1) * 5}%` }}
              className="absolute h-full bg-[#0CC0DF]/40"
            />
          ))}
        </div>
      </div>

      <motion.div
        className="w-full relative z-10 px-4 md:px-8 lg:px-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-center mb-32 mt-32">
          <div className="flex flex-col items-center w-full">
            <span className="text-white w-full md:w-[800px] border-t border-b border-white/60 py-4 text-4xl md:text-5xl lg:text-7xl px-4 md:px-0 font-jersey">PURPOSE BUILT FOR</span>
            <div className="h-8 md:h-16"></div>
            <span className="bg-[#14F195] text-black w-full md:w-[800px] text-4xl md:text-4xl px-4 md:px-0">Games Applications.</span>
            <div className="h-4 md:h-6"></div>
            {/* Vertical lines */}
            <div className="w-full md:w-[800px] h-4">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern id="warning-stripes" patternUnits="userSpaceOnUse" width="30" height="30" patternTransform="rotate(45)">
                  <rect width="30" height="15" fill="#14F195" />
                  <rect width="30" height="15" y="15" fill="#0d9d5f" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#warning-stripes)" />
              </svg>
            </div>
          </div>
        </h1>

        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-3 gap-8'} w-full max-w-6xl mx-auto`}>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col gap-3"
            >
              <div className="flex justify-center items-center w-24 h-24 mx-auto rounded-full bg-[#0CC0DF]/10">
                <card.icon className="w-12 h-12 text-[#0CC0DF]" />
              </div>

              <div className="text-left">
                <h2 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-[#0CC0DF] to-[#0CC0DF]/70 bg-clip-text text-transparent">
                  {card.title}
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
