
import React from 'react';
import { MapPin, Phone, Mail, ArrowRight, MessageCircle, Send, Linkedin } from 'lucide-react';
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
    icon: <Phone />,
    title: 'Par Téléphone',
    details: companyData.pages.contact.content.phones,
    image: 'https://i.pinimg.com/736x/21/5f/09/215f096b7971773722b528e93233b8c3.jpg',
    aiHint: 'phone call',
    bgColor: 'bg-green-500/10',
    iconColor: 'text-green-500'
  },
  {
    icon: <Mail />,
    title: 'Par Email',
    details: companyData.pages.contact.content.emails,
    image: 'https://i.pinimg.com/736x/87/16/e4/8716e456623c21a44e59003c200c0a31.jpg',
    aiHint: 'email correspondence',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-500'
  },
  {
    icon: <MapPin />,
    title: 'Notre Adresse',
    details: [companyData.pages.contact.content.address],
    image: 'https://i.pinimg.com/736x/95/c0/5d/95c05d762f6b5791986422b403f295b9.jpg',
    aiHint: 'office location',
    bgColor: 'bg-orange-500/10',
    iconColor: 'text-orange-500'
  },
  {
    icon: <Linkedin />,
    title: 'LinkedIn',
    details: ['Suivez-nous sur LinkedIn'],
    image: 'https://i.pinimg.com/736x/be/a8/19/bea8192809f48cc70a7e8b610842e47e.jpg',
    aiHint: 'social media',
    bgColor: 'bg-sky-500/10',
    iconColor: 'text-sky-500',
    href: companyData.socials.linkedin,
  },
  {
    icon: <MessageCircle />,
    title: 'WhatsApp',
    details: ['Discutez avec nous'],
    image: 'https://i.pinimg.com/736x/28/94/a3/2894a3822a101413a17e089d46f5cec8.jpg',
    aiHint: 'mobile chat',
    bgColor: 'bg-teal-500/10',
    iconColor: 'text-teal-500',
    href: companyData.socials.whatsapp,
  }
];

const ContactCard = ({ method }: { method: (typeof contactMethods)[0] }) => (
  <AnimatedWrapper animation="fade-in-stagger">
    <Link href={method.href || `tel:${method.details[0]}`} target="_blank" rel="noopener noreferrer" className="block group">
      <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-square">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {contactMethods.map((method, index) => (
            <ContactCard key={index} method={method} />
          ))}
        </div>
      </div>
    </section>
  );
}
