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
    <section className="py-20 bg-base-300">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Roadmap
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="card bg-base-200 shadow-xl"
            >
              <div className="card-body">
                <div className="text-4xl mb-4">{phase.icon}</div>
                <h3 className="card-title text-primary">{phase.title}</h3>
                <p>{phase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 