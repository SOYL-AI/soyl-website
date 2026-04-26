'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

// Define the geometric structural mapping for the Bento grid.
const BENTO_BLOCKS = [
  {
    id: 1,
    size: 'col-span-1 md:col-span-2 row-span-2',
    style: 'bg-gradient-to-br from-mint/10 to-transparent',
    content: (
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
        <h3 className="font-heading font-bold text-3xl text-soyl-white mb-2 relative z-10">Bengaluru HQ</h3>
        <p className="text-graphite text-sm max-w-xs relative z-10">A small team, a shared room, no cubicles. Where most of our shipping happens.</p>
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-mint/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      </div>
    )
  },
  {
    id: 2,
    size: 'col-span-1 row-span-1',
    style: 'bg-mint/[0.02]',
    content: (
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-[120px] h-[120px] border-[1px] border-mint/30 rounded-full border-dashed animate-[spin_30s_linear_infinite]" />
        <div className="absolute w-[60px] h-[60px] border-[1px] border-mint/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
      </div>
    )
  },
  {
    id: 3,
    size: 'col-span-1 row-span-1 md:row-span-2',
    style: 'bg-obsidian border-mint/10 relative overflow-hidden',
    content: (
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMS41IiBmaWxsPSJyZ2JhKDE3NSwgMjA4LCAyMDQsIDAuMykiLz4KPC9zdmc+')] opacity-60">
        <div className="absolute bottom-6 left-6">
          <p className="font-mono text-mint/80 text-[10px] tracking-widest uppercase border border-mint/20 px-3 py-1 rounded bg-obsidian">Grid View</p>
        </div>
      </div>
    )
  },
  {
    id: 4,
    size: 'col-span-1 row-span-1',
    style: 'bg-gradient-to-tl from-indigo-500/10 to-transparent',
    content: (
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="font-heading font-medium text-lg text-soyl-white">Node Networks</h3>
        <p className="text-graphite text-xs mt-1">Cross-team daily syncs.</p>
      </div>
    )
  },
  {
    id: 5,
    size: 'col-span-1 md:col-span-2 row-span-1',
    style: 'bg-mint/[0.02]',
    content: (
      <div className="absolute inset-0 flex items-center justify-center p-8">
         <h3 className="font-heading font-medium text-xl text-graphite text-center max-w-sm leading-relaxed">
            Iteration over perfection — across every layer of the stack.
         </h3>
      </div>
    )
  },
  {
    id: 6,
    size: 'col-span-1 md:col-span-2 row-span-1',
    style: 'bg-mint/[0.05]',
    content: (
      <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-10">
        <h3 className="font-heading font-bold text-2xl text-soyl-white mb-2">Hardware Lab</h3>
        <p className="text-graphite text-sm max-w-xs">Where Jetson Orin nodes get prototyped, benched, and sometimes broken.</p>
      </div>
    )
  }
]

export default function CultureGallerySection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-obsidian border-b border-mint/5 py-24 md:py-32 overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-16 w-full">
        
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col items-start text-left">
            <SectionLabel>Inside the Lab</SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-soyl-white tracking-tight mt-2">
              Atmosphere
            </h2>
            <p className="text-graphite mt-4 max-w-md leading-relaxed">
              A fractional glimpse into the spaces, structures, and visual artifacts that directly shape our engineering culture.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={prefersReduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[220px] gap-4 md:gap-6"
        >
          {BENTO_BLOCKS.map((block) => (
            <motion.div
              key={block.id}
              variants={prefersReduced ? {} : fadeInUp}
              className={`relative rounded-3xl border border-mint/10 overflow-hidden group hover:border-mint/30 transition-all duration-500 ${block.size} ${block.style}`}
            >
               {/* Hover Overlay */}
               <div className="absolute inset-0 bg-mint/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
               {block.content}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
