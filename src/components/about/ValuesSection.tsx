'use client'
import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import StaggerContainer from '@/components/motion/StaggerContainer'
import FadeInUp from '@/components/motion/FadeInUp'

const VALUES = [
  { title: 'Radical Transparency', desc: 'Open logic, explicit model confidences. We believe in building trust through total visibility.' },
  { title: 'Ruthless Iteration', desc: 'We build fast, test meticulously, and refine endlessly. Good is never good enough.' },
  { title: 'Human Centricity', desc: 'Technology serves people, not the other way around. Every decision optimizes for human empowerment.' }
]

export default function ValuesSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-obsidian border-y border-mint/5 py-24">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div className="text-center mb-16 flex flex-col items-center">
          <SectionLabel>Core Values</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-soyl-white mt-2">
            What defines us
          </h2>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map((value, i) => (
            <FadeInUp key={i}>
              <motion.div
                whileHover={prefersReduced ? {} : { y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-card-bg border border-mint/10 hover:border-mint/30 rounded-xl p-8 flex flex-col items-start gap-5 transition-colors duration-300 h-full"
              >
                <div className="w-12 h-12 bg-mint/10 rounded-lg flex items-center justify-center">
                  <span className="text-mint font-bold text-xl">{i + 1}</span>
                </div>
                
                <div>
                  <h3 className="font-heading font-bold text-xl text-soyl-white mb-2">{value.title}</h3>
                  <p className="text-graphite text-sm leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            </FadeInUp>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
