'use client';

import Image from 'next/image';

interface DataLoadingIndicatorProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  showLogo?: boolean;
}

export default function DataLoadingIndicator({ 
  message = "Loading...", 
  size = 'md',
  showLogo = true 
}: DataLoadingIndicatorProps) {
  const sizeClasses = {
    sm: {
      container: 'w-16 h-16',
      logo: { width: 48, height: 48 },
      text: 'text-sm',
      bar: 'w-16 h-1'
    },
    md: {
      container: 'w-24 h-24',
      logo: { width: 72, height: 72 },
      text: 'text-base',
      bar: 'w-24 h-1.5'
    },
    lg: {
      container: 'w-32 h-32',
      logo: { width: 96, height: 96 },
      text: 'text-lg',
      bar: 'w-32 h-2'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {showLogo && (
        <div className={`${currentSize.container} bg-white rounded-xl flex items-center justify-center animate-pulse shadow-lg p-2 mb-4`}>
          <Image 
            src="/logo.png" 
            alt="Devalaya Infosys Logo" 
            width={currentSize.logo.width} 
            height={currentSize.logo.height} 
            className="object-contain" 
            priority
          />
        </div>
      )}
      
      <div className={`text-navy font-medium ${currentSize.text} mb-3`}>
        {message}
      </div>
      
      <div className={`${currentSize.bar} bg-gradient-to-r from-gold/30 via-gold to-gold/30 rounded-full animate-pulse`}></div>
      
      {/* Animated dots */}
      <div className="flex space-x-1 mt-3">
        <div className="w-2 h-2 bg-gold rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}