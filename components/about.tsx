'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function About() {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <div className="hero min-h-screen bg-base-200 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay={isPlaying}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Screen%20Recording%202024-11-25%20at%2012.27.45%20PM.mov?t=2024-11-25T02%3A30%3A22.014Z" type="video/mp4" />
        </video>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-base-200 via-base-200/50 to-transparent" />
      </div>

      <div className="hero-content text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="mb-8 text-5xl lg:text-7xl font-black">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
              Our
            </span>
            <span className="bg-gradient-to-l from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
              Vision
            </span>
          </h1>

          {!isPlaying ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(true)}
              className="btn btn-circle btn-lg bg-primary/20 backdrop-blur-sm border-2 border-primary hover:bg-primary/30"
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
              className="btn btn-circle btn-lg bg-primary/20 backdrop-blur-sm border-2 border-primary hover:bg-primary/30"
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