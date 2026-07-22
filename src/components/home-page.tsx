
// Static imports: every section below renders unconditionally on the homepage,
// so dynamic() boundaries only added chunk requests and delayed hydration of
// the above-the-fold navbar/hero without excluding any code.
import { Navbar } from '@/components/navbar';
import { HomePageHero } from '@/components/home-page-hero';
import { VisionMission } from '@/components/vision-mission';
import { StatsSection } from '@/components/sections/StatsSection';
import { Facilities } from '@/components/sections/Facilities';
import { Portfolio } from '@/components/portfolio';
import { Certifications } from '@/components/sections/Certifications';
import { Clients } from '@/components/sections/Clients';
import { HomePageContactForm } from '@/components/contact/home-page-contact-form';
import { Footer } from '@/components/footer';

export function HomePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main id="main" className="flex-1">
        <HomePageHero />
        <VisionMission />
        <StatsSection />
        <Facilities />
        <Portfolio />
        <Certifications />
        <Clients />
        <HomePageContactForm />
      </main>
      <Footer />
    </div>
  );
}
