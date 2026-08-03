"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * An ambient video loop layered over the still it was generated from.
 *
 * THE STILL IS NOT REPLACED — it is rendered by the caller as a normal
 * `next/image`, stays the Largest Contentful Paint candidate, and remains what a
 * crawler, a no-JS visitor, or anyone this component declines to serve actually
 * sees. The video fades in on top only once it can play. Nothing about the page
 * regresses if it never loads.
 *
 * WHEN THE VIDEO IS DECLINED — all decided before a single byte is requested,
 * which is why this gates on mount rather than shipping `<video autoplay>`:
 *
 *   - `prefers-reduced-motion: reduce` — an autoplaying loop cannot be stopped by
 *     CSS, so the only honest way to respect the setting is not to load it.
 *   - viewport < 768px — matches the KenBurns gating. A ~460 KB loop is not worth
 *     a phone's data or battery for motion that is barely legible at that size.
 *   - `navigator.connection.saveData` — an explicit user request to conserve.
 *
 * Loops are produced by `scripts/build-video-loops.mjs` (forward+reverse so the
 * seam is exact; H.264 only, since VP9 measured LARGER on this footage).
 */
export function VideoLoop({
  src,
  className,
  poster,
}: {
  /** Loop under /media/loops. Silent, seamless, already optimised. */
  src: string;
  className?: string;
  /** Optional first frame. The caller's own <Image> is usually the better still. */
  poster?: string;
}) {
  const [allowed, setAllowed] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 767px)').matches) return;

    // `connection` is not in every lib.dom; read it without asserting a shape.
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData === true) return;

    setAllowed(true);
  }, []);

  // Autoplay can still be refused (power-saving mode, platform policy). If the
  // promise rejects, stay hidden and leave the still showing rather than
  // presenting a frozen first frame as though it were the design.
  useEffect(() => {
    if (!allowed) return;
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    const attempt = el.play();
    if (attempt && typeof attempt.then === 'function') {
      attempt.then(
        () => { if (!cancelled) setReady(true); },
        () => { /* refused — the still stands in, which is the correct fallback */ },
      );
    } else {
      setReady(true);
    }
    return () => { cancelled = true; };
  }, [allowed]);

  if (!allowed) return null;

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      // Not `autoPlay`: play() is called explicitly above so a refusal is
      // observable and can be handled, instead of silently freezing on frame 1.
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      className={`${className ?? ''} transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}
