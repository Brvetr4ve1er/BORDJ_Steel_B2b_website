import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';

const clientsLogos = [
  { name: "Client 1", aiHint: "company logo" },
  { name: "Client 2", aiHint: "company logo" },
  { name: "Client 3", aiHint: "company logo" },
  { name: "Client 4", aiHint: "company logo" },
  { name: "Client 5", aiHint: "company logo" },
  { name: "Client 6", aiHint: "company logo" },
];

export function Clients() {
  return (
    <section id="clients" className="bg-background">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">Our Valued Clients</h2>
        </AnimatedWrapper>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clientsLogos.map((client, index) => (
            <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
              <div className="flex justify-center">
                <Image
                  src="https://placehold.co/150x80.png"
                  alt={client.name}
                  width={150}
                  height={80}
                  className="grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                  data-ai-hint={client.aiHint}
                />
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
