
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
  Mail
} from "lucide-react";
import { cn } from '@/lib/utils';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';

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
  const handlePhoneClick = () => {
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
        "relative flex flex-col overflow-hidden rounded-xl border-2 bg-background/70 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:-translate-y-2 group",
        className
      )}
      style={style}
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="relative flex flex-col gap-4 p-6">
        {/* Icon and Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-3">
          {/* Phone */}
          {phone && (
            <button
              onClick={handlePhoneClick}
              className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:translate-x-1"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500/10 text-green-600 dark:text-green-400">
                <Phone className="h-4 w-4" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">WhatsApp</span>
                <span className="text-sm font-medium text-foreground">{phone}</span>
              </div>
            </button>
          )}

          {/* Email */}
          {email && (
            <button
              onClick={handleEmailClick}
              className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:translate-x-1"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Mail className="h-4 w-4" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">Email</span>
                <span className="text-sm font-medium text-foreground">{email}</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </Card>
  );
}

export function Contact() {
  const { contact } = companyData.pages;

  const contactSections: ContactCardProps[] = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Bureaux Commercial",
      email: "commercial@bordjsteel.dz",
      phone: "+213 561 61 60 05",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    },
    {
      icon: <HardHat className="h-6 w-6" />,
      title: "Charpente Métallique",
      phone: "+213 770 98 43 14",
      email: "commercial.charpente@bordjsteel.dz",
      image: "https://i.pinimg.com/736x/f8/05/39/f80539082e4b8be52b8e586116b367ca.jpg",
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: "Panneaux Sandwich",
      phone: "+213 561 61 60 05",
      email: "commercial.panneaux@bordjsteel.dz",
      image: "https://i.pinimg.com/736x/ce/22/71/ce227152b9fed3c117cbaad50450656a.jpg",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Galvanisation",
      email: "galvanisation@bordjsteel.dz",
      phone: "+213 560 99 99 28",
      image: "https://i.pinimg.com/736x/5c/c4/bd/5cc4bd370f1bd95024acf54e7b1ff667.jpg",
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "Ecoute Client",
      email: "ecoute.client@bordjsteel.dz",
      phone: "+213 560 99 99 25",
      image: "https://i.pinimg.com/736x/f1/51/10/f151108391838728e14d8cfa85af221b.jpg",
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Réalisation et Montage",
      email: "realisation@bordjsteel.dz",
      phone: "+213 560 99 99 30",
      image: "https://i.pinimg.com/736x/a3/0d/65/a30d652c6e58b3aebe5ca3561af436a6.jpg",
    }
  ];

  return (
    <section id="contact" className="bg-secondary w-full py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <AnimatedWrapper animation="fade-in">
            <h2 className="mb-4 text-4xl font-bold text-primary">
              {contact.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {contact.content.info.description}
            </p>
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
