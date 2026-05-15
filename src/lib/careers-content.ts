// Static copy + iconography for /careers. Roles live in Sanity (or the
// fallback in src/sanity/lib/fallback.ts); everything else is editorial
// and rarely changes, so it lives here.

import {
  Briefcase,
  Rocket,
  Workflow,
  HeartPulse,
  Palmtree,
  Wifi,
  SmilePlus,
  Landmark,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'

export interface CareersHero {
  eyebrow: string
  headline: string
  subhead: string
  ctaLabel: string
  ctaHref: string
}

export const CAREERS_HERO: CareersHero = {
  eyebrow: 'CAREERS AT SOYL',
  headline: 'Build intelligence\nthat listens.',
  subhead:
    'SOYL is where deep tech, hands-on builders, and relentless shipping come together to design voice AI for hospitality, private intelligence for the home, and software for the small moments that shape a day.',
  ctaLabel: 'See open positions',
  ctaHref: '#open-positions',
}

export interface CareerValue {
  title: string
  description: string
  icon: LucideIcon
}

export const CAREER_VALUES: CareerValue[] = [
  {
    title: 'Act like a founder',
    description:
      'Own outcomes end to end: unblock, decide, and stay relentlessly focused on what reaches a customer.',
    icon: Briefcase,
  },
  {
    title: 'Customer-obsessed',
    description:
      'Our hotels, our hosts, and our households shape what we build. We feel their pain, celebrate their wins, and ship to meet real needs.',
    icon: Rocket,
  },
  {
    title: 'Engineering-first',
    description:
      'Exceptional engineering is the product. Reliable, opinionated, and built for the messy reality of production.',
    icon: Workflow,
  },
]

export interface CareerBenefit {
  title: string
  description: string
  icon: LucideIcon
}

export const CAREER_BENEFITS: CareerBenefit[] = [
  {
    title: 'Full-stack health',
    description:
      'Health, vision, and dental insurance for you and your family, plus mental-health support — so you can do your best work without trade-offs.',
    icon: HeartPulse,
  },
  {
    title: 'Time to recharge',
    description:
      'Generous paid leave, with four weeks off encouraged each year to rest, reset, and come back hungry.',
    icon: Palmtree,
  },
  {
    title: 'Everyday boosts',
    description:
      'Commuter support, dependent-care stipends, and fitness memberships — the small things that make the long days easier.',
    icon: Wifi,
  },
  {
    title: 'All-inclusive HQ',
    description:
      'Top-of-line laptop, catered meals, stocked kitchens, and a Bengaluru HQ designed for deep work and the occasional spirited debate.',
    icon: SmilePlus,
  },
  {
    title: 'Invest in your future',
    description:
      'Meaningful equity in everything we ship, plus retirement support — so the upside is yours when the company succeeds.',
    icon: Landmark,
  },
  {
    title: 'Level-up budget',
    description:
      'An annual learning & development budget to invest in conferences, books, courses, and the side quests that compound over a career.',
    icon: TrendingUp,
  },
]

// Team labels shown on the filter pills + role rows. Order matters — this
// drives the visible left-to-right order of the pill bar.
export const CAREER_TEAMS = [
  { slug: 'engineering',   title: 'Engineering, Product & Design' },
  { slug: 'go-to-market',  title: 'Go-To-Market' },
  { slug: 'post-sales',    title: 'Post Sales' },
  { slug: 'g-and-a',       title: 'G&A' },
] as const

export const CAREER_TEAM_LABELS: Record<string, string> = Object.fromEntries(
  CAREER_TEAMS.map(t => [t.slug, t.title]),
)
