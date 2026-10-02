---
name: qa-and-testing
description: Procedures for writing Vitest tests, calculating Istanbul code coverage, and maintaining test thresholds. Use when creating or updating unit tests or investigating coverage drops.
---

# QA and Testing Skill

This skill explains how to author tests, maintain snapshot integrity, and enforce Istanbul coverage thresholds.

## Step 1: Run Existing Tests & Coverage
```bash
devenv shell -- npm run test:coverage
# or:
npm run test:coverage
```

## Step 2: Testing Best Practices
1. **Mocking**:
   - Always mock browser globals that throw in jsdom:
     ```typescript
     window.scrollTo = vi.fn();
     window.open = vi.fn();
     ```
2. **Deterministic Time**:
   - When testing timestamp-based lead generation, use fake timers or verify regex pattern matching (`GRE-\d{6}-\d{6}`).
3. **Thresholds Compliance**:
   - Ensure modified files satisfy:
     - Branches: ≥ 70%
     - Functions: ≥ 80%
     - Lines: ≥ 80%
     - Statements: ≥ 80%
4. **Snapshot Updates**:
   - If message formatting changes intentionally, update snapshots:
     ```bash
     npx vitest -u
     ```
