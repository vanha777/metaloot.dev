import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tzqzzuafkobkhygtccse.supabase.co',
      },
    ],
  },
}

export default nextConfig;
