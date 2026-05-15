import type { Metadata } from 'next'
import { Suspense } from 'react'
import CareersHero from '@/components/careers/CareersHero'
import ValuesSection from '@/components/careers/ValuesSection'
import BenefitsSection from '@/components/careers/BenefitsSection'
import RolesSection from '@/components/careers/RolesSection'
import { sanityFetch } from '@/sanity/lib/client'
import { JOBS_QUERY } from '@/sanity/lib/queries'
import { fallbackJobs } from '@/sanity/lib/fallback'
import type { JobPostingDoc } from '@/sanity/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Build the future of intelligence that listens. Open roles at SOYL AI in Bengaluru — engineering, product, design, go-to-market, and beyond.',
  openGraph: {
    title: 'Careers | SOYL AI',
    description:
      'Build the future of intelligence that listens. Open roles at SOYL AI in Bengaluru.',
    type: 'website',
  },
}

export default async function CareersPage() {
  // Sanity-first, with a seeded fallback when env vars are missing or the
  // request fails. Same pattern as the Library.
  const live = await sanityFetch<JobPostingDoc[]>({ query: JOBS_QUERY, tags: ['jobPosting'] })
  const jobs = live ?? fallbackJobs()

  return (
    <main className="bg-obsidian min-h-screen flex flex-col">
      <CareersHero />
      <ValuesSection />
      {/* Suspense boundary required by Next 16: RolesPanel reads
          useSearchParams(), which forces a CSR bailout. Without this the
          static prerender fails — same fix as /library. */}
      <Suspense fallback={<RolesFallback />}>
        <RolesSection jobs={jobs} />
      </Suspense>
      <BenefitsSection />
    </main>
  )
}

function RolesFallback() {
  return (
    <section
      id="open-positions"
      className="bg-elevated py-24 md:py-32 border-b border-mint/5"
      aria-hidden
    >
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div className="h-16 mb-12 rounded bg-mint/[0.04]" />
        <div className="h-px bg-mint/8" />
      </div>
    </section>
  )
}
