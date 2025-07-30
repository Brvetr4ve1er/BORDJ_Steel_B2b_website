import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedWrapper } from './animated-wrapper';

const projects = [
  { name: "Industrial Warehouse Complex", image: "https://placehold.co/400x300.png", aiHint: "industrial warehouse" },
  { name: "Multi-Storey Commercial Tower", image: "https://placehold.co/400x300.png", aiHint: "commercial building" },
  { name: "Airport Hangar Structure", image: "https://placehold.co/400x300.png", aiHint: "airport hangar" },
  { name: "Pedestrian Steel Bridge", image: "https://placehold.co/400x300.png", aiHint: "steel bridge" },
  { name: "Power Plant Structure", image: "https://placehold.co/400x300.png", aiHint: "power plant" },
  { name: "Sports Stadium Roof", image: "https://placehold.co/400x300.png", aiHint: "stadium roof" },
  { name: "Petrochemical Pipe Racks", image: "https://placehold.co/400x300.png", aiHint: "pipe rack" },
  { name: "Shopping Mall Framework", image: "https://placehold.co/400x300.png", aiHint: "shopping mall" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="bg-background">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">Project Portfolio</h2>
        </AnimatedWrapper>
        <AnimatedWrapper animation="fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group">
                <Card className="overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={project.image}
                        alt={project.name}
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={project.aiHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <h3 className="absolute bottom-0 left-0 p-4 font-headline text-lg font-semibold text-white">
                        {project.name}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
