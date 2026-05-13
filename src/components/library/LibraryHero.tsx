'use client'

import { motion, useReducedMotion } from 'framer-motion'
import MintDataRain from './MintDataRain'
import NewsletterCTA from './NewsletterCTA'

interface Props {
  /** Eyebrow shown above the title. Defaults to "Library". */
  eyebrow?: string
  /** Display title. */
  title?: string
  /** When false, the newsletter pill is hidden (e.g., on category pages). */
  showNewsletter?: boolean
}

/**
 * Library hero modeled on the Vapi reference but in SOYL's palette. Left
 * column carries the eyebrow + title + optional newsletter pill. Right
 * column is the mint data-rain canvas behind a faint dot grid for depth.
 */
export default function LibraryHero({
  eyebrow = 'Library',
  title = 'Articles',
  showNewsletter = true,
}: Props) {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-b border-mint/5">
      {/* Backdrop layers */}
      <div className="absolute inset-0 hero-grid-overlay opacity-60 pointer-events-none" aria-hidden />
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 pointer-events-none">
        <MintDataRain />
        {/* Edge fades so the rain dissolves into the obsidian field */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/40 to-transparent md:from-obsidian md:via-obsidian/30 md:to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-obsidian to-transparent"
          aria-hidden
        />
      </div>

      {/* Content */}
      <div className="relative max-w-content mx-auto px-6 lg:px-16 py-24 md:py-32">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <p className="text-mint text-xs tracking-[0.28em] uppercase font-mono mb-4">{eyebrow}</p>
        </motion.div>
        <motion.h1
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display font-bold text-soyl-white text-6xl md:text-8xl leading-[0.95] tracking-tight"
        >
          {title}
        </motion.h1>
        {showNewsletter && (
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10"
          >
            <NewsletterCTA variant="pill" />
          </motion.div>
        )}
      </div>
    </section>
  )
}
