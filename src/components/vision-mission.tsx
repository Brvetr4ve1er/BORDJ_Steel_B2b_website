
import { AnimatedWrapper } from "./animated-wrapper";
import { companyData } from '@/config/company-data';
import { Award, Cog } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { AnimatedNumber } from "./animated-number";
import images from '@/app/lib/placeholder-images.json';
import type { ElementType } from "react";

const iconMap: { [key: string]: ElementType } = {
  Award,
  Cog,
};

export function VisionMission() {
  const { about } = companyData.pages;
  const { vision, mission, history, completedProjects } = about.content;
  const aboutImage = images.homepage.about;

  const VisionIcon = iconMap[vision.icon];
  const MissionIcon = iconMap[mission.icon];

  return (
    <section id="about" className="bg-background bg-gradient-to-br from-background via-slate-50 to-background dark:from-background dark:via-slate-900/50 dark:to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedWrapper animation="zoom-in">
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl group">
              <Image
                src={aboutImage.src}
                alt={aboutImage.alt}
                width={aboutImage.width}
                height={aboutImage.height}
                className="transition-transform duration-500 group-hover:scale-110 object-cover w-full h-full"
                data-ai-hint={aboutImage.aiHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48">
                    <div className="absolute inset-0 bg-accent/80 backdrop-blur-sm rounded-xl transform -rotate-6 transition-transform duration-300 group-hover:rotate-0" />
                    <div className="relative text-white text-center flex flex-col justify-center h-full p-4">
                        <div className="font-headline font-bold text-6xl flex items-center justify-center">
                            <AnimatedNumber value={completedProjects} />+
                        </div>
                        <p className="font-semibold uppercase tracking-wider mt-2">
                            Projets Réalisés
                        </p>
                    </div>
                </div>
              </div>
            </div>
          </AnimatedWrapper>

          <div className="space-y-10">
             <AnimatedWrapper animation="fade-in-stagger" className="mb-12">
                <h2 className="font-headline text-7xl leading-tight font-bold text-primary mb-4">
                    BORDJ <span className="text-accent">STEEL</span>
                </h2>
                <p className="text-lg text-muted-foreground">{history}</p>
            </AnimatedWrapper>
            <AnimatedWrapper animation="slide-up">
              <div className="flex items-start gap-6 border-l-4 border-accent pl-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-red-100 flex items-center justify-center border-4 border-accent/20">
                    {VisionIcon && <VisionIcon className="w-8 h-8 text-accent" />}
                </div>
                <div>
                  <h3 className="font-headline text-3xl font-bold text-primary mb-2">{vision.title}</h3>
                  <p className="text-lg">{vision.text}</p>
                </div>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper animation="slide-up" staggerIndex={2}>
              <div className="flex items-start gap-6 border-l-4 border-accent pl-6">
                 <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center border-4 border-primary/20">
                    {MissionIcon && <MissionIcon className="w-8 h-8 text-primary" />}
                </div>
                <div>
                  <h3 className="font-headline text-3xl font-bold text-primary mb-2">{mission.title}</h3>
                  <p className="text-lg">{mission.text}</p>
                   <Button asChild size="lg" variant="destructive" className="bg-accent hover:bg-accent/90 mt-6 px-8 py-6 text-lg">
                    <Link href="/about/history">
                      En savoir plus sur notre politique QHSE
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatedWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
