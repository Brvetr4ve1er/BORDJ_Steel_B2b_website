
"use client";

import { AnimatedWrapper } from '@/components/shared/AnimatedWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Shield, Factory, Hammer } from 'lucide-react';

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

export function ActivitiesSection() {
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
