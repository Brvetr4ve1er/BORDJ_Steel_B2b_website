/**
 * Product Card Component
 * Displays a single product with image, details, and add to cart
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/ecommerce';
import { formatPrice } from '@/types/ecommerce';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    toast({
      title: 'Produit ajouté',
      description: `${product.name} a été ajouté au panier`,
    });
  };

  const displayPrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice !== undefined;

  return (
    <Link href={`/shop/products/${product.id}`}>
      <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Product Image */}
        <div className="relative h-64 bg-gray-100 overflow-hidden">
          <Image
            src={product.images[0] || '/placeholder-product.png'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {hasDiscount && (
              <Badge variant="destructive" className="text-xs">
                -{Math.round(((product.price - displayPrice) / product.price) * 100)}%
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary" className="text-xs">
                Rupture de stock
              </Badge>
            )}
          </div>

          {/* Energy Rating */}
          {product.energyRating && (
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className="bg-green-100 text-green-800 text-xs">
                {product.energyRating}
              </Badge>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Brand */}
          <p className="text-xs text-gray-500 uppercase mb-1">{product.brand}</p>
          
          {/* Product Name */}
          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating!)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">
                ({product.reviewCount})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-blue-600">
              {formatPrice(displayPrice)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {product.inStock ? 'Ajouter au panier' : 'Indisponible'}
          </Button>
        </div>
      </div>
    </Link>
  );
}
