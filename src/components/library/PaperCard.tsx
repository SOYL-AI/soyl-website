import type { Paper } from '@/lib/mockData'
import { Download, ExternalLink, FileText } from 'lucide-react'

export default function PaperCard({ paper }: { paper: Paper }) {
  const hasPdf = Boolean(paper.pdfUrl)

  return (
    <div className="bg-obsidian border border-mint/10 rounded-3xl overflow-hidden p-6 md:p-10 group hover:border-mint/30 hover:bg-mint/[0.02] transition-colors duration-500 relative flex flex-col h-full w-full">

      {/* Background artifact glow */}
      <div className="absolute top-0 right-0 w-[260px] h-[260px] bg-mint/5 rounded-full blur-[90px] -translate-y-1/3 translate-x-1/4 pointer-events-none group-hover:bg-mint/10 transition-colors duration-500" />

      {/* Header tag ribbons */}
      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
        <span className="bg-mint/10 border border-mint/20 text-mint text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-mono font-bold shadow-[0_0_10px_rgba(175,208,204,0.1)]">
          {paper.date ?? paper.year}
        </span>
        {paper.tags.map(tag => (
          <span key={tag} className="border border-graphite/20 text-graphite text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-mono">
            {tag}
          </span>
        ))}
        {paper.pages && (
          <span className="ml-auto inline-flex items-center gap-1.5 text-graphite/60 text-[10px] uppercase tracking-widest font-mono">
            <FileText size={11} />
            {paper.pages} pages
          </span>
        )}
      </div>

      <h3 className="font-heading font-bold text-2xl md:text-3xl text-soyl-white mb-3 group-hover:text-mint transition-colors relative z-10 leading-[1.15] tracking-tight">
        {paper.title}
      </h3>

      {paper.subtitle && (
        <p className="text-soyl-white/70 text-base md:text-lg leading-snug mb-5 relative z-10 italic">
          {paper.subtitle}
        </p>
      )}

      <div className="flex gap-2 flex-wrap mb-8 text-sm text-graphite/80 relative z-10 font-medium">
        {paper.authors.map((author, idx) => (
          <span key={author}>
            {author}{idx < paper.authors.length - 1 ? ',' : ''}
          </span>
        ))}
      </div>

      {/* Abstract panel */}
      <div className="bg-elevated/50 border border-mint/5 p-5 md:p-6 rounded-2xl mb-8 flex-1 relative z-10">
        <span className="text-mint/80 font-mono text-[10px] uppercase tracking-widest block mb-3 border-b border-mint/10 pb-2">Abstract</span>
        <p className="text-graphite text-sm md:text-[15px] leading-relaxed pr-2">
          {paper.abstract}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-stretch gap-3 mt-auto relative z-10">
        {hasPdf ? (
          <a
            href={paper.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex justify-center items-center gap-2 py-3 md:py-4 rounded-2xl bg-mint text-obsidian font-medium text-sm hover:shadow-lg hover:shadow-mint/20 transition-all duration-300"
          >
            <ExternalLink size={16} />
            Read paper
          </a>
        ) : (
          <span className="flex-1 flex justify-center items-center gap-2 py-3 md:py-4 rounded-2xl bg-mint/5 border border-mint/10 text-graphite font-medium text-sm cursor-not-allowed">
            <FileText size={16} />
            Paper coming soon
          </span>
        )}
        {hasPdf && (
          <a
            href={paper.pdfUrl}
            download
            className="sm:w-14 flex justify-center items-center gap-2 py-3 md:py-4 rounded-2xl border border-mint/20 text-mint hover:bg-mint/10 hover:border-mint/40 transition-all duration-300"
            aria-label="Download PDF"
          >
            <Download size={18} />
          </a>
        )}
      </div>

    </div>
  )
}
