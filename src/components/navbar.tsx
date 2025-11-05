
"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Briefcase, Factory, Info, Mail, Newspaper, Package, Menu, X, Building2, HardHat, ShieldCheck, ChevronDown, Award, Cog, FileText, Anchor, BookOpen, Video, View, User, GanttChartSquare, Square, Component, ToyBrick } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { companyData } from '@/config/company-data';
import { Logo } from './logo';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cairo',
  weight: ['700'],
});


const NavLinks = ({ className, onItemClick, navTextColor }: { className?: string, onItemClick?: () => void, navTextColor: string }) => {
    const { navigation } = companyData;
    const pathname = usePathname();

    const iconMap = useMemo(() => ({
      Info,
      Factory,
      Package,
      Briefcase,
      Newspaper,
      Mail,
      Building2,
      HardHat,
      ShieldCheck,
      Award,
      Cog,
      FileText,
      Anchor,
      BookOpen,
      Video,
      View,
      User
    }), []);

    const isLinkActive = (href: string) => {
      if (href === '/') return pathname === href;
      return pathname.startsWith(href);
    };
    
    return (
        <NavigationMenu>
            <NavigationMenuList className={cn("flex items-center gap-2", className)}>
                {navigation.mainMenu.map((item) => {
                    const Icon = iconMap[item.icon as keyof typeof iconMap];
                    return (
                        <NavigationMenuItem key={item.name} >
                            {item.children ? (
                                <>
                                    <NavigationMenuTrigger
                                        className={cn("bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent hover:text-accent", navTextColor)}
                                    >
                                       {Icon && <Icon className="h-5 w-5 mr-2" />}
                                        {item.name}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-max grid-cols-3 gap-3 p-4">
                                            {item.children.map((component) => (
                                                <ListItem
                                                    key={component.name}
                                                    title={component.name}
                                                    href={component.href}
                                                    icon={component.icon}
                                                    className="w-[220px]"
                                                    onClick={() => {
                                                        onItemClick?.();
                                                    }}
                                                >
                                                    {component.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </>
                            ) : (
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={item.href}
                                    className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent hover:text-accent", navTextColor)}
                                    onClick={onItemClick}
                                  >
                                      <div className="flex items-center">
                                        {Icon && <Icon className="h-5 w-5 mr-2" />}
                                        {item.name}
                                      </div>
                                  </Link>
                                </NavigationMenuLink>
                            )}
                        </NavigationMenuItem>
                    )
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
};


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: string }
>(({ className, title, children, href, icon, ...props }, ref) => {
  const iconMap = useMemo(() => ({
    Info,
    Factory,
    Package,
    Briefcase,
    Newspaper,
    Mail,
    Building2,
    HardHat,
    ShieldCheck,
    Award,
    Cog,
    FileText,
    Anchor,
    BookOpen,
    Video,
    View,
    User
  }), []);
  const Icon = icon ? iconMap[icon as keyof typeof iconMap] : null;
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href!}
          ref={ref}
          className={cn(
            "group flex select-none items-start gap-4 space-y-1 rounded-md p-6 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-secondary transition-colors group-hover:bg-accent-foreground/10">
            {Icon && <Icon className="h-8 w-8 text-accent transition-colors group-hover:text-accent-foreground" />}
          </div>
          <div className="flex-grow">
            <div className="text-base font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-base leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";


export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(() => false);
  const [isMounted, setIsMounted] = useState(() => false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(() => false);
  const { navigation, siteMetadata } = companyData;
  const pathname = usePathname();
  
  const iconMap = useMemo(() => ({
      Info,
      Factory,
      Package,
      Briefcase,
      Newspaper,
      Mail,
      Building2,
      HardHat,
      ShieldCheck,
      Award,
      Cog,
      FileText,
      Anchor,
      BookOpen,
      Video,
      View,
      User
  }), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const headerStyle = isMounted && isScrolled ? 'bg-background/95 shadow-md backdrop-blur-sm h-24' : 'bg-transparent h-32';
  const logoContainerSize = isMounted && isScrolled ? 'h-20 w-20' : 'h-28 w-28';
  const textColor = isMounted && isScrolled ? 'text-primary' : 'text-white';
  const menuIconColor = isMounted && isScrolled ? 'text-foreground' : 'text-background';
  const selectTextColor = isMounted && isScrolled ? "text-primary border-primary/50" : "text-white";

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 transition-all duration-300',
        headerStyle,
        cairo.variable
      )}
    >
      <div className="flex items-center h-full">
        <Link href="/" className="flex items-center h-full gap-2 group" aria-label="Bordj Steel Home">
          <div className={cn("relative transition-all duration-300 overflow-hidden", logoContainerSize)}>
            <div className="relative h-full w-full transition-transform duration-300 ease-out group-hover:scale-110">
              <Logo />
              <div
                className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-500 ease-out group-hover:left-[100%] transform-gpu"
                style={{ mask: 'url(#shine-mask)' }}
              />
            </div>
          </div>
        </Link>
      </div>

      <div className="hidden md:flex flex-1 justify-center items-center">
        {isMounted ? <NavLinks navTextColor={textColor} /> : <div className="h-10" />}
      </div>

      <div className="flex items-center gap-4">
        {isMounted ? (
            <div className="hidden md:flex flex-col items-end gap-1 text-right">
                <p className={cn('text-xs font-semibold uppercase tracking-wider', textColor)}>{siteMetadata.slogan}</p>
                <p className={cn('font-cairo font-bold text-sm', textColor)}>{siteMetadata.sloganArabic}</p>
              <div className="mt-1">
                 <Select defaultValue="fr">
                    <SelectTrigger className={cn("w-[120px] bg-transparent border-white/50", selectTextColor)}>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </div>
        ): <div className="hidden md:block w-[120px] h-[76px]" />}

        <div className="md:hidden">
          {isMounted ? (
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className={cn('h-6 w-6', menuIconColor)} />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full h-full bg-background/95 backdrop-blur-sm p-0 flex flex-col">
                <SheetHeader className="p-6 flex flex-row justify-between items-center border-b">
                  <div className="w-40">
                    <Logo />
                  </div>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6 text-foreground" />
                    </Button>
                  </SheetClose>
                  <SheetTitle className="sr-only">Menu Principal</SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigation principale pour le site Bordj Steel.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex-1 p-6 flex flex-col items-start gap-4 relative overflow-y-auto">
                   <Accordion type="single" collapsible className="w-full">
                     {navigation.mainMenu.map((item, index) => {
                      const Icon = iconMap[item.icon as keyof typeof iconMap];
                      return (
                        <div key={item.name} className="w-full">
                          {item.children ? (
                             <AccordionItem value={`item-${index}`} className="border-b-0">
                              <AccordionTrigger className="w-full flex justify-between items-center py-4 font-headline text-lg hover:no-underline">
                                 <span className="flex items-center gap-3">
                                  {Icon && <Icon className="h-5 w-5" />}
                                  {item.name}
                                </span>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="pl-8 flex flex-col items-start gap-2 mt-1">
                                  {item.children.map((child) => (
                                    <Link key={child.name} href={child.href} className="py-2 text-lg text-muted-foreground hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>{child.name}</Link>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ) : (
                            <Link href={item.href} className="flex items-center gap-3 py-4 font-headline text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                               {Icon && <Icon className="h-5 w-5" />}
                               {item.name}
                            </Link>
                          )}
                        </div>
                      )
                    })}
                   </Accordion>
                </div>
                 <div className="p-6 border-t mt-auto">
                    <div className="flex flex-col items-center gap-4">
                       <p className="text-xs font-semibold uppercase tracking-wider text-primary">{siteMetadata.slogan}</p>
                       <p className={cn('font-cairo font-bold text-sm text-primary', cairo.variable)}>{siteMetadata.sloganArabic}</p>
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
          ) : (
            <Button variant="ghost" size="icon">
              <Menu className={cn('h-6 w-6', menuIconColor)} />
              <span className="sr-only">Ouvrir le menu</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
