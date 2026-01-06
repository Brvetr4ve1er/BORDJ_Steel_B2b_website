# Architecture Overview

This document provides a high-level overview of the BORDJ STEEL web application's architecture, including folder structure, key design patterns, and identified technical debt.

## Folder Structure

-   **/src/app/**: The core of the Next.js application, using the App Router paradigm. Each folder within corresponds to a public URL route (e.g., `/src/app/products/charpente-metallique` maps to `/products/charpente-metallique`).
    -   `layout.tsx`: The root layout, which applies to all pages.
    -   `globals.css`: Global styles and Tailwind CSS theme configuration.
    -   `page.tsx`: The entry file for a specific route.

-   **/src/components/**: Contains all React components.
    -   `/ui/`: Houses the base components provided by ShadCN UI (e.g., `Button`, `Card`).
    -   `/product-variants/`: Contains components specific to different product types. **(Note: High level of code duplication here)**.
    -   Other files are application-specific components (e.g., `navbar.tsx`, `footer.tsx`).

-   **/src/config/**: Stores static data, such as text content, navigation links, and product specifications, separating content from the UI code.

-   **/src/lib/**: Contains utility functions (`utils.ts`) and static JSON assets (`algeria-wilayas.json`).

-   **/src/hooks/**: Home to custom React hooks used across the application (e.g., `use-breakpoint.ts`).

-   **/src/ai/**: Holds all code related to the Genkit framework for generative AI features.

-   **/public/**: Contains static assets like logos and placeholder images that are served directly.

## Firebase Services

-   **Firebase App Hosting**: The primary service used for building and deploying the Next.js application. Configuration is managed in `apphosting.yaml` and `firebase.json`.
-   **Firestore & Firebase Auth**: The project has tooling and setup hooks available for these services, but as of the last audit, they are not actively integrated or used in the application.

## Known Technical Debt & Architectural Issues

1.  **Monolithic Component Structure**: Many pages and components are designed as large, monolithic files that handle multiple responsibilities (e.g., `galvanisation-page-content.tsx`, `charpente-metallique-page.tsx`). This violates the single-responsibility principle and makes maintenance difficult.

2.  **Overuse of Client Components**: The application heavily relies on `"use client"` directives, often at the top level of a page's component tree. This is primarily driven by the use of the `<AnimatedWrapper>` for animations, forcing entire sections to be rendered on the client-side and negating many of the performance benefits of Next.js Server Components.

3.  **Code Duplication**: There is significant code duplication, especially in the `/src/components/product-variants/` directory. Components for different product types share nearly identical layout and logic, which should be abstracted into a single, reusable component.

4.  **Unused Code**: The repository contains unused files, including a `language-context.tsx` and a `logger.ts`, which add clutter and potential confusion.

5.  **Inconsistent File & Page Structure**: Some pages define their entire UI within the `page.tsx` file, while others delegate to a dedicated component. A consistent pattern should be enforced.
