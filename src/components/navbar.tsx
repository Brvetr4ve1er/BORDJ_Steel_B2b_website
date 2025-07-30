
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, Factory, Info, Mail, Newspaper, Package, UserPlus, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { companyData } from '@/config/company-data';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';

const iconMap: { [key: string]: React.ElementType } = {
  Info,
  Factory,
  Package,
  Briefcase,
  UserPlus,
  Newspaper,
  Mail,
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigation } = companyData;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = ({ className, onItemClick }: { className?: string, onItemClick?: () => void }) => (
    <nav className={cn("flex items-center gap-6 text-sm font-medium", className)}>
      {navigation.mainMenu.map((item) => {
        const Icon = iconMap[item.icon];
        return (
          <Link
            key={item.name}
            href={item.href}
            className="transition-colors hover:text-primary relative overflow-hidden group py-2 flex items-center gap-2"
            onClick={onItemClick}
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span>{item.name}</span>
            <div className="absolute bottom-0 left-[-100%] w-full h-0.5 bg-primary transition-all duration-300 ease-out group-hover:left-0" />
          </Link>
        )
      })}
    </nav>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex flex-col items-center justify-center px-4 md:px-8 transition-all duration-300',
        isScrolled ? 'bg-background/95 shadow-md backdrop-blur-sm h-32' : 'bg-transparent h-40'
      )}
    >
      <div className="flex w-full items-center justify-between pt-2">
        <div className="w-1/3"></div>
        <div className="w-1/3 flex justify-center">
            <Link href="#" className="flex items-center gap-2 group">
                <div className="relative overflow-hidden transition-transform duration-300 ease-out group-hover:scale-110">
                <Logo />
                <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-500 ease-out group-hover:left-[100%]" />
                </div>
            </Link>
        </div>
        <div className="w-1/3 flex justify-end items-center gap-4">
             <div className="hidden md:flex">
                <ThemeToggle />
             </div>
             <div className="md:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                    <Menu className={cn('h-6 w-6', isScrolled ? 'text-foreground' : 'text-background')} />
                    <span className="sr-only">Ouvrir le menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full h-full bg-background/95 backdrop-blur-sm p-0 flex flex-col">
                    <div className="p-6 flex justify-between items-center border-b">
                    <div className="w-32">
                        <Logo />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                        <X className="h-6 w-6 text-foreground" />
                    </Button>
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-center items-center gap-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/10 -z-10" />
                    <NavLinks className="flex-col items-center gap-8 text-2xl text-foreground font-headline" onItemClick={() => setIsMobileMenuOpen(false)} />
                    <div className="absolute bottom-6">
                        <ThemeToggle />
                    </div>
                    </div>
                </SheetContent>
                </Sheet>
            </div>
        </div>
      </div>
      
      <div className="hidden md:flex items-center justify-center w-full mt-2">
        <NavLinks className={cn(isScrolled ? 'text-foreground' : 'text-background')} />
      </div>
    </header>
  );
}
