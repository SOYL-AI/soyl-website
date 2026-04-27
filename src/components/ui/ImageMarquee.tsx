import Image from 'next/image'

export default function ImageMarquee({ images }: { images: string[] }) {
  // Duplicate for seamless infinite loop
  const doubled = [...images, ...images]

  return (
    <div className="overflow-hidden mt-16 group">
      <div className="flex gap-4 animate-marquee group-hover:[animation-play-state:paused]">
        {doubled.map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden border border-mint/10 relative bg-card-bg"
          >
            <Image
              src={images[i % images.length]}
              alt=""
              fill
              sizes="256px"
              className="object-cover"
              loading="lazy"
            />
            {/* Subtle dark gradient overlay for visual continuity */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-obsidian/10 pointer-events-none" />
            {/* Mint corner accent — keep the existing one */}
            <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-mint/60" />
          </div>
        ))}
      </div>
    </div>
  )
}
