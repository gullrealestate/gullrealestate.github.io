---
name: lint-and-format
description: Procedure for running, fixing, and verifying ESLint and formatting standards with zero warnings. Use when linting code, fixing import styles, or formatting files.
---

# Lint and Format Skill

This skill explains how to inspect and remediate linting and formatting issues in the repository.

## Step 1: Run Linter
Execute the linter (using devenv or standard npm):
```bash
devenv shell -- npm run lint
# or:
npm run lint
```

## Step 2: Remediate Common Violations
1. **Type Imports**:
   - Error: `@typescript-eslint/consistent-type-imports`
   - Fix: Change to inline type import: `import { type MyType, myVal } from './module';`
2. **Unused Variables**:
   - Error: `@typescript-eslint/no-unused-vars`
   - Fix: Prefix with underscore `_` if intentionally unused, or remove identifier.
3. **Console Logging**:
   - Error: `no-console`
   - Fix: Remove `console.log`. Only `console.warn` and `console.error` are allowed for caught errors.

## Step 3: Verification
Re-run `npm run lint` until output finishes cleanly with exit code 0 and 0 warnings.
