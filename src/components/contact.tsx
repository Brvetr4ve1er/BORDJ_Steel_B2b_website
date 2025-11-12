import React from 'react';
import { MapPin, Phone, Mail, ArrowRight, MessageCircle, Send, Linkedin, HardHat, Layers, Cog, Users, Briefcase, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';
import '../app/shiny-button.css';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { SocialButton } from './social-button';

const contactMethods = [
  {
    icon: <Briefcase />,
    title: 'Bureaux Commercial',
    details: companyData.pages.contact.content.emails,
    image: 'https://i.pinimg.com/736x/2c/79/22/2c792262ee0e5c2f3a1290cd06825f9a.jpg',
    aiHint: 'business meeting',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    href: `mailto:${companyData.pages.contact.content.emails[0]}`,
  },
  {
    icon: <HardHat />,
    title: 'Charpente Métallique',
    details: ['+213 770 35 66 86'],
    image: 'https://i.pinimg.com/736x/f8/05/39/f80539082e4b8be52b8e586116b367ca.jpg',
    aiHint: 'steel structure',
    bgColor: 'bg-orange-500/10',
    iconColor: 'text-orange-500',
    href: `tel:${companyData.pages.contact.content.phones[0]}`,
  },
  {
    icon: <Layers />,
    title: 'Panneaux Sandwich',
    details: ['+213 561 61 60 05'],
    image: 'https://i.pinimg.com/736x/ce/22/71/ce227152b9fed3c117cbaad50450656a.jpg',
    aiHint: 'sandwich panels',
    bgColor: 'bg-green-500/10',
    iconColor: 'text-green-500',
    href: `tel:${companyData.pages.contact.content.phones[1]}`,
  },
  {
    icon: <Cog />,
    title: 'Galvanisation',
    details: ['galvanisation@bordjsteel.dz'],
    image: 'https://i.pinimg.com/736x/5c/c4/bd/5cc4bd370f1bd95024acf54e7b1ff667.jpg',
    aiHint: 'hot-dip galvanization',
    bgColor: 'bg-gray-500/10',
    iconColor: 'text-gray-500',
    href: 'mailto:galvanisation@bordjsteel.dz',
  },
  {
    icon: <Users />,
    title: 'Ecoute Client',
    details: ['ecoute.client@bordjsteel.dz'],
    image: 'https://i.pinimg.com/736x/f1/51/10/f151108391838728e14d8cfa85af221b.jpg',
    aiHint: 'customer service',
    bgColor: 'bg-teal-500/10',
    iconColor: 'text-teal-500',
    href: 'mailto:ecoute.client@bordjsteel.dz',
  },
  {
    icon: <Wrench />,
    title: 'Réalisation et Montage',
    details: [''],
    image: 'https://i.pinimg.com/736x/a3/0d/65/a30d652c6e58b3aebe5ca3561af436a6.jpg',
    aiHint: 'steel assembly',
    bgColor: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
    href: 'mailto:realisation@bordjsteel.dz',
  }
];

const ContactCard = ({ method }: { method: (typeof contactMethods)[0] }) => (
  <AnimatedWrapper animation="fade-in-stagger">
    <Link href={method.href || `tel:${method.details[0]}`} target="_blank" rel="noopener noreferrer" className="block group">
      <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-video">
          <Image
            src={method.image}
            alt={method.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            data-ai-hint={method.aiHint}
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
          <div className={cn("absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center border-2 border-white/20 transition-all duration-300 group-hover:scale-125", method.bgColor)}>
            {React.cloneElement(method.icon, { className: cn("w-6 h-6", method.iconColor) })}
          </div>
        </div>
        <CardContent className="p-4 bg-background flex-grow flex flex-col">
          <h3 className="font-headline text-xl font-bold text-primary">{method.title}</h3>
          <div className="text-muted-foreground mt-2 flex-grow">
            {method.details.map((detail, i) => (
              <p key={i}>{detail}</p>
            ))}
          </div>
          <Button variant="link" className="text-accent p-0 mt-4 self-start">
            Contacter <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  </AnimatedWrapper>
);

export function Contact() {
  const { contact } = companyData.pages;

  return (
    <section id="contact" className="bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-4">{contact.title}</h2>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
            {contact.content.info.description}
          </p>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <ContactCard key={index} method={method} />
          ))}
        </div>
      </div>
    </section>
  );
}
