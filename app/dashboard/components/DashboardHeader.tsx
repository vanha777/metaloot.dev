'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function DashboardHeader() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 w-full z-50 bg-black/80 backdrop-blur-md shadow-lg"
        >
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/transLogo.png"
                            alt="MetaLoot Logo"
                            width={32}
                            height={32}
                        />
                        <span className="text-xl font-bold bg-gradient-to-r from-[#0CC0DF] to-[#14F195] bg-clip-text text-transparent">
                            MetaLoot
                        </span>
                    </Link>


                    {/* CTA Button */}
                    <div>
                        <Link
                            href="https://documenter.getpostman.com/view/29604463/2sAYQXnsMR"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-[#0CC0DF] to-[#14F195] text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}
