'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MOCK_BLOGS, MOCK_PAPERS } from '@/lib/mockData'
import BlogCard from '@/components/library/BlogCard'
import PaperCard from '@/components/library/PaperCard'

export default function LibraryLayoutSection() {
  const [activeBlogFilter, setActiveBlogFilter] = useState('All')
  const [activePaperYear, setActivePaperYear] = useState('All')

  // Pagination states
  const [visibleBlogs, setVisibleBlogs] = useState(2)
  const [visiblePapers, setVisiblePapers] = useState(2)

  const prefersReduced = useReducedMotion()

  const blogCategories = ['All', 'Engineering', 'Architecture', 'Design', 'Philosophy']
  const paperYears = ['All', '2026', '2025', '2024', '2023']

  const filteredBlogs = activeBlogFilter === 'All'
    ? MOCK_BLOGS
    : MOCK_BLOGS.filter(blog => blog.tags.includes(activeBlogFilter))

  const filteredPapers = activePaperYear === 'All'
    ? MOCK_PAPERS
    : MOCK_PAPERS.filter(paper => paper.year.toString() === activePaperYear)

  // Isolate bounded slices simulating async pagination chunk blocks
  const pagedBlogs = filteredBlogs.slice(0, visibleBlogs)
  const pagedPapers = filteredPapers.slice(0, visiblePapers)

  // Explicit swap handlers resetting pagination bounds to 2
  const handleBlogFilter = (cat: string) => {
    setActiveBlogFilter(cat)
    setVisibleBlogs(2)
  }
  
  const handlePaperFilter = (year: string) => {
    setActivePaperYear(year)
    setVisiblePapers(2)
  }

  return (
    <section className="bg-obsidian py-16 md:py-24 border-b border-mint/5 relative min-h-[100vh]">
      <div className="max-w-content mx-auto px-6 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">
          
          {/* Left Column: Blogs */}
          <div className="relative">
             {/* Sticky Header Block */}
             <div className="sticky top-24 z-40 bg-obsidian/90 backdrop-blur-md pt-4 pb-6 border-b border-mint/10 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 rounded-full bg-mint animate-[pulse_3s_ease-in-out_infinite]" />
                  <h2 className="font-heading font-bold text-3xl text-soyl-white">Engineering Logs</h2>
                </div>
                {/* Interactive Dynamic Filters */}
                <div className="flex flex-wrap gap-2">
                  {blogCategories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => handleBlogFilter(cat)}
                      className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-300 font-mono ${activeBlogFilter === cat ? 'bg-mint text-obsidian border-mint font-bold shadow-[0_0_15px_rgba(175,208,204,0.3)]' : 'bg-transparent text-graphite border-mint/20 hover:border-mint/50 hover:text-soyl-white hover:bg-mint/5'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
             </div>
             
             {/* Dynamic Framer Motion Blog Feed Injection */}
             <div className="min-h-[50vh] flex flex-col gap-6 w-full" id="blog-injection-zone">
                <AnimatePresence mode="popLayout">
                  {pagedBlogs.map((blog) => (
                    <motion.div
                      key={blog.slug}
                      layout
                      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      transition={prefersReduced ? { duration: 0 } : { duration: 0.4, type: "spring", bounce: 0.2 }}
                      className="w-full"
                    >
                      <BlogCard blog={blog} />
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {pagedBlogs.length === 0 && (
                  <motion.div initial={{ opacity: prefersReduced ? 1 : 0 }} animate={{ opacity: 1 }} className="py-12 border border-mint/10 border-dashed rounded-3xl flex items-center justify-center">
                     <span className="text-graphite font-mono text-sm tracking-widest uppercase">No sequence matched.</span>
                  </motion.div>
                )}

                {filteredBlogs.length > visibleBlogs && (
                  <div className="pt-4 flex justify-center w-full">
                    <button 
                      onClick={() => setVisibleBlogs(prev => prev + 2)}
                      className="text-mint font-medium border border-mint/20 bg-mint/5 px-8 py-3 rounded-full hover:bg-mint hover:text-obsidian hover:shadow-[0_0_20px_rgba(175,208,204,0.2)] transition-all duration-300 text-sm tracking-wide"
                    >
                      Load More Logs
                    </button>
                  </div>
                )}
             </div>
          </div>

          {/* Right Column: Research Papers */}
          <div className="relative z-30">
             {/* Sticky Header Block */}
             <div className="sticky top-24 z-40 bg-obsidian/90 backdrop-blur-md pt-4 pb-6 border-b border-mint/10 mb-8 mt-12 lg:mt-0">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-mint opacity-70">◈</span>
                  <h2 className="font-heading font-bold text-3xl text-soyl-white">Research Nexus</h2>
                </div>
                {/* Interactive Dynamic Filters */}
                <div className="flex flex-wrap gap-2">
                  {paperYears.map(year => (
                    <button 
                      key={year}
                      onClick={() => handlePaperFilter(year)}
                      className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-300 font-mono ${activePaperYear === year ? 'bg-mint text-obsidian border-mint font-bold shadow-[0_0_15px_rgba(175,208,204,0.3)]' : 'bg-transparent text-graphite border-mint/20 hover:border-mint/50 hover:text-soyl-white hover:bg-mint/5'}`}
                    >
                      {year === 'All' ? 'All Years' : year}
                    </button>
                  ))}
                </div>
             </div>
             
             {/* Dynamic Framer Motion Paper Feed Injection */}
             <div className="min-h-[50vh] flex flex-col gap-6 w-full" id="paper-injection-zone">
                <AnimatePresence mode="popLayout">
                  {pagedPapers.map((paper) => (
                    <motion.div
                      key={paper.slug}
                      layout
                      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      transition={prefersReduced ? { duration: 0 } : { duration: 0.4, type: "spring", bounce: 0.2 }}
                      className="w-full"
                    >
                      <PaperCard paper={paper} />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {pagedPapers.length === 0 && (
                  <motion.div initial={{ opacity: prefersReduced ? 1 : 0 }} animate={{ opacity: 1 }} className="py-12 border border-mint/10 border-dashed rounded-3xl flex items-center justify-center">
                     <span className="text-graphite font-mono text-sm tracking-widest uppercase">No sequence matched.</span>
                  </motion.div>
                )}

                {filteredPapers.length > visiblePapers && (
                  <div className="pt-4 flex justify-center w-full">
                    <button 
                      onClick={() => setVisiblePapers(prev => prev + 2)}
                      className="text-mint font-medium border border-mint/20 bg-mint/5 px-8 py-3 rounded-full hover:bg-mint hover:text-obsidian hover:shadow-[0_0_20px_rgba(175,208,204,0.2)] transition-all duration-300 text-sm tracking-wide"
                    >
                      Fetch Archive
                    </button>
                  </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}
