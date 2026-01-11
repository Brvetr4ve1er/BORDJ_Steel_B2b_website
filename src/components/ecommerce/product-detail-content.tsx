/**
 * Product Detail Content Component
 * Full product information with images, specs, and purchase options
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/ecommerce';
import { formatPrice } from '@/types/ecommerce';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProductStockByStores } from '@/config/stores';
import { getAvailablePaymentPlans, formatDZD } from '@/lib/payment-calculator';
import {
  ShoppingCart,
  Star,
  Truck,
  Shield,
  CreditCard,
  MapPin,
  ChevronLeft,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductDetailContentProps {
  product: Product;
}

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  const displayPrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice !== undefined;
  const stockByStores = getProductStockByStores(product.id);
  const paymentPlans = getAvailablePaymentPlans(displayPrice);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: 'Produit ajouté',
      description: `${quantity}x ${product.name} ajouté au panier`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/shop" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Retour aux produits
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="relative bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="relative h-96 lg:h-[500px]">
                <Image
                  src={product.images[selectedImage] || '/placeholder-product.png'}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {hasDiscount && (
                  <Badge variant="destructive" className="text-sm">
                    -{Math.round(((product.price - displayPrice) / product.price) * 100)}%
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge variant="secondary">Rupture de stock</Badge>
                )}
              </div>
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 bg-white rounded border-2 flex-shrink-0 ${
                      selectedImage === index
                        ? 'border-blue-600'
                        : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Brand & Category */}
              <p className="text-sm text-gray-500 uppercase mb-2">
                {product.brand}
              </p>

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating!)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} avis)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b">
                <span className="text-4xl font-bold text-blue-600">
                  {formatPrice(displayPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Key Features */}
              <div className="space-y-3 mb-6">
                {product.energyRating && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Classe énergétique {product.energyRating}
                    </Badge>
                  </div>
                )}
                {product.warranty && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span>Garantie: {product.warranty}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-700">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span>Livraison gratuite au-dessus de 50,000 DZD</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Quantité</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full mb-4"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.inStock ? 'Ajouter au panier' : 'Indisponible'}
              </Button>

              {/* Payment Plans Preview */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Paiement mensuel disponible</span>
                </div>
                <p className="text-sm text-gray-700">
                  À partir de{' '}
                  <span className="font-bold text-blue-600">
                    {formatDZD(paymentPlans[0].calculation.monthlyPayment)}
                  </span>
                  /mois sur {paymentPlans[0].plan.months} mois
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <Tabs defaultValue="specs">
            <TabsList>
              <TabsTrigger value="specs">Spécifications</TabsTrigger>
              <TabsTrigger value="payment">Plans de paiement</TabsTrigger>
              <TabsTrigger value="stock">Disponibilité</TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Caractéristiques techniques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b pb-3">
                    <dt className="text-sm text-gray-600">{key}</dt>
                    <dd className="text-base font-medium text-gray-900 mt-1">{value}</dd>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="payment" className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Plans de paiement disponibles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentPlans.map((planData, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-2">{planData.plan.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Apport initial ({planData.plan.downPayment}%)</span>
                        <span className="font-medium">
                          {formatDZD(planData.calculation.downPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Paiement mensuel</span>
                        <span className="font-bold text-blue-600">
                          {formatDZD(planData.calculation.monthlyPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total à payer</span>
                        <span className="font-medium">
                          {formatDZD(planData.calculation.totalPayable)}
                        </span>
                      </div>
                      {planData.calculation.totalInterest > 0 && (
                        <div className="flex justify-between text-gray-600">
                          <span>Intérêts totaux</span>
                          <span>{formatDZD(planData.calculation.totalInterest)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stock" className="mt-6">
              <h3 className="text-xl font-semibold mb-4">
                Disponibilité en magasin
              </h3>
              {stockByStores.length > 0 ? (
                <div className="space-y-3">
                  {stockByStores.map(({ store, quantity }) => (
                    <div key={store.id} className="flex items-start gap-3 border rounded-lg p-4">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{store.name}</h4>
                        <p className="text-sm text-gray-600">{store.address}</p>
                        <p className="text-sm text-gray-600">
                          Tél: {store.phone}
                        </p>
                        <p className="text-sm font-medium text-green-600 mt-2">
                          {quantity} en stock
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  Ce produit n'est actuellement disponible dans aucun magasin.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
