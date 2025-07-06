'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState, Suspense } from 'react';

type NavigationContextType = {
  isNavigating: boolean;
};

const NavigationContext = createContext<NavigationContextType>({
  isNavigating: false,
});

export function useNavigation() {
  return useContext(NavigationContext);
}

// Create a separate component that uses useSearchParams
function NavigationWatcher({ setIsNavigating }: { setIsNavigating: (value: boolean) => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
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

      // Hide loading after a delay to ensure the animation is visible
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 1200); // Increased timing for better visibility

      return () => clearTimeout(timer);
    } else {
      // Ensure loading state is reset even if pathname didn't change
      setIsNavigating(false);
    }
  }, [pathname, prevPathname, setIsNavigating]);

  // Also reset when search params change
  useEffect(() => {
    // When search params change, show loading briefly then reset
    setIsNavigating(true);
    
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchParams, setIsNavigating]);

  return null;
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);

  // Ensure loading state is reset when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup function to reset loading state
      setIsNavigating(false);
    };
  }, []);

  return (
    <NavigationContext.Provider value={{ isNavigating }}>
      <Suspense fallback={null}>
        <NavigationWatcher setIsNavigating={setIsNavigating} />
      </Suspense>
      {children}
    </NavigationContext.Provider>
  );
}