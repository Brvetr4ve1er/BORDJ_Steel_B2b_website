# Architecture Overview

This document provides a high-level overview of the BORDJ STEEL web application's architecture, including its folder structure and key design patterns.

## Folder Structure

The project follows a structure optimized for Next.js App Router development.

-   **/src/app/**: The core of the Next.js application. Each folder corresponds to a public URL route.
    -   `page.tsx`: A minimalist entry file for a route, which dynamically imports the main page component.
    -   `layout.tsx`: The root layout, applying global styles and fonts.
    -   `globals.css`: Global styles and Tailwind CSS theme configuration.

-   **/src/components/**: Contains all React components, organized by responsibility.
    -   **/pages/**: Home to top-level components that define the structure of an entire page (e.g., `home-page.tsx`). These are dynamically imported by `/src/app/**/page.tsx` files.
    -   **/sections/**: Contains major sections of a page (e.g., `Hero`, `Portfolio`, `ContactForm`). These are, in turn, dynamically imported by components in `/pages/`.
    -   **/shared/**: Reusable, application-specific components used across multiple pages (e.g., `AnimatedWrapper`).
    -   **/ui/**: Base UI elements provided by ShadCN UI (e.g., `Button`, `Card`).
    -   **/product-variants/**: Components specific to different product types. **(Note: This area still contains significant code duplication)**.

-   **/src/config/**: Stores static data, such as text content, navigation links, and product specifications, separating content from the UI code.

-   **/src/lib/**: Contains utility functions (`utils.ts`) and static JSON assets.

-   **/src/services/**: A dedicated layer for centralizing third-party service initializations, starting with Firebase.

-   **/public/**: Static assets like logos, documents, and images.

-   **/docs/**: Project-level documentation, including this file and the `TODO.md`.

## Key Design Patterns & Optimizations

1.  **Optimized Page Loading**:
    -   **Dynamic Imports**: All major page components and sections are loaded using `next/dynamic`. This code-splitting strategy ensures that users only download the JavaScript necessary for the page they are viewing, significantly improving initial load times.
    -   **Server Components by Default**: The architecture prioritizes Next.js Server Components. The `"use client"` directive is pushed down to the smallest possible "leaf" components that require interactivity, maximizing server-side rendering performance.

2.  **Centralized Service Layer**:
    -   External services, like Firebase, are initialized in the `/src/services` directory. This decouples UI components from service configuration and ensures that service instances are handled as singletons.

3.  **Consistent Page Structure**:
    -   A standardized pattern is enforced where each route's `page.tsx` is minimal. Its sole responsibility is to dynamically import and render the main content component from the `/src/components/pages/` directory.

## Known Technical Debt

1.  **Code Duplication in Product Variants**: The most significant remaining issue is the code duplication in `/src/components/product-variants/`. The components for different product types share nearly identical structures and should be refactored into a single, generic component that accepts product data as props.