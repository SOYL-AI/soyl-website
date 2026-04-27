'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { type Product } from '@/lib/products'
import EditorialMarker from '@/components/ui/EditorialMarker'

export default function ProductOverviewSection({ product }: { product: Product }) {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative bg-atmosphere-warm border-b border-mint/5 py-24 md:py-32">
       <EditorialMarker number="01" label="OVERVIEW" position="top-right" />
       <div className="max-w-4xl mx-auto px-6 lg:px-16 w-full text-center">
          <motion.h2 
            initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="font-heading font-medium text-2xl md:text-3xl text-soyl-white leading-relaxed mb-8"
          >
            {product.description}
          </motion.h2>

          <motion.p
            initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: prefersReduced ? 0 : 0.2, duration: 0.6 }}
            className="text-graphite text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
          >
            {product.longDescription}
          </motion.p>
       </div>
    </section>
  )
}
