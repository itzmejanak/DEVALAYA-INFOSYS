'use client';

import Image from 'next/image';
import { useNavigation } from './navigation-provider';
import { useEffect, useState } from 'react';

export default function HeroLoading() {
  const { isNavigating } = useNavigation();
  const [showLoading, setShowLoading] = useState(false);
  
  // Use effect to handle the loading state with a safety timeout
  useEffect(() => {
    if (isNavigating) {
      // Show loading immediately when navigation starts
      setShowLoading(true);
      
      // Safety timeout to ensure loading doesn't get stuck
      const safetyTimer = setTimeout(() => {
        setShowLoading(false);
      }, 5000); // Force hide after 3 seconds max
      
      return () => clearTimeout(safetyTimer);
    } else {
      // Add a small delay before hiding to ensure the loading is visible
      const hideTimer = setTimeout(() => {
        setShowLoading(false);
      }, 1000); // Short delay to ensure loading is visible
      
      return () => clearTimeout(hideTimer);
    }
  }, [isNavigating]);
  
  if (!showLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-all duration-300 animate-in fade-in-50">
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
          
          {/* Background decorative elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-navy/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gold/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}