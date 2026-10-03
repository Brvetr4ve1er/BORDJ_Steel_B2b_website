

import { AnimatedWrapper } from '@/components/animated-wrapper';
import { TechnicalHero } from '@/components/sections/technical-hero';
import { ActivitiesSection } from '@/components/sections/history/ActivitiesSection';
import { HistoryTimeline } from '@/components/sections/HistoryTimeline';
import { HumanCapital } from '@/components/sections/HumanCapital';
import { TeamsSection } from '@/components/sections/history/TeamsSection';
import { CertificationsSection } from '@/components/sections/history/CertificationsSection';


export function HistoryPageContent() {

  return (
    <>
      <TechnicalHero
        eyebrow="Depuis 2012"
        title="Notre Histoire"
        subtitle={"Forger l'avenir de la construction métallique en Algérie, un projet à la fois."}
        motif="portal"
      />
      <ActivitiesSection />
      {/* The drafting grid is the same ground the /contact department figures
          stand on (.wf-ground in globals.css), so the two technical sections
          read as one system rather than two near-misses. */}
      <section className="relative overflow-hidden bg-secondary py-20">
        <div aria-hidden="true" className="wf-ground absolute inset-0" />
        <div className="relative">
          <HistoryTimeline />
        </div>
      </section>
      <section className="bg-background py-20">
        <HumanCapital />
      </section>
      <TeamsSection />
      <CertificationsSection />
    </>
  );
}

    