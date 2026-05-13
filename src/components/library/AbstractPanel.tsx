interface Props {
  abstract: string
  tags?: string[] | null
}

// Whitepaper abstract panel: elevated card with a mint left rule. Tags
// render as small pills below the abstract.
export default function AbstractPanel({ abstract, tags }: Props) {
  return (
    <section
      aria-labelledby="abstract-heading"
      className="bg-card-bg border border-mint/10 rounded-2xl p-6 md:p-8 my-10 relative overflow-hidden"
    >
      <div className="absolute left-0 top-6 bottom-6 w-px bg-mint/40" aria-hidden />
      <p id="abstract-heading" className="text-mint text-[10px] tracking-[0.22em] uppercase font-mono mb-3">
        Abstract
      </p>
      <p className="text-soyl-white/90 text-base md:text-lg leading-relaxed whitespace-pre-line">
        {abstract}
      </p>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {tags.map(t => (
            <span
              key={t}
              className="text-[10px] tracking-[0.16em] uppercase font-mono text-graphite border border-mint/15 rounded-full px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </section>
  )
}
