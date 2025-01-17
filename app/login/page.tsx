'use client'
import { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Dashboard from '../../components/login/dashboard'
import { WalletConnectionProvider } from '../context/WalletConnectionProvider'
import { MTLProvider } from '../context/MtlContext'
import { motion } from 'framer-motion'
import LoadingSpinner from '@/components/suspense'

const DelayedContent = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, 3000) // Force 3 second minimum delay
    return () => clearTimeout(timer)
  }, [])

  if (!show) {
    return <LoadingSpinner />
  }

  return <>{children}</>
}

export default function LoginPage() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        window.location.href = 'https://phantom.app/ul/browse/https%3A%2F%2Fwww.metaloot.app%2Fmobile?ref=https%3A%2F%2Fwww.metaloot.app%2F'
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return null
  }

  return (
    <WalletConnectionProvider>
      <MTLProvider>
        <DelayedContent>
          <Dashboard />
        </DelayedContent>
      </MTLProvider>
    </WalletConnectionProvider>
  )
}