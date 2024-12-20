'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import ThreeComponent from './3d'
import { useState, useEffect } from 'react'
export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // const connectWallet = async () => {
  //   const solana = (window as any).solana;
  //   if (solana) {
  //     try {
  //       const resp = await solana.connect();
  //       if (resp.publicKey) {
  //         console.log(resp.publicKey.toString());
  //         setUser({ publicKey: resp.publicKey.toString() }); // Save user info
  //         window.location.href = '/login'; // Redirect to login page
  //         return resp.publicKey.toString();
  //       }
  //     } catch (err) {
  //       console.error("User rejected the request or another error:", err);
  //     }
  //   }
  // };

  const connectWallet = async () => {
    // window.location.href = '/login'; // Redirect to login page
  };

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

      {/* Download buttons in top right */}
      <div className="absolute top-4 right-4 flex gap-2 z-30">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-sm md:btn-md btn-outline border-[#0CC0DF] text-[#0CC0DF] hover:bg-[#0CC0DF] hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 mr-1 md:mr-2" viewBox="0 0 384 512">
            <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>
          App Store
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-sm md:btn-md btn-outline border-[#0CC0DF] text-[#0CC0DF] hover:bg-[#0CC0DF] hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 mr-1 md:mr-2" viewBox="0 0 512 512">
            <path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
          </svg>
          Play Store
        </motion.button>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between h-full relative z-20 px-4">
        {/* Text content positioned on left */}
        <div className={`${isMobile ? 'w-full pt-20' : 'lg:w-1/2'} text-left lg:px-8`}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black mb-4 md:mb-8">
              <span className="text-[#0CC0DF]">
                Meta
              </span>
              <span className="text-[#0CC0DF]">
                Loot
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-2xl text-[#a0a0a0] font-bold drop-shadow-[0_0_15px_rgba(0,0,0,0.9)] mb-6 md:mb-8">
              Every battle counts. Every drop matters. Portal your hard-earned items across games, secured forever on-chain.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={connectWallet}
              className="btn btn-md lg:btn-lg bg-[#0CC0DF] hover:bg-[#0AA0BF] text-white font-bold text-lg lg:text-xl px-8 lg:px-12 rounded-full"
            >
              Try MetaLian Dawn Now
            </motion.button>
          </motion.div>
        </div>

        {/* Portal system on right */}
        <div className={`${isMobile ? 'w-full h-[50vh]' : 'lg:w-1/2 h-[80vh]'} relative z-10`}>
          <ThreeComponent chatBotState="idle" actions={["Take 001"]} />
        </div>
      </div>
    </div>
  )
}