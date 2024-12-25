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
      className="mt-8 grid grid-cols-4 gap-6"
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
          </div>
        )}

        {/* <div className="flex items-center gap-2 mb-4">
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
        </div> */}
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
            title={`${game.name} Trailer`}
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
            title={`${game.name} Gameplay`}
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
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <h3 className="text-white text-xl font-bold">Game Stats</h3>
        </div>
        <div className="border-b border-[#0CC0DF]/30 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          {game.models?.playToEarn?.enabled && (
            <motion.div
              whileHover={{ scale: 1.02 }}
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
              <div className="flex flex-col gap-1">
                <div className="flex items-center space-x-1">
                  <span className="text-white font-bold text-sm">Play to Earn</span>
                  <span className="text-yellow-200">🔥</span>
                </div>
                <div className="text-white font-bold text-lg">
                  {game.models.playToEarn.price} MTL
                </div>
              </div>
            </motion.div>
          )}
          {game.models?.stakeToEarn?.enabled && (
            <motion.div
              whileHover={{ scale: 1.02 }}
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
              <div className="flex flex-col gap-1">
                <div className="flex items-center space-x-1">
                  <span className="text-white font-bold text-sm">Stake to Earn</span>
                  <span className="text-purple-200">💎</span>
                </div>
                <div className="text-white font-bold text-lg">
                  {game.models.stakeToEarn.price} APR
                </div>
              </div>
            </motion.div>
          )}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 p-4 rounded-xl shadow-lg"
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
            <div className="flex flex-col gap-1">
              <div className="flex items-center space-x-1">
                <span className="text-white font-bold text-sm">Times Played</span>
                <span className="text-blue-200">🎮</span>
              </div>
              <div className="text-white font-bold text-lg">
                {game.played}
              </div>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-4 rounded-xl shadow-lg"
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
            <div className="flex flex-col gap-1">
              <div className="flex items-center space-x-1">
                <span className="text-white font-bold text-sm">Total Rewards</span>
                <span className="text-green-200">💰</span>
              </div>
              <div className="text-white font-bold text-lg">
                {game.rewarded} MTL
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
