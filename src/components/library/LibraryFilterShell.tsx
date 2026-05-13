'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import CategoryPillBar from './CategoryPillBar'
import CategoryRow from './CategoryRow'
import CategoryRowCard from './CategoryRowCard'
import type { LibraryCard, LibraryIndexData } from '@/sanity/lib/types'

interface Props {
  data: LibraryIndexData
}

/**
 * Owns the URL ↔ data binding for /library. When no filter or query is
 * applied we render Vapi-style horizontal CategoryRow sections. When the
 * user picks a category pill or types in the search box we collapse to
 * a flat responsive grid filtered client-side over the same data set.
 *
 * Filtering client-side (rather than refetching) keeps typing fluid and
 * costs nothing because the index payload already contains everything.
 */
export default function LibraryFilterShell({ data }: Props) {
  const params = useSearchParams()
  const cat = params.get('cat') ?? 'all'
  const q = (params.get('q') ?? '').trim().toLowerCase()
  const prefersReduced = useReducedMotion()

  const isFiltering = cat !== 'all' || q.length > 0

  const filtered = useMemo(() => {
    let items: LibraryCard[] = data.allItems
    if (cat !== 'all') items = items.filter(i => i.category?.slug === cat)
    if (q) {
      items = items.filter(i => {
        const haystack = [
          i.title,
          i.subtitle ?? '',
          i.excerpt ?? '',
          i.abstract ?? '',
          ...(i.tags ?? []),
        ]
          .join(' ')
          .toLowerCase()
        return haystack.includes(q)
      })
    }
    return items
  }, [cat, q, data.allItems])

  return (
    <>
      <CategoryPillBar categories={data.categories.map(c => ({ slug: c.slug, title: c.title }))} />

      {isFiltering ? (
        <motion.section
          key={`grid:${cat}:${q}`}
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-content mx-auto px-6 lg:px-16 py-12"
        >
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-mint text-xs tracking-[0.22em] uppercase font-mono mb-3">No results</p>
              <p className="text-graphite text-sm">
                Nothing matches that query{cat !== 'all' ? ' in this category' : ''}.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {filtered.map(item => (
                <CategoryRowCard key={`${item._type}:${item.slug}`} item={item} layout="grid" />
              ))}
            </div>
          )}
        </motion.section>
      ) : (
        <div>
          {data.categories.filter(c => (c.items?.length ?? 0) > 0).map(c => (
            <CategoryRow key={c.slug} category={c} />
          ))}
          {data.categories.every(c => (c.items?.length ?? 0) === 0) && (
            <EmptyState />
          )}
        </div>
      )}
    </>
  )
}

function EmptyState() {
  return (
    <div className="max-w-content mx-auto px-6 lg:px-16 py-24 text-center">
      <p className="text-mint text-xs tracking-[0.22em] uppercase font-mono mb-3">
        Library is loading
      </p>
      <h2 className="font-display text-soyl-white text-3xl md:text-4xl mb-4">
        First articles land soon.
      </h2>
      <p className="text-graphite max-w-md mx-auto">
        Our research and engineering team is preparing the first wave of posts.
        Join the newsletter and we&apos;ll let you know the moment they ship.
      </p>
    </div>
  )
}
