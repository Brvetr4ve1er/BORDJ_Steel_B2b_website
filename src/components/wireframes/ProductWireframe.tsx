"use client";

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useDrawIn } from './use-draw-in';

interface ProductWireframeProps {
  /** SVG coordinate system, e.g. "0 0 800 480". */
  viewBox: string;
  /** Changing this value replays the draw-in with the current geometry. */
  redrawKey?: unknown;
  /** Accessible name / short caption shown under the drawing. */
  caption: string;
  /** Optional eyebrow + heading shown above the drawing. */
  eyebrow?: string;
  title?: string;
  /** Interactive controls (buttons) rendered above the drawing. */
  controls?: React.ReactNode;
  /** The SVG geometry (a figure component). */
  children: React.ReactNode;
  className?: string;
}

/**
 * Presentational shell for a technical product wireframe: a reserved, responsive
 * drawing surface with a faint blueprint grid, an optional controls row, and a
 * caption. It owns the anime.js draw-in lifecycle (via useDrawIn) but no
 * product-specific geometry — that lives in the figure passed as children.
 */
export function ProductWireframe({
  viewBox,
  redrawKey,
  caption,
  eyebrow,
  title,
  controls,
  children,
  className,
}: ProductWireframeProps) {
  const ref = useDrawIn<SVGSVGElement>(redrawKey);
  const [, w, h] = viewBox.split(' ').map(Number);
  const aspect = w && h ? `${w} / ${h}` : '16 / 9';

  return (
    <figure className={cn('mx-auto w-full max-w-4xl', className)}>
      {(eyebrow || title) && (
        <div className="mb-6 text-center">
          {eyebrow && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
          )}
          {title && <h3 className="font-headline text-3xl font-bold text-primary md:text-4xl">{title}</h3>}
        </div>
      )}

      {controls && <div className="mb-6 flex flex-wrap items-center justify-center gap-2">{controls}</div>}

      <div
        className="relative overflow-hidden rounded-xl border border-border/70 bg-white shadow-sm"
        style={{ aspectRatio: aspect }}
      >
        {/* Faint blueprint grid behind the drawing. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--border)/0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)/0.5) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <svg
          ref={ref}
          viewBox={viewBox}
          role="img"
          aria-label={caption}
          preserveAspectRatio="xMidYMid meet"
          className="relative h-full w-full"
        >
          {children}
        </svg>
      </div>

      <figcaption className="mt-4 text-center text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

/** A segmented toggle button for wireframe controls (keyboard-accessible). */
export function WireframeToggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-md border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        active
          ? 'border-accent bg-accent text-accent-foreground shadow-sm'
          : 'border-border bg-white text-foreground hover:border-accent/50 hover:text-accent',
      )}
    >
      {children}
    </button>
  );
}
