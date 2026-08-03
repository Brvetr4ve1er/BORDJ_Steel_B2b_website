"use client";

import type { CSSProperties, ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { useBlogView } from './blog-view-context';
import { blogPanelId, type TabId } from './blog-view-model';

/**
 * The wrappers below are the whole of the client tree around the page content.
 * Each one receives already-rendered server markup as `children` and decides
 * only whether it is on screen and where it sits in the grid — so every article
 * title, every ISO scope and the catalogue copy are in the prerendered HTML,
 * whether or not the visitor ever runs the JavaScript.
 */

/** One of the three panels. All three ship; this picks which is shown. */
export function BlogTabPanel({ tab, children }: { tab: TabId; children: ReactNode }) {
  const { activeTab } = useBlogView();

  return (
    <div id={blogPanelId(tab)} hidden={activeTab !== tab}>
      {children}
    </div>
  );
}

// -1 keeps the wide card ahead of every ordered card in the grid below it.
const FEATURED_ORDER: CSSProperties = { order: -1 };

/** The wide slot: only while the reader is neither searching nor re-sorting. */
export function BlogFeaturedSlot({ children }: { children: ReactNode }) {
  const { isFiltering } = useBlogView();

  return (
    <div className="lg:col-span-2" style={FEATURED_ORDER} hidden={isFiltering}>
      {children}
    </div>
  );
}

export function BlogArticleSlot({
  articleId,
  isFeatured,
  children,
}: {
  articleId: string;
  isFeatured: boolean;
  children: ReactNode;
}) {
  const { isFiltering, matches, orderOf } = useBlogView();
  // The featured article also exists here as an ordinary card: that is the form
  // it took in the grid as soon as a search or a sort retired the wide slot.
  const isVisible = matches(articleId) && (!isFeatured || isFiltering);

  return (
    <div style={{ order: orderOf(articleId) }} hidden={!isVisible}>
      {children}
    </div>
  );
}

export function BlogArticleGrid({ children }: { children: ReactNode }) {
  const { matchCount } = useBlogView();

  return (
    // `hidden` has to be the class rather than the attribute here: `grid` is an
    // author-origin `display`, which would otherwise beat the UA `[hidden]` rule.
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8',
        matchCount === 0 && 'hidden'
      )}
    >
      {children}
    </div>
  );
}

export function BlogEmptyState() {
  const { matchCount } = useBlogView();

  return (
    <p className="text-center text-lg text-muted-foreground py-12" hidden={matchCount !== 0}>
      Aucun article ne correspond à votre recherche.
    </p>
  );
}
