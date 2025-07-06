'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function LoadingIndicator() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    // Add event listeners for route changes
    window.addEventListener('beforeunload', handleStart);
    
    return () => {
      window.removeEventListener('beforeunload', handleStart);
    };
  }, []);

  // Listen for pathname changes
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative">
        {/* Hero-style loading animation */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center animate-pulse shadow-lg p-2">
            <Image 
              src="/logo.png" 
              alt="Devalaya Infosys Logo" 
              width={120} 
              height={120} 
              className="object-contain" 
              priority
            />
          </div>
          <div className="mt-3 text-navy font-bold text-xl">Loading...</div>
          <div className="mt-2 w-32 h-1.5 bg-gradient-to-r from-gold/30 via-gold to-gold/30 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}