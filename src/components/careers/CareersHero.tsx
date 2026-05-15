'use client'

import dynamic from 'next/dynamic'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'next-view-transitions'
import SectionLabel from '@/components/ui/SectionLabel'
import { CAREERS_HERO } from '@/lib/careers-content'

// Strictly client-render the WebGL canvas — R3F SSR causes hydration
// mismatches and the canvas needs the real DOM to size correctly.
const CareersHeroVisual = dynamic(() => import('./CareersHeroVisual'), { ssr: false })

export default function CareersHero() {
  const prefersReduced = useReducedMotion()

  const initial = { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 }
  const animate = { opacity: 1, y: 0 }

  return (
    <section className="relative bg-obsidian overflow-hidden min-h-[100svh] flex flex-col">
      {/* Atmosphere layer — soft mint sunrise glow behind the dome. Sits
          below the canvas; because the canvas runs alpha:true it bleeds
          through where the dots aren't. */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 56% 42% at 50% 32%, rgba(175,208,204,0.22), rgba(175,208,204,0.05) 38%, transparent 70%)',
        }}
      />

      {/* WebGL canvas */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {prefersReduced ? (
          // Reduced-motion: keep a static rising-sun feeling via CSS only.
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 38% 32% at 50% 32%, rgba(175,208,204,0.38), rgba(175,208,204,0.10) 45%, transparent 75%)',
            }}
          />
        ) : (
          <CareersHeroVisual />
        )}
      </div>

      {/* Horizon line — a hairline that anchors the eye where the dome
          meets the terrain. Sits just above the text band. */}
      <div
        aria-hidden
        className="absolute left-0 right-0 z-[2] top-[58%] h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(175,208,204,0.18) 25%, rgba(175,208,204,0.35) 50%, rgba(175,208,204,0.18) 75%, transparent 100%)',
        }}
      />

      {/* Bottom fade so the subhead reads cleanly over any wave crests. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[3] h-2/5 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgb(3,7,9) 0%, rgba(3,7,9,0.78) 45%, transparent 100%)',
        }}
      />

      {/* Content — pinned to the bottom of the hero. The visual breathes
          in the upper half; the text owns the lower half. */}
      <div className="relative z-10 flex-1 flex flex-col justify-center pb-24 md:pb-28 pt-28">
        <div className="max-w-content mx-auto px-6 lg:px-16 w-full text-center flex flex-col items-center">
          <motion.div
            initial={initial}
            animate={animate}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <SectionLabel className="justify-center mb-6">
              {CAREERS_HERO.eyebrow}
            </SectionLabel>
          </motion.div>

          <motion.h1
            initial={initial}
            animate={animate}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display font-bold text-soyl-white leading-[1.02] mb-7 whitespace-pre-line tracking-tight"
            style={{ fontSize: 'clamp(40px, 6.2vw, 92px)' }}
          >
            {CAREERS_HERO.headline}
          </motion.h1>

          <motion.p
            initial={initial}
            animate={animate}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="text-graphite text-base md:text-lg max-w-2xl mx-auto mb-9 leading-relaxed"
          >
            {CAREERS_HERO.subhead}
          </motion.p>

          <motion.div
            initial={initial}
            animate={animate}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              href={CAREERS_HERO.ctaHref}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-mint text-obsidian text-xs md:text-sm font-medium tracking-[0.2em] uppercase hover:bg-soyl-white transition-colors duration-200"
            >
              {CAREERS_HERO.ctaLabel}
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-graphite/40 text-xl animate-bounce-y"
      >
        ↓
      </div>
    </section>
  )
}
