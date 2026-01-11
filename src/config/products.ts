/**
 * Sample Product Catalog for Home Appliances
 * Products with Algerian Dinar pricing
 */

import { Product, ProductCategory } from '@/types/ecommerce';

export const sampleProducts: Product[] = [
  // Refrigerators
  {
    id: 'ref-001',
    name: 'Réfrigérateur CONDOR 450L No Frost',
    description: 'Réfrigérateur double porte avec technologie No Frost, classe énergétique A+',
    category: ProductCategory.REFRIGERATORS,
    brand: 'CONDOR',
    model: 'CRF-450NF',
    sku: 'REF-CONDOR-450',
    price: 89990,
    discountPrice: 79990,
    images: [
      'https://placehold.co/600x800/e3e3e3/333?text=CONDOR+Fridge',
    ],
    specifications: {
      'Capacité': '450 litres',
      'Type': 'No Frost',
      'Classe énergétique': 'A+',
      'Dimensions': '180 x 70 x 65 cm',
      'Couleur': 'Inox',
    },
    inStock: true,
    stockQuantity: 45,
    rating: 4.5,
    reviewCount: 128,
    tags: ['no-frost', 'economique', 'grande-capacite'],
    warranty: '2 ans',
    energyRating: 'A+',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: 'ref-002',
    name: 'Réfrigérateur ENIEM 380L',
    description: 'Réfrigérateur combiné avec congélateur, fabrication algérienne',
    category: ProductCategory.REFRIGERATORS,
    brand: 'ENIEM',
    model: 'EN-380C',
    sku: 'REF-ENIEM-380',
    price: 65990,
    images: [
      'https://placehold.co/600x800/e3e3e3/333?text=ENIEM+Fridge',
    ],
    specifications: {
      'Capacité': '380 litres',
      'Type': 'Combiné',
      'Classe énergétique': 'A',
      'Dimensions': '175 x 65 x 60 cm',
      'Couleur': 'Blanc',
    },
    inStock: true,
    stockQuantity: 32,
    rating: 4.2,
    reviewCount: 89,
    tags: ['fabrication-locale', 'economique'],
    warranty: '2 ans',
    energyRating: 'A',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-12-05'),
  },
  
  // Washing Machines
  {
    id: 'wash-001',
    name: 'Lave-linge CONDOR 8KG',
    description: 'Machine à laver automatique, 1200 tours/min, 16 programmes',
    category: ProductCategory.WASHING_MACHINES,
    brand: 'CONDOR',
    model: 'CL-8KG-1200',
    sku: 'WASH-CONDOR-8KG',
    price: 54990,
    discountPrice: 49990,
    images: [
      'https://placehold.co/600x800/e3e3e3/333?text=CONDOR+Washing',
    ],
    specifications: {
      'Capacité': '8 kg',
      'Vitesse essorage': '1200 tr/min',
      'Programmes': '16',
      'Classe énergétique': 'A++',
      'Dimensions': '85 x 60 x 55 cm',
    },
    inStock: true,
    stockQuantity: 28,
    rating: 4.6,
    reviewCount: 156,
    tags: ['economie-eau', 'haute-performance'],
    warranty: '2 ans',
    energyRating: 'A++',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-11-28'),
  },
  {
    id: 'wash-002',
    name: 'Lave-linge IRIS 7KG',
    description: 'Machine à laver hublot, économique et fiable',
    category: ProductCategory.WASHING_MACHINES,
    brand: 'IRIS',
    model: 'IR-7KG-1000',
    sku: 'WASH-IRIS-7KG',
    price: 42990,
    images: [
      'https://placehold.co/600x800/e3e3e3/333?text=IRIS+Washing',
    ],
    specifications: {
      'Capacité': '7 kg',
      'Vitesse essorage': '1000 tr/min',
      'Programmes': '12',
      'Classe énergétique': 'A+',
      'Dimensions': '85 x 60 x 50 cm',
    },
    inStock: true,
    stockQuantity: 18,
    rating: 4.3,
    reviewCount: 67,
    tags: ['economique', 'compact'],
    warranty: '1 an',
    energyRating: 'A+',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-12-02'),
  },

  // Air Conditioners
  {
    id: 'ac-001',
    name: 'Climatiseur CONDOR 12000 BTU',
    description: 'Climatiseur split inverter, économie d\'énergie, silencieux',
    category: ProductCategory.AIR_CONDITIONERS,
    brand: 'CONDOR',
    model: 'CC-12INV',
    sku: 'AC-CONDOR-12K',
    price: 69990,
    discountPrice: 64990,
    images: [
      'https://placehold.co/600x800/e3e3e3/333?text=CONDOR+AC',
    ],
    specifications: {
      'Capacité': '12000 BTU',
      'Type': 'Split Inverter',
      'Classe énergétique': 'A++',
      'Surface': '25-30 m²',
      'Niveau sonore': '24 dB',
      'Fonction': 'Chaud/Froid',
    },
    inStock: true,
    stockQuantity: 52,
    rating: 4.7,
    reviewCount: 203,
    tags: ['inverter', 'economique', 'silencieux'],
    warranty: '3 ans',
    energyRating: 'A++',
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date('2024-12-10'),
  },

  // Ovens
  {
    id: 'oven-001',
    name: 'Four électrique ENIEM 60cm',
    description: 'Cuisinière 4 feux avec four électrique, grill',
    category: ProductCategory.OVENS,
    brand: 'ENIEM',
    model: 'EN-60F4',
    sku: 'OVEN-ENIEM-60',
    price: 38990,
    images: [
      'https://placehold.co/600x800/e3e3e3/333?text=ENIEM+Oven',
    ],
    specifications: {
      'Largeur': '60 cm',
      'Feux': '4 feux gaz',
      'Capacité four': '56 litres',
      'Fonctions': 'Grill électrique',
      'Couleur': 'Inox',
    },
    inStock: true,
    stockQuantity: 24,
    rating: 4.4,
    reviewCount: 91,
    tags: ['fabrication-locale', 'robuste'],
    warranty: '2 ans',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-11-30'),
  },

  // Microwaves
  {
    id: 'micro-001',
    name: 'Micro-ondes CONDOR 28L',
    description: 'Four micro-ondes avec grill, 900W',
    category: ProductCategory.MICROWAVES,
    brand: 'CONDOR',
    model: 'CM-28G',
    sku: 'MICRO-CONDOR-28',
    price: 15990,
    discountPrice: 13990,
    images: [
      'https://placehold.co/600x800/e3e3e3/333?text=CONDOR+Microwave',
    ],
    specifications: {
      'Capacité': '28 litres',
      'Puissance': '900W',
      'Fonctions': 'Micro-ondes + Grill',
      'Programmes': '8 auto-cuisson',
      'Couleur': 'Noir',
    },
    inStock: true,
    stockQuantity: 67,
    rating: 4.5,
    reviewCount: 142,
    tags: ['compact', 'multifonction'],
    warranty: '1 an',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-12-08'),
  },

  // TV & Audio
  {
    id: 'tv-001',
    name: 'Téléviseur CONDOR 43" LED Smart TV',
    description: 'Smart TV Full HD avec WiFi, Android TV',
    category: ProductCategory.TV_AUDIO,
    brand: 'CONDOR',
    model: 'TV-43SMART',
    sku: 'TV-CONDOR-43',
    price: 54990,
    images: [
      'https://placehold.co/600x800/e3e3e3/333?text=CONDOR+TV+43',
    ],
    specifications: {
      'Taille': '43 pouces (109 cm)',
      'Résolution': 'Full HD 1920x1080',
      'Système': 'Android TV',
      'Connectivité': 'WiFi, Bluetooth',
      'Ports': '3 HDMI, 2 USB',
    },
    inStock: true,
    stockQuantity: 38,
    rating: 4.6,
    reviewCount: 187,
    tags: ['smart-tv', 'wifi', 'android'],
    warranty: '2 ans',
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-12-12'),
  },

  // Small Appliances
  {
    id: 'small-001',
    name: 'Bouilloire électrique IRIS 1.7L',
    description: 'Bouilloire en inox, arrêt automatique, 2200W',
    category: ProductCategory.SMALL_APPLIANCES,
    brand: 'IRIS',
    model: 'IR-KET-17',
    sku: 'SMALL-IRIS-KET',
    price: 3990,
    images: [
      'https://placehold.co/600x800/e3e3e3/333?text=IRIS+Kettle',
    ],
    specifications: {
      'Capacité': '1.7 litres',
      'Puissance': '2200W',
      'Matériau': 'Inox',
      'Fonctions': 'Arrêt automatique',
    },
    inStock: true,
    stockQuantity: 120,
    rating: 4.3,
    reviewCount: 78,
    tags: ['petit-electromenager', 'inox'],
    warranty: '1 an',
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-12-01'),
  },
];

/**
 * Get products by category
 */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return sampleProducts.filter(product => product.category === category);
}

/**
 * Get product by ID
 */
export function getProductById(id: string): Product | undefined {
  return sampleProducts.find(product => product.id === id);
}

/**
 * Get featured products (with discounts)
 */
export function getFeaturedProducts(): Product[] {
  return sampleProducts.filter(product => product.discountPrice !== undefined);
}

/**
 * Search products by name or description
 */
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return sampleProducts.filter(
    product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.brand.toLowerCase().includes(lowerQuery)
  );
}
