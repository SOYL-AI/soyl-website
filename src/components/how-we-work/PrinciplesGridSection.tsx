'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { Search, RotateCw, Target, Hammer } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { staggerContainer, fadeInUp } from '@/lib/motion'

const PRINCIPLES = [
  { icon: Search, title: 'Build, then talk', desc: 'We ship before we pitch. Pilots in production before pages on a website.' },
  { icon: RotateCw, title: 'Iterate ruthlessly', desc: 'Every release teaches us something. We update our beliefs and the product on the same day.' },
  { icon: Target, title: 'Local-first by default', desc: 'Where it can run on your hardware, it does. Privacy is an architecture decision.' },
  { icon: Hammer, title: 'Craft the small things', desc: 'A loading state, a voice latency, a mint border — the small things compound into the feel of the product.' }
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
