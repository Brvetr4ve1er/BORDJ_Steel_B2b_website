
"use client";

import { motion } from 'framer-motion';
import { BathsIcon } from './icons/baths-icon';
import { AnimatedNumber } from './animated-number';
import { useEffect, useState, useRef } from 'react';

export function AnimatedBaths() {
  const [isInView, setIsInView] = useState(() => false);
  const ref = useRef<HTMLDivElement>(null);

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
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const rulerSegments = Array.from({ length: 13 });

  return (
    <div ref={ref} className="w-full relative flex items-center justify-between gap-4 p-4 h-full">
      <div className="flex-shrink-0 w-24 h-24 rounded-full bg-white flex items-center justify-center">
        <BathsIcon className="w-16 h-16 text-accent flex-shrink-0" />
      </div>
      <div className="flex-grow flex flex-col items-center justify-center text-white">
        <div className="relative w-full flex items-center justify-center">
          <div className="flex items-baseline space-x-2">
            <span className="text-6xl font-bold text-accent">
                {isInView && <AnimatedNumber value={13} />}
            </span>
            <span className="text-2xl font-semibold text-accent -mt-2">mètres</span>
          </div>
        </div>
        {isInView && (
          <div className="flex w-full h-2 mt-2">
            {rulerSegments.map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.1, delay: i * 0.1, ease: 'easeIn' }}
                className="h-full flex-1 bg-accent"
                style={{ marginRight: i < rulerSegments.length - 1 ? '2px' : '0' }}
              />
            ))}
          </div>
        )}
        <p className="text-lg uppercase tracking-wider text-white mt-2">Bains de traitement</p>
      </div>
    </div>
  );
}
