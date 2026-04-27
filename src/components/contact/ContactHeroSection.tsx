'use client'
import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

export default function ContactHeroSection() {
  const prefersReduced = useReducedMotion()
  const initialY = prefersReduced ? 0 : 20
  const animateState = { opacity: 1, y: 0 }
  const initialState = { opacity: prefersReduced ? 1 : 0, y: initialY }

  return (
    <section className="bg-atmosphere-deep pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      
      <div className="absolute top-0 right-1/4 w-[60vw] h-[60vw] bg-mint/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-content mx-auto px-6 lg:px-16 w-full relative z-10 flex flex-col items-center text-center">
        
        <motion.div initial={initialState} animate={animateState} transition={{ duration: 0.5 }}>
          <SectionLabel className="justify-center">Contact</SectionLabel>
        </motion.div>
        
        <motion.h1 
          initial={initialState} 
          animate={animateState} 
          transition={{ delay: prefersReduced ? 0 : 0.1, duration: 0.6 }} 
          className="font-heading font-bold text-4xl md:text-6xl lg:text-[80px] text-soyl-white tracking-tight mt-6 mb-6 leading-none"
        >
          Get in touch
        </motion.h1>
        
        <motion.p 
          initial={initialState} 
          animate={animateState} 
          transition={{ delay: prefersReduced ? 0 : 0.2, duration: 0.5 }} 
          className="text-graphite text-lg md:text-xl leading-relaxed max-w-2xl"
        >
          Pilots, partnerships, hires, or just hi — drop us a line and we&apos;ll get back. We read every message, and we reply to almost all of them.
        </motion.p>

      </div>
    </section>
  )
}
