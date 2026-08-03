
import { AnimatedWrapper } from '@/components/animated-wrapper';
import Image from 'next/image';
import { companyData, getProjectImage } from '@/config/company-data';
import { Card } from '@/components/ui/card';
import { KenBurns } from '@/components/ui/ken-burns';
import { Layers, Weight, MapPin } from 'lucide-react';
import { AggregateStatsStrip } from '@/components/sections/references/AggregateStatsStrip';

export function ReferencesPageContent() {
  const heroImage = {
    src: "/media/5307e6787500b6efff734990a417-37a72221.webp",
    alt: "Structure en acier en construction",
    aiHint: "steel structure"
  }

  // Images are resolved from each project's stable `imageKey`, never from a
  // slug derived off the display name — renaming a project no longer swaps in a
  // grey placeholder, and the homepage portfolio uses this exact same helper.
  const projectsData = companyData.pages.references.projects.map(project => ({
    ...project,
    image: getProjectImage(project.imageKey),
  }));

  return (
    <>
      <section className="relative h-[60vh] w-full flex items-center justify-center text-white overflow-hidden p-0">
        <KenBurns variant="left" className="absolute inset-0 z-0">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.aiHint}
          />
        </KenBurns>
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <AnimatedWrapper animation="zoom-in">
            <h1 className="font-headline text-6xl md:text-8xl leading-tight md:leading-tight lg:leading-tight font-bold tracking-tighter uppercase text-white">
              Nos Références
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 mx-auto">
              La confiance de nos clients, la fierté de nos réalisations.
            </p>
          </AnimatedWrapper>
        </div>
      </section>

      <AggregateStatsStrip />

      <section className="bg-secondary">
        <div className="container mx-auto px-4 space-y-16">
          {projectsData.map((project, index) => (
            <AnimatedWrapper key={project.imageKey} animation="fade-in-stagger" staggerIndex={index}>
              <Card className="overflow-hidden shadow-lg border-none">
                <div className="grid lg:grid-cols-2">
                  <div className="relative aspect-video lg:aspect-[4/3] group">
                    <Image
                      src={project.image.src}
                      alt={project.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={project.image.aiHint}
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-primary mb-2">{project.name}</h2>
                    {project.location && (
                      <p className="flex items-center text-md font-semibold text-accent mb-4">
                        <MapPin className="mr-2 h-5 w-5" />
                        {project.location}
                      </p>
                    )}
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">{project.description}</p>

                    <div className="space-y-3 border-t pt-6">
                        {project.details?.tonnage && (
                            <div className="flex items-center gap-3">
                                <Weight className="h-6 w-6 text-primary/70" />
                                <span className="font-semibold text-lg text-primary">Tonnage :</span>
                                <span className="text-lg text-muted-foreground">{project.details.tonnage}</span>
                            </div>
                        )}
                        {project.details?.couverture && (
                            <div className="flex items-center gap-3">
                                <Layers className="h-6 w-6 text-primary/70" />
                                <span className="font-semibold text-lg text-primary">Couverture :</span>
                                <span className="text-lg text-muted-foreground">{project.details.couverture}</span>
                            </div>
                        )}
                        {project.details?.bardage && (
                            <div className="flex items-center gap-3">
                                <Layers className="h-6 w-6 text-primary/70" />
                                <span className="font-semibold text-lg text-primary">Bardage :</span>
                                <span className="text-lg text-muted-foreground">{project.details.bardage}</span>
                            </div>
                        )}
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedWrapper>
          ))}
        </div>
      </section>
    </>
  );
}
