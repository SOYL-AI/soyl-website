'use client'
import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

export default function HowWeWorkHeroSection() {
  const prefersReduced = useReducedMotion()
  const initialY = prefersReduced ? 0 : 24
  const animateState = { opacity: 1, y: 0 }
  const initialState = { opacity: prefersReduced ? 1 : 0, y: initialY }

  return (
    <section className="bg-obsidian pt-48 pb-32 relative min-h-[60vh] flex flex-col justify-center overflow-hidden">
      
      {/* CSS-Only Ambient Looping Background */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-30">
        <div className="absolute top-[10%] left-[10%] w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] rounded-full bg-gradient-to-tr from-mint/20 via-blue-500/10 to-transparent blur-[120px] animate-[spin_25s_linear_infinite]" style={{ transformOrigin: 'center center' }} />
        <div className="absolute top-[30%] right-[5%] w-[70vw] md:w-[50vw] h-[70vw] md:h-[50vw] rounded-full bg-gradient-to-tl from-indigo-500/10 via-mint/10 to-transparent blur-[120px] animate-[spin_18s_linear_infinite_reverse]" style={{ transformOrigin: '30% 50%' }} />
      </div>

      <div className="max-w-content mx-auto px-6 lg:px-16 w-full text-center flex flex-col items-center relative z-10">
        <motion.div initial={initialState} animate={animateState} transition={{ duration: 0.5 }}>
          <SectionLabel className="justify-center mb-8">Methodology</SectionLabel>
        </motion.div>
        
        <motion.h1 
          initial={initialState} 
          animate={animateState} 
          transition={{ delay: prefersReduced ? 0 : 0.15, duration: 0.6 }} 
          className="font-display font-bold text-soyl-white leading-[1.05] mb-8" 
          style={{ fontSize: 'clamp(48px, 8vw, 92px)' }}
        >
          The Engine <br className="hidden md:block" /> Behind the Echo
        </motion.h1>
        
        <motion.p 
          initial={initialState} 
          animate={animateState} 
          transition={{ delay: prefersReduced ? 0 : 0.3, duration: 0.5 }} 
          className="text-graphite text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
        >
          We don&apos;t just build software. We craft permanent digital lineages. Discover the core values, processes, and tools that drive the SOYL AI intelligence architecture.
        </motion.p>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-mint/10 z-10" />
    </section>
  )
}
