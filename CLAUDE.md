# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Next.js 16 with Turbopack)
npm run build    # Production build
npm run lint     # ESLint (no test suite exists)
```

There are no automated tests. Lint is the only code-quality gate.

## Stack Versions — Breaking Changes

This project targets **Next.js 16.2.0 · React 19.2.4 · Tailwind CSS v4**. Key differences from older training data:

- **Next.js 16:** Dynamic route `params` are `Promise<{…}>` — always `await params` in async page components.
- **React 19:** `ref` is a plain prop (no `forwardRef`). React Compiler is enabled via `babel-plugin-react-compiler` — do not add manual `useMemo`/`useCallback` unless there's a proven perf need.
- **Tailwind v4:** Config is CSS-first in `globals.css` via `@theme { … }` blocks. There is no `tailwind.config.ts`. Use `@import "tailwindcss"` — not the old `@tailwind` directives.

## Architecture

### Routing (`src/app/`)

| Route | File |
|---|---|
| `/` | `app/page.tsx` |
| `/about`, `/products`, `/how-we-work`, `/contact` | `app/<name>/page.tsx` |
| `/products/[slug]` | `app/products/[slug]/page.tsx` |
| `/library` | `app/library/page.tsx` |
| `/library/blog/[slug]` | `app/library/blog/[slug]/page.tsx` |
| `/library/research/[slug]` | `app/library/research/[slug]/page.tsx` |

`app/template.tsx` wraps every page in a Framer Motion fade transition (`pageVariants` from `lib/motion.ts`). `app/layout.tsx` mounts `<Navbar>` and `<Footer>` around every route inside `<ViewTransitions>`.

### Component structure (`src/components/`)

- **`sections/`** — full-width landing page sections (`HeroSection`, `AboutSection`, `ProductsSection`, `HowWeWorkSection`, `LibrarySection`). The hero uses a WebGL canvas (`HeroVisual`) loaded via `next/dynamic` with `ssr: false` to prevent R3F hydration mismatches.
- **`layout/`** — `Navbar` (sticky, scroll-aware, mobile-animated) and `Footer`.
- **`ui/`** — atomic primitives: `Button`, `MaxWidthWrapper`, `SectionLabel`, `SectionDivider`, `AnimatedCounter`, `ImageMarquee`.
- **`motion/`** — reusable animation wrappers (`FadeInUp`, `StaggerContainer`) that consume `lib/motion.ts` variants and respect `useReducedMotion`.

### Design system

All design tokens live in `src/app/globals.css` under `@theme`. Key tokens:

| Token | Value |
|---|---|
| `obsidian` | `#030709` (page background) |
| `soyl-white` | `#F8FCFD` |
| `mint` | `#AFD0CC` (accent, CTAs) |
| `graphite` | `#636467` (muted text) |
| `card-bg` | `#0d1214` |
| `max-width-content` | `1200px` |

Opacity variants: `mint-10`, `mint-20`, `mint-40`.

Fonts: **Nevera** (display, `font-display`), **Groote** (heading, `font-heading`), Century Gothic (body, `font-body`), Gadugi (caption, `font-caption`). Nevera and Groote are self-hosted WOFF2 in `/public/fonts/`.

### Animation patterns

- **Framer Motion** for scroll-triggered reveals and page transitions. Shared variants in `src/lib/motion.ts` (`fadeInUp`, `staggerContainer`, `fadeIn`, `slideInLeft`, `slideInRight`, `pageVariants`).
- **`<FadeInUp>`** / **`<StaggerContainer>`** are drop-in wrappers for sections; they guard against `prefers-reduced-motion` via `useReducedMotion()`.
- **GSAP** is installed for sticky-scroll and complex sequenced timelines.
- **Three.js / R3F** (with `@react-three/drei`) for the hero WebGL visual. Always load R3F canvases via `dynamic(..., { ssr: false })`.

### Utilities

- `src/lib/utils.ts` — exports `cn()` (clsx + tailwind-merge).
- `src/lib/motion.ts` — Framer Motion variant presets.

### Navigation

Use `<Link>` from `next-view-transitions` (not `next/link`) everywhere to preserve view-transition animations.

### CMS

Sanity (`@sanity/client`, `next-sanity`) is wired in as the content backend for the Library section. Blog and research slug pages are Phase 4/5 stubs.
