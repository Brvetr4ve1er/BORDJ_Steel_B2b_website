
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/navbar').then(mod => mod.Navbar));
const HomePageHero = dynamic(() => import('@/components/home-page-hero').then(mod => mod.HomePageHero));
const VisionMission = dynamic(() => import('@/components/vision-mission').then(mod => mod.VisionMission));
const Facilities = dynamic(() => import('@/components/sections/Facilities').then(mod => mod.Facilities));
const Portfolio = dynamic(() => import('@/components/portfolio').then(mod => mod.Portfolio));
const Certifications = dynamic(() => import('@/components/sections/Certifications').then(mod => mod.Certifications));
const Clients = dynamic(() => import('@/components/sections/Clients').then(mod => mod.Clients));
const HomePageContactForm = dynamic(() => import('@/components/contact/home-page-contact-form').then(mod => mod.HomePageContactForm));
const Footer = dynamic(() => import('@/components/footer').then(mod => mod.Footer));

export function HomePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main id="main" className="flex-1">
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
