# Rule: Linter & Formatting Standards

Applies to all JavaScript, TypeScript, and React code in this repository.

## 1. ESLint Zero-Warning Policy
- The project enforces `npm run lint` with `--max-warnings 0`. Any warning fails the build.
- Do not add `eslint-disable` comments without an explicit, documented architectural justification.

## 2. Specific Enforced Rules
1. **`@typescript-eslint/consistent-type-imports`**:
   - `fixStyle: 'inline-type-imports'`
   - Correct: `import { useState, type ReactElement } from 'react';`
   - Incorrect: `import { ReactElement } from 'react';`
2. **`@typescript-eslint/no-unused-vars`**:
   - Unused parameters or variables must be prefixed with `_` (e.g. `_event`, `_index`).
3. **`no-console`**:
   - `console.log` is forbidden.
   - Only `console.warn` and `console.error` are allowed for caught boundary errors.
4. **`react-refresh/only-export-components`**:
   - Component files should only export React components or constant exports.

## 3. Formatting
- Use 4 spaces for indentation.
- Single quotes for strings, semicolons enabled.
