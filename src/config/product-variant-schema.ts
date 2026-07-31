
export type ProductImage = {
  src: string;
  alt: string;
  aiHint?: string;
};

/**
 * One cell of the header row of a grouped table.
 *
 * `span` is the number of *body* columns the label covers, so the spans of a
 * table's groups must add up to the width of one of its `rows`. The renderer
 * never guesses a span from the label text.
 */
export type TableHeaderGroup = {
  label: string;
  span: number;
  /** Support-condition diagram drawn above this group's columns. */
  icon?: 'two-supports';
};

export type TableSection = {
  type: 'table';
  title: string;
  subtitle?: string;
  /**
   * Header row of an ungrouped table: exactly one label per body column.
   * Provide either `headers` or `headerGroups`, never both.
   */
  headers?: string[];
  /**
   * Header row of a grouped table, where a single label covers several body
   * columns (e.g. "1 appui" over five entraxe columns).
   */
  headerGroups?: TableHeaderGroup[];
  /**
   * Optional second header row: one label per body column, used when the
   * grouped headers need their own column labels underneath (entraxes,
   * section properties…). These are headers, not data — keep them out of
   * `rows`.
   */
  subheaders?: string[];
  rows: (string | number)[][];
};

export type KeyValueSection = {
  type: 'keyValue';
  title: string;
  items: {
    key: string;
    value: string;
  }[];
};

export type ListSection = {
  type: 'list';
  title: string;
  items: string[];
};

export type TextSection = {
  type: 'text';
  title: string;
  content: string;
};

export type ImageSection = {
  type: 'image';
  title: string;
  caption?: string;
  image: ProductImage;
};

export type ImageGridSection = {
  type: 'imageGrid';
  items: {
    name: string;
    length: string;
    /** Omit while the real photo is missing — better no picture than the wrong one. */
    image?: ProductImage;
  }[];
};

export type ProductVariantSection =
  | TableSection
  | KeyValueSection
  | ListSection
  | TextSection
  | ImageSection
  | ImageGridSection;

export type ProductVariant = {
  id: string;
  title: string;
  /**
   * Hero image for the variant. Genuinely optional: some variants (e.g. the
   * finition parts) are a grid of items with no single representative photo,
   * and the renderer gives those a full-width layout instead. Absence is
   * expressed by omitting the field — never by an empty `src`.
   */
  mainImage?: ProductImage;
  sections: ProductVariantSection[];
};
