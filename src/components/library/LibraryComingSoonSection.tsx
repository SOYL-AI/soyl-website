'use client'
import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

const CATEGORIES = ['Engineering Blogs', 'Research Papers', 'Philosophical Treatises']

export default function LibraryComingSoonSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="flex-1 flex flex-col items-center justify-center relative overflow-hidden hero-grid-overlay">

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-mint/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <motion.div
        initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl"
      >
        <SectionLabel>Transmission Incoming</SectionLabel>

        <h1 className="font-heading font-bold text-5xl md:text-7xl text-soyl-white tracking-tight mt-4 leading-none">
          The Library
        </h1>

        <p className="text-graphite text-base md:text-lg leading-relaxed mt-8 max-w-md">
          Engineering blogs, peer-reviewed research, and philosophical treatises — currently in preparation.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className="border border-mint/15 text-graphite/70 text-[10px] tracking-[0.18em] uppercase px-5 py-2 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="mt-14">
          <Button variant="ghost" href="/">← Return to Base</Button>
        </div>
      </motion.div>

    </section>
  )
}
