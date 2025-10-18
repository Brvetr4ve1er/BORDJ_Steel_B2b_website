
"use client";

import React from 'react';
import { BookCopy, Download } from 'lucide-react';
import '@/app/download-button.css';

interface DownloadButtonProps {
  text: string;
}

export function DownloadButton({ text }: DownloadButtonProps) {
  return (
    <button className="download-button">
      <div className="docs">
        <BookCopy className="h-5 w-5" /> {text}
      </div>
      <div className="download">
        <Download className="h-6 w-6" />
      </div>
    </button>
  );
}
