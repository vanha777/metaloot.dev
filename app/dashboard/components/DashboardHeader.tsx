'use client'

import { useState } from 'react'
import { IoSettings, IoServer, IoShare, IoSettingsSharp, IoShapesSharp } from "react-icons/io5"
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GameData } from '@/app/utils/storage'
import { useAppContext } from '@/app/utils/AppContext'
// import { useAuthStore, useIntegrationPartnerStore } from '@/store/store'
// import SettingsPage from '../settings/settings-page'

interface DashboardHeaderProps {
    selectedGameData: GameData | null;
    setSelectedGameData: (game: GameData | null) => void;
}

export default function DashboardHeader({ selectedGameData, setSelectedGameData }: DashboardHeaderProps) {
    const { auth, setTokens, setUser, setGame, logout } = useAppContext();
    // const { integrationPartner, setIntegrationPartner } = useIntegrationPartnerStore()
    // const { loginResponse, clearAuth } = useAuthStore()

    const handleSignOut = () => {
        logout();
        window.location.href = '/dashboard/login';
    }

    let loginResponse = {
        first_name: "John",
        last_name: "Doe",
        access_token: "1234567890"
    };

    let integrationPartner = {
        integration_partner: "emis"
    };

    let setIntegrationPartner = (integration_partner: string) => { }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 w-full z-50 bg-transparent"
        >
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left side with user info and game info */}
                    <div className="flex items-center gap-4">
                        {loginResponse?.access_token && (
                            <div className="bg-base-200 rounded-full px-6 py-2 shadow-lg flex items-center gap-4">
                                <div className="text-lg font-semibold">
                                    <span className="text-white">{selectedGameData?.name || "No Game Selected"}</span>
                                </div>

                                <button
                                    className="btn btn-ghost btn-sm"
                                    onClick={() => setSelectedGameData(null)}
                                >
                                    Change Game
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right side with settings and sign out */}
                    <div className="flex items-center gap-4">
                        {/* <SettingsPage>
                            <button className="btn btn-ghost text-white">
                                <IoSettings className="h-6 w-6" />
                                Settings
                            </button>
                        </SettingsPage> */}

                        {loginResponse?.access_token && (
                            <div className="bg-base-200 rounded-full px-6 py-2 shadow-lg flex items-center gap-4">
                                <button
                                    className="text-red-500 flex items-center gap-2"
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}
