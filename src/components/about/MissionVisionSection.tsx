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
              Build AI infrastructure that serves people, not platforms.
            </h3>
            <p className="text-graphite leading-relaxed">
              We build the intelligence layer for the moments that matter — a guest checking into a hotel, a family wanting privacy from the cloud, a person trying to remember to call their parents. Our mission is to make that layer feel native, not bolted-on.
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
              A world where AI runs on your terms — local, private, and yours.
            </h3>
            <p className="text-graphite leading-relaxed">
              We see a near future where every home owns its compute, every hospitality interaction is voice-first, and every meaningful daily problem has an AI built specifically for it. We&apos;re building toward that future from Bengaluru, one product at a time.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
