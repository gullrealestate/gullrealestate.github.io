# Phase 2: Technology Stack & Dependencies

## 2.1 Runtime Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | `^18.2.0` | UI framework (component-based rendering) |
| `react-dom` | `^18.2.0` | DOM rendering for React |
| `react-router-dom` | `^7.13.0` | Client-side routing with `BrowserRouter` |
| `react-helmet-async` | `^2.0.5` | Dynamic `<head>` management (SEO meta tags, JSON-LD) |
| `lucide-react` | `^0.344.0` | Icon library (tree-shakeable SVG icons) |
| `libphonenumber-js` | `^1.12.38` | Phone number parsing, validation, and E.164 normalization |

### Dependency Rationale

- **`react-router-dom` v7**: Provides the `/:lang/*` pattern for language-prefix routing, `useParams`, `useSearchParams`, and `useLocation` hooks
- **`react-helmet-async`**: Chosen over `react-helmet` for concurrent rendering safety; manages per-page `<title>`, meta descriptions, Open Graph tags, and JSON-LD structured data
- **`lucide-react`**: Lightweight icon set using ES module tree-shaking; used across all components for consistent iconography
- **`libphonenumber-js/mobile`**: Specifically the mobile-only build (smaller bundle) for Pakistan (`PK`), Afghanistan (`AF`), and India (`IN`) phone number validation

## 2.2 Development Dependencies

### Build Tooling

| Package | Version | Purpose |
|---|---|---|
| `vite` | `^7.0.0` | Dev server and production bundler |
| `@vitejs/plugin-react` | `^4.3.4` | React Fast Refresh and JSX transform |
| `typescript` | `^5.7.3` | Type checking and compilation |
| `terser` | `^5.46.0` | JavaScript minification (used by Vite build) |
| `postcss` | `^8.5.3` | CSS processing pipeline |
| `autoprefixer` | `^10.4.20` | Automatic vendor prefixes |
| `tailwindcss` | `^3.4.1` | Utility-first CSS framework |

### Linting

| Package | Version | Purpose |
|---|---|---|
| `eslint` | `^10.0.0` | JavaScript/TypeScript linting |
| `@eslint/js` | `^10.0.1` | ESLint recommended rules |
| `typescript-eslint` | `^8.56.0` | TypeScript-specific ESLint rules |
| `@typescript-eslint/eslint-plugin` | `^8.24.1` | TS lint rules (consistent-type-imports, no-unused-vars) |
| `@typescript-eslint/parser` | `^8.24.1` | TypeScript parser for ESLint |
| `eslint-plugin-react-hooks` | `^5.1.0` | React Hooks rules enforcement |
| `eslint-plugin-react-refresh` | `^0.4.19` | HMR-compatible export validation |
| `globals` | `^17.3.0` | Global variable definitions for ESLint |

### Testing

| Package | Version | Purpose |
|---|---|---|
| `vitest` | `^4.0.18` | Unit test runner (Vite-native) |
| `@vitest/coverage-istanbul` | `^4.0.18` | Code coverage via Istanbul |
| `jsdom` | `^28.1.0` | Browser environment simulation for tests |
| `@testing-library/react` | `^16.3.2` | React component testing utilities |
| `@testing-library/dom` | `^10.4.1` | DOM testing utilities |
| `@testing-library/jest-dom` | `^6.9.1` | Custom jest matchers (`toBeInTheDocument`, etc.) |
| `@testing-library/user-event` | `^14.6.1` | User interaction simulation |
| `ajv` | `^8.18.0` | JSON Schema validation (used in tests) |

### Build Scripts & Deployment

| Package | Version | Purpose |
|---|---|---|
| `puppeteer` | `^24.37.5` | Headless Chrome for pre-rendering |
| `express` | `^5.2.1` | Temporary server for pre-rendering |
| `sharp` | `^0.34.5` | Image processing (optimization) |
| `gh-pages` | `^6.3.0` | GitHub Pages deployment |

## 2.3 Package Overrides

```json
"overrides": {
    "minimatch": "^10.2.2"
}
```

The `minimatch` override is applied to resolve a dependency conflict where older transitive dependencies required a vulnerable version.

## 2.4 Module System

| Setting | Value | Location |
|---|---|---|
| Module type | `"module"` (ESM) | `package.json` → `"type": "module"` |
| Vite config | CommonJS (`.cts`) | `vite.config.cts` — uses `require()` due to build tooling constraints |
| Prerender script | CommonJS (`.cjs`) | `prerender.cjs` — uses `require()` for Puppeteer/Express |
| Sitemap script | CommonJS (`.cjs`) | `scripts/generate-sitemap.cjs` — uses `require()` for `fs`/`path` |

## 2.5 NPM Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Start development server with HMR |
| `build` | `tsc && vite build && node prerender.cjs && node scripts/generate-sitemap.cjs` | Full production build pipeline |
| `lint` | `eslint . --report-unused-disable-directives --max-warnings 0` | Lint with zero-warning policy |
| `preview` | `vite preview` | Preview production build locally |
| `test` | `vitest run` | Run all tests once |
| `test:coverage` | `vitest run --coverage` | Run tests with Istanbul coverage |
| `deploy` | `gh-pages -d dist` | Deploy `dist/` to GitHub Pages |

### Build Pipeline Breakdown

```
npm run build
    │
    ├── 1. tsc              → Type-check all TypeScript files
    ├── 2. vite build        → Bundle with Rollup, minify with Terser
    │      ├── Manual chunks: vendor (react/react-dom), icons (lucide-react)
    │      └── Output → dist/
    ├── 3. prerender.cjs     → Launch Express + Puppeteer, render 6 routes to static HTML
    └── 4. generate-sitemap  → Generate dist/sitemap.xml with hreflang alternates
```

## 2.6 TypeScript Configuration

### `tsconfig.json` (Source)

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "useDefineForClassFields": true,
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "skipLibCheck": true,
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true
    },
    "include": ["src"],
    "references": [{ "path": "./tsconfig.node.json" }]
}
```

### `tsconfig.node.json` (Build Tools)

```json
{
    "compilerOptions": {
        "composite": true,
        "skipLibCheck": true,
        "module": "ESNext",
        "moduleResolution": "bundler",
        "allowSyntheticDefaultImports": true
    },
    "include": ["vite.config.cts"]
}
```

## 2.7 Vite Configuration

```javascript
// vite.config.cts (CommonJS)
module.exports = defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': './src',
            '@components': './src/components',
            '@features': './src/features',
            '@lib': './src/lib',
            '@config': './src/config',
            '@locales': './src/locales',
            '@context': './src/context',
        },
    },
    build: {
        minify: 'terser',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    icons: ['lucide-react'],
                },
            },
        },
    },
});
```

### Path Aliases

| Alias | Resolves To |
|---|---|
| `@` | `./src` |
| `@components` | `./src/components` |
| `@features` | `./src/features` |
| `@lib` | `./src/lib` |
| `@config` | `./src/config` |
| `@locales` | `./src/locales` |
| `@context` | `./src/context` |

> **Note**: While path aliases are configured in Vite, the codebase currently uses relative imports throughout. The aliases are available for future use.
