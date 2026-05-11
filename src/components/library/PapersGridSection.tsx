'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { BookOpen, Sparkles } from 'lucide-react'
import { MOCK_PAPERS, MOCK_BLOGS } from '@/lib/mockData'
import PaperCard from './PaperCard'

export default function PapersGridSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-obsidian py-16 md:py-24 border-b border-mint/5 relative">
      <div className="max-w-content mx-auto px-6 lg:px-16 w-full">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-2 h-2 rounded-full bg-mint animate-[pulse_3s_ease-in-out_infinite]" />
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-soyl-white">Whitepapers</h2>
          <span className="ml-auto font-mono text-[10px] tracking-widest text-graphite/60 uppercase">
            {MOCK_PAPERS.length} {MOCK_PAPERS.length === 1 ? 'paper' : 'papers'} · more coming
          </span>
        </div>

        {/* Papers list — single column, paper takes the full width of a max-w-3xl card */}
        <div className="flex flex-col gap-6 mb-20">
          {MOCK_PAPERS.map((paper, i) => (
            <motion.div
              key={paper.slug}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.15 + i * 0.1, ease: 'easeOut' }}
              className="w-full max-w-3xl mx-auto"
            >
              <PaperCard paper={paper} />
            </motion.div>
          ))}

          {/* Placeholder: indicate more papers are coming. Only renders when exactly one paper exists. */}
          {MOCK_PAPERS.length === 1 && (
            <motion.div
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.4, ease: 'easeOut' }}
              className="w-full max-w-3xl mx-auto"
            >
              <div className="border border-dashed border-mint/15 rounded-3xl p-10 md:p-12 flex flex-col items-center text-center bg-mint/[0.015]">
                <div className="w-12 h-12 rounded-2xl bg-mint/5 border border-mint/15 flex items-center justify-center mb-5">
                  <Sparkles className="text-mint/70" size={20} />
                </div>
                <p className="font-heading font-medium text-soyl-white/80 text-lg mb-2">
                  Another paper is in the pipeline.
                </p>
                <p className="text-graphite text-sm max-w-md">
                  Working drafts on voice latency, edge inference, and the architecture behind Butler AI. We&apos;ll add them here as they finish review.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Engineering blog teaser — shown only when there are no real blog posts yet */}
        {MOCK_BLOGS.length === 0 && (
          <div className="max-w-3xl mx-auto pt-10 border-t border-mint/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-mint/5 border border-mint/15 flex items-center justify-center shrink-0">
                <BookOpen className="text-mint/70" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-heading font-semibold text-soyl-white text-base">Engineering blog · coming soon</p>
                <p className="text-graphite text-sm leading-relaxed">
                  Shorter writeups on what we&apos;re building, what we&apos;re measuring, and what we&apos;re learning in production. First posts ship alongside the next pilot deployment.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
