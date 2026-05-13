'use client'

import { Link } from 'next-view-transitions'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Category } from '@/sanity/lib/types'
import CategoryRowCard from './CategoryRowCard'

interface Props {
  category: Category
}

/**
 * Vapi-style horizontal category section: a large title block on the left
 * with the category name, item count as a superscript, and a "VIEW MORE"
 * link; a horizontally-scrolling card track on the right.
 *
 * On mobile the title and cards stack vertically and the cards become a
 * swipeable horizontal scroll.
 */
export default function CategoryRow({ category }: Props) {
  const prefersReduced = useReducedMotion()
  const items = category.items ?? []
  if (items.length === 0) return null

  return (
    <motion.section
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="border-b border-mint/5 py-12 md:py-16"
    >
      <div className="max-w-content mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-12">
        {/* Title block */}
        <div className="flex flex-col gap-4">
          <h2 className="font-display font-bold text-soyl-white text-3xl md:text-4xl leading-[1.05] uppercase tracking-tight">
            {category.title.replace(/\s+/g, '-')}
            {typeof category.count === 'number' && category.count > 0 && (
              <sup className="text-mint text-xs ml-2 font-mono tracking-normal align-super">
                {category.count}
              </sup>
            )}
          </h2>
          <Link
            href={`/library/category/${category.slug}`}
            className="group inline-flex items-center gap-2 text-soyl-white text-xs tracking-[0.22em] uppercase hover:text-mint transition-colors w-fit"
          >
            <span className="border-b border-soyl-white/40 group-hover:border-mint pb-0.5 transition-colors">
              View more
            </span>
            <ArrowUpRight size={14} className="-mt-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Horizontal scroll track */}
        <div className="relative -mr-6 lg:-mr-16">
          <div
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pr-6 lg:pr-16 pb-4 scrollbar-thin"
            style={{ scrollbarWidth: 'thin' }}
          >
            {items.map(item => (
              <div key={`${item._type}:${item.slug}`} className="snap-start">
                <CategoryRowCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
