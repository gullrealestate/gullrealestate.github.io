# Phase 8: Build Pipeline, Deployment & DevOps

## 8.1 Build Pipeline

The production build is a 4-stage pipeline:

```
npm run build
    │
    ├── Stage 1: tsc (TypeScript Compiler)
    │   → Checks all src/**/*.{ts,tsx} for type errors
    │   → No output (noEmit: true)
    │
    ├── Stage 2: vite build
    │   → Bundles with Rollup
    │   → Minifies with Terser
    │   → Manual chunks: vendor (react/react-dom), icons (lucide-react)
    │   → Output → dist/
    │
    ├── Stage 3: prerender.cjs (Puppeteer)
    │   → Spins up Express server on port 3000
    │   → Launches headless Chrome
    │   → Renders 6 routes to static HTML
    │   → Saves to dist/{route}/index.html
    │
    └── Stage 4: generate-sitemap.cjs
        → Generates dist/sitemap.xml
        → Includes hreflang alternates for each route
```

## 8.2 Pre-Rendering System

**File**: `prerender.cjs` (67 lines)

### What it does

The pre-renderer captures fully rendered HTML for each route, enabling:
- **SEO**: Search engine crawlers get fully rendered content (not a blank `<div id="root">`)
- **Performance**: Users see content immediately while React hydrates
- **Social sharing**: Open Graph tags are present in the raw HTML

### Pre-rendered Routes

| Route | What gets rendered |
|---|---|
| `/en` | English homepage |
| `/en/contact` | English contact page |
| `/en/contact/requirements` | English policy page |
| `/ur` | Urdu homepage |
| `/ur/contact` | Urdu contact page |
| `/ur/contact/requirements` | Urdu policy page |

### How it works

1. Start Express static server serving `dist/` on port 3000
2. Launch Puppeteer (headless Chrome)
3. For each route:
   - Navigate to `http://localhost:3000{route}`
   - Wait for `networkidle0` (no network requests for 500ms)
   - Wait for `#root div` selector (React has rendered)
   - Wait 2 seconds more (for animations/typewriter effects)
   - Capture `page.content()` (full HTML including rendered React output)
   - Save to `dist{route}/index.html`
4. Close browser and server

## 8.3 Sitemap Generation

**File**: `scripts/generate-sitemap.cjs` (40 lines)

Generates an XML sitemap with:
- All 6 pre-rendered routes
- `<xhtml:link>` alternates for each language pair
- Dynamic `<lastmod>` (build date)
- `<changefreq>weekly</changefreq>`
- Priority: `1.0` for home pages, `0.8` for contact pages

### Output

Generated at `dist/sitemap.xml`

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://gullrealestate.github.io/en</loc>
    <xhtml:link rel="alternate" hreflang="en" />
    <xhtml:link rel="alternate" hreflang="ur" />
    <lastmod>2026-03-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ...
</urlset>
```

## 8.4 Deployment

### GitHub Pages

Deployed via the `gh-pages` npm package:

```bash
npm run deploy  →  gh-pages -d dist
```

This pushes the `dist/` directory contents to the `gh-pages` branch, which GitHub Pages serves at `https://gullrealestate.github.io`.

### Jekyll Configuration

**File**: `_config.yml` (15 lines)

GitHub Pages configuration for the site:

```yaml
title: GULL Real Estate and Builders
description: Based in Mardan, HQ for KPK property investment
url: "https://gullrealestate.github.io"
author: GULL Real Estate and Builders
logo: /images/logo.png
plugins:
  - jekyll-seo-tag
```

**Note**: While Jekyll configuration exists, the site is a fully built SPA — Jekyll provides minimal value here (mainly for GitHub's metadata processing).

### GitHub Actions

The `.github/workflows/` directory contains CI/CD workflow(s) for automated builds and deployments.

## 8.5 ESLint Configuration

**File**: `eslint.config.js` (47 lines)

Uses ESLint v10 **flat config** format with TypeScript-ESLint integration.

### Rules

| Rule | Setting | Purpose |
|---|---|---|
| `react-hooks/recommended` | default | Enforce Rules of Hooks |
| `react-refresh/only-export-components` | warn | HMR-compatible exports |
| `@typescript-eslint/consistent-type-imports` | error | Force `type` keyword for type-only imports |
| `@typescript-eslint/no-unused-vars` | error | Flag unused vars (except `_` prefix) |
| `no-console` | warn | Allow `console.warn` and `console.error` only |

### Ignores

- `dist/` — Build output
- `coverage/` — Test coverage reports

## 8.6 PostCSS Configuration

**File**: `postcss.config.js` (5 lines)

```javascript
export default {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};
```

Processes CSS through Tailwind CSS compilation and then autoprefixer for browser compatibility.

## 8.7 Tailwind CSS Configuration

**File**: `tailwind.config.js` (30 lines)

- **Content paths**: `./index.html`, `./src/**/*.{js,ts,jsx,tsx}`
- **Dark mode**: `class` (not used in current UI — the Gruvbox palette is inherently dark)
- **Custom colors**: Full Gruvbox palette under `colors.gruvbox.*`

## 8.8 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_ENABLE_ANALYTICS` | No | Enables scroll tracking in dev mode |
| `VITE_LEAD_ENDPOINT` | No | Backend URL for lead POST requests |
