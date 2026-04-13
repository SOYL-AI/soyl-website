'use client'
import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

export default function ProductsHeroSection() {
  const prefersReduced = useReducedMotion()
  const initialY = prefersReduced ? 0 : 24
  const animateState = { opacity: 1, y: 0 }
  const initialState = { opacity: prefersReduced ? 1 : 0, y: initialY }

  return (
    <section className="bg-obsidian pt-40 pb-20 relative">
      <div className="max-w-content mx-auto px-6 lg:px-16 w-full text-center flex flex-col items-center">
        <motion.div initial={initialState} animate={animateState} transition={{ duration: 0.5 }}>
          <SectionLabel className="justify-center mb-6">Our Solutions</SectionLabel>
        </motion.div>
        
        <motion.h1 
          initial={initialState} 
          animate={animateState} 
          transition={{ delay: prefersReduced ? 0 : 0.15, duration: 0.6 }} 
          className="font-display font-bold text-soyl-white leading-[1.05] mb-6" 
          style={{ fontSize: 'clamp(44px, 7vw, 84px)' }}
        >
          Tools for the <br className="hidden md:block" /> Human Narrative
        </motion.h1>
        
        <motion.p 
          initial={initialState} 
          animate={animateState} 
          transition={{ delay: prefersReduced ? 0 : 0.3, duration: 0.5 }} 
          className="text-graphite text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
        >
          Explore our suite of intelligent products designed to capture, structure, and preserve everything that makes you, you.
        </motion.p>
      </div>
      
      {/* Subtle bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-mint/5" />
    </section>
  )
}
