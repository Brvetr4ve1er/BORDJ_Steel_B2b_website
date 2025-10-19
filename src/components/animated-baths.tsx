"use client";

import { motion } from 'framer-motion';
import { BathsIcon } from './icons/baths-icon';
import { AnimatedNumber } from './animated-number';
import { useEffect, useState, useRef } from 'react';

export function AnimatedBaths() {
  const [isInView, setIsInView] = useState(false);
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

  return (
    <div ref={ref} className="w-full relative flex items-center justify-between gap-4 p-4 h-full">
      <BathsIcon className="w-24 h-24 text-accent flex-shrink-0" />
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
             <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                className="h-0.5 bg-accent mt-2"
            />
        )}
        <p className="text-lg uppercase tracking-wider text-white mt-2">Bains de traitement</p>
      </div>
    </div>
  );
}
