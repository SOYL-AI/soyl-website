'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, FileText } from 'lucide-react'

interface Props {
  src: string
  title?: string
}

/**
 * Inline PDF embed with a graceful fallback for browsers/devices that
 * refuse to embed PDFs (mobile Safari, some hardened configs). Defers
 * loading the heavy iframe until the user scrolls near it so the rest
 * of the page stays snappy.
 */
export default function PdfEmbed({ src, title }: Props) {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Mobile Safari can't reliably display embedded PDFs. Show the
    // fallback there from the start. Deferred so the setState happens
    // outside the effect body (react-hooks/set-state-in-effect rule).
    const ua = window.navigator.userAgent
    const isMobileSafari = /iPad|iPhone|iPod/.test(ua) && /Safari/.test(ua) && !/CriOS|FxiOS/.test(ua)
    if (!isMobileSafari) {
      const t = setTimeout(() => setShouldLoad(true), 0)
      return () => clearTimeout(t)
    }
  }, [])

  return (
    <section className="my-10">
      <div className="flex items-center justify-between mb-3">
        <p className="text-mint text-[10px] tracking-[0.22em] uppercase font-mono">Paper</p>
        <a
          href={src}
          target="_blank"
          rel="noreferrer noopener"
          className="text-graphite hover:text-mint text-xs inline-flex items-center gap-1.5 transition-colors"
        >
          Open in new tab <ExternalLink size={12} />
        </a>
      </div>
      <div className="relative rounded-2xl overflow-hidden border border-mint/10 bg-card-bg aspect-[3/4] md:aspect-[16/10]">
        {shouldLoad ? (
          <iframe
            src={`${src}#view=FitH`}
            title={title ?? 'Whitepaper'}
            className="absolute inset-0 w-full h-full"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <FileText size={36} className="text-mint" />
            <p className="text-soyl-white text-base">PDF preview isn&apos;t supported on this device.</p>
            <a
              href={src}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 bg-mint text-obsidian rounded-full px-4 py-2 text-sm font-medium hover:bg-mint/90 transition-colors"
            >
              Open the PDF <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
