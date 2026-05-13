'use client'

import { motion, useReducedMotion } from 'framer-motion'
import CategoryPillBar from './CategoryPillBar'
import CategoryRowCard from './CategoryRowCard'
import type { Category, LibraryCard } from '@/sanity/lib/types'

interface Props {
  category: Category
  items: LibraryCard[]
  allCategories: { slug: string; title: string }[]
}

// Per-category landing page. Same pill bar (now in `links` mode), then
// a responsive grid of articles in that category — see reference image 3.
export default function CategoryPage({ category, items, allCategories }: Props) {
  const prefersReduced = useReducedMotion()

  return (
    <>
      <CategoryPillBar categories={allCategories} mode="links" activeSlug={category.slug} />
      <section className="max-w-content mx-auto px-6 lg:px-16 py-12 md:py-16">
        {category.description && (
          <p className="text-graphite text-base md:text-lg max-w-2xl mb-10">
            {category.description}
          </p>
        )}
        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-mint text-xs tracking-[0.22em] uppercase font-mono mb-3">No articles yet</p>
            <p className="text-graphite text-sm">Check back soon, or browse other categories above.</p>
          </div>
        ) : (
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
          >
            {items.map(item => (
              <CategoryRowCard key={`${item._type}:${item.slug}`} item={item} layout="grid" />
            ))}
          </motion.div>
        )}
      </section>
    </>
  )
}
