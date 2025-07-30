"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const menuItems = ['Home', 'About', 'Services', 'Portfolio', 'Approvals', 'Clients', 'Contact'];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center gap-6 text-sm font-medium", className)}>
      {menuItems.map((item) => (
        <Link
          key={item}
          href={`#${item.toLowerCase()}`}
          className="transition-colors hover:text-primary"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {item}
        </Link>
      ))}
    </nav>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-4 md:px-8 transition-all duration-300',
        isScrolled ? 'bg-background/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <Link href="#" className="flex items-center gap-2">
        <div className="bg-primary text-primary-foreground p-2 rounded-md">
          <span className="font-headline font-bold text-xl tracking-wider">BS</span>
        </div>
        <span className="font-headline font-bold text-2xl text-primary hidden sm:inline">BORDJ STEEL</span>
      </Link>
      <div className="hidden md:flex items-center gap-8">
        <NavLinks className={cn(isScrolled ? 'text-foreground' : 'text-background')} />
        <Button variant="ghost" size="icon">
          <Globe className={cn('h-5 w-5', isScrolled ? 'text-foreground' : 'text-background')} />
          <span className="sr-only">Toggle language</span>
        </Button>
      </div>
      <div className="md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className={cn('h-6 w-6', isScrolled ? 'text-foreground' : 'text-background')} />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="font-headline font-bold text-2xl text-primary">BORDJ STEEL</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6 text-foreground" />
                </Button>
              </div>
              <NavLinks className="flex-col items-start gap-4 text-lg text-foreground" />
              <Button variant="outline" className="w-full mt-8">
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
