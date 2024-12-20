'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Auth } from '../app/auth';

export default function Coin() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [isMobile, setIsMobile] = useState(false)
  const [participantCount, setParticipantCount] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const supabase = await Auth;
        const { count, error } = await supabase
          .from('subscribers')
          .select('*', { count: 'exact' });
        
        if (error) throw error;
        setParticipantCount(count || 0);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    fetchParticipants();
  }, []);

  useEffect(() => {
    const targetDate = new Date('2024-12-25T00:00:00')

    const timer = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="hero min-h-screen bg-[#020309] relative overflow-hidden flex items-center justify-center">
      {/* Static background */}
      <div className="absolute inset-0">
        {/* Static gradient background */}
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0CC0DF] via-[#020309] to-[#020309] opacity-20" />

        {/* Static grid pattern */}
        <div className="grid grid-cols-12 gap-4 absolute inset-0 opacity-15">
          {[...Array(48)].map((_, i) => (
            <div
              key={i}
              className="h-1 bg-[#0CC0DF]/20 rounded-full"
            />
          ))}
        </div>

        {/* Static dots pattern */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#0CC0DF]/30 rounded-full"
              style={{
                left: `${(i * 5)}%`,
                top: `${(i * 5)}%`
              }}
            />
          ))}
        </div>
      </div>

      {/* Release Date Banner - Countdown */}
      {isMobile ? (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 ">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://twitter.com/playmetaloot', '_blank')}
            className="bg-[#0CC0DF]/10 backdrop-blur-sm rounded-xl border border-[#0CC0DF]/30 p-4 cursor-pointer hover:bg-[#0CC0DF]/20 transition-all duration-300"
          >
            <p className="text-[#0CC0DF]">Next Drops</p>
            <div className="flex gap-4">
              {timeLeft.days > 0 && (
                <div className="flex items-center">
                  <span className="countdown font-mono text-2xl text-[#0CC0DF]">
                    <span style={{ "--value": timeLeft.days } as any}></span>
                  </span>
                  <span className="ml-1">days</span>
                </div>
              )}
              <div className="flex items-center">
                <span className="countdown font-mono text-2xl text-[#0CC0DF]">
                  <span style={{ "--value": timeLeft.hours } as any}></span>
                </span>
                <span className="ml-1">hours</span>
              </div>
              <div className="flex items-center">
                <span className="countdown font-mono text-2xl text-[#0CC0DF]">
                  <span style={{ "--value": timeLeft.minutes } as any}></span>
                </span>
                <span className="ml-1">min</span>
              </div>
              <div className="flex items-center">
                <span className="countdown font-mono text-2xl text-[#0CC0DF]">
                  <span style={{ "--value": timeLeft.seconds } as any}></span>
                </span>
                <span className="ml-1">sec</span>
              </div>
            </div>
            <p className="text-sm text-[#0CC0DF]/70 mt-1">visit x.com/@playmetaloot</p>
          </motion.button>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-[#0CC0DF]/10 backdrop-blur-sm rounded-xl border border-[#0CC0DF]/30 p-4"
          >
            <div className="flex justify-center items-center">
              <span className="font-mono text-xl text-[#0CC0DF]">{participantCount}</span>
              <span className="ml-2 text-[#0CC0DF]/70">/ 50 participants</span>
            </div>
            <div className="w-full bg-[#0CC0DF]/20 rounded-full h-2 mt-2">
              <div 
                className="bg-[#0CC0DF] h-2 rounded-full transition-all duration-500"
                style={{ width: `${(participantCount / 50) * 100}%` }}
              />
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="absolute top-8 w-full px-8 flex justify-between items-start">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://twitter.com/playmetaloot', '_blank')}
            className="bg-[#0CC0DF]/10 backdrop-blur-sm rounded-xl border border-[#0CC0DF]/30 p-4 cursor-pointer hover:bg-[#0CC0DF]/20 transition-all duration-300"
          >
            <p className="text-[#0CC0DF]">Next Drops</p>
            <div className="flex gap-4">
              {timeLeft.days > 0 && (
                <div className="flex items-center">
                  <span className="countdown font-mono text-2xl text-[#0CC0DF]">
                    <span style={{ "--value": timeLeft.days } as any}></span>
                  </span>
                  <span className="ml-1">days</span>
                </div>
              )}
              <div className="flex items-center">
                <span className="countdown font-mono text-2xl text-[#0CC0DF]">
                  <span style={{ "--value": timeLeft.hours } as any}></span>
                </span>
                <span className="ml-1">hours</span>
              </div>
              <div className="flex items-center">
                <span className="countdown font-mono text-2xl text-[#0CC0DF]">
                  <span style={{ "--value": timeLeft.minutes } as any}></span>
                </span>
                <span className="ml-1">min</span>
              </div>
              <div className="flex items-center">
                <span className="countdown font-mono text-2xl text-[#0CC0DF]">
                  <span style={{ "--value": timeLeft.seconds } as any}></span>
                </span>
                <span className="ml-1">sec</span>
              </div>
            </div>
            <p className="text-sm text-[#0CC0DF]/70 mt-1">visit x.com/@playmetaloot</p>
          </motion.button>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-[#0CC0DF]/10 backdrop-blur-sm rounded-xl border border-[#0CC0DF]/30 p-4"
          >
            <div className="flex justify-center items-center">
              <span className="font-mono text-xl text-[#0CC0DF]">{participantCount}</span>
              <span className="ml-2 text-[#0CC0DF]/70">/ 50 participants</span>
            </div>
            <div className="w-full bg-[#0CC0DF]/20 rounded-full h-2 mt-2">
              <div 
                className="bg-[#0CC0DF] h-2 rounded-full transition-all duration-500"
                style={{ width: `${(participantCount / 50) * 100}%` }}
              />
            </div>
          </motion.div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Token Info */}
          <div className={`mb-12 text-center ${isMobile ? 'mt-48' : ''}`}>
            <h2 className={`${isMobile ? 'text-5xl' : 'text-7xl'} font-bold text-[#0CC0DF] mb-6 mt-10`}>$MTL</h2>
            <div className="flex gap-4 justify-center flex-wrap">
              <div className="bg-[#0CC0DF]/10 backdrop-blur-sm rounded-xl border border-[#0CC0DF]/30 p-4">
                <p className="text-gray-300">Total Supply</p>
                <p className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-[#0CC0DF]`}>1B MTL</p>
              </div>
              <div className="bg-[#0CC0DF]/10 backdrop-blur-sm rounded-xl border border-[#0CC0DF]/30 p-4">
                <p className="text-gray-300">Circulating Supply</p>
                <p className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-[#0CC0DF]`}>$110,000 MTL</p>
              </div>
              <div className="bg-[#0CC0DF]/10 backdrop-blur-sm rounded-xl border border-[#0CC0DF]/30 p-4">
                <p className="text-gray-300">Market Cap</p>
                <p className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-[#0CC0DF]`}>$~</p>
              </div>
            </div>
          </div>

          {/* Central Coin with Connected Text Boxes */}
          <div className={`relative ${isMobile ? 'w-64 h-64' : 'w-96 h-96'}`}>
            {/* Main Static Coin with Enhanced 3D Effect */}
            <div
              style={{
                transform: "perspective(1000px) rotateY(-30deg) rotateX(5deg)",
                transformStyle: "preserve-3d",
                position: "relative"
              }}
              className="w-full h-full rounded-full flex items-center justify-center overflow-hidden"
            >
              {/* Main coin face */}
              <img
                src="/coin.png"
                alt="MetaLoot Token"
                className="w-full h-full object-cover"
                style={{
                  transform: "translateZ(2px)",
                  filter: "drop-shadow(0 0 10px rgba(12,192,223,0.5))"
                }}
              />
            </div>

            {!isMobile && (
              // Desktop layout - Connected text boxes
              <>
                {/* Left Text Box */}
                <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2">
                  <div className="flex items-center">
                    <div className="w-64 p-4 bg-[#0CC0DF]/10 backdrop-blur-sm rounded-xl border border-[#0CC0DF]/30">
                      <h3 className="text-xl font-bold text-[#0CC0DF] mb-2">MetaLoot Tokens</h3>
                      <p className="text-sm text-gray-300">Used to value all items, NFT trades, and in-game currencies.</p>
                    </div>
                    <div className="w-16 h-0.5 bg-[#0CC0DF]" />
                  </div>
                </div>

                {/* Right Upper Text Box */}
                <div className="absolute right-0 top-1/4 translate-x-full -translate-y-1/2">
                  <div className="flex items-center">
                    <div className="w-16 h-0.5 bg-[#0CC0DF]" />
                    <div className="w-64 p-4 bg-[#0CC0DF]/10 backdrop-blur-sm rounded-xl border border-[#0CC0DF]/30">
                      <h3 className="text-xl font-bold text-[#0CC0DF] mb-2">Limited Supply</h3>
                      <p className="text-sm text-gray-300">There will only ever be 1 billion tokens.</p>
                    </div>
                  </div>
                </div>

                {/* Right Lower Text Box */}
                <div className="absolute right-0 top-3/4 translate-x-full -translate-y-1/2">
                  <div className="flex items-center">
                    <div className="w-16 h-0.5 bg-[#0CC0DF]" />
                    <div className="w-64 p-4 bg-[#0CC0DF]/10 backdrop-blur-sm rounded-xl border border-[#0CC0DF]/30">
                      <h3 className="text-xl font-bold text-[#0CC0DF] mb-2">A Substantial Ecosystem</h3>
                      <p className="text-sm text-gray-300">Strict measures are in place to manage tokenomics and preserve the value of our tokens.</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
