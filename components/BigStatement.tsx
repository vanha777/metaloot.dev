'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full filter blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl" />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2">
            {/* Left Column - Dark section */}
            <div className="bg-neutral p-12 md:p-16 relative overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral via-neutral to-primary/20 opacity-50" />
              
              <div className="relative z-10">
                <motion.h3 
                  className="text-white text-3xl md:text-4xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Ready to transform your digital presence?
                </motion.h3>
                
                <motion.p 
                  className="text-white/80 text-lg mb-8 max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Let's collaborate to create marketing strategies that drive real results for your business.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center px-8 py-4 bg-white text-neutral rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-colors"
                  >
                    Get in Touch
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </div>
            
            {/* Right Column - Light section with stats */}
            <div className="p-12 md:p-16">
              <motion.h4 
                className="text-neutral text-2xl font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Why choose <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Pixel Perfect</span>?
              </motion.h4>
              
              <div className="grid grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p className="text-4xl font-bold text-primary mb-2">98%</p>
                  <p className="text-neutral/70">Client satisfaction rate</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <p className="text-4xl font-bold text-secondary mb-2">250+</p>
                  <p className="text-neutral/70">Projects completed</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <p className="text-4xl font-bold text-primary mb-2">135%</p>
                  <p className="text-neutral/70">Average ROI increase</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <p className="text-4xl font-bold text-secondary mb-2">15+</p>
                  <p className="text-neutral/70">Industry awards</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}