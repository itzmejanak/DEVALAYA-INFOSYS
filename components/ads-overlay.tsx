'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdsData {
  _id: string;
  imgUrl: string;
  isVisible: boolean;
  desc: string;
  link?: string;
  title?: string;
}

export default function AdsOverlay() {
  const [adsData, setAdsData] = useState<AdsData[]>([]);
  const [currentAd, setCurrentAd] = useState<AdsData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        console.log('Fetching ads data...');
        const response = await fetch('/api/data/adsdata');
        console.log('Response status:', response.status);
        const result = await response.json();
        console.log('API result:', result);
        
        if (result.success && result.data) {
          const visibleAds = result.data.filter((ad: AdsData) => ad.isVisible);
          console.log('Visible ads:', visibleAds);
          setAdsData(visibleAds);
          
          if (visibleAds.length > 0) {
            setCurrentAd(visibleAds[0]);
            console.log('Setting current ad:', visibleAds[0]);
            setTimeout(() => {
              console.log('Showing ad overlay');
              setIsVisible(true);
            }, 2000);
          } else {
            console.log('No visible ads found');
          }
        } else {
          console.log('No data or unsuccessful response');
        }
      } catch (error) {
        console.error('Error fetching ads data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdsData();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAdClick = () => {
    if (currentAd?.link) {
      window.open(currentAd.link, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (isLoading || !currentAd || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Centered popup container */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                duration: 0.4 
              }}
              className="w-full max-w-md"
            >
              <div className="relative bg-background border border-border rounded-2xl shadow-2xl overflow-hidden group">
                {/* Header with close button */}
                <div className="relative flex justify-between items-center p-4 bg-card border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Sponsored
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="h-8 w-8 rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Ad content */}
                <div 
                  className={`relative ${currentAd.link ? 'cursor-pointer' : ''}`}
                  onClick={currentAd.link ? handleAdClick : undefined}
                >
                  {/* Ad image */}
                  <div className="relative h-64 w-full overflow-hidden bg-muted">
                    <Image
                      src={currentAd.imgUrl}
                      alt={currentAd.title || "Advertisement"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 448px) 100vw, 448px"
                      priority={false}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    
                    {currentAd.link && (
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink className="h-4 w-4 text-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Content area */}
                  <div className="p-6">
                    {currentAd.title && (
                      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                        {currentAd.title}
                      </h3>
                    )}
                    
                    {currentAd.desc && (
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                        {currentAd.desc}
                      </p>
                    )}

                    {currentAd.link && (
                      <Button 
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium transition-all duration-200 hover:shadow-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAdClick();
                        }}
                      >
                        Learn More
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Accent border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent"></div>
              </div>

              {/* Subtle shadow */}
              <div className="absolute -bottom-2 left-4 right-4 h-4 bg-black/10 rounded-full blur-md -z-10"></div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}