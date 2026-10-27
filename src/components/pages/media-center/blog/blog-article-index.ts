import { articles as allArticles, type Article } from '@/config/blog-data';
import type { BlogArticleIndexEntry } from './blog-view-model';

/**
 * Server-side half of the Media Center blog view: the three sort orders are
 * resolved once, at build time, so the client leaf needs no more than an id,
 * two lowercased strings and three integers per article. The cards themselves
 * are server-rendered; the ordering is then applied with CSS `order`.
 */

const parseArticleDate = (d: string) => {
    const t = new Date(d).getTime();
    return isNaN(t) ? 0 : t;
};

export function buildArticleIndex(
    source: readonly Article[] = allArticles
): readonly BlogArticleIndexEntry[] {
    const rank = (sorted: readonly Article[]) => new Map(sorted.map((a, i) => [a.id, i] as const));

    const recent = rank(
        [...source].sort((a, b) => parseArticleDate(b.date) - parseArticleDate(a.date))
    );
    const oldest = rank(
        [...source].sort((a, b) => parseArticleDate(a.date) - parseArticleDate(b.date))
    );
    const az = rank([...source].sort((a, b) => a.title.localeCompare(b.title, 'fr')));

    return source.map((article) => ({
        id: article.id,
        title: article.title.toLowerCase(),
        description: article.description.toLowerCase(),
        order: {
            recent: recent.get(article.id) ?? 0,
            oldest: oldest.get(article.id) ?? 0,
            az: az.get(article.id) ?? 0,
        },
    }));
}
