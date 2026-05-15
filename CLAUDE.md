# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Next.js dev server (port 3000)
npm run build    # Production build
npm run start    # Run the production build
npm run lint     # ESLint (no test suite exists)
```

There are no automated tests. Lint is the only code-quality gate. TypeScript paths are aliased: `@/*` → `./src/*`.

## Stack Versions — Breaking Changes

This project targets **Next.js 16.2 · React 19.2 · Tailwind CSS v4**. Key differences from older training data:

- **Next.js 16:** Dynamic route `params` are `Promise<{…}>` — always `await params` in async page components. Turbopack is the default dev bundler (`npm run dev` uses it). Read `node_modules/next/dist/docs/` before guessing an API.
- **React 19:** `ref` is a plain prop (no `forwardRef`). React Compiler is enabled (`reactCompiler: true` in `next.config.ts` via `babel-plugin-react-compiler`) — do NOT add manual `useMemo`/`useCallback` unless there's a proven perf need.
- **Tailwind v4:** Config is CSS-first in `src/app/globals.css` via `@theme { … }`. There is no `tailwind.config.ts`. Use `@import "tailwindcss"` — not the old `@tailwind` directives. PostCSS plugin: `@tailwindcss/postcss`.

## Architecture

### Routing (`src/app/`)

| Route | File |
|---|---|
| `/` | `app/page.tsx` (landing — Hero/About/Products/HowWeWork/Library sections) |
| `/about`, `/products`, `/how-we-work`, `/contact` | `app/<name>/page.tsx` |
| `/products/[slug]` | `app/products/[slug]/page.tsx` — static-generated from `PRODUCTS` in `src/lib/products.ts` |
| `/library` | `app/library/page.tsx` |
| `/library/category/[slug]` | `app/library/category/[slug]/page.tsx` |
| `/library/blog/[slug]` | `app/library/blog/[slug]/page.tsx` |
| `/library/research/[slug]` | `app/library/research/[slug]/page.tsx` |
| `/studio/[[...tool]]` | Sanity Studio (no navbar/footer, no page transitions, `noindex`) |
| `/api/agent/{text,audio}` | Butler demo proxy → `AGENT_API_URL` |
| `/sitemap.xml`, `/robots.txt` | `app/sitemap.ts`, `app/robots.ts` |

`/speak` permanently redirects to `/products/butler-ai` (see `next.config.ts`).

### Layout wrapping

`app/layout.tsx` mounts everything inside `<ViewTransitions>` (from `next-view-transitions`). Inline `style={{ backgroundColor: '#030709' }}` is set on `<html>` and `<body>` to kill the white-flash FOUC before CSS loads.

`SiteChrome` (`components/layout/SiteChrome.tsx`) is a thin client component that switches on `pathname`:
- Normal routes: render `<Navbar>` + `<main>{children}</main>` + `<Footer>`.
- `/studio/*`: bypass chrome entirely so Sanity Studio gets the full viewport.

It accepts Navbar/Footer as **slot props** from the server layout so those components don't get force-pulled into the client bundle.

`app/template.tsx` wraps each route in a Framer Motion fade transition (`pageVariants`), but **early-returns for `/studio` paths** so Studio's internal routing doesn't fight the page-transition wrapper.

### Component structure (`src/components/`)

- **`sections/`** — full-width landing-page sections (`HeroSection`, `AboutSection`, `ProductsSection`, `HowWeWorkSection`, `LibrarySection`, `LibrarySectionView`). The hero uses a WebGL canvas (`HeroVisual`) loaded via `next/dynamic` with `ssr: false` to prevent R3F hydration mismatches.
- **`layout/`** — `Navbar` (sticky, scroll-aware, mobile-animated), `Footer`, `SiteChrome` (studio-bypass switch).
- **`ui/`** — atomic primitives: `Button`, `MaxWidthWrapper`, `SectionLabel`, `SectionDivider`, `AnimatedCounter`, `ImageMarquee`.
- **`motion/`** — `FadeInUp`, `StaggerContainer` — drop-in wrappers that consume `lib/motion.ts` variants and respect `useReducedMotion`.
- **`about/`**, **`products/`**, **`how-we-work/`**, **`contact/`** — page-scoped section components mirroring each top-level route.
- **`products/butler-demo/`** — `ButlerDemoSection`, `ButlerDemo` (chat client), `PMSScreenshotsPanel`. Embedded on `/products/butler-ai`.
- **`library/`** — `LibraryHero`, `LibraryFilterShell`, `CategoryPillBar`, `CategoryRow`, `CategoryRowCard`, `ArticleHero`, `ArticleBreadcrumb`, `AbstractPanel`, `PdfEmbed`, `PortableTextRenderer`, `TableOfContents`, `CopyCiteButton`, `RelatedPosts`, `NewsletterCTA`, `MintDataRain`. Heading `id`s used by `PortableTextRenderer` and `TableOfContents` MUST match — both call `slugifyHeading` from `library/toc.ts` for parity.

### Design system

All design tokens live in `src/app/globals.css` under `@theme`. Key tokens:

| Token | Value | Use |
|---|---|---|
| `--color-obsidian` | `#030709` | page background |
| `--color-soyl-white` | `#F8FCFD` | body text |
| `--color-mint` | `#AFD0CC` | accent, CTAs |
| `--color-graphite` | `#636467` | muted text |
| `--color-card-bg` | `#0d1214` | cards |
| `--color-elevated` | `#0B1114` | demo / surface sections |
| `--color-footer-bg` | `#0a0d0f` | footer |
| `--max-width-content` | `1200px` | `max-w-content` utility |

Mint opacity variants (defined via `oklch(from … / α)`): `mint-10`, `mint-20`, `mint-40` — use as `bg-mint-10`, `border-mint-40`, etc.

Animation tokens (consumed as Tailwind `animate-*` utilities): `--animate-marquee` (30s linear infinite), `--animate-fade-up`, `--animate-bounce-y`. Keyframes are defined in the same file.

Fonts: **Nevera** (display, `font-display`), **Groote** (heading, `font-heading`), Century Gothic (body, `font-body`), Gadugi (caption, `font-caption`). Nevera and Groote are self-hosted WOFF2 in `/public/fonts/`.

### Animation patterns

- **Framer Motion** for scroll-triggered reveals and page transitions. Shared variants in `src/lib/motion.ts`: `fadeInUp`, `staggerContainer`, `fadeIn`, `slideInLeft`, `slideInRight`, `pageVariants`.
- **`<FadeInUp>`** / **`<StaggerContainer>`** are drop-in wrappers; they guard against `prefers-reduced-motion` via `useReducedMotion()`. Prefer these over hand-rolling new variants.
- **View transitions:** use `<Link>` from `next-view-transitions` everywhere (NOT `next/link`) to preserve cross-fade page transitions. Do not wrap routes in Framer's `<AnimatePresence>` — view transitions already handle that.
- **GSAP** + `@gsap/react` are installed for sticky-scroll / sequenced timelines.
- **Three.js + R3F** (`@react-three/fiber`, `@react-three/drei`) — the hero WebGL visual. Always load R3F canvases via `dynamic(..., { ssr: false })`.

### CMS (Sanity)

The Library section is **fully wired to Sanity**, not a stub. Studio mounts at `/studio` with the config in `sanity.config.ts`. Schemas live in `src/sanity/schemas/`: `category`, `blogPost`, `whitepaper`, and a `codeBlock` portable-text block.

- **Client wrapper:** `src/sanity/lib/client.ts` exports `sanityFetch<T>` — wraps `next-sanity`'s `createClient` with tag-based revalidation (default 60s) and returns `null` on outage rather than throwing, so a transient Sanity failure degrades to the fallback.
- **Configured vs not:** `src/sanity/env.ts` exports `isSanityConfigured` (true when `NEXT_PUBLIC_SANITY_PROJECT_ID` is set). When unset, `sanityFetch` returns `null` and the page falls back to seed data.
- **Fallback path:** `src/sanity/lib/fallback.ts` reshapes `src/lib/mockData.ts` into the same `LibraryIndexData` / `BlogPostDoc` / `WhitepaperDoc` shapes Sanity returns. The same components render both modes — keep them shape-compatible.
- **Image loader:** Sanity CDN is whitelisted in `next.config.ts` (`cdn.sanity.io`). Use `urlFor()` from `src/sanity/lib/image.ts`.
- **GROQ queries** are centralized in `src/sanity/lib/queries.ts`. The card projection is unified across `blogPost` and `whitepaper` so one card component renders either.

### Butler live demo + agent backend

`/products/butler-ai` embeds a live voice + text demo. It POSTs to `/api/agent/text` and `/api/agent/audio`, which:

1. Check a cookie-based **session cap** (20 messages per 24h, `src/lib/session-cap.ts`).
2. Apply an **Upstash Redis sliding-window rate limit** (15/h text, 5/h audio, keyed on IP) via `src/lib/ratelimit.ts`. When `UPSTASH_REDIS_REST_URL` is unset, the limiter falls back to a no-op so dev works without secrets.
3. Proxy the request to the FastAPI agent at `process.env.AGENT_API_URL` (defaults to `http://localhost:8000`).

If any limit trips, the demo gracefully degrades to a "get in touch" CTA rather than failing.

### Server actions

- `src/app/actions/contact.ts` — `submitContact` validates name/email/message and returns `ContactFormState`. Currently a no-op (no email/store) — wire to a provider before launch.
- `src/app/actions/newsletter.ts` — `submitNewsletter` validates email and returns `NewsletterState`. Also a no-op pending Resend (or similar) wiring. Keep the state shape parallel to `ContactFormState` so the form-component pattern carries over.

### Utilities & shared data

- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge).
- `src/lib/motion.ts` — Framer Motion variant presets.
- `src/lib/icons.ts` — `ICON_MAP` for `lucide-react` icons referenced by **string** in static data (e.g., product features keep `icon: 'Zap'` in plain JSON so the data file stays serializable).
- `src/lib/products.ts` — `PRODUCTS` array is the source of truth for `/products` and `/products/[slug]`. Adding a product here automatically extends `generateStaticParams` and the sitemap.
- `src/lib/mockData.ts` — seed papers/blogs used by the Sanity fallback.
- `src/lib/ratelimit.ts`, `src/lib/session-cap.ts` — Butler demo guardrails (see above).

### Environment variables

See `.env.example` for the full list. The build never requires any of them — every integration degrades gracefully when its env is missing:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN` — Library CMS. Without these the studio route shows a placeholder and the library falls back to mock data.
- `AGENT_API_URL` — FastAPI Butler agent. Defaults to `http://localhost:8000`.
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` — rate-limit backend. Without these the limiter is a no-op.
