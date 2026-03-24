# CLAUDE.md

This file is the project reference for Claude Code and any other AI coding model working inside this repository.

The goal of this file is not generic documentation. It is a **working memory + execution guardrail** for the actual Atheer-v2 codebase.

If anything in this file conflicts with the real code, **the real code wins**.

---

## 1) Project Identity

**Atheer-v2** is an Arabic-first premium gifting experience web app.

It is **not** a generic gift marketplace and **not** a normal ecommerce catalog.

Its product model is:
- help the sender define the right gift direction
- let the sender either:
  - choose an exact gift directly, or
  - let the recipient choose from a curated set
- wrap the experience in a branded reveal / gift flow
- track the order as a lightweight operational workflow

Core positioning:
- premium dark experience
- curated gifting, not marketplace sprawl
- experience-led gifting, not product-grid-first shopping
- local-session-driven MVP, not backend-heavy architecture

Currency is **SAR**.
Language direction is **Arabic-first / RTL**.

---

## 2) Product Model (Current Truth)

The current product has **two real gift paths**:

### A. Exact Gift
The sender chooses a specific gift.
The recipient receives a link, opens a reveal flow, sees the chosen gift, then submits delivery information.

### B. Recipient Choice
The sender lets the recipient choose from a curated set of gift options.
The recipient opens the link, sees the curated experience, selects one option, then submits delivery information.

These are the product truths.

### Not current product truth
The older builder logic around broad "control modes" is no longer the correct conceptual model for the product.
Any AI working on this repo should treat **giftPath** as the primary product path decision.

---

## 3) Non-Negotiable Decisions

These decisions are already made and should not be reopened casually:

- Homepage baseline is approved.
- Homepage is the visual reference system for the rest of the product.
- Light mode is deferred.
- Theme toggle is deferred.
- Current priority is not rebranding colors.
- Current priority is not homepage redesign.
- This repo should avoid broad refactors.
- This repo should avoid speculative architecture expansion.
- This repo should preserve the current routing model unless a change is strictly required.
- Customer-facing statuses must remain clean and must **not** expose internal sourcing, purchasing, inventory, supplier, or procurement language.

Examples of language that should **not** be shown to customers:
- sourcing product
- supplier pending
- awaiting purchase
- inventory not available
- procurement in progress

Preferred public-facing language:
- order confirmed
- experience is being prepared
- delivery is being coordinated
- order completed

---

## 4) Approved Visual Baseline

The visual system is already approved and should be preserved.

### Core visual direction
- premium dark interface
- charcoal / deep-dark atmospheric background
- restrained ambient glow
- subtle neon contour accents
- dark smoked-glass surfaces
- strong readability
- mobile-first polish

### Do not do these casually
- do not redesign the homepage broadly
- do not introduce bright/light glass surfaces
- do not add a theme toggle
- do not add light mode
- do not turn the interface into a generic admin dashboard look

The design language should remain:
- premium
- editorial
- calm
- intentional
- not noisy

---

## 5) Current Stack

- React 19
- React Router DOM 7
- Vite 8
- Tailwind CSS 3
- plain JavaScript (no TypeScript)
- localStorage-backed local session model
- no backend
- no database
- no auth system
- no global state library

This project currently uses **component-level React state + local session helpers**.

---

## 6) Routing (Current Truth)

Router file:
- `src/app/router.jsx`

The app uses:
- `createHashRouter`

This is intentional for GitHub Pages compatibility.

### Current routes
- `/` → `HomePage`
- `/builder` → `GiftBuilderPage`
- `/corporate` → `CorporatePage`
- `/checkout` → `CheckoutPage`
- `/success` → `SuccessPage`
- `/gift` → `GiftLandingPage`
- `/gift/unlock` → `GiftUnlockPage`
- `/gift/reveal` → `GiftRevealPage`
- `/gift/open` → `RecipientLandingPage`
- `/gift/choose` → `RecipientChoicePage`
- `/gift/address` → `RecipientAddressPage`
- `/gift/confirmed` → `RecipientConfirmedPage`
- `/orders` → `OrdersPage`
- `/admin` → `AdminDashboardPage`
- `*` → `NotFoundPage`

Do not switch this app to `createBrowserRouter` unless there is an explicit deliberate deployment change.

---

## 7) Core Architecture Snapshot

### Main application shell
- `src/app/App.jsx`
- `src/components/layout/*`

### Builder flow
- `src/pages/GiftBuilderPage.jsx`
- `src/components/builder/*`
- `src/data/builderContent.js`

### Gift / recipient experience
- `src/gift/*`

### Order / status / ops-lite layer
- `src/pages/CheckoutPage.jsx`
- `src/pages/OrdersPage.jsx`
- `src/lib/giftSession.js`

### Recommendation engine
- `src/lib/recommendation/*`
- `src/data/productCatalog.sample.js`
- `src/data/recommendationSchema.js`
- `src/utils/recommendationDisplay.js`

### Styles
- `src/styles/globals.css`
- `src/styles/tokens.css`

---

## 8) Builder Logic (Current Truth)

The builder is the sender-side entry flow.

The current high-level builder sequence is:
1. recipient
2. occasion
3. budget
4. interest
5. revealStyle
6. giftPath
7. deliveryMode

### Important conceptual rule
The builder should reflect the actual product model:
- **giftPath** is the real strategic fork
- **deliveryMode** is the operational delivery choice that follows from that

### Gift paths
- `exactGift`
- `recipientChoice`

### Delivery modes currently used
- `directDelivery`
- `recipientChoice`

Keep the builder aligned with the real product model. Do not reintroduce old ambiguous strategy options unless explicitly requested.

---

## 9) Recommendation Engine Rules

The recommendation engine already exists and should not be casually rewritten.

Key files:
- `src/lib/recommendation/index.js`
- `normalizeGiftIntentProfile.js`
- `filterCandidates.js`
- `scoreCandidates.js`
- `buildRecommendationResult.js`

The recommendation layer is not just visual decoration. It is part of the product spine.

### Important rule
Do not break the recommendation engine to satisfy a UI-only change.

### Preferred behavior
- keep inputs stable
- keep output structure stable unless a module explicitly requires extending it
- prefer narrow additive changes over scoring refactors

---

## 10) Gift Session Model (Current Truth)

The operational spine of the current MVP is **local gift sessions**.

Main file:
- `src/lib/giftSession.js`

This helper is now central to the product.
It is not a minor utility anymore.

### Current role of gift sessions
Gift sessions store the working order state across:
- sender flow
- generated link flow
- recipient actions
- checkout / status view
- orders index
- ops-lite view
- notes / snippets / timeline / flags / presets

### Core expectation
Any new module touching order continuity should extend the existing gift session model **minimally** instead of introducing another storage layer.

### Do not do this
- do not create a second localStorage namespace for the same order truth unless absolutely required
- do not create a parallel fake order model
- do not move to backend architecture casually

---

## 11) Public vs Internal Language Rules

This project has a strict separation between:
- customer-facing language
- internal operational language

### Customer-facing language must be:
- reassuring
- clean
- premium
- simple
- non-technical

### Internal language may be more operational, but should still remain controlled.

### Never expose internal mechanics to customers
Do not expose:
- supplier logic
- sourcing logic
- procurement logic
- inventory reality
- purchase workflow
- fallback sourcing notes

The business may internally buy items after payment and confirmation, but this is **not customer UI language**.

---

## 12) Order / Status / Ops-lite Layer

The current codebase already evolved beyond a simple gift builder.

It now includes a lightweight operational layer:
- checkout/status view
- local order sessions
- local orders index
- internal ops-lite support
- status advancement
- notes/snippets/presets/follow-up features

### Important rule
This is still a **lightweight local operational layer**, not a full admin system.

Do not turn it into:
- a heavy admin dashboard
- a CRM
- a supplier panel
- a warehouse system
- a messaging automation engine

If expanding operations, do it in thin local-first layers only.

---

## 13) Orders View Rule

`/orders` is the lightweight local orders index.

Its purpose is:
- make follow-up easier
- reduce reliance on manually opening each order by direct link
- provide simple local operational visibility

It should remain:
- lightweight
- readable
- mobile-friendly
- operationally useful
- visually aligned with the rest of the product

It should **not** become a dense enterprise admin table unless explicitly requested.

---

## 14) Current Module Progress

This repo has already progressed through a significant structured implementation path.

### Completed or substantially implemented modules
- **A + B** — Builder path alignment
- **C** — Gift Session Storage + Generated Link Hardening
- **D** — Reveal / Unlock / Reveal layer grounding
- **E** — Sender identity + session polish
- **F** — Exact Gift vs Recipient Choice UX polish
- **G** — Direct Delivery path completion + session unification
- **H + I** — Commercial lock + checkout readiness / order handoff
- **J** — Order status system + manual fulfillment handoff (customer-safe wording)
- **K** — Ops readiness lite
- **L** — Sender approval action + internal status advance
- **M** — Orders list view from local sessions
- **N** — Orders Actions Polish
- **O** — Lightweight Admin / Orders Dashboard Polish
- **P** — Order Detail Notes + Activity Timeline Lite
- **Q** — Follow-up Toolkit + Communication Snippets Lite
- **R** — Lightweight Templates + Reusable Gift Operations Presets

### Proposed / future modules discussed but not guaranteed to exist in code yet
- S — Signature Collections Lite + Curated Offers Entry

If a future module is not in the code yet, do **not** describe it as implemented truth.

---

## 15) Safe Edit Protocol (Mandatory)

When editing this project, follow this sequence:

1. **Inspect first**
   - read relevant files before editing
   - understand the current implementation

2. **Codebase first, assumptions second**
   - if prompt memory and real code conflict, follow real code

3. **Minimal diff**
   - prefer small targeted edits
   - avoid unnecessary cleanup in unrelated files

4. **Preserve unrelated working code**
   - do not rewrite files from scratch unless there is a strong reason
   - do not remove unrelated logic

5. **No broad refactors without explicit approval**
   - especially around routing, builder logic, recommendation logic, and gift sessions

6. **Return full changed files only**
   - when asked to provide code changes, return the full content of changed files only
   - do not dump the entire project unless explicitly requested

7. **Verify build after meaningful changes**
   - do not claim success without verification when local execution is possible

---

## 16) Build / Run Notes

Package manager:
- npm

Install:
```bash
npm install
```

Dev server:
```bash
npm run dev
```

Preview:
```bash
npm run preview
```

Build:
```bash
npm run build
```

### Important note
If `vite` wrapper resolution fails in the execution environment, verify whether dependencies are installed correctly first.
Do not assume the repo is broken if `node_modules` is missing.

Common cause of build failure in ad-hoc environments:
- dependencies not installed yet
- missing `node_modules`
- shell/path wrapper issue around `vite`

Treat those as environment issues first, not architecture issues.

---

## 17) Deployment Notes

This repo is intended for GitHub Pages deployment.

Key constraints:
- `vite.config.js` uses GitHub Pages base path
- routing uses `createHashRouter`
- generated links often target the GitHub Pages deployed URL

Do not casually remove or change these assumptions unless deployment strategy is intentionally changing.

---

## 18) Working Rules for AI Models in This Repo

Any AI model working in this repository should behave like this:

### Do
- preserve the product model
- preserve approved UI baseline
- extend existing helpers when possible
- treat gift sessions as the continuity spine
- keep customer-facing language safe and polished
- keep the operational layer lightweight
- favor boring correctness over speculative expansion

### Do not
- redesign the homepage broadly
- invent new product paths casually
- introduce backend architecture casually
- create duplicate storage models
- leak internal business mechanics into customer UI
- rewrite recommendation engine logic without need
- expand scope into unrelated modules

---

## 19) What Atheer Is Not

To avoid model drift, remember:

Atheer is **not**:
- a broad gift marketplace
- a typical ecommerce catalog
- a CRM
- an ERP
- a supplier dashboard
- a warehouse/inventory system
- a generic dark template demo

Atheer is:
- a premium gifting experience product
- built around sender intent, recipient experience, and lightweight operational continuity

---

## 20) Preferred Change Philosophy

When two solutions exist:
- choose the one with fewer changed lines
- choose the one with lower regression risk
- choose the one that preserves current continuity

This repo should grow through **controlled modules**, not chaotic expansion.
