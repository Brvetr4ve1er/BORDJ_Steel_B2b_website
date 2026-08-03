"use client";

import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

/**
 * A count-up that is already correct before any JavaScript runs.
 *
 * The hero previously used `AnimatedNumber`, which server-renders the literal
 * string "0" and only reaches the real figure after hydration plus an
 * IntersectionObserver. With JS disabled, blocked, or simply slow, the client's
 * homepage stated its production capacity as "0".
 *
 * This inverts that. The parent server-renders the FINAL formatted figure as
 * this component's children, so the number is right at first paint. The
 * count-up is then pure progressive enhancement — it is free to never happen.
 *
 * It also honours `prefers-reduced-motion`, which `AnimatedNumber` never
 * checked, and which is why `VisionMission` and `sections/StatsSection` still
 * animate for users who asked the OS not to.
 *
 * `locale` is a string rather than a formatter function on purpose: functions
 * cannot cross the server/client boundary. The resting text is captured from
 * the DOM the server produced and restored on both completion and teardown, so
 * the figure a visitor is left looking at is always the server's exact string —
 * any ICU difference between Node and the browser could only ever affect a
 * transient intermediate frame, never the value that comes to rest.
 */
export function HeroCountUp({
  value,
  locale = 'fr-FR',
  className,
  children,
}: {
  /** Final numeric value. Counts 0 → value. */
  value: number;
  /** BCP-47 tag used to format intermediate frames. */
  locale?: string;
  className?: string;
  /** The server-rendered final figure. Shown as-is until (and unless) JS animates. */
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Captured once: using `ref.current` inside the cleanup would read a
    // possibly-different node by the time it runs.
    const el = ref.current;
    if (!el) return;

    // Respect the OS setting: leave the server-rendered final figure alone.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // The resting text the server already painted. Restoring exactly this means
    // an interrupted animation can never strand a partial number on screen.
    const restingText = el.textContent ?? '';
    const format = new Intl.NumberFormat(locale);

    let controls: ReturnType<typeof animate> | null = null;
    let played = false;

    const play = () => {
      if (played) return;
      played = true;
      controls = animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        // Written straight to the DOM node rather than through setState: the
        // count ticks every frame and re-rendering ~120 times for a text-only
        // change is pure overhead.
        onUpdate(latest) {
          el.textContent = format.format(Math.round(latest));
        },
        onComplete() {
          el.textContent = restingText;
        },
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      controls?.stop();
      // Never leave a half-counted figure behind.
      el.textContent = restingText;
    };
  }, [value, locale]);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
