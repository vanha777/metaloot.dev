'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import Satements from '@/components/statements'
import Roadmap from '@/components/Roadmap'
import Contact from '@/components/Contact'
import About from '@/components/about'
import BigStatement from '@/components/BigStatement'
import Coin from '@/components/Coin'
import { useSearchParams } from 'next/navigation';
export default function Home() {
  const searchParams = useSearchParams();
  const key = searchParams.get('referal'); // Access the value of "key"
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
      <main className="bg-base-100 min-h-screen relative">
        <div className="flex flex-col">
          <Hero />
          <About />
          <Satements />
          <BigStatement />
          <Coin />
          <Roadmap />
          <Contact referal={key?.toString()} />
        </div>

        {/* Solana Stamp */}
        <div className="fixed left-8 bottom-8 bg-gradient-to-r from-[#9945FF] to-[#14F195] p-[1px] rounded-lg rotate-[-4deg] shadow-lg hover:rotate-0 transition-all duration-300">
          <div className="bg-black/90 backdrop-blur-sm px-4 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <svg width="20" height="16" viewBox="0 0 508.07 398.17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="solana-gradient" x1="463" y1="205.16" x2="182.39" y2="742.62" gradientTransform="translate(0 -198)" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#00ffa3" />
                    <stop offset="1" stopColor="#dc1fff" />
                  </linearGradient>
                </defs>
                <path d="M82.55 303.89A16.63 16.63 0 0194.3 299h405.45a8.3 8.3 0 015.87 14.18l-80.09 80.09a16.61 16.61 0 01-11.75 4.86H8.33a8.31 8.31 0 01-5.88-14.18l80.1-80.06z" fill="url(#solana-gradient)" />
                <path d="M82.55 4.85A17.08 17.08 0 0194.3 0h405.45a8.3 8.3 0 015.87 14.18l-80.09 80.09a16.61 16.61 0 01-11.75 4.86H8.33a8.31 8.31 0 01-5.88-14.18l80.1-80.1z" fill="url(#solana-gradient)" />
                <path d="M425.53 153.42a16.61 16.61 0 00-11.75-4.86H8.33a8.31 8.31 0 00-5.88 14.18l80.1 80.09a16.6 16.6 0 0011.75 4.86h405.45a8.3 8.3 0 005.87-14.18l-80.09-80.09z" fill="url(#solana-gradient)" />
              </svg>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195] font-bold">
                Built on Solana
              </span>
            </div>
          </div>
        </div>
      </main>
  )
}