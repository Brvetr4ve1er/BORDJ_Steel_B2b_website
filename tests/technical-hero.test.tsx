// @vitest-environment jsdom
/**
 * The contract of the shared hero band, pinned before it gets refactored.
 *
 * WHY THIS FILE EXISTS. `TechnicalHero` is the opening band of most routes on
 * this site, and the rest of the suite is config-integrity tests: a change that
 * made this component throw, dropped its `<h1>`, or swallowed the stat strip
 * would have left every one of those tests green and every page blank. These are
 * the assertions a refactor has to keep true.
 *
 * WHAT IS ASSERTED, AND WHY EACH ONE. The component has four decisions in it,
 * and every one has a documented past failure behind it:
 *
 *  - `media` set vs not set. Passing a photograph swaps the ground and *nothing
 *    else*; the component's own comment promises "a page can gain or lose a
 *    photograph without any of its content moving". That promise is only worth
 *    something if something checks it, so each branch asserts the same copy.
 *  - the stat strip at 2, 3 and 4 cells. The cells used to be 46% wide, which
 *    hid the third one entirely on a phone — a three-stat strip read as a
 *    two-stat strip. Cell *count* is the invariant that caught it.
 *  - exactly one `<h1>`. Three product pages each had their own hero markup
 *    before this component existed. A refactor that reintroduces a heading, or
 *    promotes the eyebrow, breaks the document outline silently.
 *  - the `subtitle` ReactNode. Galvanisation passes block-level client copy,
 *    which is why the subtitle is a `<div>` and not a `<p>`: nested `<p>` is
 *    invalid, the browser auto-closes it, and it surfaces as a hydration
 *    mismatch rather than as anything legible.
 *
 * Values in the fixtures are deliberately synthetic. The real stat values are
 * the capacity figures the client has not reconciled; this component formats
 * them and must never compute them, so there is nothing to gain from putting
 * the live numbers here and something to lose if a test ever looked like their
 * source of truth.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import './support/dom-env';
import { TechnicalHero } from '@/components/sections/technical-hero';

afterEach(cleanup);

/** The drawn ground: `HeroMotifArt`'s sheet is the only 1200x520 svg here. */
const MOTIF_SELECTOR = 'svg[viewBox="0 0 1200 520"]';

/** `n` synthetic stat cells — see the note on fixture values above. */
function statsOf(n: number): Array<{ label: string; value: string; note?: string }> {
  return Array.from({ length: n }, (_, i) => ({
    label: `Repère ${i + 1}`,
    value: `${i + 1} u`,
  }));
}

describe('TechnicalHero — copy block', () => {
  it('renders the eyebrow, the title and the subtitle', () => {
    render(
      <TechnicalHero
        eyebrow="NOTRE HISTOIRE"
        title="BORDJ STEEL"
        subtitle="Une ligne de sous-titre."
        motif="datum"
      />,
    );

    expect(screen.getByText('NOTRE HISTOIRE')).toBeInTheDocument();
    expect(screen.getByText('BORDJ STEEL')).toBeInTheDocument();
    expect(screen.getByText('Une ligne de sous-titre.')).toBeInTheDocument();
  });

  it('puts the title in the one and only h1', () => {
    render(
      <TechnicalHero eyebrow="EYEBROW" title="LE TITRE" subtitle="Sous-titre." motif="portal" />,
    );

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('LE TITRE');
  });

  it('accepts block-level subtitle copy without adding a second h1', () => {
    // The galvanisation hero passes three paragraphs of verbatim client copy.
    render(
      <TechnicalHero
        eyebrow="GALVANISATION"
        title="GALVANISATION À CHAUD"
        subtitle={
          <>
            <p>Première ligne de la notice.</p>
            <p>Seconde ligne de la notice.</p>
          </>
        }
        motif="bath"
      />,
    );

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByText('Première ligne de la notice.')).toBeInTheDocument();
    expect(screen.getByText('Seconde ligne de la notice.')).toBeInTheDocument();
  });

  it('renders the readout when one is supplied', () => {
    // The gallery hero derives its readout from the data it holds, rather than
    // from a number somebody maintains by hand.
    render(
      <TechnicalHero
        eyebrow="GALERIE"
        title="GALERIE"
        subtitle="Sous-titre."
        motif="frames"
        readout="12 VUES · 3 CATÉGORIES"
      />,
    );
    expect(screen.getByText('12 VUES · 3 CATÉGORIES')).toBeInTheDocument();
  });

  it('renders no readout when none is supplied', () => {
    const { container } = render(
      <TechnicalHero eyebrow="GALERIE" title="GALERIE" subtitle="Sous." motif="frames" />,
    );
    expect(container.textContent).not.toContain('VUES');
  });
});

describe('TechnicalHero — ground', () => {
  it('draws the motif sheet when no media is supplied', () => {
    const { container } = render(
      <TechnicalHero eyebrow="CONTACT" title="CONTACT" subtitle="Sous-titre." motif="datum" />,
    );

    expect(container.querySelector(MOTIF_SELECTOR)).not.toBeNull();
    // No photograph, and therefore no <img> at all: the drawn band is pure
    // markup and must not request a file.
    expect(container.querySelector('img')).toBeNull();
  });

  it('swaps the drawing for the photograph when media is supplied', () => {
    const { container } = render(
      <TechnicalHero
        eyebrow="CHARPENTE"
        title="CHARPENTE MÉTALLIQUE"
        subtitle="Sous-titre."
        motif="portal"
        media={{ src: '/media/atelier.webp', alt: 'Atelier de charpente' }}
      />,
    );

    expect(screen.getByAltText('Atelier de charpente')).toBeInTheDocument();
    // Both grounds rendering at once would stack a drawing over a photograph.
    expect(container.querySelector(MOTIF_SELECTOR)).toBeNull();
  });

  it('keeps the whole copy block identical across both grounds', () => {
    // The additive-media promise, asserted: same eyebrow, same h1, same
    // subtitle, same stat cells, whether or not a photograph is behind them.
    const copy = {
      eyebrow: 'PANNEAUX SANDWICH',
      title: 'PANNEAUX SANDWICH',
      subtitle: 'Sous-titre identique.',
      motif: 'panel' as const,
      stats: statsOf(3),
    };

    const drawn = render(<TechnicalHero {...copy} />);
    const drawnText = drawn.container.textContent;
    cleanup();

    const shot = render(
      <TechnicalHero {...copy} media={{ src: '/media/ligne.webp', alt: 'Ligne de production' }} />,
    );

    expect(shot.container.textContent).toBe(drawnText);
  });

  it('honours the strong scrim for a bright photograph', () => {
    // The sandwich-panel hall is white-walled: at the normal scrim the white
    // headline sat on the same luminance as the wall and disappeared.
    const { container } = render(
      <TechnicalHero
        eyebrow="PANNEAUX"
        title="PANNEAUX"
        subtitle="Sous."
        motif="panel"
        media={{ src: '/media/hall.webp', alt: 'Hall de production', scrim: 'strong' }}
      />,
    );

    expect(container.querySelector('.bg-black\\/70')).not.toBeNull();
    expect(container.querySelector('.bg-black\\/55')).toBeNull();
  });

  it('mounts the ambient loop over the still when one is configured', async () => {
    const { container } = render(
      <TechnicalHero
        eyebrow="CHAUDRONNERIE"
        title="CHAUDRONNERIE"
        subtitle="Sous."
        motif="vessel"
        media={{
          src: '/media/cuve.webp',
          alt: 'Cuve en cours de roulage',
          loop: '/media/loops/cuve.mp4',
        }}
      />,
    );

    // The still stays in the document: it is the LCP element and the fallback
    // for every visitor the loop declines to serve.
    expect(screen.getByAltText('Cuve en cours de roulage')).toBeInTheDocument();
    await waitFor(() => expect(container.querySelector('video')).not.toBeNull());
  });

  it('renders no video when no loop is configured', () => {
    const { container } = render(
      <TechnicalHero
        eyebrow="CHAUDRONNERIE"
        title="CHAUDRONNERIE"
        subtitle="Sous."
        motif="vessel"
        media={{ src: '/media/cuve.webp', alt: 'Cuve' }}
      />,
    );

    expect(container.querySelector('video')).toBeNull();
  });
});

describe('TechnicalHero — stat strip', () => {
  it('renders no strip at all when no stats are passed', () => {
    const { container } = render(
      <TechnicalHero eyebrow="CONTACT" title="CONTACT" subtitle="Sous." motif="datum" />,
    );
    expect(container.querySelector('dl')).toBeNull();
  });

  it('renders no strip for an empty stats array', () => {
    // `stats && stats.length > 0` also drives the band's height; an empty array
    // reserving 86dvh and a 28-unit footer for nothing is the failure here.
    const { container } = render(
      <TechnicalHero eyebrow="CONTACT" title="CONTACT" subtitle="Sous." motif="datum" stats={[]} />,
    );
    expect(container.querySelector('dl')).toBeNull();
  });

  it.each([2, 3, 4])('renders one cell per stat for a strip of %i', (count) => {
    const stats = statsOf(count);
    const { container } = render(
      <TechnicalHero
        eyebrow="PRODUIT"
        title="PRODUIT"
        subtitle="Sous."
        motif="portal"
        stats={stats}
      />,
    );

    const strip = container.querySelector('dl');
    expect(strip).not.toBeNull();
    // One cell per stat — the assertion that catches a cell scrolled out of
    // sight on a phone, or a slice/filter creeping into the map.
    expect(strip?.querySelectorAll(':scope > div')).toHaveLength(count);
    expect(strip?.querySelectorAll('dt')).toHaveLength(count);
    expect(strip?.querySelectorAll('dd')).toHaveLength(count);

    for (const stat of stats) {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByText(stat.value)).toBeInTheDocument();
    }
  });

  it('renders a cell note when there is one, and no empty paragraph when there is not', () => {
    const { container } = render(
      <TechnicalHero
        eyebrow="PRODUIT"
        title="PRODUIT"
        subtitle="Sous."
        motif="portal"
        stats={[
          { label: 'Repère 1', value: '1 u', note: 'Sur deux appuis' },
          { label: 'Repère 2', value: '2 u' },
        ]}
      />,
    );

    expect(screen.getByText('Sur deux appuis')).toBeInTheDocument();
    expect(container.querySelectorAll('dl p')).toHaveLength(1);
  });
});

describe('TechnicalHero — actions slot', () => {
  it('renders the actions it is given', () => {
    render(
      <TechnicalHero
        eyebrow="CONTACT"
        title="CONTACT"
        subtitle="Sous."
        motif="datum"
        actions={
          <>
            <a href="/contact">Demander un devis</a>
            <a href="/products">Voir les produits</a>
          </>
        }
      />,
    );

    expect(screen.getByRole('link', { name: 'Demander un devis' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Voir les produits' })).toBeInTheDocument();
  });

  it('renders no action row when the slot is empty', () => {
    // The row carries `mt-9` and a gap, so rendering it empty would leave a
    // band of dead space under the subtitle on every page that passes no
    // actions. Asserting on the wrapper, not just on the absence of links,
    // because an empty wrapper is invisible to a role query and still occupies
    // the page.
    const { container } = render(
      <TechnicalHero eyebrow="CONTACT" title="CONTACT" subtitle="Sous." motif="datum" />,
    );

    expect(container.querySelector('.mt-9')).toBeNull();
    expect(screen.queryByRole('link')).toBeNull();
  });
});
