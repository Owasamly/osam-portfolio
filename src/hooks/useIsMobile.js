import { useEffect, useState } from 'react';

export default function useIsMobile(breakpoint = 768) {
  const getIsMobile = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  };

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    window.addEventListener('resize', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', handleChange);
    };
  }, [breakpoint]);

  return isMobile;
}