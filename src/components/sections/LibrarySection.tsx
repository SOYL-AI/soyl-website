'use client'
import { Link } from 'next-view-transitions'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { motion, useReducedMotion } from 'framer-motion'
import StaggerContainer from '@/components/motion/StaggerContainer'
import FadeInUp from '@/components/motion/FadeInUp'
import { slideInLeft, slideInRight } from '@/lib/motion'

export default function LibrarySection() {
  const prefersReduced = useReducedMotion()
  return (
    <section className="bg-obsidian py-16 md:py-24 overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <StaggerContainer>
          <FadeInUp><SectionLabel>Library</SectionLabel></FadeInUp>
          <FadeInUp>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-soyl-white mb-12">
              Insights &amp; Research
            </h2>
          </FadeInUp>
        </StaggerContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative">
          {/* Blog column */}
          <motion.div
            variants={prefersReduced ? {} : slideInLeft}
            initial={prefersReduced ? {} : 'hidden'}
            whileInView={prefersReduced ? {} : 'visible'}
            viewport={{ once: true, margin: '-60px' }}
            className="md:pr-12 pb-8 md:pb-0 group/blog"
          >
            <p className="text-mint text-xs tracking-widest uppercase mb-6">Latest Blog</p>
            <div className="w-full aspect-video bg-card-bg rounded-xl mb-4 flex items-center justify-center group-hover/blog:-translate-y-1.5 transition-transform duration-200">
              <span className="text-graphite/30 text-sm">Cover Image</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-soyl-white mb-2">
              Blog Post Title Placeholder
            </h3>
            <p className="text-graphite text-xs mb-3">Mar 2026 · 5 min read</p>
            <p className="text-graphite text-sm leading-relaxed mb-4">
              A brief excerpt of the blog post content providing a preview of the full article…
            </p>
            <Link href="/library" className="text-mint text-sm hover:gap-2 inline-flex items-center gap-1 transition-all duration-200">
              Read →
            </Link>
          </motion.div>
          
          {/* Central Divider */}
          <motion.div
            initial={prefersReduced ? {} : { scaleY: 0 }}
            whileInView={prefersReduced ? {} : { scaleY: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-mint/20 origin-top -translate-x-1/2"
          />

          {/* Research column */}
          <motion.div
            variants={prefersReduced ? {} : slideInRight}
            initial={prefersReduced ? {} : 'hidden'}
            whileInView={prefersReduced ? {} : 'visible'}
            viewport={{ once: true, margin: '-60px' }}
            className="md:pl-12 pt-8 md:pt-0 group/research"
          >
            <p className="text-mint text-xs tracking-widest uppercase mb-6">Research Papers</p>
            <div className="group-hover/research:-translate-y-1.5 transition-transform duration-200">
              <span className="bg-mint/10 text-mint text-xs px-3 py-1 rounded-full inline-block mb-4">Research Paper</span>
              <h3 className="font-heading font-bold text-lg text-soyl-white mb-2">
                Research Paper Title Placeholder
              </h3>
              <p className="text-graphite text-xs mb-3">Author A, Author B · 2024</p>
              <p className="text-graphite text-sm leading-relaxed mb-4">
                A brief abstract of the research paper providing insight into the methodology and findings…
              </p>
              <Link href="/library" className="text-mint text-sm hover:gap-2 inline-flex items-center gap-1 transition-all duration-200">
                View Paper →
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button href="/library">Explore Full Library →</Button>
        </motion.div>
      </div>
    </section>
  )
}
