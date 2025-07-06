/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Set output to standalone for better Vercel deployment
  output: 'standalone',
  // Configure how Next.js handles external data fetching during build
  experimental: {
    // This helps with MongoDB connections during build
    serverComponentsExternalPackages: ['mongoose']
  },
}

export default nextConfig
