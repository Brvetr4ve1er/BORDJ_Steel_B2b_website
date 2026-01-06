# Project TODO & Refactoring Tasks

This document lists the outstanding tasks required to improve the quality, performance, and maintainability of the BORDJ STEEL codebase.

## 1. High-Priority Refactoring

-   [ ] **Decompose Monolithic Page Components**
    -   **Goal**: Break down large page files into smaller, single-responsibility components.
    -   **Files**: `charpente-metallique-page.tsx`, `galvanisation-page-content.tsx`, `media-center/blog/page.tsx`, `recrutement/page.tsx`.
    -   **Action**: Create a dedicated folder for each page's sections (e.g., `src/components/pages/galvanisation/`) and move UI sections like `HeroSection`, `BenefitsSection` into their own files.

-   [ ] **Abstract Duplicated Product Variant Logic**
    -   **Goal**: Eliminate code duplication in the product display components.
    -   **Files**: `/src/components/product-variants/`.
    -   **Action**: Create a single generic `<ProductVariantDetails>` component that accepts product data as props and dynamically renders the technical specifications and tables. Remove the specialized components (`CouvertureProduct`, `BardageProduct`, etc.).

## 2. Performance Improvements

-   [ ] **Optimize Use of Client Components**
    -   **Goal**: Maximize the use of Next.js Server Components to reduce the client-side JavaScript bundle and improve initial page load speed.
    -   **Action**: Push the `"use client"` directive down to the smallest possible "leaf" components that are actually interactive. The `<AnimatedWrapper>` is a primary target; its usage should be isolated so that the static parent components can be rendered on the server.

-   [ ] **Implement Dynamic Imports for All Page Sections**
    -   **Goal**: Ensure that code for each major section of a page is only loaded when it is needed.
    -   **Action**: Verify that all top-level sections rendered by `home-page.tsx` and other primary pages are imported using `next/dynamic`. This will code-split each section into its own JavaScript chunk.

## 3. Code Cleanup & Housekeeping

-   [ ] **Remove Unused Files**
    -   **Goal**: Reduce repository clutter and eliminate dead code.
    -   **Files to Remove**:
        -   `src/context/language-context.tsx` (confirmed unused)
        -   `src/lib/logger.ts` (appears unused)
        -   `depcheck-report.json` (build artifact, add to `.gitignore`)

-   [ ] **Standardize Page Structure**
    -   **Goal**: Enforce a consistent pattern for creating pages.
    -   **Action**: For every route in `/src/app`, the corresponding `page.tsx` file should be minimal. It should import and render a single main component from a corresponding file in `/src/components/pages/`.

## 4. Documentation

-   [ ] **Component Storybook or Documentation**
    -   **Goal**: Document reusable components to improve developer experience.
    -   **Action**: Set up Storybook or a similar tool to create isolated examples and documentation for components in `/src/components/ui/`.

-   [ ] **Update `company-data.ts` and other configs**
    -   **Goal**: Ensure all static data is current and accurate.
    -   **Action**: Regularly review the contents of files in `/src/config/` to match the company's latest information.
