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
    <section className="h-screen bg-gradient-to-br from-gray-900 to-black relative overflow-hidden flex items-center">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-primary rounded-full animate-pulse" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-secondary rounded-full animate-pulse animation-delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-8"
        >
          <span className="bg-gradient-to-l from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
            About You
          </span>
        </motion.h2>

        {!userType ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6 md:gap-12"
          >
            <h3 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              I Am A...
            </h3>
            <div className="flex flex-col gap-4 md:flex-row md:gap-16 w-full max-w-4xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUserType('player')}
                className="relative cursor-pointer group w-full md:w-1/2 h-[30vh] md:aspect-square rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <Image
                  src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%2020.jpeg"
                  alt="Player"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-bold text-white z-20">Player</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUserType('studio')}
                className="relative cursor-pointer group w-full md:w-1/2 h-[30vh] md:aspect-square rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <Image
                  src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/Image%2019.jpeg"
                  alt="Game Developer"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-bold text-white z-20">Game Devs</span>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-md mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 bg-base-200/20 backdrop-blur-sm p-4 md:p-8 rounded-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-bold text-primary">
                  {userType === 'player' ? 'Player Contact Form' : 'Studio Contact Form'}
                </h3>
                <button
                  type="button"
                  onClick={() => setUserType(null)}
                  className="btn btn-ghost btn-sm"
                >
                  Change
                </button>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input name="name" type="text" className="input input-bordered w-full" />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input name="email" type="email" className="input input-bordered w-full" />
              </div>

              {userType === 'studio' && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Studio Name</span>
                  </label>
                  <input name="studioName" type="text" className="input input-bordered w-full" />
                </div>
              )}

              {userType === 'player' && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Favorite Games</span>
                  </label>
                  <input name="favoriteGames" type="text" className="input input-bordered w-full" />
                </div>
              )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea name="message" className="textarea textarea-bordered h-20"></textarea>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary w-full"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  )
}