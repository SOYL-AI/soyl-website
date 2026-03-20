import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Props {
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  href?: string
  className?: string
  onClick?: () => void
}

export default function Button({ children, variant = 'primary', href, className, onClick }: Props) {
  const base = 'inline-flex items-center gap-2 px-6 py-3 rounded text-sm tracking-wide transition-all duration-200 font-body cursor-pointer'
  const styles = {
    primary: 'border border-mint text-mint hover:bg-mint hover:text-obsidian',
    ghost:   'border border-graphite text-soyl-white hover:border-mint hover:text-mint',
  }
  const combined = cn(base, styles[variant], className)
  if (href) return <Link href={href} className={combined}>{children}</Link>
  return <button onClick={onClick} className={combined}>{children}</button>
}
