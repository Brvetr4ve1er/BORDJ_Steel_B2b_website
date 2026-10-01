"use client";

import React from 'react';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { AnimatedNumber } from '@/components/animated-number';

/**
 * "Notre capital humain" — the headcount block that closes /about/history.
 *
 * It used to live inside `HistoryTimeline`, hanging off the bottom of the
 * timeline on its own connector and dot. That read as a claim the content does
 * not make: a dot on a dated axis says "this happened in a year", and 700
 * employees is a standing fact, not a milestone. Lifting it out of the timeline
 * is the whole point of this file — it is now a sibling section, after the
 * history, with no connector implying otherwise.
 *
 * Client component for `AnimatedNumber` alone; the timeline it was extracted
 * from is a server component again as a result.
 */
export function HumanCapital() {
  return (
    <div className="container mx-auto px-6">
      <AnimatedWrapper animation="fade-in">
        <div className="mx-auto max-w-4xl rounded-xl border border-border/60 bg-card p-8 text-center shadow-sm md:p-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Capital humain
          </p>
          <h2 className="mt-4 font-headline text-3xl font-bold uppercase tracking-tight text-primary md:text-4xl">
            Notre capital humain
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <span aria-hidden="true" className="h-px w-12 bg-accent" />
            <span className="font-headline text-5xl font-bold tabular-nums text-accent md:text-6xl">
              <AnimatedNumber value={700} />
            </span>
            <span aria-hidden="true" className="h-px w-12 bg-accent" />
          </div>
          <p className="mt-4 text-lg text-muted-foreground">
            collaborateurs
          </p>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground">
            BordjSteel s&apos;appuie sur une équipe compétente, engagée et passionnée par
            l&apos;excellence industrielle. Chaque membre contribue au succès de l&apos;entreprise à
            travers son savoir-faire, sa rigueur et son professionnalisme.
          </p>
        </div>
      </AnimatedWrapper>
    </div>
  );
}
