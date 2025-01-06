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
      title: "Accelerate Development",
      description: "Cut months off your development cycle with our ready-to-use blockchain infrastructure. Focus on creating amazing gameplay while we handle the Web3 complexity.",
      icon: FaRocket
    },
    {
      title: "Reduce Operational Costs", 
      description: "Save on infrastructure and maintenance costs. Our managed blockchain services eliminate the need for specialized blockchain DevOps teams.",
      icon: FaPiggyBank
    },
    {
      title: "Scale With Confidence",
      description: "Our battle-tested infrastructure handles millions of transactions daily. Scale your game without worrying about blockchain performance bottlenecks.",
      icon: FaChartLine
    },
    {
      title: "Future-Proof Architecture",
      description: "Built on industry standards and best practices, our infrastructure evolves with the blockchain ecosystem, ensuring your game stays compatible and secure.",
      icon: FaShieldAlt
    },
    {
      title: "Minimize Technical Debt",
      description: "Avoid common blockchain implementation pitfalls with our optimized architecture. Build on a solid foundation that grows with your game.",
      icon: FaCode
    },
    {
      title: "Rapid Integration",
      description: "Get your game on-chain in days, not months. Our SDK and documentation make blockchain integration as simple as traditional web services.",
      icon: FaBolt
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
          <span className="text-white">Purpose built for</span>
          <br className="mb-4"/>
          <span className="bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">Games Applications</span>
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
