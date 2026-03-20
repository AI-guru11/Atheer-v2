# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Atheer V2 is a luxury gifting experience platform built as a React SPA. The app is Arabic-first (RTL, `lang="ar" dir="rtl"`) with bilingual content (Arabic + English). It features a dark-mode neon/glassmorphism design aesthetic.

Currency is SAR (Saudi Riyal). All product pricing, budget bands, and display values use SAR.

## Commands

- **Dev server**: `npm run dev` (Vite on port 5173, bound to 0.0.0.0)
- **Production build**: `npm run build`
- **Preview build**: `npm run preview` (port 4173, bound to 0.0.0.0)
- No test or lint tooling is currently configured.

## Architecture

**Stack**: React 19, React Router 7, Vite 8, Tailwind CSS 3, plain JavaScript (no TypeScript).

**Entry point**: `index.html` sets `lang="ar" dir="rtl"` and `theme-color: #0b1020`. `src/main.jsx` mounts `<RouterProvider>`.

**Routing** (`src/app/router.jsx`): Uses `createHashRouter` (HashRouter for GitHub Pages compatibility) with nested routes under `App` layout.

| Route | Component | Status |
|---|---|---|
| `/` | `HomePage` | Active |
| `/builder` | `GiftBuilderPage` | Active |
| `/corporate` | `CorporatePage` | Placeholder |
| `/checkout` | `CheckoutPage` | Placeholder |
| `/success` | `SuccessPage` | Placeholder |
| `/gift` | `GiftLandingPage` | Placeholder |
| `/gift/unlock` | `GiftUnlockPage` | Placeholder |
| `/gift/reveal` | `GiftRevealPage` | Placeholder |
| `/gift/open` | `RecipientLandingPage` | Active |
| `/gift/choose` | `RecipientChoicePage` | Active |
| `/gift/address` | `RecipientAddressPage` | Active |
| `/gift/confirmed` | `RecipientConfirmedPage` | Active |
| `/admin` | `AdminDashboardPage` | Placeholder |
| `/*` | `NotFoundPage` | Active |

**Content system** (`src/data/siteContent.js`): All user-facing text is centralized in a single data object — not hardcoded in components. Covers: `brand`, `hero`, `services`, `difference`, `wizardTeaser`, `featured`, `socialProof`, `featureStrip`, `cta`, `footer`.

**Styling layers**:
- CSS custom properties in `src/styles/tokens.css` (brand colors, surfaces, shadows, radius, blur, container-width)
- Tailwind utilities + custom classes in `src/styles/globals.css`
- Components use Tailwind inline classes combined with these custom utilities
- Tailwind container max-width: 1240px, content scanned from `src/**/*.{js,jsx}`

**Component organization**:
- `src/components/layout/` — Header, Footer, Container, Section (structural wrappers)
- `src/components/ui/` — Button (3 variants), Card, Badge, Input (reusable primitives)
- `src/components/sections/` — Landing page sections (Hero, Services, Difference, WizardTeaser, Featured, SocialProof, FeatureStrip, CTA)
- `src/components/builder/` — Gift builder wizard components (BuilderShell, BuilderProgress, BuilderChoiceGrid, BuilderChoiceCard, BuilderSummary, BuilderActions, BuilderRecommendationPreview, plus delivery mode forms)
- `src/pages/` — Route-level page components
- `src/gift/` — Gift reveal experience flow (Landing → Unlock → Reveal) + Recipient Experience MVP (RecipientLandingPage, RecipientChoicePage, RecipientAddressPage, RecipientConfirmedPage)
- `src/admin/` — Admin dashboard

**State management**: Component-level `useState` only (no Redux/Context/Zustand). No API integration yet.

## Gift Builder & Recommendation Engine

The builder (`/builder`) is a 7-step wizard orchestrated by `BuilderShell.jsx`:

| Step | Key | Options |
|---|---|---|
| 1 | `recipient` | mother, father, friend, partner, child, manager |
| 2 | `occasion` | birthday, thanks, anniversary, special-surprise, promotion, corporate |
| 3 | `budget` | `<250`, `250-500`, `500-1000`, `1000+` (SAR) |
| 4 | `interest` | coffee, books, perfume, electronics, sports, self-care, gaming, open |
| 5 | `revealStyle` | simple, emotional, playful, luxury, surprise, professional |
| 6 | `controlMode` | self, copilot (assisted), delegated |
| 7 | `deliveryMode` | directDelivery or recipientChoice |

After completing the 7 steps, the builder branches into one of two delivery flows:

### Delivery Mode: Direct Delivery (`directDelivery`)
Sender provides the recipient's address directly:
1. `DirectDeliveryForm.jsx` — Collect recipient address fields
2. `DirectDeliveryReview.jsx` — Review all selections before confirming
3. `DirectDeliveryConfirmation.jsx` — Final confirmation screen

### Delivery Mode: Recipient Choice (`recipientChoice`)
Sender provides recipient contact info; recipient gets a link to choose their own gift:
1. `RecipientContactForm.jsx` — Collect recipient's contact info (name, phone/email)
2. `RecipientReview.jsx` — Review recipient details
3. `RecipientLinkReady.jsx` — Generate & display shareable link (points to live GitHub Pages URL)

**Recipient Experience** (`/gift/open` → `/gift/choose` → `/gift/address` → `/gift/confirmed`):
1. `RecipientLandingPage.jsx` — Shows sender info, occasion, personal message from mock data
2. `RecipientChoicePage.jsx` — Displays 4 mock gift options for recipient to pick
3. `RecipientAddressPage.jsx` — Recipient enters their delivery address
4. `RecipientConfirmedPage.jsx` — Success screen with confirmation

Mock data for recipient experience is in `src/data/recipientMockData.js`.

**Recommendation engine** (`src/lib/recommendation/`):

1. `index.js` — `runRecommendationEngine(selections)` entry point
2. `normalizeGiftIntentProfile.js` — Converts selections into a structured profile (recipients, occasions, budget range, interests, emotional tone, surprise factor, relationship depth, formality, importance)
3. `filterCandidates.js` — 3-tier filtering: strict (all criteria) → balanced (flexible criteria) → intelligent (near-budget ±25% margin, ≥1 of 3 soft dimensions)
4. `scoreCandidates.js` — Scores filtered products against profile with 10 weighted factors
5. `buildRecommendationResult.js` — Constructs final result: top pick, alternatives (up to 2), reveal recommendation, execution mode, confidence score, summary angle

**Score weights** (`src/data/recommendationSchema.js`):
- recipientFit (0.18), budgetCloseness (0.16), occasionFit (0.15), interestFit (0.15), revealFit (0.07), premiumRelevance (0.06), toneFit (0.08), merchantConfidence (0.05), controlModeFit (0.05), giftability (0.05)

**Product catalog** (`src/data/productCatalog.sample.js`): 50+ sample products. Each product has:
- `id`, `title` (EN + AR), `brand`, `category`, `priceMin`/`priceMax`, `currency: "SAR"`
- Fit arrays: `recipientFit`, `occasionFit`, `interestFit`, `toneFit`, `controlModeFit`, `revealFit`
- Scoring: `premiumScore`, `uniquenessScore`, `practicalityScore`, `giftabilityScore`, `wowFactor`, `merchantConfidence`
- Metadata: `availabilityStatus`, `sourceUrl`, `shippingNote`, `displayTitleAr`, `displaySubtitleAr`, `shortDescription`

**Builder display utilities** (`src/utils/recommendationDisplay.js`): 20+ bilingual formatter functions for recipient labels, occasion labels, price ranges, confidence scores, execution mode display, merchant names, and fit summaries.

## Design System

**Color palette** (defined in `src/styles/tokens.css` and `src/styles/globals.css` `:root`):
- Background: `--bg` (#141414), `--bg-soft` (#191919), surface variants
- Brand: `--brand` (#7c5cff / purple), `--brand-2` (#22d3ee / cyan), `--brand-3` (#8b5cf6 / violet), `--brand-4` (#38bdf8 / sky)
- Text: `--text` (#f0f2f8), `--muted` (#7c8099)
- Status: `--success` (#22c55e), `--danger` (#ef4444)
- Effects: `--shadow-soft`, `--shadow-glow` (dual purple+cyan glow), `--blur` (18px)
- Radius: `--radius-sm` (0.9rem), `--radius-md` (1.2rem), `--radius-lg` (1.8rem)

**Surface hierarchy** (three-tier dark glass system):
- `.charcoal-card` — Base glass card: dark gradient surface + `blur(22px)` + inset highlights + dual-layer shadow
- `.glass-panel` — Elevated glass: `rgba(28,28,32,0.88)` + `blur(26px)` — used for hero stats, elevated panels
- `.glass-panel-strong` — Premium glass: `rgba(18,18,20,0.93)` + `blur(20px)` + glow ring — used for CTA

**Custom utility classes** (`src/styles/globals.css`):
- `.charcoal-card` — Dark smoked glass card surface (gradient + blur + inset highlight + shadow)
- `.glass-panel` — Elevated frosted panel
- `.glass-panel-strong` — Premium CTA/modal surface with glow ring
- `.surface-panel` — Subtle data/stat cell surface
- `.ambient-card` — Glass card with purple left-edge accent
- `.neon-ring` — Gradient border ring via `mask-composite` trick
- `.glow-text` — Gradient text (white → violet → purple)
- `.grid-noise` — Subtle grid overlay with opacity mask
- `.hero-float` — Floating animation (±8px Y, 7s loop, respects `prefers-reduced-motion`)
- `.section` — Responsive section padding (4/5/6rem at sm/md/lg)
- `.container` — Max-width 1240px centered wrapper
- `.section-card` — Card with subtle top-center gradient accent line
- `.card-accent-top` — Card with top-right neon gradient accent

**Button variants** (`src/components/ui/Button.jsx`):
- `primary` — Purple gradient background
- `secondary` — Glass panel style
- `ghost` — Transparent with border

## Deployment

The project is deployed to **GitHub Pages** at `https://AI-guru11.github.io/Atheer-v2/`.

**Key deployment settings**:
- `vite.config.js`: `base: '/Atheer-v2/'` for correct asset paths on GitHub Pages
- `src/app/router.jsx`: Uses `createHashRouter` (not `createBrowserRouter`) so routing works without server-side config — all URLs are hash-based (`/#/path`)
- Shareable gift links generated in `RecipientLinkReady.jsx` point to the live GitHub Pages URL

**CI/CD** (`.github/workflows/`):
- `node-ci.yml` — Validates the build on every push/PR
- `deploy-pages.yml` — Deploys to GitHub Pages on push to main

## Conventions

- Functional components with hooks, no class components
- `cx()` utility in `src/utils/helpers.js` for className concatenation (filters falsy values, joins with space)
- PascalCase component filenames matching export names
- No semicolons (ASI style)
- No TypeScript — plain `.js` / `.jsx`
- Node.js >=20.19.0 or >=22.12.0 required
- Content goes in `src/data/siteContent.js`, never hardcoded in components
- Do not add global state libraries — component-level state is the pattern
- All routing uses hash-based URLs due to HashRouter (important for GitHub Pages)

## Key File Reference

| File | Purpose |
|---|---|
| `src/app/router.jsx` | Route definitions (HashRouter) |
| `src/app/App.jsx` | Root layout (Header + Outlet + Footer) |
| `src/data/siteContent.js` | All UI copy (bilingual) |
| `src/data/builderContent.js` | Builder step/option definitions + deliveryMode step |
| `src/data/recommendationSchema.js` | Type definitions, budget ranges, score weights |
| `src/data/productCatalog.sample.js` | Sample product database (50+ products) |
| `src/data/recipientMockData.js` | Mock session & gift options for recipient experience |
| `src/lib/recommendation/index.js` | Recommendation engine entry |
| `src/components/builder/BuilderShell.jsx` | Builder orchestrator & state (7 steps + delivery modes) |
| `src/components/builder/DirectDeliveryForm.jsx` | Address form for direct delivery |
| `src/components/builder/DirectDeliveryReview.jsx` | Review screen for direct delivery |
| `src/components/builder/DirectDeliveryConfirmation.jsx` | Confirmation for direct delivery |
| `src/components/builder/RecipientContactForm.jsx` | Contact form for recipient-choice flow |
| `src/components/builder/RecipientReview.jsx` | Review screen for recipient-choice flow |
| `src/components/builder/RecipientLinkReady.jsx` | Shareable link generation |
| `src/gift/RecipientLandingPage.jsx` | Recipient entry — shows sender message |
| `src/gift/RecipientChoicePage.jsx` | Recipient gift selection |
| `src/gift/RecipientAddressPage.jsx` | Recipient address entry |
| `src/gift/RecipientConfirmedPage.jsx` | Recipient confirmation screen |
| `src/styles/tokens.css` | Design tokens (CSS vars) |
| `src/styles/globals.css` | Custom utility classes |
| `src/utils/helpers.js` | `cx()` helper |
| `src/utils/recommendationDisplay.js` | Bilingual display formatters (20+ functions) |
| `vite.config.js` | Vite config (base path `/Atheer-v2/` for GitHub Pages) |
| `.github/workflows/node-ci.yml` | Node.js CI build workflow |
| `.github/workflows/deploy-pages.yml` | GitHub Pages deploy workflow |

## Approved Visual Direction

The homepage visual design is the approved baseline for the entire application. All internal pages should align with this language.

**Design language**:
- Premium dark interface with charcoal / deep-dark background (`--bg: #141414`)
- Restrained ambient glow (purple/cyan animated orbs, subtle fixed-position atmosphere)
- Neon contour accents used sparingly (top-edge gradient lines, not full glow)
- Dark smoked glass surfaces (`.charcoal-card` — gradient + blur + inset highlight + shadow)
- Strong readability — high text-to-surface contrast at all times
- Mobile-first polish — all effects scale down gracefully

**Current phase**: Internal Page Visual Alignment with Theme-Safe Architecture.

**Theme rules**:
- Light theme is NOT implemented now
- Only semantic token preparation for future light mode is allowed
- Dark theme is the sole active theme

## Execution Discipline

- Inspect first, edit second — always read a file before modifying it
- Minimal diff — change only what is needed, preserve unrelated code
- No broad refactors, no logic changes, no routing changes, no content rewrites
- Prefer boring correctness over ambitious styling expansion
- If two solutions exist, choose the one with fewer changed lines and lower regression risk
- Do not add global state libraries — component-level state is the pattern
- Do not redesign already-approved homepage sections
