import HeroSection      from '@/components/sections/HeroSection'
import AboutSection     from '@/components/sections/AboutSection'
import ProductsSection  from '@/components/sections/ProductsSection'
import HowWeWorkSection from '@/components/sections/HowWeWorkSection'
import SectionDivider   from '@/components/ui/SectionDivider'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <ProductsSection />
      <SectionDivider />
      <HowWeWorkSection />
    </>
  )
}
