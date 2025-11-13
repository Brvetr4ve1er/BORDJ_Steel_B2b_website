
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
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.76.46 3.42 1.29 4.89L2 22l5.25-1.38c1.41.78 3.01 1.25 4.71 1.25h.01c5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zM17.47 16c-.22 0-.67-.11-1.33-.49-.66-.37-1.09-.58-1.26-.88s-.27-.45-.27-.88c0-.43.27-.88.54-1.15.27-.27.58-.45.79-.62.21-.17.31-.27.42-.46s.07-.34 0-.58c-.07-.24-.27-.45-.41-.58-.14-.14-.29-.21-.43-.24-.14-.04-1.12-.53-1.63-1.11-.51-.58-.87-1.02-.91-1.11s-.11-.29-.29-.39c-.18-.1-.4-.14-.62-.14-.22 0-.46.03-.66.07-.2.03-.49.14-.75.28s-.5.31-.75.58c-.25.27-.5.58-.73.91s-.41.73-.62 1.16c-.21.43-.45.95-.45 1.54s.34 1.19.51 1.36c.17.17.38.38.58.58.2.2.42.42.62.62s.39.38.58.55c.19.17 1.26 1.25 2.89 2.04 1.63.79 2.58 1.04 3.09 1.15.51.11 1.01.07 1.45-.11.44-.18.91-.49 1.26-1.11.34-.62.34-1.15.24-1.36s-.25-.21-.49-.31z" fill="currentColor"/>
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

    

    



    

    

    