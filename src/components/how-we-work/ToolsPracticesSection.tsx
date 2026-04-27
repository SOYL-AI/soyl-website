'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import EditorialMarker from '@/components/ui/EditorialMarker'

const PRACTICES = [
  "FastAPI + LangGraph for multi-agent orchestration",
  "PostgreSQL + pgvector for retrieval and memory",
  "Asterisk PBX + Twilio SIP for sub-3s voice",
  "AMD Ryzen AI NPUs for on-property edge inference",
  "Next.js 16 + Tailwind v4 for every product surface",
  "Self-hosted on Hetzner — cost-efficient by design",
]

export default function ToolsPracticesSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-atmosphere-warm border-b border-mint/5 py-24 md:py-32 relative overflow-hidden">
      <EditorialMarker number="04" label="STACK" position="top-right" />
      {/* Subtle stylistic bg artifact */}
      <div className="absolute -right-[15%] top-1/4 w-[40vw] h-[40vw] bg-mint/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen opacity-20" />

      <div className="max-w-content mx-auto px-6 lg:px-16 w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-center">
        
        <div className="md:col-span-5 flex flex-col items-start">
          <SectionLabel>Architecture</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-soyl-white mt-2 mb-6">
            Stack & practices
          </h2>
          <p className="text-graphite text-lg leading-relaxed max-w-lg">
            A small set of opinionated, production-grade tools — chosen for cost, latency, and reliability. We pick boring where we can, sharp where we have to, and we own our infrastructure end-to-end.
          </p>
        </div>

        <div className="md:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {PRACTICES.map((practice, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: prefersReduced ? 0 : i * 0.1, duration: 0.4 }}
                viewport={{ once: true, amount: 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div className={[
                  'w-6 h-6 rounded-full bg-mint/5 border border-mint/20 flex flex-col items-center justify-center text-mint flex-shrink-0 group-hover:bg-mint/10 transition-all',
                  prefersReduced ? '' : 'group-hover:scale-110',
                ].join(' ')}>
                  <CheckCircle2 size={12} className="opacity-70 group-hover:opacity-100" />
                </div>
                <span className="text-soyl-white font-medium text-sm md:text-base tracking-wide leading-tight mt-[3px] group-hover:text-mint transition-colors">
                  {practice}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
