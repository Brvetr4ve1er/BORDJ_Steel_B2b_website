# BORDJ Home Appliances - E-commerce Platform

A modern B2B/B2C e-commerce platform for home appliances in Algeria, built with Next.js 15, TypeScript, and integrated with Shopify.

## 🏪 Platform Overview

This platform transforms the BORDJ Steel website into a comprehensive e-commerce solution for home appliances, featuring:

- **Product Catalog**: Browse refrigerators, washing machines, air conditioners, TVs, and more
- **Shopping Cart**: Real-time cart management with localStorage persistence
- **Monthly Payment Plans**: Credit options from 3 to 24 months
- **Multi-Store Support**: 5 physical locations across Algeria with POS systems
- **Stock Management**: Real-time inventory tracking per store location
- **Progressive Web App (PWA)**: Install on mobile and desktop for native-like experience
- **Shopify Integration**: Seamless order management and fulfillment

## 💰 Currency & Payments

All prices are in **Algerian Dinar (DZD)** with the following features:

- Standard retail pricing
- Promotional discounts
- 19% VAT included
- Free shipping over 50,000 DZD
- Monthly payment plans with transparent interest rates

### Payment Plans Available:

| Duration | Down Payment | Interest Rate |
|----------|--------------|---------------|
| 3 months | 30% | 0% |
| 6 months | 25% | 3% |
| 12 months | 20% | 5% |
| 24 months | 20% | 8% |

## 🗺️ Store Locations

### Currently Serving:

1. **Alger Centre** - Boulevard Mohamed V
2. **Oran** - Avenue de l'ANP
3. **Constantine** - Rue Larbi Ben M'hidi
4. **Annaba** - Boulevard de la Révolution
5. **Sétif** - Avenue de l'Indépendance

All stores feature:
- POS systems for in-store purchases
- Real-time stock visibility
- Product demonstrations
- Expert consultations

## 🛍️ Product Categories

- **Réfrigérateurs** - Refrigerators (No Frost, Combined)
- **Lave-linge** - Washing Machines (7-8 kg capacity)
- **Climatiseurs** - Air Conditioners (Inverter, Split)
- **Fours** - Ovens (Electric, Gas)
- **Micro-ondes** - Microwaves
- **TV & Audio** - Smart TVs and Entertainment
- **Petit électroménager** - Small Appliances

### Featured Brands:
- CONDOR (Algeria)
- ENIEM (Algeria)
- IRIS (Algeria)
- And more international brands

## 🔧 Technical Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **PWA**: next-pwa

### Backend & Services
- **Order Management**: Shopify Storefront API
- **Product Sync**: Shopify Admin API
- **Hosting**: Firebase App Hosting
- **State Management**: React Context API
- **Storage**: localStorage (cart), Firebase (future)

### Key Features
- Server-Side Rendering (SSR)
- Static Generation (SSG) where applicable
- PWA with offline support
- Responsive design (mobile-first)
- SEO optimized
- Accessibility compliant

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── shop/                     # Product catalog pages
│   │   ├── page.tsx              # Main shop page
│   │   └── products/[id]/        # Product detail pages
│   ├── stores/                   # Store locations
│   └── layout.tsx                # Root layout with PWA
├── components/
│   ├── ecommerce/                # E-commerce specific components
│   │   ├── product-card.tsx      # Product display card
│   │   ├── cart-button.tsx       # Cart icon with count
│   │   ├── cart-drawer.tsx       # Sliding cart panel
│   │   ├── shop-page-content.tsx # Product listing with filters
│   │   └── product-detail-content.tsx
│   └── ui/                       # Reusable UI components
├── contexts/
│   └── cart-context.tsx          # Shopping cart state management
├── config/
│   ├── products.ts               # Sample product catalog
│   └── stores.ts                 # Store locations data
├── lib/
│   └── payment-calculator.ts    # Monthly payment calculations
├── services/
│   └── shopify.ts               # Shopify API integration
└── types/
    └── ecommerce.ts             # TypeScript definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Shopify account (for order management)
- Firebase project (for hosting)

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Configure environment variables (see below)
nano .env.local

# Run development server
npm run dev
```

The app will be available at `http://localhost:9002`

### Environment Variables

```env
# Shopify Configuration
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token
SHOPIFY_ADMIN_ACCESS_TOKEN=your_admin_token

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# ... (see .env.local.example for full list)

# Application
NEXT_PUBLIC_APP_URL=http://localhost:9002
NEXT_PUBLIC_CURRENCY=DZD
```

## 🛒 Shopping Flow

1. **Browse Products**: Visit `/shop` to see all products
2. **Filter & Search**: Use category filters and search
3. **View Details**: Click product for full specifications
4. **Add to Cart**: Select quantity and add to cart
5. **Review Cart**: Click cart icon to review items
6. **Checkout**: Proceed to checkout (to be implemented)
7. **Choose Payment**: Select cash, card, or monthly plan
8. **Confirm Order**: Order synced with Shopify

## 📱 PWA Features

The platform is a Progressive Web App with:

- **Installable**: Add to home screen on mobile/desktop
- **Offline Ready**: Service worker for offline browsing
- **Fast Loading**: Optimized assets and caching
- **App-like Experience**: Full-screen mode available

### Install Instructions:

**Mobile (Android/iOS)**:
1. Open in Chrome/Safari
2. Tap "Add to Home Screen"
3. Launch from home screen

**Desktop (Chrome/Edge)**:
1. Look for install icon in address bar
2. Click "Install"
3. Use as standalone app

## 🔐 Security Features

- **HTTPS Only**: All connections encrypted
- **Input Validation**: Server-side validation
- **XSS Protection**: Content Security Policy headers
- **CSRF Protection**: Token-based forms
- **Secure Payments**: PCI DSS compliant integrations
- **Data Encryption**: Sensitive data encrypted at rest

## 🎯 Roadmap

### Phase 1: Foundation ✅
- [x] E-commerce data models
- [x] PWA configuration
- [x] Shopping cart system
- [x] Product catalog
- [x] Store locations
- [x] Payment calculator

### Phase 2: Core Features ✅
- [x] Product browsing
- [x] Search & filtering
- [x] Cart management
- [x] Product details
- [x] Store locator

### Phase 3: Checkout & Payments
- [ ] Checkout flow
- [ ] Payment gateway integration
- [ ] Order confirmation
- [ ] Email notifications
- [ ] Invoice generation

### Phase 4: Admin Dashboard
- [ ] Dashboard homepage
- [ ] Order management
- [ ] Inventory tracking
- [ ] Customer management
- [ ] Analytics & reports

### Phase 5: Advanced Features
- [ ] User authentication
- [ ] Order history
- [ ] Wishlist
- [ ] Product reviews
- [ ] Live chat support

## 🧪 Testing

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Build for production
npm run build

# Start production server
npm run start
```

## 📊 Analytics & Monitoring

Integration points for:
- Google Analytics 4
- Facebook Pixel
- Shopify Analytics
- Custom event tracking

## 🤝 Support & Contact

For technical support or business inquiries:
- Email: support@bordj-appliances.dz
- Phone: See store locations for local numbers
- Website: [Store Locations](/stores)

## 📄 License

This is a commercial project developed for BORDJ Home Appliances.
All rights reserved.

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Shopify](https://www.shopify.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)

---

**Note**: This platform is designed for the Algerian market with pricing in DZD and features tailored for local business practices including monthly payment plans and multi-store inventory management.
