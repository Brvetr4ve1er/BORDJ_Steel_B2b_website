
"use client";

import { useState, useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

export const AnimatedNumber = ({ value, className }: { value: number; className?: string }) => {
  const [animatedValue, setAnimatedValue] = useState(() => 0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(() => false);

  useEffect(() => {
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
      if(ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        onUpdate(latest) {
          setAnimatedValue(Math.round(latest));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {new Intl.NumberFormat().format(animatedValue)}
    </span>
  );
};
