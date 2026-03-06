# Phase 7: Internationalization (i18n) & Localization

## 7.1 Architecture

The application uses a **homegrown i18n system** — no external library (no `react-i18next`, `formatjs`, etc.). Translations are plain TypeScript objects with a shared `TranslationSchema` type.

```
URL Pattern:        /:lang/*
                    /en  →  English (LTR, Inter/Outfit fonts)
                    /ur  →  Urdu (RTL, Noto Nastaliq Urdu font)
                    /*   →  Redirect to /en
```

### Files

| File | Size | Description |
|---|---|---|
| `src/locales/types.ts` | 162 lines | `TranslationSchema` interface (~160 typed keys) |
| `src/locales/en.ts` | ~300 lines | English translation dictionary |
| `src/locales/ur.ts` | ~350 lines | Urdu translation dictionary |
| `src/lib/i18n/useTranslation.ts` | 17 lines | Hook that selects the dictionary |

## 7.2 Translation Schema

The `TranslationSchema` type defines every translatable string in the application. Major groups:

### Page-Level

| Key | Example (EN) | Description |
|---|---|---|
| `metaTitle` | "Gull Real Estate..." | SEO page title |
| `metaDesc` | "Property agency..." | SEO meta description |
| `heroTitle` | "Real Estate Agency in Mardan" | Hero banner heading |
| `heroSub` | "Speak with CEO & Expert Agents." | Hero subtitle |
| `heroBtn` | "Contact Us" | Hero CTA button |

### Services Section

| Key | Example (EN) |
|---|---|
| `servicesTitle` | "Our Services" |
| `buySellTitle` | "Buy & Sell Property" |
| `buySellDesc` | Description text |
| `tenantTitle` | "Find a Rental" |
| `landlordTitle` | "List Your Property" |

### Policy Section

| Key | Example (EN) |
|---|---|
| `title` | "Agency Fee & Liability Policy" |
| `description` | Intro paragraph |
| `items` | Array of policy items (string or `{ label, content }`) |
| `footer` | Disclaimer footnote |

### Form Fields

| Key | Example (EN) |
|---|---|
| `fullName` | "Full Name" |
| `whatsappNumber` | "WhatsApp Number" |
| `propertyType` | "Property Type" |
| `house` / `plot` / `commercial` | "House" / "Plot" / "Commercial" |
| `budget` / `budgetLabel` | "Budget" |
| `landmarks` | Array of ~30 Mardan location names |

### Complex Types

```typescript
// FAQ items
faqs: { q: string; a: string }[];

// City SEO sections
citySections: {
    id: string;
    title: string;
    content: string;
}[];

// Policy items (mixed type)
items: (string | { label: string; content: string })[];
```

## 7.3 RTL Support

When `isUrdu` is true, the entire layout switches to Right-to-Left:

### CSS Rules (`index.css`)

```css
/* RTL font override — all elements use Noto Nastaliq Urdu */
[dir="rtl"], [dir="rtl"] p, [dir="rtl"] span, [dir="rtl"] li, ...
{
    font-family: "Noto Nastaliq Urdu", serif !important;
    font-optical-sizing: auto !important;
}

/* RTL input spacing adjustments */
[dir="rtl"] input, [dir="rtl"] select, [dir="rtl"] textarea {
    padding-top: 1rem !important;
    padding-bottom: 0.75rem !important;
    min-height: 3.5rem !important;
    font-size: 1.1rem !important;
}

/* RTL paragraph line height (Nastaliq requires extra spacing) */
[dir="rtl"] p, [dir="rtl"] li {
    line-height: 2.5 !important;
    margin-bottom: 1.5rem !important;
}

/* RTL heading spacing */
[dir="rtl"] h1, [dir="rtl"] h2, ... {
    line-height: 2.2 !important;
}

/* RTL select arrow position fix */
[dir="rtl"] select {
    background-position: left 0.75rem center !important;
}
```

### Component-Level RTL

Throughout the codebase, RTL is handled by:

1. **`dir` attribute**: `dir={isUrdu ? "rtl" : "ltr"}` on container elements
2. **Tailwind RTL utilities**: `rtl:right-auto rtl:left-0` for positioned elements
3. **Conditional margins**: `isUrdu ? "ml-2" : "mr-2"` for icon spacing
4. **Arrow rotation**: `isUrdu ? "rotate-180" : ""` for directional icons (ArrowLeft, ChevronRight)
5. **Text alignment**: `isUrdu ? "text-right" : "text-left"` for content sections

## 7.4 Language Switching

The language toggle in `Header.tsx`:

```typescript
const toggleLanguage = () => {
    const newLang = isUrdu ? 'en' : 'ur';
    trackEvent('language_switch', { ... });
    window.location.href = `/${newLang}`;  // Full page reload
};
```

**Note**: Language switching uses a full page reload (`window.location.href`), not React navigation. This ensures all RTL/LTR styles and fonts are properly applied.

## 7.5 WhatsApp Message Localization

The WhatsApp message builder (`whatsappBuilder.ts`) produces completely different templates based on language:

### Urdu-Specific Features

- **Gender-aware grammar**: Urdu verbs conjugate differently for male/female:
  - Male: `بات کر رہا ہوں` (I am speaking)
  - Female: `بات کر رہی ہوں` (I am speaking)
  - Male: `دلچسپی چاہتا ہوں` (I want)
  - Female: `دلچسپی چاہتی ہوں` (I want)
- **Right-to-Left Mark** (`\u200F`): Prepended to each line for proper rendering in WhatsApp's mixed-direction layout
- **Urdu property terminology**: مرلے (marlas), بجلی (electricity), بالاکونی (balcony), etc.

## 7.6 Alternate Language Links

The `SEO.tsx` component generates `hreflang` alternate links for search engines:

```html
<link rel="alternate" hrefLang="en" href="https://gullrealestate.github.io/en{path}" />
<link rel="alternate" hrefLang="ur" href="https://gullrealestate.github.io/ur{path}" />
<link rel="alternate" hrefLang="x-default" href="https://gullrealestate.github.io/en{path}" />
```

This tells Google that both language versions exist and English is the default.
