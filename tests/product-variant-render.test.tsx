// @vitest-environment jsdom
/**
 * Renders the data-driven product renderer, one section `type` at a time.
 *
 * WHY THIS FILE EXISTS. `product-tables.test.ts` already guards the *data*:
 * spans are integers, they sum to the body width, every image has an alt. What
 * nothing guarded is the step after that — whether `ProductVariantDetails`
 * turns valid data into valid markup. The defect those data tests were written
 * for was a rendering defect: the renderer inferred column grouping by
 * substring-matching the French word "appui" and derived the icon row's width
 * from `headers.length`, which emitted `colSpan={0.5}` on one table and a
 * [1,1,1,1,8] span distribution against 4/4/2 data groups on another. A buyer
 * read misaligned numbers off a specification table.
 *
 * Declaring the grouping in config fixed the cause. These tests close the loop
 * by asserting the geometry *in the DOM*: for every header row, the colspans of
 * its cells add up to the width of the body, and every colspan that is written
 * at all is a positive integer. A fractional span cannot satisfy either, so the
 * original defect cannot come back without turning this file red.
 *
 * The last block renders every real variant from config. That is the coarse
 * safety net the suite lacked entirely: a renderer that throws on live data
 * fails here rather than on the deployed page.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import './support/dom-env';
import { ProductVariantDetails } from '@/components/product-variants/ProductVariantDetails';
import { productVariants } from '@/config/product-variants.config';
import type { ProductVariant, TableSection } from '@/config/product-variant-schema';

afterEach(cleanup);

/**
 * The widest body row — the renderer's own definition of how many columns the
 * table really has, and what every header row must span.
 */
function bodyWidth(table: TableSection): number {
  return Math.max(
    ...table.rows.map((row) => row.length),
    table.subheaders?.length ?? 0,
    0,
  );
}

/**
 * The invariant the original defect violated, checked against rendered markup.
 *
 * Both halves matter. The sum catches a header row that under- or over-runs the
 * body (the [1,1,1,1,8] case). The attribute pattern catches a span that is not
 * a whole number at all (the `colSpan={0.5}` case) — a fraction can happen to
 * sum correctly, and `HTMLTableCellElement.colSpan` silently coerces it, so the
 * written attribute has to be inspected as text.
 *
 * `scope` is deliberately not checked here. Only the label row carries it; the
 * support-diagram row is decorative and repeats the same spans without one.
 * The grouped-table test below asserts it on the row where it belongs.
 */
function expectHeaderGeometry(table: HTMLTableElement, expectedWidth: number): void {
  const headerRows = [...table.querySelectorAll('thead tr')];
  expect(headerRows.length).toBeGreaterThan(0);

  for (const row of headerRows) {
    const cells = [...row.querySelectorAll('th')];
    const declared = cells.reduce((total, cell) => total + cell.colSpan, 0);
    expect(declared, 'header row colspans must span the whole body').toBe(expectedWidth);

    for (const cell of cells) {
      const written = cell.getAttribute('colspan');
      // Absent is legitimate and means 1. Present must be a positive integer:
      // no "0", no "0.5", no "-1".
      if (written !== null) expect(written).toMatch(/^[1-9][0-9]*$/);
    }
  }

  for (const row of table.querySelectorAll('tbody tr')) {
    expect(row.querySelectorAll('td')).toHaveLength(expectedWidth);
  }
}

function variantWith(sections: ProductVariant['sections']): ProductVariant {
  return { id: 'fixture', title: 'VARIANTE DE TEST', sections };
}

describe('ProductVariantDetails — section types', () => {
  it('keyValue renders every key, and splits a multi-line value into lines', () => {
    const section = {
      type: 'keyValue' as const,
      title: 'Caractéristiques',
      items: [
        { key: 'Acier', value: 'S235JR' },
        { key: 'Revêtement', value: 'Première ligne\nSeconde ligne' },
      ],
    };
    render(<ProductVariantDetails product={variantWith([section])} />);

    expect(screen.getByText('Caractéristiques')).toBeInTheDocument();
    expect(screen.getByText('Acier:')).toBeInTheDocument();
    expect(screen.getByText('S235JR')).toBeInTheDocument();
    // The newline is content, not formatting: both halves must survive.
    expect(screen.getByText('Première ligne')).toBeInTheDocument();
    expect(screen.getByText('Seconde ligne')).toBeInTheDocument();
  });

  it('list renders one li per item', () => {
    const section = {
      type: 'list' as const,
      title: 'Applications',
      items: ['Bâtiments industriels', 'Hangars agricoles', 'Entrepôts'],
    };
    const { container } = render(<ProductVariantDetails product={variantWith([section])} />);

    expect(container.querySelectorAll('li')).toHaveLength(3);
    for (const item of section.items) expect(screen.getByText(item)).toBeInTheDocument();
  });

  it('text renders one paragraph per line of content', () => {
    const section = {
      type: 'text' as const,
      title: 'Description',
      content: 'Premier paragraphe.\nDeuxième paragraphe.',
    };
    const { container } = render(<ProductVariantDetails product={variantWith([section])} />);

    expect(screen.getByText('Premier paragraphe.')).toBeInTheDocument();
    expect(screen.getByText('Deuxième paragraphe.')).toBeInTheDocument();
    expect(container.querySelectorAll('p')).toHaveLength(2);
  });

  it('image renders the strip at its declared intrinsic size', () => {
    const section = {
      type: 'image' as const,
      title: 'Coupe type',
      caption: 'Coupe longitudinale',
      image: {
        src: '/media/coupe.webp',
        alt: 'Coupe type du panneau',
        width: 800,
        height: 134,
      },
    };
    render(<ProductVariantDetails product={variantWith([section])} />);

    const img = screen.getByAltText('Coupe type du panneau');
    // The declared size is what makes the reserved box the picture's own shape.
    // The old hardcoded 800x250 matched none of the six strips and letterboxed
    // every one of them.
    expect(img).toHaveAttribute('width', '800');
    expect(img).toHaveAttribute('height', '134');
    expect(screen.getByText('Coupe longitudinale')).toBeInTheDocument();
  });

  it('image falls back to 800x250 only when config records no size', () => {
    const section = {
      type: 'image' as const,
      title: 'Schéma',
      image: { src: '/media/schema.webp', alt: 'Schéma de principe' },
    };
    render(<ProductVariantDetails product={variantWith([section])} />);

    const img = screen.getByAltText('Schéma de principe');
    expect(img).toHaveAttribute('width', '800');
    expect(img).toHaveAttribute('height', '250');
  });

  it('imageGrid renders a card per item, with a placeholder where no photo exists', () => {
    const section = {
      type: 'imageGrid' as const,
      items: [
        {
          name: 'Faîtière',
          length: '2,00 m',
          image: { src: '/media/faitiere.webp', alt: 'Faîtière' },
        },
        // `image` is optional on purpose: better no picture than another
        // part's picture, which is a defect that actually shipped once.
        { name: 'Angle intérieur', length: '2,00 m' },
      ],
    };
    render(<ProductVariantDetails product={variantWith([section])} />);

    expect(screen.getByAltText('Faîtière')).toBeInTheDocument();
    expect(screen.getByText('Angle intérieur')).toBeInTheDocument();
    expect(screen.getByText('Photo à venir')).toBeInTheDocument();
    // One image and one placeholder — not two images, and not a second card
    // reusing the first one's photo.
    expect(screen.getAllByText(/^2,00 m$/)).toHaveLength(2);
  });

  it('an unknown section type is skipped rather than crashing the page', () => {
    // `sectionComponentMap[section.type]` is read through an `ElementType`
    // cast, so a type the map does not know would render `undefined` as a
    // component and throw. The guard in the renderer is what prevents that;
    // this pins it, because config and renderer are edited separately.
    const rogue = { type: 'diagram', title: 'Inconnu' } as unknown as ProductVariant['sections'][number];
    const { container } = render(
      <ProductVariantDetails
        product={variantWith([rogue, { type: 'text', title: 'Après', content: 'Rendu.' }])}
      />,
    );

    expect(screen.getByText('Rendu.')).toBeInTheDocument();
    expect(container.textContent).not.toContain('Inconnu');
  });
});

describe('ProductVariantDetails — table geometry', () => {
  it('an ungrouped table is one header cell per body column', () => {
    const table: TableSection = {
      type: 'table',
      title: 'Caractéristiques mécaniques',
      subtitle: 'Valeurs indicatives',
      headers: ['Désignation', 'Hauteur', 'Masse'],
      rows: [
        ['IPE 100', '100', '8,1'],
        ['IPE 120', '120', '10,4'],
      ],
    };
    const { container } = render(<ProductVariantDetails product={variantWith([table])} />);

    const rendered = container.querySelector('table');
    expect(rendered).not.toBeNull();
    expectHeaderGeometry(rendered as HTMLTableElement, bodyWidth(table));

    expect(screen.getByText('Valeurs indicatives')).toBeInTheDocument();
    // One header row only: no groups declared means no icon row and no
    // subheader row to go with it.
    expect(container.querySelectorAll('thead tr')).toHaveLength(1);
    expect(container.querySelectorAll('thead th')).toHaveLength(3);
  });

  it('a grouped table spans its groups across the subheaders beneath them', () => {
    // The shape the original defect was found on: an identifier column, then
    // two support conditions each covering two entraxe columns.
    const table: TableSection = {
      type: 'table',
      title: 'Portées admissibles',
      headerGroups: [
        { label: 'Épaisseur' , span: 1 },
        { label: '1 appui', span: 2, icon: 'two-supports' },
        { label: '2 appuis', span: 2 },
      ],
      subheaders: ['Épaisseur', '3,00', '4,00', '3,00', '4,00'],
      rows: [
        ['40', '2,10', '1,80', '2,60', '2,20'],
        ['60', '2,60', '2,20', '3,20', '2,70'],
      ],
    };
    const { container } = render(<ProductVariantDetails product={variantWith([table])} />);

    const rendered = container.querySelector('table') as HTMLTableElement;
    expectHeaderGeometry(rendered, 5);

    // Three header rows: the groups, the support diagram, the entraxes.
    const headerRows = [...container.querySelectorAll('thead tr')];
    expect(headerRows).toHaveLength(3);

    const groupCells = [...(headerRows[0]?.querySelectorAll('th') ?? [])];
    expect(groupCells.map((c) => c.colSpan)).toEqual([1, 2, 2]);
    expect(groupCells.map((c) => c.getAttribute('scope'))).toEqual(['col', 'colgroup', 'colgroup']);

    // The icon row mirrors the group spans exactly — deriving its width from
    // anywhere else is what produced [1,1,1,1,8].
    const iconCells = [...(headerRows[1]?.querySelectorAll('th') ?? [])];
    expect(iconCells.map((c) => c.colSpan)).toEqual([1, 2, 2]);
    expect(iconCells[1]?.querySelector('svg')).not.toBeNull();
    expect(iconCells[0]?.querySelector('svg')).toBeNull();

    // The subheaders are one plain cell per column, never spanned.
    const subCells = [...(headerRows[2]?.querySelectorAll('th') ?? [])];
    expect(subCells).toHaveLength(5);
    expect(subCells.map((c) => c.textContent)).toEqual([
      'Épaisseur',
      '3,00',
      '4,00',
      '3,00',
      '4,00',
    ]);
  });

  it('no icon row is drawn when no group declares a diagram', () => {
    const table: TableSection = {
      type: 'table',
      title: 'Sans diagramme',
      headerGroups: [
        { label: 'Référence', span: 1 },
        { label: 'Dimensions', span: 2 },
      ],
      rows: [['A', '10', '20']],
    };
    const { container } = render(<ProductVariantDetails product={variantWith([table])} />);

    expect(container.querySelectorAll('thead tr')).toHaveLength(1);
    expectHeaderGeometry(container.querySelector('table') as HTMLTableElement, 3);
  });

  it('a fractional span is written as a whole number, never as colSpan="0.5"', () => {
    // The exact defect, reproduced as data. `span` is typed `number`, so
    // nothing in the type system stops a fraction reaching the renderer; the
    // renderer truncates and floors it at 1, and this asserts that the written
    // attribute is therefore always a valid integer.
    const table: TableSection = {
      type: 'table',
      title: 'Span dégradé',
      headerGroups: [
        { label: 'Référence', span: 0.5 },
        { label: 'Appuis', span: 2.5 },
      ],
      rows: [['A', '10', '20', '30']],
    };
    const { container } = render(<ProductVariantDetails product={variantWith([table])} />);

    const rendered = container.querySelector('table') as HTMLTableElement;
    for (const cell of rendered.querySelectorAll('thead th')) {
      const written = cell.getAttribute('colspan');
      if (written !== null) expect(written).toMatch(/^[1-9][0-9]*$/);
    }
    // And the header still covers the body: the renderer's drift net widens the
    // last group rather than leaving a short header row.
    expectHeaderGeometry(rendered, 4);
  });

  it('a header row that under-runs the body is widened, not left short', () => {
    const table: TableSection = {
      type: 'table',
      title: 'Groupes incomplets',
      headerGroups: [{ label: 'Référence', span: 1 }],
      rows: [['A', '10', '20']],
    };
    const { container } = render(<ProductVariantDetails product={variantWith([table])} />);
    expectHeaderGeometry(container.querySelector('table') as HTMLTableElement, 3);
  });

  it('applies the presentational header tweaks config deliberately omits', () => {
    // Line breaks inside long labels and unit casing are presentation, so they
    // live in the renderer. That means the label in config and the label on
    // screen are not the same string — pinned here so neither side "fixes" the
    // other by normalising the data.
    const table: TableSection = {
      type: 'table',
      title: 'Tweaks',
      headers: ['Épaisseur (mm)', 'Masse kg/m²'],
      rows: [['40', '10,2']],
    };
    const { container } = render(<ProductVariantDetails product={variantWith([table])} />);

    const cells = [...container.querySelectorAll('thead th')];
    expect(cells[0]?.querySelector('br')).not.toBeNull();
    expect(cells[0]?.textContent).toBe('Épaisseur (mm)');
    expect(cells[1]?.textContent).toBe('Masse Kg/m²');
  });
});

describe('ProductVariantDetails — layout', () => {
  it('renders the hero gallery when the variant has a mainImage', () => {
    const product: ProductVariant = {
      id: 'avec-image',
      title: 'AVEC IMAGE',
      mainImage: { src: '/media/hero.webp', alt: 'Vue du produit', width: 1600, height: 900 },
      sections: [{ type: 'text', title: 'Description', content: 'Texte.' }],
    };
    render(<ProductVariantDetails product={product} />);

    expect(screen.getByAltText('Vue du produit')).toBeInTheDocument();
    expect(screen.getByText('AVEC IMAGE')).toBeInTheDocument();
  });

  it('gives the full width to a variant with no mainImage', () => {
    // A parts grid has no single representative photo. The failure this guards
    // is an empty sticky column holding half the page open beside the content.
    const { container } = render(
      <ProductVariantDetails
        product={variantWith([{ type: 'text', title: 'Description', content: 'Texte.' }])}
      />,
    );

    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('.md\\:col-span-2')).not.toBeNull();
  });

  it('puts the variant title in the one h2 above the sections', () => {
    render(
      <ProductVariantDetails
        product={variantWith([{ type: 'text', title: 'Description', content: 'Texte.' }])}
      />,
    );

    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('VARIANTE DE TEST');
  });
});

describe('ProductVariantDetails — every real variant', () => {
  const variants = Object.entries(productVariants);

  it('there are variants to render', () => {
    expect(variants.length).toBeGreaterThanOrEqual(5);
  });

  it.each(variants)('%s renders, and its tables span their bodies', (_key, variant) => {
    // The coarse net: live config through the real renderer. Before this, no
    // test in the suite would have noticed a product page that threw.
    const { container } = render(<ProductVariantDetails product={variant} />);

    expect(screen.getByRole('heading', { level: 2, name: variant.title })).toBeInTheDocument();

    const tables = [...container.querySelectorAll('table')];
    const declared = variant.sections.filter((s): s is TableSection => s.type === 'table');
    expect(tables).toHaveLength(declared.length);

    declared.forEach((section, index) => {
      const rendered = tables[index];
      expect(rendered, `table ${index} of ${variant.id} did not render`).toBeDefined();
      expectHeaderGeometry(rendered as HTMLTableElement, bodyWidth(section));
    });
  });
});
