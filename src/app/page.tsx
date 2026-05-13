import HeroSection      from '@/components/sections/HeroSection'
import AboutSection     from '@/components/sections/AboutSection'
import ProductsSection  from '@/components/sections/ProductsSection'
import HowWeWorkSection from '@/components/sections/HowWeWorkSection'
import LibrarySection   from '@/components/sections/LibrarySection'
import SectionDivider   from '@/components/ui/SectionDivider'
import SiteLoadingSplash from '@/components/layout/SiteLoadingSplash'

export default function HomePage() {
  return (
    <>
      <SiteLoadingSplash />
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <ProductsSection />
      <SectionDivider />
      <HowWeWorkSection />
      <SectionDivider />
      <LibrarySection />
    </>
  )
}
