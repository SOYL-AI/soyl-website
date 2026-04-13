# SOYL AI — Complete Website Implementation Plan
> **Version:** 1.1 | **Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP · Three.js · Sanity  
> **Aesthetic:** Corporate Minimalism × Modern Motion — dark-first, mint-accented, animation-rich

> [!IMPORTANT]
> **Version Compatibility:** This plan targets **Next.js 16.2.0**, **React 19.2.4**, and **Tailwind CSS v4**. Code snippets use the APIs from these versions. Key differences from older versions:
> - **Next.js 16:** Dynamic route `params` are async and must be awaited. `template.tsx` behavior unchanged.
> - **React 19:** `ref` is a regular prop (no `forwardRef`). `use()` hook available. React Compiler enabled (`babel-plugin-react-compiler`) — manual `useMemo`/`useCallback` rarely needed.
> - **Tailwind v4:** CSS-first configuration via `@theme` blocks. No `tailwind.config.ts` needed. `@import "tailwindcss"` replaces `@tailwind` directives.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Design System Reference](#2-design-system-reference)
3. [Architecture & Routing](#3-architecture--routing)
4. [Phase 0 — Prerequisites](#4-phase-0--prerequisites)
5. [Phase 1 — Foundation & Scaffolding](#5-phase-1--foundation--scaffolding)
6. [Phase 2 — Landing Page (Static)](#6-phase-2--landing-page-static)
7. [Phase 3 — Animation Layer](#7-phase-3--animation-layer)
8. [Phase 4 — Individual Pages](#8-phase-4--individual-pages)
9. [Phase 5 — Library & CMS](#9-phase-5--library--cms)
10. [Phase 6 — Polish & Launch](#10-phase-6--polish--launch)
11. [Component Reference](#11-component-reference)
12. [File Structure](#12-file-structure)
13. [Environment Variables](#13-environment-variables)
14. [Analytics & Event Tracking](#14-analytics--event-tracking)
15. [Performance Budget](#15-performance-budget)
16. [Definition of Done](#16-definition-of-done)

---

## 1. Project Overview

### Company
**SOYL AI Private Limited** — *Story Of Your Life*  
An AI company with three core products, a research output, and a content library.

### Website Goals
- Establish brand authority through design quality
- Drive product discovery and lead generation
- Serve as the canonical home for published research and blog content
- Be maintainable by non-developers (CMS-powered Library)

### Design Direction
Corporate minimalism with kinetic personality. Dark backgrounds (#030709) as the default canvas, mint (#AFD0CC) as the single accent, typography from NEVERA (display) to Century Gothic (body). Every section has at least one animation. No decorative clutter — motion is the decoration.

### Sections (Landing Page)
`Hero → About → Products → How We Work → Library Preview → Footer`

### Individual Pages
`/about` · `/products` · `/products/[slug]` · `/how-we-work` · `/library` · `/library/blog/[slug]` · `/library/research/[slug]`

---

## 2. Design System Reference

### Colour Palette

| Token | Hex | Role |
|-------|-----|------|
| `--color-obsidian` | `#030709` | Primary background, text on light |
| `--color-white` | `#F8FCFD` | Light background, body text on dark |
| `--color-mint` | `#AFD0CC` | Accent, CTAs, tagline, highlights |
| `--color-graphite` | `#636467` | Secondary text, dividers, muted UI |
| `--color-card-bg` | `#0d1214` | Card surfaces on dark sections |
| `--color-footer-bg` | `#0a0d0f` | Footer background |

Derived opacity variants: `--color-mint-10`, `--color-mint-20`, `--color-mint-40`

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display | NEVERA | 700 | Hero title, major section headings |
| Heading | Groote | 400–700 | Section titles, card titles |
| Body | Century Gothic | 400 | Paragraphs, UI labels, nav links |
| Caption | Gadugi | 400 | Footnotes, metadata, timestamps |

**Font loading:** Self-host NEVERA and Groote as WOFF2 in `/public/fonts/`. Century Gothic and Gadugi have system fallbacks on Windows; include WOFF2 for cross-platform parity.

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Icon gaps, inline spacing |
| `--space-sm` | 8px | Between related elements |
| `--space-md` | 16px | Component internal padding |
| `--space-lg` | 32px | Section element spacing |
| `--space-xl` | 64px | Section vertical padding |
| `--space-2xl` | 120px | Hero breathing room |

### Layout
- Max content width: **1200px**
- Section padding (vertical): **64px desktop / 48px tablet / 40px mobile**
- Column gutter: **24px**
- Border radius: **4px** subtle · **12px** cards · **999px** pills

### Logo Rules
- Never change transparency or distort
- Never add drop shadows
- Never rotate
- Never change brand colours
- Tagline "Story Of Your Life" always in `#AFD0CC`
- Submark (circular icon) for favicon, avatars, and small placements only

### Elevation & Borders
- Card border: `1px solid rgba(175, 208, 204, 0.12)`
- Hover card border: `1px solid rgba(175, 208, 204, 0.40)`
- Section dividers: `1px solid rgba(175, 208, 204, 0.08)`
- No box-shadows on dark surfaces — use border brightness instead

---

## 3. Architecture & Routing

### Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 16 (App Router) | SSG for Library SEO, file-based routing, RSC |
| Language | TypeScript | Type safety, intern-handoff friendly |
| React | React 19 | React Compiler, `use()` hook, `ref` as prop |
| Styling | Tailwind CSS v4 (CSS-first) | Brand tokens via `@theme`, no config file needed |
| Animation (general) | Framer Motion | React-native API, viewport triggers, scroll reveals |
| Page Transitions | next-view-transitions | View Transitions API, progressive enhancement |
| Animation (scroll-pinned) | GSAP + ScrollTrigger | How We Work sticky section (free for websites¹) |
| 3D / Hero Visual | Three.js via React Three Fiber | Logo-inspired orbital geometry |
| Icon animation | Lottie (lottie-react) | Lightweight, brand-consistent SVG animation |
| CMS | Sanity.io | Non-dev publishing, Next.js first-class support |
| Deployment | Vercel | Zero-config Next.js, preview URLs per branch |
| Utilities | clsx + tailwind-merge | Safe className composition |

> ¹ **GSAP License Note:** GSAP's "no-charge" license covers commercial websites where end users don't pay for the animation features directly. SOYL AI's corporate website qualifies. Pin the GSAP version (`^3.14.2`) to avoid future licensing changes.

### Route Map

```
/                               ← Landing page (all sections)
/about                          ← Full about page
/products                       ← All products listing
/products/[slug]                ← Individual product detail
/how-we-work                    ← Full methodology page
/library                        ← Blog + Research listing
/library/blog/[slug]            ← Blog post
/library/research/[slug]        ← Research paper
/contact                        ← Contact form + lead capture
```

### Data Flow

```
Sanity CMS
    │
    ├── Blog posts     → /library + /library/blog/[slug]
    ├── Research papers → /library + /library/research/[slug]
    └── Products (optional) → /products + /products/[slug]

Static content (hardcoded initially)
    ├── About section copy
    ├── How We Work steps
    └── Company stats
```

---

## 4. Phase 0 — Prerequisites

**Goal:** Ensure all required assets and licenses are in place before writing code.

**Duration:** 1–2 hours

---

### 0.1 — Font Acquisition

- [ ] Acquire **NEVERA** font license + WOFF2 file (display headings)
- [ ] Acquire **Groote** font license + WOFF2 file (section headings)
- [ ] Place both in `/public/fonts/`
- [ ] If either font is unavailable, use these fallbacks via `next/font/google`:
  - NEVERA fallback: **Space Grotesk** (weight 700)
  - Groote fallback: **Inter** (weight 400–700)

### 0.2 — Asset Preparation

- [ ] Export SOYL AI logo as SVG (full logo + submark)
- [ ] Prepare placeholder images for How We Work marquee (at least 6 images, 640×400px)
- [ ] Create OG image template (1200×630px) in Figma for later use

### 0.3 — Image Strategy

Define standard image dimensions across the site:

| Usage | Dimensions | Format | Notes |
|-------|-----------|--------|-------|
| Hero visual | 1200×800 | AVIF/WebP | `next/image` auto-serves best format |
| Blog cover | 600×400 | AVIF/WebP | Use `blurDataURL` placeholder |
| Team avatar | 128×128 | AVIF/WebP | Circular crop via CSS |
| Marquee image | 640×400 | AVIF/WebP | Lazy loaded |
| OG image | 1200×630 | PNG | Required for social sharing |

Use the [`plaiceholder`](https://plaiceholder.co/) package to generate `blurDataURL` strings for all static images.

**Phase 0 complete ✓**

---

## 5. Phase 1 — Foundation & Scaffolding

**Goal:** Working project that boots, has all routes, all dependencies, brand tokens applied, error/loading states. Zero content yet.

**Duration:** Day 1 (3–5 hours)

---

### 1.1 — Project Initialisation

```bash
npx create-next-app@latest soyl-ai-website \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd soyl-ai-website
```

When prompted: **Turbopack → No**

---

### 1.2 — Install Dependencies

```bash
# Animation
npm install framer-motion gsap @gsap/react

# Page transitions (View Transitions API)
npm install next-view-transitions

# 3D
npm install three @react-three/fiber @react-three/drei

# CMS
npm install next-sanity @sanity/image-url @sanity/client

# Lottie
npm install lottie-react

# Utilities
npm install clsx tailwind-merge

# Blur placeholders for images
npm install plaiceholder sharp

# Dev types
npm install -D @types/three
```

---

### 1.3 — Folder Structure

```bash
# Components
mkdir -p src/components/sections
mkdir -p src/components/layout
mkdir -p src/components/ui
mkdir -p src/components/motion

# Pages (App Router)
mkdir -p src/app/about
mkdir -p src/app/products
mkdir -p "src/app/products/[slug]"
mkdir -p src/app/how-we-work
mkdir -p src/app/library
mkdir -p "src/app/library/blog/[slug]"
mkdir -p "src/app/library/research/[slug]"
mkdir -p src/app/contact

# Library
mkdir -p src/lib

# Public assets
mkdir -p public/fonts
mkdir -p public/images
mkdir -p public/lottie
mkdir -p public/og

# Styles
mkdir -p src/styles
```

---

### 1.4 — Brand Tokens (`globals.css`) — Tailwind v4

Replace `src/app/globals.css` entirely. Tailwind v4 uses **CSS-first configuration** — all tokens are defined via `@theme` blocks instead of a `tailwind.config.ts` file:

```css
@import "tailwindcss";

/* === Tailwind v4 Theme Tokens === */
@theme {
  /* Colors — use as bg-obsidian, text-mint, etc. */
  --color-obsidian:    #030709;
  --color-soyl-white:  #F8FCFD;
  --color-mint:        #AFD0CC;
  --color-graphite:    #636467;
  --color-card-bg:     #0d1214;
  --color-footer-bg:   #0a0d0f;

  /* Opacity variants — use as bg-mint-10, etc. */
  --color-mint-10:     oklch(from #AFD0CC l c h / 0.10);
  --color-mint-20:     oklch(from #AFD0CC l c h / 0.20);
  --color-mint-40:     oklch(from #AFD0CC l c h / 0.40);

  /* Fonts — use as font-display, font-heading, etc. */
  --font-display: 'Nevera', 'Century Gothic', sans-serif;
  --font-heading: 'Groote', 'Century Gothic', sans-serif;
  --font-body:    'Century Gothic', 'Trebuchet MS', sans-serif;
  --font-caption: 'Gadugi', 'Century Gothic', sans-serif;

  /* Layout */
  --max-width-content: 1200px;

  /* Animations — use as animate-marquee, animate-fade-up, etc. */
  --animate-marquee:  marquee 30s linear infinite;
  --animate-fade-up:  fadeUp 0.5s ease-out forwards;
  --animate-bounce-y: bounceY 1.5s ease-in-out infinite;
}

/* === Custom Keyframes === */
@keyframes marquee {
  0%   { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
@keyframes fadeUp {
  0%   { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes bounceY {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(8px); }
}

/* === Base Styles === */
html { scroll-behavior: smooth; }
body {
  background-color: var(--color-obsidian);
  color: var(--color-soyl-white);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

/* Self-hosted fonts — add your WOFF2 files to /public/fonts/ then uncomment */
/*
@font-face {
  font-family: 'Nevera';
  src: url('/fonts/Nevera.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
@font-face {
  font-family: 'Groote';
  src: url('/fonts/Groote.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
*/

::selection { background: var(--color-mint-40); color: var(--color-obsidian); }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--color-obsidian); }
::-webkit-scrollbar-thumb { background: var(--color-graphite); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-mint); }
```

---

### 1.5 — Tailwind Config (Not Needed — Delete)

> [!IMPORTANT]
> **Tailwind v4 does not use `tailwind.config.ts`.** All configuration is handled via the `@theme` block in `globals.css` above. Content paths are auto-detected. If a `tailwind.config.ts` file exists from the project scaffolding, **delete it** to avoid confusion.
>
> ```bash
> rm tailwind.config.ts  # Tailwind v4 uses CSS-first config
> ```

---

### 1.6 — Utility Helpers

**`src/lib/utils.ts`**
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**`src/lib/motion.ts`** — Shared Framer Motion variants
```ts
export const fadeInUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}
export const slideInLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}
export const slideInRight = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}
export const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}
```

> [!NOTE]
> `exit` variants are removed — App Router unmounts pages before exit animations can play. Page transitions are handled by `next-view-transitions` instead.

---

### 1.7 — Motion Wrapper Components

**`src/components/motion/FadeInUp.tsx`**
```tsx
'use client'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'

interface Props { children: React.ReactNode; delay?: number; className?: string }

export default function FadeInUp({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

**`src/components/motion/StaggerContainer.tsx`**
```tsx
'use client'
import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/motion'

interface Props { children: React.ReactNode; className?: string }

export default function StaggerContainer({ children, className }: Props) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

**`src/components/motion/PageTransition.tsx`** — NOT NEEDED

> [!IMPORTANT]
> **Do not use Framer Motion `AnimatePresence` for page transitions.** App Router unmounts the old page before `exit` animations can play. Use [`next-view-transitions`](https://github.com/shuding/next-view-transitions) instead — see Root Layout (§1.11).
>
> The `next-view-transitions` package uses the browser-native View Transitions API (Chrome 111+, progressive enhancement on other browsers).

---

### 1.8 — UI Primitives

**`src/components/ui/MaxWidthWrapper.tsx`**
```tsx
import { cn } from '@/lib/utils'
export default function MaxWidthWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('max-w-content mx-auto px-6 lg:px-16', className)}>{children}</div>
}
```

**`src/components/ui/SectionLabel.tsx`**
```tsx
export default function SectionLabel({ children, className = '' }: { children: string; className?: string }) {
  return (
    <p className={`text-mint text-xs tracking-[0.22em] uppercase mb-3 flex items-center gap-3 ${className}`}>
      {children}
      <span className="w-10 h-px bg-mint opacity-40 inline-block" />
    </p>
  )
}
```

**`src/components/ui/Button.tsx`**
```tsx
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Props {
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  href?: string
  className?: string
  onClick?: () => void
}

export default function Button({ children, variant = 'primary', href, className, onClick }: Props) {
  const base = 'inline-flex items-center gap-2 px-6 py-3 rounded text-sm tracking-wide transition-all duration-200 font-body cursor-pointer'
  const styles = {
    primary: 'border border-mint text-mint hover:bg-mint hover:text-obsidian',
    ghost:   'border border-graphite text-soyl-white hover:border-mint hover:text-mint',
  }
  const combined = cn(base, styles[variant], className)
  if (href) return <Link href={href} className={combined}>{children}</Link>
  return <button onClick={onClick} className={combined}>{children}</button>
}
```

---

### 1.9 — Layout: Navbar

```tsx
// src/components/layout/Navbar.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'About',       href: '/about' },
  { label: 'Products',    href: '/products' },
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'Library',     href: '/library' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-obsidian/95 backdrop-blur-sm border-b border-mint/10' : 'bg-transparent'
    )}>
      <div className="max-w-content mx-auto px-6 lg:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-mint/40 flex items-center justify-center">
            <span className="text-mint text-xs font-bold">S</span>
          </div>
          <span className="font-display font-bold text-soyl-white tracking-tight">SOYL AI</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href}
              className="text-graphite text-sm hover:text-mint transition-colors duration-200">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link href="/products"
          className="hidden md:inline-flex items-center px-4 py-2 text-sm border border-mint/40 text-mint rounded hover:bg-mint hover:text-obsidian transition-all duration-200">
          Get Started
        </Link>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-graphite hover:text-mint" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-obsidian border-t border-mint/10 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className="text-graphite text-sm hover:text-mint transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
```

---

### 1.10 — Layout: Footer

```tsx
// src/components/layout/Footer.tsx
import Link from 'next/link'

const LINKS = {
  Company:  [{ label: 'About', href: '/about' }, { label: 'How We Work', href: '/how-we-work' }],
  Products: [{ label: 'All Products', href: '/products' }],
  Library:  [{ label: 'Blogs', href: '/library' }, { label: 'Research', href: '/library' }],
  Contact:  [{ label: 'Get in Touch', href: '/contact' }],
}

export default function Footer() {
  return (
    <footer className="bg-[#0a0d0f] border-t border-mint/10">
      <div className="max-w-content mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full border border-mint/40 flex items-center justify-center">
                <span className="text-mint text-xs font-bold">S</span>
              </div>
              <span className="font-display font-bold text-soyl-white">SOYL AI</span>
            </div>
            <p className="text-mint text-xs tracking-widest">Story Of Your Life</p>
          </div>

          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-soyl-white text-xs font-bold tracking-widest uppercase mb-4">{group}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-graphite text-sm hover:text-mint transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-mint/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-graphite text-xs">© {new Date().getFullYear()} SOYL AI Private Limited. All rights reserved.</p>
          <p className="text-graphite text-xs">Built with purpose.</p>
        </div>
      </div>
    </footer>
  )
}
```

---

### 1.11 — Root Layout

The root layout uses `ViewTransitions` from `next-view-transitions` for smooth page transitions using the browser-native View Transitions API:

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { ViewTransitions } from 'next-view-transitions'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: { default: 'SOYL AI Private Limited', template: '%s | SOYL AI' },
  description: 'Story Of Your Life — AI solutions that capture and preserve human experiences.',
  openGraph: { title: 'SOYL AI Private Limited', description: 'Story Of Your Life', type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  )
}
```

> [!TIP]
> Use `<Link>` from `next-view-transitions` instead of `next/link` in Navbar and other navigation for animated transitions:
> ```tsx
> import { Link } from 'next-view-transitions'
> ```

---

### 1.12 — Landing Page & Section Shells

```tsx
// src/app/page.tsx
import HeroSection      from '@/components/sections/HeroSection'
import AboutSection     from '@/components/sections/AboutSection'
import ProductsSection  from '@/components/sections/ProductsSection'
import HowWeWorkSection from '@/components/sections/HowWeWorkSection'
import LibrarySection   from '@/components/sections/LibrarySection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <HowWeWorkSection />
      <LibrarySection />
    </>
  )
}
```

Create placeholder files for each section in `src/components/sections/` — each exports a section tag with a placeholder comment. Build out fully in Phase 2.

---

### 1.13 — Route Shells

Create `page.tsx` inside each app route folder with this pattern:

```tsx
// Example: src/app/about/page.tsx
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'About' }
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-obsidian pt-24">
      <div className="max-w-content mx-auto px-6 text-graphite text-sm">[About — Phase 4]</div>
    </main>
  )
}
```

Repeat for: `/products`, `/products/[slug]`, `/how-we-work`, `/library`, `/library/blog/[slug]`, `/library/research/[slug]`, `/contact`.

Dynamic routes in **Next.js 16** use **async params** — the `params` prop is a `Promise` that must be awaited:

```tsx
// Example: src/app/products/[slug]/page.tsx
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Product' }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <main className="min-h-screen bg-obsidian pt-24">
      <div className="max-w-content mx-auto px-6 text-graphite text-sm">[Product: {slug} — Phase 4]</div>
    </main>
  )
}
```

---

### 1.14 — Error, Loading & 404 States

Create these early so the site never shows a raw error or default 404:

**`src/app/not-found.tsx`**
```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-6xl font-bold text-soyl-white mb-4">404</h1>
        <p className="text-graphite mb-8">This page doesn't exist.</p>
        <Link href="/" className="text-mint text-sm border border-mint/40 px-6 py-3 rounded hover:bg-mint hover:text-obsidian transition-all">
          Back to Home
        </Link>
      </div>
    </main>
  )
}
```

**`src/app/error.tsx`**
```tsx
'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold text-soyl-white mb-4">Something went wrong</h1>
        <p className="text-graphite mb-8">{error.message}</p>
        <button onClick={reset} className="text-mint text-sm border border-mint/40 px-6 py-3 rounded hover:bg-mint hover:text-obsidian transition-all">
          Try Again
        </button>
      </div>
    </main>
  )
}
```

**`src/app/loading.tsx`**
```tsx
export default function Loading() {
  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-mint/20 border-t-mint animate-spin" />
    </main>
  )
}
```

---

### 1.14 — First Boot & Commit

```bash
npm run dev
# → http://localhost:3000 should load with Navbar + section placeholders + Footer

git init
git add .
git commit -m "scaffold: Phase 1 complete — foundation, tokens, route shells, layout"
```

**Phase 1 complete ✓** — project boots, all routes exist, brand tokens applied, no content yet.

---

## 6. Phase 2 — Landing Page (Static)

**Goal:** All five landing sections built with real layout and copy. No animations yet. Pixel-perfect on desktop. Mobile responsive.

**Duration:** 5–7 days

---

### 2.1 — Hero Section

**File:** `src/components/sections/HeroSection.tsx`

**Layout:** Two-column (60/40 split). Left: text + CTAs. Right: visual placeholder (Three.js added in Phase 3).

```
┌─────────────────────────────────────────────────────┐
│ [NAV]                                               │
│                                                     │
│  Eyebrow label                   [   Visual / 3D  ] │
│  SOYL AI                         [   Placeholder  ] │
│  Private Limited                 [                ] │
│  Story Of Your Life (mint)       [                ] │
│                                                     │
│  Short descriptor paragraph                         │
│                                                     │
│  [Get Started →]  [View Research →]                 │
│                                                     │
│                     ↓  (scroll indicator)           │
└─────────────────────────────────────────────────────┘
```

**Key implementation notes:**
- Full-viewport height: `min-h-screen`
- Background: `bg-obsidian` with a subtle 4% opacity geometric grid overlay (CSS background-image with linear-gradient lines, 40px × 40px grid)
- Eyebrow: `text-xs tracking-[0.22em] uppercase text-mint`
- Main title: `font-display font-bold` at `clamp(52px, 7vw, 96px)` using inline style or a utility class
- Tagline: `font-display` in `text-mint` — separate line under the company name
- Descriptor: `text-graphite` max-width 480px
- CTAs: Two buttons side by side — primary (mint border) and ghost (graphite border)
- Right column: `bg-card-bg` rounded-2xl placeholder div, min-height 500px, with a centered `text-graphite/30 text-sm` label "3D Visual — Phase 3"
- Scroll indicator: `↓` arrow centred at bottom, `animate-bounce-y` class from Tailwind config

---

### 2.2 — About Section

**File:** `src/components/sections/AboutSection.tsx`

**Layout:** Light section. Two-column — text left, stat grid right.

```
┌─────────────────────────────────────────────────────┐
│  Who We Are (section label)                         │
│                                                     │
│  [Text Column]           [2×2 Stat Grid]            │
│  Mission statement       ┌────────┬────────┐        │
│  (large, bold)           │ 2023   │  3     │        │
│                          │ Founded│Products│        │
│  Overview paragraph      ├────────┼────────┤        │
│                          │  12    │  8     │        │
│  Learn More →            │ Papers │ Team   │        │
│                          └────────┴────────┘        │
└─────────────────────────────────────────────────────┘
```

**Key implementation notes:**
- Section background: `bg-elevated` (dark), text: `text-soyl-white` (intentional dark theme — consistent with brand aesthetic)
- Left column gets a `border-l-2 border-mint pl-6` accent
- Stat cards: `bg-white border border-obsidian/10 rounded-xl p-6` — each has a large number in `font-display text-obsidian text-4xl` and a muted label below
- `AnimatedCounter` component: counts up from 0 to target value using `requestAnimationFrame` on viewport entry — add in Phase 3
- "Learn More →" is a text link with `hover:text-mint` + a pseudo-element underline that grows from left on hover (CSS `::after` with `width: 0 → 100%` transition)

**Stat data (hardcode initially):**
```ts
const STATS = [
  { value: 2023, label: 'Year Founded', suffix: '' },
  { value: 3,    label: 'Products Live', suffix: '' },
  { value: 12,   label: 'Research Papers', suffix: '+' },
  { value: 8,    label: 'Team Members', suffix: '' },
]
```

---

### 2.3 — Products Section

**File:** `src/components/sections/ProductsSection.tsx`

**Layout:** Dark section. 3-column card grid.

```
┌─────────────────────────────────────────────────────┐
│  Our Products (section label)                       │
│  Section heading                                    │
│  One-line descriptor                                │
│                                                     │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐        │
│  │  [Icon]   │  │  [Icon]   │  │  [Icon]   │        │
│  │ Product 1 │  │ Product 2 │  │ Product 3 │        │
│  │           │  │           │  │           │        │
│  │  2-line   │  │  2-line   │  │  2-line   │        │
│  │  desc     │  │  desc     │  │  desc     │        │
│  │           │  │           │  │           │        │
│  │ Explore → │  │ Explore → │  │ Explore → │        │
│  └───────────┘  └───────────┘  └───────────┘        │
│                                                     │
│              [View All Products →]                  │
└─────────────────────────────────────────────────────┘
```

**Key implementation notes:**
- Section background: `bg-obsidian`
- Card: `bg-card-bg border border-mint/12 rounded-xl p-8 flex flex-col gap-6` — equal height via CSS grid
- Card hover state (Phase 3): mint gradient floods from bottom, border brightens
- Card grid: `grid grid-cols-1 md:grid-cols-3 gap-6`
- Icon area: 48px × 48px placeholder `div` with `bg-mint/10 rounded-lg` — replace with Lottie in Phase 3
- Product name: `font-heading font-bold text-xl text-soyl-white`
- Description: `text-graphite text-sm leading-relaxed`
- "Explore →" link: `text-mint text-sm hover:gap-2` with arrow that shifts right on hover
- Bottom CTA: centered `Button` component with `href="/products"`

**Product data (replace with real content):**
```ts
const PRODUCTS = [
  { slug: 'product-one', name: 'Product One', description: 'Short description of what this product does and who it is for.', icon: null },
  { slug: 'product-two', name: 'Product Two', description: 'Short description of what this product does and who it is for.', icon: null },
  { slug: 'product-three', name: 'Product Three', description: 'Short description of what this product does and who it is for.', icon: null },
]
```

---

### 2.4 — How We Work Section

**File:** `src/components/sections/HowWeWorkSection.tsx`

**Layout:** Light section. Left: step list with numbers. Right: content panel per step. Bottom: marquee image strip.

```
┌─────────────────────────────────────────────────────┐
│  How We Work (section label)                        │
│                                                     │
│  ┌──────────────┐  ┌──────────────────────────────┐ │
│  │ 01  Discover │  │  [Step image / visual]       │ │
│  │ 02  Design   │  │  Step heading                │ │
│  │ 03  Build    │  │  Paragraph about this step   │ │
│  │ 04  Iterate  │  │                              │ │
│  │              │  │                              │ │
│  │ See Process→ │  │                              │ │
│  └──────────────┘  └──────────────────────────────┘ │
│                                                     │
│  ┌ ─ ─ ─ ─ Marquee image strip ─ ─ ─ ─ ─ ─ ─ ─ ┐    │
│   [img][img][img][img][img][img][img][img]          │
│  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘    │
└─────────────────────────────────────────────────────┘
```

**Key implementation notes:**
- Section background: `bg-elevated` (dark, intentional — consistent with brand aesthetic)
- In Phase 2: render all step panels stacked vertically (no sticky behaviour yet — GSAP sticky added in Phase 3)
- Step number: `font-display font-bold text-4xl text-obsidian/20` — large, decorative
- Active step: number becomes `text-mint`, title becomes `text-obsidian font-bold`
- Step panel image: `aspect-video bg-obsidian/10 rounded-xl` placeholder for now — replace with real images
- Marquee strip: `div` with overflow-hidden, inner div with `animate-marquee` class. Duplicate images inside to create seamless loop
- "See Full Process →" links to `/how-we-work`

**Step data:**
```ts
const STEPS = [
  { number: '01', title: 'Discover', description: 'We begin by deeply understanding the problem space, user needs, and business context.' },
  { number: '02', title: 'Design',   description: 'Rapid prototyping and design thinking translate insights into tangible solutions.' },
  { number: '03', title: 'Build',    description: 'Engineering rigour and AI-first thinking produce robust, scalable products.' },
  { number: '04', title: 'Iterate',  description: 'Continuous feedback loops and real-world data drive ongoing refinement.' },
]
```

---

### 2.5 — Library Section

**File:** `src/components/sections/LibrarySection.tsx`

**Layout:** Dark section. Two-column — blog left, research right. Divider between them.

```
┌─────────────────────────────────────────────────────┐
│  Library (section label)                            │
│  Section heading                                    │
│                                                     │
│  ┌──────────────────┐  │  ┌──────────────────────┐  │
│  │ LATEST BLOG      │  │  │ RESEARCH PAPERS      │  │
│  │                  │  │  │                      │  │
│  │ [Cover image]    │  │  │ [Abstract badge]     │  │
│  │ Blog title       │  │  │ Paper title          │  │
│  │ Date · Read time │  │  │ Authors · Year       │  │
│  │ Excerpt line...  │  │  │ Brief abstract...    │  │
│  │ Read →           │  │  │ View Paper →         │  │
│  └──────────────────┘  │  └──────────────────────┘  │
│                                                     │
│              [Explore Full Library →]               │
└─────────────────────────────────────────────────────┘
```

**Key implementation notes:**
- Section background: `bg-obsidian`
- Two columns: `grid grid-cols-1 md:grid-cols-2 gap-0` with a `border-r border-mint/20` on the left column
- Blog card: cover image via `next/image` with `placeholder="blur"`, title in `font-heading`, date and read time in `text-graphite text-xs`, excerpt in `text-graphite text-sm`, "Read →" in `text-mint`
- Research card: no image — instead a `[Research Paper]` badge (`bg-mint/10 text-mint text-xs px-3 py-1 rounded-full`), title in `font-heading`, authors and year in `text-graphite text-xs`, abstract snippet in `text-graphite text-sm`
- Both cards have a `hover:-translate-y-1.5 transition-transform duration-200` on the card wrapper
- Bottom CTA: centered `Button` with `href="/library"`
- Use mock data objects for now; replace with Sanity fetch in Phase 5

---

### 2.6 — Responsive Checks

After all 5 sections are built, verify on these breakpoints before moving to Phase 3:

| Breakpoint | Width | Key checks |
|------------|-------|------------|
| Mobile | 375px | Single columns, text doesn't overflow, buttons full-width |
| Tablet | 768px | Two-column grids, adequate padding |
| Desktop | 1280px | Three-column products grid, proper max-width centering |
| Wide | 1440px+ | Content stays at 1200px, doesn't stretch |

```bash
git add .
git commit -m "feat: Phase 2 complete — all landing sections built, static, responsive"
```

**Phase 2 complete ✓**

---

## 7. Phase 3 — Animation Layer

**Goal:** Add all animations to the landing page. The site should feel alive. Framer Motion for scroll reveals, GSAP for How We Work sticky scroll, Three.js for the Hero visual.

**Duration:** 4–5 days

---

### 3.1 — Page Transition System

Page transitions are handled by `next-view-transitions` (set up in Root Layout §1.11). To add entry animations per route, use `template.tsx` with Framer Motion — but **without `exit` or `AnimatePresence`**:

```tsx
// src/app/template.tsx  (runs on every route change)
'use client'
import { motion } from 'framer-motion'
import { pageVariants } from '@/lib/motion'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate">
      {children}
    </motion.div>
  )
}
```

> [!NOTE]
> `template.tsx` handles the **enter** animation (fade + slide up). The **exit** animation (cross-fade) is handled by the View Transitions API via `next-view-transitions`. These work together: View Transitions provides the smooth cross-fade between pages, while Framer Motion adds the entrance effect.

Optionally, add a CSS rule for additional View Transition control:
```css
/* In globals.css */
::view-transition-old(root) { animation: fadeOut 0.2s ease-in; }
::view-transition-new(root) { animation: fadeIn 0.3s ease-out; }
@keyframes fadeOut { to { opacity: 0; } }
@keyframes fadeIn { from { opacity: 0; } }
```

---

### 3.2 — Scroll Reveal (Hero Section)

Wrap each text element in the Hero with `motion.div` using staggered delays. Do NOT use `whileInView` for the Hero — it's above the fold so it should animate on mount:

```tsx
<motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
  Eyebrow label
</motion.p>
<motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}>
  SOYL AI
</motion.h1>
// Continue with delay: 0.4, 0.55, 0.7 for subsequent elements
```

---

### 3.3 — Scroll Reveals (All Other Sections)

Wrap section content in `StaggerContainer` and individual elements in `motion.div` with `variants={fadeInUp}`:

```tsx
// Pattern for any section
<StaggerContainer>
  <motion.div variants={fadeInUp}><SectionLabel>...</SectionLabel></motion.div>
  <motion.h2 variants={fadeInUp}>Section Title</motion.h2>
  <motion.p variants={fadeInUp}>Paragraph</motion.p>
</StaggerContainer>
```

For the About section's two-column layout, use `slideInLeft` for the text column and `slideInRight` for the stat grid.

---

### 3.4 — Animated Counter (About Stats)

```tsx
// src/components/ui/AnimatedCounter.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}
```

---

### 3.5 — Product Card Hover Animation

Add `whileHover` to each product card:

```tsx
<motion.div
  whileHover={{ y: -6 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  className="bg-card-bg border border-mint/12 rounded-xl p-8 ..."
>
```

Also animate the border colour on hover using Framer Motion's `animate` prop controlled by a `useHover` state:

```tsx
const [hovered, setHovered] = useState(false)

<motion.div
  onHoverStart={() => setHovered(true)}
  onHoverEnd={() => setHovered(false)}
  animate={{ borderColor: hovered ? 'rgba(175,208,204,0.4)' : 'rgba(175,208,204,0.12)' }}
>
```

---

### 3.6 — How We Work: GSAP Sticky Scroll

Install GSAP ScrollTrigger and build the sticky section:

```tsx
// src/components/sections/HowWeWorkSection.tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HowWeWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panels = gsap.utils.toArray('.step-panel') as HTMLElement[]

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveStep(i),
        onEnterBack: () => setActiveStep(i),
      })
    })

    // Pin the left step list
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: stepsRef.current,
      pinSpacing: false,
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  // ... render
}
```

The `setActiveStep` function updates a state variable that applies `text-mint font-bold` to the active step in the left list. Each right panel is a `.step-panel` div.

---

### 3.7 — Image Marquee (How We Work)

```tsx
// src/components/ui/ImageMarquee.tsx
export default function ImageMarquee({ images }: { images: string[] }) {
  const doubled = [...images, ...images] // duplicate for seamless loop

  return (
    <div className="overflow-hidden mt-16">
      <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]">
        {doubled.map((src, i) => (
          <div key={i} className="flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden bg-obsidian/10">
            {/* Replace with next/image when real images are available */}
            <div className="w-full h-full bg-graphite/20 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  )
}
```

The `animate-marquee` class references the keyframe defined in `globals.css` via the `@theme` block.

---

### 3.8 — Library Section: Column Reveal

```tsx
// Left column slides from left, right from right simultaneously
<div className="grid grid-cols-1 md:grid-cols-2">
  <motion.div
    variants={slideInLeft}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    {/* Blog card */}
  </motion.div>

  {/* Divider draws in */}
  <motion.div
    initial={{ scaleY: 0 }}
    whileInView={{ scaleY: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className="hidden md:block w-px bg-mint/20 origin-top"
  />

  <motion.div
    variants={slideInRight}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    {/* Research card */}
  </motion.div>
</div>
```

---

### 3.9 — Hero 3D Visual (Three.js)

```tsx
// src/components/sections/HeroVisual.tsx
'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function OrbitalMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
  })

  return (
    <Sphere ref={meshRef} args={[1.4, 100, 200]} scale={1}>
      <MeshDistortMaterial
        color="#AFD0CC"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        wireframe={false}
        transparent
        opacity={0.85}
      />
    </Sphere>
  )
}

export default function HeroVisual() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#AFD0CC" />
      <pointLight position={[-5, -3, -3]} intensity={0.5} color="#F8FCFD" />
      <OrbitalMesh />
    </Canvas>
  )
}
```

Import with `dynamic` to avoid SSR issues, and **always provide a loading skeleton** to prevent layout shift:

```tsx
// In HeroSection.tsx
import dynamic from 'next/dynamic'

const HeroVisual = dynamic(() => import('./HeroVisual'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-card-bg rounded-2xl animate-pulse flex items-center justify-center">
      <span className="text-graphite/30 text-sm">Loading visual…</span>
    </div>
  ),
})
```

> [!WARNING]
> **Bundle weight:** Three.js + React Three Fiber + Drei adds ~250KB gzipped to the client bundle. If Lighthouse Performance drops below 90, consider replacing the 3D visual with a CSS/SVG animation or a pre-rendered WebGL video loop as a fallback.

Add mouse-parallax offset by reading `mousemove` event and updating the camera position slightly via a ref.

---

### 3.10 — Reduced Motion

Wrap all Framer Motion animation components to respect system preferences:

```tsx
// src/components/motion/FadeInUp.tsx — updated
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'

export default function FadeInUp({ children, delay = 0, className }: Props) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      variants={prefersReduced ? {} : fadeInUp}
      initial={prefersReduced ? {} : 'hidden'}
      whileInView={prefersReduced ? {} : 'visible'}
      viewport={{ once: true }}
      transition={{ delay: prefersReduced ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

Apply the same pattern to `StaggerContainer` and all inline `motion.div` elements.

```bash
git add .
git commit -m "feat: Phase 3 complete — animation layer, GSAP sticky, Three.js hero, scroll reveals"
```

**Phase 3 complete ✓**

---

## 8. Phase 4 — Individual Pages

**Goal:** Build the full content for each route, including a new Contact page. Each page shares the Navbar/Footer and has its own layout, animations, and content.

**Duration:** 7–9 days

---

### 4.1 — About Page (`/about`)

**Sections:**
1. **Page hero** — Large title, breadcrumb, short description. Dark background, same height as a section (not full-viewport)
2. **Mission & Vision** — Two-column. Mission statement left, vision statement right, each with a mint quote-bar accent
3. **Our Story / Timeline** — Vertical timeline. Alternating left/right text blocks with year markers. GSAP or Framer scroll-driven animation draws the line as user scrolls
4. **Values** — 3-column grid of value cards (icon + title + short description)
5. **Team** — Card grid with photo placeholder, name, title, one-line bio. Hover reveals a mint overlay
6. **CTA strip** — "Ready to work with us?" with a button linking to `/contact`

**Animation notes:**
- Timeline line draws in with GSAP ScrollTrigger `scaleY` animation
- Team cards use `whileHover` scale + overlay fade
- Page hero text animates on mount (same stagger pattern as landing hero)

---

### 4.2 — Products Page (`/products`)

**Sections:**
1. **Page hero** — Title "Our Products", brief descriptor
2. **Product grid** — Same 3-column grid as landing but larger cards with more detail: longer description, feature bullet list, tech tags, and a full "Learn More →" CTA
3. **Comparison strip** (optional) — Brief table or card comparison of what differentiates each product

**Individual Product Page (`/products/[slug]`):**
1. **Product hero** — Full-width dark section with product name, tagline, and a large illustrative visual
2. **Overview** — What it is, who it's for, what problem it solves
3. **Features** — Icon + title + description grid (2×3 layout)
4. **How it works** — Step-by-step visual breakdown (numbered steps with connecting lines)
5. **CTA** — "Get in touch" or "Request Access" form/link
6. **Related Products** — Links to the other two products

**Data shape for product (create `src/lib/products.ts`):**
```ts
export interface Product {
  slug: string
  name: string
  tagline: string
  description: string
  longDescription: string
  features: { icon: string; title: string; description: string }[]
  tags: string[]
}
```

---

### 4.3 — How We Work Page (`/how-we-work`)

**Sections:**
1. **Page hero** — Title, descriptor, with a looping ambient background animation (CSS only — shifting radial gradients)
2. **Full process** — Expanded version of the landing sticky-scroll. Each step gets a dedicated panel with a larger image, sub-steps, and methodology notes
3. **Principles** — 4-column card grid: core working principles (Transparency, Iteration, Impact, Craft)
4. **Culture gallery** — A full-width masonry-style or bento grid of workplace images
5. **Tools & practices** — List of methodologies, tools, and frameworks the team uses. Light section
6. **CTA** — "Join the team" or "Work with us"

**Animation notes:**
- The culture gallery images stagger-reveal as the user scrolls
- Section 2 process keeps the GSAP sticky behaviour from the landing preview but expanded
- Principles cards use the same hover lift as product cards

---

### 4.4 — Library Page (`/library`)

**Layout:** Two-column listing. Left: Blog posts. Right: Research Papers.

**Features:**
- Filter bar above both columns: "All" / year filters for research, category tags for blogs
- Each blog card: cover image, title, author, date, estimated read time, tag chips, excerpt
- Each research card: title, authors, year, abstract excerpt, download badge, tag chips
- Load more / pagination at the bottom of each column independently
- Sticky column headers ("Blogs" / "Research Papers") that remain visible while scrolling

**Data fetch (Phase 5 adds Sanity — in Phase 4 use static mock data):**
```ts
// src/lib/mockData.ts
export const MOCK_BLOGS = [
  { slug: 'blog-one', title: 'Blog Post Title', author: 'Author Name', date: '2024-03-15', readTime: 5, excerpt: '...', tags: ['AI', 'Research'] },
]
export const MOCK_PAPERS = [
  { slug: 'paper-one', title: 'Research Paper Title', authors: ['Author A', 'Author B'], year: 2024, abstract: '...', tags: ['NLP', 'Vision'] },
]
```

---

### 4.5 — Blog Post Page (`/library/blog/[slug]`)

**Layout:**
- Left: Article content (65% width on desktop)
- Right: Sticky Table of Contents sidebar (35% width on desktop, hidden on mobile)
- Above article: author card, date, read time, tag chips
- Below article: "Related Posts" grid (3 cards)

**Table of Contents component:**
- Reads `h2` and `h3` elements from the rendered article
- Highlights the active heading as user scrolls (IntersectionObserver on each heading)
- Smooth scrolls to heading on click

**Content rendering:**
- With Sanity: use `@portabletext/react` for rich text
- Without Sanity: MDX via `next-mdx-remote`

---

### 4.6 — Research Paper Page (`/library/research/[slug]`)

**Layout:**
- Page hero: paper title, authors list, year, tag chips
- Action bar: "Download PDF" button + "Cite this paper" (copies citation string to clipboard)
- Abstract block: `bg-card-bg` dark card with the abstract text
- Content: sections of the paper rendered as rich text or PDF embed
- Sidebar: paper metadata (journal, DOI, submission date), related papers

```bash
git add .
git commit -m "feat: Phase 4 complete — all individual pages built"
```

**Phase 4 complete ✓**

---

### 4.7 — Contact Page (`/contact`)

**Layout:**
1. **Page hero** — Title "Get in Touch", brief descriptor
2. **Contact form** — Centered card with fields: Name, Email, Company (optional), Message
3. **Company info** — Below form: email address, location, social links

**Implementation notes:**
- Form submits via **Next.js Server Action** or a third-party service ([Resend](https://resend.com), [Formspree](https://formspree.io))
- Client-side validation with native HTML5 attributes + custom error styles
- Use `useFormStatus()` (React 19) for submit button loading state
- Success state: form slides out, confirmation message fades in (Framer Motion)
- Error state: shake animation on form + error message in `text-red-400`

```tsx
// src/app/contact/page.tsx
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the SOYL AI team.',
}

// Server Action for form submission
async function submitContact(formData: FormData) {
  'use server'
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string
  // Send via Resend, Formspree, or internal API
}
```

> [!TIP]
> Consider adding a **newsletter signup** in the Footer as well — a simple email input that uses the same server action.

---

### 4.8 — Section Transition Strategy

The landing page alternates between dark (`bg-obsidian`) and light (`bg-soyl-white`) sections. To avoid jarring hard cuts:

- Use a subtle **gradient bleed** at the boundary: a 64px-tall `div` with `bg-gradient-to-b from-obsidian to-soyl-white` (or vice versa)
- Alternatively, use a `clip-path: polygon()` diagonal cut for a more dynamic feel
- Keep transitions consistent — always dark-to-light uses the same pattern

```css
/* Optional: diagonal section divider */
.section-divider {
  height: 64px;
  background: var(--color-soyl-white);
  clip-path: polygon(0 0, 100% 100%, 100% 100%, 0 100%);
}
```

---

## 9. Phase 5 — Library & CMS

**Goal:** Replace all mock data in the Library with live data from Sanity CMS. Make the Library fully non-developer-publishable.

**Duration:** 3–4 days

---

### 5.1 — Sanity Studio Setup

```bash
# In a separate directory or as a monorepo package
npm create sanity@latest -- --project soyl-ai --dataset production --template clean
```

Or add to the same repo under `/studio`:
```bash
npm create sanity@latest -- --project soyl-ai --dataset production --output-path studio
```

---

### 5.2 — Schema Definitions

**Blog Post schema (`studio/schemas/blogPost.ts`):**
```ts
export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title',     type: 'string',   title: 'Title', validation: (R: any) => R.required() },
    { name: 'slug',      type: 'slug',     title: 'Slug', options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'author',    type: 'string',   title: 'Author' },
    { name: 'date',      type: 'date',     title: 'Publish Date' },
    { name: 'readTime',  type: 'number',   title: 'Read Time (minutes)' },
    { name: 'excerpt',   type: 'text',     title: 'Excerpt', rows: 3 },
    { name: 'coverImage', type: 'image',   title: 'Cover Image', options: { hotspot: true } },
    { name: 'tags',      type: 'array',    title: 'Tags', of: [{ type: 'string' }], options: { layout: 'tags' } },
    { name: 'body',      type: 'array',    title: 'Body', of: [{ type: 'block' }, { type: 'image' }] },
  ],
}
```

**Research Paper schema (`studio/schemas/researchPaper.ts`):**
```ts
export default {
  name: 'researchPaper',
  title: 'Research Paper',
  type: 'document',
  fields: [
    { name: 'title',    type: 'string', title: 'Title', validation: (R: any) => R.required() },
    { name: 'slug',     type: 'slug',   title: 'Slug', options: { source: 'title' } },
    { name: 'authors',  type: 'array',  title: 'Authors', of: [{ type: 'string' }] },
    { name: 'year',     type: 'number', title: 'Year' },
    { name: 'abstract', type: 'text',   title: 'Abstract', rows: 5 },
    { name: 'tags',     type: 'array',  title: 'Tags', of: [{ type: 'string' }], options: { layout: 'tags' } },
    { name: 'pdf',      type: 'file',   title: 'PDF File', options: { accept: '.pdf' } },
    { name: 'body',     type: 'array',  title: 'Content (optional)', of: [{ type: 'block' }] },
  ],
}
```

---

### 5.3 — Sanity Client

```ts
// src/lib/sanity.ts
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)
```

---

### 5.4 — GROQ Queries

```ts
// src/lib/queries.ts

export const BLOG_LISTING_QUERY = `
  *[_type == "blogPost"] | order(date desc) {
    title, slug, author, date, readTime, excerpt, tags,
    "coverImage": coverImage.asset->url
  }
`

export const BLOG_POST_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    title, author, date, readTime, tags, body,
    "coverImage": coverImage.asset->url
  }
`

export const RESEARCH_LISTING_QUERY = `
  *[_type == "researchPaper"] | order(year desc) {
    title, slug, authors, year, abstract, tags
  }
`

export const RESEARCH_PAPER_QUERY = `
  *[_type == "researchPaper" && slug.current == $slug][0] {
    title, authors, year, abstract, tags, body,
    "pdfUrl": pdf.asset->url
  }
`

export const LIBRARY_PREVIEW_QUERY = `
  {
    "latestBlog":    *[_type == "blogPost"]    | order(date desc)  [0] { title, slug, excerpt, date, "coverImage": coverImage.asset->url },
    "latestPaper":   *[_type == "researchPaper"] | order(year desc) [0] { title, slug, authors, year, abstract }
  }
`
```

---

### 5.5 — Data Fetching in Pages

Replace mock data with Sanity fetches. Since these are Server Components, fetch directly:

```tsx
// src/app/library/page.tsx
import { client } from '@/lib/sanity'
import { BLOG_LISTING_QUERY, RESEARCH_LISTING_QUERY } from '@/lib/queries'

export default async function LibraryPage() {
  const [blogs, papers] = await Promise.all([
    client.fetch(BLOG_LISTING_QUERY),
    client.fetch(RESEARCH_LISTING_QUERY),
  ])

  return (
    <main>
      {/* pass blogs and papers to client components */}
    </main>
  )
}
```

For the landing page Library preview:
```tsx
// In LibrarySection.tsx — make it async
const { latestBlog, latestPaper } = await client.fetch(LIBRARY_PREVIEW_QUERY)
```

---

### 5.6 — ISR (Incremental Static Regeneration)

Add revalidation so new Sanity content appears without rebuilds:

```tsx
// At the top of any page that fetches from Sanity
export const revalidate = 3600 // re-generate every 1 hour
```

Or use on-demand revalidation via a Sanity webhook hitting a Next.js revalidate API route.

---

### 5.7 — Portable Text Rendering

```tsx
// src/components/ui/PortableTextRenderer.tsx
import { PortableText } from '@portabletext/react'

const components = {
  block: {
    h2: ({ children }: any) => <h2 className="font-heading text-2xl font-bold text-soyl-white mt-10 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="font-heading text-xl font-bold text-soyl-white mt-8 mb-3">{children}</h3>,
    normal: ({ children }: any) => <p className="text-graphite leading-relaxed mb-4">{children}</p>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="text-soyl-white font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="text-mint">{children}</em>,
    link: ({ value, children }: any) => <a href={value.href} className="text-mint underline hover:no-underline">{children}</a>,
  },
}

export default function PortableTextRenderer({ content }: { content: any[] }) {
  return <PortableText value={content} components={components} />
}
```

```bash
git add .
git commit -m "feat: Phase 5 complete — Sanity CMS integrated, Library fully dynamic"
```

**Phase 5 complete ✓**

---

## 10. Phase 6 — Polish & Launch

**Goal:** Production-ready. Performant, accessible, SEO-optimised, cross-browser tested.

**Duration:** 3–4 days

---

### 6.1 — SEO

Add complete metadata to every page:

```tsx
// Pattern for each page
export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about SOYL AI...',
  openGraph: {
    title: 'About | SOYL AI',
    description: '...',
    images: [{ url: '/og/about.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | SOYL AI',
    description: '...',
    images: ['/og/about.png'],
  },
}
```

Generate static OG images at 1200×630px for each page — place in `/public/og/`. Use Vercel's `@vercel/og` or pre-generate in Figma.

**`src/app/sitemap.ts`** — Auto-generates `sitemap.xml`:
```ts
import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await client.fetch(`*[_type == "blogPost"]{ "slug": slug.current }`)
  const papers = await client.fetch(`*[_type == "researchPaper"]{ "slug": slug.current }`)

  const staticRoutes = ['', '/about', '/products', '/how-we-work', '/library', '/contact'].map(route => ({
    url: `https://soylai.com${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const blogRoutes = blogs.map((b: { slug: string }) => ({
    url: `https://soylai.com/library/blog/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const paperRoutes = papers.map((p: { slug: string }) => ({
    url: `https://soylai.com/library/research/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes, ...paperRoutes]
}
```

**`src/app/robots.ts`** — Auto-generates `robots.txt`:
```ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/studio/' },
    sitemap: 'https://soylai.com/sitemap.xml',
  }
}
```

---

### 6.2 — Performance

```tsx
// All images must use next/image
import Image from 'next/image'
<Image src="/images/hero.jpg" alt="..." width={800} height={600} priority /> // priority for above-fold
<Image src="/images/blog.jpg" alt="..." width={600} height={400} loading="lazy" />
```

- Use `priority` on the Hero image and any image visible above the fold
- Compress all images: JPEGs at 85%, PNGs with oxipng, SVGs with SVGO
- Use `next/font` if any Google Fonts are used as fallbacks
- Run `npm run build` and check the bundle analyser: `ANALYZE=true npm run build`
- Target: Lighthouse Performance ≥ 90 on desktop, ≥ 75 on mobile

---

### 6.3 — Accessibility

- Every image has a meaningful `alt` attribute
- All interactive elements reachable via keyboard (`Tab`, `Enter`, `Space`)
- Colour contrast: verify mint (#AFD0CC) on obsidian (#030709) — WCAG AA requires 4.5:1 for normal text
- ARIA labels on icon-only buttons (hamburger menu, social icons)
- Focus rings visible: `outline: 2px solid var(--color-mint); outline-offset: 2px` on `:focus-visible`
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>` used correctly
- Test with a screen reader (macOS VoiceOver or NVDA on Windows)

---

### 6.4 — Cross-Browser QA

Test on:
- Chrome 120+ (primary)
- Safari 17+ (macOS + iOS)
- Firefox 120+
- Edge 120+
- Chrome on Android

Key things to check in Safari:
- `backdrop-filter` (Navbar blur) — works but needs `-webkit-backdrop-filter` prefix
- Three.js canvas sizing
- CSS `clamp()` support — fine in modern Safari

---

### 6.5 — Final Pre-Launch Checklist

```
□ All placeholder text replaced with real company content
□ All placeholder images replaced with real brand images
□ Real product names, descriptions, and slugs populated
□ Contact information / email in Footer is correct
□ Sanity schemas deployed to production dataset
□ Environment variables set in Vercel dashboard
□ Custom domain configured in Vercel
□ Google Analytics or Plausible set up (if required)
□ robots.txt and sitemap.xml generated (Next.js sitemap support)
□ 404 page created (src/app/not-found.tsx)
□ Error boundary created (src/app/error.tsx)
□ Loading states created (src/app/loading.tsx)
□ Lighthouse audit: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100
□ Build succeeds with zero TypeScript errors: npm run build
□ No console errors in production build
```

---

### 6.6 — Production Deployment

```bash
# Ensure all env vars are in Vercel dashboard, then:
git add .
git commit -m "feat: Phase 6 complete — production ready, SEO, accessibility, performance"
git push origin main

# Vercel auto-deploys on push to main
# Verify at your custom domain
```

**Phase 6 complete ✓ — Site is live.**

---

## 11. Component Reference

### Layout Components
| Component | File | Purpose |
|-----------|------|---------|
| `Navbar` | `components/layout/Navbar.tsx` | Fixed nav, transparent → solid on scroll, mobile menu |
| `Footer` | `components/layout/Footer.tsx` | Full footer with nav groups, tagline, copyright |
| `MaxWidthWrapper` | `components/ui/MaxWidthWrapper.tsx` | 1200px max-width container with side padding |

### Motion Components
| Component | File | Purpose |
|-----------|------|---------|
| `FadeInUp` | `components/motion/FadeInUp.tsx` | Scroll-triggered fade + slide-up for any element |
| `StaggerContainer` | `components/motion/StaggerContainer.tsx` | Stagger-animates direct children |

> Page transitions are handled by `next-view-transitions` in Root Layout — no `PageTransition.tsx` component needed.

### UI Primitives
| Component | File | Purpose |
|-----------|------|---------|
| `Button` | `components/ui/Button.tsx` | Primary + ghost variants, supports `href` |
| `SectionLabel` | `components/ui/SectionLabel.tsx` | Mint eyebrow label with rule |
| `AnimatedCounter` | `components/ui/AnimatedCounter.tsx` | Counts up to a target value on viewport entry |
| `ImageMarquee` | `components/ui/ImageMarquee.tsx` | Infinite horizontal image loop |
| `PortableTextRenderer` | `components/ui/PortableTextRenderer.tsx` | Renders Sanity rich text |

### Section Components (Landing)
| Component | File | Purpose |
|-----------|------|---------|
| `HeroSection` | `components/sections/HeroSection.tsx` | Full-viewport hero with 3D visual |
| `HeroVisual` | `components/sections/HeroVisual.tsx` | Three.js canvas visual (dynamic import) |
| `AboutSection` | `components/sections/AboutSection.tsx` | Light section with stats grid |
| `ProductsSection` | `components/sections/ProductsSection.tsx` | Dark 3-column card grid |
| `HowWeWorkSection` | `components/sections/HowWeWorkSection.tsx` | GSAP sticky scroll section + marquee |
| `LibrarySection` | `components/sections/LibrarySection.tsx` | Two-column blog + research preview |

---

## 12. File Structure

```
soyl-ai-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    ← root layout (Navbar, Footer, metadata)
│   │   ├── template.tsx                  ← page transition wrapper
│   │   ├── page.tsx                      ← landing page
│   │   ├── not-found.tsx                 ← 404 page
│   │   ├── error.tsx                     ← error boundary
│   │   ├── loading.tsx                   ← loading state
│   │   ├── globals.css                   ← brand tokens, resets
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx               ← contact form + lead capture
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── how-we-work/page.tsx
│   │   ├── library/
│   │   │   ├── page.tsx
│   │   │   ├── blog/[slug]/page.tsx
│   │   │   └── research/[slug]/page.tsx
│   │   ├── sitemap.ts                     ← auto-generated sitemap.xml
│   │   └── robots.ts                      ← auto-generated robots.txt
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HeroVisual.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ProductsSection.tsx
│   │   │   ├── HowWeWorkSection.tsx
│   │   │   └── LibrarySection.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── SectionLabel.tsx
│   │   │   ├── MaxWidthWrapper.tsx
│   │   │   ├── AnimatedCounter.tsx
│   │   │   ├── ImageMarquee.tsx
│   │   │   └── PortableTextRenderer.tsx
│   │   └── motion/
│   │       ├── FadeInUp.tsx
│   │       └── StaggerContainer.tsx
│   └── lib/
│       ├── utils.ts                      ← cn() classname helper
│       ├── motion.ts                     ← Framer Motion variant presets
│       ├── sanity.ts                     ← Sanity client + urlFor
│       ├── queries.ts                    ← GROQ queries
│       ├── products.ts                   ← Product data + types
│       └── mockData.ts                   ← Temporary mock data (Phase 2–4)
├── public/
│   ├── fonts/                            ← Nevera.woff2, Groote.woff2
│   ├── images/                           ← Static images
│   ├── lottie/                           ← Lottie JSON files
│   └── og/                               ← Open Graph images
├── studio/                               ← Sanity Studio (if monorepo)
├── next.config.ts
├── tsconfig.json
└── .env.local                            ← Environment variables (never commit)
```

---

## 13. Environment Variables

Create `.env.local` in the project root. **Never commit this file.**

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_read_token          # only needed for draft previews

# Analytics
NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible   # or 'ga4'
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=soylai.com
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          # uncomment if using GA4
```

Add these same variables to the Vercel dashboard under **Project Settings → Environment Variables** before deploying.

---

## 14. Analytics & Event Tracking

### Provider Choice

| Option | Pros | Cons |
|--------|------|------|
| **Plausible** | Privacy-first, no cookie banner needed, lightweight (< 1KB) | Fewer features, paid |
| **GA4** | Free, rich reports, audience building | Requires cookie consent banner (EU), heavier |

**Recommended:** Plausible for v1 (simpler, no legal overhead). Migrate to GA4 later if deeper analytics are needed.

### Event Tracking Plan

| Event Name | Trigger | Data |
|------------|---------|------|
| `page_view` | Every route | Automatic |
| `cta_click` | "Get Started", "Explore", "View Research" buttons | `{ label, destination }` |
| `scroll_depth` | 25%, 50%, 75%, 100% of page | `{ depth, page }` |
| `contact_submit` | Contact form submission | `{ source_page }` |
| `pdf_download` | Research paper PDF download | `{ paper_slug }` |
| `product_view` | Individual product page visit | `{ product_slug }` |

### Implementation

Create a thin analytics wrapper:
```ts
// src/lib/analytics.ts
export function trackEvent(name: string, data?: Record<string, string>) {
  // Plausible
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(name, { props: data })
  }
}
```

Add the Plausible script in `layout.tsx`:
```tsx
<Script defer data-domain="soylai.com" src="https://plausible.io/js/script.js" />
```

---

## 15. Performance Budget

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint (FCP) | < 1.2s | Lighthouse |
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse |
| Total Blocking Time (TBT) | < 200ms | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| JS bundle (first load) | < 150KB gzipped | `next build` output |
| Lighthouse Performance | ≥ 90 desktop, ≥ 75 mobile | Lighthouse |
| Lighthouse Accessibility | ≥ 95 | Lighthouse |
| Lighthouse SEO | 100 | Lighthouse |

> [!WARNING]
> Three.js + React Three Fiber + Drei adds ~250KB gzipped. Monitor the JS bundle metric closely after Phase 3. If it exceeds budget, implement the CSS/SVG fallback noted in §3.9.

---

## 16. Definition of Done

A phase is complete when **all** of the following are true:

### Phase 0
- [ ] Font files acquired and placed in `/public/fonts/` (or fallbacks chosen)
- [ ] Logo SVG exported
- [ ] OG image template created

### Phase 1
- [ ] `npm run dev` boots without errors
- [ ] All 9 routes (including `/contact`) return a 200 status
- [ ] Navbar and Footer render on every page
- [ ] Brand colours visible in the UI
- [ ] Error, loading, and 404 states render correctly
- [ ] `tailwind.config.ts` is deleted (Tailwind v4 CSS-first)

### Phase 2
- [ ] All 5 landing sections visible with correct layout
- [ ] Correct fonts, colours, and spacing throughout
- [ ] Mobile layout works at 375px with no overflow
- [ ] No console errors or TypeScript errors

### Phase 3
- [ ] Hero text animates on page load
- [ ] Every section below the fold has a scroll reveal
- [ ] Product cards animate on hover
- [ ] How We Work sticky scroll functions correctly
- [ ] Library columns animate in on scroll
- [ ] Hero 3D visual renders and rotates (with loading skeleton)
- [ ] Page transitions work via `next-view-transitions`
- [ ] `prefers-reduced-motion` disables all transforms
- [ ] JS bundle stays under 150KB gzipped (or fallback 3D implemented)

### Phase 4
- [ ] All 8 individual pages (including `/contact`) have real layout and placeholder content
- [ ] Navigation between pages works with view transitions
- [ ] Dynamic `[slug]` routes resolve correctly (async params)
- [ ] Blog and Research pages render mock content correctly
- [ ] Contact form submits and shows success/error states
- [ ] Dark/light section transitions are smooth

### Phase 5
- [ ] Sanity Studio is accessible and schemas are configured
- [ ] Library page fetches real data from Sanity
- [ ] Blog post and Research paper pages render CMS content
- [ ] Landing Library preview shows latest post from Sanity
- [ ] New content published in Sanity appears on site within 1 hour (ISR)

### Phase 6
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO 100
- [ ] `npm run build` completes with 0 TypeScript errors and 0 ESLint errors
- [ ] Site loads correctly on Chrome, Safari, Firefox, and Edge
- [ ] All images have `alt` attributes and use `next/image`
- [ ] Analytics events fire correctly
- [ ] `sitemap.xml` and `robots.txt` are generated
- [ ] Custom domain resolves in production
- [ ] OG images display correctly when shared on social media

---

*SOYL AI Private Limited — Story Of Your Life*  
*Document Version 1.1 — March 2026*
