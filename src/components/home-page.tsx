
import { Navbar } from '@/components/navbar';
import { HomePageHero } from '@/components/home-page-hero';
import { VisionMission } from '@/components/vision-mission';
import { Facilities } from '@/components/facilities';
import { Portfolio } from '@/components/portfolio';
import { Certifications } from '@/components/certifications';
import { Clients } from '@/components/clients';
import { HomePageContactForm } from '@/components/contact/home-page-contact-form';
import { Footer } from '@/components/footer';

export function HomePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main className="flex-1">
        <HomePageHero />
        <VisionMission />
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
