# Rule: QA & Testing Standards

Applies to all test files in `tests/` and coverage maintenance across `src/lib/` and `src/features/contact/`.

## 1. Testing Framework
- Vitest with `jsdom` environment.
- Assertions and DOM interaction via `@testing-library/react` and `@testing-library/user-event`.
- Code coverage calculated via `@vitest/coverage-istanbul`.

## 2. Coverage Thresholds
Defined in `vitest.config.ts`. Every PR or modification touching covered directories must maintain or exceed:
- **Statements**: 80%
- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 70%

## 3. Snapshot Hygiene
- `tests/__snapshots__/whatsappBuilder.test.ts.snap` protects the WhatsApp URL and message structure.
- Any intentional changes to message structure require explicit snapshot updates (`npx vitest -u`).
- Unintended snapshot discrepancies are considered breaking regressions.

## 4. Test Isolation
- Always reset mocks and clear `localStorage` in `beforeEach()`:
  ```typescript
  beforeEach(() => {
      vi.clearAllMocks();
      localStorage.clear();
  });
  ```
- Mock browser APIs that do not exist or throw in jsdom (`window.scrollTo`, `window.open`).
