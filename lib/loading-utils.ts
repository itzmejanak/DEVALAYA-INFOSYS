// Utility function to ensure minimum loading time for better UX
export const withMinimumLoadingTime = async <T>(
  asyncFunction: () => Promise<T>,
  minimumTime: number = 800 // Default 800ms - not too long, not too short
): Promise<T> => {
  const startTime = Date.now();
  
  try {
    const result = await asyncFunction();
    const elapsedTime = Date.now() - startTime;
    
    // If the operation completed faster than minimum time, wait for the remaining time
    if (elapsedTime < minimumTime) {
      await new Promise(resolve => setTimeout(resolve, minimumTime - elapsedTime));
    }
    
    return result;
  } catch (error) {
    const elapsedTime = Date.now() - startTime;
    
    // Even on error, ensure minimum loading time for consistent UX
    if (elapsedTime < minimumTime) {
      await new Promise(resolve => setTimeout(resolve, minimumTime - elapsedTime));
    }
    
    throw error;
  }
};

// Different loading times for different types of operations
export const LOADING_TIMES = {
  FAST: 500,      // For simple data fetching
  NORMAL: 800,    // For regular page loads
  SLOW: 1200,     // For complex operations
  VERY_SLOW: 2000 // For heavy operations
};

// Hook for managing loading states with minimum time
export const useMinimumLoading = (minimumTime: number = LOADING_TIMES.NORMAL) => {
  const executeWithMinimumLoading = async <T>(
    asyncFunction: () => Promise<T>
  ): Promise<T> => {
    return withMinimumLoadingTime(asyncFunction, minimumTime);
  };

  return { executeWithMinimumLoading };
};