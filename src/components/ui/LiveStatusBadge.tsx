import { cn } from '@/lib/utils'

interface Props {
  label: string
  className?: string
}

export default function LiveStatusBadge({ label, className }: Props) {
  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-3 py-1 rounded-full',
      'border border-mint/20 bg-mint/[0.04] backdrop-blur-sm',
      'font-caption text-[10px] tracking-[0.2em] uppercase text-mint',
      className,
    )}>
      <span className="w-1.5 h-1.5 rounded-full bg-mint pulse-mint" />
      {label}
    </div>
  )
}
