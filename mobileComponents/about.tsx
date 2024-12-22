'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function About() {
  const [isPlaying, setIsPlaying] = useState(true)

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

      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay={isPlaying}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/vision.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020309] via-[#020309]/50 to-transparent" />
      </div>

      <div className="hero-content text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="mb-8 text-5xl lg:text-7xl font-black">
            <span className="text-[#0CC0DF]">
              Our
            </span>
            {" "}
            <span className="text-[#0CC0DF]">
              Vision
            </span>
          </h1>

          {!isPlaying ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(true)}
              className="btn btn-circle btn-lg bg-[#0CC0DF]/20 backdrop-blur-sm border-2 border-[#0CC0DF] hover:bg-[#0CC0DF]/30"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-12 h-12"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>
          ) : (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(false)}
              className="btn btn-circle btn-lg bg-[#0CC0DF]/20 backdrop-blur-sm border-2 border-[#0CC0DF] hover:bg-[#0CC0DF]/30"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-12 h-12"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  )
}