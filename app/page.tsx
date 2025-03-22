'use client'

import { useState, useEffect, Suspense } from 'react'
import Hero2 from '@/components/Hero2'
import Features from '@/components/Features'
import NavBar from '@/components/NavBar'
import Partner from '@/components/Partner'
import BigStatement from '@/components/BigStatement'
import WhatNew from '@/components/whatNew'
import Footer from '@/components/Footer'

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="bg-white min-h-screen relative">
        <NavBar />
        <div className="flex flex-col">
          <Hero2 />
          <Features />
          <Partner />
          <BigStatement />
          <WhatNew />
        </div>
        <Footer />
      </main>
    </Suspense>
  )
}