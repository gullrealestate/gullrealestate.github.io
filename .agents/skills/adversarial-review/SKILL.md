---
name: adversarial-review
description: Step-by-step adversarial peer review procedure to detect regressions, logic flaws, and domain invariant violations. Use when reviewing code changes, diffs, or PRs.
---

# Adversarial Review Skill

This skill outlines how to conduct an unyielding, rigorous peer review of proposed changes.

## Step 1: Scan for Architectural Boundary Violations
1. Check if any contact route bypasses `<PolicyGate>`.
2. Check if `funnelTracker.ts` allows any non-forward stage transitions.
3. Check if analytics events send raw customer names, phones, or emails.
4. Check if external URLs are hardcoded instead of generated through `whatsappBuilder.ts`.

## Step 2: Edge-Case & Error-Handling Sweep
1. **Empty/Null State Handling**: What happens if the user leaves inputs blank or enters special characters?
2. **Quota Exceeded**: Does any code writing to `localStorage` or `sessionStorage` fail gracefully when quota is exceeded?
3. **Network/Window Failures**: Does `window.open` handle pop-up blocker blocks safely?
4. **Hook Dependency Arrays**: Are all referenced variables present in `useEffect`/`useCallback` dependency arrays?

## Step 3: Construct Review Verdict
Deliver a structured review:
- **Blockers (Must Fix)**: Bugs, invariant violations, or potential crashes.
- **Risks & Edge Cases**: Potential failure states under adverse conditions.
- **Verification Needed**: Specific tests or scenarios the author must prove work.
