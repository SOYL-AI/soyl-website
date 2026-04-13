'use client'
import { useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import StaggerContainer from '@/components/motion/StaggerContainer'
import FadeInUp from '@/components/motion/FadeInUp'

const TEAM = [
  { name: 'Alice Smith', role: 'CEO & Founder', bio: 'Former Lead AI Researcher.' },
  { name: 'Bob Jones', role: 'CTO', bio: 'Systems architect and full-stack engineer.' },
  { name: 'Charlie Lee', role: 'Head of Design', bio: 'Obsessed with kinetic typography.' },
  { name: 'Diana Prince', role: 'Product Manager', bio: 'Bridging the gap between engineering and empathy.' },
]

// Distinct gradient placeholder per card — replaced with real photos when available
const CARD_GRADIENTS = [
  'radial-gradient(ellipse at 50% 30%, rgba(175,208,204,0.16) 0%, transparent 65%)',
  'linear-gradient(135deg, rgba(175,208,204,0.14) 0%, transparent 55%)',
  'radial-gradient(circle at 75% 25%, rgba(175,208,204,0.18) 0%, transparent 55%)',
  'radial-gradient(ellipse at 25% 60%, rgba(175,208,204,0.14) 0%, transparent 52%)',
]

export default function TeamSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-obsidian py-24">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div className="mb-16">
          <SectionLabel>Our Team</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-soyl-white mt-2 mb-4">
            The minds behind the machine
          </h2>
          <p className="text-graphite max-w-lg">
            A small, elite group of researchers, designers, and engineers united by a common vision.
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <FadeInUp key={i} className="group relative rounded-xl h-[400px] overflow-hidden bg-card-bg border border-mint/10 cursor-pointer">

              {/* Placeholder visual — upper portion */}
              <div className="absolute inset-0" style={{ backgroundImage: CARD_GRADIENTS[i] }} />
              {/* Grid texture */}
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: 'linear-gradient(rgba(175,208,204,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(175,208,204,0.07) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              {/* Avatar placeholder circle */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border border-mint/20 bg-mint/5 flex items-center justify-center">
                <span className="text-mint/40 text-2xl font-display font-bold">{member.name[0]}</span>
              </div>

              {/* Mint flood overlay on hover — plain div, CSS-only */}
              <div className="absolute inset-0 bg-mint opacity-0 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content pinned to bottom */}
              <div className="absolute inset-0 flex flex-col justify-end overflow-hidden">
                <div
                  className={[
                    'relative z-10 p-6',
                    'transition-transform duration-300 ease-out',
                    prefersReduced ? '' : 'translate-y-8 group-hover:translate-y-0',
                  ].join(' ')}
                >
                  <h3 className="font-heading font-bold text-xl text-soyl-white group-hover:text-obsidian transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-mint text-sm font-semibold mb-2 group-hover:text-obsidian/80 transition-colors duration-300">
                    {member.role}
                  </p>
                  <p
                    className={[
                      'text-graphite text-xs tracking-wide group-hover:text-obsidian/90',
                      'transition-opacity duration-300',
                      prefersReduced ? '' : 'opacity-0 group-hover:opacity-100',
                    ].join(' ')}
                  >
                    {member.bio}
                  </p>
                </div>

                {/* Bottom gradient scrim — hides on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-obsidian to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
              </div>
            </FadeInUp>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
