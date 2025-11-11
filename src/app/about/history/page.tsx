
"use client";

import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import Image from 'next/image';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    icon: <TrendingUp className="w-8 h-8 text-accent" />,
    title: "Bureau d'études",
    description: "Véritable moteur de l’innovation, notre bureau d’études conçoit et optimise les structures métalliques selon les besoins spécifiques de chaque client. Il veille à la faisabilité technique, à la solidité et à la performance de nos réalisations.",
    detail: "Il veille à la faisabilité technique, à la solidité et à la performance de nos réalisations.",
    color: "bg-primary",
    image: "https://i.pinimg.com/736x/dd/d2/b8/ddd2b884a8cdf6c38c4fe8c6ea24c7e0.jpg"
  },
  {
    id: 'production',
    icon: <Factory className="w-8 h-8 text-accent" />,
    title: "Équipe Production",
    description: "Au cœur de notre activité, l’équipe de production assure la fabrication, l’assemblage et le contrôle des différents composants. Grâce à une maîtrise technique avancée et à des équipements modernes, elle garantit la fiabilité et la durabilité de nos produits.",
    detail: "Grâce à une maîtrise technique avancée et à des équipements modernes, elle garantit la fiabilité et la durabilité de nos produits.",
    color: "bg-primary",
    image: "https://i.pinimg.com/736x/c1/22/d0/c122d0a87b9a67655d2af2921bc6b69a.jpg"
  },
  {
    id: 'quality',
    icon: <ClipboardCheck className="w-8 h-8 text-accent" />,
    title: "Équipe Contrôle Qualité",
    description: "Cette équipe veille à la conformité de nos produits aux normes nationales et internationales. Des contrôles rigoureux sont effectués à chaque étape – de la conception à la livraison – afin d’assurer une qualité irréprochable.",
    detail: "Des contrôles rigoureux sont effectués à chaque étape pour assurer une qualité irréprochable.",
    color: "bg-primary",
    image: "https://i.pinimg.com/736x/36/1f/d5/361fd5991471a9382f7e7cada21ff2da.jpg"
  },
  {
    id: 'hse',
    icon: <HardHat className="w-8 h-8 text-accent" />,
    title: "Équipe QHSE",
    description: "(Qualité, Hygiène, Sécurité et Environnement) Notre équipe QHSE veille à la qualité de nos processus, à la sécurité de nos collaborateurs, à la prévention des risques professionnels et à la protection de l’environnement. La sécurité, la qualité et la durabilité font partie intégrante de la culture BordjSteel.",
    detail: "La sécurité et la durabilité font partie intégrante de la culture BordjSteel.",
    color: "bg-primary",
    image: "https://i.pinimg.com/736x/99/14/b3/9914b30d1923fb9585db5fa692769658.jpg"
  },
  {
    id: 'commercial',
    icon: <UserCheck className="w-8 h-8 text-accent" />,
    title: "Équipe Commerciale et Marketing",
    description: "Toujours à l’écoute du marché, notre équipe commerciale et marketing accompagne nos clients à chaque étape de leurs projets. Elle met un point d’honneur à offrir des solutions personnalisées, un suivi attentif et un service de qualité.",
    detail: "Elle met un point d'honneur à offrir des solutions personnalisées, un suivi attentif et un service de qualité.",
    color: "bg-primary",
    image: "https://i.pinimg.com/736x/2c/79/22/2c792262ee0e5c2f3a1290cd06825f9a.jpg"
  },
  {
    id: 'finance',
    icon: <DollarSign className="w-8 h-8 text-accent" />,
    title: "Équipe Comptabilité et Finances",
    description: "(Chargée de la gestion rigoureuse des ressources financières, cette équipe assure le suivi comptable, le contrôle budgétaire et la transparence de toutes les opérations économiques de l’entreprise. Son objectif : garantir une santé financière solide et durable.)",
    detail: "Son objectif : garantir une santé financière solide et durable.",
    color: "bg-primary",
    image: "https://i.pinimg.com/736x/47/96/a1/4796a1c0ca2eeec68b8721a16d75c1a2.jpg"
  },
  {
    id: 'hr',
    icon: <Users className="w-8 h-8 text-accent" />,
    title: "Équipe Ressources Humaines",
    description: "(Au centre de la vie de l’entreprise, l’équipe RH veille au bien-être, à la formation et à l’évolution de nos collaborateurs. Elle favorise un environnement de travail motivant et valorisant, essentiel à la performance collective.)",
    detail: "Elle favorise un environnement de travail motivant et valorisant, essentiel à la performance collective.",
    color: "bg-primary",
    image: "https://i.pinimg.com/736x/f1/51/10/f151108391838728e14d8cfa85af221b.jpg"
  },
  {
    id: 'it',
    icon: <Network className="w-8 h-8 text-accent" />,
    title: "Équipe Système d’Information",
    description: "Responsable de la gestion et du développement des outils numériques, cette équipe garantit la sécurité, la performance et la continuité des systèmes informatiques. Elle joue un rôle clé dans la transformation digitale de BordjSteel.",
    detail: "Elle joue un rôle clé dans la transformation digitale de BordjSteel.",
    color: "bg-primary",
    image: "https://i.pinimg.com/736x/6a/c8/6a/6ac86a94f2a9c05bf62c26abddb13d67.jpg"
  },
  {
    id: 'assembly',
    icon: <Wrench className="w-8 h-8 text-accent" />,
    title: "Équipe Réalisation et Montage",
    description: "Spécialisée dans l’installation sur site, cette équipe assure le montage précis et sécurisé de nos structures métalliques. Son savoir-faire garantit la conformité, la stabilité et la qualité de chaque projet livré.",
    detail: "Son savoir-faire garantit la conformité, la stabilité et la qualité de chaque projet livré.",
    color: "bg-primary",
    image: "https://i.pinimg.com/736x/a3/0d/65/a30d652c6e58b3aebe5ca3561af436a6.jpg"
  }
];

const certifications = [
  { name: "ISO 9001", description: "Management de la qualité", image: "https://i.pinimg.com/736x/1b/c3/3a/1bc33a6cbdf6d1c416b32699f6e5802b.jpg" },
  { name: "ISO 14001", description: "Management environnemental", image: "https://i.pinimg.com/736x/85/14/f2/8514f22dc44e52cd093ec0f1be9f641d.jpg" },
  { name: "ISO 45001", description: "Santé et sécurité au travail", image: "https://i.pinimg.com/736x/fc/ea/fb/fceafbcc5c3f0645268534eed8924cb3.jpg" }
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

const TeamFeature = ({
  title,
  description,
  icon,
  image
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}) => {
  return (
    <div className="group bg-card rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex overflow-hidden border border-border">
      <div className="w-[35%] flex-shrink-0 relative aspect-square">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="w-[65%] p-6 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-3">
          <div className="bg-secondary p-3 rounded-full">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-primary">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};


function TeamsSection() {
  return (
    <section>
      <AnimatedWrapper animation="fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl md:text-7xl font-bold text-primary mb-12 text-center">Nos équipes spécialisées</h2>
        </div>
      </AnimatedWrapper>
       <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {teams.map((team, index) => (
            <AnimatedWrapper key={team.id} animation="fade-in-stagger" staggerIndex={index}>
              <TeamFeature {...team} />
            </AnimatedWrapper>
        ))}
      </div>
    </section>
  );
}

function CertificationCard({ cert }: { cert: { name: string; description: string; image: string; } }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-[240px] h-[340px]"
      style={{ perspective: 1000 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Content inside the book */}
      <div className="absolute inset-0 bg-background rounded-lg shadow-inner flex items-center justify-center p-4">
        <Image
          src={cert.image}
          alt="Certificate frame"
          width={220}
          height={320}
          className="object-contain"
        />
      </div>
      
      {/* Cover of the book */}
      <motion.div
        className="absolute inset-0 bg-card rounded-lg shadow-lg p-6 text-center flex flex-col items-center justify-center cursor-pointer"
        style={{ transformOrigin: 'left', transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isHovered ? -140 : 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        <div className="bg-secondary rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 shadow-inner">
          <Award className="w-12 h-12 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-primary mb-2">{cert.name}</h3>
        <p className="text-muted-foreground">{cert.description}</p>
        <p className="absolute bottom-4 text-xs text-muted-foreground/50">Passez pour ouvrir</p>
      </motion.div>
    </motion.div>
  );
}

function CertificationsSection() {
  return (
    <section className="bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in" className="text-center mb-16">
          <Award className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h2 className="text-4xl font-bold text-primary mb-4">Nos certifications et engagements</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Forte de son expérience et de son savoir-faire, BordjSteel s'engage à respecter les plus hauts standards de qualité et de sécurité.
          </p>
        </AnimatedWrapper>
        <div className="flex flex-wrap justify-center gap-12">
          {certifications.map((cert, index) => (
            <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
              <CertificationCard cert={cert} />
            </AnimatedWrapper>
          ))}
        </div>
        <AnimatedWrapper animation="fade-in" className="mt-16 text-center">
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
      <TeamsSection />
      <CertificationsSection />
    </ProductPageLayout>
  );
}
