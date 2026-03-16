# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Atheer V2 is a luxury gifting experience platform built as a React SPA. The app is Arabic-first (RTL, `lang="ar" dir="rtl"`) with bilingual content (Arabic + English). It features a dark-mode neon/glassmorphism design aesthetic.

Currency is SAR (Saudi Riyal). All product pricing, budget bands, and display values use SAR.

## Commands

- **Dev server**: `npm run dev` (Vite on port 5173)
- **Production build**: `npm run build`
- **Preview build**: `npm run preview` (port 4173, bound to 0.0.0.0)
- No test or lint tooling is currently configured.

## Architecture

**Stack**: React 19, React Router 7, Vite 8, Tailwind CSS, plain JavaScript (no TypeScript).

**Entry point**: `index.html` sets `lang="ar" dir="rtl"` and `theme-color: #0b1020`. `src/main.jsx` mounts `<RouterProvider>`.

**Routing** (`src/app/router.jsx`): Uses `createBrowserRouter` with nested routes under `App` layout.

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
- `src/components/builder/` — Gift builder wizard components (BuilderShell, BuilderProgress, BuilderChoiceGrid, BuilderChoiceCard, BuilderSummary, BuilderActions, BuilderRecommendationPreview)
- `src/pages/` — Route-level page components
- `src/gift/` — Gift reveal experience flow (Landing → Unlock → Reveal)
- `src/admin/` — Admin dashboard

**State management**: Component-level `useState` only (no Redux/Context/Zustand). No API integration yet.

## Gift Builder & Recommendation Engine

The builder (`/builder`) is a 7-step wizard orchestrated by `BuilderShell.jsx`:

| Step | Key | Options |
|---|---|---|
| 1 | `recipient` | mother, father, friend, partner, child, manager |
| 2 | `occasion` | birthday, thanks, anniversary, surprise, promotion, corporate |
| 3 | `budget` | `<250`, `250-500`, `500-1000`, `1000+` (SAR) |
| 4 | `interest` | coffee, books, perfume, electronics, sports, self-care, gaming, open |
| 5 | `revealStyle` | simple_elegant, emotional_personal, luxury_premium, fun_playful, minimal_modern, adventure_experience |
| 6 | `controlMode` | manual, assisted, delegated |
| 7 | `deliveryMode` | TBD (recently added step) |

**Recommendation engine** (`src/lib/recommendation/`):

1. `index.js` — `runRecommendationEngine(selections)` entry point
2. `normalizeGiftIntentProfile.js` — Converts selections into a structured profile (recipients, occasions, budget range, interests, emotional tone, surprise factor, relationship depth, formality, importance)
3. `filterCandidates.js` — 3-tier filtering: strict (all criteria) → relaxed (flexible budget) → near-budget (±25% margin)
4. `scoreCandidates.js` — Scores filtered products against profile
5. `buildRecommendationResult.js` — Constructs final result: top pick, alternatives (up to 2), reveal recommendation, execution mode, confidence score, summary angle

**Product catalog** (`src/data/productCatalog.sample.js`): 50+ sample products. Each product has:
- `id`, `title` (EN + AR), `brand`, `category`, `priceRange`, `currency: "SAR"`
- Fit arrays: `recipientFit`, `occasionFit`, `interestFit`, `toneFit`, `controlModeFit`, `revealFit`
- Scoring: `premiumScore`, `uniquenessScore`, `practicalityScore`, `giftabilityScore`, `wowFactor`, `merchantConfidence`
- Metadata: `availabilityStatus`, `sourceUrl`, `shippingNote`

**Builder display utilities** (`src/utils/recommendationDisplay.js`): Bilingual label maps for recipient, occasion, tone, execution mode, delivery mode.

## Design System

**Color palette** (defined in `src/styles/tokens.css`):
- Background: `--bg` (#040711 / #050816), `--bg-soft`, surface variants
- Brand: `--brand` (4 purple/violet variants), accent cyan
- Text: `--text`, `--muted`
- Effects: `--shadow-soft`, `--shadow-glow` (dual purple+cyan glow), `--blur`

**Custom utility classes** (`src/styles/globals.css`):
- `.glass-panel` — Frosted glass (rgba bg + border + `backdrop-filter: blur(16px)` + shadow)
- `.glass-panel-strong` — Stronger glass (82% opacity, `blur(20px)`, glow shadow)
- `.neon-ring` — Gradient border ring via `mask-composite` trick
- `.glow-text` — Gradient text (purple → violet → cyan)
- `.grid-noise` — Subtle grid overlay with opacity mask
- `.hero-float` — Floating animation (±8px Y, 7s loop, respects `prefers-reduced-motion`)

**Button variants** (`src/components/ui/Button.jsx`):
- `primary` — Purple gradient background
- `secondary` — Glass panel style
- `ghost` — Transparent with border

## Conventions

- Functional components with hooks, no class components
- `cx()` utility in `src/utils/helpers.js` for className concatenation (filters falsy values, joins with space)
- PascalCase component filenames matching export names
- No semicolons (ASI style)
- No TypeScript — plain `.js` / `.jsx`
- Node.js >=20.19.0 or >=22.12.0 required
- Content goes in `src/data/siteContent.js`, never hardcoded in components
- Do not add global state libraries — component-level state is the pattern

## Key File Reference

| File | Purpose |
|---|---|
| `src/app/router.jsx` | Route definitions |
| `src/app/App.jsx` | Root layout (Header + Outlet + Footer) |
| `src/data/siteContent.js` | All UI copy (bilingual) |
| `src/data/builderContent.js` | Builder step/option definitions |
| `src/data/recommendationSchema.js` | Type definitions, budget ranges |
| `src/data/productCatalog.sample.js` | Sample product database |
| `src/lib/recommendation/index.js` | Recommendation engine entry |
| `src/components/builder/BuilderShell.jsx` | Builder orchestrator & state |
| `src/styles/tokens.css` | Design tokens (CSS vars) |
| `src/styles/globals.css` | Custom utility classes |
| `src/utils/helpers.js` | `cx()` helper |
| `src/utils/recommendationDisplay.js` | Bilingual display formatters |
