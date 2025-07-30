import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { companyData, navItems } from '@/config/company-data';

export function Footer() {
  const { companyName, footer, socials, contact } = companyData;

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="font-headline text-2xl font-bold">{companyName}</h3>
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
                    <h4 className="font-headline font-semibold tracking-wider uppercase">Site Links</h4>
                    <ul className="mt-4 space-y-2">
                        {navItems.map(item => (
                             <li key={item}>
                                <Link href={`#${item.toLowerCase()}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-headline font-semibold tracking-wider uppercase">Legal</h4>
                     <ul className="mt-4 space-y-2">
                        <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-headline font-semibold tracking-wider uppercase">Contact Us</h4>
                     <ul className="mt-4 space-y-2 text-sm text-gray-300">
                        <li>{contact.address.split(',')[0]}</li>
                        <li>{contact.address.split(',').slice(1).join(',').trim()}</li>
                        <li>{contact.email}</li>
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
