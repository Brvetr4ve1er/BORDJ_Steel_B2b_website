
"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImageDialog } from "./image-dialog";

interface HoverImageGalleryProps {
  images: string[];
}

export function HoverImageGallery({ images }: HoverImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!images || images.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;

    // Update mouse position for tooltip
    setMousePosition({ x, y });

    // Calculate which image to show based on horizontal position
    const imageIndex = Math.floor((x / width) * images.length);
    const clampedIndex = Math.max(0, Math.min(images.length - 1, imageIndex));

    setCurrentImageIndex(clampedIndex);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!images || images.length === 0) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  if (!images || images.length === 0 || !images[currentImageIndex]) {
    return null;
  }

  return (
    <div className="relative group">
      <div
        className="relative w-full aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ImageDialog imageUrl={images[currentImageIndex]} alt={`Aperçu galerie ${currentImageIndex + 1}`}>
          <button
            type="button"
            className="block w-full h-full p-0 border-0 bg-transparent"
            onKeyDown={handleKeyDown}
          >
            {/* Main displayed image */}
            <Image
              src={images[currentImageIndex]}
              alt={`Aperçu galerie ${currentImageIndex + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain transition-all duration-150 ease-out"
            />
          </button>
        </ImageDialog>
        
        {/* Glassmorphic Tooltip with Both Chevrons */}
        {isHovering && (
          <div
            className="absolute pointer-events-none z-20 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
          >
            <div className="bg-white/20 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/30 w-12 h-12 flex items-center justify-center">
              <div className="flex items-center space-x-1">
                {/* Left Chevron */}
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>

                {/* Right Chevron */}
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentImageIndex ? "bg-accent scale-125" : "bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
};
