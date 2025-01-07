'use client'

import { useState, useEffect } from 'react'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Initialize with window check to avoid hydration mismatch
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      
      // Run initial check
      checkMobile()

      // Add resize listener
      window.addEventListener('resize', checkMobile)

      // Cleanup
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <div className="hero min-h-screen bg-[#020309] relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={isMobile ? "/mobileHero.mp4" : "/hero.mp4"} type="video/mp4" />
      </video>
    </div>
  )
}