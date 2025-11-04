
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import type { ReactNode } from 'react';

interface ImageDialogProps {
  children: ReactNode;
  imageUrl: string;
  alt: string;
}

export function ImageDialog({ children, imageUrl, alt }: ImageDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-screen-xl max-h-[90vh] h-full w-full p-2 sm:p-4 bg-background/80 backdrop-blur-sm border-none">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <DialogDescription className="sr-only">A larger view of the image: {alt}</DialogDescription>
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
