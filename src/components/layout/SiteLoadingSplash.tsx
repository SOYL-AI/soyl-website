'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

// Logo-spin landing splash, once per session on first visit to the homepage.
//
// Sequence:
//   0.00s   wrapper fades in + scales up (0.6s)
//   0.30s   logo starts spinning — 3 turns over 3.6s with cubic-bezier easeOut,
//           so it begins fast and decelerates to a clean stop at the original
//           orientation (flywheel feel)
//   3.90s   logo lands at rest, settle pause begins
//   4.60s   AnimatePresence exit kicks in — overlay fades out (0.7s)
//   5.30s   unmounts
//
// Entry is CSS-driven (animation/animation-delay on the element) so the spin
// starts the instant the stylesheet parses, no waiting on Framer to hydrate.
// Exit is JS-driven via Framer's AnimatePresence.
const SPLASH_KEY = 'soyl_splash_seen'
const SPLASH_VISIBLE_MS = 4600

export default function SiteLoadingSplash() {
  const prefersReduced = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const skipPath =
      typeof window !== 'undefined' &&
      (prefersReduced || sessionStorage.getItem(SPLASH_KEY) === '1')

    if (skipPath) {
      // setTimeout 0 keeps the setState async for the
      // react-hooks/set-state-in-effect lint rule.
      const t = setTimeout(() => setVisible(false), 0)
      return () => clearTimeout(t)
    }

    sessionStorage.setItem(SPLASH_KEY, '1')
    const t = setTimeout(() => setVisible(false), SPLASH_VISIBLE_MS)
    return () => clearTimeout(t)
  }, [prefersReduced])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="site-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="fixed inset-0 z-[80] bg-obsidian flex items-center justify-center"
          style={{ backgroundColor: '#030709' }}
          aria-hidden="true"
        >
          {/* Outer wrapper fades + scales in once */}
          <div
            className="relative flex items-center justify-center"
            style={{
              opacity: 0,
              animation: 'splashEnter 0.6s cubic-bezier(0.22,1,0.36,1) 0s forwards',
            }}
          >
            {/* Mint glow halo behind the logo */}
            <div className="absolute inset-0 -m-10 rounded-full bg-mint/20 blur-2xl pointer-events-none" />

            {/* Logo — continuous rotation */}
            <Image
              src="/images/logo.png"
              alt=""
              width={96}
              height={96}
              priority
              className="relative w-24 h-24 object-contain drop-shadow-[0_0_24px_rgba(175,208,204,0.35)]"
              style={{
                animation: 'splashSpin 3.6s cubic-bezier(0.22,1,0.36,1) 0.3s forwards',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
