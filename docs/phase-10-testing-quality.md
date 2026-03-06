# Phase 10: Testing & Quality Assurance

## 10.1 Test Framework

| Tool | Version | Purpose |
|---|---|---|
| Vitest | `^4.0.18` | Test runner (Vite-native, fast) |
| jsdom | `^28.1.0` | Browser environment simulation |
| @testing-library/react | `^16.3.2` | React component testing |
| @testing-library/dom | `^10.4.1` | DOM assertions |
| @testing-library/jest-dom | `^6.9.1` | Custom matchers |
| @testing-library/user-event | `^14.6.1` | User interaction simulation |
| @vitest/coverage-istanbul | `^4.0.18` | Code coverage |
| ajv | `^8.18.0` | JSON Schema validation |

### Vitest Configuration

**File**: `vitest.config.ts`

```typescript
// Test environment: jsdom (browser simulation)
// Coverage: Istanbul
// Test files: tests/*.test.{ts,tsx}
```

## 10.2 Test Suite Overview

| Test File | Subject | Tests | Description |
|---|---|---|---|
| `analytics.test.ts` | `src/lib/analytics.ts` | Event tracking | PII scrubbing, provider dispatch, scroll tracking |
| `funnelTracker.test.ts` | `src/lib/funnelTracker.ts` | Funnel state machine | Forward-only progression, localStorage integration |
| `leadPersistence.test.ts` | `src/lib/leadPersistence.ts` | Lead storage | localStorage CRUD, API POST, PII handling |
| `phoneUtils.test.ts` | `src/lib/phoneUtils.ts` | Phone validation | E.164 normalization, country codes, edge cases |
| `useLeadForm.test.tsx` | `features/contact/hooks/useLeadForm.ts` | Form hook | State management, validation, submission flow |
| `whatsappBuilder.test.ts` | `features/contact/utils/whatsappBuilder.ts` | Message builder | Message structure, bilingual output, URL encoding |

## 10.3 Test Details

### Analytics Tests (`analytics.test.ts`)

**What's tested**:
- `trackEvent()` dispatches to GA4 when `window.gtag` exists
- `trackEvent()` dispatches to Plausible when `window.plausible` exists
- PII blocklist keys (`phone`, `name`, `email`, `fullname`, `whatsapp`) are **stripped** before dispatch
- Non-PII keys pass through untouched
- Dev mode falls back to `console.warn`
- Scroll depth tracking fires at 50% and 90% thresholds
- Session storage prevents duplicate scroll events
- Cleanup function properly removes event listeners

### Funnel Tracker Tests (`funnelTracker.test.ts`)

**What's tested**:
- `setFunnelStage()` advances through stages correctly
- Forward-only rule: attempting to go backwards is silently ignored
- State is persisted to `localStorage` as JSON
- `getFunnelState()` returns the current state or `null`
- Analytics events are dispatched on stage changes
- Error handling for `localStorage` failures

### Lead Persistence Tests (`leadPersistence.test.ts`)

**What's tested**:
- `saveLead()` appends to existing leads array
- `getStoredLeads()` returns all stored leads
- localStorage quota errors are handled gracefully
- Backend POST sends only sanitized (non-PII) data
- Backend POST failures don't throw
- `VITE_LEAD_ENDPOINT` env var controls API behavior

### Phone Utils Tests (`phoneUtils.test.ts`)

**What's tested**:
- Pakistani mobile numbers (`03xx`, `+923xx`) normalize correctly
- E.164 format output (e.g., `+923149393930`)
- `waNumber` strips the `+` prefix (e.g., `923149393930`)
- Invalid numbers return `{ valid: false }`
- Default country parsing (`PK`, `AF`, `IN`)
- Edge cases: empty strings, partial numbers, non-phone text

### Lead Form Hook Tests (`useLeadForm.test.tsx`)

**What's tested**:
- Default form state initialization
- Draft restoration from localStorage
- Step 1 validation (name, phone required)
- Step 2 validation (location, marlas, budget required)
- Conditional validation (rent → occupancyDate, list → streetWidth)
- Step progression (1 → 2 → 3)
- Analytics events fired on step completion
- Funnel stage updates
- `confirmAndSend()` builds WhatsApp URL and opens window
- Lead persistence after send
- Draft cleanup after send

### WhatsApp Builder Tests (`whatsappBuilder.test.ts`)

**What's tested**:
- English message structure and content
- Urdu message structure with RTL marks
- Gender-aware Urdu verb conjugation
- Intent-specific fields (buy vs. rent vs. list)
- Lead ID generation format (`GRE-YYMMDD-HHmmss`)
- URL encoding preserves Unicode characters
- Mobile vs. desktop URL format detection
- Translation key mapping
- CEO-specific fields (plot category, utilities)
- Agent-specific role titles

## 10.4 Test Commands

```bash
# Run all tests once
npm test

# Run tests with coverage report
npm run test:coverage

# Run in watch mode (development)
npx vitest
```

## 10.5 Code Coverage

Coverage is generated via Istanbul (`@vitest/coverage-istanbul`) and output to the `coverage/` directory.

**Coverage scope**: All `src/lib/` utilities and `src/features/contact/` modules are covered by tests.

**Excluded from coverage**: UI components (tested manually via browser), locale files, and configuration files.

## 10.6 Quality Assurance Checklist

### Automated

- [x] TypeScript strict mode (`strict: true`, `noUnusedLocals`, `noUnusedParameters`)
- [x] ESLint with zero-warning policy (`--max-warnings 0`)
- [x] Vitest unit tests for all business logic
- [x] PII scrubbing in analytics layer
- [x] Forward-only funnel tracking (prevents data corruption)
- [x] Phone number validation via `libphonenumber-js`
- [x] Type-safe translations (`TranslationSchema` interface)

### Manual

- [x] RTL layout testing (Urdu displays correctly)
- [x] WhatsApp message rendering (emoji, Unicode, line breaks)
- [x] Mobile responsiveness (320px minimum width)
- [x] Accessibility: keyboard navigation, screen reader, focus trapping
- [x] Cross-browser testing (Chrome, Safari, Firefox)
- [x] PWA install flow testing
- [x] Offline fallback page verification
