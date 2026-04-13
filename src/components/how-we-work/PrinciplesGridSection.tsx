'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { Search, RotateCw, Target, Hammer } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { staggerContainer, fadeInUp } from '@/lib/motion'

const PRINCIPLES = [
  { icon: Search, title: 'Transparency', desc: 'Operating with open algorithms and verifiable processing flows, ensuring you understand exactly how your data is handled.' },
  { icon: RotateCw, title: 'Iteration', desc: 'Deploying continuous intelligence loops that dynamically adapt to new contexts and shifting user behavioral models.' },
  { icon: Target, title: 'Impact', desc: 'Focusing exclusively on infrastructure that pushes the narrative forward, ignoring vanity metrics in favor of true utility.' },
  { icon: Hammer, title: 'Craft', desc: 'Enforcing a unified standard of meticulous design and robust architecture across every component we ship.' }
]

export default function PrinciplesGridSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-obsidian border-b border-mint/5 py-24 md:py-32">
      <div className="max-w-content mx-auto px-6 lg:px-16 w-full">
        <div className="mb-16 text-center flex flex-col items-center">
          <SectionLabel>Core Ideology</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-soyl-white mt-2 mb-6">
            The Principles We Build On
          </h2>
        </div>

        <motion.div 
          variants={prefersReduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PRINCIPLES.map((principle, i) => (
            <motion.div
              key={i}
              variants={prefersReduced ? {} : fadeInUp}
              className={[
                'bg-mint/[0.02] border border-mint/10 rounded-2xl p-8 hover:bg-mint/[0.05] hover:border-mint/30 transition-all duration-300 group flex flex-col items-start h-full',
                prefersReduced ? '' : 'hover:-translate-y-2',
              ].join(' ')}
            >
              <div className={[
                'w-12 h-12 rounded-xl bg-mint/5 border border-mint/20 flex flex-col items-center justify-center text-mint mb-6 transition-transform duration-300',
                prefersReduced ? '' : 'group-hover:scale-110',
              ].join(' ')}>
                <principle.icon size={24} />
              </div>
              <h3 className="font-heading font-bold text-xl text-soyl-white mb-3 group-hover:text-mint transition-colors tracking-wide">
                {principle.title}
              </h3>
              <p className="text-graphite text-sm leading-relaxed mt-auto">
                {principle.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
