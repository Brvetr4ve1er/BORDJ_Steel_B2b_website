
"use client";

import { useState, useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

export const AnimatedNumber = ({ value, className }: { value: number; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(() => false);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      // Write straight to the DOM node instead of setState: the count-up
      // ticks every animation frame and re-rendering ~120 times per counter
      // is pure overhead for a text-only change.
      const formatter = new Intl.NumberFormat();
      const controls = animate(0, value, {
        duration: 2,
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = formatter.format(Math.round(latest));
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
};
