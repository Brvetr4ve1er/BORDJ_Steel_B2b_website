
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AnimatedWrapper } from "./animated-wrapper";
import { companyData } from '@/config/company-data';

export function VisionMission() {
  const { about, homepage } = companyData.pages;

  return (
    <section id="about" className="bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedWrapper animation="fade-in-stagger" staggerIndex={1}>
            <Card className="h-full border-2 border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-primary">{about.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  {about.content.history}
                </p>
              </CardContent>
            </Card>
          </AnimatedWrapper>
          <AnimatedWrapper animation="fade-in-stagger" staggerIndex={2}>
            <Card className="h-full border-2 border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-primary">{about.content.qsePolicy.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  {about.content.qsePolicy.text}
                </p>
              </CardContent>
            </Card>
          </AnimatedWrapper>
        </div>
        <AnimatedWrapper animation="fade-in" className="mt-12 text-center">
            <p className="text-xl max-w-4xl mx-auto">{homepage.content.introduction}</p>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
