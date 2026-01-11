/**
 * Store Locations Configuration
 * Physical stores across Algeria with POS systems
 */

import { StoreLocation } from '@/types/ecommerce';

export const storeLocations: StoreLocation[] = [
  {
    id: 'store-001',
    name: 'BORDJ Home Appliances - Alger Centre',
    address: 'Boulevard Mohamed V, Alger Centre',
    wilaya: 'Alger',
    phone: '+213 23 45 67 89',
    email: 'alger@bordj-appliances.dz',
    coordinates: {
      lat: 36.7538,
      lng: 3.0588,
    },
    openingHours: {
      'Dimanche': { open: '09:00', close: '18:00' },
      'Lundi': { open: '09:00', close: '18:00' },
      'Mardi': { open: '09:00', close: '18:00' },
      'Mercredi': { open: '09:00', close: '18:00' },
      'Jeudi': { open: '09:00', close: '18:00' },
      'Vendredi': { open: 'Fermé', close: 'Fermé' },
      'Samedi': { open: '09:00', close: '13:00' },
    },
    stock: {
      'ref-001': 15,
      'ref-002': 8,
      'wash-001': 10,
      'wash-002': 5,
      'ac-001': 20,
      'oven-001': 12,
      'micro-001': 25,
      'tv-001': 18,
      'small-001': 45,
    },
    isPOS: true,
  },
  {
    id: 'store-002',
    name: 'BORDJ Home Appliances - Oran',
    address: 'Avenue de l\'ANP, Oran',
    wilaya: 'Oran',
    phone: '+213 41 23 45 67',
    email: 'oran@bordj-appliances.dz',
    coordinates: {
      lat: 35.6976,
      lng: -0.6337,
    },
    openingHours: {
      'Dimanche': { open: '09:00', close: '18:00' },
      'Lundi': { open: '09:00', close: '18:00' },
      'Mardi': { open: '09:00', close: '18:00' },
      'Mercredi': { open: '09:00', close: '18:00' },
      'Jeudi': { open: '09:00', close: '18:00' },
      'Vendredi': { open: 'Fermé', close: 'Fermé' },
      'Samedi': { open: '09:00', close: '13:00' },
    },
    stock: {
      'ref-001': 12,
      'ref-002': 10,
      'wash-001': 8,
      'wash-002': 6,
      'ac-001': 18,
      'oven-001': 9,
      'micro-001': 22,
      'tv-001': 15,
      'small-001': 38,
    },
    isPOS: true,
  },
  {
    id: 'store-003',
    name: 'BORDJ Home Appliances - Constantine',
    address: 'Rue Larbi Ben M\'hidi, Constantine',
    wilaya: 'Constantine',
    phone: '+213 31 45 67 89',
    email: 'constantine@bordj-appliances.dz',
    coordinates: {
      lat: 36.3650,
      lng: 6.6147,
    },
    openingHours: {
      'Dimanche': { open: '09:00', close: '18:00' },
      'Lundi': { open: '09:00', close: '18:00' },
      'Mardi': { open: '09:00', close: '18:00' },
      'Mercredi': { open: '09:00', close: '18:00' },
      'Jeudi': { open: '09:00', close: '18:00' },
      'Vendredi': { open: 'Fermé', close: 'Fermé' },
      'Samedi': { open: '09:00', close: '13:00' },
    },
    stock: {
      'ref-001': 10,
      'ref-002': 7,
      'wash-001': 6,
      'wash-002': 4,
      'ac-001': 15,
      'oven-001': 7,
      'micro-001': 18,
      'tv-001': 12,
      'small-001': 30,
    },
    isPOS: true,
  },
  {
    id: 'store-004',
    name: 'BORDJ Home Appliances - Annaba',
    address: 'Boulevard de la Révolution, Annaba',
    wilaya: 'Annaba',
    phone: '+213 38 12 34 56',
    email: 'annaba@bordj-appliances.dz',
    coordinates: {
      lat: 36.9000,
      lng: 7.7667,
    },
    openingHours: {
      'Dimanche': { open: '09:00', close: '18:00' },
      'Lundi': { open: '09:00', close: '18:00' },
      'Mardi': { open: '09:00', close: '18:00' },
      'Mercredi': { open: '09:00', close: '18:00' },
      'Jeudi': { open: '09:00', close: '18:00' },
      'Vendredi': { open: 'Fermé', close: 'Fermé' },
      'Samedi': { open: '09:00', close: '13:00' },
    },
    stock: {
      'ref-001': 8,
      'ref-002': 5,
      'wash-001': 5,
      'wash-002': 3,
      'ac-001': 12,
      'oven-001': 6,
      'micro-001': 15,
      'tv-001': 10,
      'small-001': 25,
    },
    isPOS: true,
  },
  {
    id: 'store-005',
    name: 'BORDJ Home Appliances - Sétif',
    address: 'Avenue de l\'Indépendance, Sétif',
    wilaya: 'Sétif',
    phone: '+213 36 78 90 12',
    email: 'setif@bordj-appliances.dz',
    coordinates: {
      lat: 36.1905,
      lng: 5.4133,
    },
    openingHours: {
      'Dimanche': { open: '09:00', close: '18:00' },
      'Lundi': { open: '09:00', close: '18:00' },
      'Mardi': { open: '09:00', close: '18:00' },
      'Mercredi': { open: '09:00', close: '18:00' },
      'Jeudi': { open: '09:00', close: '18:00' },
      'Vendredi': { open: 'Fermé', close: 'Fermé' },
      'Samedi': { open: '09:00', close: '13:00' },
    },
    stock: {
      'ref-001': 6,
      'ref-002': 4,
      'wash-001': 4,
      'wash-002': 2,
      'ac-001': 10,
      'oven-001': 5,
      'micro-001': 12,
      'tv-001': 8,
      'small-001': 20,
    },
    isPOS: true,
  },
];

/**
 * Get store location by ID
 */
export function getStoreById(id: string): StoreLocation | undefined {
  return storeLocations.find(store => store.id === id);
}

/**
 * Get stores by wilaya
 */
export function getStoresByWilaya(wilaya: string): StoreLocation[] {
  return storeLocations.filter(store => store.wilaya.toLowerCase() === wilaya.toLowerCase());
}

/**
 * Get stock availability for a product across all stores
 */
export function getProductStockByStores(productId: string): Array<{
  store: StoreLocation;
  quantity: number;
}> {
  return storeLocations
    .map(store => ({
      store,
      quantity: store.stock[productId] || 0,
    }))
    .filter(item => item.quantity > 0);
}

/**
 * Check if product is available in any store
 */
export function isProductAvailableInStores(productId: string): boolean {
  return storeLocations.some(store => (store.stock[productId] || 0) > 0);
}

/**
 * Get total stock for a product across all stores
 */
export function getTotalProductStock(productId: string): number {
  return storeLocations.reduce((total, store) => {
    return total + (store.stock[productId] || 0);
  }, 0);
}
