---
name: security-and-privacy-audit
description: Checklist and instructions for auditing privacy, PII scrubbing, PolicyGate enforcement, and security risks. Use when auditing code changes or security postures.
---

# Security & Privacy Audit Skill

This skill guides the inspection of telemetry, storage, phone parsing, and data privacy in this repository.

## Step 1: PII Telemetry Audit
1. Inspect all occurrences of `trackEvent()` in modified files.
2. Ensure event parameters contain only sanitized identifiers (e.g. `intent`, `step`, `category`, `agentId`).
3. Verify that `phone`, `name`, `email`, `fullname`, or `whatsapp` are never passed in event payloads.
4. Verify that `PII_BLOCKLIST` in `src/lib/analytics.ts` has not been altered or commented out.

## Step 2: PolicyGate Enforcement Audit
1. Inspect `src/App.tsx` and ensure any new contact route is wrapped in `<PolicyGate>`.
2. Inspect new components dealing with customer inquiry forms to ensure they verify policy acceptance before opening external communication.

## Step 3: Phone Number Normalization Audit
1. Verify that any phone number string accepted by forms is normalized through `src/lib/phoneUtils.ts`.
2. Verify that country code assumptions match PK (+92), AF (+93), and IN (+91) parsing capabilities.
3. Verify that `wa.me/` URLs strip leading `+` symbols as required by the WhatsApp API.
