'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

export default function Contact() {
  const [userType, setUserType] = useState<'player' | 'studio' | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    console.log('Form submitted:', {
      userType,
      ...data
    })
  }

  return (
    <div className="hero min-h-screen bg-[#020309] relative overflow-hidden">
      {/* Deep space background with electronic effects */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0CC0DF] via-black to-[#020309] opacity-10" />

        {/* Horizontal lines */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              initial={{ opacity: 0.2 }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                height: ['1px', '2px', '1px']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{ top: `${(i + 1) * 5}%` }}
              className="absolute w-full bg-[#0CC0DF]/40"
            />
          ))}
        </div>

        {/* Vertical lines */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              initial={{ opacity: 0.2 }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                width: ['1px', '2px', '1px']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{ left: `${(i + 1) * 5}%` }}
              className="absolute h-full bg-[#0CC0DF]/40"
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-center mb-8"
        >
          <span className="text-[#0CC0DF]">
            Enter the Source
          </span>
        </motion.h2>

        {!userType ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-12"
          >
            <h3 className="text-3xl md:text-5xl font-bold text-center text-[#0CC0DF]">
              Choose Your Path...
            </h3>
            <div className="flex flex-col gap-4 md:flex-row md:gap-16 w-full max-w-4xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUserType('player')}
                className="relative cursor-pointer group w-full md:w-1/2 h-[30vh] md:aspect-square rounded-2xl overflow-hidden border border-[#0CC0DF]/30"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <Image
                  src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/futuristic-ninja-digital-art-2-removebg.png"
                  alt="Player"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-3xl font-bold text-[#0CC0DF] z-20">Player</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUserType('studio')}
                className="relative cursor-pointer group w-full md:w-1/2 h-[30vh] md:aspect-square rounded-2xl overflow-hidden border border-[#0CC0DF]/30"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <Image
                  src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/view-futuristic-music-robot-droid.png"
                  alt="Game Developer"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-3xl font-bold text-[#0CC0DF] z-20">Game Devs</span>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-12 max-w-6xl mx-auto items-start"
          >
            <div className="w-[600px] h-[800px] relative flex-shrink-0">
              <Image
                src={userType === 'player'
                  ? "https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/futuristic-ninja-digital-art-2.png"
                  : "https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/view-futuristic-music-robot-droid.png"
                }
                alt={userType === 'player' ? "Player" : "Game Developer"}
                fill
                className="object-contain"
              />
            </div>

            <form onSubmit={handleSubmit} className="flex-1 space-y-6 bg-[#0CC0DF]/10 backdrop-blur-sm p-8 rounded-xl border border-[#0CC0DF]/30">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#0CC0DF]">
                  {userType === 'player' ? 'Player Contact Form' : 'Studio Contact Form'}
                </h3>
                <button
                  type="button"
                  onClick={() => setUserType(null)}
                  className="btn btn-outline border-[#0CC0DF] text-[#0CC0DF] hover:bg-[#0CC0DF] hover:text-white btn-sm"
                >
                  Change
                </button>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#0CC0DF]">Name</span>
                </label>
                <input name="name" type="text" className="input bg-[#0CC0DF]/10 border-[#0CC0DF]/30 w-full focus:border-[#0CC0DF]" />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#0CC0DF]">Email</span>
                </label>
                <input name="email" type="email" className="input bg-[#0CC0DF]/10 border-[#0CC0DF]/30 w-full focus:border-[#0CC0DF]" />
              </div>

              {userType === 'studio' && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#0CC0DF]">Studio Name</span>
                  </label>
                  <input name="studioName" type="text" className="input bg-[#0CC0DF]/10 border-[#0CC0DF]/30 w-full focus:border-[#0CC0DF]" />
                </div>
              )}

              {userType === 'player' && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#0CC0DF]">Favorite Games</span>
                  </label>
                  <input name="favoriteGames" type="text" className="input bg-[#0CC0DF]/10 border-[#0CC0DF]/30 w-full focus:border-[#0CC0DF]" />
                </div>
              )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#0CC0DF]">Message</span>
                </label>
                <textarea name="message" className="textarea bg-[#0CC0DF]/10 border-[#0CC0DF]/30 h-20 focus:border-[#0CC0DF]"></textarea>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-[#0CC0DF] hover:bg-[#0AA0BF] text-white w-full"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  )
}