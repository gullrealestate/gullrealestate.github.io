---
name: code-generation
description: Guides the generation of idiomatic React 18, TypeScript, and Gruvbox Tailwind components for GULL Real Estate. Use when creating or refactoring UI components or hooks.
---

# Code Generation Skill

This skill provides step-by-step procedures for authoring React components, hooks, and feature submodules.

## Step 1: Design & Requirements Review
1. Check existing components in `src/components/` and `src/features/contact/steps/` for similar layout patterns.
2. Determine required props, state lifecycle, and event handlers.
3. Check `src/content.ts` for existing text strings or add new keys if needed.

## Step 2: Component Implementation Checklist
- [ ] Functional component returning `ReactElement`.
- [ ] Props interface marked `readonly` where appropriate.
- [ ] Strict inline type imports (`import { type ReactElement } from 'react';`).
- [ ] Gruvbox color tokens exclusively used (`bg-bg0`, `bg-bg1`, `bg-bg2`, `text-fg`, `text-gray`, `bg-blue`, `hover:bg-aqua`, `text-red`, etc.).
- [ ] Accessible semantic tags (`<button type="button">`, `<section>`, `<nav>`, `aria-label`).
- [ ] No `console.log` statements.

## Step 3: Verification
- Verify TypeScript types compile cleanly without warnings.
- Run ESLint to guarantee zero warnings.
