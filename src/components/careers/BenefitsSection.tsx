'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { CAREER_BENEFITS } from '@/lib/careers-content'
import { staggerContainer, fadeInUp } from '@/lib/motion'

export default function BenefitsSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative bg-obsidian py-24 md:py-32 border-b border-mint/5">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="mb-14 md:mb-20 max-w-4xl">
          <SectionLabel>Benefits</SectionLabel>
          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="font-heading font-bold text-soyl-white text-3xl md:text-5xl leading-tight mt-4"
          >
            A package designed to power a high-performing team of tireless builders.
          </motion.h2>
        </div>

        {/* 3×2 grid. Hairline mint dividers form the framework — the cells
            themselves are transparent, so the section keeps the obsidian
            backdrop intact. */}
        <motion.div
          variants={prefersReduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-mint/8"
        >
          {CAREER_BENEFITS.map(b => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.title}
                variants={prefersReduced ? {} : fadeInUp}
                className="group relative flex flex-col items-center text-center px-8 py-12 md:py-14 border-r border-b border-mint/8 transition-colors duration-300 hover:bg-mint/[0.025]"
              >
                <div
                  className={[
                    'flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-colors duration-300',
                    'bg-soyl-white/95 text-obsidian',
                    'group-hover:bg-mint',
                  ].join(' ')}
                >
                  <Icon size={26} strokeWidth={1.4} />
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-soyl-white mb-3 transition-colors duration-300 group-hover:text-mint">
                  {b.title}
                </h3>
                <p className="text-graphite text-sm leading-relaxed max-w-xs">
                  {b.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
