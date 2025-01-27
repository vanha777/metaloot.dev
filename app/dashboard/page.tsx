"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { motion } from "framer-motion";
import { useState } from "react";
import AnalyticsSection from "./components/AnalyticsSection";
import GameSection from "./components/GameSection";
import PlayersSection from "./components/PlayersSection";
import CollectionsSection from "./components/CollectionsSection";
import TokenomicsSection from "./components/TokenomicsSection";
import { 
  IoGameControllerOutline, 
  IoGameControllerSharp,
  IoStatsChartOutline,
  IoStatsChartSharp,
  IoPeopleOutline,
  IoPeopleSharp,
  IoImagesOutline,
  IoImagesSharp 
} from "react-icons/io5";
import { MdGeneratingTokens, MdOutlineGeneratingTokens } from "react-icons/md";


export default function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const teamMembers = [
    {
      name: "Patrick Ha",
      role: "Saturnors",
      image: "/founder11.jpeg",
      linkedin: "https://x.com/patricksaturnor",
    },
    {
      name: "Roman Lobanov",
      role: "Saturnors",
      image: "/founder2.jpeg",
      linkedin: "https://x.com/ComplexiaSC",
    },
  ];

  const [activeMenu, setActiveMenu] = useState("analytics");

  const menuItems = [
    { 
      id: "analytics", 
      label: "Analytics", 
      icon: IoStatsChartOutline,
      selectedIcon: IoStatsChartSharp 
    },
    { 
      id: "game", 
      label: "Game Management", 
      icon: IoGameControllerOutline,
      selectedIcon: IoGameControllerSharp 
    },
    { 
      id: "tokenomics", 
      label: "Tokenomics", 
      icon: MdOutlineGeneratingTokens,
      selectedIcon: MdGeneratingTokens 
    },
    { 
      id: "collections", 
      label: "Collections", 
      icon: IoImagesOutline,
      selectedIcon: IoImagesSharp 
    },
    { 
      id: "players", 
      label: "Player Stats", 
      icon: IoPeopleOutline,
      selectedIcon: IoPeopleSharp 
    },
  ];

  return (
    <>
      <div>
        <NavBar />

        <div className="flex min-h-[calc(100vh-4rem)] bg-black/80">
          {/* Sidebar */}
          <div className="w-64 bg-black/80 text-white/60 p-5 space-y-4 border-r border-white/10">
            {menuItems.map((item) => {
              const isSelected = activeMenu === item.id;
              const IconComponent = isSelected ? item.selectedIcon : item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors w-full ${
                    isSelected ? 'bg-grey text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <IconComponent className={`text-xl ${isSelected ? 'text-green' : 'text-white/60'}`} />
                  <span className="text-base font-light text-left">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1 min-h-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-black/80 h-full p-6 backdrop-blur-sm"
            >
              {activeMenu === "analytics" && <AnalyticsSection />}
              {activeMenu === "game" && <GameSection />}
              {activeMenu === "tokenomics" && <TokenomicsSection />}
              {activeMenu === "collections" && <CollectionsSection />}
              {activeMenu === "players" && <PlayersSection />}
            </motion.div>
          </div>
        </div>

        
          <Footer />
      </div>
    </>
  );
}
