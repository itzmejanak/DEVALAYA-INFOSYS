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
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

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

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const maxWidth = 500;
    const maxHeight = 400;
    
    let width = img.naturalWidth;
    let height = img.naturalHeight;
    
    // Scale down if too large, maintaining aspect ratio
    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }
    
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }
    
    setImageDimensions({ width, height });
  };

  const handleClose = () => {
    setIsVisible(false);
    setImageDimensions(null);
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
          {/* Enhanced backdrop overlay with subtle animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60 backdrop-blur-md"
            onClick={handleClose}
          />
          
          {/* Centered popup container */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20, rotateX: -5 }}
              transition={{ 
                type: "spring", 
                stiffness: 280, 
                damping: 20,
                duration: 0.6 
              }}
              className="w-full max-w-lg"
              style={{ 
                maxWidth: imageDimensions ? `${imageDimensions.width + 48}px` : '500px'
              }}
            >
              <div className="relative bg-gradient-to-br from-background via-background to-background/95 border border-border/50 rounded-3xl shadow-2xl overflow-hidden group backdrop-blur-sm">
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-accent via-primary to-accent opacity-60">
                  <div className="w-full h-full rounded-3xl bg-background"></div>
                </div>
                
                {/* Content wrapper */}
                <div className="relative z-10">
                  {/* Enhanced header with close button */}
                  <div className="relative flex justify-between items-center px-6 bg-gradient-to-br from-card/80 to-card/60 border-b border-border/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full animate-ping opacity-40"></div>
                      </div>
                      <span className="text-sm font-semibold text-muted-foreground tracking-wide">
                        SPONSORED
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleClose}
                      className="h-9 w-9 rounded-xl hover:bg-muted/80 transition-all duration-200 hover:scale-105 hover:rotate-90 hover:text-back"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Ad content */}
                  <div 
                    className={`relative ${currentAd.link ? 'cursor-pointer' : ''} overflow-hidden`}
                    onClick={currentAd.link ? handleAdClick : undefined}
                  >
                    {/* Ad image with natural sizing */}
                    <div 
                      className="relative w-full overflow-hidden bg-gradient-to-br from-muted/50 to-muted"
                      style={{
                        height: imageDimensions ? `${imageDimensions.height}px` : '300px'
                      }}
                    >
                      <Image
                        src={currentAd.imgUrl}
                        alt={currentAd.title || "Advertisement"}
                        fill
                        className="object-contain transition-all duration-700 ease-out group-hover:scale-[1.02]"
                        sizes="(max-width: 500px) 100vw, 500px"
                        priority={false}
                        onLoad={handleImageLoad}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.jpg';
                        }}
                      />
                      
                      {/* Hover overlay with smooth transition */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {currentAd.link && (
                        <motion.div 
                          className="absolute top-5 right-5 bg-background/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ 
                            opacity: 1, 
                            scale: 1.1,
                            transition: { duration: 0.2 }
                          }}
                          animate={{ 
                            opacity: 0,
                            scale: 0.9
                          }}
                          whileInView={{
                            opacity: [0, 1, 0],
                            scale: [0.8, 1, 0.9],
                            transition: { 
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3
                            }
                          }}
                        >
                          <ExternalLink className="h-4 w-4 text-foreground" />
                        </motion.div>
                      )}
                    </div>

                    {/* Enhanced content area */}
                    <div className="px-6 py-2 bg-gradient-to-br from-background to-background/95">
                      {currentAd.title && (
                        <motion.h3 
                          className="text-xl font-bold text-foreground line-clamp-2 leading-tight"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {currentAd.title}
                        </motion.h3>
                      )}
                      
                      {currentAd.desc && (
                        <motion.p 
                          className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-5"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {currentAd.desc}
                        </motion.p>
                      )}

                      {currentAd.link && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Button 
                            className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-accent-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 transform hover:scale-[1.02] rounded-xl py-3"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAdClick();
                            }}
                          >
                            Learn More
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced floating elements */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-accent/20 rounded-full blur-sm"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-primary/20 rounded-full blur-md"></div>
              </div>

              {/* Enhanced shadow with multiple layers */}
              <div className="absolute -bottom-4 left-6 right-6 h-6 bg-black/15 rounded-full blur-xl -z-10"></div>
              <div className="absolute -bottom-2 left-8 right-8 h-3 bg-black/20 rounded-full blur-lg -z-10"></div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}