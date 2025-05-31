import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint = 1000): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  const handleResize = () => {
    setIsMobile(window.innerWidth < breakpoint);
  };
  useEffect(() => {

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;