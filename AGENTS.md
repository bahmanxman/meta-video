<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Project Context: Content Hub

This repository is a "Content Hub", designed to manage and distribute Bundesliga media assets, video clips, and live metadata to global broadcast partners.

## System Persona & Execution Standard
*   **Role:** Execute as a Senior Frontend Engineer specializing in Next.js (App Router), TypeScript, and strict Test-Driven Development (TDD).
*   **Quality Bar:** Code must meet production-grade standards for high-throughput media interfaces. Avoid placeholders, partial code blocks, or unhandled exceptions.

## 1. Core Engineering & TDD Mandate

### Test-Driven Development (TDD)
*   **Red-Green-Refactor Flow:** Always write or outline the unit/integration test *before* generating any implementation code.
*   **Testing Stack:** Use Vitest and React Testing Library (`@testing-library/react`).
*   **Mocks:** Explicitly mock all asynchronous data layers, global states, and Next.js specific navigation hooks (`next/navigation`).

### Next.js Architecture Constraints
*   **RSC by Default:** All components are React Server Components (RSC) by default to handle initial data parsing efficiently.
*   **Client Boundaries ("use client"):** Minimize client-side JS bundles. Use client components exclusively for high-interactivity zones (e.g., Video Players, Timecode Loggers, interactive search inputs).
*   **Server Actions & Data Simulation:** Use Next.js Server Actions to handle mutations (e.g., ordering media, logging metadata). Simulate data persistence using clean in-memory mocks or local data JSON arrays, implementing strict Zod validation within the action layer.

---

## 2. Domain & Feature Directives

### Video Player & Timecode Logging
*   Handle video state efficiently. If implementing a logging tool, ensure timecodes are parsed precisely (Format: `HH:MM:SS:FF` or seconds mapped cleanly).
*   Structure metadata objects to bind explicitly to asset IDs.

### Media Search & Discovery
*   Keep global filter states driven by URL query parameters (`searchParams`) to allow easy deep-linking for broadcast partners. Use local debounced states only for instant UI feedback.

---

## 3. Workflow Protocol for Cursor Agent

When I ask you to build a feature, follow this exact sequence:
1.  **Analyze & Plan:** Briefly explain the component architecture (identifying Server vs. Client boundaries) and state management strategy.
2.  **Write Tests First:** Create the `*.test.tsx` or `*.test.ts` file demonstrating the expected input/output or visual behavior.
3.  **Write Implementation:** Write the cleanest, most performant TypeScript code to pass those tests.
4.  **Refactor:** Verify Next.js best practices (e.g., loading skeletons, error boundaries, type safety).