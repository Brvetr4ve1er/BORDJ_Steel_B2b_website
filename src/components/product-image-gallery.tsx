
import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { Card } from './ui/card';

export type ProductImage = {
  src: string;
  alt: string;
  aiHint?: string;
  blurDataUrl?: string;
  /** Intrinsic size of the file, so the reserved box is the picture's own shape. */
  width?: number;
  height?: number;
};

interface ProductImageGalleryProps {
    mainImage: ProductImage;
}

export function ProductImageGallery({ mainImage }: ProductImageGalleryProps) {
  
  if (!mainImage || !mainImage.src) {
    return null;
  }

  return (
    <div className="space-y-8">
        <AnimatedWrapper animation="fade-in">
            <Card className="rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-2xl">
            {/* The variants' main images are not all 4:3 — they run from
                1600x900 to 800x1200. The old hardcoded 800x600 reserved a
                4:3 box for every one of them, so a portrait image jumped
                634x475 -> 634x951 the moment it loaded. The declared size
                is the file's own, where config records it. */}
            <Image
                src={mainImage.src}
                alt={mainImage.alt}
                sizes="(max-width: 768px) 100vw, 50vw"
                width={mainImage.width ?? 800}
                height={mainImage.height ?? 600}
                className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                data-ai-hint={mainImage.aiHint}
                placeholder={mainImage.blurDataUrl ? 'blur' : 'empty'}
                blurDataURL={mainImage.blurDataUrl}
            />
            </Card>
        </AnimatedWrapper>
    </div>
  );
}
