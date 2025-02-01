"use client";

import DashboardHeader from "./components/DashboardHeader";
import { motion } from "framer-motion";
import { useState } from "react";
import AnalyticsSection from "./components/AnalyticsSection";
import GameSection from "./components/GameSection";
import CollectionsSection from "./components/CollectionsSection";
import TokenomicsSection from "./components/TokenomicsSection";
import { 
  IoGameControllerOutline, 
  IoGameControllerSharp,
  IoStatsChartOutline,
  IoStatsChartSharp,
  IoImagesOutline,
  IoImagesSharp,
  IoSettingsOutline,
  IoSettingsSharp,
  IoCodeSlashOutline,
  IoCodeSlashSharp,
  IoStorefrontOutline,
  IoStorefrontSharp
} from "react-icons/io5";
import { MdGeneratingTokens, MdOutlineGeneratingTokens, MdOutlineWebhook, MdWebhook } from "react-icons/md";
import APISection from "./components/APISection";
import SettingsSection from "./components/SettingsSection";
import WebhookSection from "./components/WebhookSection";
import MarketplaceSection from "./components/MarketplaceSection";


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
      id: "marketplace", 
      label: "Marketplace", 
      icon: IoStorefrontOutline,
      selectedIcon: IoStorefrontSharp
    },
    { 
      id: "webhook", 
      label: "Webhooks", 
      icon: MdOutlineWebhook,
      selectedIcon: MdWebhook
    },
    { 
      id: "api", 
      label: "API Management", 
      icon: IoCodeSlashOutline,
      selectedIcon: IoCodeSlashSharp
    },
    { 
      id: "settings", 
      label: "Settings", 
      icon: IoSettingsOutline,
      selectedIcon: IoSettingsSharp 
    }
  ];

  return (
    <>
      <div>
        <DashboardHeader />

        <div className="flex min-h-[calc(100vh-4rem)] bg-black/80">
          {/* Sidebar */}
          <div className="hidden md:block lg:w-64 bg-black/80 text-white/60 p-5 space-y-4 border-r border-white/10">
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

                  <span className="hidden lg:block text-base font-light text-left">{item.label}</span>
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
              {activeMenu === "marketplace" && <MarketplaceSection />}
              {activeMenu === "webhook" && <WebhookSection />}
              {activeMenu === "api" && <APISection />}
              {activeMenu === "settings" && <SettingsSection />}
            </motion.div>
          </div>
        </div>
            
        <div className="md:hidden sticky bottom-0 left-0 w-full flex flex-row justify-between bg-[#020303] text-white/60 py-4 px-5">
            {menuItems.map((item) => {
              const isSelected = activeMenu === item.id;
              const IconComponent = isSelected ? item.selectedIcon : item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`flex justify-center items-center gap-2 px-3 py-3 rounded-lg transition-colors h-12 w-12 ${
                    isSelected ? 'bg-grey text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <IconComponent className={`text-xl ${isSelected ? 'text-green' : 'text-white/60'}`} />
                </button>
              );
            })}
          </div>

        
          {/* <Footer /> */}
      </div>
    </>
  );
}
