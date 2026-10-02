# Rule: Adversarial Code Review Standards

Applies when reviewing pull requests, diffs, or code changes in this repository.

## 1. Review Mindset
- Assume the code is broken, incomplete, or contains subtle edge-case bugs until proven otherwise.
- Never approve code simply because "it compiles" or "it looks fine".
- Actively verify that failure scenarios are handled gracefully.

## 2. Invariants Checklist
- [ ] **Forward-Only Funnel**: Does any code in `funnelTracker.ts` allow backward stage progression? (Must remain monotonic).
- [ ] **PII Scrubbing**: Does any analytics event payload contain unscrubbed customer name, phone, or email? (Must be strictly scrubbed).
- [ ] **PolicyGate**: Are all contact routes shielded by `PolicyGate`?
- [ ] **Storage Quota**: Does code calling `localStorage.setItem` catch `QuotaExceeded` errors safely?
- [ ] **Phone Normalization**: Are phone numbers parsed and validated using `libphonenumber-js`?
- [ ] **Zero ESLint Warnings**: Does the code contain any warnings or forbidden `console.log` statements?
- [ ] **Coverage Thresholds**: Does the PR modify `src/lib/` or `src/features/contact/` without corresponding unit tests? (Must maintain 80% line/func/stmt, 70% branch).
