# GitHub Copilot Instructions — GULL Real Estate & Builders

This guide outlines prompt instructions, code style patterns, and engineering constraints for GitHub Copilot (and Copilot Chat / Copilot Edits) working in the `gullrealestate.github.io` repository.

---

## 1. Project Context & Stack

- **Domain**: Lead generation web app for GULL Real Estate & Builders in Mardan, Pakistan.
- **Key Flow**: Multi-step forms generating formatted WhatsApp URLs sent to real estate agents (CEO, Agent 1, Agent 2).
- **Languages**: English UI with centralized copy in `src/content.ts`.
- **Core Stack**: React 18, Vite 7, TypeScript 5.7 (strict mode), Tailwind CSS 3 (Gruvbox theme), React Router v7, Vitest with Istanbul coverage.

---

## 2. Code Generation & TypeScript Rules

### Type Imports (Strict Linter Requirement)
The project uses `@typescript-eslint/consistent-type-imports` with `fixStyle: 'inline-type-imports'`. **Always use inline type imports**:

```typescript
// ✅ DO:
import { useState, useEffect, type ReactElement, type ChangeEvent } from 'react';
import type { LeadData, ContactFormProps } from '../types.ts';

// ❌ DON'T (causes build-breaking lint error):
import { LeadData } from '../types.ts';
```

### Type Safety & Variables
- **Strict Typing**: Never use `any`. Define interfaces in local `types.ts` or alongside components.
- **Unused Variables**: Prefix unused parameters or variables with `_` (e.g., `_event`, `_index`).
- **Imports**: Match surrounding relative import conventions (e.g. `../../lib/phoneUtils.ts`).

### Console Logging Rule
- **Never** generate `console.log`. The repository enforces `no-console` with zero warnings allowed.
- Permitted exceptions: `console.warn` and `console.error` for caught boundary errors.

---

## 3. Styling & Gruvbox Design System

Tailwind is configured with custom **Gruvbox** color tokens. Do not use generic Tailwind grays (`gray-500`, `slate-800`) or hardcoded hex colors.

### Palette Tokens
- `bg-bg0` (`#282828`) — Main page background
- `bg-bg1` (`#3c3836`) — Card and modal surfaces
- `bg-bg2` (`#504945`) — Input backgrounds and elevated borders
- `text-fg` (`#ebdbb2`) — Primary text
- `text-gray` (`#928374`) — Muted / secondary text
- `bg-blue` / `text-blue` (`#458588`) — Primary brand accent, main buttons
- `bg-orange` / `text-orange` (`#d65d0e`) — Secondary highlights
- `text-green` / `border-green` (`#98971a`) — Success states
- `text-red` / `border-red` (`#cc241d`) — Error messages and required asterisks
- `hover:bg-aqua` (`#689d6a`) — Interactive hover states

### Typography
- Headings: `font-headline` (Outfit / Manrope)
- Body text: Inter, sans-serif

---

## 4. Idiomatic Component Patterns

### React Component Template
```tsx
import { type ReactElement } from 'react';
import { content } from '../../content.ts';

interface CustomSectionProps {
    readonly onAction?: () => void;
}

export function CustomSection({ onAction }: CustomSectionProps): ReactElement {
    return (
        <section className="rounded-lg bg-bg1 p-6 text-fg border border-bg2" dir="ltr">
            <h2 className="text-xl font-bold mb-4 font-headline">{content.servicesTitle}</h2>
            <button
                type="button"
                onClick={onAction}
                className="rounded bg-blue px-4 py-2 text-fg hover:bg-aqua transition-colors"
            >
                {content.heroBtn}
            </button>
        </section>
    );
}
```

### Form Step Validation Pattern
- Always normalize phone numbers using `normalizePhoneNumber()` from `src/lib/phoneUtils.ts`.
- Store drafts in `localStorage` safely with try/catch to handle storage quota exceptions.
- Dispatch analytics events using `trackEvent()` from `src/lib/analytics.ts` (never send phone numbers or names).

---

## 5. Vitest Test Pattern

When writing tests in `tests/`:
- Use Vitest and `@testing-library/react`.
- Mock browser APIs (`window.scrollTo`, `window.open`, `localStorage`).

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('FeatureComponent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('renders with expected text and elements', () => {
        // Test assertions here
    });
});
```

---

## 6. Forbidden Anti-Patterns

1. ❌ **No PII in Analytics**: Never pass customer `name`, `phone`, `email`, or `whatsapp` to `trackEvent()`.
2. ❌ **No Direct wa.me URLs**: Always use `buildWhatsAppUrl()` from `src/features/contact/utils/whatsappBuilder.ts` to ensure consistent lead ID generation.
3. ❌ **No Bypassing PolicyGate**: Any contact or lead-generation route must remain guarded by `PolicyGate`.
4. ❌ **No Arbitrary Strings**: Centralize user-facing copy in `src/content.ts`.
5. ❌ **No Untyped Code**: Never introduce loose or untyped props; compile under strict TypeScript without warnings.
