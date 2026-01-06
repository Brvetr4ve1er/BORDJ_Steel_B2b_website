# Technical Report: BORDJ STEEL Repository

### 1. Source Folder Tree (`src/`)

```
/src
├── app/
│   ├── about/
│   ├── contact/
│   ├── media-center/
│   ├── products/
│   └── ... (6 total page routes)
├── components/
│   ├── contact/
│   ├── icons/
│   ├── pages/
│   ├── product-variants/
│   ├── sections/
│   ├── shared/
│   └── ui/
├── config/
├── hooks/
├── lib/
├── services/
└── ai/
```

### 2. Frameworks & Tooling

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI**: React, ShadCN UI
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Generative AI**: Genkit

### 3. Firebase Services

- **Firebase App Hosting**: Used for deployment.
- **Firestore & Auth**: Tooling is present but services are not actively used in the application.

### 4. Project Scale

- **Pages**: 12
- **Components**: ~65 (UI, sections, shared, etc.)
- **Services**: 1 (Firebase)

### 5. Known Technical Debt

- **Duplicated Logic in Product Variants**: Significant code duplication exists in `/src/components/product-variants/`. These need to be abstracted into a single generic component.
- **Hardcoded Content**: Static text and content are still largely hardcoded within components instead of being centralized in the `/src/config/` directory.
