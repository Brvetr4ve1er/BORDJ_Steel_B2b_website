/**
 * Dashboard Content Component
 * Main dashboard view with key metrics and management options
 */

'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sampleProducts } from '@/config/products';
import { storeLocations, getTotalProductStock } from '@/config/stores';
import { 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  Users, 
  DollarSign,
  MapPin,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function DashboardContent() {
  // Calculate metrics
  const totalProducts = sampleProducts.length;
  const inStockProducts = sampleProducts.filter(p => p.inStock).length;
  const totalStores = storeLocations.length;
  
  // Calculate total inventory value
  const totalInventoryValue = sampleProducts.reduce((sum, product) => {
    const stock = getTotalProductStock(product.id);
    return sum + (product.price * stock);
  }, 0);

  // Mock data for orders
  const todayOrders = 12;
  const pendingOrders = 8;
  const totalRevenue = 2450000; // DZD

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Tableau de bord
          </h1>
          <p className="text-gray-600 mt-1">
            Vue d'ensemble de votre plateforme e-commerce
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Today's Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Commandes du jour
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayOrders}</div>
              <p className="text-xs text-green-600 mt-1">
                +{pendingOrders} en attente
              </p>
            </CardContent>
          </Card>

          {/* Total Revenue */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Chiffre d'affaires
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalRevenue.toLocaleString()} د.ج
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Ce mois-ci
              </p>
            </CardContent>
          </Card>

          {/* Products in Stock */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Produits en stock
              </CardTitle>
              <Package className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inStockProducts}/{totalProducts}
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Valeur: {totalInventoryValue.toLocaleString()} د.ج
              </p>
            </CardContent>
          </Card>

          {/* Store Locations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Magasins actifs
              </CardTitle>
              <MapPin className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStores}</div>
              <p className="text-xs text-gray-600 mt-1">
                À travers l'Algérie
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="inventory">Inventaire</TabsTrigger>
            <TabsTrigger value="analytics">Analytiques</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Nouvelle commande #1234</p>
                        <p className="text-xs text-gray-600">Il y a 5 minutes</p>
                      </div>
                      <Badge variant="outline">25,000 د.ج</Badge>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Package className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Stock mis à jour</p>
                        <p className="text-xs text-gray-600">Il y a 1 heure</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Stock faible détecté</p>
                        <p className="text-xs text-gray-600">Il y a 2 heures</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Low Stock Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Alertes de stock</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sampleProducts.slice(0, 5).map((product) => {
                      const stock = getTotalProductStock(product.id);
                      const isLow = stock < 20;
                      
                      return isLow ? (
                        <div key={product.id} className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-gray-600">{product.brand}</p>
                          </div>
                          <Badge variant={stock < 10 ? 'destructive' : 'secondary'}>
                            {stock} restants
                          </Badge>
                        </div>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>La gestion des commandes sera intégrée avec Shopify</p>
                  <p className="text-sm mt-2">Synchronisation en temps réel des commandes</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Inventaire par magasin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {storeLocations.map((store) => {
                    const storeStock = Object.values(store.stock).reduce((sum, qty) => sum + qty, 0);
                    
                    return (
                      <div key={store.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{store.name}</h4>
                          <Badge variant="outline">{storeStock} articles</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{store.wilaya}</p>
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-xs text-gray-600">
                            {Object.keys(store.stock).length} produits différents
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytiques & Rapports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Graphiques et statistiques détaillées</p>
                  <p className="text-sm mt-2">Ventes, conversions, et tendances</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
