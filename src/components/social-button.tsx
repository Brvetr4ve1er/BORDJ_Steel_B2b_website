"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SocialButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  'aria-label': string;
}

export function SocialButton({ href, children, className, 'aria-label': ariaLabel }: SocialButtonProps) {
  return (
    <Link href={href} aria-label={ariaLabel} target="_blank" className="group">
      <div className={cn("relative w-[110px] h-[110px] transition-all duration-200 ease-in-out hover:scale-110 active:scale-75", className)}>
        {/* Main Button Container */}
        <div className="w-full h-full rounded-full overflow-hidden relative grid place-content-center border-[5px] border-r-white border-l-gray-800/20 border-t-white/50 border-b-gray-800/50 transform -rotate-45 transition-all duration-500 ease-in-out">
          {/* Inner Button */}
          <div className="relative w-[60px] h-[60px] rounded-full shadow-[-10px_5px_10px_0px_rgba(100,100,111,0.5)] transition-all duration-500 ease-in-out active:scale-125">
            {/* Background Gradient */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-700 to-cyan-400" />
            {/* Foreground Gradient & Icon */}
            <div className="absolute inset-[5px] rounded-full bg-gradient-to-tr from-cyan-600 to-cyan-300 grid place-content-center">
              <div className="transform rotate-45 text-white/50 group-hover:text-white group-hover:opacity-100 transition-all duration-200 ease-in group-hover:[filter:drop-shadow(0_0_10px_white)]">
                {children}
              </div>
            </div>
          </div>
          {/* Glass Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/80 transform -translate-y-1/2 group-hover:-translate-y-[40%] origin-bottom transition-all duration-500 ease-in-out" />
        </div>
        {/* Blooms */}
        <div className="absolute top-[10px] right-[20px] w-px h-px bg-white shadow-[0px_0px_10px_10px_white,0px_0px_20px_20px_white]" />
        <div className="absolute bottom-[10px] left-[20px] w-px h-px bg-white shadow-[0px_0px_10px_10px_rgba(255,255,255,0.5),0px_0px_30px_20px_rgba(255,255,255,0.5)]" />
      </div>
    </Link>
  );
}