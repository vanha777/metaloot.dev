'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import Satements from '@/components/statements'
import Roadmap from '@/components/Roadmap'
import Contact from '@/components/Contact'
import About from '@/components/about'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const slides = [
    { component: <Hero key="hero" />, name: 'X' },
    { component: <Satements key="x" />, name: 'Y' },
    { component: <About key="about" />, name: 'Z' },
    // { component: <MetalianDawn key="roadmap1" />, name: 'Metalian Dawn' },
    { component: <Roadmap key="roadmap" />, name: 'A' },
    { component: <Contact key="contact" />, name: 'B' },
    // { component: <Roadmap3 key="roadmap3" />, name: 'Phase 3' },
    // { component: <Roadmap4 key="roadmap4" />, name: 'Phase 4' }
  ]

  useEffect(() => {
    let lastScrollTime = 0;
    const scrollCooldown = 1000;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const currentTime = Date.now();

      if (currentTime - lastScrollTime < scrollCooldown) {
        return;
      }

      if (e.deltaY > 0) {
        setCurrentSlide(prev =>
          prev === slides.length - 1 ? prev : prev + 1
        );
        lastScrollTime = currentTime;
      } else {
        setCurrentSlide(prev =>
          prev === 0 ? prev : prev - 1
        );
        lastScrollTime = currentTime;
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [slides.length])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main className="bg-base-100 h-screen overflow-hidden relative">
      <div
        className="transition-transform duration-500 ease-in-out h-full"
        style={{ 
          transform: isMobile 
            ? `translateY(-${currentSlide * 100}%)` 
            : `translateX(-${currentSlide * 100}%)`
        }}
      >
        <div className={`${isMobile ? 'flex flex-col' : 'flex'} h-full`}>
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full h-full flex-shrink-0">
              {slide.component}
            </div>
          ))}
        </div>
      </div>

      {/* Timeline navigation with labels */}
      <div className={`absolute ${isMobile ? 'right-8 top-1/2 -translate-y-1/2' : 'bottom-8 left-1/2 -translate-x-1/2'}`}>
        <div className={`${isMobile ? 'w-[2px] h-[300px]' : 'h-[2px] w-[300px]'} bg-base-300 relative`}>
          <div className={`absolute ${isMobile ? 'left-1/2 -translate-x-1/2 flex flex-col' : 'top-1/2 -translate-y-1/2 flex'} justify-between ${isMobile ? 'h-full' : 'w-full'}`}>
            {slides.map((slide, index) => (
              <div key={index} className={`flex ${isMobile ? 'items-center' : 'flex-col items-center'}`}>
                {isMobile && <span className={`text-sm transition-colors duration-300 mr-2 ${currentSlide === index
                  ? 'text-primary font-medium'
                  : 'text-base-content/70'
                  }`}>
                  {slide.name}
                </span>}
                <button
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${!isMobile ? 'mb-2' : ''} ${currentSlide === index
                    ? 'bg-primary scale-125'
                    : 'bg-base-300 hover:bg-primary/50'
                    }`}
                />
                {!isMobile && <span className={`text-sm transition-colors duration-300 ${currentSlide === index
                  ? 'text-primary font-medium'
                  : 'text-base-content/70'
                  }`}>
                  {slide.name}
                </span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}