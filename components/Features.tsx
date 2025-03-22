'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Features() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  }

  const cards = [
    {
      title: "Digital Marketing",
      description: "Strategic digital campaigns that drive traffic, increase engagement, and boost conversion rates across all platforms.",
      image: "/rewards.jpeg",
      icon: "📈"
    },
    {
      title: "Brand Development",
      description: "Crafting memorable brand identities with custom logos, color palettes, and design systems that resonate with your audience.",
      image: "/ownership.jpeg",
      icon: "🎨"
    },
    {
      title: "Content Creation",
      description: "Engaging, SEO-optimized content that tells your brand story and connects with customers at every touchpoint.",
      image: "/whymetaloot.jpeg",
      icon: "✍️"
    },
    {
      title: "Web Design & Development",
      description: "Beautiful, responsive websites that blend stunning aesthetics with seamless functionality for an exceptional user experience.",
      image: "/marketplaces.jpeg",
      icon: "💻"
    },
    {
      title: "Social Media Management",
      description: "Strategic social presence management that builds communities and drives meaningful engagement with your target audience.",
      image: "/launchPad.jpeg",
      icon: "📱"
    },
    {
      title: "Analytics & Optimization",
      description: "Data-driven insights that track performance metrics and continuously refine strategies for maximum ROI.",
      image: "/apiDashboard.png",
      icon: "📊"
    },
  ];

  return (
    <section id="services" className="relative overflow-hidden flex items-center justify-center px-4 md:px-8 py-24 bg-white">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white">
        {/* Subtle shapes */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/5 rounded-full" />
      </div>

      <motion.div
        className="w-full relative z-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block text-primary font-semibold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            OUR SERVICES
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-neutral"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Transforming Ideas Into <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Digital Excellence</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-neutral/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Our comprehensive suite of marketing services is designed to help your business shine in the digital landscape
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Image Header */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral/70 to-transparent"></div>
              </div>
              
              {/* Content */}
              <div className="p-6 relative">
                <div className="absolute -top-10 left-6 w-16 h-16 rounded-lg bg-white shadow-md flex items-center justify-center text-2xl">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 mt-2 text-neutral">
                  {card.title}
                </h3>
                <p className="text-neutral/70">
                  {card.description}
                </p>
                <div className="mt-6">
                  <a href="#" className="text-primary font-medium flex items-center">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}