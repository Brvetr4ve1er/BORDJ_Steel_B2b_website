/**
 * Gallery Section Component for Charpente Métallique Page
 *
 * Provides a visually appealing, horizontal layout for displaying project
 * showcase images. Features expandable images on hover to allow users to
 * view project details more clearly.
 */
"use client";

import React from 'react';
import Image from 'next/image';
import { ImageDialog } from '@/components/ui/image-dialog';

export const GallerySection = () => {
    return (
        <section className="w-full flex flex-col items-center justify-start py-12">
            <div className="max-w-3xl text-center px-4">
                <h1 className="text-3xl font-semibold">Nos Projets</h1>
            </div>
            <div className="flex items-center gap-2 h-[400px] w-full max-w-7xl mt-10 px-4">
                {[
                    "https://i.pinimg.com/736x/ec/93/b8/ec93b8a90b0c088c23cdf817613dd183.jpg",
                    "https://i.pinimg.com/736x/34/9a/c5/349ac528cf2b299e8e9d38dcf88e029d.jpg",
                    "https://i.pinimg.com/736x/5f/00/6f/5f006fef04a5f7af462ba580abbb2adc.jpg",
                    "https://i.pinimg.com/736x/7a/da/ff/7adaff64dfee8fb4467082a0a5daa933.jpg",
                    "https://i.pinimg.com/736x/53/07/e6/5307e6787500b6efff734990a41772e5.jpg",
                    "https://i.pinimg.com/736x/db/65/cd/db65cdc8fcf0205a18de1498e1a987c7.jpg"
                ].map((src, idx) => (
                    <ImageDialog key={idx} imageUrl={src} alt={`Gallery image ${idx + 1}`}>
                        <div
                            className="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full cursor-pointer"
                        >
                            <Image
                                fill
                                className="h-full w-full object-cover object-center"
                                src={src}
                                alt={`image-${idx}`}
                            />
                        </div>
                    </ImageDialog>
                ))}
            </div>
        </section>
    );
};