'use client'
import { memo } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Brain, Lock, Zap, Heart, History, Shield, Globe, Share, Sparkles, ArrowRight, type LucideIcon } from 'lucide-react'
import { PRODUCTS, type Product } from '@/lib/products'
import { staggerContainer, fadeInUp } from '@/lib/motion'

// Map strings to Icon components safely
const ICON_MAP: Record<string, LucideIcon> = {
  Brain, Lock, Zap, Heart, History, Shield, Globe, Share, Sparkles
}

const ProductCard = memo(({ product }: { product: Product }) => {
  const prefersReduced = useReducedMotion()
  
  return (
    <motion.div 
      variants={prefersReduced ? {} : fadeInUp}
      className="group flex flex-col justify-between bg-mint/[0.02] border border-mint/10 rounded-2xl p-8 hover:bg-mint/[0.05] hover:border-mint/30 transition-all duration-500 ease-out h-full"
    >
      <div>
        <div className="mb-6">
          <h3 className="font-heading font-bold text-3xl text-soyl-white mb-2">{product.name}</h3>
          <p className="font-mono text-mint font-medium text-xs tracking-[0.2em] uppercase">{product.tagline}</p>
        </div>
        
        <p className="text-graphite leading-relaxed mb-8">
          {product.longDescription}
        </p>
        
        {/* Features Sub-list */}
        <div className="space-y-6 mb-10">
          {product.features.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] || Zap
            return (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-1 w-10 h-10 rounded-lg bg-mint/10 border border-mint/20 flex items-center justify-center shrink-0 text-mint group-hover:scale-110 transition-transform duration-500">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="text-soyl-white text-sm font-semibold mb-1">{feature.title}</h4>
                  <p className="text-graphite text-xs leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Footer: Tags and CTA */}
      <div className="mt-auto">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {product.tags.map((tag, i) => (
            <span key={i} className="text-[11px] font-mono tracking-wider text-mint/70 bg-mint/5 border border-mint/10 rounded px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
        
        <Link 
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-2 text-soyl-white font-medium hover:text-mint transition-colors duration-300 w-full justify-between pb-4 border-b border-mint/20 group-hover:border-mint"
        >
          <span className="tracking-wide">Explore {product.name.split(' ')[1]}</span>
          <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-2" />
        </Link>
      </div>
    </motion.div>
  )
})
ProductCard.displayName = 'ProductCard'

export default function ProductGridSection() {
  const prefersReduced = useReducedMotion()
  
  return (
    <section className="bg-obsidian pb-32">
      <div className="max-w-content mx-auto px-6 lg:px-16 w-full">
        <motion.div 
          variants={prefersReduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
