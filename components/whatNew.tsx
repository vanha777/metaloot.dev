'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Portfolio() {
  const projects = [
    {
      title: "Brand Refresh",
      category: "Branding",
      client: "GlobalTech Solutions",
      image: "/starter1.jpeg",
      link: "#"
    },
    {
      title: "Digital Campaign", 
      category: "Marketing",
      client: "Eco Living",
      image: "/launchPad.jpeg",
      link: "#"
    },
    {
      title: "E-commerce Redesign",
      category: "Web Design",
      client: "Modern Retail",
      image: "/marketplaces.jpeg",
      link: "#"
    },
    {
      title: "Social Media Strategy",
      category: "Social Media", 
      client: "Urban Fashion",
      image: "/whymetaloot.jpeg",
      link: "#"
    },
    {
      title: "Content Marketing",
      category: "Content", 
      client: "Wellness Inc",
      image: "/whynow.jpeg",
      link: "#"
    },
    {
      title: "SEO Optimization",
      category: "SEO", 
      client: "Local Service Co",
      image: "/whyuss.jpeg",
      link: "#"
    }
  ]

  const categories = [
    "All", "Branding", "Marketing", "Web Design", "Content", "Social Media", "SEO"
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="portfolio" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-secondary/5 rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold mb-3">
            OUR WORK
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral">
            Featured <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-neutral/80 max-w-3xl mx-auto">
            Explore our diverse portfolio of successful marketing campaigns and creative solutions
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                index === 0 
                  ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                  : 'bg-white text-neutral hover:bg-primary/10 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group cursor-pointer rounded-xl overflow-hidden bg-white shadow-lg border border-gray-100"
            >
              <Link href={project.link}>
                <div className="relative h-[240px] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-xs font-bold text-white bg-primary/80 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-sm text-neutral/60">{project.client}</span>
                  <h3 className="text-xl font-bold text-neutral mt-1 mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral/70 text-sm">{project.category}</span>
                    <div className="text-primary font-medium flex items-center group-hover:translate-x-2 transition-transform">
                      View Project
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link 
            href="/portfolio" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium text-lg hover:shadow-lg transition-shadow"
          >
            View All Projects
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}