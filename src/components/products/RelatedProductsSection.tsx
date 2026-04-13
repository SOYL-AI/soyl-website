'use client'
import { Link } from 'next-view-transitions'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'
import { staggerContainer, fadeInUp } from '@/lib/motion'
import { cn } from '@/lib/utils'

export default function RelatedProductsSection({ currentSlug }: { currentSlug: string }) {
  const prefersReduced = useReducedMotion()
  const related = PRODUCTS.filter(p => p.slug !== currentSlug)

  return (
    <section className="bg-obsidian border-t border-mint/5 py-24 md:py-32">
      <div className="max-w-content mx-auto px-6 lg:px-16 w-full">
        <div className="mb-12 flex justify-between items-end border-b border-mint/10 pb-6">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-soyl-white">
            Explore the Suite
          </h2>
          <Link href="/products" className="text-mint hover:text-soyl-white transition-colors text-sm font-medium">
            View All →
          </Link>
        </div>

        <motion.div
          variants={prefersReduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {related.map(product => (
            <motion.div key={product.slug} variants={prefersReduced ? {} : fadeInUp} className="h-full">
              <Link
                href={`/products/${product.slug}`}
                className="group flex flex-col h-full bg-mint/[0.02] border border-mint/10 hover:border-mint/30 rounded-2xl p-8 transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-mint/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl text-soyl-white group-hover:text-mint transition-colors">
                    {product.name}
                  </h3>
                  <div className={cn(
                    'w-10 h-10 rounded-full bg-mint/5 border border-mint/10 flex items-center justify-center text-mint/50',
                    'group-hover:text-mint group-hover:border-mint/30 transition-all duration-300',
                    !prefersReduced && 'group-hover:scale-110 group-hover:-translate-y-1 group-hover:translate-x-1',
                  )}>
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <p className="text-graphite text-sm md:text-base leading-relaxed max-w-sm mt-auto relative z-10">
                  {product.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
