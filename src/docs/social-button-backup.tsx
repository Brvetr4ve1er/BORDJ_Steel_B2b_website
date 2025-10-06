// This file contains a backup of the SocialButton component and its usage in the Footer.

// ====================================================================================
// 1. The SocialButton Component (from src/components/social-button.tsx)
// ====================================================================================

/*
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
      <div className={cn("relative w-[100px] h-[100px] transition-all duration-200 ease-in-out hover:scale-110 active:scale-75", className)}>
        <div className="w-full h-full rounded-full overflow-hidden relative grid place-content-center border-[5px] border-r-white border-l-gray-800/20 border-t-white/50 border-b-gray-800/50 transform -rotate-45 transition-all duration-500 ease-in-out">
          <div className="relative w-[54px] h-[54px] rounded-full shadow-[-10px_5px_10px_0px_rgba(100,100,111,0.5)] transition-all duration-500 ease-in-out active:scale-125">
            <div className={cn("absolute inset-0 rounded-full bg-gradient-to-tr", fromColor, toColor)} />
            <div className={cn("absolute inset-[5px] rounded-full bg-gradient-to-tr grid place-content-center", fromColor, toColor)}>
              <div className="transform rotate-45 text-white/50 group-hover:text-white group-hover:opacity-100 transition-all duration-200 ease-in group-hover:[filter:drop-shadow(0_0_10px_white)]">
                {children}
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/50 transform -translate-y-1/2 group-hover:-translate-y-[45%] origin-bottom transition-all duration-500 ease-in-out" />
        </div>
      </div>
    </Link>
  );
}
*/


// ====================================================================================
// 2. Usage in the Footer Component (from src/components/footer.tsx)
// ====================================================================================

/*
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { companyData } from '@/config/company-data';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import { SocialButton } from './social-button'; // This is the component being used

export function Footer() {
  const { footer, socials, navigation, pages } = companyData;

  // The data structure used to populate the buttons
  const socialButtons = [
    { href: socials.facebook, icon: <Facebook className="w-8 h-8" />, name: 'Facebook', fromColor: 'from-blue-600', toColor: 'to-blue-400' },
    { href: socials.instagram, icon: <Instagram className="w-8 h-8" />, name: 'Instagram', fromColor: 'from-pink-500', toColor: 'to-orange-400' },
    { href: socials.whatsapp, icon: <MessageCircle className="w-8 h-8" />, name: 'WhatsApp', fromColor: 'from-green-600', toColor: 'to-green-400' },
    { href: socials.x, icon: <Twitter className="w-8 h-8" />, name: 'X', fromColor: 'from-gray-800', toColor: 'to-gray-600' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      // ... other footer content
      <div className="bg-destructive/80 py-6">
        <div className="container mx-auto flex justify-center">
            // This is the section where the buttons are rendered
            <div className="flex flex-wrap justify-center items-center gap-x-0 gap-y-4 md:gap-x-8">
                {socialButtons.map((social) => (
                    <SocialButton
                        key={social.name}
                        href={social.href}
                        aria-label={`Bordj Steel on ${social.name}`}
                        fromColor={social.fromColor}
                        toColor={social.toColor}
                    >
                       {social.icon}
                    </SocialButton>
                ))}
            </div>
        </div>
      </div>
      // ... other footer content
    </footer>
  );
}
*/
