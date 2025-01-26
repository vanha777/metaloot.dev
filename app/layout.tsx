import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head';
import { Analytics } from "@vercel/analytics/react"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MetaLoot - Blockchain API For Gaming',
  description: 'Ship faster, cheaper and better with our API.',
  openGraph: {
    title: 'MetaLoot - Blockchain API For Gaming',
    description: 'Ship faster, cheaper and better with our API.',
    url: 'https://www.metaloot.dev/',
    images: [
      {
        url: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/banner.png',
        alt: 'MetaLoot blockchain API For Gaming',
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
        <meta name="title" content="MetaLoot - Blockchain API For Gaming" />
        <meta name="description" content="Ship faster, cheaper and better with our API." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.metaloot.dev/" />
        <meta property="og:title" content="MetaLoot - Blockchain API For Gaming" />
        <meta property="og:description" content="Ship faster, cheaper and better with our API." />
        <meta property="og:image" content="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/banner.png" />
        <meta property="og:image:alt" content="A stunning preview of MetaLoot's multiverse gaming platform" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.metaloot.dev/" />
        <meta name="twitter:title" content="MetaLoot - Blockchain API For Gaming" />
        <meta name="twitter:description" content="Ship faster, cheaper and better with our API." />
        <meta name="twitter:image" content="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/banner.png" />
        <meta name="twitter:image:alt" content="A stunning preview of MetaLoot's multiverse gaming platform" />
        <meta name="twitter:site" content="@playmetaloot" />
        <meta name="twitter:creator" content="@playmetaloot" />

        {/* Telegram */}
        <meta property="og:title" content="MetaLoot - Blockchain API For Gaming" />
        <meta property="og:description" content="Ship faster, cheaper and better with our API." />
        <meta property="og:image" content="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/banner.png" />
        <meta property="og:url" content="https://www.metaloot.dev/" />

        {/* Discord */}
        <meta property="og:title" content="MetaLoot - Blockchain API For Gaming" />
        <meta property="og:description" content="Ship faster, cheaper and better with our API." />
        <meta property="og:image" content="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/banner.png" />
        <meta property="og:type" content="website" />
      </Head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
} 