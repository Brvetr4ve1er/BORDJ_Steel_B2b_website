import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedWrapper } from './animated-wrapper';

const facilitiesData = [
  {
    title: "Structural Steel Fabrication",
    description: "Our state-of-the-art facility is equipped with advanced machinery for precision cutting, bending, and assembling of structural steel components.",
    image: "https://placehold.co/600x400.png",
    aiHint: "steel fabrication"
  },
  {
    title: "Pre-Engineered Buildings",
    description: "We specialize in the design and manufacturing of pre-engineered steel buildings (PEBs) tailored to meet diverse industrial and commercial needs.",
    image: "https://placehold.co/600x400.png",
    aiHint: "engineered building"
  },
  {
    title: "Automated Blasting & Painting",
    description: "A fully automated blasting and painting line ensures superior surface preparation and coating application for long-lasting corrosion protection.",
    image: "https://placehold.co/600x400.png",
    aiHint: "industrial painting"
  },
  {
    title: "Quality Control & Testing",
    description: "Our dedicated QC department employs rigorous testing methods, including ultrasonic and radiographic testing, to guarantee the integrity of every weld and component.",
    image: "https://placehold.co/600x400.png",
    aiHint: "quality control"
  },
];

export function Facilities() {
  return (
    <section id="services" className="bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">Our Facilities</h2>
        </AnimatedWrapper>
        <div className="space-y-12">
          {facilitiesData.map((facility, index) => (
            <AnimatedWrapper key={index} animation="slide-up">
              <Card className="overflow-hidden shadow-xl transition-shadow hover:shadow-2xl">
                <CardContent className="p-0">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:w-1/2">
                      <Image
                        src={facility.image}
                        alt={facility.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                        data-ai-hint={facility.aiHint}
                      />
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                      <h3 className="font-headline text-2xl font-bold text-primary mb-4">{facility.title}</h3>
                      <p className="text-lg">{facility.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
