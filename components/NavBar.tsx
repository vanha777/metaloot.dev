'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-black/80 backdrop-blur-md shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-xl font-bold bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
                            MetaLoot
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                            About
                        </Link>
                        <Link href="#about" className="text-gray-300 hover:text-white transition-colors">
                            Pricing
                        </Link>
                        <Link href="#roadmap" className="text-gray-300 hover:text-white transition-colors">
                            Docs
                        </Link>
                        <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
                            Support
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <div>
                        <Link
                            href="/demo"
                            className="bg-gradient-to-r from-[#14F195] to-[#9945FF] text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                            Let's Build
                        </Link>
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}
