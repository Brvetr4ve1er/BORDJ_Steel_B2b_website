/**
 * The browser APIs jsdom does not implement, stubbed for the render suites.
 *
 * NOT a global `setupFiles`: this would also load into the four
 * node-environment data suites, which have no `document` to patch. The two
 * `*.test.tsx` files import it directly instead — and because the filename does
 * not match the `include` glob, vitest never collects it as a suite.
 *
 * WHAT IS *NOT* MOCKED, deliberately. `next/image` renders unmocked in jsdom
 * (it emits a plain `<img>`, so `getByAltText` finds it) and mocking it would
 * hide exactly the kind of regression these tests exist to catch — a missing
 * `alt`, a dropped `src`. `next/font` and `next/link` are not imported by either
 * component under test, so nothing stands in for them either. Add a mock here
 * only when a real API is genuinely absent from jsdom, as the three below are.
 */
import '@testing-library/jest-dom/vitest';

/**
 * `AnimatedWrapper` reveals its children on intersection. jsdom ships no
 * observer at all, so without this every hero render throws from a `useEffect`.
 *
 * It reports an immediate intersection rather than never firing, which puts the
 * copy in its revealed state — the state a visitor reads, and the only one
 * worth asserting against.
 */
class ImmediateIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element): void {
    this.callback([{ isIntersecting: true, target } as IntersectionObserverEntry], this);
  }

  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

globalThis.IntersectionObserver =
  ImmediateIntersectionObserver as unknown as typeof IntersectionObserver;

/**
 * `VideoLoop` gates on `prefers-reduced-motion`, viewport width and
 * `saveData` before requesting a byte. jsdom has no `matchMedia`, and the
 * component reads it unconditionally. Every query answers "no match", which is
 * the permissive branch — the one where the loop actually mounts and can
 * therefore be asserted on.
 */
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

/**
 * jsdom has no media pipeline, so `play()` throws "Not implemented" and prints
 * it over the reporter output on every hero rendered with a loop. `VideoLoop`
 * handles a refused play correctly already — it just stays hidden — so this
 * resolves instead, which exercises the branch where the clip is accepted.
 */
HTMLMediaElement.prototype.play = () => Promise.resolve();
