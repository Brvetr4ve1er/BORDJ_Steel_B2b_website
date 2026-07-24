"use client";

import { useEffect, useRef } from 'react';
import { animate, svg, stagger, utils, remove } from 'animejs';

/**
 * Drives the anime.js "draw-in" reveal for a technical wireframe SVG.
 *
 * Convention inside the SVG:
 *   .wf-line  -> stroke geometry (path/line/polyline/polygon/rect/circle/ellipse)
 *                that traces itself in via anime's `draw`.
 *   .wf-fade  -> labels / dimension callouts / fills that fade + rise in after the lines.
 *
 * Behaviour:
 *   - Traces in once when scrolled into view.
 *   - Re-traces whenever `redrawKey` changes AND the figure is already on screen
 *     (so toggling a control replays the drawing with the new geometry).
 *   - Honours `prefers-reduced-motion`: renders the final state instantly, no motion.
 *   - Server-rendered / no-JS: the SVG shows fully drawn (accessible by default);
 *     JS only "arms" it (hides, then animates) when motion is allowed.
 */
export function useDrawIn<T extends SVGSVGElement = SVGSVGElement>(redrawKey: unknown) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lines = el.querySelectorAll<SVGGeometryElement>('.wf-line');
    const fades = el.querySelectorAll<SVGElement>('.wf-fade');

    if (prefersReduced || lines.length === 0) {
      // Leave everything in its final, fully-drawn state.
      return;
    }

    // Arm: hide the geometry (draw 0) and the labels so they can trace/fade in.
    const drawables = svg.createDrawable(lines);
    utils.set(drawables, { draw: '0 0' });
    utils.set(fades, { opacity: 0, translateY: 6 });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      animate(drawables, {
        draw: '0 1',
        duration: 900,
        delay: stagger(60),
        ease: 'inOut(2)',
      });
      animate(fades, {
        opacity: [0, 1],
        translateY: [6, 0],
        duration: 450,
        delay: stagger(35, { start: 450 }),
        ease: 'out(2)',
      });
    };

    // Plays immediately if already intersecting when observed (handles a control
    // toggle while the figure is on screen), otherwise waits for scroll.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      remove(lines);
      remove(fades);
    };
  }, [redrawKey]);

  return ref;
}
