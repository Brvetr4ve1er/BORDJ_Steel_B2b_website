
"use client";

import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import Image from 'next/image';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import React, { useState } from 'react';
import { Timeline } from '@/components/timeline';
import { Building2, Users, Award, Shield, Factory, Hammer, ClipboardCheck, HardHat, UserCheck, TrendingUp, Minus, Plus, DollarSign, Network, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const activities = [
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Charpente métallique",
    description: "Conception, fabrication et montage de structures adaptées à tous types de projets industriels, agricoles et logistiques."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Galvanisation à chaud",
    description: "Traitement de protection anticorrosion garantissant la longévité et la résistance des structures."
  },
  {
    icon: <Factory className="w-8 h-8" />,
    title: "Panneaux sandwich",
    description: "Production et fourniture de panneaux isolants destinés aux bâtiments industriels, frigorifiques et tertiaires."
  },
  {
    icon: <Hammer className="w-8 h-8" />,
    title: "Chaudronnerie",
    description: "Conception et réalisation d'équipements métalliques spécifiques selon les besoins des clients."
  }
];

const teams = [
  {
    id: 'engineering',
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Bureau d'études",
    description: "Véritable moteur de l'innovation, notre bureau d'études conçoit et optimise les structures métalliques.",
    detail: "Il veille à la faisabilité technique, à la solidité et à la performance de nos réalisations.",
    color: "bg-primary",
    image: "https://picsum.photos/seed/eng/600/800"
  },
  {
    id: 'production',
    icon: <Factory className="w-8 h-8" />,
    title: "Équipe Production",
    description: "Au cœur de notre activité, l'équipe de production assure la fabrication, l'assemblage et le contrôle des composants.",
    detail: "Grâce à une maîtrise technique avancée et à des équipements modernes, elle garantit la fiabilité et la durabilité de nos produits.",
    color: "bg-primary",
    image: "https://picsum.photos/seed/prod/600/800"
  },
  {
    id: 'quality',
    icon: <ClipboardCheck className="w-8 h-8" />,
    title: "Contrôle Qualité",
    description: "Cette équipe veille à la conformité de nos produits aux normes nationales et internationales.",
    detail: "Des contrôles rigoureux sont effectués à chaque étape pour assurer une qualité irréprochable.",
    color: "bg-primary",
    image: "https://picsum.photos/seed/qual/600/800"
  },
  {
    id: 'hse',
    icon: <HardHat className="w-8 h-8" />,
    title: "Équipe HSE",
    description: "Notre équipe HSE veille à la sécurité de nos collaborateurs et à la protection de l'environnement.",
    detail: "La sécurité et la durabilité font partie intégrante de la culture BordjSteel.",
    color: "bg-primary",
    image: "https://picsum.photos/seed/hse/600/800"
  },
  {
    id: 'commercial',
    icon: <UserCheck className="w-8 h-8" />,
    title: "Commercial & Marketing",
    description: "Toujours à l'écoute du marché, notre équipe accompagne nos clients à chaque étape de leurs projets.",
    detail: "Elle met un point d'honneur à offrir des solutions personnalisées, un suivi attentif et un service de qualité.",
    color: "bg-primary",
    image: "https://picsum.photos/seed/comm/600/800"
  },
  {
    id: 'finance',
    icon: <DollarSign className="w-8 h-8" />,
    title: "Équipe Comptabilité et Finances",
    description: "Chargée de la gestion rigoureuse des ressources financières, assurant suivi comptable et contrôle budgétaire.",
    detail: "Son objectif : garantir une santé financière solide et durable.",
    color: "bg-primary",
    image: "https://picsum.photos/seed/fin/600/800"
  },
  {
    id: 'hr',
    icon: <Users className="w-8 h-8" />,
    title: "Équipe Ressources Humaines",
    description: "L'équipe RH veille au bien-être, à la formation et à l’évolution de nos collaborateurs pour un environnement motivant.",
    detail: "Elle favorise un environnement de travail motivant et valorisant, essentiel à la performance collective.",
    color: "bg-primary",
    image: "https://picsum.photos/seed/hr/600/800"
  },
  {
    id: 'it',
    icon: <Network className="w-8 h-8" />,
    title: "Équipe Système d’Information",
    description: "Responsable du développement des outils numériques, garantissant la sécurité et la performance des systèmes.",
    detail: "Elle joue un rôle clé dans la transformation digitale de BordjSteel.",
    color: "bg-primary",
    image: "https://picsum.photos/seed/it/600/800"
  },
  {
    id: 'assembly',
    icon: <Wrench className="w-8 h-8" />,
    title: "Équipe Réalisation et Montage",
    description: "Spécialisée dans l’installation sur site, assurant un montage précis et sécurisé de nos structures métalliques.",
    detail: "Son savoir-faire garantit la conformité, la stabilité et la qualité de chaque projet livré.",
    color: "bg-primary",
    image: "https://picsum.photos/seed/asm/600/800"
  }
];

const certifications = [
  { name: "ISO 9001", description: "Management de la qualité" },
  { name: "ISO 14001", description: "Management environnemental" },
  { name: "ISO 45001", description: "Santé et sécurité au travail" }
];


function ActivitiesSection() {
  return (
    <section className="container mx-auto px-4">
      <AnimatedWrapper animation="fade-in">
        <h2 className="font-headline text-4xl font-bold text-center text-primary mb-4">Notre domaine d'activité</h2>
        <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
          Depuis sa création, BordjSteel s'est imposée comme un acteur majeur dans le domaine de la construction métallique en Algérie.
        </p>
      </AnimatedWrapper>
      <div className="grid md:grid-cols-2 gap-8">
        {activities.map((activity, index) => (
          <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="bg-accent text-accent-foreground p-4 rounded-lg">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-2">{activity.title}</h3>
                    <p className="text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedWrapper>
        ))}
      </div>
    </section>
  );
}

function HumanCapitalSection() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <AnimatedWrapper animation="fade-in">
          <Users className="w-20 h-20 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-4">Notre capital humain</h2>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Avec plus de <span className="font-bold text-3xl">700 collaborateurs</span>, BordjSteel s'appuie sur une équipe compétente, engagée et passionnée par l'excellence industrielle.
          </p>
          <p className="text-primary-foreground/80 mt-4 max-w-2xl mx-auto">
            Chaque membre contribue au succès de l'entreprise à travers son savoir-faire, sa rigueur et son professionnalisme.
          </p>
        </AnimatedWrapper>
      </div>
    </section>
  );
}

const TeamFeature = ({
  title,
  description,
  icon,
  index,
  image
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  image: string;
}) => {
  const totalFeatures = teams.length;
  const numCols = 3; // lg:grid-cols-3
  return (
    <div
      className={cn(
        "flex flex-col justify-end p-8 lg:border-r py-10 relative group/feature dark:border-neutral-800 min-h-[400px] rounded-lg overflow-hidden",
        (index === 0 || index % numCols === 0) && "lg:border-l dark:border-neutral-800",
        index < totalFeatures - (totalFeatures % numCols || numCols) && "lg:border-b dark:border-neutral-800"
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover absolute inset-0 z-0 transition-transform duration-300 group-hover/feature:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />

      {index < totalFeatures - (totalFeatures % numCols || numCols) && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-secondary/50 to-transparent pointer-events-none z-20" />
      )}
      {index >= totalFeatures - (totalFeatures % numCols || numCols) && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-secondary/50 to-transparent pointer-events-none z-20" />
      )}
      <div className="mb-4 relative z-20 text-white">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-20">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-border group-hover/feature:bg-accent transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-300 max-w-xs relative z-20">
        {description}
      </p>
    </div>
  );
};

function TeamsSection() {
  return (
    <section className="container mx-auto px-4">
      <AnimatedWrapper animation="fade-in">
        <h2 className="text-6xl md:text-7xl font-bold text-primary mb-12 text-center">Nos équipes spécialisées</h2>
      </AnimatedWrapper>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto gap-4">
        {teams.map((team, index) => (
            <TeamFeature key={team.id} {...team} index={index} />
        ))}
      </div>
    </section>
  );
}

function CertificationsSection() {
  return (
    <section className="bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in" className="text-center mb-12">
          <Award className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h2 className="text-4xl font-bold text-primary mb-4">Nos certifications et engagements</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Forte de son expérience et de son savoir-faire, BordjSteel s'engage à respecter les plus hauts standards de qualité et de sécurité.
          </p>
        </AnimatedWrapper>
        <div className="grid md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
              <Card className="bg-background rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-shadow border-2 border-transparent hover:border-accent">
                <div className="bg-secondary rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <Award className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">{cert.name}</h3>
                <p className="text-muted-foreground">{cert.description}</p>
              </Card>
            </AnimatedWrapper>
          ))}
        </div>
        <AnimatedWrapper animation="fade-in" className="mt-12 text-center">
          <p className="text-muted-foreground italic">
            La société détient plusieurs certifications reconnues, témoignant de son sérieux et de sa conformité aux exigences internationales.
          </p>
        </AnimatedWrapper>
      </div>
    </section>
  );
}


export default function HistoryPage() {
  const heroImage = {
      src: "https://i.pinimg.com/736x/d5/03/28/d503286d2b91eaf2a17fe813878d9568.jpg",
      alt: "Steel factory background",
      aiHint: "welding steel"
  }

  return (
    <ProductPageLayout>
      <section className="relative h-[60vh] w-full flex items-center justify-center text-white overflow-hidden">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          className="z-0 object-cover"
          priority
          data-ai-hint={heroImage.aiHint}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <AnimatedWrapper animation="zoom-in">
            <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter uppercase text-white">
              Notre Histoire
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 mx-auto">
              Forger l'avenir de la construction métallique en Algérie, un projet à la fois.
            </p>
          </AnimatedWrapper>
        </div>
      </section>
      <ActivitiesSection />
      <section className="bg-secondary py-20">
        <Timeline />
      </section>
      <HumanCapitalSection />
      <TeamsSection />
      <CertificationsSection />
    </ProductPageLayout>
  );
}

    