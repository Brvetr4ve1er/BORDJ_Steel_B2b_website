
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/sections/Navbar').then(mod => mod.Navbar));
const HomePageHero = dynamic(() => import('@/components/sections/HomePageHero').then(mod => mod.HomePageHero));
const VisionMission = dynamic(() => import('@/components/sections/VisionMission').then(mod => mod.VisionMission));
const Facilities = dynamic(() => import('@/components/sections/Facilities').then(mod => mod.Facilities));
const Portfolio = dynamic(() => import('@/components/sections/Portfolio').then(mod => mod.Portfolio));
const Certifications = dynamic(() => import('@/components/sections/Certifications').then(mod => mod.Certifications));
const Clients = dynamic(() => import('@/components/sections/ClientLogos').then(mod => mod.Clients));
const HomePageContactForm = dynamic(() => import('@/components/sections/HomePageContactForm').then(mod => mod.HomePageContactForm));
const Footer = dynamic(() => import('@/components/sections/Footer').then(mod => mod.Footer));

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
