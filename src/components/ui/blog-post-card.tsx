import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Logo } from '../logo';
import { Article } from '@/config/blog-data';

const cardVariants = cva(
  'group relative flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 h-full',
  {
    variants: {
      variant: {
        default: 'flex-col',
        featured: 'md:flex-row',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BlogPostCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  article: Article;
  readMoreText?: string;
}

const BlogPostCard = React.forwardRef<HTMLDivElement, BlogPostCardProps>(
  ({ className, variant, article, readMoreText = 'Lire l\'article complet', ...props }, ref) => {
    const { title, date, tag, description, imageUrl, href, author } = article;

    const isFeatured = variant === 'featured';

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      >
        <Link href={href} className="absolute inset-0 z-10" aria-label={`Lire l'article : ${title}`}>
          <span className="sr-only">Lire l'article</span>
        </Link>
        <div className={cn(
          "relative z-0 flex h-full w-full",
          isFeatured ? 'flex-col md:flex-row' : 'flex-col'
        )}>
          {imageUrl && (
            <div className={cn(
              "relative overflow-hidden",
              isFeatured ? "md:w-1/2 w-full aspect-video" : "w-full aspect-[4/3]"
            )}>
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
            </div>
          )}
          <div className={cn(
              "flex flex-1 flex-col justify-between p-6",
               isFeatured ? "md:w-1/2 w-full" : "w-full"
            )}>
            <div>
              <div className="mb-4 flex items-center gap-4 text-xs font-semibold uppercase text-muted-foreground">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{tag}</span>
                <span>{date}</span>
              </div>
              <h3 className={cn(
                  "mb-3 font-bold leading-tight text-foreground",
                  isFeatured ? "text-2xl lg:text-3xl" : "text-xl"
                )}>
                <span className="bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                  {title}
                </span>
              </h3>
              <p
                lang={article.lang ?? 'fr'}
                dir={article.lang === 'ar' ? 'rtl' : 'ltr'}
                className={cn(
                  "text-muted-foreground",
                   isFeatured ? "text-lg line-clamp-4" : "text-base line-clamp-3"
                )}>{description.split('\n').slice(0, isFeatured ? 4 : 3).join('\n')}</p>
            </div>
            <div className="mt-6 flex items-center justify-between">
                {author && (
                  <div className="flex items-center gap-3">
                    {/*
                      Renders the avatarUrl the config already points at. This used to
                      special-case ".svg" and substitute the 21 KB inline <Logo>
                      component instead — for a 40x40 avatar, once per card. On the blog
                      index that meant 14 copies, ~294 KB of duplicated markup in the
                      HTML of every load, uncacheable and unshared. The file it was
                      standing in for had been sitting in public/ the whole time; one
                      cached request replaces all of it.
                      unoptimized: the image optimizer cannot process SVG without
                      dangerouslyAllowSVG, which this project deliberately does not set.
                    */}
                    <Image
                      src={author.avatarUrl}
                      alt={author.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-contain"
                      unoptimized={author.avatarUrl.endsWith('.svg')}
                    />
                    <span className="font-semibold text-sm">{author.name}</span>
                  </div>
                )}
                 {/* Presentational only: the whole card is already one link
                     (the absolute overlay above) — a focusable button here
                     would be a dead tab stop for keyboard users. */}
                 <span
                   aria-hidden="true"
                   className={cn(
                     buttonVariants({ variant: 'ghost', size: 'sm' }),
                     'group/button pointer-events-none text-primary'
                   )}
                 >
                    {readMoreText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

BlogPostCard.displayName = 'BlogPostCard';

export { BlogPostCard };
