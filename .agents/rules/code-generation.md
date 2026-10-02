# Rule: Code Generation Standards

Applies to all code generation and UI development within `src/`.

## 1. Architecture & Design System
- UI styling must use exclusively the custom **Gruvbox** color palette defined in `tailwind.config.js`:
  - Surfaces: `bg-bg0` (`#282828`), `bg-bg1` (`#3c3836`), `bg-bg2` (`#504945`)
  - Typography: `text-fg` (`#ebdbb2`), `text-gray` (`#928374`)
  - Accents: `bg-blue` / `text-blue` (`#458588`), `bg-orange` (`#d65d0e`), `text-green` (`#98971a`), `text-red` (`#cc241d`), `hover:bg-aqua` (`#689d6a`)
- Never use generic Tailwind grays (`gray-500`, `slate-900`) or raw hex codes in markup.
- Layout direction is `ltr` (English-only).

## 2. TypeScript & Imports
- Inline type imports are required by ESLint:
  ```typescript
  import { useState, type ReactElement } from 'react';
  import type { LeadData } from './types.ts';
  ```
- Strict typing: do not use `any`.
- Relative imports should match surrounding file style.
- User-facing text must be centralized in `src/content.ts`.

## 3. Contact Flows & Lead Generation
- Any route offering contact or lead capture must be protected by `<PolicyGate>`.
- WhatsApp links must be constructed through `buildWhatsAppUrl()` in `src/features/contact/utils/whatsappBuilder.ts`.
