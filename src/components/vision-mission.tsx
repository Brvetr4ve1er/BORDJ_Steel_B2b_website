
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AnimatedWrapper } from "./animated-wrapper";
import { companyData } from '@/config/company-data';
import { AnimatedCounter } from './animated-counter';
import { Settings } from 'lucide-react';

export function VisionMission() {
  const { about } = companyData.pages;

  return (
    <section id="about" className="bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedWrapper animation="slide-up">
            <div className="relative">
              <Image
                src={about.image.src}
                alt="Bordj Steel Factory"
                width={600}
                height={450}
                className="rounded-lg shadow-2xl object-cover w-full h-auto"
                data-ai-hint={about.image.aiHint}
              />
              <div className="absolute bottom-8 left-8 bg-accent text-accent-foreground p-6 rounded-lg shadow-lg w-48 text-center">
                <Settings className="h-10 w-10 mx-auto mb-2" />
                <div className="text-5xl font-bold">
                  <AnimatedCounter end={about.completedProjects} />+
                </div>
                <p className="text-sm font-semibold tracking-wider uppercase">Projets Réalisés</p>
              </div>
            </div>
          </AnimatedWrapper>
          <AnimatedWrapper animation="fade-in">
            <div>
              <h2 className="font-headline text-4xl font-bold text-primary mb-4">{about.title}</h2>
              <p className="text-lg mb-8">{about.content.history}</p>
              
              <Card className="border-2 border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-primary">{about.content.qsePolicy.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base">
                    {about.content.qsePolicy.text}
                  </p>
                </CardContent>
              </Card>
            </div>
          </AnimatedWrapper>
        </div>
        <AnimatedWrapper animation="fade-in" className="mt-12 text-center">
            <p className="text-xl max-w-4xl mx-auto">{companyData.pages.homepage.content.introduction}</p>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
