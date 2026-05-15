import SectionLabel from '@/components/ui/SectionLabel'
import RolesPanel from './RolesPanel'
import type { JobPostingDoc } from '@/sanity/lib/types'

interface Props {
  jobs: JobPostingDoc[]
}

export default function RolesSection({ jobs }: Props) {
  return (
    <section
      id="open-positions"
      className="relative bg-elevated py-24 md:py-32 overflow-hidden border-b border-mint/5"
    >
      {/* Decorative dotted-mint motif — radial mask pinned top-right. Echoes
          the Vapi silhouette without breaking the dark palette. */}
      <div
        aria-hidden
        className="hidden md:block absolute top-12 right-0 w-[320px] h-[220px] pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(175, 208, 204, 0.55) 1.2px, transparent 1.4px)',
          backgroundSize: '14px 14px',
          maskImage:
            'radial-gradient(ellipse 60% 70% at 70% 50%, black 0%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 70% at 70% 50%, black 0%, transparent 75%)',
        }}
      />

      <div className="relative max-w-content mx-auto px-6 lg:px-16">
        <div className="mb-12 md:mb-14 max-w-3xl">
          <SectionLabel>Open positions</SectionLabel>
          <h2 className="font-heading font-bold text-soyl-white text-3xl md:text-5xl leading-tight mt-4">
            Featured roles.
          </h2>
        </div>

        <RolesPanel jobs={jobs} />
      </div>
    </section>
  )
}
