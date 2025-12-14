/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // Note: 'output: standalone' removed - causes Windows symlink permission errors (EPERM)
  // Vercel will handle standalone output automatically in production
  // Configure how Next.js handles external data fetching during build
  // This helps with MongoDB connections during build
  serverExternalPackages: ['mongoose'],
}

export default nextConfig
