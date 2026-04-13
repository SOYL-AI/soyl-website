'use client'
import type { Blog } from '@/lib/mockData'
import Image from 'next/image'
import { Clock, ArrowUpRight } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'

export default function BlogCard({ blog }: { blog: Blog }) {
  const prefersReduced = useReducedMotion()

  return (
    <div className="bg-elevated border border-mint/10 rounded-3xl overflow-hidden group hover:border-mint/30 hover:bg-mint/[0.02] transition-colors duration-500 flex flex-col h-full w-full relative z-0">

      {/* Media Banner */}
      <div className="w-full h-[240px] relative overflow-hidden bg-obsidian border-b border-mint/10 group-hover:border-mint/30 transition-colors duration-500">
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className={[
              'object-cover transition-transform duration-700 ease-out opacity-70 group-hover:opacity-100',
              prefersReduced ? '' : 'group-hover:scale-[1.03]',
            ].join(' ')}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-tr from-mint/10 via-obsidian to-transparent flex items-center justify-center">
            {/* CSS Abstract Graphic Fallback */}
            <div className="w-[120px] h-[120px] rounded-full border border-mint/20 border-dashed animate-[spin_40s_linear_infinite] opacity-50" />
            <div className="absolute w-[60px] h-[60px] rounded-full border border-mint/10 animate-[spin_20s_linear_infinite_reverse] opacity-50" />
          </div>
        )}

        {/* Absolute Tags */}
        <div className="absolute top-4 left-4 flex gap-2">
          {blog.tags.map(tag => (
            <span key={tag} className="bg-obsidian/90 backdrop-blur-md border border-mint/20 text-mint text-[10px] uppercase tracking-widest px-3 py-[6px] rounded-md font-mono font-medium shadow-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content Typography */}
      <div className="p-6 md:p-8 flex flex-col flex-1">

        <div className="flex items-center justify-between text-graphite/60 text-xs font-mono uppercase tracking-widest mb-5">
          <span>{blog.date}</span>
          <div className="flex items-center gap-[6px]">
            <Clock size={12} className="text-mint/70" />
            <span>{blog.readTime} MIN READ</span>
          </div>
        </div>

        <h3 className="font-heading font-bold text-2xl md:text-[26px] text-soyl-white mb-3 group-hover:text-mint transition-colors leading-[1.2] tracking-tight">
          {blog.title}
        </h3>

        <p className="text-graphite text-sm leading-relaxed mb-8 flex-1">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-mint/5 group-hover:border-mint/20 transition-colors">
          <span className="text-sm font-medium text-soyl-white opacity-90">{blog.author}</span>
          <span className={[
            'w-10 h-10 rounded-full border border-mint/20 flex items-center justify-center text-mint group-hover:bg-mint group-hover:text-obsidian transition-all duration-300',
            prefersReduced ? '' : 'group-hover:-translate-y-1',
          ].join(' ')}>
            <ArrowUpRight size={16} />
          </span>
        </div>

      </div>
    </div>
  )
}
