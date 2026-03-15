# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Atheer V2 is a luxury gifting experience platform built as a React SPA. The app is Arabic-first (RTL, `lang="ar" dir="rtl"`) with bilingual content (Arabic + English). It features a dark-mode neon/glassmorphism design aesthetic.

## Commands

- **Dev server**: `npm run dev` (Vite on port 5173)
- **Production build**: `npm run build`
- **Preview build**: `npm run preview` (port 4173)
- No test or lint tooling is currently configured.

## Architecture

**Stack**: React 19, React Router 7, Vite 8, Tailwind CSS, plain JavaScript (no TypeScript).

**Routing** (`src/app/router.jsx`): Uses `createBrowserRouter` with nested routes under `App` layout. Routes: `/`, `/builder`, `/corporate`, `/checkout`, `/success`, `/gift/*`, `/admin`, `/404`.

**Content system** (`src/data/siteContent.js`): All user-facing text is centralized in a single data object — not hardcoded in components.

**Styling layers**:
- CSS custom properties in `src/styles/tokens.css` (brand colors, surfaces, shadows, radius)
- Tailwind utilities + custom classes in `src/styles/globals.css` (`.glass-panel`, `.neon-ring`, `.glow-text`, `.grid-noise`)
- Components use Tailwind inline classes combined with these custom utilities

**Component organization**:
- `src/components/layout/` — Header, Footer, Container, Section (structural wrappers)
- `src/components/ui/` — Button (3 variants), Card, Badge, Input (reusable primitives)
- `src/components/sections/` — Landing page sections (Hero, Services, Featured, CTA)
- `src/pages/` — Route-level page components
- `src/gift/` — Gift reveal experience flow (Landing → Unlock → Reveal)

**State management**: Component-level state only (no Redux/Context/Zustand). No API integration yet.

## Conventions

- Functional components with hooks, no class components
- `cx()` utility in `src/utils/helpers.js` for className concatenation
- PascalCase component filenames matching export names
- No semicolons (ASI style)
- Node.js >=20.19.0 or >=22.12.0 required
