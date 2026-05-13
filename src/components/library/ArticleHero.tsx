import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { isSanityConfigured } from '@/sanity/env'
import type { SanityImageSource } from '@sanity/image-url'

interface Props {
  title: string
  subtitle?: string | null
  meta?: React.ReactNode
  coverImage?: SanityImageSource | null
}

// Article hero: large title, optional subtitle, optional meta row,
// optional cover image. Used by both blog and whitepaper detail pages.
export default function ArticleHero({ title, subtitle, meta, coverImage }: Props) {
  const hasImage = Boolean(coverImage && isSanityConfigured)
  const imgUrl = hasImage ? urlFor(coverImage!).width(1600).fit('max').url() : null

  return (
    <header className="pt-8 md:pt-12 pb-6 md:pb-10">
      <h1 className="font-display font-bold text-soyl-white text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-graphite text-lg md:text-xl leading-snug max-w-3xl">
          {subtitle}
        </p>
      )}
      {meta && <div className="mt-6 text-xs font-mono tracking-[0.18em] uppercase text-graphite">{meta}</div>}
      {imgUrl && (
        <div className="mt-10 relative aspect-[16/9] rounded-2xl overflow-hidden bg-card-bg border border-mint/10">
          <Image
            src={imgUrl}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
            className="object-cover"
          />
        </div>
      )}
    </header>
  )
}
