'use client'

import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import AnalyticsSection from './components/AnalyticsSection'
import GameSection from './components/GameSection'
import PlayersSection from './components/PlayersSection'
import CollectionsSection from './components/CollectionsSection'
import TokenomicsSection from './components/TokenomicsSection'

export default function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  }

  const teamMembers = [
    {
      name: "Patrick Ha",
      role: "Saturnors",
      image: "/founder11.jpeg",
      linkedin: "https://x.com/patricksaturnor"
    },
    {
      name: "Roman Lobanov",
      role: "Saturnors",
      image: "/founder2.jpeg",
      linkedin: "https://x.com/ComplexiaSC"
    }
  ]

  const [activeMenu, setActiveMenu] = useState('analytics')

  const menuItems = [
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'game', label: 'Game Management', icon: '🎮' },
    { id: 'tokenomics', label: 'Tokenomics', icon: '💰' },
    { id: 'collections', label: 'Collections', icon: '🎨' },
    { id: 'players', label: 'Player Stats', icon: '👥' },
  ]

  return (
    <>
      <NavBar />

      <div className="flex min-h-screen bg-[#0f1c3d]">
        {/* Sidebar */}
        <div className="w-64 bg-[#071A2F] text-white p-6 space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 transition-all
                ${activeMenu === item.id 
                  ? 'bg-[#0CC0DF]/20 text-[#14F195]' 
                  : 'hover:bg-[#0CC0DF]/10'}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-[#0f1c3d]/50 rounded-xl p-6 backdrop-blur-sm"
          >
            {activeMenu === 'analytics' && <AnalyticsSection />}
            {activeMenu === 'game' && <GameSection />}
            {activeMenu === 'tokenomics' && <TokenomicsSection />}
            {activeMenu === 'collections' && <CollectionsSection />}
            {activeMenu === 'players' && <PlayersSection />}
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  )
}