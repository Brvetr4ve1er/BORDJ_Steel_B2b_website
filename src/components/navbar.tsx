
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, Factory, Info, Mail, Newspaper, Package, Menu, X, Building2, HardHat, ShieldCheck, ChevronDown, Award, Cog, FileText, Anchor, BookOpen, Video, View, User, GanttChartSquare, Square, Component, ToyBrick } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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

const iconMap: { [key: string]: React.ElementType } = {
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
};

const NavLinks = ({ className, onItemClick }: { className?: string, onItemClick?: () => void }) => {
    const { navigation } = companyData;
    const [openMenu, setOpenMenu] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    useEffect(() => {
        if (!isMounted) return;
        
        const handleScroll = () => {
          const scrolled = window.scrollY > 20;
          if (scrolled !== isScrolled) {
            setIsScrolled(scrolled);
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMounted, isScrolled]);

    const handleMenuClick = (menuName: string) => {
        setOpenMenu(openMenu === menuName ? '' : menuName);
    };

    const isLinkActive = (href: string) => {
      if (href === '/') return pathname === href;
      return pathname.startsWith(href);
    };
    
    const navTextColor = isMounted && isScrolled ? 'text-foreground' : 'text-background';

    return (
        <NavigationMenu value={openMenu} onValueChange={setOpenMenu}>
            <NavigationMenuList className={cn("flex items-center gap-2", className)}>
                {navigation.mainMenu.map((item) => {
                    const Icon = iconMap[item.icon];
                    return (
                        <NavigationMenuItem key={item.name} value={item.name}>
                            {item.children ? (
                                <>
                                    <NavigationMenuTrigger
                                        onClick={() => handleMenuClick(item.name)}
                                        className={cn("bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent hover:text-accent", navTextColor)}
                                    >
                                       {Icon && <Icon className="h-4 w-4 mr-2" />}
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
                                                        setOpenMenu('');
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
                                        {Icon && <Icon className="h-4 w-4 mr-2" />}
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
  const Icon = icon ? iconMap[icon] : null;
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
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-secondary transition-colors group-hover:bg-accent-foreground/10">
            {Icon && <Icon className="h-6 w-6 text-accent transition-colors group-hover:text-accent-foreground" />}
          </div>
          <div className="flex-grow">
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigation, siteMetadata } = companyData;
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  const headerStyle = isMounted && isScrolled ? 'bg-background/95 shadow-md backdrop-blur-sm h-24' : 'bg-transparent h-32';
  const logoWidth = isMounted && isScrolled ? 'w-80' : 'w-[32rem]';
  const textColor = isMounted && isScrolled ? 'text-primary' : 'text-white/80';
  const menuIconColor = isMounted && isScrolled ? 'text-foreground' : 'text-background';
  const selectTextColor = isMounted && isScrolled ? "text-primary border-primary/50" : "text-white";

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 transition-all duration-300',
        headerStyle
      )}
    >
      <div className="flex items-center h-full">
        <Link href="/" className="flex items-center h-full gap-2 group">
          <div className="relative h-full flex items-center overflow-hidden transition-transform duration-300 ease-out group-hover:scale-110">
            <div className={cn('relative transition-all duration-300 h-full py-4', logoWidth)}>
              <Logo />
            </div>
            <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-500 ease-out group-hover:left-[100%]" />
          </div>
        </Link>
      </div>

      <div className="hidden md:flex flex-1 justify-center items-center">
        {isMounted ? <NavLinks /> : <div className="h-10" /> /* Placeholder */}
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
        ): <div className="hidden md:block w-[120px] h-[76px]" /> /* Placeholder */}

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
                <div className="p-6 flex justify-between items-center border-b">
                  <div className="w-64">
                    <Logo />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6 text-foreground" />
                  </Button>
                </div>
                <div className="flex-1 p-6 flex flex-col items-start gap-4 relative overflow-y-auto">
                   <Accordion type="single" collapsible className="w-full">
                     {navigation.mainMenu.map((item, index) => {
                      const Icon = iconMap[item.icon];
                      return (
                        <div key={item.name} className="w-full">
                          {item.children ? (
                             <AccordionItem value={`item-${index}`} className="border-b-0">
                              <AccordionTrigger className="w-full flex justify-between items-center py-2 font-headline text-lg hover:no-underline">
                                 <span className="flex items-center gap-3">
                                  {Icon && <Icon className="h-5 w-5" />}
                                  {item.name}
                                </span>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="pl-8 flex flex-col items-start gap-2 mt-1">
                                  {item.children.map((child) => (
                                    <Link key={child.name} href={child.href} className="text-lg text-muted-foreground hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>{child.name}</Link>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ) : (
                            <Link href={item.href} className="flex items-center gap-3 py-2 font-headline text-lg" onClick={() => setIsMobileMenuOpen(false)}>
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
                       <p className="font-cairo font-bold text-sm text-primary">{siteMetadata.sloganArabic}</p>
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
