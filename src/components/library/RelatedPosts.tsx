import type { LibraryCard } from '@/sanity/lib/types'
import CategoryRowCard from './CategoryRowCard'

interface Props {
  items: LibraryCard[]
  heading?: string
}

// Three-card grid placed at the bottom of every article detail page so
// readers have an obvious next hop in the same category. Falls back
// silently when there are no related items (a single-post category).
export default function RelatedPosts({ items, heading = 'Keep reading' }: Props) {
  if (items.length === 0) return null
  return (
    <section className="border-t border-mint/10 mt-16 pt-16">
      <h2 className="font-display text-soyl-white text-2xl md:text-3xl mb-8 uppercase tracking-tight">
        {heading}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map(item => (
          <CategoryRowCard key={`${item._type}:${item.slug}`} item={item} />
        ))}
      </div>
    </section>
  )
}
