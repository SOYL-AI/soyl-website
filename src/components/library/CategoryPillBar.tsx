'use client'

import { useEffect, useState, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Category } from '@/sanity/lib/types'

interface Props {
  categories: Pick<Category, 'slug' | 'title'>[]
  /**
   * If set, the bar links to category pages (anchor mode) — used on the
   * /library/category/[slug] route where we want a real page hop.
   * Otherwise we use URL search params on /library for in-page filtering.
   */
  mode?: 'searchParams' | 'links'
  /**
   * Active category slug for `links` mode. Ignored in searchParams mode
   * (active state is derived from URL).
   */
  activeSlug?: string
}

/**
 * Filter pill row + search input, modeled on the Vapi blog header. In
 * `searchParams` mode (default) it syncs to ?cat= and ?q= so views are
 * shareable. In `links` mode it acts as plain navigation between
 * /library/category/[slug] pages.
 */
export default function CategoryPillBar({ categories, mode = 'searchParams', activeSlug }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [, startTransition] = useTransition()

  const activeFromUrl = params.get('cat') ?? 'all'
  const queryFromUrl = params.get('q') ?? ''
  const [query, setQuery] = useState(queryFromUrl)

  // Keep local search input in sync if URL changes from elsewhere.
  // Deferred with setTimeout(0) to satisfy react-hooks/set-state-in-effect.
  useEffect(() => {
    const t = setTimeout(() => setQuery(queryFromUrl), 0)
    return () => clearTimeout(t)
  }, [queryFromUrl])

  // Debounced URL update for the search input. 200ms is short enough that
  // typing still feels live but long enough that we don't push history on
  // every keystroke.
  useEffect(() => {
    if (mode === 'links') return
    if (query === queryFromUrl) return
    const t = setTimeout(() => {
      const next = new URLSearchParams(params.toString())
      if (query) next.set('q', query)
      else next.delete('q')
      startTransition(() => router.replace(`${pathname}?${next.toString()}`, { scroll: false }))
    }, 200)
    return () => clearTimeout(t)
  }, [query, queryFromUrl, mode, params, pathname, router])

  const active = mode === 'links' ? (activeSlug ?? 'all') : activeFromUrl

  function setCategory(slug: string) {
    if (mode === 'links') {
      if (slug === 'all') router.push('/library')
      else router.push(`/library/category/${slug}`)
      return
    }
    const next = new URLSearchParams(params.toString())
    if (slug === 'all') next.delete('cat')
    else next.set('cat', slug)
    startTransition(() => router.replace(`${pathname}?${next.toString()}`, { scroll: false }))
  }

  const pills = [{ slug: 'all', title: 'All' }, ...categories]

  return (
    <div className="border-b border-mint/8 sticky top-16 z-30 bg-obsidian/85 backdrop-blur-md">
      <div className="max-w-content mx-auto px-6 lg:px-16 py-4 flex flex-col md:flex-row gap-3 md:gap-6 md:items-start">
        {/* Pills — horizontal scroll on mobile (keeps the bar one row tall
            on phones), wraps to a new line on md+ so we never get the
            sad-scrollbar look on desktop when categories outgrow the bar. */}
        <div
          className="flex gap-x-2 gap-y-2 overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0 md:flex-1 md:flex-wrap md:overflow-visible"
          role="tablist"
          aria-label="Filter Library by category"
        >
          {pills.map(p => {
            const isActive = active === p.slug
            return (
              <button
                key={p.slug}
                role="tab"
                aria-selected={isActive}
                onClick={() => setCategory(p.slug)}
                className={cn(
                  'flex-shrink-0 px-4 py-2 rounded-full text-sm tracking-wide transition-colors duration-200 border',
                  isActive
                    ? 'bg-soyl-white text-obsidian border-soyl-white font-medium'
                    : 'bg-transparent text-graphite border-mint/15 hover:border-mint/40 hover:text-soyl-white',
                )}
              >
                {p.title}
              </button>
            )
          })}
        </div>

        {/* Search */}
        <label className="flex items-center gap-2 bg-card-bg border border-mint/15 rounded-full px-4 py-2 md:w-72 focus-within:border-mint/40 transition-colors">
          <Search size={14} className="text-graphite shrink-0" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search"
            aria-label="Search the Library"
            className="bg-transparent text-sm text-soyl-white placeholder:text-graphite/60 focus:outline-none w-full"
          />
        </label>
      </div>
    </div>
  )
}
