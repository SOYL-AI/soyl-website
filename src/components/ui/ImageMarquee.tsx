export default function ImageMarquee({ images }: { images: string[] }) {
  // Duplicate for seamless infinite loop
  const doubled = [...images, ...images]

  return (
    <div className="overflow-hidden mt-16 group">
      <div className="flex gap-4 animate-marquee group-hover:[animation-play-state:paused]">
        {doubled.map((src, i) => (
          <div key={i} className="flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden bg-obsidian/50 border border-mint/10">
            {/* Replace with next/image when real images are available */}
            <div className="w-full h-full bg-graphite/20 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  )
}
