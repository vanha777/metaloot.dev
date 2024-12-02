'use client'

import { motion } from 'framer-motion'

const phases = [
  {
    title: "Metalian Dawn",
    description: "Exchange in-game items for real-world vouchers and coupons",
    icon: "🌅"
  },
  {
    title: "Metalian Forge", 
    description: "Platform token launch and NFT marketplace for vouchers",
    icon: "⚒️"
  },
  {
    title: "Metanomics",
    description: "Token ICO and ecosystem expansion",
    icon: "📈"
  },
  {
    title: "Digital Genesis",
    description: "Full integration of $LOOT token with fiat currency exchange",
    icon: "🌟"
  }
]

export default function Roadmap() {
  return (
    <div className="hero min-h-screen bg-[#020309] relative overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold text-center mb-16"
        >
          <span className="text-[#0CC0DF]">
            Journey to Evolution
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#0CC0DF]/10 backdrop-blur-sm rounded-xl overflow-hidden border border-[#0CC0DF]/30"
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
                </h3>
                
                <p className="text-gray-300 text-center">
                  {phase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}