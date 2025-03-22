'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Gradient Overlay Shapes */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
      
      {/* Black Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral/5 to-neutral/10 opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Creative Solutions</span>
              <br />for Modern Brands
            </h1>
            <p className="text-neutral text-xl mb-8 max-w-lg">
              We blend innovative strategies with cutting-edge design to help brands stand out in today's competitive digital landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium text-lg hover:shadow-lg transition-shadow"
              >
                Get Started
              </Link>
              <Link 
                href="#services" 
                className="px-8 py-4 border-2 border-neutral/20 text-neutral rounded-lg font-medium text-lg hover:border-primary transition-colors"
              >
                Our Services
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="w-full h-[400px] md:h-[500px] bg-gradient-to-br from-neutral to-neutral/80 rounded-2xl overflow-hidden shadow-xl">
              {isMobile ? (
                <img 
                  src="/rocket.jpg" 
                  alt="Creative Marketing Solutions" 
                  className="w-full h-full object-cover opacity-80" 
                />
              ) : (
                <img 
                  src="/rocket.jpg" 
                  alt="Creative Marketing Solutions" 
                  className="w-full h-full object-cover opacity-80" 
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-neutral/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-xl font-medium">Transforming visions into digital reality</p>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -top-6 -right-6 bg-white py-2 px-4 rounded-lg shadow-xl">
              <p className="text-sm font-bold text-neutral">Award-winning agency</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}