'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Auth } from '../../app/auth'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, PerspectiveCamera } from '@react-three/drei'
import Details from './details'
import { FaDesktop, FaMobile, FaGamepad, FaGlobe, FaStore, FaWallet } from 'react-icons/fa'
import GamesDashboard from './gamesDashboard'
import Marketplace from './marketplace'
import Wallet from './wallet'

interface Game {
  id: string
  title: string
  image: string
  platform: 'desktop' | 'mobile' | 'console'
  rewards: number
  description: string
  link: string
  developer?: string
  publisher?: string
  releaseDate?: string
  genre?: string
  intro?: string
  trailer?: string
  gameplay?: string
  models?: {
    playToEarn?: {
      enabled: boolean
      price?: string
    }
    freeToPlay?: {
      enabled: boolean
      price?: string
    }
    stakeToEarn?: {
      enabled: boolean
      price?: string
    }
  }
}

const games: Game[] = [
  {
    id: '1',
    title: 'GTA V',
    image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%205.jpeg',
    platform: 'desktop',
    rewards: 500,
    description: 'Battle royale in a neon cyberpunk world',
    link: 'https://www.halowaypoint.com/en-gb',
    developer: 'Rockstar North',
    publisher: 'Rockstar Games',
    releaseDate: '2013',
    genre: 'Action-Adventure',
    intro: 'Welcome to Los Santos, a vast sun-soaked metropolis full of self-help gurus, starlets, and fading celebrities...',
    trailer: 'https://www.youtube.com/embed/QkkoHAzjnUs',
    gameplay: 'https://www.youtube.com/embed/3DBrG2YjqQA',
    models: {
      playToEarn: {
        enabled: true,
        price: "60"
      },
      freeToPlay: {
        enabled: true,
        price: "0"
      },
      stakeToEarn: {
        enabled: true,
        price: "6%"
      }
    }
  },
  {
    id: '2',
    title: 'Rainbow Six',
    image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%204.jpeg',
    platform: 'mobile',
    rewards: 300,
    description: 'High-stakes racing in the metaverse',
    link: 'https://www.halowaypoint.com/en-gb',
    developer: 'Ubisoft Montreal',
    publisher: 'Ubisoft',
    releaseDate: '2015',
    genre: 'Tactical Shooter',
    intro: 'Rainbow Six Siege is an intense, new approach to the first-person shooter experience...',
    trailer: 'https://www.youtube.com/embed/6wlvYh0h63k',
    gameplay: 'https://www.youtube.com/embed/kqDwcjF5gW8',
    models: {
      playToEarn: {
        enabled: false,
        price: "0"
      },
      freeToPlay: {
        enabled: true,
        price: "0"
      },
      stakeToEarn: {
        enabled: false,
        price: "0"
      }
    }
  },
  {
    id: '3',
    title: 'Moba War',
    image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%206.jpeg',
    platform: 'console',
    rewards: 400,
    description: 'Trading card battles with NFT rewards',
    link: 'https://www.halowaypoint.com/en-gb',
    developer: 'MetaGames Studio',
    publisher: 'MetaLoot Games',
    releaseDate: '2023',
    genre: 'MOBA',
    intro: 'Enter a world where strategy meets blockchain in this revolutionary mobile MOBA...',
    trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    gameplay: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    models: {
      playToEarn: {
        enabled: false,
        price: "0" 
      },
      freeToPlay: {
        enabled: true,
        price: "0"
      },
      stakeToEarn: {
        enabled: false,
        price: "0"
      }
    }
  },
  {
    id: '4',
    title: 'Day Gone',
    image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%207.jpeg',
    platform: 'console',
    rewards: 400,
    description: 'Trading card battles with NFT rewards',
    link: 'https://www.halowaypoint.com/en-gb',
    developer: 'Bend Studio',
    publisher: 'Sony Interactive',
    releaseDate: '2019',
    genre: 'Action-Adventure',
    intro: 'Ride and fight into a deadly, post pandemic America. Play as Deacon St. John, a drifter and bounty hunter...',
    trailer: 'https://www.youtube.com/embed/FKtaOY9lMvM',
    gameplay: 'https://www.youtube.com/embed/qh8yJMN9Wts',
    models: {
      playToEarn: {
        enabled: false,
        price: "0"  
      },
      freeToPlay: {
        enabled: true,
        price: "0"
      },
      stakeToEarn: {
        enabled: false,
        price: "0"      
      }
    }
  }
]

const platformIcons = {
  games: <FaGamepad size={64} />,
  marketplace: <FaStore size={64} />,
  wallet: <FaWallet size={64} />
}

export default function Dashboard() {
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [mtlBalance, setMtlBalance] = useState<number>(0)
  const [selectedPlatform, setSelectedPlatform] = useState<'games' | 'marketplace' | 'wallet'>('games')

  useEffect(() => {
    const getWalletDetails = async () => {
      const supabase = await Auth
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setWalletAddress(user.email || '')
        setMtlBalance(1250)
      }
    }
    getWalletDetails()
  }, [])

  return (
    <div className="min-h-screen bg-[#020309] text-white">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <Environment preset="night" />
          <Float
            speed={1.5}
            rotationIntensity={0.5}
            floatIntensity={0.5}
          >
            <mesh>
              <torusKnotGeometry args={[9, 2, 256, 32]} />
              <meshStandardMaterial
                color="#0CC0DF"
                emissive="#0CC0DF"
                emissiveIntensity={0.5}
                transparent
                opacity={0.1}
                wireframe
              />
            </mesh>
          </Float>
        </Canvas>
      </div>

      <div className="relative z-10 p-6">
        {/* Wallet Info */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#0CC0DF]/20 via-[#0CC0DF]/10 to-transparent 
                     backdrop-blur-md rounded-xl p-6 mb-8 border border-[#0CC0DF]/20"
        >
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#0CC0DF] to-white">
            Player One Dashboard
          </h2>
          <div className="flex flex-col md:flex-row justify-between">
            <p className="text-[#0CC0DF] font-mono text-lg">
              Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </p>
            <p className="text-[#0CC0DF] font-bold text-lg">
              ${mtlBalance} MTL
            </p>
          </div>
        </motion.div>

        {/* Platform Filter */}
        <div className="flex gap-24 mb-26 p-24">
          {Object.entries(platformIcons).map(([platform, icon]) => (
            <motion.button
              key={platform}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPlatform(platform as 'games' | 'marketplace' | 'wallet')}
              className={`px-24 py-16 rounded-[3rem] backdrop-blur-sm relative
                ${selectedPlatform === platform
                  ? 'border-4 border-[#0CC0DF] text-[#0CC0DF] shadow-lg shadow-[#0CC0DF]/30'
                  : 'border-2 border-white/30 text-white'} 
                before:content-[""] before:absolute before:inset-0 before:rounded-[3rem] 
                before:bg-gradient-to-r before:from-gray-900 before:to-gray-800 before:z-[-1]
                hover:border-[#0CC0DF]/60 transition-colors duration-300`}
            >
              {icon}
            </motion.button>
          ))}
        </div>

        {/* Content Based on Selected Platform */}
        <div>
          {selectedPlatform === 'games' && <GamesDashboard games={games} />}
          {selectedPlatform === 'marketplace' && <Marketplace />}
          {selectedPlatform === 'wallet' && <Wallet/>}
        </div>
      </div>
    </div>
  )
}
