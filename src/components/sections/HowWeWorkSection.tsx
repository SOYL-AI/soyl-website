import SectionLabel from '@/components/ui/SectionLabel'
import ImageMarquee from '@/components/ui/ImageMarquee'

const STEPS = [
  { number: '01', title: 'Discover', description: 'We begin by deeply understanding the problem space, user needs, and business context.' },
  { number: '02', title: 'Design',   description: 'Rapid prototyping and design thinking translate insights into tangible solutions.' },
  { number: '03', title: 'Build',    description: 'Engineering rigour and AI-first thinking produce robust, scalable products.' },
  { number: '04', title: 'Iterate',  description: 'Continuous feedback loops and real-world data drive ongoing refinement.' },
]

// Temporary placeholder images
const MARQUEE_IMAGES = Array.from({ length: 6 }).map((_, i) => `/images/placeholder-${i}.jpg`)

export default function HowWeWorkSection() {
  return (
    <section className="bg-elevated py-16 md:py-24 border-y border-mint/5">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <SectionLabel>How We Work</SectionLabel>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-soyl-white mb-12">
          Our Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left — Step list */}
          <div className="space-y-8">
            {STEPS.map((step, i) => (
              <div key={step.number} className="flex gap-6 items-start">
                <span className={`font-display font-bold text-4xl ${i === 0 ? 'text-mint' : 'text-graphite/40'}`}>
                  {step.number}
                </span>
                <div>
                  <h3 className={`font-heading font-bold text-lg mb-1 ${i === 0 ? 'text-soyl-white' : 'text-graphite'}`}>
                    {step.title}
                  </h3>
                  <p className="text-graphite text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
            <a href="/how-we-work" className="text-soyl-white text-sm font-medium hover:text-mint transition-colors inline-block mt-4">
              See Full Process →
            </a>
          </div>

          {/* Right — Visual placeholder */}
          <div className="aspect-video bg-obsidian/50 border border-mint/10 rounded-xl flex items-center justify-center">
            <span className="text-graphite/40 text-sm">Step Visual — Phase 3</span>
          </div>
        </div>

        {/* Infinite Image Marquee */}
        <ImageMarquee images={MARQUEE_IMAGES} />
      </div>
    </section>
  )
}
