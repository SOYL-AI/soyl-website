import { cn } from '@/lib/utils'

interface Props {
  number: string
  label?: string
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}

export default function EditorialMarker({
  number,
  label = 'SECTION',
  position = 'top-right',
  className,
}: Props) {
  const positionClass = {
    'top-left':     'top-8 left-6 lg:left-16',
    'top-right':    'top-8 right-6 lg:right-16',
    'bottom-left':  'bottom-8 left-6 lg:left-16',
    'bottom-right': 'bottom-8 right-6 lg:right-16',
  }[position]

  return (
    <div className={cn(
      'absolute font-caption text-xs tracking-[0.3em] text-mint/40 uppercase select-none pointer-events-none z-10',
      positionClass,
      className,
    )}>
      <span className="text-mint/60">{number}</span>
      <span className="mx-2 text-mint/20">/</span>
      <span>{label}</span>
    </div>
  )
}
