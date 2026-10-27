
"use client";

import type { ReactNode } from 'react';
import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'fade-in' | 'slide-up' | 'zoom-in' | 'fade-in-stagger';

interface AnimatedWrapperProps {
  children: ReactNode;
  animation: AnimationType;
  staggerIndex?: number;
  className?: string;
}

export function AnimatedWrapper({ children, animation, staggerIndex = 0, className }: AnimatedWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  // The global reduce block in globals.css clamps `transition-duration` but
  // says nothing about `transition-delay`, so without this a reduced-motion
  // visitor still waits out the full stagger before each item snaps in — on a
  // list of six, a 500ms staircase of blank space.
  //
  // Deliberately state + effect rather than framer-motion's `useReducedMotion`:
  // that returns `null` on the server and the real value on the first client
  // render, so the server would emit `500ms` while hydration expected `0ms`.
  // React does not patch attribute mismatches in production, which would leave
  // the stale delay in the DOM and silently undo the fix. Starting at `false`
  // matches the server, then the effect re-renders with the real preference.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const animationClasses = {
    'fade-in': 'opacity-0',
    'slide-up': 'opacity-0 translate-y-8',
    'zoom-in': 'opacity-0 scale-95',
    'fade-in-stagger': 'opacity-0',
  };

  const visibleClasses = {
    'fade-in': 'opacity-100',
    'slide-up': 'opacity-100 translate-y-0',
    'zoom-in': 'opacity-100 scale-100',
    'fade-in-stagger': 'opacity-100',
  };

  // The stagger delay applies to every variant, not just `fade-in-stagger`:
  // several sections map over a list with `slide-up` / `zoom-in` + staggerIndex
  // and expect the same cascade.
  const delay = staggerIndex * 100;

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        !isVisible && animationClasses[animation],
        isVisible && visibleClasses[animation],
        className
      )}
      style={{ transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms` }}
    >
      {children}
    </div>
  );
}
