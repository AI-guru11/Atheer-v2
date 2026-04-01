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
- premium experience
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

## 3) Stable Product Decisions

These decisions are in place and should not be changed without clear intent:

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

### What is open to evolution
Visual design, homepage structure, section layout, surface treatments, and color refinements are all open to intentional improvement. These are product decisions, not frozen constraints. When making visual or structural changes:
- understand what currently exists before proposing changes
- changes should serve product clarity, premium positioning, or UX improvement
- avoid reckless wholesale rewrites of things that are already working
- prefer incremental evolution over speculative redesigns

---

## 4) Visual Direction

The current visual system is a premium dark experience and should be treated with care.

### Current visual foundation
- premium dark interface
- charcoal / deep-dark atmospheric background (`#0d0d12` base)
- restrained ambient glow (AuroraBackground effect layer)
- subtle neon contour accents
- dark smoked-glass surfaces
- strong readability
- mobile-first polish

### Design language to preserve
- premium
- editorial
- calm
- intentional
- not noisy

### Guidance for visual changes
Visual evolution is allowed and sometimes necessary. When making visual changes:
- understand what the current implementation looks like before proposing anything
- changes should improve clarity, UX, or premium feel — not introduce visual noise
- do not casually turn any customer-facing surface into a generic admin dashboard look
- light mode and theme toggle remain deferred — they are not current priorities

---

## 5) Current Stack

- React 19 (`^19.2.4`)
- React Router DOM 7 (`^7.13.1`)
- Vite 8 (`^8.0.0`)
- Tailwind CSS 3 (`^3.4.19`)
- plain JavaScript (no TypeScript)
- localStorage-backed local session model
- no backend
- no database
- no auth system
- no global state library

Node engine requirement: `>=20.19.0 || >=22.12.0`

This project currently uses **component-level React state + local session helpers**.

---

## 6) Routing (Current Truth)

Router file:
- `src/app/router.jsx`

The app uses:
- `createHashRouter`

This is intentional for GitHub Pages compatibility.

### Current routes

**Sender / Browse:**
- `/` → `HomePage`
- `/builder` → `GiftBuilderPage`
- `/collections` → `CollectionsPage` *(Signature Collections browse page)*
- `/corporate` → `CorporatePage` *(placeholder — not yet built)*
- `/checkout` → `CheckoutPage`
- `/success` → `SuccessPage`

**Gift / Recipient experience:**
- `/gift` → `GiftLandingPage`
- `/gift/unlock` → `GiftUnlockPage`
- `/gift/reveal` → `GiftRevealPage`
- `/gift/open` → `RecipientLandingPage`
- `/gift/choose` → `RecipientChoicePage`
- `/gift/address` → `RecipientAddressPage`
- `/gift/confirmed` → `RecipientConfirmedPage`

**Ops / Admin:**
- `/orders` → `OrdersPage`
- `/admin` → `AdminDashboardPage` *(placeholder — explicitly deferred, not yet built)*

**Fallback:**
- `*` → `NotFoundPage`

Do not switch this app to `createBrowserRouter` unless there is an explicit deliberate deployment change.

---

## 7) Core Architecture Snapshot

### Main application shell
- `src/app/App.jsx` — layout shell, scroll-to-top, smart reveal system (IntersectionObserver)
- `src/components/layout/` — Header, Footer, Section, Container

### Homepage sections
- `src/pages/HomePage.jsx` — top-level page, composes all homepage sections
- `src/components/sections/HeroSection.jsx`
- `src/components/sections/ServicesSection.jsx`
- `src/components/sections/WizardTeaserSection.jsx`
- `src/components/sections/DifferenceSection.jsx`
- `src/components/sections/CollectionsTeaserSection.jsx`
- `src/components/sections/FeaturedSection.jsx`
- `src/components/sections/SocialProofSection.jsx`
- `src/components/sections/FeatureStripSection.jsx`
- `src/components/sections/CTASection.jsx`

### Builder flow
- `src/pages/GiftBuilderPage.jsx`
- `src/components/builder/` — BuilderShell, BuilderChoiceGrid, BuilderChoiceCard, BuilderProgress, BuilderActions, BuilderSummary, BuilderRecommendationPreview, DirectDeliveryForm, DirectDeliveryReview, DirectDeliveryConfirmation, RecipientContactForm, RecipientReview, RecipientLinkReady
- `src/data/builderContent.js` — all builder step content + value labels

### Gift / recipient experience
- `src/gift/` — GiftLandingPage, GiftUnlockPage, GiftRevealPage, RecipientLandingPage, RecipientChoicePage, RecipientAddressPage, RecipientConfirmedPage

### Collections entry point *(basic implementation)*
- `src/pages/CollectionsPage.jsx`
- `src/data/signatureCollections.js` — curated collection definitions (id, title, badge, priceBand, accentColor, image)

### Order / status / ops-lite layer
- `src/pages/CheckoutPage.jsx`
- `src/pages/OrdersPage.jsx`
- `src/lib/giftSession.js`

### Recommendation engine
- `src/lib/recommendation/index.js`
- `src/lib/recommendation/normalizeGiftIntentProfile.js`
- `src/lib/recommendation/filterCandidates.js`
- `src/lib/recommendation/scoreCandidates.js`
- `src/lib/recommendation/buildRecommendationResult.js`
- `src/data/productCatalog.sample.js`
- `src/data/recommendationSchema.js`
- `src/utils/recommendationDisplay.js`

### Utilities / helpers
- `src/utils/helpers.js`
- `src/utils/formValidation.js` — Saudi mobile number normalization (Arabic digit support), email validation, required field error helpers; used in builder forms and RecipientAddressPage
- `src/data/recipientMockData.js`

### Styles
- `src/styles/globals.css`
- `src/styles/tokens.css`
- `src/styles/aurora-layer.css`

### Effects
- `src/components/effects/AuroraBackground.jsx`

### UI primitives
- `src/components/ui/` — Button, Card, Input, Badge

### Placeholder pages (route exists, content not yet built)
- `src/pages/CorporatePage.jsx` — placeholder card
- `src/admin/AdminDashboardPage.jsx` — placeholder card, explicitly deferred

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

When `giftPath === "recipientChoice"`, the `deliveryMode` step is auto-resolved to `"recipientChoice"` without a user selection.

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

localStorage prefix: `atheer_gift_session:<code>`

This helper is now central to the product. It is not a minor utility anymore.

### Current role of gift sessions
Gift sessions store the working order state across:
- sender flow
- generated link flow
- recipient actions
- checkout / status view
- orders index
- ops-lite view
- status timeline (timestamped entries)
- gift path metadata (`getGiftPathMeta`)
- status metadata (`getGiftStatusMeta`)
- legacy status migration (normalizes old status keys on read)

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

The `/admin` route exists but is a **placeholder**. The admin dashboard has not been built yet. Do not treat it as existing functionality.

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

### Completed or substantially implemented
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
- **O** — Lightweight Orders Dashboard Polish *(note: `/admin` route is a placeholder; ops features live in OrdersPage)*
- **P** — Order Detail Notes + Activity Timeline Lite
- **Q** — Follow-up Toolkit + Communication Snippets Lite
- **R** — Lightweight Templates + Reusable Gift Operations Presets
- **S** — Signature Collections Lite *(basic implementation: `/collections` route, `CollectionsPage.jsx`, `signatureCollections.js` data with 6+ collections; CTAs currently route to `/builder`, not collection-specific flows)*

### Placeholder routes (route registered, page not yet built)
- `/admin` → `AdminDashboardPage` — explicitly deferred; the file contains a placeholder card only
- `/corporate` → `CorporatePage` — placeholder card only

### Future / not yet in code
- Full admin dashboard with orders, requests, analytics modules
- Corporate gifting flow beyond the placeholder page
- Collection-specific purchase paths (currently Collections CTAs go to `/builder`)

If a module or page is not confirmed in the live code, do **not** describe it as implemented truth.

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

Build (GitHub Pages — default):
```bash
npm run build
# same as: npm run build:github
```

Build (server / nginx — base path `/`):
```bash
BUILD_TARGET=server npm run build:server
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

This repo supports **two deployment targets**:

### GitHub Pages (default)
- `npm run build` or `npm run build:github`
- `vite.config.js` sets `base: '/Atheer-v2/'`
- routing uses `createHashRouter` (required for Pages compatibility)
- generated links target the GitHub Pages deployed URL

### Server / nginx
- `BUILD_TARGET=server npm run build:server`
- `vite.config.js` sets `base: '/'`
- routing still uses `createHashRouter`

Do not casually remove or change these assumptions unless deployment strategy is intentionally changing.
Do not switch to `createBrowserRouter` without a deliberate deployment-strategy decision.

---

## 18) Working Rules for AI Models in This Repo

Any AI model working in this repository should behave like this:

### Do
- read the actual code before proposing any change
- preserve the product model and its two core gift paths
- extend existing helpers when possible
- treat gift sessions as the continuity spine
- keep customer-facing language safe and polished
- keep the operational layer lightweight
- favor boring correctness over speculative expansion
- allow visual and structural changes when they are intentional and improve the product
- treat implementation truth as authoritative over any prior documented assumptions

### Do not
- invent new product paths casually
- introduce backend architecture casually
- create duplicate storage models
- leak internal business mechanics into customer UI
- rewrite recommendation engine logic without need
- expand scope into unrelated modules
- treat placeholder pages as implemented features
- treat any section of CLAUDE.md as permanently frozen if the real code has moved on

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

Changes to the visual layer, homepage, or product flow are welcome when they are repo-aware, intentional, and grounded in actual product improvement — not when they are speculative or untethered from the current implementation reality.
