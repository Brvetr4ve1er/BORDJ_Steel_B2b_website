
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { companyData } from '@/config/company-data';
import { Logo } from './logo';
import { cn } from '@/lib/utils';

const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M21 7.25a6.25 6.25 0 1 0-8.8-6.1V15a3.75 3.75 0 1 0 3.75-3.75"/>
    </svg>
)

export function Footer() {
  const { footer, socials, navigation, pages } = companyData;

  const socialIcons = [
    { href: socials.facebook, icon: <Facebook />, name: 'Facebook' },
    { href: socials.instagram, icon: <Instagram />, name: 'Instagram' },
    { href: socials.tiktok, icon: <TikTokIcon />, name: 'TikTok' },
    { href: socials.whatsapp, icon: <MessageCircle />, name: 'WhatsApp' },
    { href: socials.x, icon: <Twitter />, name: 'X' },
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
                     </ul>
                </div>
             </div>
          </div>
        </div>
      </div>
      <div className="bg-destructive/80 py-6">
        <div className="container mx-auto flex justify-center">
            <div className="flex space-x-4">
                {socialIcons.map((social) => (
                    <Link
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-transparent text-white transition-transform duration-300 ease-in-out hover:scale-110"
                    >
                       <span className='absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity group-hover:opacity-100' />
                       <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-500 ease-out left-[-100%] group-hover:left-[100%]" />
                       {social.icon}
                    </Link>
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
