
import { AnimatedWrapper } from './animated-wrapper';
import { Button } from './ui/button';

export function Recruitment() {
  return (
    <section id="recruitment" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold mb-4">Rejoignez Notre Équipe</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8 text-primary-foreground/80">
            Nous sommes toujours à la recherche de talents passionnés pour renforcer nos équipes. Découvrez nos opportunités et contribuez à des projets d'envergure.
          </p>
          <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90 text-lg px-8 py-6">
            Voir les Postes Ouverts
          </Button>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
