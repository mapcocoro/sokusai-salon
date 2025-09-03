import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import siteConfig from '@/src/config/site.config.json'

const Header = dynamic(() => import('@/src/components/blocks/Header'))
const Hero = dynamic(() => import('@/src/components/blocks/Hero'))
const Features = dynamic(() => import('@/src/components/blocks/Features'))
const Services = dynamic(() => import('@/src/components/blocks/Services'))
const Pricing = dynamic(() => import('@/src/components/blocks/Pricing'))
const Staff = dynamic(() => import('@/src/components/blocks/Staff'))
const Gallery = dynamic(() => import('@/src/components/blocks/Gallery'))
const Testimonials = dynamic(() => import('@/src/components/blocks/Testimonials'))
const Coupon = dynamic(() => import('@/src/components/blocks/Coupon'))
const ReservationCta = dynamic(() => import('@/src/components/blocks/ReservationCta'))
const Access = dynamic(() => import('@/src/components/blocks/Access'))
const FAQ = dynamic(() => import('@/src/components/blocks/FAQ'))
const Footer = dynamic(() => import('@/src/components/blocks/Footer'))
const Announcement = dynamic(() => import('@/src/components/blocks/Announcement'))

export const metadata: Metadata = {
  title: siteConfig.site.title || siteConfig.site.name,
  description: siteConfig.site.description,
  openGraph: {
    title: siteConfig.site.title || siteConfig.site.name,
    description: siteConfig.site.description || '',
    images: siteConfig.site.ogImage ? [siteConfig.site.ogImage] : [],
  },
}

function BlockRenderer({ block }: { block: any }) {
  if (block.visible === false) return null

  switch (block.type) {
    case 'header':
      return <Header data={block.data} visible={block.visible} className={block.className} type="header" />
    case 'hero':
      return <Hero data={block.data} visible={block.visible} className={block.className} type="hero" />
    case 'features':
      return <Features data={block.data} visible={block.visible} className={block.className} type="features" />
    case 'services':
      return <Services data={block.data} visible={block.visible} className={block.className} type="services" />
    case 'pricing':
      return <Pricing data={block.data} visible={block.visible} className={block.className} type="pricing" />
    case 'staff':
      return <Staff data={block.data} visible={block.visible} className={block.className} type="staff" />
    case 'gallery':
      return <Gallery data={block.data} visible={block.visible} className={block.className} type="gallery" />
    case 'testimonials':
      return <Testimonials data={block.data} visible={block.visible} className={block.className} type="testimonials" />
    case 'coupon':
      return <Coupon data={block.data} visible={block.visible} className={block.className} type="coupon" />
    case 'reservationCta':
      return <ReservationCta data={block.data} visible={block.visible} className={block.className} type="reservationCta" />
    case 'access':
      return <Access data={block.data} visible={block.visible} className={block.className} type="access" />
    case 'faq':
      return <FAQ data={block.data} visible={block.visible} className={block.className} type="faq" />
    case 'footer':
      return <Footer data={block.data} visible={block.visible} className={block.className} type="footer" />
    case 'announcement':
      return <Announcement data={block.data} visible={block.visible} className={block.className} type="announcement" />
    default:
      console.warn(`Unknown block type: ${block.type}`)
      return null
  }
}

export default function Home() {
  const blocks = siteConfig.pages.home || []

  return (
    <main className="min-h-screen">
      {blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </main>
  )
}
