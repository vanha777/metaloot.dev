'use client'

import { useState } from 'react'
import { IoSettings, IoServer, IoShare, IoSettingsSharp, IoShapesSharp } from "react-icons/io5"
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
// import { useAuthStore, useIntegrationPartnerStore } from '@/store/store'
// import SettingsPage from '../settings/settings-page'

export default function DashboardHeader() {
    // const { integrationPartner, setIntegrationPartner } = useIntegrationPartnerStore()
    // const { loginResponse, clearAuth } = useAuthStore()

    // const handleSignOut = () => {
    //     clearAuth()
    // }

    let loginResponse = {
        first_name: "John",
        last_name: "Doe",
        access_token: "1234567890"
    };

    let integrationPartner = {
        integration_partner: "emis"
    };

    let setIntegrationPartner = (integration_partner: string) => {}

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 w-full z-50 bg-transparent"
        >
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left side with user info and integration */}
                    <div className="flex items-center gap-4">

                        {loginResponse?.access_token && (
                            <div className="bg-base-200 rounded-full px-6 py-2 shadow-lg flex items-center gap-4">
                                <div className="text-lg font-semibold">
                                    <span className="text-white">{loginResponse.first_name}</span>{" "}
                                    <span className="bg-gradient-to-r from-[#0CC0DF] to-[#14F195] text-transparent bg-clip-text font-bold">
                                        {loginResponse.last_name}
                                    </span>
                                </div>

                                <div className="dropdown dropdown-end">
                                    <div className="tooltip tooltip-bottom" data-tip={`Current Integration: ${integrationPartner?.integration_partner || 'None'}`}>
                                        <label tabIndex={0} className="btn btn-ghost btn-circle text-white">
                                            <IoServer className="h-6 w-6" />
                                        </label>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li>
                                            <a className="text-black"
                                            //  onClick={() => setIntegrationPartner({ integration_partner: 'emis' })}
                                             >
                                                <IoShare className="h-6 w-6" />
                                                EMIS
                                            </a>
                                        </li>
                                        <li>
                                            <a className="text-black" 
                                            // onClick={() => setIntegrationPartner({ integration_partner: 'rxweb' })}
                                            >
                                                <IoSettingsSharp className="h-6 w-6" />
                                                rxweb
                                            </a>
                                        </li>
                                        <li>
                                            <a className="text-black"
                                            //  onClick={() => setIntegrationPartner({ integration_partner: 'pharma_outcomes' })}
                                             >
                                                <IoShapesSharp className="h-6 w-6" />
                                                Pharma Outcomes
                                            </a>
                                        </li>
                                    </ul>
                                </div>
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
                            <button 
                                className="btn btn-ghost text-red-500"
                                // onClick={handleSignOut}
                            >
                                Sign Out
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}
