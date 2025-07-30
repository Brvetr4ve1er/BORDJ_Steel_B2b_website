import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { VisionMission } from '@/components/vision-mission';
import { Facilities } from '@/components/facilities';
import { Portfolio } from '@/components/portfolio';
import { Certifications } from '@/components/certifications';
import { Clients } from '@/components/clients';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <VisionMission />
        <Facilities />
        <Portfolio />
        <Certifications />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
