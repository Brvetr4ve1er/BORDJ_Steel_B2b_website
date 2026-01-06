"use client";

import type { ReactNode } from 'react';
import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'fade-in' | 'slide-up' | 'zoom-in' | 'fade-in-stagger';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  animation: AnimationType;
  staggerIndex?: number;
  className?: string;
}

export function AnimatedWrapper({ children, animation, staggerIndex = 0, className }: AnimatedWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

  const delay = animation === 'fade-in-stagger' ? staggerIndex * 100 : 0;

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        !isVisible && animationClasses[animation],
        isVisible && visibleClasses[animation],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
