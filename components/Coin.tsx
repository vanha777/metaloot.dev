'use client'

import { motion } from 'framer-motion'

export default function Coin() {
  return (
    <div className="hero min-h-screen bg-[#020309] relative overflow-hidden flex items-center justify-center">
      {/* Deep space background with electronic effects */}
      <div className="absolute inset-0">
        {/* Enhanced gradient background */}
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0CC0DF] via-[#020309] to-[#020309] opacity-20" />
        
        {/* Static grid lines */}
        <div className="grid grid-cols-12 gap-4 absolute inset-0 opacity-15">
          {[...Array(48)].map((_, i) => (
            <div
              key={i}
              className="h-1 bg-[#0CC0DF]/20 rounded-full"
            />
          ))}
        </div>

        {/* Static ambient dots */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#0CC0DF]/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Central Coin with Connected Text Boxes */}
          <div className="relative w-96 h-96">
            {/* Main Static Coin */}
            <div 
              className="w-full h-full rounded-full bg-gradient-to-r from-[#0CC0DF] to-[#0AA0BF] shadow-[0_0_50px_rgba(12,192,223,0.3)] flex items-center justify-center overflow-hidden"
            >
              <img 
                src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/download.png"
                alt="MetaLoot Token"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Left Text Box */}
            <div 
              className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2"
            >
              <div className="flex items-center">
                <div className="w-64 p-4 bg-[#0CC0DF]/10 backdrop-blur-sm rounded-xl border border-[#0CC0DF]/30">
                  <h3 className="text-xl font-bold text-[#0CC0DF] mb-2">Cross-Game Assets</h3>
                  <p className="text-sm text-gray-300">Transfer your items seamlessly between supported games</p>
                </div>
                <div className="w-16 h-0.5 bg-[#0CC0DF]" />
              </div>
            </div>

            {/* Right Upper Text Box */}
            <div 
              className="absolute right-0 top-1/4 translate-x-full -translate-y-1/2"
            >
              <div className="flex items-center">
                <div className="w-16 h-0.5 bg-[#0CC0DF]" />
                <div className="w-64 p-4 bg-[#0CC0DF]/10 backdrop-blur-sm rounded-xl border border-[#0CC0DF]/30">
                  <h3 className="text-xl font-bold text-[#0CC0DF] mb-2">Secure Storage</h3>
                  <p className="text-sm text-gray-300">Your items are safely stored on the blockchain</p>
                </div>
              </div>
            </div>

            {/* Right Lower Text Box */}
            <div 
              className="absolute right-0 top-3/4 translate-x-full -translate-y-1/2"
            >
              <div className="flex items-center">
                <div className="w-16 h-0.5 bg-[#0CC0DF]" />
                <div className="w-64 p-4 bg-[#0CC0DF]/10 backdrop-blur-sm rounded-xl border border-[#0CC0DF]/30">
                  <h3 className="text-xl font-bold text-[#0CC0DF] mb-2">Trade & Earn</h3>
                  <p className="text-sm text-gray-300">Marketplace for trading your valuable game items</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
