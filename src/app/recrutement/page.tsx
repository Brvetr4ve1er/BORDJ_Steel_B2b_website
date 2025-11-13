
"use client";

import { ProductPageLayout } from '@/components/product-page-layout';
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';
import Image from 'next/image';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, MapPin, ArrowRight, Upload } from 'lucide-react';
import React from 'react';

const jobOpenings = [
  {
    title: 'Ingénieur Bureau d\'Études',
    location: 'Bordj Bou Arréridj',
    description: 'Conception et optimisation des structures métalliques, en veillant à la faisabilité technique, à la solidité et à la performance.',
  },
  {
    title: 'Technicien de Production',
    location: 'Bordj Bou Arréridj',
    description: 'Assurer la fabrication, l’assemblage et le contrôle des composants métalliques en respectant les standards de qualité.',
  },
  {
    title: 'Contrôleur Qualité',
    location: 'Bordj Bou Arréridj',
    description: 'Effectuer des contrôles rigoureux à chaque étape de la production pour garantir la conformité aux normes nationales et internationales.',
  },
  {
    title: 'Commercial Terrain',
    location: 'Alger, Algérie',
    description: 'Développer le portefeuille clients et accompagner les projets de la phase de prospection à la conclusion de la vente.',
  },
];

export default function RecrutementPage() {
  const heroImage = {
      src: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2071&auto=format&fit=crop",
      alt: "Team of professionals in a meeting",
      aiHint: "professional team meeting"
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
              Carrières
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 mx-auto">
              Rejoignez une équipe dynamique et construisons ensemble l'avenir de l'industrie métallique.
            </p>
          </AnimatedWrapper>
        </div>
      </section>
      
      <section className="bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedWrapper animation="fade-in">
            <h2 className="text-4xl font-bold text-center text-primary mb-12">Nos Offres d'Emploi</h2>
          </AnimatedWrapper>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobOpenings.map((job, index) => (
              <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                <Card className="h-full flex flex-col group hover:border-accent transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary group-hover:text-accent transition-colors">
                      <Briefcase className="w-6 h-6" />
                      {job.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 pt-2">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{job.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="p-0 h-auto text-accent">
                      Postuler maintenant <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </AnimatedWrapper>
            ))}
          </div>
        </div>
      </section>

      <section id="application-form" className="bg-background">
        <div className="container mx-auto px-4">
          <AnimatedWrapper animation="fade-in">
            <h2 className="text-4xl font-bold text-center text-primary mb-4">Candidature Spontanée</h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              Aucune offre ne correspond à votre profil ? Envoyez-nous votre candidature spontanée. Nous sommes toujours à la recherche de nouveaux talents.
            </p>
          </AnimatedWrapper>
          <AnimatedWrapper animation="slide-up">
            <Card className="max-w-2xl mx-auto shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" placeholder="Votre prénom" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" placeholder="Votre nom" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="votre.email@exemple.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" type="tel" placeholder="Votre numéro de téléphone" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resume">Votre CV</Label>
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80 border-border">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez</p>
                            <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (MAX. 5Mo)</p>
                        </div>
                        <Input id="dropzone-file" type="file" className="hidden" />
                    </label>
                  </div> 
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Lettre de motivation (optionnel)</Label>
                  <Textarea id="message" placeholder="Parlez-nous de vous et de vos motivations..." />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Envoyer ma candidature <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </AnimatedWrapper>
        </div>
      </section>

    </ProductPageLayout>
  );
}
