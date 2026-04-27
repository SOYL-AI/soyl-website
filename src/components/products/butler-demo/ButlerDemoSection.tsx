import SectionLabel from '@/components/ui/SectionLabel'
import FadeInUp from '@/components/motion/FadeInUp'
import ButlerDemo from './ButlerDemo'
import PMSScreenshotsPanel from './PMSScreenshotsPanel'

export default function ButlerDemoSection() {
  return (
    <section id="try-butler" className="bg-elevated border-y border-mint/5 py-24 md:py-32 scroll-mt-24">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <FadeInUp>
          <SectionLabel>Live Demo</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-soyl-white mt-2 mb-4">
            Try Butler. No signup, no friction.
          </h2>
          <p className="text-graphite max-w-2xl mb-12 leading-relaxed">
            Butler AI is in production at a real hotel right now. Below is the same voice + RAG pipeline our pilot guests interact with. Talk to it. See what a multi-agent hospitality system feels like.
          </p>
        </FadeInUp>

        {/* Mobile: chat first, screenshots second. Desktop: screenshots left (3/5), chat right (2/5). */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div className="order-2 lg:order-1 lg:col-span-3 lg:sticky lg:top-24">
            <PMSScreenshotsPanel />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-2">
            <ButlerDemo />
          </div>
        </div>
      </div>
    </section>
  )
}
