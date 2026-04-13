'use client'
import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { type Product } from '@/lib/products'

export default function ProductDetailHero({ product }: { product: Product }) {
  const prefersReduced = useReducedMotion()
  const initialY = prefersReduced ? 0 : 24
  const animateState = { opacity: 1, y: 0 }
  const initialState = { opacity: prefersReduced ? 1 : 0, y: initialY }

  return (
    <section className="bg-obsidian pt-32 pb-24 relative overflow-hidden">
      {/* Background soft glow representing the product persona */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-10">
        <motion.div 
          animate={{ backgroundPosition: prefersReduced ? '0% 0%' : ['0% 0%', '100% 100%'] }}
          transition={{ repeat: Infinity, duration: 20, repeatType: 'reverse' }}
          className="absolute inset-x-[10%] top-0 bottom-0 bg-gradient-to-tr from-mint/20 via-transparent to-blue-500/20 blur-[130px] rounded-[100%]"
        />
      </div>

      <div className="max-w-content mx-auto px-6 lg:px-16 w-full relative z-10 text-center flex flex-col items-center">
        <motion.div initial={initialState} animate={animateState} transition={{ duration: 0.5 }}>
          <SectionLabel className="justify-center !mb-6">Soyl Suite</SectionLabel>
        </motion.div>
        
        <motion.h1 
          initial={initialState} 
          animate={animateState} 
          transition={{ delay: prefersReduced ? 0 : 0.15, duration: 0.6 }} 
          className="font-display font-bold text-soyl-white leading-[1.05] mb-8" 
          style={{ fontSize: 'clamp(52px, 8vw, 100px)' }}
        >
          {product.name.replace('SOYL ', '')}
        </motion.h1>
        
        <motion.div
           initial={initialState} 
           animate={animateState} 
           transition={{ delay: prefersReduced ? 0 : 0.3, duration: 0.5 }} 
        >
          <p className="text-mint font-mono tracking-[0.2em] uppercase text-sm md:text-base border border-mint/20 bg-mint/5 px-6 py-3 rounded-full inline-block shadow-[0_0_15px_rgba(175,208,204,0.1)]">
            {product.tagline}
          </p>
        </motion.div>
      </div>
      
      {/* Subtle bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-mint/5 z-10" />
    </section>
  )
}
