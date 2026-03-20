export default function SectionLabel({ children, className = '' }: { children: string; className?: string }) {
  return (
    <p className={`text-mint text-xs tracking-[0.22em] uppercase mb-3 flex items-center gap-3 ${className}`}>
      {children}
      <span className="w-10 h-px bg-mint opacity-40 inline-block" />
    </p>
  )
}
