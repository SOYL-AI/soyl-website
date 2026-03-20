import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-6xl font-bold text-soyl-white mb-4">404</h1>
        <p className="text-graphite mb-8">This page doesn&apos;t exist.</p>
        <Link href="/" className="text-mint text-sm border border-mint/40 px-6 py-3 rounded hover:bg-mint hover:text-obsidian transition-all">
          Back to Home
        </Link>
      </div>
    </main>
  )
}
