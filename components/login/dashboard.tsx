'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Auth } from '../../app/auth'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, PerspectiveCamera } from '@react-three/drei'
import Details from './details'
import { FaDesktop, FaMobile, FaGamepad, FaGlobe, FaStore, FaWallet, FaAffiliatetheme, FaSignOutAlt } from 'react-icons/fa'
import GamesDashboard from './gamesDashboard'
import Marketplace from './marketplace'
import Wallet from './wallet'
import { useUser } from '../../app/context/userContext';
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
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
        enabled: true,
        price: "60"
      },
      stakeToEarn: {
        enabled: true,
        price: "6%"
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
        enabled: true,
        price: "60"
      },
      stakeToEarn: {
        enabled: true,
        price: "6%"
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
        enabled: true,
        price: "60"
      },
      stakeToEarn: {
        enabled: true,
        price: "6%"
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
  const { user, setUser } = useUser();
  const [selectedPlatform, setSelectedPlatform] = useState<'games' | 'marketplace' | 'wallet'>('games')
  const [showDropdown, setShowDropdown] = useState(false)

  //const TOKEN_MINT_ADDRESS = "Hq1mb3fkB98g4vgk7ViPAmZFVaFVsw8GeQc8bWzBmm92"; // e.g., "So11111111111111111111111111111111111111112" for SOL
  const TOKEN_MINT_ADDRESS = "813b3AwivU6uxBicnXdZsCNrfzJy4U3Cr4ejwvH4V1Fz";
  const connectWallet = async () => {
    const solana = (window as any).solana;
    if (solana) {
      try {
        const resp = await solana.connect();
        if (resp.publicKey) {
          const publicKey = resp.publicKey.toString();
          // Check the user's balance for the specific token
          const tokenBalance = await getTokenBalance(publicKey, TOKEN_MINT_ADDRESS);
          return { publicKey, mtl: tokenBalance.toString() };
        }
      } catch (err) {
        console.error("User rejected the request or another error occurred:", err);
      }
    } else {
      console.error("Please install Phantom wallet");
    }
  };

  // Function to get the balance of a specific token for a given wallet address
  const getTokenBalance = async (walletAddress: string, tokenMintAddress: string) => {
    try {
      // Use devnet instead of mainnet-beta to avoid 403 errors
      const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
      const ownerPublicKey = new PublicKey(walletAddress);
      const mintPublicKey = new PublicKey(tokenMintAddress);

      // Fetch all token accounts owned by the wallet
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerPublicKey, {
        mint: mintPublicKey,
      });

      // Sum up balances from all accounts holding the specified token
      const tokenBalance = tokenAccounts.value.reduce((sum, accountInfo) => {
        const amount = accountInfo.account.data.parsed.info.tokenAmount.uiAmount;
        return sum + amount;
      }, 0);

      return tokenBalance;
    } catch (error) {
      console.error("Failed to fetch token balance:", error);
      return 0;
    }
  };

  // const connectWallet = async () => {
  //   const solana = (window as any).solana;
  //   if (solana) {
  //     try {
  //       const resp = await solana.connect();
  //       if (resp.publicKey) {
  //         const publicKey = resp.publicKey.toString();
  //         setUser({ publicKey });
  //         return publicKey;
  //       }
  //     } catch (err) {
  //       console.error("User rejected the request or another error:", err);
  //     }
  //   }
  // };

  const disconnectWallet = async () => {
    const solana = (window as any).solana;
    if (solana) {
      try {
        await solana.disconnect();
        setUser(null);
        setShowDropdown(false);
        console.log("Wallet disconnected");
      } catch (err) {
        console.error("Error disconnecting wallet:", err);
      }
    }
  };

  useEffect(() => {
    const checkAndConnectWallet = async () => {
      // Check if Phantom is installed
      const solana = (window as any).solana;
      if (!solana) {
        console.error("Please install Phantom wallet");
        return;
      }

      // If user is not connected, try to connect
      if (!user?.publicKey) {
        const address = await connectWallet();
        if (address) {
          console.log("This is user", address);
          setUser({ publicKey: address.publicKey, mtl: address.mtl });
        }
      } else {
        // If user is already connected, set the wallet address
      }
    };

    checkAndConnectWallet();
  }, []); // Add user as dependency to re-run when user state changes 

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <Environment preset="sunset" />
          <Float
            speed={2}
            rotationIntensity={1}
            floatIntensity={1}
          >
            <mesh>
              <torusKnotGeometry args={[9, 2.5, 300, 40]} />
              <meshStandardMaterial
                color="#0CC0DF"
                emissive="#0CC0DF"
                emissiveIntensity={1}
                transparent
                opacity={0.3}
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
          className="flex items-center justify-between p-6 mb-8"
        >
          <div className="flex items-center gap-6">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-16 h-16 rounded-full bg-[#0CC0DF]/10 flex items-center justify-center relative"
              >
                <FaGamepad className="text-[#0CC0DF] w-20 h-20" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              </button>

              {showDropdown && (
                <div className="absolute top-full mt-2 w-48 bg-[#0A1628] border border-[#0CC0DF] rounded-lg shadow-lg">
                  <button
                    onClick={disconnectWallet}
                    className="w-full px-4 py-2 text-left hover:bg-[#0CC0DF]/10 flex items-center gap-2"
                  >
                    <FaSignOutAlt className="text-[#0CC0DF]" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-medium text-white/80">
                {user?.publicKey ? `${user.publicKey.slice(0, 6)}...${user.publicKey.slice(-4)}` : 'Not Connected'}
              </h2>
              <p className="text-sm text-white/60">Testnet</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-[#0CC0DF]/10 flex items-center justify-center relative">
              <FaAffiliatetheme className="text-[#0CC0DF] w-12 h-12" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#0CC0DF] rounded-full flex items-center justify-center text-sm font-bold">
                +5
              </div>
            </div>
          </div>



          <div className="flex items-center gap-6">
            <button
              onClick={() => setSelectedPlatform('wallet')}
              className="w-16 h-16 rounded-full bg-[#0CC0DF]/10 flex items-center justify-center relative overflow-hidden group cursor-pointer"
            >
              <Image
                src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/MTL.png"
                alt="MTL Logo"
                width={80}
                height={80}
                className="group-hover:scale-110 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-[#0CC0DF]/20 group-hover:bg-transparent transition-colors duration-200"></div>
            </button>
            <div>
              <p className="text-2xl font-bold text-white/80">
                <span className="text-[#0CC0DF]">$ </span>
                {user?.mtl}
              </p>
              <p className="text-sm text-white/60">Phase Metalian Dawn</p>
            </div>
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
                  ? 'border-4 border-[#0CC0DF] text-[#0CC0DF] shadow-lg shadow-[#0CC0DF]/50'
                  : 'border-2 border-white/50 text-white'} 
                before:content-[""] before:absolute before:inset-0 before:rounded-[3rem] 
                before:bg-gradient-to-r before:from-[#0A1628] before:to-[#162A44] before:z-[-1]
                hover:border-[#0CC0DF]/80 transition-colors duration-300`}
            >
              {icon}
            </motion.button>
          ))}
        </div>

        {/* Content Based on Selected Platform */}
        <div>
          {selectedPlatform === 'games' && <GamesDashboard games={games} />}
          {selectedPlatform === 'marketplace' && <Marketplace />}
          {selectedPlatform === 'wallet' && <Wallet />}
        </div>
      </div>
    </div>
  )
}
