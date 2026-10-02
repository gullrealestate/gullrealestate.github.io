# GEMINI.md — AI Assistant Guide for GULL Real Estate & Builders

This document provides system context, architectural guidelines, domain rules, and development instructions for Google Gemini, Antigravity, and Gemini Code Assist working within the `gullrealestate.github.io` codebase.

---

## 1. Project Overview & Business Domain

**GULL Real Estate & Builders** is a real estate agency based in Sheen Gull Plaza, Swabi Road, Mardan, Khyber Pakhtunkhwa, Pakistan. 

This repository is a client-side web application and lead-generation platform that connects property buyers, sellers, tenants, and landlords directly with the agency's team via **WhatsApp**.

### Key Business Invariants
- **Lead Generation via WhatsApp**: The application does not process financial transactions. User inquiries are converted into formatted WhatsApp messages sent to designated agents:
  - **CEO (Asif Gull)**: Buy/sell consultation, high-value investment, and strategy.
  - **Agent 1 (Syed Ateeq ur Rahman)**: Rental inquiries and property listings.
  - **Agent 2 (Mian Abdul Haq)**: Plot sales and landlord support.
- **English-Only UI**: Single, high-converting English layout and copy centralized in `src/content.ts`.
- **Policy Gate Requirement**: Users must read and acknowledge the agency fee and liability policy before accessing lead generation contact forms.
- **Forward-Only Funnel**: Conversion tracking relies on an immutable forward-only funnel state machine stored in `localStorage`.
- **PII Scrubbing**: Strict privacy protection automatically strips Personally Identifiable Information (PII) before sending events to analytics providers.

---

## 2. Technology Stack & Environment

| Layer | Tooling | Notes |
|---|---|---|
| **Framework** | React 18.2 | Client-Side SPA (`react`, `react-dom`) |
| **Bundler & Dev Server** | Vite 7.0 | Minification with Terser, Rollup manual vendor chunks |
| **Language** | TypeScript 5.7 | Strict mode enabled (`noEmit: true`, bundler module resolution) |
| **Styling** | Tailwind CSS 3.4 | Custom **Gruvbox** color palette, PostCSS, Autoprefixer |
| **Routing** | React Router v7 | `/:lang/*` pattern with language redirection |
| **Icons** | Lucide React | Tree-shakeable SVG icons |
| **Phone Validation** | `libphonenumber-js` | Mobile-optimized parser for PK, AF, IN with E.164 normalization |
| **SEO & Meta** | `react-helmet-async` | Dynamic `<head>`, JSON-LD structured data |
| **Testing** | Vitest 4.0 + jsdom | Testing Library (`react`, `dom`, `jest-dom`, `user-event`) |
| **Coverage** | `@vitest/coverage-istanbul` | Istanbul coverage with strict thresholds |
| **Pre-rendering** | Puppeteer + Express | Node script `prerender.cjs` for static HTML routes |
| **Environment** | Nix / devenv | Development environment managed via `devenv.nix` |

---

## 3. Development Workflow & Commands

> [!NOTE]
> On systems using Nix / devenv where `node` and `npm` are provided inside the devenv shell, prefix commands with `devenv shell -- <command>`, or execute them directly within an active devenv shell.

### Essential Commands

```bash
# Start development server with HMR
npm run dev
# Or with devenv:
devenv shell -- npm run dev

# Run unit tests
npm test
# Or with devenv:
devenv shell -- npm test

# Run tests with Istanbul code coverage
npm run test:coverage
# Or with devenv:
devenv shell -- npm run test:coverage

# Lint codebase (zero-warning policy enforced)
npm run lint
# Or with devenv:
devenv shell -- npm run lint

# Production build (Type-check -> Vite bundle -> Puppeteer prerender -> Sitemap)
npm run build
# Or with devenv:
devenv shell -- npm run build

# Preview production build locally
npm run preview
# Or with devenv:
devenv shell -- npm run preview

# Complete validation pipeline
npm run all
```

---

## 4. Coding Standards & ESLint Constraints

The repository enforces strict compiler and linter rules in `eslint.config.js` and `tsconfig.json`:

1. **Zero-Warning Tolerance**:
   The lint script is configured with `--max-warnings 0`. Any ESLint warning will fail CI and builds.
2. **Inline Type Imports**:
   `@typescript-eslint/consistent-type-imports` requires `inline-type-imports`.
   ```typescript
   // Correct:
   import { useState, type ReactNode } from 'react';
   import type { ContactFormData } from '../types.ts';

   // Incorrect (will trigger ESLint error):
   import { ContactFormData } from '../types.ts';
   ```
3. **Unused Identifiers**:
   Unused variables and function parameters must be prefixed with an underscore (`_`).
4. **Console Output**:
   `no-console` is enforced as `warn` (which errors out under `--max-warnings 0`). Only `console.warn` and `console.error` are permitted. Never leave `console.log` statements in production code.
5. **Path Aliases & Imports**:
   Vite and TypeScript support `@/*` aliases (`@components/*`, `@features/*`, `@lib/*`, etc.), but the existing codebase primarily uses relative imports (`../../lib/analytics.ts`). Maintain consistency with surrounding files.

---

## 5. Design System: Gruvbox Theme

All UI components use custom Gruvbox color tokens defined in `tailwind.config.js`. Avoid hardcoding standard Tailwind gray or generic hex values.

| Token | Hex | Intended Purpose |
|---|---|---|
| `bg0` | `#282828` | Main page background (dark) |
| `bg1` | `#3c3836` | Card, container, and section surfaces |
| `bg2` | `#504945` | Inputs, borders, and hover elevations |
| `fg` | `#ebdbb2` | Primary readable text |
| `gray` | `#928374` | Subdued, secondary, and helper text |
| `blue` | `#458588` | Primary brand accent and action buttons |
| `orange` | `#d65d0e` | Secondary accents and highlights |
| `green` | `#98971a` | Success indicators and badges |
| `red` | `#cc241d` | Validation errors and required alerts |
| `aqua` | `#689d6a` | Interactive hover states |

### Typography
- **Headings**: Manrope / Outfit
- **Body**: Inter, sans-serif

---

## 6. Architecture & Directory Map

```
gullrealestate.github.io/
├── docs/                      # 10-phase exhaustive technical documentation
├── public/                    # Static assets, manifest.json, sw.js, offline.html
├── scripts/
│   └── generate-sitemap.cjs   # Post-build XML sitemap generator
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── CallErrorModal.tsx # "Phone calls unavailable; use WhatsApp" modal
│   │   ├── ErrorBoundary.tsx  # React error boundary component
│   │   ├── Footer.tsx         # Footer with address, legal, and contacts
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Hero.tsx           # Landing hero section with CTA
│   │   ├── LoadingSpinner.tsx # Accessible loading state
│   │   ├── PolicyGate.tsx     # Enforces policy acceptance before form access
│   │   └── SEO.tsx            # <Helmet> meta tags, JSON-LD schemas
│   ├── config/
│   │   └── contacts.ts        # Agent numbers, roles, and default intent routing
│   ├── context/
│   │   ├── CallErrorContext.tsx # Global trigger for phone call redirection modal
│   │   └── PolicyContext.tsx    # State provider for policy acknowledgment
│   ├── content.ts             # Centralized application copy and content strings
│   ├── features/
│   │   └── contact/           # 3-step lead generation form module
│   │       ├── hooks/useLeadForm.ts      # Multi-step state, draft persistence
│   │       ├── steps/                    # Sub-forms (UserInfo, PropertyDetails, Review)
│   │       ├── utils/whatsappBuilder.ts  # wa.me URL generator with lead ID
│   │       ├── types.ts                  # Lead form interfaces and schemas
│   │       └── UniversalContactForm.tsx  # Step orchestrator
│   ├── lib/
│   │   ├── analytics.ts       # Event dispatching with PII auto-scrubbing
│   │   ├── funnelTracker.ts   # Forward-only stage machine
│   │   ├── leadPersistence.ts # LocalStorage backup and backend sync
│   │   └── phoneUtils.ts      # libphonenumber-js validation & E.164 parsing
│   ├── pages/
│   │   ├── ContactPage.tsx    # Intent and agent selection page
│   │   └── HomePage.tsx       # Landing page (hero, services, policy, FAQ)
│   ├── App.tsx                # BrowserRouter, context wrappers, route mapping
│   ├── main.tsx               # Client entry point with hydrate/render
│   └── index.css              # Global styles and scrollbar
├── tests/                     # Vitest test suites + snapshots
├── prerender.cjs              # Puppeteer script for static pre-rendering
└── devenv.nix                 # Nix developer environment definition
```

---

## 7. Critical Domain Guardrails & Invariants

When modifying or generating code, always uphold these invariants:

1. **PII Scrubbing in Analytics (`src/lib/analytics.ts`)**:
   - The blocklist (`phone`, `name`, `email`, `fullname`, `whatsapp`) must **never** be relaxed.
   - Any event dispatched through `trackEvent()` is automatically scrubbed. Never bypass `trackEvent()` with raw third-party analytics calls.
2. **Forward-Only Funnel (`src/lib/funnelTracker.ts`)**:
   - Funnel stages are monotonically advancing: `landing` (1) → `policy_viewed` (2) → `form_started` (3) → `step_2` (4) → `review` (5) → `whatsapp_clicked` (6).
   - Attempts to transition backwards must be ignored to prevent data corruption.
3. **WhatsApp URL Construction (`src/features/contact/utils/whatsappBuilder.ts`)**:
   - Lead IDs must follow the format `GRE-YYMMDD-HHmmss`.
   - Structured English WhatsApp message template with clear headers and reference IDs.
   - Phone numbers must be normalized without leading `+` for `wa.me/<number>` URLs.
4. **Strict Coverage Thresholds**:
   - Vitest Istanbul thresholds are defined in `vitest.config.ts`:
     - Branches: **70%**
     - Functions: **80%**
     - Lines: **80%**
     - Statements: **80%**
   - Any modifications to `src/lib/` or `src/features/contact/` must include corresponding tests to maintain threshold compliance.
5. **Centralized Content**:
   - Application copy and user-facing text are centralized in `src/content.ts`. Keep text consistent with the established tone.
