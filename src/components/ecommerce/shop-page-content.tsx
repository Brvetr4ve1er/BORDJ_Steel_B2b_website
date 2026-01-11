/**
 * Shop Page Content Component
 * Main product catalog with filtering
 */

'use client';

import React, { useState } from 'react';
import { ProductCard } from './product-card';
import { sampleProducts } from '@/config/products';
import { ProductCategory } from '@/types/ecommerce';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  [ProductCategory.REFRIGERATORS]: 'Réfrigérateurs',
  [ProductCategory.WASHING_MACHINES]: 'Lave-linge',
  [ProductCategory.DISHWASHERS]: 'Lave-vaisselle',
  [ProductCategory.OVENS]: 'Fours',
  [ProductCategory.MICROWAVES]: 'Micro-ondes',
  [ProductCategory.AIR_CONDITIONERS]: 'Climatiseurs',
  [ProductCategory.WATER_HEATERS]: 'Chauffe-eau',
  [ProductCategory.COOKTOPS]: 'Plaques de cuisson',
  [ProductCategory.HOODS]: 'Hottes',
  [ProductCategory.SMALL_APPLIANCES]: 'Petit électroménager',
  [ProductCategory.TV_AUDIO]: 'TV & Audio',
};

export function ShopPageContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Filter products
  let filteredProducts = sampleProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case 'price-desc':
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'featured':
      default:
        // Featured: products with discounts first
        if (a.discountPrice && !b.discountPrice) return -1;
        if (!a.discountPrice && b.discountPrice) return 1;
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Électroménager
          </h1>
          <p className="text-gray-600">
            Découvrez notre large gamme de produits avec paiement mensuel
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">En vedette</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="name">Nom A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''}{' '}
          trouvé{filteredProducts.length !== 1 ? 's' : ''}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              variant="outline"
              className="mt-4"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
