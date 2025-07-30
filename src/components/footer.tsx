
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { companyData } from '@/config/company-data';
import { Logo } from './logo';

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
            <p className="mt-2 text-sm text-gray-300">{footer.tagline}</p>
            <div className="flex space-x-4 mt-4">
              <Button asChild variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Link href={socials.twitter} target="_blank"><Twitter className="h-5 w-5" /></Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Link href={socials.linkedin} target="_blank"><Linkedin className="h-5 w-5" /></Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Link href={socials.github} target="_blank"><Github className="h-5 w-5" /></Link>
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
                                <Link href={item.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-headline font-semibold tracking-wider uppercase">{footer.legal.title}</h4>
                     <ul className="mt-4 space-y-2">
                        <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">{footer.legal.privacy}</Link></li>
                        <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">{footer.legal.terms}</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-headline font-semibold tracking-wider uppercase">{footer.contactUs}</h4>
                     <ul className="mt-4 space-y-2 text-sm text-gray-300">
                        <li>{pages.contact.content.address}</li>
                        <li>{pages.contact.content.emails[0]}</li>
                     </ul>
                </div>
             </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
