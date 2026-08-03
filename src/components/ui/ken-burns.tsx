import type { ReactNode } from 'react';

/**
 * A slow, ambient drift for large feature photography — the "living image"
 * effect, done with a compositor transform rather than an animated image file.
 *
 * WHY NOT AN ANIMATED WEBP. Measured on this repo's own photography before
 * choosing. Encoding a 3s Ken-Burns move from `facilities.charpente` (a 67.7 KB
 * still) produced:
 *
 *     700x468 · 3s · 12fps  ->  472.8 KB   (7.0x the still)
 *     560x374 · 4s · 10fps  ->  203.9 KB   (3.0x)
 *     560x374 · 2s ·  8fps  ->  118.7 KB   (1.75x)
 *     480x321 · 2s ·  6fps  ->   68.1 KB   (1.0x, but below the card's own
 *                                           display resolution and visibly choppy)
 *
 * The reason is structural, not a tuning failure: animated WebP compresses by
 * storing inter-frame differences, and a pan/zoom changes every pixel of every
 * frame, so there is nothing to difference. Reaching parity with the still means
 * shipping a lower-resolution, lower-framerate image than the static one it
 * replaces. A CSS transform gives the same move for zero additional bytes, runs
 * on the compositor, and can actually honour reduced motion.
 *
 * (Animated WebP would still be right for *localised* motion — a weld spark,
 * drifting steam — where most of the frame is static. Producing that from a
 * still needs generative video, which is a separate, paid decision.)
 *
 * The keyframes live in `src/app/globals.css`, not in a <style> here: this
 * renders up to four times on the homepage and React 18 does not deduplicate
 * inline <style> (href/precedence hoisting is React 19), so an inline block
 * shipped eight identical copies per page — four in the HTML, four again in the
 * RSC payload.
 *
 * USAGE — the child is expected to be a `fill` image, and this element is the
 * positioned parent it fills. The wrapper is over-scaled by design, so a call
 * site MUST clip:
 *
 *     <div className="absolute inset-0 z-0 overflow-hidden">
 *       <KenBurns variant="in" className="absolute inset-0 z-0">
 *         <Image src={…} alt={…} fill className="object-cover" priority />
 *       </KenBurns>
 *       <div className="absolute inset-0 z-10 bg-black/50" />
 *     </div>
 *
 * Server component: no hooks, no client boundary, no JS shipped.
 */

export type KenBurnsVariant = 'in' | 'out' | 'left' | 'right';

/**
 * Four moves at four periods (26/31/35/29s). Both the direction and the period
 * vary on purpose: identical motion across a page reads as one mechanical loop,
 * and mismatched periods never visibly resynchronise.
 */
const VARIANT_CLASS: Record<KenBurnsVariant, string> = {
  in: 'kb-in',
  out: 'kb-out',
  left: 'kb-left',
  right: 'kb-right',
};

export function KenBurns({
  children,
  variant = 'in',
  className,
}: {
  children: ReactNode;
  variant?: KenBurnsVariant;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className={`kb ${VARIANT_CLASS[variant]} h-full w-full`}>{children}</div>
    </div>
  );
}
