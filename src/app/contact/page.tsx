import type { Metadata } from 'next'
import ContactHeroSection from '@/components/contact/ContactHeroSection'
import ContactFormSection from '@/components/contact/ContactFormSection'
import ContactInfoSection from '@/components/contact/ContactInfoSection'

export const metadata: Metadata = { 
  title: 'Contact Us | SOYL AI',
  description: 'Get in touch with the SOYL AI intelligence integration team.' 
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-obsidian flex flex-col pt-16">
      
      {/* Task 1: Hero Render */}
      <ContactHeroSection />
      
      {/* Task 3 & 4: Stateful Interactive Form */}
      <div className="flex-1 w-full">
        <ContactFormSection />
      </div>

      {/* Task 2: Company Metadata footer */}
      <ContactInfoSection />

    </main>
  )
}
