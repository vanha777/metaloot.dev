'use client'
import Dashboard from '../../components/login/dashboard'
import { WalletConnectionProvider } from '../context/WalletConnectionProvider'

export default function LoginPage() {
  return (
      <WalletConnectionProvider>
        <Dashboard />
      </WalletConnectionProvider>
  )
}