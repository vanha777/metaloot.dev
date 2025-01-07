'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function WhatNew() {
  const projects = [
    {
      title: "MetaLoot Launch Pad",
      image: "/launchpad.png",
      link: "/launchpad"
    },
    {
      title: "MetaLoot SDK", 
      image: "/sdk.png",
      link: "/sdk"
    },
    {
      title: "Developer Portal",
      image: "/portal.png",
      link: "/developers"
    },
    {
      title: "Community Hub",
      image: "/community.png", 
      link: "/community"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="min-h-screen bg-[#020309] relative overflow-hidden py-24">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0CC0DF] via-black to-[#020309] opacity-10" />
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-[#0CC0DF]">What's New</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the latest updates about MetaLoot, our projects and development progress. Stay informed about new features and improvements.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <Link href={project.link} key={index}>
              <motion.div
                variants={itemVariants}
                className="relative group cursor-pointer"
              >
                <div className="relative h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                      <div className="mt-2 text-[#0CC0DF]">Learn More →</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}