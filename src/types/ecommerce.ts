/**
 * E-commerce Types for Home Appliances Platform
 * Currency: Algerian Dinar (DZD)
 */

// Product Categories for Home Appliances
export enum ProductCategory {
  REFRIGERATORS = 'refrigerators',
  WASHING_MACHINES = 'washing_machines',
  DISHWASHERS = 'dishwashers',
  OVENS = 'ovens',
  MICROWAVES = 'microwaves',
  AIR_CONDITIONERS = 'air_conditioners',
  WATER_HEATERS = 'water_heaters',
  COOKTOPS = 'cooktops',
  HOODS = 'hoods',
  SMALL_APPLIANCES = 'small_appliances',
  TV_AUDIO = 'tv_audio',
}

// Product Interface
export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  brand: string;
  model: string;
  sku: string;
  price: number; // Price in DZD
  discountPrice?: number; // Discounted price in DZD
  images: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  stockQuantity: number;
  stockByLocation?: Record<string, number>; // Stock per store location
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  warranty?: string;
  energyRating?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Shopping Cart Item
export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, string>;
}

// Shopping Cart
export interface ShoppingCart {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number; // In DZD
  tax: number; // In DZD
  shipping: number; // In DZD
  total: number; // In DZD
  createdAt: Date;
  updatedAt: Date;
}

// Store Location
export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  wilaya: string; // Algerian province
  phone: string;
  email?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: {
    [day: string]: {
      open: string;
      close: string;
    };
  };
  stock: Record<string, number>; // productId -> quantity
  isPOS: boolean; // Whether this location has POS system
}

// Order Status
export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

// Payment Method
export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer',
  MONTHLY_CREDIT = 'monthly_credit',
}

// Payment Plan for Monthly Credit
export interface PaymentPlan {
  id: string;
  orderId: string;
  totalAmount: number; // In DZD
  downPayment: number; // In DZD
  monthlyPayment: number; // In DZD
  numberOfMonths: number;
  interestRate: number; // Percentage
  startDate: Date;
  nextPaymentDate: Date;
  remainingBalance: number; // In DZD
  status: 'active' | 'completed' | 'defaulted';
  payments: Payment[];
}

// Individual Payment
export interface Payment {
  id: string;
  amount: number; // In DZD
  date: Date;
  method: PaymentMethod;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
}

// Order
export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  billingAddress: Address;
  items: CartItem[];
  subtotal: number; // In DZD
  tax: number; // In DZD
  shipping: number; // In DZD
  total: number; // In DZD
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentPlan?: PaymentPlan;
  shopifyOrderId?: string; // Integration with Shopify
  storeLocationId?: string; // If purchased from specific store
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  deliveryDate?: Date;
}

// Customer Address
export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  wilaya: string; // Algerian province
  postalCode?: string;
  country: string;
  phone: string;
}

// Customer/User
export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  addresses: Address[];
  orders: string[]; // Order IDs
  creditEligible: boolean;
  creditLimit?: number; // In DZD
  activePaymentPlans: string[]; // PaymentPlan IDs
  createdAt: Date;
  updatedAt: Date;
}

// Inventory Item
export interface InventoryItem {
  productId: string;
  storeLocationId: string;
  quantity: number;
  reservedQuantity: number; // Items in pending orders
  availableQuantity: number; // quantity - reservedQuantity
  lastRestocked?: Date;
  lowStockThreshold: number;
  isLowStock: boolean;
}

// Currency Configuration
export const CURRENCY_CONFIG = {
  code: 'DZD',
  symbol: 'د.ج',
  name: 'Algerian Dinar',
  decimalPlaces: 2,
};

// Format price in DZD
export function formatPrice(amount: number): string {
  return `${amount.toLocaleString('ar-DZ', {
    minimumFractionDigits: CURRENCY_CONFIG.decimalPlaces,
    maximumFractionDigits: CURRENCY_CONFIG.decimalPlaces,
  })} ${CURRENCY_CONFIG.symbol}`;
}
