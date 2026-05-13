'use client'

import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { isSanityConfigured } from '@/sanity/env'
import type { LibraryCard } from '@/sanity/lib/types'
import { formatCardDate, hrefForCard } from './cardUtils'

interface Props {
  item: LibraryCard
  layout?: 'row' | 'grid'
}

// Small card used inside CategoryRow (horizontal scroll) and category /
// search-result grids. The `layout` prop swaps the width strategy:
//  - `row`  : fixed width so cards line up in a scroll track
//  - `grid` : fills the grid cell
export default function CategoryRowCard({ item, layout = 'row' }: Props) {
  const href = hrefForCard(item)
  const dateLabel = formatCardDate(item)
  const hasImage = Boolean(item.coverImage && isSanityConfigured)
  const coverUrl = hasImage ? urlFor(item.coverImage!).width(640).height(360).fit('crop').url() : null

  return (
    <Link
      href={href}
      className={
        layout === 'grid'
          ? 'group flex flex-col gap-3 w-full'
          : 'group flex-shrink-0 w-[280px] md:w-[320px] flex flex-col gap-3'
      }
    >
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-card-bg border border-mint/10 group-hover:border-mint/30 transition-colors">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 280px, 320px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <CardPlaceholder type={item._type} title={item.title} />
        )}
      </div>
      <p className="text-graphite text-[10px] font-mono tracking-[0.18em] uppercase">
        {dateLabel}
      </p>
      <h3 className="font-heading text-soyl-white text-lg leading-snug group-hover:text-mint transition-colors line-clamp-2">
        {item.title}
      </h3>
    </Link>
  )
}

// Decorative placeholder for cards without a cover image. Different
// gradient per content type so blogs and whitepapers stay visually
// distinct in a unified grid.
function CardPlaceholder({ type, title }: { type: LibraryCard['_type']; title: string }) {
  const initial = title.charAt(0).toUpperCase()
  const isPaper = type === 'whitepaper'
  return (
    <div
      className={[
        'w-full h-full flex items-center justify-center',
        isPaper
          ? 'bg-[radial-gradient(circle_at_30%_20%,rgba(175,208,204,0.18),transparent_60%),linear-gradient(135deg,#0d1214_0%,#0b1114_100%)]'
          : 'bg-[radial-gradient(circle_at_70%_80%,rgba(175,208,204,0.14),transparent_60%),linear-gradient(135deg,#0a0d0f_0%,#0d1214_100%)]',
      ].join(' ')}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="font-display text-mint/40 text-5xl">{initial}</span>
        <span className="text-mint/40 text-[9px] font-mono uppercase tracking-[0.22em]">
          {isPaper ? 'Whitepaper' : 'Blog'}
        </span>
      </div>
    </div>
  )
}
