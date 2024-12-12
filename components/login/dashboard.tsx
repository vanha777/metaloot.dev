'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Auth } from '../../app/auth'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, PerspectiveCamera } from '@react-three/drei'
import Details from './details'

interface Game {
  id: string
  title: string
  image: string
  platform: 'ios' | 'mobile' | 'desktop'
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
    playToEarn?: boolean
    payToPlay?: boolean
    freeToPlay?: boolean
    stakeToEarn?: boolean
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
      playToEarn: false,
      payToPlay: true,
      freeToPlay: true,
      stakeToEarn: false
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
      playToEarn: false,
      payToPlay: true,
      freeToPlay: true,
      stakeToEarn: false
    }
  },
  {
    id: '3',
    title: 'Moba War',
    image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%206.jpeg', 
    platform: 'ios',
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
      playToEarn: false,
      payToPlay: true,
      freeToPlay: true,
      stakeToEarn: false
    }
  },
  {
    id: '4',
    title: 'Day Gone',
    image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%207.jpeg', 
    platform: 'ios',
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
      playToEarn: false,
      payToPlay: true,
      freeToPlay: true,
      stakeToEarn: false
    }
  }
]

export default function Dashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [mtlBalance, setMtlBalance] = useState<number>(0)
  const [filteredGames, setFilteredGames] = useState<Game[]>(games)
  const [focusedGame, setFocusedGame] = useState<Game | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [activeTab, setActiveTab] = useState<'details' | 'trailer' | 'gameplay'>('details')

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

  useEffect(() => {
    if (selectedPlatform === 'all') {
      setFilteredGames(games)
    } else {
      setFilteredGames(games.filter(game => game.platform === selectedPlatform))
    }
    setFocusedGame(null)
  }, [selectedPlatform])

  const handleGameLaunch = (link: string) => {
    window.open(link, '_blank')
  }

  const handleGameFocus = (game: Game) => {
    setFocusedGame(focusedGame?.id === game.id ? null : game)
    setActiveTab('details')
  }

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
              Wallet: {walletAddress.slice(0,6)}...{walletAddress.slice(-4)}
            </p>
            <p className="text-[#0CC0DF] font-bold text-lg">
              ${mtlBalance} MTL
            </p>
          </div>
        </motion.div>

        {/* Platform Filter */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['all', 'desktop', 'mobile', 'ios'].map(platform => (
            <motion.button
              key={platform}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(12, 192, 223, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPlatform(platform)}
              className={`px-8 py-3 rounded-full capitalize whitespace-nowrap backdrop-blur-sm
                ${selectedPlatform === platform 
                  ? 'bg-[#0CC0DF] text-white shadow-lg shadow-[#0CC0DF]/30' 
                  : 'bg-[#0CC0DF]/10 text-[#0CC0DF] border border-[#0CC0DF]/30'}`}
            >
              {platform}
            </motion.button>
          ))}
        </div>

        {/* Horizontal Game Carousel */}
        <div className="relative">
          <motion.div 
            className="flex space-x-6 px-4 overflow-x-auto pb-8"
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
          >
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                className={`relative flex-shrink-0 cursor-pointer transition-all duration-300
                           ${focusedGame?.id === game.id ? 'w-[500px] h-[700px]' : 'w-[300px] h-[450px]'}`}
                onClick={() => handleGameFocus(game)}
                layout
              >
                <div className="relative h-full rounded-2xl overflow-hidden 
                               bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm
                               border border-[#0CC0DF]/20">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 w-full p-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-3xl font-bold text-white">{game.title}</h3>
                      <span className="text-[#0CC0DF] font-bold text-xl">
                        ${game.rewards} MTL
                      </span>
                    </div>
                    <p className="text-gray-300 mb-6 text-lg">{game.description}</p>
                    {focusedGame?.id === game.id && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleGameLaunch(game.link)}
                        className="w-full bg-[#0CC0DF] hover:bg-[#0AA0BF] text-white 
                                 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3
                                 shadow-lg shadow-[#0CC0DF]/30 text-lg"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Launch Game
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Game Details Section */}
        {focusedGame && (
          <Details focusedGame={focusedGame} />
        )}
      </div>
    </div>
  )
}
