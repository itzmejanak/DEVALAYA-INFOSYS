'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

type NavigationContextType = {
  isNavigating: boolean;
};

const NavigationContext = createContext<NavigationContextType>({
  isNavigating: false,
});

export function useNavigation() {
  return useContext(NavigationContext);
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [prevPathname, setPrevPathname] = useState<string | null>(null);

  useEffect(() => {
    // If this is the first render, don't show loading
    if (prevPathname === null) {
      setPrevPathname(pathname);
      return;
    }

    // If pathname changed, show loading
    if (prevPathname !== pathname) {
      setIsNavigating(true);
      setPrevPathname(pathname);

      // Hide loading after a short delay to ensure the animation is visible
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 800); // Adjust timing as needed

      return () => clearTimeout(timer);
    }
  }, [pathname, prevPathname]);

  // Also reset when search params change
  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [searchParams, isNavigating]);

  return (
    <NavigationContext.Provider value={{ isNavigating }}>
      {children}
    </NavigationContext.Provider>
  );
}