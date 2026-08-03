"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Award, BookOpen, FileText, Search, type LucideIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useBlogView } from './blog-view-context';
import {
  blogPanelId,
  DEFAULT_SORT_ID,
  DEFAULT_TAB_ID,
  isSortId,
  isTabId,
  type SortId,
  type TabId,
} from './blog-view-model';

const tabs: readonly { readonly id: TabId; readonly label: string; readonly icon: LucideIcon }[] = [
    { id: "iso", label: "ISO", icon: Award },
    { id: "blog", label: "Blog", icon: BookOpen },
    { id: "catalogue", label: "Catalogue", icon: FileText },
];

const sortByOptions: readonly { readonly id: SortId; readonly label: string }[] = [
    { id: DEFAULT_SORT_ID, label: "Plus récents" },
    { id: "oldest", label: "Plus anciens" },
    { id: "az", label: "A → Z" },
];

/**
 * The only thing on this page that reads the URL, and therefore the only thing
 * Next.js has to defer past the prerender. It renders nothing at all, so its
 * Suspense boundary can fall back to nothing and the rest of the page stays
 * plain server markup instead of collapsing into a loading string.
 */
export function BlogInitialTab() {
  const searchParams = useSearchParams();
  const { setActiveTab } = useBlogView();
  const requestedTab = searchParams.get('tab');

  useEffect(() => {
    setActiveTab(requestedTab !== null && isTabId(requestedTab) ? requestedTab : DEFAULT_TAB_ID);
  }, [requestedTab, setActiveTab]);

  return null;
}

export function BlogTabs() {
  const { activeTab, setActiveTab } = useBlogView();

  return (
    <div
        role="group"
        aria-label="Sections de la page"
        className="inline-flex items-center gap-1 rounded-lg border border-border bg-secondary p-1"
    >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={isActive}
              aria-controls={blogPanelId(tab.id)}
              className={cn(
                "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 sm:px-6 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-primary hover:bg-background"
              )}
            >
              <tab.icon className="h-5 w-5" aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
    </div>
  );
}

/** Search and sort only drive the "blog" tab — hide them elsewhere. */
export function BlogSearchField() {
  const { activeTab, searchQuery, setSearchQuery } = useBlogView();
  if (activeTab !== 'blog') return null;

  return (
    <div className="w-full md:w-auto md:flex-1 relative">
       <label htmlFor="blog-search" className="sr-only">Rechercher des articles</label>
       <Input
          id="blog-search"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher des articles..."
          className="h-12 text-lg pl-12"
       />
       <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
    </div>
  );
}

export function BlogSortSelect() {
  const { activeTab, sortBy, setSortBy } = useBlogView();
  if (activeTab !== 'blog') return null;

  return (
    <div className="w-full md:w-auto md:flex-1 flex justify-end">
        <Select
            value={sortBy}
            onValueChange={(value) => {
              if (isSortId(value)) setSortBy(value);
            }}
        >
            <SelectTrigger className="md:max-w-xs h-12 text-lg">
                <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
                {sortByOptions.map(option => (
                <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  );
}
