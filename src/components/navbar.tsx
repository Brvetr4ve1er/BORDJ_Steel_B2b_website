
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


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
  const { navigation, siteMetadata } = companyData;

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
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 transition-all duration-300',
        isScrolled ? 'bg-background/95 shadow-md backdrop-blur-sm h-24' : 'bg-transparent h-32'
      )}
    >
       <div className={cn("absolute top-2 left-1/2 -translate-x-1/2 z-50", isScrolled && "hidden")}>
        <ThemeToggle />
      </div>
      <div className="flex items-center h-full">
        <Link href="#" className="flex items-center h-full gap-2 group">
          <div className="relative h-full flex items-center overflow-hidden transition-transform duration-300 ease-out group-hover:scale-110">
            <div className={cn('relative transition-all duration-300 h-full py-4', isScrolled ? 'w-32' : 'w-40')}>
              <Logo />
            </div>
            <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-500 ease-out group-hover:left-[100%]" />
          </div>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <NavLinks className={cn(isScrolled ? 'text-foreground' : 'text-background')} />
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end gap-1 text-right">
            <p className={cn('text-xs font-semibold uppercase tracking-wider', isScrolled ? 'text-primary' : 'text-white/80')}>{siteMetadata.slogan}</p>
            <p className={cn('font-cairo font-bold text-sm', isScrolled ? 'text-primary' : 'text-white/80')}>{siteMetadata.sloganArabic}</p>
          <div className="mt-1">
             <Select defaultValue="fr">
                <SelectTrigger className="w-[120px] bg-transparent text-white border-white/50">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                </SelectContent>
            </Select>
          </div>
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
                <div className="absolute bottom-6 flex flex-col items-center gap-4">
                   <p className="text-xs font-semibold uppercase tracking-wider text-primary">{siteMetadata.slogan}</p>
                   <p className="font-cairo font-bold text-sm text-primary">{siteMetadata.sloganArabic}</p>
                  <ThemeToggle />
                   <Select defaultValue="fr">
                        <SelectTrigger className="w-[120px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
