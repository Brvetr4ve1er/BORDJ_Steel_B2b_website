"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SocialButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  'aria-label': string;
  fromColor?: string;
  toColor?: string;
}

export function SocialButton({ href, children, className, 'aria-label': ariaLabel, fromColor = 'from-cyan-700', toColor = 'to-cyan-400' }: SocialButtonProps) {
  return (
    <Link href={href} aria-label={ariaLabel} target="_blank" className="group">
      <div className={cn("relative w-[80px] h-[80px] transition-all duration-200 ease-in-out hover:scale-110 active:scale-75", className)}>
        {/* Main Button Container */}
        <div className="w-full h-full rounded-full overflow-hidden relative grid place-content-center border-[4px] border-r-white border-l-gray-800/20 border-t-white/50 border-b-gray-800/50 transform -rotate-45 transition-all duration-500 ease-in-out">
          {/* Inner Button */}
          <div className="relative w-[44px] h-[44px] rounded-full shadow-[-8px_4px_8px_0px_rgba(100,100,111,0.5)] transition-all duration-500 ease-in-out active:scale-125">
            {/* Background Gradient */}
            <div className={cn("absolute inset-0 rounded-full bg-gradient-to-tr", fromColor, toColor)} />
            {/* Foreground Gradient & Icon */}
            <div className={cn("absolute inset-[4px] rounded-full bg-gradient-to-tr grid place-content-center", fromColor, toColor)}>
              <div className="transform rotate-45 text-white/50 group-hover:text-white group-hover:opacity-100 transition-all duration-200 ease-in group-hover:[filter:drop-shadow(0_0_8px_white)]">
                {children}
              </div>
            </div>
          </div>
          {/* Glass Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/50 transform -translate-y-1/2 group-hover:-translate-y-[45%] origin-bottom transition-all duration-500 ease-in-out" />
        </div>
      </div>
    </Link>
  );
}
