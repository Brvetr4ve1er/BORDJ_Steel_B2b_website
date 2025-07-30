
import { AnimatedWrapper } from "./animated-wrapper";
import { companyData } from '@/config/company-data';
import { Award, Cog } from "lucide-react";
import { Button } from "./ui/button";

const iconMap: { [key: string]: React.ElementType } = {
  Award: Award,
  Cog: Cog,
};

export function VisionMission() {
  const { about } = companyData.pages;
  const { vision, mission } = about.content;

  const VisionIcon = iconMap[vision.icon];
  const MissionIcon = iconMap[mission.icon];

  return (
    <section id="about" className="bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-primary mb-4 text-center">{about.title}</h2>
          <p className="text-lg mb-12 text-center text-muted-foreground">{about.content.history}</p>
        </AnimatedWrapper>
        
        <div className="space-y-12">
          <AnimatedWrapper animation="slide-up">
            <div className="flex items-center gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
                  {VisionIcon && <VisionIcon className="w-12 h-12 text-accent" />}
                </div>
              </div>
              <div>
                <h3 className="font-headline text-3xl font-bold text-primary mb-2">{vision.title}</h3>
                <p className="text-lg">{vision.text}</p>
              </div>
            </div>
          </AnimatedWrapper>
          
          <AnimatedWrapper animation="slide-up">
             <div className="flex items-center gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                  {MissionIcon && <MissionIcon className="w-12 h-12 text-primary" />}
                </div>
              </div>
              <div>
                <h3 className="font-headline text-3xl font-bold text-primary mb-2">{mission.title}</h3>
                <p className="text-lg">{mission.text}</p>
              </div>
            </div>
          </AnimatedWrapper>
        </div>

        <AnimatedWrapper animation="fade-in" className="mt-16 text-center">
            <Button size="lg" variant="destructive" className="bg-accent hover:bg-accent/90">
              En savoir plus
            </Button>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
