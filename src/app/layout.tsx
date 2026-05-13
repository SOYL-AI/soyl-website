import type { Metadata, Viewport } from 'next'
import { ViewTransitions } from 'next-view-transitions'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteChrome from '@/components/layout/SiteChrome'

export const metadata: Metadata = {
  title: { default: 'SOYL AI Private Limited', template: '%s | SOYL AI' },
  description: 'Story Of Your Life — AI solutions that capture and preserve human experiences.',
  openGraph: { title: 'SOYL AI Private Limited', description: 'Story Of Your Life', type: 'website' },
}

// Tells the browser to use dark UA defaults (scrollbars, form controls, etc.)
// from frame zero. themeColor is what the mobile chrome bar reads.
export const viewport: Viewport = {
  themeColor: '#030709',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Inline background on html + body paints obsidian before the CSS file loads,
  // killing the white-flash FOUC on reload.
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning style={{ backgroundColor: '#030709' }}>
        <body style={{ backgroundColor: '#030709' }}>
          <SiteChrome navbar={<Navbar />} footer={<Footer />}>
            {children}
          </SiteChrome>
        </body>
      </html>
    </ViewTransitions>
  )
}
