# Phase 4: Component Reference

## 4.1 Layout Components

### `App.tsx` — Root Application Component

**Location**: `src/App.tsx` (111 lines)

The root component sets up the provider hierarchy and routing.

**Component tree**:
```
<HelmetProvider>
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route path="/:lang/*" element={<Layout />} />
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
</HelmetProvider>
```

**`Layout` (inner component)**:
- Wraps all pages in `PolicyProvider` and `CallErrorContext.Provider`
- Sets document direction (`dir="rtl"` for Urdu)
- Contains the skip-to-content link for accessibility
- Initializes scroll depth tracking via `initScrollTracking()`
- Scrolls to top on route change

**Provider hierarchy** (outside-in):
1. `HelmetProvider` — SEO head management
2. `ErrorBoundary` — Global error catch
3. `BrowserRouter` — Client-side routing
4. `PolicyProvider` — Policy acceptance state
5. `CallErrorContext.Provider` — Call error modal trigger

**Lazy-loaded components**:
- `ContactPage` — loaded on-demand when navigating to `/contact`
- `UniversalContactForm` — loaded on-demand when navigating to agent form routes

---

### `Header.tsx` — Fixed Navigation Header

**Location**: `src/components/Header.tsx` (54 lines)

| Prop | Type | Description |
|---|---|---|
| `isUrdu` | `boolean?` | Enables RTL layout and Urdu text |
| `currentPath` | `string` | Current URL path |

**Features**:
- Fixed position (`fixed top-0 w-full z-50`)
- Backdrop blur effect (`backdrop-blur-sm`)
- Company logo + name (hidden on mobile via `hidden sm:inline`)
- Language toggle button (English ↔ اردو)
- Tracks language switch events via `trackEvent()`
- Hides language toggle on `/requirements` routes

---

### `Footer.tsx` — Site Footer

**Location**: `src/components/Footer.tsx` (81 lines)

| Prop | Type | Description |
|---|---|---|
| `isUrdu` | `boolean?` | Enables RTL layout and Urdu text |

**Features**:
- Company description (bilingual)
- Google Maps location link
- Phone number button (triggers `CallErrorModal` via context)
- Email link (mailto for issue reporting)
- Copyright notice with dynamic year

---

### `Hero.tsx` — Hero Banner Section

**Location**: `src/components/Hero.tsx` (46 lines)

| Prop | Type | Description |
|---|---|---|
| `onConsultClick` | `() => void` | CTA button click handler |
| `isUrdu` | `boolean?` | Enables RTL layout |
| `translations` | `{ heroTitle, heroSub, heroBtn }?` | Localized strings |

**Features**:
- Full-height background image (`/images/hero-bg.webp`) with dark overlay
- Title, subtitle, and CTA button
- Button transitions: hover changes color from blue to orange and lifts up

---

## 4.2 Utility Components

### `SEO.tsx` — Search Engine Optimization Head Manager

**Location**: `src/components/SEO.tsx` (148 lines)

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | Page title |
| `description` | `string` | Meta description |
| `lang` | `string` | Language code (`en` or `ur`) |
| `isUrdu` | `boolean?` | Enables RTL |
| `canonical` | `string?` | Canonical path suffix |
| `type` | `'website' \| 'article' \| 'localbusiness'?` | Schema type |

**Renders**:
- `<title>` with site name suffix
- Meta description
- Canonical URL
- Open Graph tags (type, title, description, URL, image, locale)
- `hreflang` alternate links (en, ur, x-default)
- **5 JSON-LD schemas**:
  1. `RealEstateAgent` — Business schema with geo coordinates and opening hours
  2. `FAQPage` — Dynamic FAQ schema from translation data
  3. `HowTo` — 3-step guide schema
  4. `OfferCatalog` — Service offerings schema
  5. `BreadcrumbList` — Breadcrumb navigation schema

---

### `PolicyGate.tsx` — Policy Acceptance Gate

**Location**: `src/components/PolicyGate.tsx` (100 lines)

| Prop | Type | Description |
|---|---|---|
| `children` | `ReactNode` | Content to render after acceptance |

**Behavior**:
- If policy is already accepted → renders children immediately
- If not → renders the full policy document with accept button
- Policy text comes from the `useTranslation()` hook (`t.description`, `t.items`, `t.footer`)
- Clicking "Accept" calls `acceptPolicy()` from `PolicyContext` and scrolls to top
- **In-memory only** — resets on every page refresh (intentional: forces re-read)

**UI features**:
- Shield icon watermark
- Styled policy items with bullet points
- Full-width accept button with shield icon

---

### `CallErrorModal.tsx` — Call Error Dialog

**Location**: `src/components/CallErrorModal.tsx` (106 lines)

| Prop | Type | Description |
|---|---|---|
| `isOpen` | `boolean` | Controls visibility |
| `onClose` | `() => void` | Close handler |

**Purpose**: When users click the phone number, this modal explains that direct calling is not supported and they should use WhatsApp instead.

**Accessibility features**:
- `role="dialog"` and `aria-modal="true"`
- Focus trap (Tab/Shift+Tab cycling within modal)
- `Escape` key closes the modal
- Auto-focuses close button on open
- Prevents body scrolling when open
- Backdrop click closes

---

### `ErrorBoundary.tsx` — React Error Boundary

**Location**: `src/components/ErrorBoundary.tsx` (49 lines)

**Class component** implementing `getDerivedStateFromError` and `componentDidCatch`.

**Fallback UI**:
- Full-screen centered card with warning icon
- "Something went wrong" message
- "Refresh Page" button (`window.location.reload()`)

---

### `LoadingSpinner.tsx` — Full-Screen Loader

**Location**: `src/components/LoadingSpinner.tsx` (11 lines)

Simple spinner component used as `<Suspense fallback>` for lazy-loaded pages.

- Spinning border animation (`animate-spin`)
- Pulsing "Loading…" text (`animate-pulse`)
- Full viewport height, centered

---

## 4.3 Page Components

### `HomePage.tsx` — Landing Page

**Location**: `src/pages/HomePage.tsx` (293 lines)

The main landing page with 7 distinct sections:

| Section | Description |
|---|---|
| Hero | Full-screen banner with CTA |
| Trust Bar | 3 trust indicators (years, deals, HQ location) |
| Services | 3 service cards (buy/sell, tenant, landlord) |
| CEO Message | Blockquote-style message from Asif Gull |
| How It Works | 3-step guide |
| Service Area | Mardan + KPK coverage |
| FAQ | Accordion FAQ section (dynamic from translations) |
| Fee Policy | Agency fee & liability section |
| Contact CTA | Bottom blue CTA banner |

**Hidden SEO section**: City-specific content (`citySections`) rendered as `display: none` with `aria-hidden="true"` for geo-targeted SEO.

**Lifecycle**:
- Sets funnel stage to `'landing'` on mount
- Tracks `cta_click` events
- Manages FAQ accordion state

---

### `ContactPage.tsx` — Service Selection

**Location**: `src/pages/ContactPage.tsx` (158 lines)

**Purpose**: After accepting the policy, users choose which service they need and are routed to the appropriate agent's form.

**3 service cards** with Unsplash hero images:
1. **Buy/Sell** → CEO form + office call
2. **Rent** → Agent 1 or Agent 2 + office call
3. **List Property** → CEO, Agent 1, or Agent 2 + office call

**Features**:
- Preloads card images on mount
- WhatsApp and call icons from `/images/`
- Animated entrance (`fade-in slide-in-from-bottom-4`)
- Sets funnel stage to `'cta_clicked'`
