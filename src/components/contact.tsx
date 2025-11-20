
"use client";

import React from 'react';
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
  Copy,
  Check
} from "lucide-react";
import { cn } from '@/lib/utils';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';
import { useState } from 'react';
import Image from 'next/image';
import images from '@/app/lib/placeholder-images.json';

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" {...props}>
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
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
      <div className="relative h-64 w-full overflow-hidden">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
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
      image: "https://i.pinimg.com/736x/85/ab/f7/85abf719f734e7c11defc2c680c1fbe6.jpg",
    },
    {
      icon: <HardHat className="h-8 w-8" />,
      title: "Charpente Métallique",
      phone: "+213 770 98 43 14",
      email: "commercial@bordjsteel.dz",
      image: "https://i.pinimg.com/736x/e4/e9/e2/e4e9e2933ed8fa9f0d49d50c4d61deb1.jpg",
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "Panneaux Sandwich",
      phone: "+213 770 70 59 78",
      email: "commercial@bordjsteel.dz",
      image: "https://i.pinimg.com/736x/f4/82/92/f482924f5237e9d9f98da4e26adffdbb.jpg",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Galvanisation",
      phone: "+213 770 35 73 47",
      email: "commercial@bordjsteel.dz",
      image: images.galvanisation.hero.src,
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
            <h2 className="font-bold text-4xl text-accent">
              Remplissez le formulaire et notre équipe vous répondra dans les 24 heures.
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
