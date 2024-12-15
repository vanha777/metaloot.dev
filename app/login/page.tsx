'use client'
import Dashboard from '../../components/login/dashboard'
import { UserProvider } from '../context/userContext'

export default function LoginPage() {
  return (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  )
}