'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Partner() {
  const partners = [
    {
      name: "Solana",
      image: "/solana.png"
    },
    {
      name: "Ethereum", 
      image: "/coin.png"
    },
    {
      name: "Polygon",
      image: "/coin.png"
    }
  ]

  return (
    <section className="bg-[#010205] relative overflow-hidden py-24">
      <div className="absolute inset-0">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#010205] via-[#010205]/90 to-[#010205]" />
      </div>

      <div className="relative z-10">
        <h2 className="text-sm md:text-base text-center mb-16"><span className="text-white">Protocols and Infrastructure</span> <span className="bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">We Follow</span></h2>

        <div className="relative flex overflow-x-hidden">
          <motion.div
            className="flex space-x-16 whitespace-nowrap"
            animate={{
              x: ["0%", "-50%"]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 10,
                ease: "linear",
              },
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="relative w-48 h-48 flex items-center justify-center"
              >
                <div className="relative w-32 h-32">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-contain filter brightness-100 hover:brightness-125 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
