import Button from '@/components/ui/Button'

export default function CTAStripSection() {
  return (
    <section className="bg-elevated py-20 border-t border-mint/5">
      <div className="max-w-content mx-auto px-6 lg:px-16 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-soyl-white mb-6">
          Ready to tell your story?
        </h2>
        <p className="text-graphite mb-10 max-w-lg mx-auto">
          Whether you&apos;re looking to integrate our products or collaborate on groundbreaking AI research, we&apos;re here to talk.
        </p>
        <Button href="/contact" variant="primary">
          Work with us →
        </Button>
      </div>
    </section>
  )
}
