import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { KenBurns } from '@/components/ui/ken-burns';
import { channelUrl, companyVideos } from '@/config/videos-data';
import { VideoFacade } from './VideoFacade';

/**
 * /media-center/videos.
 *
 * Replaces the "Contenu à venir" placeholder with the company's actual video
 * content. The channel currently holds one video, so this page shows one video —
 * see the ownership note in `src/config/videos-data.ts` for why a second,
 * similar-looking clip is deliberately not listed.
 */
const HERO = {
  src: '/media/1581091226825-0596e30c.webp',
  alt: 'Production industrielle en acier',
  aiHint: 'steel industrial production',
};

export function VideosPageContent() {
  const count = companyVideos.length;

  return (
    <>
      <section className="relative flex h-[60dvh] w-full items-center justify-center overflow-hidden p-0 text-white">
        <KenBurns variant="right" className="absolute inset-0 z-0">
          <Image src={HERO.src} alt={HERO.alt} fill className="object-cover" priority data-ai-hint={HERO.aiHint} />
        </KenBurns>
        <div className="absolute inset-0 z-10 bg-black/60" />
        <div className="container relative z-20 mx-auto px-4 text-center">
          <AnimatedWrapper animation="zoom-in">
            <h1 className="font-headline text-6xl font-bold uppercase leading-tight tracking-tighter text-white md:text-8xl md:leading-tight">
              Vidéos
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-200 md:text-2xl">
              Découvrez nos projets en vidéo.
            </p>
          </AnimatedWrapper>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-1">
            {companyVideos.map((video, i) => (
              <AnimatedWrapper key={video.id} animation="fade-in-stagger" staggerIndex={i}>
                <article className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                  {/* 16:9 box the facade fills absolutely, so the poster and the
                      iframe that replaces it occupy exactly the same space and
                      pressing play cannot shift the layout. */}
                  <div className="relative aspect-video w-full overflow-hidden bg-secondary">
                    <VideoFacade id={video.id} title={video.title} poster={video.poster} />
                  </div>
                  <div className="p-6 md:p-8">
                    <h2 className="font-headline text-2xl font-bold text-primary">{video.title}</h2>
                    <p className="mt-2 text-muted-foreground">{video.description}</p>
                    <p className="mt-4 text-sm uppercase tracking-widest text-muted-foreground/80">
                      Publiée le{' '}
                      {new Date(video.published).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </article>
              </AnimatedWrapper>
            ))}
          </div>

          <AnimatedWrapper animation="fade-in">
            <p className="mt-12 text-center text-muted-foreground">
              {count === 1
                ? 'Une vidéo est actuellement publiée sur notre chaîne.'
                : `${count} vidéos sont actuellement publiées sur notre chaîne.`}{' '}
              <a
                href={channelUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 font-semibold text-accent underline-offset-4 hover:underline"
              >
                Voir la chaîne YouTube
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </p>
          </AnimatedWrapper>
        </div>
      </section>
    </>
  );
}
