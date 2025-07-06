/**
 * Central configuration file for environment variables and application settings
 */

// Environment detection
export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';
export const isStaticBuild = process.env.NEXT_PHASE === 'phase-production-build';

// URL Configuration
const getBaseUrl = () => {
  // For server-side rendering and static site generation
  if (typeof window === 'undefined') {
    // Vercel deployment
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    // Custom deployment URL
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      return process.env.NEXT_PUBLIC_SITE_URL;
    }
    // Local development fallback
    return 'http://localhost:3000';
  }
  
  // For client-side rendering, use the browser's URL
  return window.location.origin;
};

// Database Configuration
const getDatabaseConfig = () => ({
  connectionTimeout: isStaticBuild ? 5000 : 30000,
  serverSelectionTimeout: isStaticBuild ? 5000 : 30000,
});

// Export the configuration object
export const config = {
  app: {
    name: 'Devalaya Infosys',
    version: '1.0.0',
  },
  urls: {
    base: getBaseUrl(),
    api: {
      projects: `${getBaseUrl()}/api/projects`,
      blogs: `${getBaseUrl()}/api/blogs`,
      careers: `${getBaseUrl()}/api/careers`,
      users: `${getBaseUrl()}/api/users`,
    },
  },
  db: getDatabaseConfig(),
  build: {
    isStaticBuild,
  },
  cache: {
    revalidationTime: 3600, // 1 hour
  },
};

export default config;