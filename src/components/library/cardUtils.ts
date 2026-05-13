import type { LibraryCard } from '@/sanity/lib/types'

// Article routes are nested by type so blog/paper slugs can't collide and
// each type renders through its dedicated detail page.
export function hrefForCard(item: LibraryCard): string {
  return item._type === 'whitepaper'
    ? `/library/research/${item.slug}`
    : `/library/blog/${item.slug}`
}

// Cards uppercase the date in the Vapi reference style. Papers fall back
// to the year because they often only have year precision.
export function formatCardDate(item: LibraryCard): string {
  if (item.publishedAt) {
    try {
      const d = new Date(item.publishedAt)
      return d
        .toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        .toUpperCase()
    } catch {
      // ignore, fall through
    }
  }
  if (item.year) return String(item.year)
  return ''
}

// Short summary text (excerpt for blogs, abstract for papers).
export function summaryText(item: LibraryCard, max = 180): string {
  const raw = item.excerpt ?? item.abstract ?? ''
  if (raw.length <= max) return raw
  return raw.slice(0, max - 1).trimEnd() + '…'
}
