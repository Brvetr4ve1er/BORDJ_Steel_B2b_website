
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';

export default function FinitionsProduct({ product }: { product: any }) {
  if (!product || !product.features?.finitions) {
    return <p>Données sur les finitions non disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {product.features.finitions.map((finition: any, index: number) => (
        <Card key={index} className="overflow-hidden group">
          <CardHeader className="p-0">
            <div className="relative aspect-square">
              <Image
                src={finition.image.src}
                alt={finition.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={finition.image.aiHint}
              />
            </div>
          </CardHeader>
          <CardContent className="p-4 bg-secondary">
            <CardTitle className="text-lg">{finition.name}</CardTitle>
            <p className="text-muted-foreground">{finition.length}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

    