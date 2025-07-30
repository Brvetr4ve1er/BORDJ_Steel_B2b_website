"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { companyData, navItems } from '@/config/company-data';
import { Logo } from './logo';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = ({ className, onItemClick }: { className?: string, onItemClick?: () => void }) => (
    <nav className={cn("flex items-center gap-6 text-sm font-medium", className)}>
      {navItems.map((item) => (
        <Link
          key={item}
          href={`#${item.toLowerCase()}`}
          className="transition-colors hover:text-primary"
          onClick={onItemClick}
        >
          {item}
        </Link>
      ))}
    </nav>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex h-40 items-center justify-between px-4 md:px-8 transition-all duration-300',
        isScrolled ? 'bg-background/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <Link href="#" className="flex items-center gap-2 group">
        <div className="relative overflow-hidden transition-transform duration-300 ease-out group-hover:scale-110">
          <Logo />
          <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-500 ease-out group-hover:left-[100%]" />
        </div>
      </Link>
      <div className="hidden md:flex items-center gap-8">
        <NavLinks className={cn(isScrolled ? 'text-foreground' : 'text-background')} />
        <Sheet open={isDesktopMenuOpen} onOpenChange={setIsDesktopMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className={cn('h-5 w-5', isScrolled ? 'text-foreground' : 'text-background')} />
              <span className="sr-only">Toggle language</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md bg-background/95 backdrop-blur-sm p-0 flex flex-col">
            <div className="p-6 flex justify-between items-center border-b">
              <span className="font-headline font-bold text-2xl text-primary">{companyData.companyName}</span>
              <Button variant="ghost" size="icon" onClick={() => setIsDesktopMenuOpen(false)}>
                <X className="h-6 w-6 text-foreground" />
              </Button>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-center items-center gap-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/10 -z-10" />
              <NavLinks className="flex-col items-center gap-8 text-2xl text-foreground font-headline" onItemClick={() => setIsDesktopMenuOpen(false)} />
            </div>
            <div className="p-6 border-t">
              <Button variant="outline" className="w-full text-lg py-6">
                <Globe className="mr-2 h-5 w-5" />
                Language
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className={cn('h-6 w-6', isScrolled ? 'text-foreground' : 'text-background')} />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full h-full bg-background/95 backdrop-blur-sm p-0 flex flex-col">
            <div className="p-6 flex justify-between items-center border-b">
              <span className="font-headline font-bold text-2xl text-primary">{companyData.companyName}</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6 text-foreground" />
              </Button>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-center items-center gap-8 relative">
               <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/10 -z-10" />
              <NavLinks className="flex-col items-center gap-8 text-2xl text-foreground font-headline" onItemClick={() => setIsMobileMenuOpen(false)} />
            </div>
             <div className="p-6 border-t">
                <Button variant="outline" className="w-full text-lg py-6">
                  <Globe className="mr-2 h-5 w-5" />
                  Language
                </Button>
              </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
