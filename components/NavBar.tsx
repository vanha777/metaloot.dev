'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function NavBar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 w-full z-50 bg-black/80 backdrop-blur-md shadow-lg"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="about" className="text-gray-300 hover:text-white transition-colors">
                            About
                        </Link>
                        <Link href="pricing" className="text-gray-300 hover:text-white transition-colors">
                            Pricing
                        </Link>
                        <Link
                            href="https://documenter.getpostman.com/view/29604463/2sAYQXnsMR"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Docs
                        </Link>
                        <Link href="contact" className="text-gray-300 hover:text-white transition-colors">
                            Support
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <div>
                        <Link
                            href="/dashboard"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-[#0CC0DF] to-[#14F195] text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                            {/* Let&apos;s Build */}
                            Beta Access
                        </Link>
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}
