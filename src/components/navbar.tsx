"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, Factory, Info, Mail, Newspaper, Package, Menu, Building2, HardHat, ShieldCheck, Award, Cog, FileText, Anchor, BookOpen, Video, View, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { companyData } from '@/config/company-data';
import { Logo } from './logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import * as React from 'react';

// Single shared icon map, hoisted to module scope so it isn't recreated on
// every render of the navbar's render functions.
const iconMap = {
  Info, Factory, Package, Briefcase, Newspaper, Mail, Building2, HardHat,
  ShieldCheck, Award, Cog, FileText, Anchor, BookOpen, Video, View, User,
} as const;

type MenuItem = (typeof companyData.navigation.mainMenu)[number];

// The top-level section a route belongs to, e.g. "/products/chaudronnerie" -> "/products".
const sectionOf = (href: string) => {
  const seg = href.split('?')[0]?.split('/')[1] ?? '';
  return '/' + seg;
};

// Is this menu item the one the visitor is currently inside?
const isItemActive = (item: MenuItem, pathname: string) => {
  if (item.href === '/') return pathname === '/';
  if (pathname.startsWith(sectionOf(item.href))) return true;
  // Contact & RH groups /contact and /recrutement, which are different sections.
  return Boolean(item.children?.some((c) => c.href !== '/' && pathname.startsWith(sectionOf(c.href))));
};

// Shared inner content for a top-level nav item: icon, label, and the signature
// accent underline that grows on hover / while its dropdown is open / when active.
function NavItemInner({ item, active }: { item: MenuItem; active: boolean }) {
  const Icon = iconMap[item.icon as keyof typeof iconMap];
  return (
    <>
      {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
      <span>{item.name}</span>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-3 bottom-1.5 h-0.5 origin-center rounded-full bg-accent transition-transform duration-300 ease-out",
          "group-hover/navitem:scale-x-100 group-data-[state=open]/navitem:scale-x-100",
          active ? "scale-x-100" : "scale-x-0",
        )}
      />
    </>
  );
}

const DesktopNav = ({ transparent, pathname }: { transparent: boolean; pathname: string }) => {
  const { navigation } = companyData;

  // Ink colour is chosen so the bar is legible in both modes: dark ink on the
  // solid white bar, shadowed white over the (dark) homepage hero.
  const itemInk = transparent
    ? "text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]"
    : "text-foreground hover:text-accent";

  const itemBase = cn(
    "group/navitem relative inline-flex h-11 items-center gap-2 rounded-md px-3 text-[15px] font-semibold tracking-tight",
    "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    itemInk,
  );

  return (
    // Keyed on pathname so the menu always resets to closed after navigation —
    // no more dropdowns that stay stuck open after a click.
    <NavigationMenu key={pathname}>
      <NavigationMenuList className="gap-1">
        {navigation.mainMenu.map((item) => {
          const active = isItemActive(item, pathname);
          return (
            <NavigationMenuItem key={item.name}>
              {item.children ? (
                <>
                  <NavigationMenuTrigger
                    className={cn(itemBase, "bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent [&>svg:last-child]:h-3.5 [&>svg:last-child]:w-3.5")}
                  >
                    <NavItemInner item={item} active={active} />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-max grid-cols-2 gap-2 p-3">
                      {item.children.map((child) => (
                        <DropdownLink key={child.name} child={child} pathname={pathname} />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild>
                  <Link href={item.href} className={itemBase} aria-current={active ? 'page' : undefined}>
                    <NavItemInner item={item} active={active} />
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

type ChildItem = NonNullable<MenuItem['children']>[number];

function DropdownLink({ child, pathname }: { child: ChildItem; pathname: string }) {
  const Icon = child.icon ? iconMap[child.icon as keyof typeof iconMap] : null;
  const active = pathname === child.href.split('?')[0];
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={child.href}
          aria-current={active ? 'page' : undefined}
          className={cn(
            "group/link flex w-[260px] select-none items-center gap-3 rounded-lg p-3 leading-none no-underline outline-none transition-colors",
            "hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none",
            active && "bg-secondary",
          )}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent transition-colors group-hover/link:bg-accent group-hover/link:text-accent-foreground">
            {Icon && <Icon className="h-5 w-5" />}
          </span>
          <span className="min-w-0">
            <span className="block text-[15px] font-semibold text-foreground">{child.name}</span>
            <span className="mt-0.5 block truncate text-xs text-muted-foreground">{child.description}</span>
          </span>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

const MobileNav = ({ onNavigate }: { onNavigate: () => void }) => {
  const { navigation } = companyData;
  return (
    <Accordion type="single" collapsible className="w-full">
      {navigation.mainMenu.map((item, index) => {
        const Icon = iconMap[item.icon as keyof typeof iconMap];
        return (
          <div key={item.name} className="w-full border-b border-border/60">
            {item.children ? (
              <AccordionItem value={`item-${index}`} className="border-b-0">
                <AccordionTrigger className="flex w-full items-center justify-between py-4 font-headline text-lg text-foreground hover:text-accent hover:no-underline">
                  <span className="flex items-center gap-3">
                    {Icon && <Icon className="h-5 w-5 text-accent" />}
                    {item.name}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mb-2 flex flex-col items-start gap-1 pl-9">
                    {item.children.map((child) => (
                      <Link key={child.name} href={child.href} className="w-full rounded-md py-2.5 text-base text-muted-foreground transition-colors hover:text-accent" onClick={onNavigate}>
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ) : (
              <Link href={item.href} className="flex items-center gap-3 py-4 font-headline text-lg text-foreground transition-colors hover:text-accent" onClick={onNavigate}>
                {Icon && <Icon className="h-5 w-5 text-accent" />}
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
    </Accordion>
  );
};

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { siteMetadata } = companyData;

  useEffect(() => setIsMounted(true), []);

  const handleScroll = useCallback(() => setIsScrolled(window.scrollY > 16), []);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Transparent ONLY on the homepage while at the top — the one page with a
  // guaranteed full-screen dark hero behind the bar. Everywhere else the bar is
  // solid from the first paint, so nav text is never white-on-white.
  const transparent = pathname === '/' && !isScrolled;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between px-4 transition-[background-color,box-shadow,border-color] duration-300 md:h-24 md:px-8',
        transparent
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-border/70 bg-white/95 shadow-md backdrop-blur-md supports-[backdrop-filter]:bg-white/80',
      )}
    >
      {/* Legibility scrim behind white text over the hero (homepage top only). */}
      {transparent && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/20 to-transparent" />
      )}

      <Link href="/" className="group flex h-full items-center" aria-label="Accueil Bordj Steel">
        <div className="relative h-14 w-14 overflow-hidden transition-transform duration-300 ease-out group-hover:scale-105 md:h-16 md:w-16">
          <Logo />
        </div>
      </Link>

      <div className="hidden flex-1 justify-center md:flex">
        <DesktopNav transparent={transparent} pathname={pathname} />
      </div>

      <div className="flex items-center gap-4">
        <p
          className={cn(
            'hidden max-w-[9rem] text-right text-[11px] font-semibold uppercase leading-tight tracking-wider transition-colors duration-200 lg:block',
            transparent ? 'text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]' : 'text-foreground/70',
          )}
        >
          {siteMetadata.slogan}
        </p>

        <div className="md:hidden">
          {isMounted ? (
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn(transparent ? 'text-white hover:bg-white/10 hover:text-white' : 'text-foreground')}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-full max-w-sm flex-col bg-background p-0">
                <SheetHeader className="flex flex-row items-center justify-between border-b p-5">
                  <div className="h-12 w-12"><Logo /></div>
                  {/* The close (X) button is supplied by SheetContent itself — do not add a second one. */}
                  <SheetTitle className="sr-only">Menu principal</SheetTitle>
                  <SheetDescription className="sr-only">Navigation principale du site Bordj Steel.</SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto px-5">
                  <MobileNav onNavigate={() => setIsMobileMenuOpen(false)} />
                </div>
                <div className="border-t p-5">
                  <p className="text-center text-[11px] font-semibold uppercase tracking-wider text-accent">{siteMetadata.slogan}</p>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Button variant="ghost" size="icon" className={cn(transparent ? 'text-white' : 'text-foreground')}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Ouvrir le menu</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
