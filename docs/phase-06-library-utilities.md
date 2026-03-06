# Phase 6: Library Utilities & Services

## 6.1 Analytics Module

**File**: `src/lib/analytics.ts` (145 lines)

### Purpose

Provides a unified analytics abstraction layer that dispatches events to whichever analytics provider is configured, with automatic PII (Personally Identifiable Information) scrubbing.

### Provider Priority

```
1. window.gtag      → Google Analytics 4 (GA4)
2. window.plausible  → Plausible Analytics
3. console.warn      → Development fallback (DEV mode only)
```

### API

#### `trackEvent(eventName, params?)`

```typescript
function trackEvent(eventName: string, params?: TrackEventParams | EventParams): void
```

**Parameters**:
- `eventName` — Event identifier (e.g., `'cta_click'`, `'form_started'`, `'whatsapp_clicked'`)
- `params` — Optional metadata. Supports both structured (`TrackEventParams`) and flat (`EventParams`) formats

**PII Protection**:

All parameters are scrubbed through `scrubPII()` before dispatch. The following keys are **silently stripped**:

```typescript
const PII_BLOCKLIST = new Set(['phone', 'name', 'email', 'fullname', 'whatsapp']);
```

This is a defense-in-depth measure — even if a developer accidentally passes PII, it will never reach the analytics endpoint.

### Scroll Depth Tracking

#### `initScrollTracking()` → `() => void`

Initializes passive scroll listeners that fire analytics events at configurable depth thresholds.

**Thresholds**: 50%, 90%

**Features**:
- **Throttled**: Checks run at most once every 150ms
- **Session-scoped**: Uses `sessionStorage` (`gull_scroll_fired`) to prevent duplicate events in the same session
- **SSR-safe**: No-ops if `window` is undefined
- **Dev-aware**: Disabled in dev mode unless `VITE_ENABLE_ANALYTICS` env var is set
- Returns a cleanup function for React `useEffect` lifecycle

**Events dispatched**:
```
ScrollDepth { category: 'Engagement', action: 'ScrollDepth', label: '50%', value: 50 }
ScrollDepth { category: 'Engagement', action: 'ScrollDepth', label: '90%', value: 90 }
```

---

## 6.2 Funnel Tracker

**File**: `src/lib/funnelTracker.ts` (79 lines)

### Purpose

A lightweight, client-side **forward-only funnel state machine** for conversion tracking.

### Funnel Stages (in order)

| Stage | Description | Triggered By |
|---|---|---|
| `landing` | User lands on homepage | `HomePage` mount |
| `cta_clicked` | User clicks a CTA | Hero button / ContactPage mount |
| `form_started` | User opens a contact form | `useLeadForm` mount |
| `step_2` | User completes step 1 | `submitStep1()` |
| `review` | User completes step 2 | `submitStep2()` |
| `whatsapp_clicked` | User confirms and sends | `confirmAndSend()` |

### API

#### `setFunnelStage(stage, metadata)`

```typescript
function setFunnelStage(
    stage: FunnelStage,
    metadata: { lang: string; route: string }
): void
```

**Key behavior**: **Forward-only** — if the user is at `step_2`, setting `form_started` is silently ignored. This prevents funnel regression.

**Storage**: `localStorage` (`gull_funnel_state`)

**Integration**: Each stage advancement also dispatches a `FunnelProgress` analytics event:
```
FunnelProgress { category: 'Conversion', action: 'step_2', label: 'Step 4: step_2', value: 4 }
```

#### `getFunnelState()` → `FunnelState | null`

Returns the current stored funnel state including its stage, timestamp, language, and route.

---

## 6.3 Lead Persistence

**File**: `src/lib/leadPersistence.ts` (56 lines)

### Purpose

Durably stores lead data so that even if WhatsApp fails to open, the lead is preserved locally. Optionally forwards sanitized (PII-stripped) metadata to a backend endpoint.

### API

#### `saveLead(lead: PersistedLead)` → `Promise<void>`

**Two-tier persistence**:

1. **localStorage** (`gull_leads`) — Always attempted, adds to existing array
2. **Backend POST** — Only if `VITE_LEAD_ENDPOINT` env var is configured

**PII handling for backend**:
The backend POST only sends **non-PII fields**:
```typescript
{
    id, agent, timestamp, lang, source, intent, propertyType, location
}
```

Fields like `name`, `phone`, `budget`, `demands` are **never sent** to the backend.

**Error handling**: Both tiers use try-catch with no-op fallbacks. WhatsApp sending is completely independent of persistence.

#### `getStoredLeads()` → `PersistedLead[]`

Retrieves all locally stored leads from `localStorage`.

---

## 6.4 Phone Utilities

**File**: `src/lib/phoneUtils.ts` (30 lines)

### Purpose

Validates and normalizes phone numbers to E.164 international format using Google's `libphonenumber-js` library.

### API

#### `normalizePhone(input, defaultCountry?)` → `PhoneResult`

```typescript
type PhoneResult =
    | { valid: true; e164: string; waNumber: string }
    | { valid: false };
```

**Parameters**:
- `input` — Raw phone number string (e.g., `03149393930`, `+923149393930`)
- `defaultCountry` — Country code for parsing ambiguous numbers. Default: `'PK'`. Options: `'PK'`, `'AF'`, `'IN'`

**Returns**:
- `valid: true` — includes `e164` (e.g., `+923149393930`) and `waNumber` (e.g., `923149393930`)
- `valid: false` — for invalid, unparseable, or non-mobile numbers

**Usage**: Called in `useLeadForm` for step 1 validation and before building the WhatsApp message.

---

## 6.5 Internationalization Hook

**File**: `src/lib/i18n/useTranslation.ts` (17 lines)

### Purpose

A simple URL-based i18n hook that reads the `:lang` parameter from the URL and returns the appropriate translation dictionary.

### API

```typescript
function useTranslation(): {
    t: TranslationSchema;   // Full translation dictionary
    isUrdu: boolean;         // true if lang === 'ur'
    lang: string;            // 'en' or 'ur'
}
```

### How it works

1. Reads `lang` from `useParams<{ lang: 'en' | 'ur' }>()`
2. If `lang === 'ur'` → returns `ur` translations
3. Otherwise → returns `en` translations (default)

No external i18n library is used — translations are simple TypeScript objects with ~160 keys each.
