/**
 * Product Detail Page
 * Displays detailed information about a single product
 */

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById } from '@/config/products';
import { ProductDetailContent } from '@/components/ecommerce/product-detail-content';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductById(params.id);

  if (!product) {
    return {
      title: 'Produit non trouvé',
    };
  }

  return {
    title: `${product.name} - ${product.brand}`,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailContent product={product} />;
}
