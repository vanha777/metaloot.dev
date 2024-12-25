'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Dashboard from '../../mobileComponents/login/dashboard'
import { WalletConnectionProvider } from '../context/WalletConnectionProvider'
import { MTLProvider } from '../context/MtlContext'

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
        <Dashboard />
      </MTLProvider>
    </WalletConnectionProvider>
  )
}