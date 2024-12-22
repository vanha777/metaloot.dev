'use client'

import { useEffect, useState } from 'react'

export default function GameWrapper() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0A1628]">
      <div className="relative w-[960px] h-[540px] rounded-xl overflow-hidden shadow-2xl">
        <iframe 
          src="https://play.famobi.com/gold-mine"
          width="960"
          height="540"
          frameBorder="no" 
          scrolling="no"
          className="absolute inset-0"
        />
      </div>
    </div>
  )
}
