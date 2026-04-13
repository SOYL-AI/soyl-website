'use client'
import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

export default function AboutHeroSection() {
  const prefersReduced = useReducedMotion()
  
  const initialY = prefersReduced ? 0 : 24
  const animateState = { opacity: 1, y: 0 }
  const initialState = { opacity: prefersReduced ? 1 : 0, y: initialY }

  return (
    <section className="bg-obsidian pt-32 pb-16 relative">
      <div className="max-w-content mx-auto px-6 lg:px-16 w-full">
        <div className="flex flex-col max-w-3xl">
          <motion.div 
            initial={initialState} 
            animate={animateState} 
            transition={{ delay: prefersReduced ? 0 : 0.1, duration: 0.5 }}
          >
            <SectionLabel>About Us</SectionLabel>
          </motion.div>
          
          <motion.h1 
            initial={initialState} 
            animate={animateState} 
            transition={{ delay: prefersReduced ? 0 : 0.25, duration: 0.6 }} 
            className="font-display font-bold text-soyl-white leading-[1.05] mb-6" 
            style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
          >
            Preserving Human<br />Experience through AI
          </motion.h1>
          
          <motion.p 
            initial={initialState} 
            animate={animateState} 
            transition={{ delay: prefersReduced ? 0 : 0.4, duration: 0.5 }} 
            className="text-graphite text-lg md:text-xl leading-relaxed"
          >
            SOYL AI is dedicated to capturing, understanding, and preserving human stories. We build intelligent solutions that turn the narrative of every life into lasting, meaningful insight.
          </motion.p>
        </div>
      </div>
      
      {/* Subtle bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-mint/5" />
    </section>
  )
}
