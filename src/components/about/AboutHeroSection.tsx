'use client'
import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

export default function AboutHeroSection() {
  const prefersReduced = useReducedMotion()
  
  const initialY = prefersReduced ? 0 : 24
  const animateState = { opacity: 1, y: 0 }
  const initialState = { opacity: prefersReduced ? 1 : 0, y: initialY }

  return (
    <section className="bg-obsidian pt-32 pb-16 relative overflow-hidden">
      {/* Volumetric Ethereal Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen">
        <motion.div
          animate={{
            x: prefersReduced ? 0 : [0, 50, -30, 0],
            y: prefersReduced ? 0 : [0, -40, 20, 0],
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-mint/15 blur-[120px] opacity-70"
        />
        <motion.div
          animate={{
            x: prefersReduced ? 0 : [0, -60, 40, 0],
            y: prefersReduced ? 0 : [0, 50, -30, 0],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute top-[10%] right-[-5%] w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full bg-blue-500/10 blur-[130px] opacity-60"
        />
      </div>

      <div className="max-w-content mx-auto px-6 lg:px-16 w-full relative z-10 flex flex-col items-center text-center">
        <div className="flex flex-col items-center max-w-5xl">
          <motion.div 
            initial={initialState} 
            animate={animateState} 
            transition={{ delay: prefersReduced ? 0 : 0.1, duration: 0.5 }}
          >
            <SectionLabel className="justify-center mb-6">About Us</SectionLabel>
          </motion.div>
          
          <motion.h1 
            initial={initialState} 
            animate={animateState} 
            transition={{ delay: prefersReduced ? 0 : 0.25, duration: 0.6 }} 
            className="font-display font-bold leading-[1.05] mb-8" 
            style={{ fontSize: 'clamp(44px, 7vw, 96px)' }}
          >
            <motion.span
              animate={{ backgroundPosition: prefersReduced ? '0% center' : ['0% center', '200% center'] }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-soyl-white via-mint to-soyl-white bg-[length:200%_auto]"
            >
              Preserving Human Experience<br className="hidden md:block" /> through AI
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={initialState} 
            animate={animateState} 
            transition={{ delay: prefersReduced ? 0 : 0.4, duration: 0.5 }} 
            className="text-graphite text-lg md:text-xl md:leading-relaxed max-w-3xl mx-auto"
          >
            SOYL AI is dedicated to capturing, understanding, and preserving human stories. We build intelligent solutions that turn the narrative of every life into lasting, meaningful insight.
          </motion.p>
        </div>
      </div>
      
      {/* Subtle bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-mint/5 z-10" />
    </section>
  )
}
