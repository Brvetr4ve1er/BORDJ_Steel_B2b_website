"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

/**
 * A YouTube player that loads nothing from YouTube until the visitor asks for it.
 *
 * A bare <iframe src="youtube.com/embed/..."> costs roughly half a megabyte of
 * third-party script on page load and contacts Google before anyone has decided
 * to watch. This renders a self-hosted poster and a button; the iframe is
 * mounted only on click, and against youtube-nocookie.com, so nothing is set
 * until the visitor opts in. That also keeps the privacy policy honest — see
 * PrivacyPageContent, "Services tiers".
 *
 * Server-rendered until interaction: the poster, the title and the link out are
 * all in the HTML, so the page is complete for crawlers and without JS.
 */
export function VideoFacade({
  id,
  title,
  poster,
}: {
  id: string;
  title: string;
  poster: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        // nocookie host, and `autoplay` only because the visitor just clicked play.
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Lire la vidéo : ${title}`}
      className="group absolute inset-0 h-full w-full cursor-pointer border-0 bg-transparent p-0"
    >
      <Image
        src={poster}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/20" />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      >
        <Play className="ml-0.5 h-7 w-7 fill-current" />
      </span>
    </button>
  );
}
