"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin, MessageCircle, Send } from 'lucide-react';
import { companyData } from '@/config/company-data';
import { Logo } from './logo';
import { SocialButton } from './social-button';
import { Input } from './ui/input';

export function Footer() {
  const { footer, socials, navigation, pages } = companyData;

  const socialButtons = [
    { href: socials.facebook, icon: <Facebook className="w-6 h-6" />, name: 'Facebook', fromColor: 'from-blue-600', toColor: 'to-blue-400' },
    { href: socials.instagram, icon: <Instagram className="w-6 h-6" />, name: 'Instagram', fromColor: 'from-pink-500', toColor: 'to-orange-400' },
    { href: socials.whatsapp, icon: <MessageCircle className="w-6 h-6" />, name: 'WhatsApp', fromColor: 'from-green-600', toColor: 'to-green-400' },
    { href: socials.linkedin, icon: <Linkedin className="w-6 h-6" />, name: 'LinkedIn', fromColor: 'from-sky-600', toColor: 'to-sky-400' },
  ];

  return (
    <footer className="relative border-t bg-primary text-primary-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <div className='w-48 mb-6'>
                <Logo />
            </div>
            <p className="text-base text-primary-foreground/80">{footer.tagline}</p>
          </div>
          <div>
            <h3 className="mb-6 text-xl font-semibold uppercase tracking-wider">{footer.siteLinks}</h3>
            <nav className="space-y-3 text-base">
              {navigation.mainMenu.map(item => (
                <Link key={item.name} href={item.href} className="block text-primary-foreground/80 transition-colors hover:text-white">
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="mb-6 text-xl font-semibold uppercase tracking-wider">{footer.contactUs}</h3>
            <address className="space-y-3 text-base not-italic text-primary-foreground/80">
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
            <h3 className="mb-6 text-xl font-semibold uppercase tracking-wider">Suivez-nous</h3>
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
            <h3 className="mb-6 text-xl font-semibold uppercase tracking-wider">Restez Connecté</h3>
            <p className="mb-4 text-base text-primary-foreground/80">
              Rejoignez notre newsletter pour les dernières mises à jour.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Entrez votre email"
                className="pr-14 h-12 text-base bg-primary-foreground/10 text-white placeholder:text-primary-foreground/60 border-primary-foreground/30 focus:border-accent"
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
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-primary-foreground/20 pt-10 text-center md:flex-row">
          <p className="text-base text-primary-foreground/60">
            &copy; {new Date().getFullYear()} {footer.copyright}
          </p>
          <nav className="flex gap-6 text-base">
            <Link href="#" className="text-primary-foreground/60 transition-colors hover:text-white">
              {footer.legal.privacy}
            </Link>
            <Link href="#" className="text-primary-foreground/60 transition-colors hover:text-white">
              {footer.legal.terms}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
