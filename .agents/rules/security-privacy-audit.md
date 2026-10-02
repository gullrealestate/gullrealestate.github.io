# Rule: Security & Privacy Audit Standards

Applies to data handling, analytics, external integrations, and routing.

## 1. PII Scrubbing Invariant
- `src/lib/analytics.ts` defines `PII_BLOCKLIST = new Set(['phone', 'name', 'email', 'fullname', 'whatsapp'])`.
- This blocklist must **never** be bypassed or weakened.
- All telemetry and analytics events dispatched via `trackEvent()` must automatically scrub sensitive information.
- Raw third-party analytics calls (`window.gtag`, `window.plausible`) must never be called directly from components; they must route through `trackEvent()`.

## 2. PolicyGate Protection
- All contact forms, lead submission routes, and direct-agent forms (`/contact`, `/contactCEO`, `/contactAgentA`, `/contactAgentB`) must remain wrapped inside `<PolicyGate>`.
- Users must accept the agency fee and liability policy before any personal or inquiry data is submitted.

## 3. Storage & Network Security
- Local storage operations must sanitize data before persistence.
- Any network requests (e.g. `leadPersistence.ts`) must transmit sanitized payloads without plaintext PII.
- WhatsApp links must use HTTPS `https://web.whatsapp.com` or custom URI `whatsapp://` schemes without leaking sensitive session tokens.
