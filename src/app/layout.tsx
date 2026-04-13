import type { Metadata } from 'next'
import { ViewTransitions } from 'next-view-transitions'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: { default: 'SOYL AI Private Limited', template: '%s | SOYL AI' },
  description: 'Story Of Your Life — AI solutions that capture and preserve human experiences.',
  openGraph: { title: 'SOYL AI Private Limited', description: 'Story Of Your Life', type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  )
}
