import { Studio } from './Studio'
import { isSanityConfigured } from '@/sanity/env'

export const dynamic = 'force-static'
export const metadata = { robots: { index: false, follow: false } }

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="min-h-screen bg-obsidian flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <p className="text-mint text-xs tracking-[0.22em] uppercase mb-3">Sanity Studio</p>
          <h1 className="font-display text-3xl text-soyl-white mb-4">Studio is not provisioned yet</h1>
          <p className="text-graphite text-sm leading-relaxed">
            Set <code className="text-mint font-mono">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{' '}
            <code className="text-mint font-mono">NEXT_PUBLIC_SANITY_DATASET</code> in{' '}
            <code className="text-mint font-mono">.env.local</code> and reload to enable the CMS.
          </p>
        </div>
      </main>
    )
  }
  return <Studio />
}
