
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { companyData } from '@/config/company-data';
import { Logo } from './logo';

const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M21 7.25a6.25 6.25 0 1 0-8.8-6.1V15a3.75 3.75 0 1 0 3.75-3.75"/>
    </svg>
)

export function Footer() {
  const { footer, socials, navigation, pages } = companyData;

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className='w-40'>
                <Logo />
            </div>
            <p className="mt-2 text-sm text-primary-foreground/80">{footer.tagline}</p>
            <div className="flex space-x-2 mt-4">
              <Button asChild variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Link href={socials.facebook} target="_blank"><Facebook className="h-5 w-5" /></Link>
              </Button>
               <Button asChild variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Link href={socials.instagram} target="_blank"><Instagram className="h-5 w-5" /></Link>
              </Button>
               <Button asChild variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Link href={socials.tiktok} target="_blank"><TikTokIcon /></Link>
              </Button>
               <Button asChild variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Link href={socials.whatsapp} target="_blank"><MessageCircle className="h-5 w-5" /></Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Link href={socials.x} target="_blank"><Twitter className="h-5 w-5" /></Link>
              </Button>
            </div>
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
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} {footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
