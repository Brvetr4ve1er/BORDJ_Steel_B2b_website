
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { Card } from './ui/card';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1542901105-35363351a613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxyaWJiZWQlMjBzdGVlbCUyMHNoZWV0fGVufDB8fHx8MTc1NTE2MzU1NXww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Ribbed steel sheets stacked', aiHint: 'steel sheets' },
  { src: 'https://images.unsplash.com/photo-1621253526388-348c4f407742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bWV0YWwlJTIwcm9vZmluZyUyMHNoZWV0c3xlbnwwfHx8fDE3NTUyNDA1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Close-up of metal roofing sheets', aiHint: 'metal roofing' },
  { src: 'https://images.unsplash.com/photo-1518718913060-947cd98c5550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOHx8ZmFjdG9yeSUyMGJ1aWxkaW5nJTIwJTIwc2FuZHdpc2glMjAlMjBwYW5uZWx8ZW58MHx8fHwxNzU1MDc3NDgwfDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Factory building with sandwich panel walls', aiHint: 'factory building' },
  { src: 'https://images.unsplash.com/photo-1621945199423-8b1a4a5e3a7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxpbnN1bGF0aW9uJTIwcGFuZWxzfGVufDB8fHx8MTc1NTI0MDUyOXww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Stack of insulation panels', aiHint: 'insulation panels' },
  { src: 'https://images.unsplash.com/photo-1595822365284-9644155355a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb3JydWdhdGVkJTIwbWV0YWx8ZW58MHx8fHwxNzU1MzA1NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Corrugated metal texture', aiHint: 'corrugated metal' },
  { src: 'https://images.unsplash.com/photo-1563829406954-4a47ed381e01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8c3RlZWwlMjBiZWFtc3xlbnwwfHx8fDE3NTUyNDA1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Construction site with steel beams', aiHint: 'steel beams' },
  { src: 'https://images.unsplash.com/photo-1614356693127-b314f9e55d82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxGUkVFWkVSJTIwUk9PTVMlMjB8ZW58MHx8fHwxNzU1MDg4NDM4fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Interior of a commercial freezer room', aiHint: 'freezer room' },
  { src: 'https://images.unsplash.com/photo-1706029831375-c090c70c161d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtZXRhbCUyMHNoZWV0JTIwfGVufDB8fHx8MTc1NTA5MDY2OHww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'A single metal sheet with a glossy finish', aiHint: 'metal sheet' },
  { src: 'https://images.unsplash.com/photo-1517409692-741139785899?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGNvaWxzfGVufDB8fHx8MTc1NTI0MDUyOXww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Large rolls of coiled steel', aiHint: 'steel coils' },
  { src: 'https://images.unsplash.com/photo-1738162837330-9257f938463c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxzdGVlbCUyMGZhYnJpY2F0aW9ufGVufDB8fHx8MTc1Mzg3NjM3Mnww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Welder working on steel fabrication', aiHint: 'steel fabrication' },
];

export function ProductImageGallery() {
  return (
    <section className="py-20">
      <AnimatedWrapper animation="fade-in">
        <h2 className="font-headline text-3xl font-bold text-center text-primary mb-12">Galerie d'images</h2>
      </AnimatedWrapper>
      <div className="columns-2 gap-4 sm:gap-6">
        {galleryImages.map((image, index) => (
          <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
            <Card className="mb-4 sm:mb-6 break-inside-avoid rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-2xl">
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={index % 3 === 1 ? 600 : 400} 
                className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                data-ai-hint={image.aiHint}
              />
            </Card>
          </AnimatedWrapper>
        ))}
      </div>
    </section>
  );
}
