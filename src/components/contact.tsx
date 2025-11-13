
"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Building2,
  Wrench,
  Package,
  Zap,
  Headphones,
  HardHat,
  Phone,
  Mail,
  MessageCircle,
  Copy,
  Check
} from "lucide-react";
import { cn } from '@/lib/utils';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413C24 18.667 18.664 24 12.107 24h-.004c-2.006 0-3.958-.546-5.632-1.595L0 .057l.057 23.943zm4.905-5.918l.353.208c1.558.914 3.325 1.402 5.178 1.402h.004c5.457 0 9.899-4.442 9.9-9.899.001-2.65-1.03-5.14-2.89-6.999-1.855-1.858-4.34-2.89-6.996-2.89-5.456 0-9.897 4.441-9.899 9.898.001 1.942.546 3.842 1.59 5.495l.235.433-1.032 3.784 3.85-1.019z" fill="currentColor"></path>
      <path d="M17.473 14.382c-.272-.136-1.604-.79-1.854-.878-.25-.088-.431-.136-.612.136-.181.272-.699.878-.857 1.054-.158.176-.316.198-.588.062-.272-.136-1.144-.424-2.18-1.346-1.624-1.426-1.954-2.072-2.13-2.427-.176-.355-.018-.546.118-.682.12-.12.272-.316.408-.474.136-.158.181-.272.272-.455.09-.181.045-.355-.023-.49-.068-.136-.612-1.46-.838-2.004-.225-.544-.45-.468-.612-.476-.16-.008-.34-.01-.52-.01-.18 0-.455.068-.68.34-.226.272-.878.857-.878 2.099 0 1.242.896 2.436 1.014 2.612.118.176 1.758 2.804 4.264 3.744 2.505.94 2.505.626 2.955.582.45-.044 1.604-.654 1.83-1.276.226-.622.226-1.148.158-1.276-.068-.12-.248-.196-.52-.33z" fill="currentColor"></path>
    </svg>
);


interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  phone?: string;
  email?: string;
  image?: string;
  className?: string;
  style?: React.CSSProperties;
}

function ContactCard({
  icon,
  title,
  phone,
  email,
  image,
  className,
  style,
}: ContactCardProps) {
  const [isPhoneCopied, setIsPhoneCopied] = useState(false);
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  const handleCopy = (textToCopy: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      if (type === 'phone') {
        setIsPhoneCopied(true);
        setTimeout(() => setIsPhoneCopied(false), 2000);
      } else {
        setIsEmailCopied(true);
        setTimeout(() => setIsEmailCopied(false), 2000);
      }
    });
  };

  const handleWhatsAppClick = () => {
    if (!phone) return;
    const cleanPhone = phone.replace(/\s/g, "");
    window.open(`https://wa.me/${cleanPhone}`, "_blank");
  };

  const handleEmailClick = () => {
    if (!email) return;
    window.open(`mailto:${email}`, "_blank");
  };

  return (
    <Card
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border-2 bg-background/70 backdrop-blur-sm transition-all duration-500 hover:border-accent hover:shadow-xl hover:-translate-y-2 group",
        className
      )}
      style={style}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>

      <div className="relative flex flex-col gap-4 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>

        <div className="flex flex-col gap-3">
          {phone && (
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/50 p-3">
              <div
                className="group/copy flex-grow cursor-pointer"
                onClick={() => handleCopy(phone, 'phone')}
              >
                <span className="text-2xl font-bold text-foreground transition-colors group-hover/copy:text-accent">
                  {phone}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {isPhoneCopied ? (
                    <>
                      <Check className="h-3 w-3 text-green-500" />
                      <span>Copié!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Cliquer pour copier</span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={handleWhatsAppClick}
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 transition-all duration-300 hover:bg-green-500 hover:text-white hover:scale-110"
                aria-label="Contacter sur WhatsApp"
              >
                <WhatsappIcon className="h-8 w-8" />
              </button>
            </div>
          )}

          {email && (
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/50 p-3">
              <div
                className="group/copy flex-grow cursor-pointer"
                onClick={() => handleCopy(email, 'email')}
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover/copy:text-accent break-all">
                  {email}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {isEmailCopied ? (
                    <>
                      <Check className="h-3 w-3 text-green-500" />
                      <span>Copié!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Cliquer pour copier</span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={handleEmailClick}
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 transition-all duration-300 hover:bg-blue-500 hover:text-white hover:scale-110"
                aria-label="Envoyer un email"
              >
                <Mail className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export function Contact() {
  const { contact } = companyData.pages;

  const contactSections: ContactCardProps[] = [
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Bureaux Commercial",
      email: "commercial@bordjsteel.dz",
      phone: "+213 561 61 60 05",
      image: "https://i.pinimg.com/736x/47/96/a1/4796a1c0ca2eeec68b8721a16d75c1a2.jpg",
    },
    {
      icon: <HardHat className="h-8 w-8" />,
      title: "Charpente Métallique",
      phone: "+213 770 98 43 14",
      email: "commercial@bordjsteel.dz",
      image: "https://i.pinimg.com/736x/f8/05/39/f80539082e4b8be52b8e586116b367ca.jpg",
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "Panneaux Sandwich",
      phone: "+213 770 70 59 78",
      email: "commercial@bordjsteel.dz",
      image: "https://i.pinimg.com/736x/e6/5d/76/e65d7681b328d8bfa21ab5e4a7e7a447.jpg",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Galvanisation",
      phone: "+213 770 35 73 47",
      email: "commercial@bordjsteel.dz",
      image: "https://i.pinimg.com/736x/5c/c4/bd/5cc4bd370f1bd95024acf54e7b1ff667.jpg",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Ecoute Client",
      phone: "+213 770 83 25 96",
      email: "marketing@bordjsteel.dz",
      image: "https://i.pinimg.com/474x/2c/79/22/2c792262ee0e5c2f3a1290cd06825f9a.jpg",
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Réalisation et Montage",
      phone: "+213 770 98 01 48",
      email: "commercial@bordjsteel.dz",
      image: "https://i.pinimg.com/736x/a3/0d/65/a30d652c6e58b3aebe5ca3561af436a6.jpg",
    }
  ];

  return (
    <section id="contact" className="w-full">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <AnimatedWrapper animation="fade-in">
            <h2 className="mx-auto max-w-2xl text-4xl text-accent font-bold">
              {contact.content.info.description}
            </h2>
          </AnimatedWrapper>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contactSections.map((section, index) => (
             <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                <ContactCard
                {...section}
                />
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

    

    



    

    

    

