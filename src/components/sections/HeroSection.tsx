'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'next-view-transitions'
import dynamic from 'next/dynamic'

// Strictly client-side render the WebGL canvas to prevent React-Three-Fiber hydration mismatches
const HeroVisual = dynamic(() => import('./HeroVisual'), { 
  ssr: false, 
  loading: () => (
    <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-mint/5 animate-pulse blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
  )
})

export default function HeroSection() {
  const prefersReduced = useReducedMotion()
  
  const initialY = prefersReduced ? 0 : 24
  const animateState = { opacity: 1, y: 0 }
  const initialState = { opacity: prefersReduced ? 1 : 0, y: initialY }

  return (
    <section className="min-h-screen bg-obsidian flex items-center pt-16 hero-grid-overlay relative">
      <div className="max-w-content mx-auto px-6 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">
          {/* Left — Text */}
          <div className="lg:col-span-3 flex flex-col justify-center py-8 lg:py-16">
            <motion.p initial={initialState} animate={animateState} transition={{ delay: prefersReduced ? 0 : 0.1, duration: 0.5 }} className="text-mint text-xs tracking-[0.22em] uppercase mb-4 flex items-center gap-3">
              AI-Powered Innovation
              <span className="w-10 h-px bg-mint opacity-40 inline-block" />
            </motion.p>
            <motion.h1 initial={initialState} animate={animateState} transition={{ delay: prefersReduced ? 0 : 0.25, duration: 0.6 }} className="font-display font-bold text-soyl-white leading-[1.05] mb-2" style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}>
              SOYL AI
            </motion.h1>
            <motion.h1 initial={initialState} animate={animateState} transition={{ delay: prefersReduced ? 0 : 0.4, duration: 0.6 }} className="font-display font-bold text-soyl-white leading-[1.05] mb-3" style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}>
              Private Limited
            </motion.h1>
            <motion.p initial={initialState} animate={animateState} transition={{ delay: prefersReduced ? 0 : 0.55, duration: 0.5 }} className="font-display text-mint text-lg md:text-xl mb-6">Story Of Your Life</motion.p>
            <motion.p initial={initialState} animate={animateState} transition={{ delay: prefersReduced ? 0 : 0.7, duration: 0.5 }} className="text-graphite max-w-[480px] mb-8">
              We build AI solutions that capture, understand, and preserve human experiences — turning the story of every life into lasting, meaningful intelligence.
            </motion.p>
            <motion.div initial={initialState} animate={animateState} transition={{ delay: prefersReduced ? 0 : 0.85, duration: 0.5 }} className="flex flex-wrap gap-4">
              <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm tracking-wide border border-mint text-mint hover:bg-mint hover:text-obsidian transition-all duration-200">
                Get Started →
              </Link>
              <Link href="/library" className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm tracking-wide border border-graphite text-soyl-white hover:border-mint hover:text-mint transition-all duration-200">
                View Research →
              </Link>
            </motion.div>
          </div>

          {/* Right — WebGL Visual */}
          <motion.div 
            initial={initialState} 
            animate={animateState} 
            transition={{ delay: prefersReduced ? 0 : 0.4, duration: 1 }}
            className="lg:col-span-2 relative w-full h-[60vh] lg:h-auto min-h-[400px]"
          >
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <HeroVisual />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-12">
          <span className="text-graphite/40 text-2xl animate-bounce-y">↓</span>
        </div>
      </div>
    </section>
  )
}
