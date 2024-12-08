import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MetaLoot - Bridge Between Gaming and Reality',
  description: 'Multiverse On-Chain Gaming Protocol: Revolutionizing Gaming Experiences.',
  openGraph: {
    title: 'MetaLoot - Bridge Between Gaming and Reality',
    description: 'Multiverse On-Chain Gaming Protocol: Revolutionizing Gaming Experiences.',
    url: 'https://www.metaloot.app/',
    images: [
      {
        url: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/fire.jpg',
        alt: 'MetaLoot In Action',
      },
    ],
  },
  icons: {
    icon: '/logo.png',
    // You can also specify different sizes
    apple: [
      { url: '/logo.png' },
      { url: '/apple.png', sizes: '180x180' }
    ],
    shortcut: '/favicon.ico'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="metaloot">
      <Head>
        {/* General Meta Tags */}
        <meta name="title" content="MetaLoot - Bridge Between Gaming and Reality" />
        <meta name="description" content="Multiverse On-Chain Gaming Protocol: Revolutionizing Gaming Experiences." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.metaloot.app/" />
        <meta property="og:title" content="MetaLoot - Bridge Between Gaming and Reality" />
        <meta property="og:description" content="Multiverse On-Chain Gaming Protocol: Revolutionizing Gaming Experiences." />
        <meta property="og:image" content="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/fire.jpg" />
        <meta property="og:image:alt" content="A stunning preview of MetaLoot's multiverse gaming platform" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.metaloot.app/" />
        <meta name="twitter:title" content="MetaLoot - Bridge Between Gaming and Reality" />
        <meta name="twitter:description" content="Multiverse On-Chain Gaming Protocol: Revolutionizing Gaming Experiences." />
        <meta name="twitter:image" content="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/fire.jpg" />
        <meta name="twitter:image:alt" content="A stunning preview of MetaLoot's multiverse gaming platform" />
        <meta name="twitter:site" content="@playmetaloot" />
        <meta name="twitter:creator" content="@playmetaloot" />

        {/* Telegram */}
        <meta property="og:title" content="MetaLoot - Bridge Between Gaming and Reality" />
        <meta property="og:description" content="Multiverse On-Chain Gaming Protocol: Revolutionizing Gaming Experiences." />
        <meta property="og:image" content="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/fire.jpg" />
        <meta property="og:url" content="https://www.metaloot.app/" />

        {/* Discord */}
        <meta property="og:title" content="MetaLoot - Bridge Between Gaming and Reality" />
        <meta property="og:description" content="Multiverse On-Chain Gaming Protocol: Revolutionizing Gaming Experiences." />
        <meta property="og:image" content="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/fire.jpg" />
        <meta property="og:type" content="website" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
} 