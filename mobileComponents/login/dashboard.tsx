'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Auth } from '../../app/auth'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, PerspectiveCamera } from '@react-three/drei'
import Details from './details'
import { FaDesktop, FaMobile, FaGamepad, FaGlobe, FaStore, FaWallet, FaAffiliatetheme, FaSignOutAlt } from 'react-icons/fa'
import { SiThunderstore,SiWalletconnect } from "react-icons/si";
import GamesDashboard from './gamesDashboard'
import Marketplace from './marketplace'
import Wallet from './wallet'
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useMTL } from '../../app/context/MtlContext'

interface Game {
  id: string
  title: string
  image: string
  platform: 'desktop' | 'mobile' | 'console'
  rewards: number
  description: string
  rank: number
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

const platformIcons = {
  games: <FaGamepad size={24} />,
  marketplace: <SiThunderstore size={24} />,
  wallet: <SiWalletconnect size={24} />
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
  // const getProvider = () => {
  //   console.log("Getting provider");
  //   if ('phantom' in window) {
  //     const phantom = (window as any).phantom;
  //     const provider = phantom?.solana;

  //     if (provider?.isPhantom) {
  //       return provider;
  //     }
  //   }

  //   window.open('https://phantom.app/', '_blank');
  // };

  const [selectedPlatform, setSelectedPlatform] = useState<'games' | 'marketplace' | 'wallet'>('games')
  const TOKEN_MINT_ADDRESS = "813b3AwivU6uxBicnXdZsCNrfzJy4U3Cr4ejwvH4V1Fz";

  useEffect(() => {
    // getProvider();
    fetchHistoryTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <Environment preset="sunset" />
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh>
              <torusKnotGeometry args={[9, 2.5, 300, 40]} />
              <meshStandardMaterial color="#0CC0DF" emissive="#0CC0DF" emissiveIntensity={1} transparent opacity={0.3} wireframe />
            </mesh>
          </Float>
        </Canvas>
      </div>

      <div className="relative z-10">
        {/* Sticky Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/90 backdrop-blur-md border-b border-[#0CC0DF]/20 px-4 py-2">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Left - Wallet Button */}
            <div>
              {!publicKey ? (
                <WalletMultiButton
                  style={{
                    background: "#0CC0DF",
                    padding: "12px 24px", 
                    borderRadius: "12px",
                    fontSize: "16px"
                  }}
                />
              ) : (
                <WalletMultiButton
                  style={{
                    backgroundColor: "rgba(12, 192, 223, 0.1)",
                    padding: "12px 24px",
                    borderRadius: "12px", 
                    fontSize: "16px"
                  }}
                />
              )}
            </div>

            {/* Right - Notification */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="w-12 h-12 rounded-full bg-[#0CC0DF]/10 flex items-center justify-center relative">
                <FaAffiliatetheme className="text-[#0CC0DF] w-6 h-6" />
                {historyTransactions.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#0CC0DF] rounded-full flex items-center justify-center text-xs font-bold">
                    {historyTransactions.length}
                  </div>
                )}
              </div>
              <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#0A1628] border-2 border-[#0CC0DF]/30 rounded-xl w-80 max-h-96 overflow-y-auto">
                {historyTransactions.map((transaction, index) => (
                  <div key={index} className="p-4 border-b border-[#0CC0DF]/20 hover:bg-[#0CC0DF]/10 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{transaction.gameTitle}</span>
                      <span className="text-sm text-white/60">
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-white/80 mt-1">{transaction.message}</p>
                    <span className={`text-xs ${transaction.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {transaction.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-24 pb-16 px-4">
          {selectedPlatform === 'games' && <GamesDashboard />}
          {selectedPlatform === 'marketplace' && <Marketplace />}
          {selectedPlatform === 'wallet' && <Wallet />}
        </div>

        {/* Bottom Navigation */}
        <div className="btm-nav bg-[#0A1628]/90 border-t border-[#0CC0DF]/20">
          {Object.entries(platformIcons).map(([platform, icon]) => (
            <button
              key={platform}
              className={`${selectedPlatform === platform ? 'active text-[#0CC0DF]' : 'text-white/60'}`}
              onClick={() => setSelectedPlatform(platform as 'games' | 'marketplace' | 'wallet')}
            >
              {icon}
              <span className="btm-nav-label capitalize">{platform}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
