/**
 * The Media Center blog page is a server page with three server-rendered
 * panels; the only genuinely client-side state is *which* panel is on screen,
 * what the reader has typed, and how the articles are ordered. This module is
 * that state's vocabulary and its one derivation — no JSX, no React, and
 * deliberately no `@/config/blog-data` import, so pulling it into the client
 * leaf does not drag the article bodies along with it.
 */

export const TAB_IDS = ['iso', 'blog', 'catalogue'] as const;
export type TabId = (typeof TAB_IDS)[number];

/** Shown when the URL asks for nothing — or asks for a tab that does not exist. */
export const DEFAULT_TAB_ID: TabId = 'blog';

export const SORT_IDS = ['recent', 'oldest', 'az'] as const;
export type SortId = (typeof SORT_IDS)[number];

// Named so the initial-state fallback elsewhere can never drift from the option list.
export const DEFAULT_SORT_ID: SortId = 'recent';

export function isTabId(value: string): value is TabId {
  return TAB_IDS.some((id) => id === value);
}

export function isSortId(value: string): value is SortId {
  return SORT_IDS.some((id) => id === value);
}

/** Ties each tab button to the panel it reveals. */
export function blogPanelId(tab: TabId): string {
  return `blog-panel-${tab}`;
}

/**
 * Everything the client needs in order to filter and order the articles. It is
 * built on the server (`buildArticleIndex`) so the article bodies never enter
 * the client bundle: the cards themselves are server-rendered and handed to the
 * slots as children.
 */
export type BlogArticleIndexEntry = {
  readonly id: string;
  /** Lowercased title. */
  readonly title: string;
  /**
   * Lowercased description. Kept apart from the title rather than concatenated
   * so a query straddling the two fields still does not match — exactly the
   * behaviour of the two `.includes()` calls this replaced.
   */
  readonly description: string;
  /** 0-based position of this article under each of the three sort orders. */
  readonly order: Readonly<Record<SortId, number>>;
};

export type BlogViewDerived = {
  /**
   * True as soon as the reader has typed something or picked a non-default
   * order — the condition that retires the wide "featured" slot.
   */
  readonly isFiltering: boolean;
  readonly matchCount: number;
  readonly matches: (articleId: string) => boolean;
  readonly orderOf: (articleId: string) => number;
};

/** Everything the view derives from the reader's three inputs. Pure. */
export function deriveBlogView(
  articles: readonly BlogArticleIndexEntry[],
  searchQuery: string,
  sortBy: SortId
): BlogViewDerived {
  const q = searchQuery.trim().toLowerCase();
  const matched = new Set(
    articles
      .filter((a) => !q || a.title.includes(q) || a.description.includes(q))
      .map((a) => a.id)
  );
  const order = new Map(articles.map((a) => [a.id, a.order[sortBy]] as const));

  return {
    isFiltering: q !== '' || sortBy !== DEFAULT_SORT_ID,
    matchCount: matched.size,
    matches: (articleId) => matched.has(articleId),
    orderOf: (articleId) => order.get(articleId) ?? 0,
  };
}
