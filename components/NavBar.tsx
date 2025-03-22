'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function NavBar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 w-full z-50 bg-white shadow-md"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/transLogo.png"
                            alt="Pixel Perfect Logo"
                            width={36}
                            height={36}
                            className="rounded-md"
                        />
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Pixel Perfect
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="about" className="text-neutral font-medium hover:text-primary transition-colors">
                            About Us
                        </Link>
                        <Link href="pricing" className="text-neutral font-medium hover:text-primary transition-colors">
                            Services
                        </Link>
                        <Link href="#portfolio" className="text-neutral font-medium hover:text-primary transition-colors">
                            Portfolio
                        </Link>
                        <Link href="contact" className="text-neutral font-medium hover:text-primary transition-colors">
                            Contact
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <div>
                        <Link
                            href="/contact"
                            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow"
                        >
                            Get a Quote
                        </Link>
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}
