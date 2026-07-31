> **ARCHIVED — historical snapshot, do NOT treat as current.**
> Written 2 June 2026, before six waves of audit and remediation. Many of the
> file paths and component names below no longer exist. Kept for provenance only.
> For the current state see `README.md`, `ARCHITECTURE.md`, `KNOWN-ISSUES.md`
> and `docs/MEDIA.md`.

---

# Refactor Analysis: Before vs. After

This document provides a brutally honest assessment of the repository's state before and after the recent refactoring initiative.

---

### What Improved

1.  **Architecture & Maintainability:**
    *   **BEFORE:** Monolithic page components (`charpente-metallique-page.tsx`, `galvanisation-page-content.tsx`) handled everything, making them impossible to maintain or reason about.
    *   **AFTER:** A clean, predictable structure is now in place. `app/**/page.tsx` -> `components/pages/**` -> `components/sections/**`. Responsibilities are now separated, which is a massive improvement.

2.  **Performance:**
    *   **BEFORE:** The application was almost entirely client-side rendered due to top-level `"use client"` directives, especially because of the `<AnimatedWrapper>`. This completely negated the benefits of Next.js.
    *   **AFTER:** Server Components are now the default. `"use client"` has been pushed down to the actual interactive "leaf" components. All major page sections are lazy-loaded with `next/dynamic`. The initial page load performance is fundamentally better.

3.  **Code Organization:**
    *   **BEFORE:** The `/src/components` directory was a chaotic mix of UI elements, page layouts, and product-specific logic with no clear separation.
    *   **AFTER:** The structure is now logical and self-documenting (`/pages`, `/sections`, `/shared`, `/ui`). A new developer can now find what they're looking for without a full codebase audit.

4.  **Repository Hygiene:**
    *   **BEFORE:** No `.gitignore` file, leading to a risk of committing secrets and build artifacts. Unused files (`language-context.tsx`, `logger.ts`) cluttered the repo.
    *   **AFTER:** A proper `.gitignore` is in place. Dead code has been removed. The project is cleaner and safer.

---

### What Stayed Messy

1.  **Massive Code Duplication:**
    *   The single biggest piece of technical debt remains untouched. The `/src/components/product-variants/` directory is still a collection of nearly identical components (`CouvertureProduct`, `BardageProduct`, `FrigorifiqueProduct`, etc.).
    *   **Verdict:** This was identified as a high-priority issue from the start and was not addressed. It remains a significant maintenance burden. A single, generic `<ProductVariantDetails>` component that takes data as props is still desperately needed.

2.  **Hardcoded Static Content:**
    *   While some data lives in `/config`, the vast majority of titles, descriptions, labels, and other text content is still hardcoded directly within the JSX of the components.
    *   **Verdict:** This makes content updates unnecessarily difficult and requires developer intervention for simple text changes. It mixes content with presentation, which is an anti-pattern.

---

### What Got Worse

*   **Nothing.** From a code quality, performance, and architectural perspective, the post-refactor state is unequivocally superior to the initial state. The process was painful due to repeated build errors from incorrect import paths, but the end result is a significant improvement across the board.

---

### Compromises & Lessons Learned

1.  **Compromise on Full Abstraction:** The `product-variants` duplication was a known issue that was explicitly de-scoped or ignored in favor of architectural and performance improvements. While the foundation is better, this debt will need to be paid down eventually.

2.  **Lesson: The Peril of "Move-Only" Refactoring:** The series of `Module not found` errors demonstrated a critical failure in the refactoring process. Moving and renaming files without immediately and correctly updating all corresponding import paths is a recipe for disaster. This should never be done again. **Future refactoring must be atomic: move a file AND update all its references in a single, verified commit.**
