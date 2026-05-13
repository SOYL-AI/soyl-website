import { Link } from 'next-view-transitions'
import { ArrowLeft } from 'lucide-react'

interface Crumb {
  label: string
  href?: string
  active?: boolean
}

interface Props {
  crumbs: Crumb[]
}

// Matches the Vapi reference: `← BACK TO LIBRARY / CATEGORY / CURRENT`
// with the active crumb in mint and dividers in graphite.
export default function ArticleBreadcrumb({ crumbs }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-[10px] md:text-xs tracking-[0.22em] uppercase font-mono flex flex-wrap items-center gap-2 text-graphite"
    >
      {crumbs.map((c, i) => {
        const isFirst = i === 0
        const isLast = i === crumbs.length - 1
        const content = (
          <span className={c.active || isLast ? 'text-mint' : 'text-graphite hover:text-soyl-white transition-colors'}>
            {isFirst && <ArrowLeft size={12} className="inline -mt-0.5 mr-1" aria-hidden />}
            {c.label}
          </span>
        )
        return (
          <span key={`${c.label}-${i}`} className="flex items-center gap-2">
            {c.href && !c.active && !isLast ? <Link href={c.href}>{content}</Link> : content}
            {!isLast && <span className="text-graphite/40">/</span>}
          </span>
        )
      })}
    </nav>
  )
}
