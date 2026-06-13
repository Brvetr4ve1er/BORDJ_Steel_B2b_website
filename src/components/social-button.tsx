
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

export function SocialButton({ href, children, className, 'aria-label': ariaLabel, fromColor = 'from-gray-500', toColor = 'to-gray-700' }: SocialButtonProps) {
  // Don't render a dead social link (placeholder '#').
  if (!href || href === '#') return null;

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary-foreground/20 p-1',
        'transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95',
        className
      )}
    >
      <div
        className={cn(
          'absolute inset-0 rounded-full bg-gradient-to-tr opacity-80 transition-opacity duration-300 group-hover:opacity-100',
          fromColor,
          toColor
        )}
      />
      <div className="relative z-10 text-primary-foreground transition-colors duration-300 group-hover:text-primary-foreground">
        {children}
      </div>
    </Link>
  );
}
