'use client'
import { Link } from 'next-view-transitions'
import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import EditorialMarker from '@/components/ui/EditorialMarker'
import { slideInLeft, slideInRight } from '@/lib/motion'

const STATS = [
  { target: 2026, suffix: '', label: 'Founded' },
  { target: 3, suffix: '', label: 'Products in Build' },
  { target: 1, suffix: '', label: 'Active Pilot' },
  { target: 20, suffix: '+', label: 'Builders on the Team' },
]

export default function AboutSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative bg-atmosphere-warm section-scanline py-16 md:py-24 border-y border-mint/5">
      <EditorialMarker number="01" label="STORY" position="top-right" />
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left — Text */}
          <motion.div
            variants={prefersReduced ? {} : slideInLeft}
            initial={prefersReduced ? {} : 'hidden'}
            whileInView={prefersReduced ? {} : 'visible'}
            viewport={{ once: true, margin: '-60px' }}
            className="border-l-2 border-mint pl-6"
          >
            <SectionLabel>OUR STORY</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-soyl-white mb-6 leading-tight">
              Engineered in Bengaluru. Built to ship.
            </h2>
            <div className="text-graphite leading-relaxed mb-6 space-y-4">
              <p>
                Founded in February 2026 by two engineers who&apos;d rather build than talk about building, SOYL AI is a deep-tech company shipping voice AI for hospitality, private personal AI hardware, and consumer software for daily life.
              </p>
              <p>
                One belief drives all of it: every problem worth solving begins with a human story.
              </p>
            </div>
            <Link href="/about" className="text-soyl-white text-sm font-medium hover:text-mint transition-colors link-underline">
              Read our story →
            </Link>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            variants={prefersReduced ? {} : slideInRight}
            initial={prefersReduced ? {} : 'hidden'}
            whileInView={prefersReduced ? {} : 'visible'}
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map(stat => (
              <div key={stat.label} className="bg-obsidian/50 border border-mint/10 rounded-xl p-6 hover:border-mint/30 transition-colors">
                <p className="font-display text-soyl-white text-4xl font-bold mb-1">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </p>
                <p className="text-graphite text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
