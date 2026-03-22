'use client'
import { Link } from 'next-view-transitions'
import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { slideInLeft, slideInRight } from '@/lib/motion'

const STATS = [
  { target: 2023, suffix: '',   label: 'Year Founded' },
  { target: 3,    suffix: '',   label: 'Products Live' },
  { target: 12,   suffix: '+',  label: 'Research Papers' },
  { target: 8,    suffix: '',   label: 'Team Members' },
]

export default function AboutSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-elevated py-16 md:py-24 border-y border-mint/5">
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
            <SectionLabel>Who We Are</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-soyl-white mb-6 leading-tight">
              Building AI That Understands the Human Story
            </h2>
            <p className="text-graphite leading-relaxed mb-6">
              SOYL AI Private Limited is an AI research company focused on capturing, understanding, and preserving human experiences. We combine cutting-edge machine learning with deep empathy for the stories that make us human.
            </p>
            <Link href="/about" className="text-soyl-white text-sm font-medium hover:text-mint transition-colors link-underline">
              Learn More →
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
