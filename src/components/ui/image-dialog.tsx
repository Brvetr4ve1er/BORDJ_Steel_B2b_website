
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
      <DialogContent className="max-w-screen-xl max-h-[90dvh] h-full w-full p-2 sm:p-4 bg-background/80 backdrop-blur-sm border-none">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <DialogDescription className="sr-only">Vue agrandie de l'image sélectionnée.</DialogDescription>
        <div className="relative w-full h-full">
          {/* `sizes` describes the dialog, not a thumbnail: `max-w-screen-xl`
              (1280px) less `p-4` leaves a ~1257px box, and the old
              `33vw` tail served a 640w candidate into it — the "zoom" rendered
              softer than the tile it opened from. 1200px, not 1280: Next emits
              no 1280w candidate here, so a terminal `1280px` would push the
              browser to 1920w for no visible gain. */}
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
