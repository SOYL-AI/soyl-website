'use client'
import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

export default function SpeakHeroSection() {
  const prefersReduced = useReducedMotion()

  const initialY = prefersReduced ? 0 : 24
  const animateState = { opacity: 1, y: 0 }
  const initialState = { opacity: prefersReduced ? 1 : 0, y: initialY }

  return (
    <section className="bg-obsidian pt-32 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen">
        <motion.div
          animate={{ x: prefersReduced ? 0 : [0, 40, -20, 0], y: prefersReduced ? 0 : [0, -30, 15, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-mint/10 blur-[120px] opacity-60"
        />
        <motion.div
          animate={{ x: prefersReduced ? 0 : [0, -50, 30, 0], y: prefersReduced ? 0 : [0, 40, -20, 0] }}
          transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
          className="absolute top-[5%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-500/8 blur-[130px] opacity-50"
        />
      </div>

      <div className="max-w-content mx-auto px-6 lg:px-16 w-full relative z-10 flex flex-col items-center text-center">
        <div className="flex flex-col items-center max-w-3xl">
          <motion.div
            initial={initialState}
            animate={animateState}
            transition={{ delay: prefersReduced ? 0 : 0.1, duration: 0.5 }}
          >
            <SectionLabel className="justify-center mb-6">Butler AI · Live Demo</SectionLabel>
          </motion.div>

          <motion.h1
            initial={initialState}
            animate={animateState}
            transition={{ delay: prefersReduced ? 0 : 0.25, duration: 0.6 }}
            className="font-display font-bold leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            <motion.span
              animate={{ backgroundPosition: prefersReduced ? '0% center' : ['0% center', '200% center'] }}
              transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-soyl-white via-mint to-soyl-white bg-[length:200%_auto]"
            >
              Speak with Butler
            </motion.span>
          </motion.h1>

          <motion.p
            initial={initialState}
            animate={animateState}
            transition={{ delay: prefersReduced ? 0 : 0.4, duration: 0.5 }}
            className="text-graphite text-lg md:text-xl md:leading-relaxed"
          >
            Butler AI is our voice-first PMS for hotels. Try it here, ask anything a hotel guest might ask — bookings, room service, late checkout, local recommendations.
          </motion.p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-mint/5 z-10" />
    </section>
  )
}
