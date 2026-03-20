import SectionLabel from '@/components/ui/SectionLabel'

const STATS = [
  { value: '2023', label: 'Year Founded' },
  { value: '3',    label: 'Products Live' },
  { value: '12+',  label: 'Research Papers' },
  { value: '8',    label: 'Team Members' },
]

export default function AboutSection() {
  return (
    <section className="bg-soyl-white py-16 md:py-24">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left — Text */}
          <div className="border-l-2 border-mint pl-6">
            <SectionLabel className="text-obsidian/60">Who We Are</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-obsidian mb-6 leading-tight">
              Building AI That Understands the Human Story
            </h2>
            <p className="text-graphite leading-relaxed mb-6">
              SOYL AI Private Limited is an AI research company focused on capturing, understanding, and preserving human experiences. We combine cutting-edge machine learning with deep empathy for the stories that make us human.
            </p>
            <a href="/about" className="text-obsidian text-sm font-medium hover:text-mint transition-colors relative group">
              Learn More →
            </a>
          </div>

          {/* Right — Stats */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map(stat => (
              <div key={stat.label} className="bg-white border border-obsidian/10 rounded-xl p-6">
                <p className="font-display text-obsidian text-4xl font-bold mb-1">{stat.value}</p>
                <p className="text-graphite text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
