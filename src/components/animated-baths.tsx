
"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { BathsIcon } from './icons/baths-icon';
import { AnimatedNumber } from './animated-number';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

type AnimatedBathsProps = {
  /** Numeric figure to count up to — supplied by the caller from config. */
  value: number;
  /** Caption rendered under the figure — supplied by the caller from config. */
  label: string;
};

export function AnimatedBaths({ value, label }: AnimatedBathsProps) {
  const [isInView, setIsInView] = useState(() => false);
  const ref = useRef<HTMLDivElement>(null);
  // The tally animates one segment per counted bath at a cumulative 100ms, so
  // with a double-digit count this is a multi-second cascade. The `delay` has
  // to be neutralised as well as the initial state, or a reduced-motion
  // visitor still waits out the stagger on an already-settled bar.
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
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

  // One segment per counted item, so the bar reads as a tally of `value` and no
  // longer implies a length. It is NOT a ruler: the config supplies a count
  // ("Bains de traitement"), never a unit, so none is displayed.
  const segments = Array.from({
    length: Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0,
  });

  return (
    <div ref={ref} className="w-full relative flex items-center justify-between gap-4 p-4 h-full">
      <div className="flex-shrink-0 w-24 h-24 rounded-full bg-white flex items-center justify-center">
        <BathsIcon className={cn("w-16 h-16 text-accent flex-shrink-0 transition-colors duration-300")} />
      </div>
      <div className="flex-grow flex flex-col items-center justify-center text-white">
        <div className="relative w-full flex items-center justify-center">
          <div className="flex items-baseline space-x-2">
            <span className={cn("text-6xl font-bold text-accent transition-colors duration-300", "group-hover:text-white")}>
                {isInView && <AnimatedNumber value={value} />}
            </span>
          </div>
        </div>
        {isInView && (
          <div className="flex w-full h-2 mt-2">
            {segments.map((_, i) => (
              <motion.div
                key={i}
                initial={prefersReducedMotion ? false : { scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.1, delay: i * 0.1, ease: 'easeIn' }
                }
                className={cn("h-full flex-1 bg-accent transition-colors duration-300", "group-hover:bg-white")}
                style={{ marginRight: i < segments.length - 1 ? '2px' : '0' }}
              />
            ))}
          </div>
        )}
        <p className="text-lg uppercase tracking-wider text-white mt-2">{label}</p>
      </div>
    </div>
  );
}
