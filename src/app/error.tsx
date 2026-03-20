'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold text-soyl-white mb-4">Something went wrong</h1>
        <p className="text-graphite mb-8">{error.message}</p>
        <button onClick={reset} className="text-mint text-sm border border-mint/40 px-6 py-3 rounded hover:bg-mint hover:text-obsidian transition-all cursor-pointer">
          Try Again
        </button>
      </div>
    </main>
  )
}
