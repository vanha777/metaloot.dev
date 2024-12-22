'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const phases = [
  {
    title: "Metalian Dawn",
    description: "Transmute your virtual conquests into tangible rewards with real-world vouchers and coupons.",
    icon: "🔮",
    isActive: true
  },
  {
    title: "Metalian Forge", 
    description: "Ignite the fusion of platform tokens and NFTs, crafting a vibrant marketplace for exclusive digital vouchers.",
    icon: "🛠️🔥",
    isActive: false
  },
  {
    title: "Metanomics",
    description: "Launch the ICO of our token, expanding the ecosystem into a thriving digital economy.",
    icon: "🚀",
    isActive: false
  },
  {
    title: "Digital Genesis",
    description: "Achieve complete synthesis of the $MTL token with global fiat exchanges, heralding a new era of digital finance.",
    icon: "🌐",
    isActive: false
  }
]

export default function Roadmap() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isMobile, setIsMobile] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const targetDate = new Date('2024-12-25') // Christmas 2024
    
    const timer = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const nextPhase = () => {
    setCurrentPhase((prev) => (prev + 1) % phases.length)
  }

  const prevPhase = () => {
    setCurrentPhase((prev) => (prev - 1 + phases.length) % phases.length)
  }

  return (
    <div className="hero min-h-screen bg-[#020309] relative overflow-x-hidden">
      {/* Deep space background with electronic effects */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0CC0DF] via-black to-[#020309] opacity-10" />
        <div className="grid grid-cols-12 gap-4 absolute inset-0 opacity-20">
          {[...Array(48)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="h-1 bg-[#0CC0DF] rounded-full"
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="text-[#0CC0DF] text-lg sm:text-xl mb-4">Metalian Dawn Launches In</div>
          <div className="flex justify-center gap-2 sm:gap-4 text-white">
            <div className="bg-[#0CC0DF]/20 backdrop-blur-sm rounded-lg p-2 sm:p-4 min-w-[60px] sm:min-w-[80px]">
              <div className="text-xl sm:text-3xl font-bold">{timeLeft.days}</div>
              <div className="text-xs sm:text-sm">Days</div>
            </div>
            <div className="bg-[#0CC0DF]/20 backdrop-blur-sm rounded-lg p-2 sm:p-4 min-w-[60px] sm:min-w-[80px]">
              <div className="text-xl sm:text-3xl font-bold">{timeLeft.hours}</div>
              <div className="text-xs sm:text-sm">Hours</div>
            </div>
            <div className="bg-[#0CC0DF]/20 backdrop-blur-sm rounded-lg p-2 sm:p-4 min-w-[60px] sm:min-w-[80px]">
              <div className="text-xl sm:text-3xl font-bold">{timeLeft.minutes}</div>
              <div className="text-xs sm:text-sm">Minutes</div>
            </div>
            <div className="bg-[#0CC0DF]/20 backdrop-blur-sm rounded-lg p-2 sm:p-4 min-w-[60px] sm:min-w-[80px]">
              <div className="text-xl sm:text-3xl font-bold">{timeLeft.seconds}</div>
              <div className="text-xs sm:text-sm">Seconds</div>
            </div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 sm:mb-16"
        >
          <span className="text-[#0CC0DF]">
            Journey to Evolution
          </span>
        </motion.h2>

        {isMobile ? (
          <div className="relative px-4">
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="w-full"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`${phases[currentPhase].isActive ? 'bg-[#0CC0DF]/20' : 'bg-[#0CC0DF]/10'} backdrop-blur-sm rounded-xl overflow-hidden border border-[#0CC0DF]/30 mx-auto max-w-[280px]`}
              >
                <div className="p-4 flex flex-col items-center justify-center">
                  <motion.div
                    className="text-3xl mb-3"
                    whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    {phases[currentPhase].icon}
                  </motion.div>

                  <h3 className="text-lg font-bold mb-2 text-[#0CC0DF] text-center">
                    {phases[currentPhase].title}
                    {phases[currentPhase].isActive && <span className="ml-2 text-xs text-white bg-[#0CC0DF] px-2 py-0.5 rounded-full">Coming</span>}
                  </h3>

                  <p className="text-gray-300 text-sm text-center">
                    {phases[currentPhase].description}
                  </p>
                </div>
              </motion.div>

              {/* Navigation arrows */}
              <div className="absolute inset-y-0 -left-2 -right-2 flex justify-between items-center">
                <button onClick={prevPhase} className="p-1.5 bg-[#0CC0DF]/20 rounded-full backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0CC0DF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button onClick={nextPhase} className="p-1.5 bg-[#0CC0DF]/20 rounded-full backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0CC0DF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Dots indicator */}
              <div className="flex justify-center gap-1.5 mt-4">
                {phases.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all ${
                      currentPhase === index ? 'w-4 bg-[#0CC0DF]' : 'w-1.5 bg-[#0CC0DF]/30'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className={`${phase.isActive ? 'bg-[#0CC0DF]/20' : 'bg-[#0CC0DF]/10'} backdrop-blur-sm rounded-xl overflow-hidden border border-[#0CC0DF]/30`}
              >
                <div className="p-6 flex flex-col items-center justify-center">
                  <motion.div
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    {phase.icon}
                  </motion.div>

                  <h3 className="text-xl font-bold mb-3 text-[#0CC0DF] text-center">
                    {phase.title}
                    {phase.isActive && <span className="ml-2 text-sm text-white bg-[#0CC0DF] px-2 py-1 rounded-full">Coming</span>}
                  </h3>

                  <p className="text-gray-300 text-center">
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}