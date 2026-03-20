import { cn } from '@/lib/utils'

export default function MaxWidthWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('max-w-content mx-auto px-6 lg:px-16', className)}>{children}</div>
}
