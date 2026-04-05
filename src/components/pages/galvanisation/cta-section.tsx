/**
 * Call To Action (CTA) Section Component for Galvanisation Page
 *
 * A simple, high-impact section prompting the user to take the next step,
 * such as filling out a contact form or downloading a brochure.
 */
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { galvanisationContent } from '@/config/galvanisation-data';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { DownloadButton } from '@/components/ui/download-button';

export function CTASection() {
    const { cta } = galvanisationContent;

    return (
      <section className="py-32 bg-background">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
            <AnimatedWrapper animation="zoom-in">
                <h2 className="font-headline text-4xl font-bold text-primary max-w-2xl mx-auto">
                    {cta.title}
                </h2>
                <div className="mt-8 flex justify-center flex-wrap gap-4">
                    <Button asChild size="lg" variant="destructive">
                        <a href={cta.form_url} className="flex items-center gap-2">
                            {cta.button_primary} <ArrowRight className="ml-2" />
                        </a>
                    </Button>
                    <DownloadButton text={cta.button_secondary} />
                </div>
            </AnimatedWrapper>
        </div>
      </section>
    );
}