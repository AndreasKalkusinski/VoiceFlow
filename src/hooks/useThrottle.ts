import { useCallback, useRef } from 'react';

/**
 * Custom hook for throttling function calls
 * Ensures a function is called at most once in a specified time period
 * 
 * @param callback - The function to throttle
 * @param delay - Minimum time between calls in milliseconds
 * @returns The throttled function
 * 
 * @example
 * const handleScroll = useThrottle(() => {
 *   console.log('Scrolling');
 * }, 200);
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const throttledFunction = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastRun = now - lastRun.current;

      if (timeSinceLastRun >= delay) {
        callback(...args);
        lastRun.current = now;
      } else {
        // Clear existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Schedule call for remaining time
        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastRun.current = Date.now();
        }, delay - timeSinceLastRun);
      }
    },
    [callback, delay]
  );
  
  return throttledFunction as T;
}