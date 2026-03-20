import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

export default function LibrarySection() {
  return (
    <section className="bg-obsidian py-16 md:py-24">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <SectionLabel>Library</SectionLabel>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-soyl-white mb-12">
          Insights &amp; Research
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Blog column */}
          <div className="md:border-r border-mint/20 md:pr-12 pb-8 md:pb-0">
            <p className="text-mint text-xs tracking-widest uppercase mb-6">Latest Blog</p>
            <div className="w-full aspect-video bg-card-bg rounded-xl mb-4 flex items-center justify-center">
              <span className="text-graphite/30 text-sm">Cover Image</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-soyl-white mb-2">
              Blog Post Title Placeholder
            </h3>
            <p className="text-graphite text-xs mb-3">Mar 2026 · 5 min read</p>
            <p className="text-graphite text-sm leading-relaxed mb-4">
              A brief excerpt of the blog post content providing a preview of the full article…
            </p>
            <a href="/library" className="text-mint text-sm hover:gap-2 inline-flex items-center gap-1 transition-all duration-200">
              Read →
            </a>
          </div>

          {/* Research column */}
          <div className="md:pl-12 pt-8 md:pt-0">
            <p className="text-mint text-xs tracking-widest uppercase mb-6">Research Papers</p>
            <span className="bg-mint/10 text-mint text-xs px-3 py-1 rounded-full inline-block mb-4">Research Paper</span>
            <h3 className="font-heading font-bold text-lg text-soyl-white mb-2">
              Research Paper Title Placeholder
            </h3>
            <p className="text-graphite text-xs mb-3">Author A, Author B · 2024</p>
            <p className="text-graphite text-sm leading-relaxed mb-4">
              A brief abstract of the research paper providing insight into the methodology and findings…
            </p>
            <a href="/library" className="text-mint text-sm hover:gap-2 inline-flex items-center gap-1 transition-all duration-200">
              View Paper →
            </a>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button href="/library">Explore Full Library →</Button>
        </div>
      </div>
    </section>
  )
}
