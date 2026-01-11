/**
 * Shop Page - Main Product Catalog
 * Displays all products with filtering and search
 */

import React from 'react';
import { Metadata } from 'next';
import { ShopPageContent } from '@/components/ecommerce/shop-page-content';

export const metadata: Metadata = {
  title: 'Boutique - Électroménager',
  description: 'Découvrez notre large gamme d\'électroménagers: réfrigérateurs, lave-linge, climatiseurs et plus. Paiement mensuel disponible.',
};

export default function ShopPage() {
  return <ShopPageContent />;
}
