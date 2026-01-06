
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function FinitionsProduct({ product }: { product: any }) {
    if (!product || !product.features || !product.features.finitions) return <p>Données produit non disponibles.</p>;

    const { finitions } = product.features;

    return (
        <div>
            <div className="border-l-8 border-accent pl-4 mb-6">
                <h1 className="text-2xl font-bold text-accent uppercase">
                    {product.title}
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {finitions.map((item: any, index: number) => (
                    <Card key={index} className="overflow-hidden group">
                        <CardHeader className="p-0">
                            <div className="relative aspect-square">
                                <Image 
                                    src={item.image.src}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={item.image.aiHint}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 bg-secondary">
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <p className="text-muted-foreground">{item.length}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

