"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import {
  DEFAULT_SORT_ID,
  DEFAULT_TAB_ID,
  deriveBlogView,
  type BlogArticleIndexEntry,
  type BlogViewDerived,
  type SortId,
  type TabId,
} from './blog-view-model';

/**
 * Holds the three pieces of reader state for the Media Center blog page — the
 * active tab, the query and the sort order — and nothing else. The page content
 * itself is server markup handed to the slots in `blog-view-slots.tsx` as
 * children, so it never crosses this boundary.
 */

type BlogViewValue = BlogViewDerived & {
  readonly activeTab: TabId;
  readonly setActiveTab: (tab: TabId) => void;
  readonly searchQuery: string;
  readonly setSearchQuery: (query: string) => void;
  readonly sortBy: SortId;
  readonly setSortBy: (sort: SortId) => void;
};

const BlogViewContext = createContext<BlogViewValue | null>(null);

export function BlogViewProvider({
  articles,
  children,
}: {
  articles: readonly BlogArticleIndexEntry[];
  children: ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<TabId>(DEFAULT_TAB_ID);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortId>(DEFAULT_SORT_ID);

  const value = useMemo<BlogViewValue>(
    () => ({
      activeTab,
      setActiveTab,
      searchQuery,
      setSearchQuery,
      sortBy,
      setSortBy,
      ...deriveBlogView(articles, searchQuery, sortBy),
    }),
    [articles, activeTab, searchQuery, sortBy]
  );

  return <BlogViewContext.Provider value={value}>{children}</BlogViewContext.Provider>;
}

export function useBlogView(): BlogViewValue {
  const value = useContext(BlogViewContext);
  if (!value) {
    throw new Error('useBlogView must be used inside <BlogViewProvider>.');
  }
  return value;
}
