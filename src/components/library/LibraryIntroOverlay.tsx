'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Lock, LockOpen } from 'lucide-react'

// Lock-unlocks + doors-open intro that plays once when /library mounts.
// On prefers-reduced-motion the overlay never renders.
//
// Sequence:
//   0.0s — overlay covers screen; lock icon appears
//   0.55s — lock animates to open (shackle rotates, mint pulse flares)
//   1.15s — two "door" panels split apart vertically, revealing content
//   1.75s — overlay fades out and unmounts
type Stage = 'locked' | 'unlocking' | 'opening' | 'done'

const EASING = [0.83, 0, 0.17, 1] as const

export default function LibraryIntroOverlay() {
  const prefersReduced = useReducedMotion()
  const [stage, setStage] = useState<Stage>('locked')

  useEffect(() => {
    if (prefersReduced) return
    const timers = [
      setTimeout(() => setStage('unlocking'), 550),
      setTimeout(() => setStage('opening'),   1150),
      setTimeout(() => setStage('done'),      1750),
    ]
    return () => timers.forEach(clearTimeout)
  }, [prefersReduced])

  // Reduced-motion users: don't render the intro at all — page content is
  // visible immediately. This also avoids a setState-in-effect lint violation.
  if (prefersReduced) return null

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          key="library-intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-0 z-[70] pointer-events-none"
          aria-hidden="true"
        >
          {/* Top door panel */}
          <motion.div
            initial={{ y: 0 }}
            animate={stage === 'opening' ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.9, ease: EASING }}
            className="absolute inset-x-0 top-0 h-1/2 bg-obsidian"
          >
            {/* Bottom edge accent of the top panel (the "seam") */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mint/40 to-transparent" />
          </motion.div>

          {/* Bottom door panel */}
          <motion.div
            initial={{ y: 0 }}
            animate={stage === 'opening' ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.9, ease: EASING }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-obsidian"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mint/40 to-transparent" />
          </motion.div>

          {/* Lock badge — centered, fades as the doors open */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={
                stage === 'opening'
                  ? { scale: 1.15, opacity: 0 }
                  : stage === 'unlocking'
                    ? { scale: 1.05, opacity: 1 }
                    : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-24 h-24 rounded-3xl bg-mint/5 border border-mint/30 flex items-center justify-center backdrop-blur-sm shadow-[0_0_40px_rgba(175,208,204,0.15)]"
            >
              <AnimatePresence mode="wait">
                {stage === 'locked' ? (
                  <motion.div
                    key="locked"
                    initial={{ opacity: 0, rotate: -10 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Lock className="text-mint w-10 h-10" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="unlocked"
                    initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <LockOpen className="text-mint w-10 h-10" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mint ripple at the moment of unlock */}
              {stage !== 'locked' && (
                <motion.div
                  initial={{ scale: 1, opacity: 0.55 }}
                  animate={{ scale: 2.6, opacity: 0 }}
                  transition={{ duration: 0.85, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-3xl border border-mint/60"
                />
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
