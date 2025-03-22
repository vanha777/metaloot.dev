import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head';
import { Analytics } from "@vercel/analytics/react"
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { AppProvider } from './utils/AppContext';
config.autoAddCss = false
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pixel Perfect - Creative Marketing Agency',
  description: 'Innovative marketing solutions for modern businesses.',
  openGraph: {
    title: 'Pixel Perfect - Creative Marketing Agency',
    description: 'Innovative marketing solutions for modern businesses.',
    url: 'https://www.pixelperfect.agency/',
    images: [
      {
        url: 'https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/banner.png',
        alt: 'Pixel Perfect Creative Marketing Agency',
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
    <html lang="en" data-theme="marketing">
      <Head>
        {/* General Meta Tags */}
        <meta name="title" content="Pixel Perfect - Creative Marketing Agency" />
        <meta name="description" content="Innovative marketing solutions for modern businesses." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.pixelperfect.agency/" />
        <meta property="og:title" content="Pixel Perfect - Creative Marketing Agency" />
        <meta property="og:description" content="Innovative marketing solutions for modern businesses." />
        <meta property="og:image" content="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/banner.png" />
        <meta property="og:image:alt" content="A showcase of Pixel Perfect's creative marketing solutions" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.pixelperfect.agency/" />
        <meta name="twitter:title" content="Pixel Perfect - Creative Marketing Agency" />
        <meta name="twitter:description" content="Innovative marketing solutions for modern businesses." />
        <meta name="twitter:image" content="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/banner.png" />
        <meta name="twitter:image:alt" content="A showcase of Pixel Perfect's creative marketing solutions" />
        <meta name="twitter:site" content="@pixelperfectagency" />
        <meta name="twitter:creator" content="@pixelperfectagency" />

        {/* Telegram */}
        <meta property="og:title" content="Pixel Perfect - Creative Marketing Agency" />
        <meta property="og:description" content="Innovative marketing solutions for modern businesses." />
        <meta property="og:image" content="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/banner.png" />
        <meta property="og:url" content="https://www.pixelperfect.agency/" />

        {/* Discord */}
        <meta property="og:title" content="Pixel Perfect - Creative Marketing Agency" />
        <meta property="og:description" content="Innovative marketing solutions for modern businesses." />
        <meta property="og:image" content="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/banner.png" />
        <meta property="og:type" content="website" />
      </Head>
      <body suppressHydrationWarning={true} className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
        <Analytics />
      </body>
    </html>
  )
} 