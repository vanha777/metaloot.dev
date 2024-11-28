'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function Statements() {
  const [cardOrder, setCardOrder] = useState([0, 1, 2])

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
      title: "Play-to-Earn Gaming",
      description: "Imagine your in-game currency can be converted to real-world assets.",
      image: "https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%2016.jpeg"
    },
    {
      title: "NFT Marketplace",
      description: "List, trade, buy, or cash out your in-game items.",
      image: "https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%2018.jpeg"
    },
    {
      title: "Cross-Chain Gaming",
      description: "Play one game and use your rewards on another game.",
      image: "https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%2017.jpeg"
    }
  ]

  return (
    <section className="min-h-screen bg-[#010205] relative overflow-hidden flex items-center justify-center px-2 md:px-4 text-white py-6 md:py-10">
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
        className="max-w-7xl w-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      > 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16 relative">
          {[0, 1, 2].map((index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={index === 1 ? { scale: 1.05, zIndex: 20 } : {}}
              style={{
                transform: index === 0 ? 'perspective(1000px) rotateY(45deg) translateX(60px)' : 
                          index === 2 ? 'perspective(1000px) rotateY(-45deg) translateX(-60px)' : 
                          'perspective(1000px)',
                transformOrigin: index === 0 ? 'right center' : index === 2 ? 'left center' : 'center'
              }}
              className={`relative h-[400px] rounded-xl overflow-hidden cursor-pointer transition-all duration-500
                ${index !== 1 ? 'pointer-events-none' : 'z-10'}
                shadow-[0_0_25px_rgba(12,192,223,0.4)]
              `}
              onClick={index === 1 ? rotateCards : undefined}
            >
              <Image
                src={cards[cardOrder[index]].image}
                alt={cards[cardOrder[index]].title}
                fill
                className="object-cover transition-transform duration-300"
              />
              
              {/* Enhanced overlay for side cards */}
              {index !== 1 && (
                <div className="absolute inset-0">
                  {/* Hexagonal pattern overlay */}
                  <div className="absolute inset-0" 
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0.3' fill='%230CC0DF'/%3E%3C/svg%3E")`,
                      backgroundSize: '30px 30px'
                    }}
                  />
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                  {/* Glowing lines */}
                  <div className="absolute inset-0 opacity-60"
                    style={{
                      background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(12,192,223,0.15) 10px, rgba(12,192,223,0.15) 20px)'
                    }}
                  />
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              {/* Enhanced magical stone effect for center card */}
              {index === 1 && (
                <motion.div
                  animate={{
                    boxShadow: ['0 0 30px #0CC0DF', '0 0 50px #0CC0DF', '0 0 30px #0CC0DF']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#0CC0DF] to-[#0CC0DF]/70"
                />
              )}

              <div className={`absolute bottom-0 left-0 right-0 p-6 ${index !== 1 ? 'opacity-60' : ''}`}>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#0CC0DF] to-[#0CC0DF]/70 bg-clip-text text-transparent">
                  {cards[cardOrder[index]].title}
                </h3>
                <p className="text-base text-gray-300">{cards[cardOrder[index]].description}</p>
              </div>

              {/* Enhanced portal frame effect for center card */}
              {index === 1 && (
                <motion.div 
                  animate={{
                    borderColor: ['rgba(12, 192, 223, 0.4)', 'rgba(12, 192, 223, 0.7)', 'rgba(12, 192, 223, 0.4)']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 border-4 rounded-xl"
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
