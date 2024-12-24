'use client'

import { Game } from '@/app/context/MtlContext'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface DetailsProps {
  game: Game
}

export default function Details({ game }: DetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 grid grid-cols-3 gap-6"
    >
      <motion.div
        whileHover={{ scale: 1.02, borderColor: '#0CC0DF' }}
        className="bg-gradient-to-r from-gray-900 to-gray-800
                   backdrop-blur-md rounded-xl p-6 border-2 border-gray-700 transition-colors duration-300"
      >
        {game.models && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0CC0DF]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              <h3 className="text-white text-xl font-bold">Earning Models</h3>
            </div>
            <div className="border-b border-[#0CC0DF]/30 mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              {game.models.playToEarn?.enabled && (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-4 rounded-xl shadow-lg"
                >
                  <motion.div
                    className="absolute inset-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: [-200, 400],
                    }}
                    transition={{
                      duration: 2,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-bold text-lg">Play to Earn</span>
                      <div className="animate-bounce">
                        <span className="text-yellow-200">🔥</span>
                      </div>
                    </div>
                    <div className="text-white font-bold text-2xl">
                      ${game.models.playToEarn.price || 0}
                    </div>
                  </div>
                </motion.div>
              )}
              {game.models.stakeToEarn?.enabled && (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 p-4 rounded-xl shadow-lg"
                >
                  <motion.div
                    className="absolute inset-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: [-200, 400],
                    }}
                    transition={{
                      duration: 2,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-bold text-lg">Stake to Earn</span>
                      <div className="animate-bounce">
                        <span className="text-purple-200">💎</span>
                      </div>
                    </div>
                    <div className="text-white font-bold text-2xl">
                      ${game.models.stakeToEarn.price || 0}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0CC0DF]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
          <h3 className="text-white text-xl font-bold">Game Info</h3>
        </div>
        <div className="border-b border-[#0CC0DF]/30 mb-4"></div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[#0CC0DF] text-sm font-medium mb-1">Developer</p>
            <p className="text-white">{game.developer}</p>
          </div>
          <div>
            <p className="text-[#0CC0DF] text-sm font-medium mb-1">Publisher</p>
            <p className="text-white">{game.publisher}</p>
          </div>
          <div>
            <p className="text-[#0CC0DF] text-sm font-medium mb-1">Release Date</p>
            <p className="text-white">{game.releaseDate}</p>
          </div>
          <div>
            <p className="text-[#0CC0DF] text-sm font-medium mb-1">Genre</p>
            <p className="text-white">{game.genre}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02, borderColor: '#0CC0DF' }}
        className="bg-gradient-to-r from-gray-900 to-gray-800
                   backdrop-blur-md rounded-xl p-6 border-2 border-gray-700 transition-colors duration-300"
      >
        <div className="flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0CC0DF]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          <h3 className="text-white text-xl font-bold">Official Trailer</h3>
        </div>
        <div className="border-b border-[#0CC0DF]/30 mb-4"></div>
        <div className="aspect-video w-full">
          <iframe
            className="w-full h-full rounded-xl"
            src={game.trailer}
            title={`${game.title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02, borderColor: '#0CC0DF' }}
        className="bg-gradient-to-r from-gray-900 to-gray-800
                   backdrop-blur-md rounded-xl p-6 border-2 border-gray-700 transition-colors duration-300"
      >
        <div className="flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0CC0DF]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6H7v6h6V6z" />
            <path fillRule="evenodd" d="M7 4a1 1 0 00-1 1v10a1 1 0 001 1h6a1 1 0 001-1V5a1 1 0 00-1-1H7zm8 12V4h3a1 1 0 011 1v10a1 1 0 01-1 1h-3zM2 5a1 1 0 011-1h3v12H3a1 1 0 01-1-1V5z" clipRule="evenodd" />
          </svg>
          <h3 className="text-white text-xl font-bold">Gameplay Preview</h3>
        </div>
        <div className="border-b border-[#0CC0DF]/30 mb-4"></div>
        <div className="aspect-video w-full">
          <iframe
            className="w-full h-full rounded-xl"
            src={game.gameplay}
            title={`${game.title} Gameplay`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
