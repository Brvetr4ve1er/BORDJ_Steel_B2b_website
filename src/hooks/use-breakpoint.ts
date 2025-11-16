
"use client";

import { useState, useEffect } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Breakpoint = keyof typeof breakpoints;

export const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMatch(window.innerWidth >= breakpoints[breakpoint]);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMatch;
};
