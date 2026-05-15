'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { CAREER_VALUES } from '@/lib/careers-content'

// Cell-grid dims for the storytelling backdrop. 12 × 7 gives enough room to
// frame three cards while keeping the cells big enough to read on desktop.
const COLS = 12
const ROWS = 7

// For each card index, the (col, row) cells that light up on hover. Hand-
// tuned to feel like a halo bursting outwards from the card's icon row,
// echoing the Vapi reference without being symmetric.
const CARD_HALOS: ReadonlyArray<ReadonlyArray<readonly [number, number]>> = [
  // Card 0 — left
  [[0,2],[1,1],[2,1],[3,2],[0,3],[1,3],[2,3],[3,3],[1,4],[2,4],[0,4],[2,5]],
  // Card 1 — center
  [[4,1],[5,1],[6,1],[7,1],[4,2],[5,2],[6,2],[7,2],[5,3],[6,3],[7,3],[5,4],[6,4],[7,4],[6,5],[5,6]],
  // Card 2 — right
  [[8,2],[9,1],[10,1],[11,2],[8,3],[9,3],[10,3],[11,3],[9,4],[10,4],[11,4],[9,5]],
]

function isLit(col: number, row: number, hovered: number | null) {
  if (hovered === null) return false
  return CARD_HALOS[hovered].some(([c, r]) => c === col && r === row)
}

export default function ValuesSection() {
  const prefersReduced = useReducedMotion()
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="relative bg-obsidian py-24 md:py-32 overflow-hidden border-y border-mint/5">
      <div className="relative max-w-content mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center flex flex-col items-center mb-16 md:mb-20">
          <SectionLabel className="justify-center mb-4">What it takes</SectionLabel>
          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="font-heading font-bold text-soyl-white text-3xl md:text-5xl leading-tight max-w-3xl"
          >
            Visionary teams build legendary products.
          </motion.h2>
        </div>

        {/* Cell-grid + cards. Cell grid is only visible on md+; mobile gets a
            plain vertical card stack since the halo story needs width. */}
        <div className="relative">
          {/* Decorative cell grid (md+) */}
          <div
            className="hidden md:grid absolute inset-0 pointer-events-none"
            style={{
              gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
            }}
            aria-hidden
          >
            {Array.from({ length: COLS * ROWS }).map((_, idx) => {
              const col = idx % COLS
              const row = Math.floor(idx / COLS)
              const lit = isLit(col, row, hovered)
              return (
                <motion.div
                  key={idx}
                  className="border border-mint/[0.06]"
                  animate={{
                    backgroundColor: lit ? 'rgba(175, 208, 204, 0.12)' : 'rgba(175, 208, 204, 0)',
                  }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              )
            })}
          </div>

          {/* Cards. Spans full width on mobile, 3-col on md+. The card spacing
              is computed so each card sits over the right cluster of cells. */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 py-4 md:py-12">
            {CAREER_VALUES.map((v, i) => {
              const isActive = hovered === i
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  tabIndex={0}
                  className="group relative flex flex-col items-start px-4 md:px-6 py-6 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-mint/60"
                >
                  {/* Icon pill */}
                  <div
                    className={[
                      'inline-flex items-center justify-center h-12 w-16 rounded-full border mb-6 transition-colors duration-300',
                      isActive
                        ? 'bg-mint border-mint text-obsidian'
                        : 'bg-soyl-white/95 border-soyl-white/95 text-obsidian',
                    ].join(' ')}
                  >
                    <Icon size={20} strokeWidth={1.6} />
                  </div>

                  <h3
                    className={[
                      'font-heading text-2xl md:text-[28px] font-bold leading-tight mb-3 transition-colors duration-300',
                      isActive ? 'text-soyl-white' : 'text-soyl-white/90',
                    ].join(' ')}
                  >
                    {v.title}
                  </h3>

                  <p className="text-graphite text-sm md:text-[15px] leading-relaxed max-w-xs">
                    {v.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
