# KIRO.md — Kiro AI Agent Runbook & Steering Rules

This steering document guides **Kiro AI** when operating autonomously or semi-autonomously within the `gullrealestate.github.io` repository.

---

## 1. Agent Mission & Repository Topology

You are working in the codebase of **GULL Real Estate & Builders**, a localized property agency web app in Mardan, KPK, Pakistan. The web application generates high-intent property leads and connects prospects to the CEO and agents via formatted WhatsApp messages.

### Architecture Flow

```
User Entry (/)
  │
  ├── Homepage (/)
  │     ├── Hero + Services
  │     ├── Fee & Liability Policy Gate
  │     └── FAQ + Footer
  │
  └── Lead Generation Route (/contact, /contactCEO, /contactAgentA, /contactAgentB)
        │  [Guarded by PolicyGate]
        ▼
      Service Selection (Buy / Rent / List)
        ▼
      UniversalContactForm (3 Steps)
        ├── Step 1: User Info (Name, Phone, Gender)
        ├── Step 2: Property Details (Location, Marlas, Budget)
        └── Step 3: Review & Summary
              │
              ├── Generate Lead ID (GRE-YYMMDD-HHmmss)
              ├── Build WhatsApp URL (wa.me)
              ├── Persist Lead (localStorage)
              └── Dispatch Analytics (Scrubbed PII)
```

---

## 2. Environment & CLI Operations

The development environment is reproducible and managed using **Nix / devenv**.

### Command Execution Runbook

When executing terminal commands:
- If running in an environment where `node` and `npm` are provided through `devenv`, use:
  ```bash
  devenv shell -- <command>
  ```
- If already in an activated shell with `node` and `npm` in `$PATH`, run standard npm scripts:
  ```bash
  npm run <script>
  ```

### Key Lifecycle Scripts

| Script | Purpose | Command |
|---|---|---|
| **Development** | Starts Vite dev server with hot reload | `npm run dev` |
| **Linting** | Enforces zero ESLint warnings | `npm run lint` |
| **Unit Testing** | Runs Vitest unit tests | `npm test` |
| **Coverage** | Generates Istanbul code coverage | `npm run test:coverage` |
| **Build** | Typechecks, bundles, prerenders HTML | `npm run build` |
| **Preview** | Serves static output from `dist/` | `npm run preview` |
| **Complete Suite**| Runs lint, tests, coverage, and build | `npm run all` |

---

## 3. Autonomous Task Execution Protocol

When given a task in this repository, follow this execution protocol:

### Step 1: Context & Dependency Analysis
- Identify affected layers: UI components (`src/components/`), feature logic (`src/features/contact/`), core library utilities (`src/lib/`), or translations (`src/locales/`).
- If changes involve user-facing strings, verify both `en.ts` and `ur.ts` alongside `src/locales/types.ts`.

### Step 2: Implementation Guardrails
- **Strict Typing**: Comply with TypeScript strict mode. Use `inline-type-imports` (`import { type X } from '...'`).
- **Zero Warnings**: Ensure code does not trigger any ESLint warnings. Do not leave `console.log`.
- **Design System**: Use exclusively Gruvbox theme classes (`bg0`, `bg1`, `bg2`, `fg`, `gray`, `blue`, `orange`, `green`, `red`, `aqua`).
- **Preserve Documentation**: Keep all comments and docstrings intact.

### Step 3: Validation Loop
Before finishing any modification:
1. **Lint Check**: Confirm zero warnings:
   ```bash
   npm run lint  # or: devenv shell -- npm run lint
   ```
2. **Test Suite**: Run Vitest tests:
   ```bash
   npm test      # or: devenv shell -- npm test
   ```
3. **Coverage Compliance**: Ensure Istanbul thresholds remain satisfied (Branches ≥ 70%, Lines/Funcs/Stmts ≥ 80%):
   ```bash
   npm run test:coverage
   ```
4. **Build Verification**: If routes, SEO tags, or build scripts change, ensure the build and prerender pass:
   ```bash
   npm run build
   ```

---

## 4. Non-Negotiable System Invariants

1. **PII Safety (`src/lib/analytics.ts`)**:
   Never remove or bypass the `PII_BLOCKLIST` (`phone`, `name`, `email`, `fullname`, `whatsapp`). All event telemetry must be non-identifiable.
2. **Funnel State Machine Integrity (`src/lib/funnelTracker.ts`)**:
   Stage progression is strictly forward-only. Never alter logic to allow backwards state transitions.
3. **Policy Gate Enforcement (`src/components/PolicyGate.tsx`)**:
   Contact forms must remain inaccessible until the user explicitly accepts the agency policy.
4. **WhatsApp Message Integrity (`src/features/contact/utils/whatsappBuilder.ts`)**:
   Maintain lead ID timestamp format (`GRE-YYMMDD-HHmmss`) and structured English WhatsApp messaging. Vitest snapshot test in `tests/__snapshots__/whatsappBuilder.test.ts.snap` must remain aligned.
5. **Centralized Content**:
   All user-facing copy and translations are centralized in `src/content.ts`.

---

## 5. File Map Quick Reference

- **Agent Configurations**: `src/config/contacts.ts`
- **Contact Form Orchestrator**: `src/features/contact/UniversalContactForm.tsx`
- **Lead Form Hook**: `src/features/contact/hooks/useLeadForm.ts`
- **WhatsApp Message Generator**: `src/features/contact/utils/whatsappBuilder.ts`
- **Analytics & PII Scrubbing**: `src/lib/analytics.ts`
- **Phone Parser**: `src/lib/phoneUtils.ts`
- **Centralized Content**: `src/content.ts`
- **Pre-rendering Engine**: `prerender.cjs`
- **Detailed 10-Phase Docs**: `docs/phase-01-project-overview.md` through `docs/phase-10-testing-quality.md`
