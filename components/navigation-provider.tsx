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

      // Hide loading after a short delay to ensure the animation is visible
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 800); // Adjust timing as needed

      return () => clearTimeout(timer);
    }
  }, [pathname, prevPathname, setIsNavigating]);

  // Also reset when search params change
  useEffect(() => {
    if (searchParams.toString() !== '') {
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [searchParams, setIsNavigating]);

  return null;
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <NavigationContext.Provider value={{ isNavigating }}>
      <Suspense fallback={null}>
        <NavigationWatcher setIsNavigating={setIsNavigating} />
      </Suspense>
      {children}
    </NavigationContext.Provider>
  );
}