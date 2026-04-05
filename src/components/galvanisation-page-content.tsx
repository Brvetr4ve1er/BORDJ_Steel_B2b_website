/**
 * Main Content Component for the Galvanisation Page
 *
 * This component acts as an orchestrator, dynamically importing and rendering the
 * various sections that make up the galvanisation product page. By using Next.js
 * dynamic imports, we ensure that the initial JavaScript bundle is minimized,
 * as sections are loaded on demand.
 *
 * Note: The "use client" directive has been removed from this top-level component
 * to allow it to be rendered as a Server Component.
 */
import React from 'react';
import dynamic from 'next/dynamic';

const HeroSection = dynamic(() => import('@/components/pages/galvanisation/hero-section').then(mod => mod.HeroSection));
const ProcessTimeline = dynamic(() => import('@/components/pages/galvanisation/process-timeline').then(mod => mod.ProcessTimeline));
const BenefitsSection = dynamic(() => import('@/components/pages/galvanisation/benefits-section').then(mod => mod.BenefitsSection));
const HighlightSection = dynamic(() => import('@/components/pages/galvanisation/highlight-section').then(mod => mod.HighlightSection));
const CTASection = dynamic(() => import('@/components/pages/galvanisation/cta-section').then(mod => mod.CTASection));

export function GalvanisationPageContent() {
  return (
    <div className="text-foreground">
      <HeroSection />
      <ProcessTimeline />
      <BenefitsSection />
      <HighlightSection />
      <CTASection />
    </div>
  );
}