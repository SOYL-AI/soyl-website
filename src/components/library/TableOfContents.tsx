'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { TocEntry } from './toc'

interface Props {
  entries: TocEntry[]
}

/**
 * Sticky scroll-spy TOC modeled on the Vapi reference: numbered pills with
 * the active entry rendered as a filled white pill and inactive entries
 * as ghost outlines. Clicking a pill smooth-scrolls to the heading.
 *
 * Scroll-spy uses IntersectionObserver with a top-biased root margin so a
 * heading lights up as it crosses the top viewport edge, not the middle.
 */
export default function TableOfContents({ entries }: Props) {
  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (entries.length === 0 || typeof window === 'undefined') return

    // The active candidates are the headings whose IDs we know.
    const headings = entries
      .map(e => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null)
    if (headings.length === 0) return

    // top: -20% means "trigger when the heading is 20% from the top of
    // the viewport". bottom: -60% gives a narrow active band.
    observerRef.current = new IntersectionObserver(
      entries_ => {
        // Pick the topmost visible heading among intersecting entries.
        const visible = entries_
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    )

    for (const h of headings) observerRef.current.observe(h)
    return () => observerRef.current?.disconnect()
  }, [entries])

  if (entries.length === 0) return null

  return (
    <nav aria-label="Table of contents" className="flex flex-col gap-4">
      <p className="text-soyl-white text-base font-heading">Table of contents</p>
      <ol className="flex flex-col gap-1.5">
        {entries.map((e, i) => {
          const isActive = activeId === e.id
          return (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                onClick={ev => {
                  ev.preventDefault()
                  const el = document.getElementById(e.id)
                  if (!el) return
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  setActiveId(e.id)
                  history.replaceState(null, '', `#${e.id}`)
                }}
                className={cn(
                  'group flex items-center gap-3 rounded-full pl-2 pr-4 py-2 transition-colors',
                  isActive
                    ? 'bg-soyl-white text-obsidian'
                    : 'hover:bg-mint/5 text-graphite hover:text-soyl-white',
                  e.level === 3 && 'ml-6',
                )}
              >
                <span
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-mono shrink-0',
                    isActive
                      ? 'bg-obsidian text-soyl-white'
                      : 'border border-mint/15 text-graphite group-hover:border-mint/40 group-hover:text-soyl-white',
                  )}
                >
                  {i + 1}
                </span>
                <span
                  className={cn(
                    'text-[11px] tracking-[0.18em] uppercase font-mono truncate',
                    isActive ? 'text-obsidian font-medium' : '',
                  )}
                >
                  {e.text}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
