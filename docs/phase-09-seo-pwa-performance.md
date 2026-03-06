# Phase 9: SEO, PWA & Performance

## 9.1 SEO Strategy

### On-Page SEO

The `SEO.tsx` component injects per-page meta tags via `react-helmet-async`:

```html
<html lang="en" dir="ltr" />
<title>Page Title | Gull Real Estate & Builders | 15+ Years</title>
<meta name="description" content="..." />
<link rel="canonical" href="https://gullrealestate.github.io/en" />
<meta name="google" content="notranslate" />
```

### Open Graph Tags

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="Full Title" />
<meta property="og:description" content="..." />
<meta property="og:url" content="https://gullrealestate.github.io/en" />
<meta property="og:site_name" content="Gull Real Estate & Builders | 15+ Years" />
<meta property="og:image" content="https://gullrealestate.github.io/images/og-en.png" />
<meta property="og:locale" content="en_US" />  <!-- or ur_PK -->
```

### Hreflang Alternate Links

```html
<link rel="alternate" hrefLang="en" href=".../en{path}" />
<link rel="alternate" hrefLang="ur" href=".../ur{path}" />
<link rel="alternate" hrefLang="x-default" href=".../en{path}" />
```

### JSON-LD Structured Data

5 schema types are rendered on every page:

#### 1. RealEstateAgent

```json
{
    "@type": "RealEstateAgent",
    "name": "Gull Real Estate & Builders",
    "telephone": "+923149393930",
    "priceRange": "$$",
    "address": {
        "streetAddress": "Sheen Gull Plaza, Swabi Road",
        "addressLocality": "Mardan",
        "addressRegion": "Khyber Pakhtunkhwa",
        "postalCode": "23200",
        "addressCountry": "PK"
    },
    "geo": {
        "latitude": 34.1989,
        "longitude": 72.0442
    },
    "areaServed": { "geoRadius": "50000" },
    "openingHoursSpecification": {
        "dayOfWeek": ["Monday"..."Saturday"],
        "opens": "09:00",
        "closes": "18:00"
    }
}
```

#### 2. FAQPage

Dynamically generated from `t.faqs[]` — each FAQ becomes a `Question` with `acceptedAnswer`.

#### 3. HowTo

3-step process schema from `t.howItWorksTitle`, `t.step1`, `t.step1Desc`, etc.

#### 4. OfferCatalog

Service offerings: Buy/Sell, Tenant, Landlord.

#### 5. BreadcrumbList

Dynamic breadcrumbs based on current route depth.

### Geographic SEO

The `HomePage` renders hidden city-specific content sections (`t.citySections`) for local SEO targeting:

```html
<div id="locations" class="hidden" aria-hidden="true">
    <div id="mardan"><h2>Mardan...</h2><p>...</p></div>
    <div id="peshawar"><h2>Peshawar...</h2><p>...</p></div>
    ...
</div>
```

### robots.txt

```
User-agent: *
Allow: /
Sitemap: https://gullrealestate.github.io/sitemap.xml
```

All pages are allowed for crawling. Sitemap URL is specified.

---

## 9.2 Progressive Web App (PWA)

### Web App Manifest

**File**: `public/manifest.json`

```json
{
    "name": "Gull Real Estate & Builders",
    "short_name": "Gull RE",
    "description": "Real estate agency in Mardan, KPK",
    "start_url": "/en",
    "display": "standalone",
    "background_color": "#282828",
    "theme_color": "#458588",
    "lang": "en",
    "icons": [
        { "src": "/images/logo.webp", "sizes": "192x192", "type": "image/webp" },
        { "src": "/images/logo.webp", "sizes": "512x512", "type": "image/webp" }
    ]
}
```

### Service Worker

**File**: `public/sw.js` (42 lines)

**Strategy**: Network-first with offline fallback

**Lifecycle**:

1. **Install**: Pre-caches essential URLs:
   - `/` (root)
   - `/en` (English home)
   - `/ur` (Urdu home)
   - `/images/logo.webp`
   - `/offline.html` (fallback page)

2. **Activate**: Cleans up old caches (any cache not matching `gull-re-v1`)

3. **Fetch**: For navigation requests only:
   - Try network first
   - On failure → check cache for matching request
   - If no cache match → serve `/offline.html`

### Service Worker Registration

In `index.html`:

```javascript
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js');
    });
}
```

### Offline Page

**File**: `public/offline.html`

A standalone HTML page (no React dependency) with inline Gruvbox styling that displays an offline notice.

---

## 9.3 Performance Optimizations

### Code Splitting

```typescript
// Lazy-loaded heavy components
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const UniversalContactForm = React.lazy(() => import('./features/contact/UniversalContactForm'));
```

`ContactPage` and `UniversalContactForm` are loaded on-demand, reducing the initial bundle size.

### Bundle Splitting

```javascript
// vite.config.cts
manualChunks: {
    vendor: ['react', 'react-dom'],    // Stable vendor chunk (cacheable)
    icons: ['lucide-react'],           // Icon library chunk
}
```

### Resource Hints

```html
<!-- Preconnect to font servers -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload critical image -->
<link rel="preload" as="image" href="/images/logo.webp" fetchpriority="high">
```

### Image Optimization

- Logo uses WebP format (`logo.webp`)
- Logo has explicit `width` and `height` attributes to prevent CLS (Cumulative Layout Shift)
- `fetchPriority="high"` on the logo and hero image
- `decoding="sync"` on the logo (above-the-fold priority)
- Contact page images use `loading="lazy"`

### Font Loading

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&
    family=Outfit:wght@400;500;600;700;800&
    family=Noto+Nastaliq+Urdu:wght@400..700&display=swap" rel="stylesheet">
```

`display=swap` ensures text is visible immediately with a fallback font while custom fonts load.

### Scroll Tracking Throttling

Scroll depth checking runs at most once every 150ms via `setTimeout` throttling.

### Accessibility

- Skip-to-content link (`<a href="#main-content" class="skip-link">`)
- `role="dialog"` and `aria-modal="true"` on modals
- Focus trap in `CallErrorModal`
- `aria-label` on all interactive elements
- `role="alert"` on validation error messages
- `aria-invalid` on invalid form fields
- `role="radiogroup"` with `aria-checked` on toggle buttons
- Semantic HTML (`<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`)
