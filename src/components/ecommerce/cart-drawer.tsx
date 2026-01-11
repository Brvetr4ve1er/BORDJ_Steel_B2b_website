/**
 * Shopping Cart Drawer Component
 * Slide-out cart with items, totals, and checkout
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/types/ecommerce';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeItem, updateQuantity } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Panier ({cart.items.length})</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full mt-6">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p>Votre panier est vide</p>
                <Button onClick={onClose} className="mt-4">
                  Continuer les achats
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 bg-white rounded flex-shrink-0">
                      <Image
                        src={item.product.images[0] || '/placeholder-product.png'}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.product.brand}
                      </p>
                      <p className="text-sm font-bold text-blue-600 mt-2">
                        {formatPrice(
                          item.product.discountPrice || item.product.price
                        )}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 ml-auto"
                          onClick={() => removeItem(item.productId)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cart.items.length > 0 && (
            <div className="border-t pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sous-total</span>
                <span className="font-medium">{formatPrice(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">TVA (19%)</span>
                <span className="font-medium">{formatPrice(cart.tax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Livraison</span>
                <span className="font-medium">
                  {cart.shipping === 0 ? 'Gratuite' : formatPrice(cart.shipping)}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg text-blue-600">
                  {formatPrice(cart.total)}
                </span>
              </div>

              {/* Checkout Button */}
              <Link href="/shop/checkout" onClick={onClose}>
                <Button className="w-full mt-4" size="lg">
                  Passer la commande
                </Button>
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
