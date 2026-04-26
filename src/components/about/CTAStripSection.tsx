import Button from '@/components/ui/Button'

export default function CTAStripSection() {
  return (
    <section className="bg-elevated py-20 border-t border-mint/5">
      <div className="max-w-content mx-auto px-6 lg:px-16 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-soyl-white mb-6">
          Want to talk?
        </h2>
        <p className="text-graphite mb-10 max-w-lg mx-auto">
          Whether you run a hotel and want to pilot Butler AI, you&apos;re a developer interested in AI Dex, or you just want to say hi — we read every message.
        </p>
        <Button href="/contact" variant="primary">
          Get in touch →
        </Button>
      </div>
    </section>
  )
}
