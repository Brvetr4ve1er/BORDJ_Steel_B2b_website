/**
 * Store Locations Content Component
 * Interactive map and list of store locations
 */

'use client';

import React, { useState } from 'react';
import { storeLocations } from '@/config/stores';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function StoreLocationsContent() {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Nos Magasins
          </h1>
          <p className="text-gray-600">
            Trouvez le magasin le plus proche de chez vous
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {storeLocations.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Magasins en Algérie
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {storeLocations.filter(s => s.isPOS).length}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Points de vente POS
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {new Set(storeLocations.map(s => s.wilaya)).size}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Wilayas couvertes
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Store List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {storeLocations.map((store) => (
            <Card
              key={store.id}
              className={`cursor-pointer transition-shadow ${
                selectedStore === store.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedStore(store.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{store.name}</CardTitle>
                  {store.isPOS && (
                    <Badge variant="secondary" className="ml-2">
                      POS
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{store.address}</p>
                    <p className="text-sm text-gray-600">Wilaya de {store.wilaya}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <a
                    href={`tel:${store.phone}`}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {store.phone}
                  </a>
                </div>

                {/* Email */}
                {store.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <a
                      href={`mailto:${store.email}`}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {store.email}
                    </a>
                  </div>
                )}

                {/* Opening Hours */}
                <div className="pt-4 border-t">
                  <div className="flex items-start gap-3 mb-2">
                    <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="font-medium text-gray-900">Horaires d'ouverture</span>
                  </div>
                  <div className="ml-8 space-y-1 text-sm">
                    {Object.entries(store.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="text-gray-600">{day}</span>
                        <span className="text-gray-900 font-medium">
                          {hours.open === 'Fermé' ? (
                            <span className="text-red-600">Fermé</span>
                          ) : (
                            `${hours.open} - ${hours.close}`
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stock Info */}
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Produits en stock: {Object.keys(store.stock).length}
                  </p>
                  <p className="text-xs text-gray-600">
                    Total articles: {Object.values(store.stock).reduce((sum, qty) => sum + qty, 0)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map Integration Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Carte interactive
          </h3>
          <p className="text-blue-800">
            Une carte interactive de l'Algérie avec tous nos magasins sera affichée ici.
            Utilisez le package react-algeria-map déjà installé pour l'intégration.
          </p>
        </div>
      </div>
    </div>
  );
}
