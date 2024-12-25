'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Dashboard from '../../mobileComponents/login/dashboard'
import { WalletConnectionProvider } from '../context/WalletConnectionProvider'
import { MTLProvider } from '../context/MtlContext'
import LoadingSpinner from '@/components/suspense'

const DelayedContent = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Showing content 0')
      setShow(true)
    }, 3000) // Force 3 second minimum delay
    return () => clearTimeout(timer)
  }, [])

  if (!show) {
    console.log('Showing content 1')
    return <LoadingSpinner />
  }

  return <>{children}</>
}

export default function LoginPage() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) {
        router.push('/login')
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [router])

  if (!isMobile) {
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