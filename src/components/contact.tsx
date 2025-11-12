
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
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    <path d="M14.05 2.9A15.9 15.9 0 0 1 21 8.95" />
    <path d="M14.05 6.4A11.9 11.9 0 0 1 17.6 10" />
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
                <WhatsappIcon className="h-6 w-6" />
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
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    },
    {
      icon: <HardHat className="h-8 w-8" />,
      title: "Charpente Métallique",
      phone: "+213 770 98 43 14",
      email: "commercial.charpente@bordjsteel.dz",
      image: "https://i.pinimg.com/736x/f8/05/39/f80539082e4b8be52b8e586116b367ca.jpg",
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "Panneaux Sandwich",
      phone: "+213 770 70 59 78",
      email: "commercial.panneaux@bordjsteel.dz",
      image: "https://i.pinimg.com/736x/ce/22/71/ce227152b9fed3c117cbaad50450656a.jpg",
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

    

    