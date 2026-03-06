# Phase 5: Feature Modules — Contact System

## 5.1 Overview

The contact system is the core feature of the application. It's a **3-step multi-agent form** that collects lead information and sends it to a specific agent via WhatsApp.

```
Contact Flow:
  ContactPage (choose service)
      ↓
  UniversalContactForm
      ├── Step 1: StepUserInfo (name, phone, gender, intent)
      ├── Step 2: StepPropertyDetails
      │     ├── BuySellDetailsForm (buy/sell intent)
      │     ├── RentDetailsForm (rent intent)
      │     └── ListingDetailsForm (list intent)
      └── Step 3: StepReview → WhatsApp message sent
```

## 5.2 Agent Configuration

**File**: `src/config/contacts.ts` (70 lines)

### Agents

| Agent | ID | Name (EN) | Name (UR) | Role | WhatsApp |
|---|---|---|---|---|---|
| CEO | `ceo` | Asif Gull | آصف گل | Consultation & Strategy | `923149393930` |
| Agent 1 | `agent1` | Syed Ateeq ur Rahman | سید عتیق الرحمن | Rental & Listings | `923149624277` |
| Agent 2 | `agent2` | Mian Abdul Haq | میاں عبدالحق | Plot Sales | `923142121370` |

### Intent Configuration

| Intent | Label (EN) | Default Agent |
|---|---|---|
| `buy` | Buy Property | CEO |
| `rent` | Rent Property | Agent 1 |
| `list` | List a Property | Agent 1 |

### TypeScript Interfaces

```typescript
interface Agent {
    id: string;
    name: { en: string; ur: string };
    role: string;
    whatsapp: string;
    email?: string;
}

type IntentType = 'buy' | 'rent' | 'list';

interface IntentConfig {
    id: IntentType;
    label: { en: string; ur: string };
    defaultAgentId: string;
}
```

## 5.3 Type Definitions

**File**: `src/features/contact/types.ts` (54 lines)

### `LeadData` — Form State

```typescript
interface LeadData {
    name: string;              // User's full name
    phone: string;             // WhatsApp-capable phone number
    gender: 'male' | 'female'; // Affects Urdu grammar (verb conjugation)
    budget: string;            // Budget or asking price
    location: string;          // Selected from landmarks dropdown
    propertyType: string;      // House, Plot, Commercial
    demands: string;           // Free-text requirements
    intent: 'buy' | 'sell' | 'rent' | 'list';
    marlas: string;            // Property size in Marlas
    utilities: 'electricity' | 'elecGas';
    bedrooms: string;          // For rent intent
    bathrooms: string;         // For rent intent
    furnishing: 'furnished' | 'unfurnished';
    plotCategory: 'residential' | 'commercial';
    paymentMethod: 'cash' | 'installment';
    streetWidth: string;       // For listing (if not on main road)
    occupancyDate: string;     // For rent intent
    ownershipType: string;     // registry, inteqal, allotment, powerOfAttorney
    onMainRoad: boolean;       // Toggle for listing
}
```

### `PersistedLead` — Stored Lead

```typescript
interface PersistedLead extends LeadData {
    id: string;               // Format: GRE-YYMMDD-HHmmss
    agent: string;            // Agent name
    timestamp: string;        // ISO 8601
    lang: string;             // 'en' or 'ur'
    source: string;           // Route path
    status: 'pending' | 'sent' | 'failed';
    attempts: number;
    messageSnapshot: string;  // Full WhatsApp message text
}
```

## 5.4 `UniversalContactForm` — Form Orchestrator

**File**: `src/features/contact/UniversalContactForm.tsx` (148 lines)

| Prop | Type | Description |
|---|---|---|
| `contactType` | `'ceo' \| 'agent1' \| 'agent2'` | Target agent |
| `agentNames` | `{ en: string; ur: string }` | Agent display names |
| `agentWhatsApp` | `string` | Agent's WhatsApp number |

**Features**:
- Reads `?intent=` from URL search params for auto-selection
- 3-step progress indicator with checkmark animation
- Back button navigates to previous step or back to ContactPage
- Each step rendered conditionally based on `form.step` state
- Form card has Building2 watermark decoration

## 5.5 `useLeadForm` Hook — State Management

**File**: `src/features/contact/hooks/useLeadForm.ts` (271 lines)

The central hook managing all form state, validation, and submission.

### Options

```typescript
interface UseLeadFormOptions {
    contactType: ContactType;
    agentName: string;
    agentWhatsApp: string;
    isUrdu: boolean;
    lang: string;
    t: TranslationSchema;
    initialIntent: string | null;
}
```

### Returned API

| Property | Type | Description |
|---|---|---|
| `step` | `number` | Current step (1, 2, or 3) |
| `formData` | `LeadData` | Current form state |
| `errors` | `ValidationErrors` | Field-level validation errors |
| `hasAcceptedFormPolicy` | `boolean` | In-form policy checkbox state |
| `setHasAcceptedFormPolicy` | `(v: boolean) => void` | Toggle policy acceptance |
| `updateField` | `(name, value) => void` | Update a single field |
| `handleInputChange` | `(event) => void` | Standard input change handler |
| `submitStep1` | `(event) => void` | Validate + advance to step 2 |
| `submitStep2` | `(event) => void` | Validate + advance to step 3 |
| `confirmAndSend` | `() => void` | Build message + open WhatsApp |
| `goToStep` | `(step) => void` | Direct step navigation |

### Draft Persistence

- Form data is auto-saved to `localStorage` (`gull_form_draft`) on every change
- On mount, drafts are restored if available
- Drafts are cleared after successful WhatsApp send

### Validation Rules

**Step 1**:
- `name` must not be empty
- `phone` must not be empty AND must pass `normalizePhone()` validation

**Step 2**:
- `location` must be selected
- `marlas` (area) must not be empty
- `budget` must not be empty
- `occupancyDate` required only for rent intent
- `streetWidth` required only for list intent when not on main road

### Submission Flow

```
confirmAndSend()
    ├── Generate lead ID (GRE-YYMMDD-HHmmss format)
    ├── Track 'whatsapp_clicked' analytics event
    ├── Set funnel stage to 'whatsapp_clicked'
    ├── Normalize user phone to E.164
    ├── Build WhatsApp message (bilingual)
    ├── Build WhatsApp URL (mobile vs. desktop detection)
    ├── window.open(url, '_blank')
    ├── saveLead() to localStorage + optional API endpoint
    └── clearDraft() from localStorage
```

## 5.6 Step Components

### `StepUserInfo.tsx` — Step 1: Personal Information

**File**: `src/features/contact/steps/StepUserInfo.tsx` (116 lines)

**Fields**:
- Transaction type toggle (buy/sell) — only for CEO + non-list intents
- Full name input (text)
- Gender selector (male/female radio buttons)
- WhatsApp phone number input (tel)
- In-form policy acceptance checkbox

**Behavior**:
- Submit button is disabled until the policy checkbox is checked
- Validation errors shown inline with `role="alert"`
- Privacy note below submit button

---

### `StepPropertyDetails.tsx` — Step 2: Property Details Orchestrator

**File**: `src/features/contact/steps/StepPropertyDetails.tsx` (122 lines)

**Common fields** rendered by the orchestrator:
- Property type selector (House, Plot, Commercial)
  - Plot option hidden for rent/list intents
  - Auto-resets to "House" if intent changes to rent/list with Plot selected
- Location dropdown (populated from `t.landmarks` array)

**Intent-specific sub-forms** rendered below:

| Intent | Sub-form Component |
|---|---|
| `buy` / `sell` | `BuySellDetailsForm` |
| `rent` | `RentDetailsForm` |
| `list` | `ListingDetailsForm` |

---

### `BuySellDetailsForm.tsx` — Buy/Sell Property Details

**File**: `src/features/contact/steps/BuySellDetailsForm.tsx` (132 lines)

**Fields**:
- Marla input with live sq ft conversion (1 marla = 272.25 sq ft)
- Plot category (residential/commercial) — CEO only
- Utilities toggle (electricity / electricity + gas) — CEO only, non-commercial only
- Budget / Asking price input
- Demands / Property description textarea

---

### `RentDetailsForm.tsx` — Rental Property Details

**File**: `src/features/contact/steps/RentDetailsForm.tsx` (146 lines)

**Fields**:
- Marla input with sq ft conversion
- Target occupancy date (date picker, min = today)
- Bedrooms count (number input)
- Bathrooms count (number input)
- Furnishing toggle (furnished/unfurnished)
- Monthly rent budget input
- Specific demands textarea

---

### `ListingDetailsForm.tsx` — Property Listing Details

**File**: `src/features/contact/steps/ListingDetailsForm.tsx` (168 lines)

**Fields**:
- Ownership type selector (Registry, Inteqal, Allotment, Power of Attorney)
- Marla input with sq ft conversion
- Main road toggle (custom switch component)
  - If off → Street width input appears (in feet)
- Payment method toggle (Cash / Installment)
- Asking price input
- Property description textarea
- Trust builder info box ("What happens next?" guidance)

---

### `StepReview.tsx` — Step 3: Review & Confirm

**File**: `src/features/contact/steps/StepReview.tsx` (83 lines)

**Displays**: All collected data in a read-only grid with styled labels.

**Review fields** vary by intent:
- Always: name, phone, gender, property type, price, location, marlas, demands
- Rent: bedrooms, furnishing, occupancy date
- List: ownership type, payment method

**Actions**:
- "Edit Details" button → goes back to step 1
- "Confirm & Send" button → triggers WhatsApp send

## 5.7 WhatsApp Message Builder

**File**: `src/features/contact/utils/whatsappBuilder.ts` (191 lines)

### `buildWhatsAppMessage(config)` → `string`

Constructs a **professional structured WhatsApp message** with emoji markers. The message is fully bilingual — English and Urdu produce completely different templates.

**Message structure**:
```
Assalam-o-Alaikum!
*Gull Real Estate & Builders, Mardan*

Dear *Agent Name* (Role), my name is *User Name*. I am looking to [buy/rent/list] property through your company. Here are my details:

📍 *Location:* ...
🏠 *Property Type:* ...
📐 *Area:* ... Marlas
💰 *Budget:* ...
📝 *Demands:* ...
📞 *Contact Number:* ...
🆔 *Reference:* GRE-250306-060845
🌐 *Language:* English

Please assist me in this regard. Thank you!
```

**Urdu message features**:
- Uses Right-to-Left Mark (`\u200F`) for proper text direction in WhatsApp
- Gender-aware verb conjugation (`رہا` / `رہی` and `چاہتا` / `چاہتی`)
- Urdu property terminology (مرلے, بالاکونی, etc.)

### `generateLeadId()` → `string`

Format: `GRE-YYMMDD-HHmmss` (e.g., `GRE-250306-060845`)

### `encodeWhatsAppText(message)` → `string`

Custom encoder that:
- Encodes ASCII characters normally (`encodeURIComponent`)
- Passes Unicode characters (Urdu, emojis) through raw — WhatsApp handles them natively

### `buildWhatsAppUrl(number, message)` → `string`

| Device | URL Format |
|---|---|
| Mobile | `whatsapp://send?phone={number}&text={encoded}` |
| Desktop | `https://web.whatsapp.com/send?phone={number}&text={encoded}` |

Device detection uses `navigator.userAgent` regex matching.

## 5.8 Context Providers

### `CallErrorContext.tsx` (8 lines)

Simple context providing a `showCallError()` function. Created via `createContext` with a no-op default. Consumed by `Footer.tsx` and `ContactPage.tsx` to trigger the `CallErrorModal`.

### `PolicyContext.tsx` (33 lines)

Manages policy acceptance state:
- **In-memory only** (no localStorage) — intentional design: users must re-read the policy on every session
- `hasAcceptedPolicy: boolean` — starts as `false`
- `acceptPolicy()` — sets to `true`
- Must be used within `PolicyProvider` (throws if not)
