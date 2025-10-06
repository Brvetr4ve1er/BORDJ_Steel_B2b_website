import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/hero').then(mod => mod.Hero));
const VisionMission = dynamic(() => import('@/components/vision-mission').then(mod => mod.VisionMission));
const Facilities = dynamic(() => import('@/components/facilities').then(mod => mod.Facilities));
const Portfolio = dynamic(() => import('@/components/portfolio').then(mod => mod.Portfolio));
const Certifications = dynamic(() => import('@/components/certifications').then(mod => mod.Certifications));
const Clients = dynamic(() => import('@/components/clients').then(mod => mod.Clients));
const Contact = dynamic(() => import('@/components/contact').then(mod => mod.Contact));

export function HomePage() {
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
