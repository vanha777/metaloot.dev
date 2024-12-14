'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { FaCoins } from 'react-icons/fa'

interface WalletProps {
  walletAddress: string
  mtlBalance: number
  nfts: {
    id: string
    name: string
    image: string
    rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
    type: 'Character' | 'Weapon' | 'Item'
  }[]
}

export default function Wallet({ walletAddress, mtlBalance, nfts }: WalletProps) {
  return (
    <div className="p-6 space-y-8">
      {/* MTL Currency Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm 
                   rounded-xl p-6 border border-[#0CC0DF]/20"
      >
        <div className="flex items-center gap-4 mb-4">
          <FaCoins className="text-[#0CC0DF]" size={24} />
          <div>
            <h3 className="text-xl font-bold">MTL Token</h3>
            <p className="text-gray-300">Your Balance</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-300">Available</p>
            <p className="text-xl font-bold">{mtlBalance} MTL</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-300">Value</p>
            <p className="text-xl font-bold">${(mtlBalance * 1).toLocaleString()}</p>
          </div>
        </div>
      </motion.div>

      {/* NFTs Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your NFTs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <motion.div
              key={nft.id}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm 
                         rounded-xl p-4 border border-[#0CC0DF]/20"
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image src={nft.image} alt={nft.name} fill className="object-cover" />
                <div className="absolute top-2 right-2 bg-[#0CC0DF] px-3 py-1 rounded-full">
                  {nft.rarity}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{nft.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-[#0CC0DF]">{nft.type}</span>
                <div className="flex gap-2">
                  <button className="bg-[#0CC0DF] px-4 py-2 rounded-lg">Trade</button>
                  <button className="bg-gray-800 px-4 py-2 rounded-lg border border-[#0CC0DF]/20">View</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
