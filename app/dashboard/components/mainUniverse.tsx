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
import { CollectionData, GameData } from '@/app/utils/AppContext'
import GameUniverse from "@/app/dashboard/components/gameUniverse";
import { AppProvider, useAppContext } from "@/app/utils/AppContext";
import { Db } from "@/app/utils/db";
import SimpleLoading from "./simpleLoading";
export default function MainUniverse() {
    const { auth, setTokenData, setAccessToken, setCollectionData, setUser, setGame, logout } = useAppContext();
    const [activeMenu, setActiveMenu] = useState("analytics");
    const [selectedGameData, setSelectedGameData] = useState<GameData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const selectGame = async (game: GameData) => {
        try {
            setIsLoading(true);
            // get access_token from server
            const response = await fetch('https://metaloot-cloud-d4ec.shuttle.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    client_id: game.id,
                    client_secret: "metalootfreetier"
                })
            });
            if (!response.ok) {
                // throw new Error('Failed to fetch access token');
                window.location.href = '/dashboard/login';
                return;
            }
            const data = await response.json();
            setAccessToken(data.access_token);
            console.log("get access_token successfully");

            // get game_data from server
            const response_game = await fetch(`https://metaloot-cloud-d4ec.shuttle.app/v1/api/game/${game.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.access_token}`
                }
            });
            if (!response.ok) {
                // throw new Error('Failed to fetch access token');
                window.location.href = '/dashboard/login';
                return;
            }
            const game_data = await response_game.json();
            let uri = game_data.account.data.token_uri;
            console.log("get game data successfully", game_data);

            // Fetch and parse URI data for each game
            const tokenDataWithDetails = await fetch(uri);
            const uriData = await tokenDataWithDetails.json();
            console.log("tokenDataWithDetails", uriData);
            setTokenData({
                name: uriData.name,
                symbol: uriData.symbol,
                uri: uri,
                image: uriData.image,
                description: uriData.description,
                address: game_data.native_token,
            });


            // get collection_data from server
            const collection_uris: CollectionData[] = await Promise.all(game_data.account.data.nft_collection.map(async (collection: any) => {
                const uri = collection.uri;
                const collectionDataWithDetails = await fetch(uri);
                const collectionUriData = await collectionDataWithDetails.json();
                return {
                    name: collectionUriData.name,
                    symbol: collectionUriData.symbol,
                    size: collectionUriData.size || 0,
                    uri: uri,
                    description: collectionUriData.description,
                    address: collection.address,
                    image: collectionUriData.image,
                } as CollectionData;
            }));
            console.log("get collection data successfully");
            setCollectionData(collection_uris);
            setSelectedGameData(game);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching tokens:', error);
            window.location.href = '/dashboard/login';
        }
    };

    useEffect(() => {
        console.log("this is auth", auth);
        if (auth.userData == null) {
            window.location.href = '/dashboard/login';
        }
        // fetch token data for selected game
    }, [auth.userData]);

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

    const menuItems = [
        {
            id: "analytics",
            label: "Analytics",
            icon: IoStatsChartOutline,
            selectedIcon: IoStatsChartSharp
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
            icon: IoStorefrontOutline,
            selectedIcon: IoImagesSharp
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
            {isLoading ? (
                <SimpleLoading />
            ) : !selectedGameData ? (
                <GameUniverse
                    setSelectedGame={selectGame}
                />
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
                                <DashboardHeader
                                    selectedGameData={selectedGameData}
                                    setSelectedGameData={setSelectedGameData}
                                />
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className=" h-full p-6 backdrop-blur-xl overflow-y-auto"
                                >
                                    {activeMenu === "analytics" && <AnalyticsSection selectedGame={selectedGameData} />}
                                    {/* {activeMenu === "game" && <GameSection />} */}
                                    {activeMenu === "tokenomics" && <TokenomicsSection selectedGame={selectedGameData} />}
                                    {activeMenu === "collections" && <CollectionsSection selectedGame={selectedGameData} />}
                                    {/* {activeMenu === "marketplace" && <MarketplaceSection selectedGame={selectedGameData} />} */}
                                    {activeMenu === "webhook" && <WebhookSection selectedGame={selectedGameData} />}
                                    {activeMenu === "api" && <APISection selectedGame={selectedGameData} />}
                                    {activeMenu === "settings" && <SettingsSection selectedGame={selectedGameData} />}
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
