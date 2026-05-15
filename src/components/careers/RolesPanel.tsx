'use client'

import { useMemo, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CAREER_TEAMS, CAREER_TEAM_LABELS } from '@/lib/careers-content'
import type { JobPostingDoc } from '@/sanity/lib/types'
import { staggerContainer, fadeInUp } from '@/lib/motion'

interface Props {
  jobs: JobPostingDoc[]
}

export default function RolesPanel({ jobs }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [, startTransition] = useTransition()
  const prefersReduced = useReducedMotion()

  const active = params.get('team') ?? 'all'

  // Only show team pills for teams that actually have at least one role.
  // No point showing "G&A" if every G&A role was archived.
  const teamsWithRoles = useMemo(() => {
    const seen = new Set(jobs.map(j => j.team))
    return CAREER_TEAMS.filter(t => seen.has(t.slug))
  }, [jobs])

  const filtered = useMemo(() => {
    if (active === 'all') return jobs
    return jobs.filter(j => j.team === active)
  }, [jobs, active])

  function setTeam(slug: string) {
    const next = new URLSearchParams(params.toString())
    if (slug === 'all') next.delete('team')
    else next.set('team', slug)
    const qs = next.toString()
    startTransition(() => router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false }))
  }

  const pills = [{ slug: 'all', title: 'All' }, ...teamsWithRoles]

  return (
    <div>
      {/* Filter pills */}
      <div
        className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-12"
        role="tablist"
        aria-label="Filter open roles by team"
      >
        {pills.map(p => {
          const isActive = active === p.slug
          return (
            <button
              key={p.slug}
              role="tab"
              aria-selected={isActive}
              onClick={() => setTeam(p.slug)}
              className={cn(
                'px-5 py-2.5 rounded-full text-sm tracking-wide transition-colors duration-200 border',
                isActive
                  ? 'bg-soyl-white text-obsidian border-soyl-white font-medium'
                  : 'bg-transparent text-graphite border-mint/20 hover:border-mint/50 hover:text-soyl-white',
              )}
            >
              {p.title}
            </button>
          )
        })}
      </div>

      {/* Role list */}
      {filtered.length === 0 ? (
        <p className="text-graphite py-12 text-center">
          No open roles in this team right now. Check back soon — or send us a note at{' '}
          <a href="mailto:careers@soylai.com" className="text-mint hover:text-soyl-white transition-colors">
            careers@soylai.com
          </a>
          .
        </p>
      ) : (
        <motion.ul
          variants={prefersReduced ? undefined : staggerContainer}
          initial="hidden"
          animate="visible"
          className="divide-y divide-mint/8 border-y border-mint/8"
        >
          {filtered.map(job => (
            <motion.li
              key={job._id}
              variants={prefersReduced ? {} : fadeInUp}
              className="group"
            >
              <a
                href={job.applyUrl}
                target={job.applyUrl.startsWith('http') ? '_blank' : undefined}
                rel={job.applyUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 py-7 md:py-8 transition-colors duration-200 hover:bg-mint/[0.025] -mx-4 px-4 md:-mx-6 md:px-6 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-graphite text-xs tracking-[0.18em] uppercase mb-1">
                    {job.location}
                  </p>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-soyl-white group-hover:text-mint transition-colors duration-200">
                    {job.title}
                  </h3>
                  {job.summary ? (
                    <p className="text-graphite text-sm mt-2 max-w-2xl leading-relaxed hidden md:block">
                      {job.summary}
                    </p>
                  ) : null}
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-graphite text-xs tracking-[0.18em] uppercase">
                    {employmentLabel(job.employmentType)}
                  </span>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-mint text-obsidian text-xs tracking-[0.18em] uppercase font-medium group-hover:bg-soyl-white transition-colors duration-200">
                    Apply now
                    <ArrowUpRight size={14} strokeWidth={2} />
                  </span>
                </div>
              </a>

              {/* Team tag, hidden when filtered to a single team */}
              {active === 'all' && (
                <p className="text-graphite/70 text-xs px-0 md:px-6 -mt-4 pb-3 md:pb-4">
                  {CAREER_TEAM_LABELS[job.team] ?? job.team}
                </p>
              )}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  )
}

function employmentLabel(type: JobPostingDoc['employmentType']) {
  switch (type) {
    case 'full-time':  return 'Full-time'
    case 'part-time':  return 'Part-time'
    case 'contract':   return 'Contract'
    case 'internship': return 'Internship'
  }
}
