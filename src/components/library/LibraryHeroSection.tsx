'use client'
import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

export default function LibraryHeroSection() {
  const prefersReduced = useReducedMotion()
  const initialY = prefersReduced ? 0 : 20
  const animateState = { opacity: 1, y: 0 }
  const initialState = { opacity: prefersReduced ? 1 : 0, y: initialY }

  return (
    <section className="bg-obsidian pt-32 pb-20 relative border-b border-mint/5 overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-mint/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-content mx-auto px-6 lg:px-16 w-full relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
        
        <div className="flex flex-col items-start text-left max-w-2xl">
          <motion.div initial={initialState} animate={animateState} transition={{ duration: 0.5 }}>
            <SectionLabel>Knowledge Base</SectionLabel>
          </motion.div>
          
          <motion.h1 
            initial={initialState} 
            animate={animateState} 
            transition={{ delay: prefersReduced ? 0 : 0.1, duration: 0.6 }} 
            className="font-heading font-bold text-4xl md:text-6xl text-soyl-white tracking-tight mt-4"
          >
            The Library
          </motion.h1>
          
          <motion.p 
            initial={initialState} 
            animate={animateState} 
            transition={{ delay: prefersReduced ? 0 : 0.2, duration: 0.5 }} 
            className="text-graphite text-lg md:text-xl leading-relaxed mt-6"
          >
            A curated archive of our engineering blogs, philosophical treatises, and peer-reviewed research papers mapping the frontier of legacy intelligence.
          </motion.p>
        </div>

      </div>
    </section>
  )
}
