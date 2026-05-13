// Studio routes need full viewport, no Navbar/Footer, no page motion.
// SiteChrome (mounted in root layout) checks pathname and bypasses chrome
// on /studio — this layout just passes through.
export const metadata = { robots: { index: false, follow: false } }

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
