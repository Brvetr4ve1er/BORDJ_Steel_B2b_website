
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { companyData } from '@/config/company-data';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import { SocialButton } from './social-button';

export function Footer() {
  const { footer, socials, navigation, pages } = companyData;

  const socialButtons = [
    { href: socials.facebook, icon: <Facebook className="w-6 h-6" />, name: 'Facebook', fromColor: 'from-blue-600', toColor: 'to-blue-400' },
    { href: socials.instagram, icon: <Instagram className="w-6 h-6" />, name: 'Instagram', fromColor: 'from-pink-500', toColor: 'to-orange-400' },
    { href: socials.whatsapp, icon: <MessageCircle className="w-6 h-6" />, name: 'WhatsApp', fromColor: 'from-green-600', toColor: 'to-green-400' },
    { href: socials.linkedin, icon: <Linkedin className="w-6 h-6" />, name: 'LinkedIn', fromColor: 'from-sky-600', toColor: 'to-sky-400' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className='w-40'>
                <Logo />
            </div>
            <p className="mt-2 text-sm text-primary-foreground/80">{footer.tagline}</p>
          </div>
          <div className="md:col-span-3">
             <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                    <h4 className="font-headline font-semibold tracking-wider uppercase">{footer.siteLinks}</h4>
                    <ul className="mt-4 space-y-2">
                        {navigation.mainMenu.map(item => (
                             <li key={item.name}>
                                <Link href={item.href} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-headline font-semibold tracking-wider uppercase">{footer.legal.title}</h4>
                     <ul className="mt-4 space-y-2">
                        <li><Link href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">{footer.legal.privacy}</Link></li>
                        <li><Link href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">{footer.legal.terms}</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-headline font-semibold tracking-wider uppercase">{footer.contactUs}</h4>
                     <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
                        <li>{pages.contact.content.address}</li>
                        <li>{pages.contact.content.emails[0]}</li>
                        <div className="mt-4 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-2 border-accent">
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
                     </ul>
                </div>
             </div>
          </div>
        </div>
      </div>
      <div className="bg-destructive/80 py-6">
        <div className="container mx-auto flex justify-center">
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-4">
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
       <div className="bg-primary pt-8 pb-6">
        <div className="text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} {footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
