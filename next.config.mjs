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
  // Add experimental features for better page transitions
  experimental: {
    scrollRestoration: true,
  },
  // Remove standalone output for local builds to avoid Windows symlink permission issues
  // Vercel will handle this automatically in production
  // output: 'standalone',
  // Configure how Next.js handles external data fetching during build
  // This helps with MongoDB connections during build
  serverExternalPackages: ['mongoose'],
}

export default nextConfig
