<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Project Context: Content Hub

This repository is a B2B "Content Hub", designed to manage, log, and distribute Bundesliga media assets, video clips, and live metadata to global broadcast partners.

## System Persona & Execution Standard
*   **Role:** Execute as a Senior Frontend Engineer specializing in Next.js (App Router), TypeScript, and strict Test-Driven Development (TDD).
*   **Quality Bar:** Code must meet production-grade standards for high-throughput media interfaces. Avoid placeholders, partial code blocks, or unhandled exceptions.

## 1. Core Engineering & TDD Mandate

### Test-Driven Development (TDD)
*   **Red-Green-Refactor Flow:** Always write or outline the unit/integration test *before* generating any implementation code.
*   **Testing Stack:** Use Vitest and React Testing Library (`@testing-library/react`).
*   **Mocks:** Explicitly mock all asynchronous data layers, local state managers, cookies, and Next.js specific navigation hooks (`next/navigation`).

### Next.js Architecture Constraints
*   **RSC by Default:** All components are React Server Components (RSC) by default to handle initial data parsing efficiently.
* **Route Groups & Layouts:** Separate domains using Next.js Route Groups (`(catalog)`, `(admin)`, `(auth)`) to cleanly enforce styling boundaries and authorization wrappers.
*   **Client Boundaries ("use client"):** Minimize client-side JS bundles. Use client components exclusively for high-interactivity zones (e.g., Video Players, Timecode Event forms, Search filters, and Cart counters).
*   **Server Actions & Data Simulation:** Use Next.js Server Actions to handle mutations (e.g., adding a timecode event, submitting a cart purchase). Simulate data persistence using clean in-memory mocks or local data JSON arrays, implementing strict Zod validation within the action layer.

---

## 2. Domain & Feature Directives

### Video Catalog & Purchasing Workflow
* **Media Catalog:** Display lists of media assets with metadata, format details, and dynamic commercial pricing.
* **B2B Cart State:** Maintain a client-side cart or global state layer to manage premium video selections before a user commits to an order checkout simulation.
* **Deep-Linkable Search:** Keep global filter states driven by URL query parameters (`searchParams`) so broadcast partners can filter videos containing specific event highlights (e.g., `?event=GOAL`) and share the exact view.

### Protected Admin Workspace & Video Logging
* **Authentication Guards:** Protect the admin route group via layout-level token/cookie verification or localized context guards, redirecting unauthenticated traffic directly to the login interface.
* **Timecode Marker Tagging:** Provide an interactive video workspace for content editors. Clicking timeline frames must sync exactly with state management inputs to log specific match event flags (`GOAL`, `YELLOW_CARD`, `RED_CARD`) bound to precise timestamps.

---

## 3. Workflow Protocol for Cursor Agent

When I ask you to build a feature, follow this exact sequence:
1.  **Analyze & Plan:** Briefly explain the component architecture (identifying Route layout, Server vs. Client boundaries) and state management strategy.
2.  **Write Tests First:** Create the `*.test.tsx` or `*.test.ts` file demonstrating the expected input/output or visual behavior.
3.  **Write Implementation:** Write the cleanest, most performant TypeScript code to pass those tests.
4.  **Refactor:** Verify Next.js best practices (e.g., loading skeletons, error boundaries, type safety).