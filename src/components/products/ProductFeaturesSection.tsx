'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { type Product } from '@/lib/products'
import { ICON_MAP } from '@/lib/icons'
import SectionLabel from '@/components/ui/SectionLabel'
import EditorialMarker from '@/components/ui/EditorialMarker'

export default function ProductFeaturesSection({ product }: { product: Product }) {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative bg-obsidian border-b border-mint/5 py-24 md:py-32">
      <EditorialMarker number="02" label="FEATURES" position="top-right" />
      <div className="max-w-content mx-auto px-6 lg:px-16 w-full">
        <div className="mb-16 text-center flex flex-col items-center">
          <SectionLabel>Core Capabilities</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-soyl-white mt-2">
            Engineered for perfection
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {product.features.map((feat, i) => {
            const Icon = ICON_MAP[feat.icon] ?? ICON_MAP['Zap']
            return (
              <motion.div
                key={i}
                initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: prefersReduced ? 0 : i * 0.1, duration: 0.5 }}
                className="group relative bg-mint/[0.02] border border-mint/10 rounded-2xl p-8 hover:bg-mint/[0.05] hover:border-mint/30 transition-all duration-300"
              >
                <div className={[
                  'w-12 h-12 rounded-xl bg-mint/5 border border-mint/20 flex items-center justify-center text-mint mb-6 transition-transform duration-300',
                  prefersReduced ? '' : 'group-hover:scale-110',
                ].join(' ')}>
                  <Icon size={24} />
                </div>
                <h3 className={[
                  'font-heading font-bold text-xl text-soyl-white mb-3 transition-colors',
                  prefersReduced ? '' : 'group-hover:text-mint',
                ].join(' ')}>
                  {feat.title}
                </h3>
                <p className="text-graphite leading-relaxed text-sm">
                  {feat.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
