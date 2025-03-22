'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

export default function Testimonials() {
  const [isMobile, setIsMobile] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const testimonials = [
    {
      quote: "Pixel Perfect transformed our brand identity completely. Our online presence has never been stronger, and our engagement metrics have skyrocketed since working with their team.",
      author: "Sarah Johnson",
      position: "Marketing Director, TechVision Inc.",
      image: "/founder11.jpeg"
    },
    {
      quote: "The level of creativity and strategic thinking that Pixel Perfect brings to the table is unmatched. They don't just execute - they innovate and elevate.",
      author: "David Chen",
      position: "CEO, Nexus Startups",
      image: "/founder2.jpeg"
    },
    {
      quote: "Our social media campaigns have seen a 300% increase in engagement since partnering with Pixel Perfect. Their data-driven approach combined with creative excellence delivered results beyond our expectations.",
      author: "Michelle Rodriguez",
      position: "Brand Manager, Elevate Retail",
      image: "/starter1.jpeg"
    },
    {
      quote: "Working with Pixel Perfect has been the best decision for our rebranding initiative. They took the time to understand our vision and translated it into a stunning digital presence.",
      author: "James Wilson",
      position: "COO, Horizon Financial",
      image: "/saturn.jpg"
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block text-primary font-semibold mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            CLIENT TESTIMONIALS
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-neutral"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            What Our Clients <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Say About Us</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-neutral/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Don't just take our word for it - hear from the businesses we've helped transform
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-5 -left-5 w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              
              <p className="text-neutral/80 italic mb-6">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-neutral">{testimonial.author}</h4>
                  <p className="text-sm text-neutral/60">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Trusted by logos */}
        <div className="mt-24">
          <h3 className="text-center text-lg font-medium text-neutral/60 mb-10">Trusted by innovative companies worldwide</h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <Image src="/solana.png" alt="Client Logo 1" width={120} height={60} className="opacity-50 hover:opacity-100 transition-opacity" />
            <Image src="/hacken.png" alt="Client Logo 2" width={120} height={60} className="opacity-50 hover:opacity-100 transition-opacity" />
            <Image src="/magicDen.png" alt="Client Logo 3" width={120} height={60} className="opacity-50 hover:opacity-100 transition-opacity" />
            <Image src="/metaplex.png" alt="Client Logo 4" width={120} height={60} className="opacity-50 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </section>
  )
}