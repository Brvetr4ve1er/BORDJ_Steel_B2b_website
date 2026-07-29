
import React from 'react';
import { BookCopy } from 'lucide-react';
import '@/app/download-button.css';

interface DownloadButtonProps {
  text: string;
  /** When provided, the button becomes a real download/view link to this URL. */
  href?: string;
  /** Force a download instead of opening in a new tab. Defaults to opening (view). */
  download?: boolean;
}

export function DownloadButton({ text, href, download = false }: DownloadButtonProps) {
  const content = (
    <div className="docs">
      <BookCopy className="h-5 w-5" /> {text}
    </div>
  );

  if (href) {
    return (
      <a
        className="download-button"
        href={href}
        {...(download ? { download: '' } : { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {content}
      </a>
    );
  }

  // No href: render a non-navigating button (used where a parent <a> wraps it).
  return (
    <button className="download-button" type="button">
      {content}
    </button>
  );
}
