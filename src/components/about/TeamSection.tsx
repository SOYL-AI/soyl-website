'use client'
import { useState, type FocusEvent, type PointerEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import EditorialMarker from '@/components/ui/EditorialMarker'
import FadeInUp from '@/components/motion/FadeInUp'
import StaggerContainer from '@/components/motion/StaggerContainer'
import { cn } from '@/lib/utils'

type FounderId = 'ryan' | 'siddharth'
type TeamMember = { name: string; role: string }

const FOUNDERS: { id: FounderId; name: string; role: string; blurb: string }[] = [
  {
    id: 'ryan',
    name: 'Ryan Gomez',
    role: 'Co-founder & CTO',
    blurb: 'Engineer-founder. Leads engineering, product, and AI/ML. Builds the intelligence layer that powers everything we ship.',
  },
  {
    id: 'siddharth',
    name: 'Siddharth Priyatam',
    role: 'Co-founder & CEO',
    blurb: 'Operator-founder. Leads strategy, operations, partnerships, and growth. Owns how SOYL AI meets the world.',
  },
]

// Fill in real names later — JSX never needs to change.
const TECH_TEAM: TeamMember[] = [
  { name: '[Name]', role: 'AI/ML Engineer' },
  { name: '[Name]', role: 'AI/ML Engineer' },
  { name: '[Name]', role: 'Embedded Systems Engineer' },
  { name: '[Name]', role: 'Embedded Systems Engineer' },
  { name: '[Name]', role: 'Full-Stack Engineer' },
  { name: '[Name]', role: 'Full-Stack Engineer' },
  { name: '[Name]', role: 'Voice AI Engineer' },
  { name: '[Name]', role: 'Infrastructure Engineer' },
  { name: '[Name]', role: 'Mobile Engineer' },
]

const BUSINESS_TEAM: TeamMember[] = [
  { name: '[Name]', role: 'Operations Lead' },
  { name: '[Name]', role: 'Business Development' },
  { name: '[Name]', role: 'Business Development' },
  { name: '[Name]', role: 'Partnerships' },
  { name: '[Name]', role: 'Marketing' },
  { name: '[Name]', role: 'Marketing' },
  { name: '[Name]', role: 'Design' },
  { name: '[Name]', role: 'Customer Success' },
  { name: '[Name]', role: 'Finance & Legal' },
]

const TEAM_BY_FOUNDER: Record<FounderId, TeamMember[]> = {
  ryan: TECH_TEAM,
  siddharth: BUSINESS_TEAM,
}

// Placeholder visuals — same primitive used elsewhere in the team UI.
const CARD_GRADIENTS = [
  'radial-gradient(ellipse at 50% 30%, rgba(175,208,204,0.16) 0%, transparent 65%)',
  'linear-gradient(135deg, rgba(175,208,204,0.14) 0%, transparent 55%)',
  'radial-gradient(circle at 75% 25%, rgba(175,208,204,0.18) 0%, transparent 55%)',
  'radial-gradient(ellipse at 25% 60%, rgba(175,208,204,0.14) 0%, transparent 52%)',
]

const PANEL_ID = 'founder-team-panel'

function getInitial(name: string) {
  // [Name] placeholders display a neutral mark instead of "["
  return name.startsWith('[') ? '·' : name[0]
}

function GridTexture() {
  return (
    <div
      className="absolute inset-0 opacity-25 pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(175,208,204,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(175,208,204,0.07) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    />
  )
}

export default function TeamSection() {
  const prefersReduced = useReducedMotion()

  // hovered = mouse / keyboard focus; locked = mobile tap (sticky).
  const [hovered, setHovered] = useState<FounderId | null>(null)
  const [locked, setLocked] = useState<FounderId | null>(null)
  const activeId: FounderId | null = locked ?? hovered

  const handlePointerEnter = (id: FounderId) => (e: PointerEvent) => {
    // Touch/pen pointer-enter fires synthetically after tap on mobile — ignore.
    if (e.pointerType === 'mouse') setHovered(id)
  }

  const handleClick = (id: FounderId) => () => {
    setLocked(prev => (prev === id ? null : id))
  }

  // Clear hover only when the cursor leaves the founders row entirely. This
  // prevents flicker when the mouse crosses from one founder card to the other.
  const handleRowMouseLeave = () => setHovered(null)
  const handleRowBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setHovered(null)
    }
  }

  const transitionDuration = prefersReduced ? 0 : 0.25

  return (
    <section className="relative bg-atmosphere-warm py-24">
      <EditorialMarker number="04" label="TEAM" position="top-right" />
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-3">
            <SectionLabel>Our Team</SectionLabel>
            <span className="font-caption text-[10px] tracking-[0.25em] text-graphite/60">— 2 FOUNDERS · 18 BUILDERS</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-soyl-white mt-2 mb-4">
            Two founders. One vision. A team that ships.
          </h2>
          <p className="text-graphite max-w-xl">
            SOYL AI runs on a small, focused team split across engineering and operations. Hover a founder to meet the people they work with.
          </p>
        </div>

        {/* Founders row — outer div carries row-level mouseleave/blur to avoid
            clearing hover state when the cursor crosses between sibling cards. */}
        <div
          className="mb-8"
          onMouseLeave={handleRowMouseLeave}
          onBlur={handleRowBlur}
        >
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FOUNDERS.map((founder, i) => {
            const isActive = activeId === founder.id
            const isDimmed = activeId !== null && !isActive
            return (
              <FadeInUp key={founder.id}>
                <button
                  type="button"
                  id={`founder-card-${founder.id}`}
                  aria-controls={PANEL_ID}
                  aria-expanded={isActive}
                  onPointerEnter={handlePointerEnter(founder.id)}
                  onFocus={() => setHovered(founder.id)}
                  onClick={handleClick(founder.id)}
                  className={cn(
                    'group relative w-full text-left rounded-xl h-[320px] overflow-hidden bg-card-bg border transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-mint/60',
                    isActive
                      ? 'border-mint/40 shadow-[inset_0_0_40px_rgba(175,208,204,0.06)]'
                      : 'border-mint/10',
                    !prefersReduced && isActive && 'scale-[1.02]',
                    !prefersReduced && isDimmed && 'opacity-60'
                  )}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: CARD_GRADIENTS[i === 0 ? 0 : 2] }}
                  />
                  <GridTexture />

                  <div className="relative z-10 h-full flex flex-col items-center text-center px-6 pt-10 pb-6">
                    <div className="w-20 h-20 rounded-full border border-mint/20 bg-mint/5 flex items-center justify-center mb-5">
                      <span className="text-mint/60 text-2xl font-display font-bold">
                        {getInitial(founder.name)}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-2xl md:text-3xl text-soyl-white">
                      {founder.name}
                    </h3>
                    <p className="text-mint text-xs uppercase tracking-[0.18em] mt-2 mb-4">
                      {founder.role}
                    </p>
                    <p className="text-graphite text-sm leading-relaxed max-w-sm">
                      {founder.blurb}
                    </p>
                  </div>
                </button>
              </FadeInUp>
            )
          })}
          </StaggerContainer>
        </div>

        {/* Team reveal panel */}
        <div
          id={PANEL_ID}
          role="region"
          aria-live="polite"
          className="relative min-h-[180px]"
        >
          <AnimatePresence mode="wait">
            {activeId ? (
              <motion.div
                key={activeId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: transitionDuration, ease: 'easeOut' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {TEAM_BY_FOUNDER[activeId].map((member, i) => (
                  <div
                    key={i}
                    className="relative rounded-xl h-[140px] overflow-hidden bg-card-bg border border-mint/10"
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ backgroundImage: CARD_GRADIENTS[i % CARD_GRADIENTS.length] }}
                    />
                    <GridTexture />
                    <div className="relative z-10 h-full flex items-center gap-4 px-5">
                      <div className="w-12 h-12 rounded-full border border-mint/20 bg-mint/5 flex items-center justify-center shrink-0">
                        <span className="text-mint/50 text-lg font-display font-bold">
                          {getInitial(member.name)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-heading font-semibold text-base text-soyl-white truncate">
                          {member.name}
                        </p>
                        <p className="text-mint text-[11px] uppercase tracking-[0.16em] truncate">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: transitionDuration, ease: 'easeOut' }}
                className="flex items-center justify-center py-12"
              >
                <p className="text-graphite text-sm tracking-wide">
                  Hover a founder to meet their team.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
