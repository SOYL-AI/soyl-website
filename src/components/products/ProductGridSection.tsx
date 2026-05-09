'use client'
import { Link } from 'next-view-transitions'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PRODUCTS, type Product } from '@/lib/products'
import { ICON_MAP } from '@/lib/icons'
import { staggerContainer, fadeInUp } from '@/lib/motion'

const ProductCard = ({ product }: { product: Product }) => {
  const prefersReduced = useReducedMotion()

  // Choose a main icon for the visual anchor orb based on the product
  let MainIcon = ICON_MAP['Zap']
  if (product.slug === 'butler-ai') MainIcon = ICON_MAP['Globe']
  if (product.slug === 'ai-dex') MainIcon = ICON_MAP['Lock']
  if (product.slug === 'lifestyle-apps') MainIcon = ICON_MAP['Heart']

  return (
    <motion.div
      variants={prefersReduced ? {} : fadeInUp}
      className="group relative flex flex-col bg-mint/[0.02] border border-mint/10 rounded-[2rem] p-8 lg:p-12 hover:bg-gradient-to-br hover:from-mint/[0.05] hover:to-transparent hover:border-mint/30 transition-all duration-700 ease-out overflow-hidden lg:h-[720px]"
    >
      {/* Top Content (Title, Tagline) */}
      <div className="relative z-10 mb-8 lg:mb-auto">
        <div>
          <h3 className="font-heading font-bold text-3xl text-soyl-white mb-2">{product.name}</h3>
          <p className="font-mono text-mint font-medium text-xs tracking-[0.2em] uppercase">{product.tagline}</p>
        </div>
      </div>

      {/* Center Visual Anchor (Resting State - Desktop Only) */}
      <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0">
         <div className="w-64 h-64 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-mint/20 via-mint/5 to-transparent flex items-center justify-center backdrop-blur-md border border-mint/10 shadow-[0_0_80px_-20px_rgba(255,255,255,0.1)]">
            <MainIcon size={64} className="text-mint/80 drop-shadow-lg" />
         </div>
      </div>

      {/* Feature List (Mobile: Normal flow. Desktop: Hover State) */}
      <div className="relative lg:absolute lg:left-12 lg:right-12 lg:inset-y-0 lg:flex lg:flex-col lg:justify-center space-y-6 lg:opacity-0 lg:translate-y-8 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 ease-out z-10 mb-10 lg:mb-0">
        {product.features.map((feature, i) => {
          const Icon = ICON_MAP[feature.icon] ?? ICON_MAP['Zap']
          return (
            <div key={i} className="flex items-start gap-4">
              <div className="mt-1 w-10 h-10 rounded-lg bg-mint/10 border border-mint/20 flex items-center justify-center shrink-0 text-mint">
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

      {/* Footer: CTA */}
      <div className="relative z-10 mt-auto pt-8">
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-2 text-soyl-white font-medium hover:text-mint transition-colors duration-300 w-full justify-between pb-4 border-b border-mint/20 group-hover:border-mint"
        >
          <span className="tracking-wide">Explore {product.shortName}</span>
          <ArrowRight size={20} className={prefersReduced ? '' : 'transition-transform duration-300 group-hover:translate-x-2'} />
        </Link>
      </div>
    </motion.div>
  )
}

export default function ProductGridSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-obsidian pt-24 md:pt-32 pb-32 relative z-10">
      <div className="max-w-content mx-auto px-6 lg:px-16 w-full">
        <motion.div
          variants={prefersReduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
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
