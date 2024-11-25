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
    <section className="h-screen bg-gradient-to-br from-gray-900 to-black relative overflow-hidden flex items-center">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-primary rounded-full animate-pulse" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-secondary rounded-full animate-pulse animation-delay-1000" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16"
        >
          {/* <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
            Our
          </span> */}
          <span className="bg-gradient-to-l from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
          Journey to Evolution
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 h-[60vh] md:h-auto">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, zIndex: 20 }}
              className="relative bg-base-200/20 backdrop-blur-sm rounded-xl overflow-hidden group h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="p-3 md:p-6 h-full flex flex-col items-center justify-center">
                <motion.div 
                  className="text-2xl md:text-4xl mb-2 md:mb-4"
                  whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  {phase.icon}
                </motion.div>
                
                <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-3 text-primary text-center">
                  {phase.title}
                </h3>
                
                <p className="text-xs md:text-sm text-gray-300 text-center">
                  {phase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}