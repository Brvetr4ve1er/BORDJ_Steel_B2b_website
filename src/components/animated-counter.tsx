
"use client";

import { useState, useEffect, useRef } from 'react';

export const AnimatedCounter = ({ end, duration = 2000, className }: { end: number; duration?: number, className?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);
  
  useEffect(() => {
    if (!isInView || !isMounted) return;
    
    let start = 0;
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min(1, (now - startTime) / duration);
      const current = Math.floor(progress * (end - start) + start);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, isInView, isMounted]);

  if (!isMounted) {
    return <span ref={ref} className={className}>0</span>;
  }

  return <span ref={ref} className={className}>{count.toLocaleString()}</span>;
};
