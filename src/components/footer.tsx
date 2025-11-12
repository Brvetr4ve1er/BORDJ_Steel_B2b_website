
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin, MessageCircle, Send } from 'lucide-react';
import { companyData } from '@/config/company-data';
import { Logo } from './logo';
import { SocialButton } from './social-button';
import { Input } from './ui/input';

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M16.75 13.96c.25.13.41.2.46.3.05.1.03.61-.23 1.15-.25.54-1.03 1.03-1.59 1.03s-.63-.07-.94-.13a6.83 6.83 0 01-2.07-.6c-1.3-.8-2.26-1.89-2.9-2.81-.64-.92-1.03-1.63-1.03-2.15s.23-1 .48-1.28c.25-.28.48-.33.6-.33s.25.02.38.03l.13.01c.25.03.38.05.5.33.13.28.2.68.2.68s.05.13.03.25a.36.36 0 01-.1.2c-.08.08-.13.13-.23.23s-.18.15-.25.23a.46.46 0 00-.1.28c0 .13.05.28.1.33.1.13.25.33.88.96.63.63 1.17.86 1.32.91s.28.05.38-.03c.1-.08.25-.23.38-.46s.25-.41.38-.51.25-.13.43-.05zM12 2a10 10 0 00-9.8 12.18l-1.03 3.8 3.9-1.02A10 10 0 1012 2z"/>
  </svg>
);


export function Footer() {
  const { footer, socials, navigation, pages } = companyData;

  const socialButtons = [
    { href: socials.facebook, icon: <Facebook className="w-6 h-6" />, name: 'Facebook', fromColor: 'from-blue-600', toColor: 'to-blue-400' },
    { href: socials.instagram, icon: <Instagram className="w-6 h-6" />, name: 'Instagram', fromColor: 'from-pink-500', toColor: 'to-orange-400' },
    { href: socials.whatsapp, icon: <WhatsappIcon className="w-6 h-6" />, name: 'WhatsApp', fromColor: 'from-green-600', toColor: 'to-green-400' },
    { href: socials.linkedin, icon: <Linkedin className="w-6 h-6" />, name: 'LinkedIn', fromColor: 'from-sky-600', toColor: 'to-sky-400' },
  ];

  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <div className='w-48 mb-6'>
                <Logo />
            </div>
            <p className="text-base text-muted-foreground">{footer.tagline}</p>
          </div>
          <div>
            <h3 className="mb-6 text-xl font-semibold uppercase tracking-wider text-primary">{footer.siteLinks}</h3>
            <nav className="space-y-3 text-base">
              {navigation.mainMenu.map(item => (
                <Link key={item.name} href={item.href} className="block text-muted-foreground transition-colors hover:text-primary">
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="mb-6 text-xl font-semibold uppercase tracking-wider text-primary">{footer.contactUs}</h3>
            <address className="space-y-3 text-base not-italic text-muted-foreground">
              <p>{pages.contact.content.address}</p>
              <p>Email: {pages.contact.content.emails[0]}</p>
            </address>
             <div className="mt-6 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-2 border-accent">
                <iframe
                src="https://maps.google.com/maps?q=N%C2%B01%20lieu-dit%20Mechta%20Fatima%2C%20Bordj%20Bou%20Arr%C3%A9ridj%2C%20Alg%C3%A9rie&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
          </div>
          <div className="relative">
            <h3 className="mb-6 text-xl font-semibold uppercase tracking-wider text-primary">Suivez-nous</h3>
            <div className="mb-8 flex space-x-3">
                {socialButtons.map((social) => (
                    <SocialButton
                        key={social.name}
                        href={social.href}
                        aria-label={`Bordj Steel on ${social.name}`}
                        fromColor={social.fromColor}
                        toColor={social.toColor}
                        className="h-14 w-14"
                    >
                       {social.icon}
                    </SocialButton>
                ))}
            </div>
            <h3 className="mb-6 text-xl font-semibold uppercase tracking-wider text-primary">Restez Connecté</h3>
            <p className="mb-4 text-base text-muted-foreground">
              Rejoignez notre newsletter pour les dernières mises à jour.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Entrez votre email"
                className="pr-14 h-12 text-base bg-secondary text-foreground placeholder:text-muted-foreground border-border focus:border-accent"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1.5 top-1.5 h-9 w-9 rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105"
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">S'inscrire</span>
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border pt-10 text-center md:flex-row">
          <p className="text-base text-muted-foreground">
            &copy; {new Date().getFullYear()} {footer.copyright}
          </p>
          <nav className="flex gap-6 text-base">
            <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
              {footer.legal.privacy}
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
              {footer.legal.terms}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

    