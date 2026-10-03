
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { TechnicalHero } from '@/components/sections/technical-hero';
import dynamic from 'next/dynamic';
import { FactoryLocationCard } from '@/components/sections/contact/FactoryLocationCard';

const ContactInfo = dynamic(() => import('@/components/contact-info').then(mod => mod.ContactInfo));

export function ContactPageContent() {

  return (
    <>
      <TechnicalHero
        eyebrow="Bordj Bou Arréridj — Algérie"
        title="Contactez-Nous"
        subtitle={"Notre équipe est prête à vous aider. Prenons contact."}
        motif="datum"
      />
      <section className="py-16 md:py-24 lg:py-32 bg-secondary">
        <ContactInfo />
      </section>
      <FactoryLocationCard />
    </>
  );
}
