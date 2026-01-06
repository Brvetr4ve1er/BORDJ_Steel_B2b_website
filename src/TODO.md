# Project TODO & Refactoring Tasks

This document lists the outstanding tasks required to improve the quality, performance, and maintainability of the BORDJ STEEL codebase. Several high-priority tasks have been completed.

## 1. High-Priority Refactoring

-   [ ] **Abstract Duplicated Product Variant Logic**
    -   **Goal**: Eliminate code duplication in the product display components. This is the highest-priority technical debt remaining.
    -   **Files**: All components within `/src/components/product-variants/`.
    -   **Action**: Create a single, generic `<ProductVariantDetails>` component that accepts product data as props. This component should dynamically render technical specifications, tables, and images based on the data provided, replacing specialized components like `CouvertureProduct`, `BardageProduct`, etc.

-   [ ] **Centralize Static Content**
    -   **Goal**: Move all hardcoded text, labels, and static data from components into the `/src/config/` directory.
    -   **Action**: Audit components and move string literals into `company-data.ts` or new, dedicated JSON files. This will make content updates easier and clean up the UI code.

## 2. Completed Tasks

The following major refactoring and optimization tasks have been completed:

-   [x] **Decompose Monolithic Page Components**: Large page files have been broken down into a standardized structure using `/pages` and `/sections` directories.
-   [x] **Optimize Use of Client Components**: The `"use client"` directive has been pushed down to leaf components, and Server Components are now used wherever possible.
-   [x] **Implement Dynamic Imports for All Page Sections**: All major page sections are now lazy-loaded with `next/dynamic` to improve initial load performance.
-   [x] **Standardize Page Structure**: A consistent pattern is now used where `app/**/page.tsx` dynamically imports its content from `/components/pages`.
-   [x] **Remove Unused Files & Imports**: The repository has been cleaned of dead code and unnecessary imports.

## 3. Documentation

-   [ ] **Component Storybook or Documentation**
    -   **Goal**: Document reusable components to improve developer experience.
    -   **Action**: Set up Storybook or a similar tool to create isolated examples and documentation for components in `/src/components/ui/` and `/src/components/shared/`.
