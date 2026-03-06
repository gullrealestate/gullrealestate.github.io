# Phase 1: Project Overview & Architecture

## 1.1 Project Identity

| Field | Value |
|---|---|
| **Name** | Gull Real Estate & Builders |
| **Package** | `gullrealestateandbuilders` |
| **Version** | `0.0.0` (private, not published to npm because it is webapp) |
| **URL** | [https://gullrealestate.github.io](https://gullrealestate.github.io) |
| **Location** | Sheen Gull Plaza, Swabi Road, Mardan, KPK, Pakistan |
| **Phone** | 0937 861777 |
| **Email** | agul40160@gmail.com |
| **Copyright** | © 2023–present GULL Real Estate and Builders |

## 1.2 Business Purpose

GULL Real Estate & Builders is a **real estate agency** based in Mardan, Khyber Pakhtunkhwa, Pakistan. The website serves as a lead-generation platform that connects property buyers, sellers, tenants, and landlords with the agency's team via **WhatsApp**.

### Core Services

1. **Buy/Sell Guidance** — Consultation and strategy for property transactions (CEO-level)
2. **Rental Consultation** — Finding rental properties and matching tenants (Agent 1)
3. **Landlord Support** — Listing properties for sale or rent (Agent 1 & Agent 2)

### Business Model

- **Fee Structure**: Agency fee applies for advisory and facilitation services
- **Payment Flow**: Property transaction payments are made directly by clients (the agency does not handle funds)
- **Policy Gate**: Users must read and acknowledge the agency's fee & liability policy before accessing contact forms

## 1.3 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                       Browser Client                        │
│  ┌───────────┐  ┌──────────┐  ┌────────────┐  ┌─────────┐  │
│  │  React 18  │  │ Vite 7   │  │ TypeScript │  │ Tailwind│  │
│  │  (SPA/CSR) │  │  (Build) │  │  (Strict)  │  │   CSS   │  │
│  └─────┬─────┘  └──────────┘  └────────────┘  └─────────┘  │
│        │                                                     │
│  ┌─────▼──────────────────────────────────┐                  │
│  │  BrowserRouter  (/:lang/* pattern)     │                  │
│  │  ├─ /en/*  → English layout            │                  │
│  │  └─ /ur/*  → Urdu layout (RTL)         │                  │
│  └─────┬──────────────────────────────────┘                  │
│        │                                                     │
│  ┌─────▼──────────────────────────────────┐                  │
│  │  Pages                                 │                  │
│  │  ├─ HomePage  (landing, hero, FAQ)     │                  │
│  │  ├─ ContactPage  (service selection)   │                  │
│  │  └─ UniversalContactForm (3-step form) │                  │
│  └─────┬──────────────────────────────────┘                  │
│        │                                                     │
│  ┌─────▼──────────────────────────────────┐                  │
│  │  Services Layer                        │                  │
│  │  ├─ WhatsApp Builder (message → URL)   │                  │
│  │  ├─ Analytics (GA4 / Plausible / Dev)  │                  │
│  │  ├─ Funnel Tracker (localStorage)      │                  │
│  │  ├─ Lead Persistence (localStorage)    │                  │
│  │  └─ Phone Validation (libphonenumber)  │                  │
│  └────────────────────────────────────────┘                  │
│                                                              │
│  ┌────────────────────────────────────────┐                  │
│  │  PWA Layer                             │                  │
│  │  ├─ Service Worker (network-first)     │                  │
│  │  ├─ Web App Manifest                   │                  │
│  │  └─ Offline Fallback Page              │                  │
│  └────────────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────┘

     ▼ Build Pipeline ▼

┌─────────────────────────────────────────────────────────────┐
│  tsc → vite build → prerender.cjs → generate-sitemap.cjs   │
│        (terser)     (puppeteer)     (XML output)            │
│                                                              │
│  Output: dist/ → deployed via gh-pages to GitHub Pages       │
└─────────────────────────────────────────────────────────────┘
```

## 1.4 Application Flow

```
User → Homepage → "Contact Us" CTA
                        ↓
              PolicyGate (must accept)
                        ↓
              ContactPage (choose service)
                ├── Buy/Sell → contactCEO
                ├── Rent → contactAgentA / contactAgentB
                └── List → contactCEO / contactAgentA / contactAgentB
                        ↓
              UniversalContactForm (3 steps)
                ├── Step 1: User Info (name, phone, gender)
                ├── Step 2: Property Details (type, location, budget, etc.)
                └── Step 3: Review & Confirm
                        ↓
              WhatsApp Message Generated → wa.me link opened
              Lead persisted to localStorage
              Analytics events dispatched
```

## 1.5 Design System

The entire UI uses the **Gruvbox** color palette — a retro groove color scheme originally designed for Vim. It provides excellent contrast and a warm, professional aesthetic.

| Token | Hex | Usage |
|---|---|---|
| `bg0` | `#282828` | Page background |
| `bg1` | `#3c3836` | Card / section backgrounds |
| `bg2` | `#504945` | Input / subtle backgrounds |
| `fg` | `#ebdbb2` | Primary text |
| `blue` | `#458588` | Primary accent, CTAs |
| `orange` | `#d65d0e` | Secondary accent |
| `green` | `#98971a` | Success states |
| `red` | `#cc241d` | Error states |
| `aqua` | `#689d6a` | Hover states |
| `gray` | `#928374` | Muted text |

### Typography

- **Body**: Inter (400–800 weights)
- **Headings**: Outfit (400–800 weights)
- **Urdu (RTL)**: Noto Nastaliq Urdu (400–700 weights)

## 1.6 Routing Structure

| Route Pattern | Component | Description |
|---|---|---|
| `/:lang` | `HomePage` | Landing page with hero, services, FAQ, etc. |
| `/:lang/contact` | `ContactPage` | Service selection (buy/sell/rent/list) |
| `/:lang/contactCEO` | `UniversalContactForm` | Direct form to CEO |
| `/:lang/contactAgentA` | `UniversalContactForm` | Direct form to Agent 1 |
| `/:lang/contactAgentB` | `UniversalContactForm` | Direct form to Agent 2 |
| `*` | `Navigate` → `/en` | Catch-all redirect to English |

All contact routes are wrapped in `PolicyGate` — users must accept the agency policy before accessing the form.
