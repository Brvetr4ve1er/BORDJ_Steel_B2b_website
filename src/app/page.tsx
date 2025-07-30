
"use client";

import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { VisionMission } from '@/components/vision-mission';
import { Facilities } from '@/components/facilities';
import { Portfolio } from '@/components/portfolio';
import { Certifications } from '@/components/certifications';
import { Clients } from '@/components/clients';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { useEffect } from 'react';
import { companyData } from '@/config/company-data';

export default function Home() {
  const { title, description } = companyData.siteMetadata;

  useEffect(() => {
    document.title = title;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [title, description]);

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
