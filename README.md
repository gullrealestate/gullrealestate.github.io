# GULL Real Estate & Builders

> **Real estate agency website** for Mardan, KPK — built with React, TypeScript, Vite, and Tailwind CSS.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-green.svg)](https://gullrealestate.github.io)

---

## 🏠 About

GULL Real Estate & Builders is a property agency in Mardan, Khyber Pakhtunkhwa, Pakistan. This website is a lead-generation platform connecting property buyers, sellers, tenants, and landlords with the agency's team via **WhatsApp**.

### Key Features

- **Bilingual**: Full English & Urdu (RTL) support with URL-based language switching
- **WhatsApp Lead Forms**: 3-step multi-agent contact forms that generate structured WhatsApp messages
- **SEO Optimized**: JSON-LD schemas (RealEstateAgent, FAQPage, HowTo, OfferCatalog, Breadcrumbs), hreflang, pre-rendered HTML
- **PWA**: Installable web app with service worker and offline fallback
- **Analytics**: GDPR-safe event tracking with PII auto-scrubbing (GA4/Plausible/dev fallback)
- **Conversion Funnel**: Forward-only funnel state machine for conversion tracking
- **Policy Gate**: Users must read and accept the agency policy before accessing forms
- **Accessibility**: Skip links, focus traps, ARIA labels, keyboard navigation, semantic HTML

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Bundler | Vite 7 |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 3 (Gruvbox palette) |
| Routing | React Router v7 |
| Icons | Lucide React |
| Phone Validation | libphonenumber-js |
| SEO | react-helmet-async + JSON-LD |
| Testing | Vitest + Testing Library |
| Deployment | GitHub Pages |

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test; npm run test:coverage

# Build for production
npm run build --legacy-peer-deps

# Deploy to GitHub Pages
npm run deploy
```

## 📖 Documentation

Full project documentation is organized into 10 phases in the [`docs/`](./docs/) folder:

| Phase | Document | Description |
|---|---|---|
| 1 | [Project Overview](./docs/phase-01-project-overview.md) | Architecture, design system, routing, application flow |
| 2 | [Technology Stack](./docs/phase-02-technology-stack.md) | Dependencies, build tools, TypeScript/Vite config |
| 3 | [Directory Structure](./docs/phase-03-directory-structure.md) | Complete file map with descriptions |
| 4 | [Component Reference](./docs/phase-04-component-reference.md) | All 8 shared components and 2 page components |
| 5 | [Contact Feature](./docs/phase-05-contact-feature.md) | Multi-step form system, WhatsApp builder, hooks |
| 6 | [Library Utilities](./docs/phase-06-library-utilities.md) | Analytics, funnel tracker, lead persistence, phone utils |
| 7 | [Internationalization](./docs/phase-07-internationalization.md) | i18n system, RTL support, translation schema |
| 8 | [Build & Deployment](./docs/phase-08-build-deployment.md) | Build pipeline, pre-rendering, GitHub Pages |
| 9 | [SEO, PWA & Performance](./docs/phase-09-seo-pwa-performance.md) | Structured data, service worker, optimizations |
| 10 | [Testing & QA](./docs/phase-10-testing-quality.md) | Test suite, coverage, quality assurance checklist |

## 📂 Project Structure

```
├── docs/               # Project documentation (10 phases)
├── public/             # Static assets, PWA manifest, service worker
├── scripts/            # Build automation (sitemap generator)
├── src/
│   ├── components/     # Shared UI (Header, Footer, Hero, SEO, etc.)
│   ├── config/         # Agent contact definitions
│   ├── context/        # React contexts (policy, call error)
│   ├── features/       # Feature modules (contact system)
│   ├── lib/            # Utilities (analytics, funnel, phone, i18n)
│   ├── locales/        # Translation dictionaries (en, ur)
│   ├── pages/          # Route-level pages (Home, Contact)
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
├── tests/              # Unit tests (Vitest)
├── prerender.cjs       # Pre-rendering script (Puppeteer)
└── package.json        # Dependencies and scripts
```

## 🧪 Testing

```bash
npm test            # Run all tests
npm run test:coverage  # Run with Istanbul coverage
```

Tests cover: analytics, funnel tracking, lead persistence, phone validation, form hook logic, and WhatsApp message building.

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

© 2023–present GULL Real Estate and Builders. All rights reserved.
