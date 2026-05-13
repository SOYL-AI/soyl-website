import type { PortableTextBlock } from '@portabletext/types'

export interface TocEntry {
  id: string
  text: string
  level: 2 | 3
}

// Slugify in a way the TOC and the PortableTextRenderer both agree on.
// Anything else and the scroll-spy IntersectionObserver fails silently.
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

interface PortableTextChild {
  _type?: string
  text?: string
}

function blockText(b: PortableTextBlock): string {
  // Safely extract plain text from a Portable Text block. We only walk
  // the `_type: 'span'` children that carry user text.
  const children = (b as unknown as { children?: PortableTextChild[] }).children
  if (!Array.isArray(children)) return ''
  return children
    .filter(c => c?._type === 'span' && typeof c?.text === 'string')
    .map(c => c.text as string)
    .join('')
}

export function extractToc(body: PortableTextBlock[] | undefined | null): TocEntry[] {
  if (!body) return []
  const out: TocEntry[] = []
  for (const block of body) {
    const style = (block as unknown as { style?: string }).style
    if (style === 'h2' || style === 'h3') {
      const text = blockText(block).trim()
      if (!text) continue
      out.push({
        id: slugifyHeading(text),
        text,
        level: style === 'h2' ? 2 : 3,
      })
    }
  }
  return out
}
