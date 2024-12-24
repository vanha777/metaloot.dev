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
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Game, useMTL } from '../../app/context/MtlContext'

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
    rank: 1,
    releaseDate: '2013',
    genre: 'Action-Adventure',
    intro: 'Welcome to Los Santos, a vast sun-soaked metropolis full of self-help gurus, starlets, and fading celebrities...',
    trailer: 'https://www.youtube.com/embed/QkkoHAzjnUs',
    gameplay: 'https://www.youtube.com/embed/3DBrG2YjqQA',
    models: {
      playToEarn: {
        enabled: true,
        price: 60
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
    platform: 'desktop',
    rewards: 300,
    description: 'High-stakes racing in the metaverse',
    link: 'https://www.halowaypoint.com/en-gb',
    developer: 'Ubisoft Montreal',
    publisher: 'Ubisoft',
    releaseDate: '2015',
    rank:2,
    genre: 'Tactical Shooter',
    intro: 'Rainbow Six Siege is an intense, new approach to the first-person shooter experience...',
    trailer: 'https://www.youtube.com/embed/6wlvYh0h63k',
    gameplay: 'https://www.youtube.com/embed/kqDwcjF5gW8',
    models: {
      playToEarn: {
        enabled: true,
        price: 60
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
    rank:3,
    releaseDate: '2023',
    genre: 'MOBA',
    intro: 'Enter a world where strategy meets blockchain in this revolutionary mobile MOBA...',
    trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    gameplay: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    models: {
      playToEarn: {
        enabled: true,
        price: 60
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
    rank:4,
    genre: 'Action-Adventure',
    intro: 'Ride and fight into a deadly, post pandemic America. Play as Deacon St. John, a drifter and bounty hunter...',
    trailer: 'https://www.youtube.com/embed/FKtaOY9lMvM',
    gameplay: 'https://www.youtube.com/embed/qh8yJMN9Wts',
    models: {
      playToEarn: {
        enabled: true,
        price: 60
      },
      stakeToEarn: {
        enabled: true,
        price: "6%"
      }
    }
  },
  {
    id: '5',
    title: 'Speed Master',
    image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Untitled%20design-9.png',
    platform: 'mobile',
    rewards: 400,
    description: "Accelerate to Dominate in Speed Master - the Ultimate Car Racing Challenge! Speed Master is not just another car game; it's your ticket to an adrenaline-pumping journey on an endless track. Imagine this: the roar of engines, the thrill of speed, and a road that stretches into eternity. You're not just driving; you're competing. Collect cash, dodge obstacles, and smash through competitors to upgrade your ride. Every hit scores points, pushing you closer to the ultimate upgrade. It's fast, furious, and utterly addictive. Your mission? To outpace, outsmart, and outlast your rivals in a high-speed quest for glory. So, buckle up and get ready to unleash the Speed Master within!'",
    link: 'https://play.famobi.com/speed-master/A1000-10',
    developer: '©2014-2024 HTML5games.com',
    publisher: 'Famobi',
    releaseDate: 'N/A',
    rank:5,
    genre: 'Arcade',
    intro: "Accelerate to Dominate in Speed Master",
    trailer: 'https://www.youtube.com/embed/jQPYGCzCg9I?si=bFHwDpJQDWd0kkZv',
    gameplay: 'https://www.youtube.com/embed/7pxSOGn9Wrk?si=IHhmDjKQZUM8rku-',
    models: {
      playToEarn: {
        enabled: true,
        price: 100
      }
    }
  },
  {
    id: '6',
    title: 'Om Nom Run',
    image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/onNomRun',
    platform: 'mobile',
    rewards: 400,
    description: "Run alongside Om Nom in his famous adventure, now finally in immersive and full-responsive HTML5. Try to run as far as possible by avoiding the dangerous obstacles and enemies, collect all coins and transform Om Nom into the fastest runner possible. Use the power-ups as smart as possible to explore the beautiful world with all it's beautiful areas, but be aware of the dangers that lurk inside of them. Are you ready to explore the world of Om Nom Run and reach the highest of highscores?",
    link: 'https://play.famobi.com/om-nom-run/A1000-10',
    developer: '©2014-2024 HTML5games.com',
    publisher: 'Famobi',
    releaseDate: 'N/A',
    rank:6,
    genre: 'Arcade',
    intro: "Run alongside Om Nom in his famous adventure",
    trailer: 'https://www.youtube.com/embed/tX6PRa_is_Q?si=8v4mvcRLTC-6eORJ',
    gameplay: 'https://www.youtube.com/embed/nDgI2ACB_mM?si=-5EvDBcoPewlNYpY',
    models: {
      playToEarn: {
        enabled: true,
        price: 100
      }
    }
  },
  {
    id: '7',
    title: 'Pengu Slide',
    image: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/penguSlide',
    platform: 'mobile',
    rewards: 400,
    description: "Slide to survive and fly to thrive in Pengu Slide - the ultimate penguin adventure game! Join our adorable penguin hero on a thrilling ride down the icy slopes, where danger lurks at every turn. With an avalanche hot on your tail, it's up to you to skillfully navigate the terrain by sliding, jumping and flying your way to safety. But beware, one wrong move could mean certain doom for our feathered friend! Experience heart-pumping excitement as you collect fish, and booster while trying to outrun the avalanche. With easy-to-learn controls and addictive gameplay, Pengu Slide is the perfect game for players of all ages and skill levels. So what are you waiting for? Strap on your snow boots and join the adventure in Pengu Slide - the coolest game on the block!",
    link: 'https://play.famobi.com/pengu-slide/A1000-10',
    developer: '©2014-2024 HTML5games.com',
    publisher: 'Famobi',
    rank:7,
    releaseDate: 'N/A',
    genre: 'Arcade',
    intro: "Slide to survive and fly to thrive in Pengu Slide",
    trailer: 'https://www.youtube.com/embed/tX6PRa_is_Q?si=8v4mvcRLTC-6eORJ',
    gameplay: 'https://www.youtube.com/embed/IWI2zHJG6OQ?si=N062eRVYisUdQuhf',
    models: {
      playToEarn: {
        enabled: true,
        price: 100
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
  const {
    balance,
    ownedNFTs,
    marketplaceNFTs,
    marketplaceVouchers,
    exchangeRates,
    historyTransactions,
    fetchTokenBalance,
    fetchHistoryTransactions
  } = useMTL()
  const { publicKey, connected, signMessage, sendTransaction } = useWallet();
  const [mtl, setMtl] = useState<string>("~");
  const getProvider = () => {
    console.log("Getting provider");
    if ('phantom' in window) {
      // Type assertion to handle the window.phantom type
      const phantom = (window as any).phantom;
      const provider = phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    window.open('https://phantom.app/', '_blank');
  };

  const [selectedPlatform, setSelectedPlatform] = useState<'games' | 'marketplace' | 'wallet'>('games')
  //const TOKEN_MINT_ADDRESS = "Hq1mb3fkB98g4vgk7ViPAmZFVaFVsw8GeQc8bWzBmm92"; // e.g., "So11111111111111111111111111111111111111112" for SOL
  const TOKEN_MINT_ADDRESS = "813b3AwivU6uxBicnXdZsCNrfzJy4U3Cr4ejwvH4V1Fz";

  useEffect(() => {
    getProvider();
    fetchHistoryTransactions();
  }, []);

  // useEffect(() => {
  //   console.log("publicKey is ", publicKey);

  //   if (publicKey) {
  //     // Define an async function to fetch the token balance
  //     const fetchTokenBalance = async () => {
  //       try {
  //         // Connection to the Solana testnet
  //         const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
  //         const ownerPublicKey = new PublicKey(publicKey.toBase58());
  //         const mintPublicKey = new PublicKey(TOKEN_MINT_ADDRESS);

  //         // Fetch all token accounts owned by the wallet
  //         const tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerPublicKey, {
  //           mint: mintPublicKey,
  //         });

  //         // Sum up balances from all accounts holding the specified token
  //         const tokenBalance = tokenAccounts.value.reduce((sum, accountInfo) => {
  //           const amount = accountInfo.account.data.parsed.info.tokenAmount.uiAmount;
  //           return sum + amount;
  //         }, 0);
  //         console.log("tokenBalance is ", tokenBalance);

  //         // Helper function to format decimals
  //         const formatDecimals = (num: number) => {
  //           const decimals = num % 1;
  //           if (decimals === 0) return '';
  //           return decimals.toFixed(9).substring(1);
  //         };

  //         // Format balance with appropriate units
  //         const millions = Math.floor(tokenBalance / 1000000);
  //         const thousands = Math.floor((tokenBalance % 1000000) / 1000);
  //         const ones = Math.floor(tokenBalance % 1000);
  //         const decimals = formatDecimals(tokenBalance);

  //         let formattedBalance = '';

  //         if (millions > 0) {
  //           formattedBalance += `${millions} Million `;
  //         }
  //         if (thousands > 0) {
  //           formattedBalance += `${thousands} Thousand `;
  //         }
  //         if (ones > 0) {
  //           formattedBalance += ones;
  //         }

  //         // Add decimals if they exist
  //         if (decimals) {
  //           formattedBalance += decimals;
  //         }

  //         // Handle case where balance is 0
  //         if (formattedBalance === '') {
  //           formattedBalance = '0';
  //         }

  //         return formattedBalance.trim();
  //       } catch (error) {
  //         console.error("Failed to fetch token balance:", error);
  //         return "0";
  //       }
  //     };

  //     // Call the async function
  //     fetchTokenBalance().then((mtl) => {
  //       console.log("mtl is ", mtl);
  //       setMtl(mtl);
  //     });
  //   } else {
  //     setMtl("~");
  //   }
  // }, [publicKey]); // Add dependencies

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
            {!publicKey ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.1 }}
                transition={{
                  duration: 0.5, // Faster duration
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="hover:scale-110 transition-transform duration-300"
              >
                <WalletMultiButton
                  endIcon={<FaGamepad className="text-white w-48 h-48" />}
                  style={{
                    background: "#0CC0DF",
                    color: "white",
                    padding: "16px 32px",
                    borderRadius: "16px",
                    border: "3px solid rgba(255,255,255,0.5)",
                    fontSize: "20px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 0 25px rgba(12,192,223,0.8), inset 0 0 15px rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    backdropFilter: "blur(8px)"
                  }}
                />
              </motion.div>
            ) : (
              <div className="hover:scale-105 transition-transform duration-200">
                <WalletMultiButton
                  endIcon={<FaGamepad className="text-[#0CC0DF] w-48 h-48" />}
                  style={{
                    backgroundColor: "rgba(12, 192, 223, 0.1)",
                    color: "white",
                    padding: "16px 32px",
                    borderRadius: "16px",
                    border: "none",
                    fontSize: "20px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 6px 8px rgba(12, 192, 223, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                  }}
                />
              </div>
            )}
            <div>
              <p className="text-sm text-white/60">Testnet</p>
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="w-16 h-16 rounded-full bg-[#0CC0DF]/10 flex items-center justify-center relative">
                <FaAffiliatetheme className="text-[#0CC0DF] w-12 h-12" />
                {historyTransactions.length > 0 && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#0CC0DF] rounded-full flex items-center justify-center text-sm font-bold">
                    +{historyTransactions.length}
                  </div>
                )}
              </div>
              <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#0A1628] border-2 border-[#0CC0DF]/30 rounded-xl w-80 max-h-96 overflow-y-auto">
                {historyTransactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="p-4 border-b border-[#0CC0DF]/20 hover:bg-[#0CC0DF]/10 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{transaction.gameTitle}</span>
                      <span className="text-sm text-white/60">
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-white/80 mt-1">{transaction.message}</p>
                    <span className={`text-xs ${transaction.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                      {transaction.status}
                    </span>
                  </div>
                ))}
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
                {balance}
              </p>
              <p className="text-sm text-white/60">MetaLoot Token</p>
              {/* <p className="text-sm text-white/60">Phase Metalian Dawn</p> */}
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
