
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';
import images from '@/app/lib/placeholder-images.json';

export function Portfolio() {
  const { references } = companyData.pages;
  const projectImages = images.portfolio;

  const projectsData = [
    { ...references.projects[0], image: projectImages.utec },
    { ...references.projects[1], image: projectImages['star-good'] },
    { ...references.projects[2], image: projectImages.cfce },
    { ...references.projects[3], image: projectImages['condor-logistics'] },
    { ...references.projects[4], image: projectImages.softal },
    { ...references.projects[5], image: projectImages['duct-piping'] },
  ];

  return (
    <section id="portfolio" className="bg-background">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">{references.title}</h2>
        </AnimatedWrapper>
        <AnimatedWrapper animation="fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <div key={index} className="group">
                <Card className="overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <Image
                        src={project.image.src}
                        alt={project.name}
                        width={project.image.width}
                        height={project.image.height}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={project.image.aiHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="font-headline text-lg font-semibold text-white">
                          {project.name}
                        </h3>
                        {project.location && <p className='text-sm text-gray-300'>{project.location}</p>}
                      </div>
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
