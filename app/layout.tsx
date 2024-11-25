import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MetaLoot - Bridge Between Gaming and Reality',
  description: 'Exchange in-game items for real-world assets through NFTs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="metaloot">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 