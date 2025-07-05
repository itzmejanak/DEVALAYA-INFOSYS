'use client';

import Image from 'next/image';
import { useNavigation } from './navigation-provider';

export default function HeroLoading() {
  const { isNavigating } = useNavigation();

  if (!isNavigating) return null;

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