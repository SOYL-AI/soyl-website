import { cn } from '@/lib/utils'

interface Props {
  variant?: 'soft' | 'numbered' | 'double'
  number?: string
  className?: string
}

const NUMBERED_LABEL: Record<string, string> = {
  '01': 'STORY',
  '02': 'PRODUCTS',
  '03': 'PROCESS',
}

export default function SectionDivider({ variant = 'soft', number, className }: Props) {
  if (variant === 'numbered') {
    const label = (number && NUMBERED_LABEL[number]) ?? 'CHAPTER'
    return (
      <div className={cn('relative h-px w-full', className)}>
        <div className="absolute inset-0 bg-mint/8" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-obsidian">
          <span className="font-caption text-xs tracking-[0.3em] text-mint/40 uppercase">
            <span className="text-mint/70">{number}</span>
            <span className="mx-2 text-mint/20">·</span>
            <span>{label}</span>
          </span>
        </div>
      </div>
    )
  }

  if (variant === 'double') {
    return (
      <div className={cn('relative w-full py-2', className)}>
        <div className="h-px w-full bg-mint/8" />
        <div className="h-px w-full bg-mint/8 mt-1" />
      </div>
    )
  }

  return (
    <div className={cn('relative h-px w-full', className)}>
      <div className="absolute inset-0 bg-mint/8" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[1px] bg-gradient-to-r from-transparent via-mint/30 to-transparent blur-[1px]" />
    </div>
  )
}
