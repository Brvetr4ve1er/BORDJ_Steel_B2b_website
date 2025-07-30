import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AnimatedWrapper } from "./animated-wrapper";

export function VisionMission() {
  return (
    <section id="about" className="bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedWrapper animation="fade-in-stagger" staggerIndex={1}>
            <Card className="h-full border-2 border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-primary">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  To be the benchmark in the steel construction industry, recognized for our innovation, quality, and commitment to sustainable development, shaping a stronger and more resilient future.
                </p>
              </CardContent>
            </Card>
          </AnimatedWrapper>
          <AnimatedWrapper animation="fade-in-stagger" staggerIndex={2}>
            <Card className="h-full border-2 border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-primary">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  To deliver exceptional steel solutions through cutting-edge technology, superior craftsmanship, and unwavering client focus, ensuring every project is built with precision, safety, and integrity.
                </p>
              </CardContent>
            </Card>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
}
