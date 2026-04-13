import type { Paper } from '@/lib/mockData'
import { Download, HardDrive } from 'lucide-react'

export default function PaperCard({ paper }: { paper: Paper }) {
  return (
    <div className="bg-obsidian border border-mint/10 rounded-3xl overflow-hidden p-6 md:p-8 group hover:border-mint/30 hover:bg-mint/[0.02] transition-colors duration-500 relative flex flex-col h-full w-full">
      
      {/* Background Artifact Glo  */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-mint/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-mint/10 transition-colors duration-500" />
      
      {/* Header Tag Ribbons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="bg-mint/10 border border-mint/20 text-mint text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-mono font-bold shadow-[0_0_10px_rgba(175,208,204,0.1)]">
          {paper.year}
        </span>
        {paper.tags.map(tag => (
          <span key={tag} className="border border-graphite/20 text-graphite text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-mono">
            {tag}
          </span>
        ))}
      </div>

      <h3 className="font-heading font-bold text-2xl md:text-[26px] text-soyl-white mb-4 group-hover:text-mint transition-colors relative z-10 leading-[1.2] tracking-tight">
        {paper.title}
      </h3>
      
      <div className="flex gap-2 flex-wrap mb-8 text-sm text-graphite/80 relative z-10 font-medium">
        {paper.authors.map((author, idx) => (
          <span key={author}>
            {author}{idx < paper.authors.length - 1 ? ',' : ''}
          </span>
        ))}
      </div>

      {/* Abstract Embed Panel */}
      <div className="bg-elevated/50 border border-mint/5 p-5 md:p-6 rounded-2xl mb-8 flex-1 relative z-10">
        <span className="text-mint/80 font-mono text-[10px] uppercase tracking-widest block mb-3 border-b border-mint/10 pb-2">Abstract</span>
        <p className="text-graphite text-sm leading-relaxed italic pr-2">
          &ldquo;{paper.abstract}&rdquo;
        </p>
      </div>

      {/* Control Actions Bottom Bar */}
      <div className="flex items-center gap-3 mt-auto relative z-10">
        <button className="flex-1 flex justify-center items-center gap-2 py-3 md:py-4 rounded-2xl bg-mint/5 border border-mint/10 text-mint font-medium text-sm hover:bg-mint hover:text-obsidian hover:shadow-lg hover:shadow-mint/20 transition-all duration-300">
          <Download size={16} />
          Fetch Document
        </button>
        <button className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center rounded-2xl border border-mint/10 text-mint hover:bg-mint/10 hover:border-mint/30 transition-all duration-300">
          <HardDrive size={18} />
        </button>
      </div>

    </div>
  )
}
