# Phase 3: Directory Structure & File Map

## 3.1 Root Directory

```
gullrealestate.github.io/
├── .github/
│   └── workflows/              # GitHub Actions CI/CD
├── coverage/                   # Vitest coverage output (gitignored)
├── dist/                       # Production build output (gitignored)
├── docs/                       # Project documentation (this folder)
├── node_modules/               # Dependencies (gitignored)
├── public/                     # Static assets (copied as-is to dist/)
├── scripts/                    # Build-time automation scripts
├── src/                        # Application source code
├── tests/                      # Unit & integration tests
│
├── .gitignore                  # Git ignore rules
├── _config.yml                 # Jekyll/GitHub Pages configuration
├── eslint.config.js            # ESLint flat config (v10)
├── index.html                  # Vite entry HTML (SPA shell)
├── LICENSE                     # Project license
├── package.json                # Package manifest & scripts
├── package-lock.json           # Dependency lockfile
├── postcss.config.js           # PostCSS plugin configuration
├── prerender.cjs               # Pre-rendering script (Puppeteer)
├── README.md                   # Project README
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript config (source)
├── tsconfig.node.json          # TypeScript config (build tools)
├── vite.config.cts             # Vite build configuration
└── vitest.config.ts            # Vitest test runner configuration
```

## 3.2 Source Directory (`src/`)

```
src/
├── components/                # Shared/reusable UI components
│   ├── CallErrorModal.tsx     # Modal: "Calls aren't supported, use WhatsApp"
│   ├── ErrorBoundary.tsx      # React error boundary with fallback UI
│   ├── Footer.tsx             # Site footer (logo, address, email)
│   ├── Header.tsx             # Fixed header with logo + language toggle
│   ├── Hero.tsx               # Hero banner with CTA button
│   ├── LoadingSpinner.tsx     # Full-screen loading indicator
│   ├── PolicyGate.tsx         # Policy acceptance gate (blocks access)
│   └── SEO.tsx                # <Helmet> wrapper for meta tags + JSON-LD
│
├── config/                    # Application configuration
│   └── contacts.ts            # Agent definitions (CEO, Agent 1, Agent 2)
│
├── context/                   # React Context providers
│   ├── CallErrorContext.tsx   # Context for triggering call error modal
│   └── PolicyContext.tsx      # Context for policy acceptance state
│
├── features/                  # Feature modules
│   └── contact/               # Contact/lead generation feature
│       ├── hooks/
│       │   └── useLeadForm.ts         # Form state management hook
│       ├── steps/
│       │   ├── BuySellDetailsForm.tsx  # Buy/sell property details
│       │   ├── ListingDetailsForm.tsx  # Property listing details
│       │   ├── RentDetailsForm.tsx     # Rental property details
│       │   ├── StepPropertyDetails.tsx # Step 2 orchestrator
│       │   ├── StepReview.tsx          # Step 3: review & confirm
│       │   └── StepUserInfo.tsx        # Step 1: user information
│       ├── utils/
│       │   └── whatsappBuilder.ts      # WhatsApp message & URL builder
│       ├── types.ts                    # TypeScript interfaces
│       └── UniversalContactForm.tsx    # 3-step form orchestrator
│
├── lib/                       # Shared library utilities
│   ├── i18n/
│   │   └── useTranslation.ts # Translation hook (reads URL /:lang param)
│   ├── analytics.ts           # Event tracking (GA4/Plausible/console)
│   ├── funnelTracker.ts       # Conversion funnel state machine
│   ├── leadPersistence.ts     # Lead storage (localStorage + API POST)
│   └── phoneUtils.ts          # Phone number validation & normalization
│
├── locales/                   # Translation dictionaries
│   ├── en.ts                  # English translations (~300 keys)
│   ├── ur.ts                  # Urdu translations (~300 keys)
│   └── types.ts               # TranslationSchema type definition
│
├── pages/                     # Route-level page components
│   ├── ContactPage.tsx        # Service selection page
│   └── HomePage.tsx           # Landing page (hero, services, FAQ, etc.)
│
├── App.tsx                    # Root component (router, providers, layout)
├── index.css                  # Global CSS (Tailwind directives, RTL, scrollbar)
├── main.tsx                   # ReactDOM entry point
└── vite-env.d.ts              # Vite type declarations
```

## 3.3 Public Directory (`public/`)

```
public/
├── images/
│   ├── logo.webp              # Company logo
│   └── (other assets)         # Hero bg, email icon, WhatsApp icon, etc.
├── manifest.json              # PWA web app manifest
├── offline.html               # Offline fallback page
├── robots.txt                 # Search engine crawling rules
├── sitemap.xml                # XML sitemap (also auto-generated at build)
└── sw.js                      # Service worker (network-first caching)
```

## 3.4 Tests Directory (`tests/`)

```
tests/
├── __snapshots__/             # Vitest snapshots
├── analytics.test.ts          # Analytics utility tests
├── funnelTracker.test.ts      # Funnel tracker tests
├── leadPersistence.test.ts    # Lead storage tests
├── phoneUtils.test.ts         # Phone validation tests
├── useLeadForm.test.tsx       # Lead form hook tests (React)
└── whatsappBuilder.test.ts    # WhatsApp message builder tests
```

## 3.5 Scripts Directory (`scripts/`)

```
scripts/
└── generate-sitemap.cjs       # Post-build sitemap generator
```

## 3.6 File Size Summary

| Directory | Files | Description |
|---|---|---|
| `src/components/` | 8 files | Shared UI: Header, Footer, Hero, SEO, PolicyGate, modals, etc. |
| `src/features/contact/` | 10 files | Contact form system: orchestrator, 6 steps, hook, types, WhatsApp builder |
| `src/lib/` | 5 files | Analytics, funnel tracking, lead persistence, phone utils, i18n hook |
| `src/locales/` | 3 files | English, Urdu translations, and TypeScript schema |
| `src/pages/` | 2 files | HomePage (~293 lines) and ContactPage (~158 lines) |
| `src/context/` | 2 files | CallError and Policy React contexts |
| `src/config/` | 1 file | Agent contact definitions |
| `tests/` | 6 test files + snapshots | Unit tests for all lib utilities and form hook |
| `public/` | 6 files + images | PWA manifest, service worker, robots, sitemap, offline page |
| Root config | ~12 files | Build, lint, TypeScript, Tailwind, PostCSS configs |
