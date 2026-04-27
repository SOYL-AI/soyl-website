# SOYL AI — Corporate Website

> **Story Of Your Life** — AI solutions that capture and preserve human experiences.

Welcome to the official repository for the SOYL AI corporate website. This project is a modern, high-performance web application designed to establish brand authority, showcase our AI products, publish research, and serve as a lead-generation platform.

## 🚀 Tech Stack

This project is built on the bleeding edge of the React ecosystem to ensure maximum performance, developer experience, and visual fidelity.

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components)
- **UI Library:** [React 19](https://react.dev/) (with React Compiler enabled)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first configuration via `@theme`)
- **Animations:** 
  - [Framer Motion](https://www.framer.com/motion/) (Scroll reveals, hover states, micro-interactions)
  - [GSAP](https://gsap.com/) & ScrollTrigger (Complex scroll-pinned sections)
  - [next-view-transitions](https://github.com/shuding/next-view-transitions) (Native cross-fade page transitions)
- **3D & Visuals:** [Three.js](https://threejs.org/) via React Three Fiber & Drei
- **CMS:** [Sanity.io](https://www.sanity.io/) (Headless CMS for the Library and Blog)
- **Deployment:** Vercel

## 🎨 Design Philosophy

Our design aesthetic is **Corporate Minimalism × Modern Motion**.
- **Dark-First:** The default canvas is Obsidian (`#030709`).
- **Mint Accented:** We use a single accent color, Mint (`#AFD0CC`), for CTAs, taglines, and highlights.
- **Motion as Decoration:** We avoid decorative clutter. Every section relies on kinetic personality and animation (3D orbital geometry, scroll-reveals, sticky-scroll) to feel alive.

## 📁 Project Structure

```text
src/
├── app/                  # Next.js 16 App Router (pages, layouts, error boundaries)
├── components/
│   ├── about/            # About page specific components
│   ├── contact/          # Contact page specific components
│   ├── how-we-work/      # How We Work specific components
│   ├── layout/           # Global shell (Navbar, Footer)
│   ├── library/          # Blog and Research UI components
│   ├── motion/           # Reusable Framer Motion wrappers (FadeInUp, etc.)
│   ├── products/         # Product listing and detail components
│   ├── sections/         # Top-level page blocks for the Landing Page
│   └── ui/               # Standardized micro-components (Button, MaxWidthWrapper)
└── lib/                  # Utilities (cn), motion variants, Sanity client, mock data
docs/
└── PLAN.md               # Detailed implementation phases and design system reference
```

## 🛠️ Getting Started

### Prerequisites
- **Node.js:** v20 or higher
- **npm:** Included with Node.js (used as the default package manager).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SOYL-AI/soyl-website.git
   cd soyl-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the root directory. You will need keys for Sanity CMS to populate the Library section.
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧑‍💻 Notes for Future Developers

To maintain the integrity and performance of the codebase, please keep the following in mind:

1. **React Compiler Enabled:** This project uses `babel-plugin-react-compiler`. You rarely need to manually use `useMemo` or `useCallback`. Write clean, declarative React and let the compiler handle memoization.
2. **Tailwind CSS v4:** There is no `tailwind.config.ts`. All brand tokens, colors, and keyframes are defined natively in CSS via the `@theme` block inside `src/app/globals.css`.
3. **Page Transitions:** We use the native View Transitions API via `next-view-transitions`. Do **not** use Framer Motion's `<AnimatePresence>` for route changes. Use the `<Link>` component from `next-view-transitions` instead of `next/link` for internal routing.
4. **Animation Etiquette:** Use the pre-built wrapper components in `src/components/motion/` (like `<FadeInUp />` and `<StaggerContainer />`) to maintain consistent animation timings and respect `prefers-reduced-motion` settings automatically.
5. **3D Visuals:** The Hero section uses Three.js. Ensure `HeroVisual.tsx` is always dynamically imported with SSR disabled to prevent hydration mismatches and bundle bloat on the server.

## 📜 Scripts

- `npm run dev` — Starts the Next.js development server.
- `npm run build` — Builds the application for production.
- `npm run start` — Starts the Next.js production server.
- `npm run lint` — Runs ESLint to catch code issues.

## Live demo (Butler AI)

The `/products/butler-ai` page embeds a live voice + text demo of Butler AI. It proxies
to the agent backend at `AGENT_API_URL` and rate-limits via Upstash Redis.

**Backend hosting:** the FastAPI agent (Asterisk + LangGraph + RAG) is hosted on Railway.
Set `AGENT_API_URL` to the Railway public URL.

**Rate limits:**
- Text: 15 requests / hour / IP
- Audio: 5 requests / hour / IP
- Session: 20 messages total (24h cookie window)

When a visitor hits any limit, the demo gracefully degrades to a "get in touch" CTA
instead of failing. In dev, if `UPSTASH_REDIS_REST_URL` is unset, the limiters fall
back to a no-op so the local server works without Upstash credentials.

See `.env.example` for required environment variables.

## 📚 Documentation

For a deep dive into the specific phases of development, design tokens, typography scale, and CMS schema structures, please refer to the comprehensive [Implementation Plan](docs/PLAN.md).

---
*Built with purpose by the SOYL AI Team.*