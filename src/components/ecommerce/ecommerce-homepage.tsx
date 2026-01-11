/**
 * E-commerce Homepage Component
 * Landing page for home appliances store
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from './product-card';
import { getFeaturedProducts } from '@/config/products';
import { ArrowRight, ShoppingBag, MapPin, CreditCard, Shield } from 'lucide-react';

export function EcommerceHomepage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Électroménager de qualité pour votre maison
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Découvrez notre large gamme d'appareils électroménagers avec paiement mensuel et livraison gratuite
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop">
                <Button size="lg" variant="secondary">
                  Découvrir nos produits
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/stores">
                <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                  Nos magasins
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Large choix</h3>
              <p className="text-gray-600 text-sm">
                Plus de 100 produits en stock
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Paiement mensuel</h3>
              <p className="text-gray-600 text-sm">
                Jusqu'à 24 mois sans justificatif
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">5 magasins</h3>
              <p className="text-gray-600 text-sm">
                À travers l'Algérie
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Garantie 2-3 ans</h3>
              <p className="text-gray-600 text-sm">
                Sur tous nos produits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Offres spéciales
              </h2>
              <p className="text-gray-600">
                Profitez de nos promotions exclusives
              </p>
            </div>
            <Link href="/shop">
              <Button variant="outline">
                Voir tout
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Nos catégories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Réfrigérateurs', icon: '🧊' },
              { name: 'Lave-linge', icon: '🧺' },
              { name: 'Climatiseurs', icon: '❄️' },
              { name: 'Fours', icon: '🔥' },
              { name: 'Micro-ondes', icon: '📡' },
              { name: 'TV & Audio', icon: '📺' },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/shop?category=${category.name.toLowerCase()}`}
                className="bg-gray-50 hover:bg-blue-50 rounded-lg p-6 text-center transition-colors"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <div className="font-medium text-gray-900">{category.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Besoin d'aide pour choisir ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Nos experts sont à votre disposition pour vous conseiller
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary">
              Nous contacter
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
