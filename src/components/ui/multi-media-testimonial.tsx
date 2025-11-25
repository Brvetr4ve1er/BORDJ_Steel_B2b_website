
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Logo } from "../logo";

export interface Article {
  id: string;
  title: string;
  description: string;
  href: string;
  tag: string;
  imageUrl?: string;
  date: string;
  author?: {
    name: string;
    avatarUrl: string;
  };
  isFeatured?: boolean;
}

interface ArticleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  article: Article;
}

const ArticleCard = React.forwardRef<HTMLDivElement, ArticleCardProps>(
  ({ article, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative mb-4 break-inside-avoid overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl",
          className
        )}
        {...props}
      >
        <Link href={article.href} className="absolute inset-0 z-10" aria-label={`Read more about ${article.title}`}>
          <span className="sr-only">Read More</span>
        </Link>
        <div className="relative z-0">
          {article.imageUrl && (
            <div className="relative overflow-hidden w-full aspect-video">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
            </div>
          )}
          <div className="p-6">
            <div className="mb-4 flex items-center gap-4 text-xs font-semibold uppercase text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{article.tag}</span>
              <span>{article.date}</span>
            </div>
            <h3 className="mb-3 text-xl font-bold leading-tight text-foreground lg:text-2xl">
              <span className="bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                {article.title}
              </span>
            </h3>
            <p className="text-muted-foreground text-base line-clamp-3">
              {article.description}
            </p>
            <div className="mt-6 flex items-center justify-between">
              {article.author && (
                <div className="flex items-center gap-3">
                  {article.author.avatarUrl.endsWith('.svg') ? (
                    <div className="h-10 w-10">
                      <Logo />
                    </div>
                  ) : (
                    <Image src={article.author.avatarUrl} alt={article.author.name} width={40} height={40} className="rounded-full" />
                  )}
                  <span className="font-semibold text-sm">{article.author.name}</span>
                </div>
              )}
              <Button variant="ghost" size="sm" className="group/button text-primary hover:text-primary z-20">
                Lire la suite
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ArticleCard.displayName = "ArticleCard";
export default ArticleCard;
