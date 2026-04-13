// Placeholder card variants — visually distinct mint-tinted gradient tiles.
// Replace the inner div with next/image once real images are available.
const CARD_VARIANTS = [
  // Radial bloom — centre glow
  {
    bg: 'radial-gradient(ellipse at 50% 40%, rgba(175,208,204,0.18) 0%, rgba(175,208,204,0.04) 55%, transparent 100%)',
    overlay: 'linear-gradient(135deg, rgba(175,208,204,0.06) 0%, transparent 60%)',
  },
  // Top-left diagonal sweep
  {
    bg: 'linear-gradient(135deg, rgba(175,208,204,0.14) 0%, rgba(13,18,20,0.8) 60%)',
    overlay: 'radial-gradient(circle at 80% 80%, rgba(175,208,204,0.08) 0%, transparent 50%)',
  },
  // Bottom-right warm bloom
  {
    bg: 'radial-gradient(ellipse at 80% 100%, rgba(175,208,204,0.20) 0%, transparent 65%)',
    overlay: 'linear-gradient(220deg, rgba(175,208,204,0.04) 0%, transparent 50%)',
  },
  // Horizontal band
  {
    bg: 'linear-gradient(180deg, transparent 20%, rgba(175,208,204,0.10) 50%, transparent 80%)',
    overlay: 'radial-gradient(circle at 20% 50%, rgba(175,208,204,0.10) 0%, transparent 55%)',
  },
  // Dual-corner
  {
    bg: 'radial-gradient(circle at 10% 10%, rgba(175,208,204,0.14) 0%, transparent 45%), radial-gradient(circle at 90% 90%, rgba(175,208,204,0.10) 0%, transparent 40%)',
    overlay: 'linear-gradient(45deg, rgba(175,208,204,0.03) 0%, transparent 100%)',
  },
  // Soft full wash
  {
    bg: 'linear-gradient(160deg, rgba(175,208,204,0.12) 0%, rgba(11,17,20,0.95) 70%)',
    overlay: 'radial-gradient(ellipse at 50% 0%, rgba(175,208,204,0.10) 0%, transparent 60%)',
  },
]

export default function ImageMarquee({ images }: { images: string[] }) {
  // Duplicate for seamless infinite loop
  const doubled = [...images, ...images]

  return (
    <div className="overflow-hidden mt-16 group">
      <div className="flex gap-4 animate-marquee group-hover:[animation-play-state:paused]">
        {doubled.map((_, i) => {
          const variant = CARD_VARIANTS[i % CARD_VARIANTS.length]
          return (
            <div
              key={i}
              className="flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden border border-mint/10 relative"
              style={{ background: '#0B1114' }}
            >
              {/* Gradient background */}
              <div className="absolute inset-0" style={{ backgroundImage: variant.bg }} />
              {/* Overlay layer */}
              <div className="absolute inset-0" style={{ backgroundImage: variant.overlay }} />
              {/* Subtle grid texture */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'linear-gradient(rgba(175,208,204,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(175,208,204,0.06) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              {/* Mint corner accent */}
              <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-mint/40" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
