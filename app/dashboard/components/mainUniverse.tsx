"use client";

import DashboardHeader from "@/app/dashboard/components/DashboardHeader";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AnalyticsSection from "@/app/dashboard/components/AnalyticsSection";
import GameSection from "@/app/dashboard/components/GameSection";
import CollectionsSection from "@/app/dashboard/components/CollectionsSection";
import TokenomicsSection from "@/app/dashboard/components/TokenomicsSection";
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
import APISection from "@/app/dashboard/components/APISection";
import SettingsSection from "@/app/dashboard/components/SettingsSection";
import WebhookSection from "@/app/dashboard/components/WebhookSection";
import MarketplaceSection from "@/app/dashboard/components/MarketplaceSection";
import SimpleSideBar from "@/components/simpleSideBar";
import SimpleSupport from "@/components/simpleSupport";
import { authStorage, GameData, UserData } from '@/app/utils/storage'
import GameUniverse from "@/app/dashboard/components/gameUniverse";
import SSOLogin from "@/app/dashboard/components/ssoLogin";
import { AppProvider, useAppContext } from "@/app/utils/AppContext";

export default function MainUniverse() {
    const { auth, setTokens, setUser, setGame, logout } = useAppContext();
    // const [isAuthenticated, setIsAuthenticated] = useState(true);
    // const [userData, setUserData] = useState<UserData | null>(null);
    // const [gameData, setGameData] = useState<GameData[] | null>(null);
    const [selectedGameData, setSelectedGameData] = useState<GameData | null>(null);

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

    // useEffect(() => {
    //   let auth = authStorage.get();
    //   console.log("this is the auth", auth);
    //   if (auth.isAuthenticated) {
    //     setIsAuthenticated(true);
    //   }
    //   // setUserData(auth?.userData ?? null); 
    //   if (auth?.gameData) {
    //     setGameData(auth.gameData);
    //   }
    //   if (auth?.userData) {
    //     setUserData(auth.userData);
    //   }
    // }, []);

    return (
        <>
            {!auth.isAuthenticated ? (
                <div className="bg-black/90 overflow-hidden flex items-center justify-center min-h-screen">
                    <SSOLogin />
                </div>
            ) : !selectedGameData ? (
                <div className="bg-black/90 overflow-hidden flex items-center justify-center min-h-screen">
                    <GameUniverse games={auth.gameData ?? []} />
                </div>
            ) : (
                <div className="bg-black/90 overflow-hidden">
                    <SimpleSupport />

                    <div className="flex min-h-[calc(100vh-4rem)] backdrop-blur-xl">
                        <SimpleSideBar
                            onContentChange={setActiveMenu}
                            content={activeMenu}
                            menuItems={menuItems}
                        >

                            {/* Main Content */}
                            <div className="flex-1 h-[calc(100vh-4rem)]">
                                <DashboardHeader />
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="bg-zinc-900/30 h-full p-6 backdrop-blur-xl overflow-y-auto"
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
                        </SimpleSideBar>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden sticky bottom-0 left-0 w-full flex flex-row justify-between bg-zinc-900/90 backdrop-blur-xl text-white/80 py-4 px-5 border-t border-white/10">
                        {menuItems.map((item) => {
                            const isSelected = activeMenu === item.id;
                            const IconComponent = isSelected ? item.selectedIcon : item.icon;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveMenu(item.id)}
                                    className={`flex justify-center items-center gap-2 px-3 py-3 rounded-lg transition-all duration-200 h-12 w-12 
                        ${isSelected
                                            ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <IconComponent className={`text-xl ${isSelected ? 'text-white' : 'text-white/60'}`} />
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
