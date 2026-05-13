'use client'

import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import StaggerContainer from '@/components/motion/StaggerContainer'
import FadeInUp from '@/components/motion/FadeInUp'
import { slideInLeft, slideInRight } from '@/lib/motion'
import { urlFor } from '@/sanity/lib/image'
import { isSanityConfigured } from '@/sanity/env'
import type { LibraryCard } from '@/sanity/lib/types'
import { formatCardDate, hrefForCard, summaryText } from '@/components/library/cardUtils'

interface Props {
  latestBlog: LibraryCard | null
  latestPaper: LibraryCard | null
}

// Homepage Library preview. Keeps the existing two-column slide-in
// animation but populates with real data from Sanity (or the mock
// fallback during local dev). Renders graceful empty states per column.
export default function LibrarySectionView({ latestBlog, latestPaper }: Props) {
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-obsidian py-16 md:py-24 overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <StaggerContainer>
          <FadeInUp>
            <SectionLabel>Library</SectionLabel>
          </FadeInUp>
          <FadeInUp>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-soyl-white mb-12">
              Insights &amp; Research
            </h2>
          </FadeInUp>
        </StaggerContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative">
          {/* Blog column */}
          <motion.div
            variants={prefersReduced ? {} : slideInLeft}
            initial={prefersReduced ? {} : 'hidden'}
            whileInView={prefersReduced ? {} : 'visible'}
            viewport={{ once: true, margin: '-60px' }}
            className="md:pr-12 pb-8 md:pb-0 group/blog"
          >
            <p className="text-mint text-xs tracking-widest uppercase mb-6">Latest Blog</p>
            {latestBlog ? <BlogTeaser item={latestBlog} /> : <EmptyTeaser type="blog" />}
          </motion.div>

          {/* Central Divider */}
          <motion.div
            initial={prefersReduced ? {} : { scaleY: 0 }}
            whileInView={prefersReduced ? {} : { scaleY: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-mint/20 origin-top -translate-x-1/2"
          />

          {/* Research column */}
          <motion.div
            variants={prefersReduced ? {} : slideInRight}
            initial={prefersReduced ? {} : 'hidden'}
            whileInView={prefersReduced ? {} : 'visible'}
            viewport={{ once: true, margin: '-60px' }}
            className="md:pl-12 pt-8 md:pt-0 group/research"
          >
            <p className="text-mint text-xs tracking-widest uppercase mb-6">Research Papers</p>
            {latestPaper ? <PaperTeaser item={latestPaper} /> : <EmptyTeaser type="paper" />}
          </motion.div>
        </div>

        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button href="/library">Explore Full Library →</Button>
        </motion.div>
      </div>
    </section>
  )
}

function BlogTeaser({ item }: { item: LibraryCard }) {
  const href = hrefForCard(item)
  const hasImage = Boolean(item.coverImage && isSanityConfigured)
  const coverUrl = hasImage ? urlFor(item.coverImage!).width(800).height(450).fit('crop').url() : null

  return (
    <Link href={href} className="block">
      <div className="w-full aspect-video bg-card-bg rounded-xl mb-4 flex items-center justify-center overflow-hidden relative group-hover/blog:-translate-y-1.5 transition-transform duration-200 border border-mint/10">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
          />
        ) : (
          <span className="text-graphite/30 text-sm">Cover Image</span>
        )}
      </div>
      <h3 className="font-heading font-bold text-lg text-soyl-white mb-2">{item.title}</h3>
      <p className="text-graphite text-xs mb-3">
        {formatCardDate(item)}
        {item.readTime && ` · ${item.readTime} min read`}
      </p>
      <p className="text-graphite text-sm leading-relaxed mb-4">{summaryText(item, 180)}</p>
      <span className="text-mint text-sm hover:gap-2 inline-flex items-center gap-1 transition-all duration-200">
        Read →
      </span>
    </Link>
  )
}

function PaperTeaser({ item }: { item: LibraryCard }) {
  const href = hrefForCard(item)
  return (
    <Link href={href} className="block group-hover/research:-translate-y-1.5 transition-transform duration-200">
      <span className="bg-mint/10 text-mint text-xs px-3 py-1 rounded-full inline-block mb-4">
        Whitepaper
      </span>
      <h3 className="font-heading font-bold text-lg text-soyl-white mb-2">{item.title}</h3>
      <p className="text-graphite text-xs mb-3">
        {formatCardDate(item)}
        {item.pages && ` · ${item.pages} pages`}
      </p>
      <p className="text-graphite text-sm leading-relaxed mb-4">{summaryText(item, 220)}</p>
      <span className="text-mint text-sm hover:gap-2 inline-flex items-center gap-1 transition-all duration-200">
        View Paper →
      </span>
    </Link>
  )
}

function EmptyTeaser({ type }: { type: 'blog' | 'paper' }) {
  return (
    <div className="w-full p-8 rounded-xl border border-mint/10 bg-card-bg/40 text-center">
      <p className="text-graphite text-sm">
        {type === 'blog'
          ? 'First blog post is on the way.'
          : 'New research lands soon.'}
      </p>
    </div>
  )
}
