import type { Metadata } from 'next'
import SpeakHeroSection from '@/components/speak/SpeakHeroSection'
import SpeakInterface from '@/components/speak/SpeakInterface'

export const metadata: Metadata = {
  title: 'Speak with Genesis | SOYL AI',
  description: "Converse with Genesis — SOYL AI's empathic AI companion. Ask anything about our products, research, and vision.",
}

export default function SpeakPage() {
  return (
    <main className="min-h-screen bg-obsidian flex flex-col pt-16">
      <SpeakHeroSection />
      <div className="flex-1 w-full flex flex-col items-center py-10">
        <SpeakInterface />
      </div>
    </main>
  )
}
