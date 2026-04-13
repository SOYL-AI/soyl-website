'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { slideInLeft, slideInRight } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

export default function MissionVisionSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-obsidian py-20 md:py-32 overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          {/* Mission */}
          <motion.div 
            variants={prefersReduced ? {} : slideInLeft}
            initial={prefersReduced ? {} : "hidden"}
            whileInView={prefersReduced ? {} : "visible"}
            viewport={{ once: true, margin: '-60px' }}
            className="border-l-2 border-mint pl-6 md:pl-8"
          >
            <div className="mb-6"><SectionLabel>Our Mission</SectionLabel></div>
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-soyl-white mb-4 leading-snug">
              To index human experience so it is never lost to time.
            </h3>
            <p className="text-graphite leading-relaxed">
              We believe every person's story holds immense value. Our mission is to provide the intelligence layer that captures, analyzes, and beautifully preserves these narratives for generations.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div 
            variants={prefersReduced ? {} : slideInRight}
            initial={prefersReduced ? {} : "hidden"}
            whileInView={prefersReduced ? {} : "visible"}
            viewport={{ once: true, margin: '-60px' }}
            className="border-l-2 border-mint pl-6 md:pl-8"
          >
            <div className="mb-6"><SectionLabel>Our Vision</SectionLabel></div>
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-soyl-white mb-4 leading-snug">
              A world where profound insights are accessible to everyone.
            </h3>
            <p className="text-graphite leading-relaxed">
              We envision a future where AI isn't just a productivity tool, but an empathic companion capable of weaving scattered moments into meaningful, coherent legacies.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
