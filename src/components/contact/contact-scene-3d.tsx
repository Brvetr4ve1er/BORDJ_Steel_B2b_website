"use client";

import * as React from 'react';

/**
 * The real-time 3D layer for the contact department cards.
 *
 * Imported from the Claude Design project "High-detail 3D animations section".
 * The scene geometry and animation live in `./bordj-3d.js`, unchanged from the
 * design; this file is only the React boundary around it.
 *
 * PROGRESSIVE ENHANCEMENT, AND THAT IS THE WHOLE DESIGN OF THIS FILE.
 * `DepartmentFigure` — the flat SVG drawing — stays mounted underneath and is
 * what the server renders. The canvas is an enhancement layered on top, and it
 * only ever fades in once the module has actually booted and drawn a frame. So:
 *
 *   - with JavaScript off, you get the SVG
 *   - before three.js finishes loading, you get the SVG
 *   - if the import fails or WebGL is unavailable, you keep the SVG
 *   - under `prefers-reduced-motion: reduce`, the canvas never mounts at all
 *   - on a save-data connection, same
 *
 * This mirrors how `VideoLoop` already behaves on this site: the static thing is
 * the real content, the moving thing is a bonus that declines politely.
 *
 * COST, STATED PLAINLY. three.js is ~600 KB before gzip. It is dynamically
 * imported here, so it is code-split out of the shared bundle and is fetched
 * only on /contact, only after mount, and only when the conditions above pass.
 * Nothing about the first paint of any other route changes.
 *
 * ONE WEBGL CONTEXT. Browsers cap live WebGL contexts and this page wants six
 * scenes. The module keeps a single renderer and blits into each card's own 2D
 * canvas, so six cards still cost one context. Each canvas is discovered by its
 * `data-scene` attribute, which is why this component only has to render the
 * element and let the module find it.
 */

/** Which of the design's two styles the page uses. See CONTACT_SCENE_STYLE. */
export type ContactSceneStyle = 'a' | 'b';

type Mod = {
  start: (fn: () => { motion: boolean; speed: number; edges: boolean }) => void;
  stop: () => void;
};

let modPromise: Promise<Mod> | null = null;
/** One import, one renderer, however many cards mount. */
function loadModule(): Promise<Mod> {
  if (!modPromise) {
    modPromise = import('./bordj-3d.js') as unknown as Promise<Mod>;
  }
  return modPromise;
}

/** How many canvases are currently mounted, so the loop stops with the last one. */
let mounted = 0;

function prefersReducedMotion(): boolean {
  if (typeof matchMedia !== 'function') return false;
  try {
    return matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function saveData(): boolean {
  try {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    return nav.connection?.saveData === true;
  } catch {
    return false;
  }
}

export function ContactScene3D({
  scene,
  style,
}: {
  scene: string;
  style: ContactSceneStyle;
}) {
  // Null until the client has decided it is allowed to run. Deliberately not a
  // `useState(prefersReducedMotion())` initialiser: that would differ between
  // the server render and the first client render and trip hydration.
  const [enabled, setEnabled] = React.useState(false);
  const [painted, setPainted] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (prefersReducedMotion() || saveData()) return;
    setEnabled(true);
  }, []);

  React.useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    mounted += 1;

    loadModule()
      .then((mod) => {
        if (cancelled) return;
        mod.start(() => ({ motion: true, speed: 1, edges: true }));
        // The module paints on the next animation frame; waiting two frames
        // before revealing avoids a flash of an empty canvas over the SVG.
        requestAnimationFrame(() => requestAnimationFrame(() => {
          if (!cancelled) setPainted(true);
        }));
      })
      .catch((err) => {
        // Keep the SVG. A failed enhancement is not a failed page.
        console.error('[contact-3d] disabled:', err);
      });

    return () => {
      cancelled = true;
      mounted -= 1;
      if (mounted === 0) {
        modPromise?.then((mod) => mod.stop()).catch(() => {});
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      data-scene={scene}
      data-style={style}
      aria-hidden="true"
      className={`absolute inset-0 block h-full w-full transition-opacity duration-700 ${
        painted ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
