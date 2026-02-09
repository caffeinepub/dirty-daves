import { useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';

/**
 * Hook that scrolls to an element matching the URL hash on mount and hash changes.
 * Uses requestAnimationFrame to ensure the DOM is ready before scrolling.
 */
export function useScrollToHashSection() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    
    if (hash) {
      // Remove the # from the hash to get the element ID
      const elementId = hash.replace('#', '');
      
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }, [location.hash]);
}
