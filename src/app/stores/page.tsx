/**
 * Store Locations Page
 * Shows all physical store locations with maps and stock information
 */

import React from 'react';
import { Metadata } from 'next';
import { StoreLocationsContent } from '@/components/ecommerce/store-locations-content';

export const metadata: Metadata = {
  title: 'Nos Magasins',
  description: 'Trouvez nos magasins d\'électroménager à travers l\'Algérie. Consultez les horaires et la disponibilité des produits.',
};

export default function StoresPage() {
  return <StoreLocationsContent />;
}
