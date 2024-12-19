'use client'
import Dashboard from '../../components/login/dashboard'
import { WalletConnectionProvider } from '../context/WalletConnectionProvider'
import { MTLProvider } from '../context/MtlContext'

export default function LoginPage() {
  return (
    <WalletConnectionProvider>
      <MTLProvider>
        <Dashboard />
      </MTLProvider>
    </WalletConnectionProvider>
  )
}