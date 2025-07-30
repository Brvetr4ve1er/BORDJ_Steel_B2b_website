import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AnimatedWrapper } from "./animated-wrapper";
import { useLanguage } from '@/context/language-context';
import { companyData } from '@/config/company-data';

export function VisionMission() {
  const { language } = useLanguage();
  const { about } = companyData[language];

  return (
    <section id="about" className="bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedWrapper animation="fade-in-stagger" staggerIndex={1}>
            <Card className="h-full border-2 border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-primary">{about.visionTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  {about.vision}
                </p>
              </CardContent>
            </Card>
          </AnimatedWrapper>
          <AnimatedWrapper animation="fade-in-stagger" staggerIndex={2}>
            <Card className="h-full border-2 border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-primary">{about.missionTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  {about.mission}
                </p>
              </CardContent>
            </Card>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
}
