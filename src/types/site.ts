export interface SiteConfig {
  site: {
    name: string
    title?: string
    description?: string
    ogImage?: string
    favicon?: string
  }
  brand: {
    logo?: string
    primaryColor: string
    secondaryColor?: string
  }
  contact: {
    tel?: string
    email?: string
    address?: string
    businessHours?: string
    holidays?: string
  }
  social: {
    instagram?: string
    twitter?: string
    facebook?: string
    lineUrl?: string
    bookingUrl?: string
  }
  pages: {
    [key: string]: Block[]
  }
}

export interface Block {
  type: string
  data: Record<string, unknown>
  visible?: boolean
  className?: string
}

export interface HeaderBlock extends Block {
  type: 'header'
  data: {
    logo?: string
    menuItems: MenuItem[]
    sticky?: boolean
    showBookingButton?: boolean
  }
}

export interface MenuItem {
  label: string
  href: string
  type?: 'link' | 'button'
}

export interface HeroBlock extends Block {
  type: 'hero'
  data: {
    title: string
    subtitle?: string
    backgroundImage?: string
    overlay?: boolean
    overlayOpacity?: number
    ctaText?: string
    ctaAction?: string
  }
}

export interface FeaturesBlock extends Block {
  type: 'features'
  data: {
    title?: string
    subtitle?: string
    items: FeatureItem[]
  }
}

export interface FeatureItem {
  icon?: string
  title: string
  description: string
}

export interface ServicesBlock extends Block {
  type: 'services'
  data: {
    title?: string
    subtitle?: string
    items: ServiceItem[]
  }
}

export interface ServiceItem {
  name: string
  description?: string
  price?: string | number
  duration?: string
  image?: string
}

export interface PricingBlock extends Block {
  type: 'pricing'
  data: {
    title?: string
    subtitle?: string
    plans: PricingPlan[]
  }
}

export interface PricingPlan {
  name: string
  price: string | number
  period?: string
  features: string[]
  highlighted?: boolean
  ctaText?: string
}

export interface StaffBlock extends Block {
  type: 'staff'
  data: {
    title?: string
    subtitle?: string
    members: StaffMember[]
  }
}

export interface StaffMember {
  name: string
  role?: string
  bio?: string
  image?: string
  social?: {
    instagram?: string
    twitter?: string
  }
}

export interface GalleryBlock extends Block {
  type: 'gallery'
  data: {
    title?: string
    subtitle?: string
    images: GalleryImage[]
  }
}

export interface GalleryImage {
  src: string
  alt?: string
  caption?: string
}

export interface TestimonialsBlock extends Block {
  type: 'testimonials'
  data: {
    title?: string
    subtitle?: string
    items: TestimonialItem[]
  }
}

export interface TestimonialItem {
  content: string
  author: string
  role?: string
  image?: string
  rating?: number
}

export interface CouponBlock extends Block {
  type: 'coupon'
  data: {
    title: string
    description?: string
    code?: string
    discount?: string
    validUntil?: string
    terms?: string[]
  }
}

export interface ReservationCtaBlock extends Block {
  type: 'reservationCta'
  data: {
    title: string
    subtitle?: string
    buttonText?: string
    phoneNumber?: string
    showFab?: boolean
  }
}

export interface AccessBlock extends Block {
  type: 'access'
  data: {
    title?: string
    address?: string
    mapEmbed?: string
    transportation?: string[]
    parking?: string
  }
}

export interface FAQBlock extends Block {
  type: 'faq'
  data: {
    title?: string
    subtitle?: string
    items: FAQItem[]
  }
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FooterBlock extends Block {
  type: 'footer'
  data: {
    copyright?: string
    links?: FooterLink[]
    showSocial?: boolean
  }
}

export interface FooterLink {
  label: string
  href: string
}

export interface AnnouncementBlock extends Block {
  type: 'announcement'
  data: {
    message: string
    type?: 'info' | 'warning' | 'success' | 'error'
    dismissible?: boolean
  }
}