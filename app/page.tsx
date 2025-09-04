import { Metadata } from 'next'
import dynamicImport from 'next/dynamic'
import { Suspense } from 'react'
import siteConfig from '@/src/config/site.config.json'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

const Header = dynamicImport(() => import('@/src/components/blocks/Header'))
const Hero = dynamicImport(() => import('@/src/components/blocks/Hero'))
const Features = dynamicImport(() => import('@/src/components/blocks/Features'))
const Services = dynamicImport(() => import('@/src/components/blocks/Services'))
const Pricing = dynamicImport(() => import('@/src/components/blocks/Pricing'))
const Staff = dynamicImport(() => import('@/src/components/blocks/Staff'))
const Gallery = dynamicImport(() => import('@/src/components/blocks/Gallery'))
const Testimonials = dynamicImport(() => import('@/src/components/blocks/Testimonials'))
const Coupon = dynamicImport(() => import('@/src/components/blocks/Coupon'))
const ReservationCta = dynamicImport(() => import('@/src/components/blocks/ReservationCta'))
const Access = dynamicImport(() => import('@/src/components/blocks/Access'))
const FAQ = dynamicImport(() => import('@/src/components/blocks/FAQ'))
const Footer = dynamicImport(() => import('@/src/components/blocks/Footer'))
const Announcement = dynamicImport(() => import('@/src/components/blocks/Announcement'))

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

function SiteIdHandler({ searchParams }: { searchParams: { siteId?: string } }) {
  if (!searchParams.siteId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-6xl mb-4">🏪</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">sokusai-salon</h1>
          <p className="text-gray-600 mb-4">
            サイトを表示するには siteId を指定してください
          </p>
          <p className="text-sm text-gray-500">
            例: /?siteId=your-site-id
          </p>
        </div>
      </div>
    )
  }

  return <SiteRenderer siteId={searchParams.siteId} />
}

async function SiteRenderer({ siteId }: { siteId: string }) {
  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-6xl mb-4">⚙️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">設定が必要です</h1>
          <p className="text-gray-600">
            Supabase環境変数が設定されていません
          </p>
        </div>
      </div>
    )
  }

  try {
    const { data: site, error } = await supabase
      .from('sites')
      .select('*')
      .eq('id', siteId)
      .single()

    if (error || !site) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">サイトが見つかりません</h1>
            <p className="text-gray-600 mb-4">
              指定されたサイトID「{siteId}」は存在しません
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🏪</div>
              {site.brand && (
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{site.brand}</h1>
              )}
              {site.tagline && (
                <p className="text-xl text-gray-600 mb-6">{site.tagline}</p>
              )}
            </div>

            <div className="space-y-6">
              {site.phone && (
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📞</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">電話番号</h3>
                    <p className="text-gray-600">{site.phone}</p>
                  </div>
                </div>
              )}

              {site.address && (
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📍</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">住所</h3>
                    <p className="text-gray-600">{site.address}</p>
                  </div>
                </div>
              )}

              {site.domain && (
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🌐</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">ドメイン</h3>
                    <p className="text-gray-600">{site.domain}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <span className="text-2xl mr-3">🔗</span>
                <div>
                  <h3 className="font-semibold text-gray-900">スラッグ</h3>
                  <p className="text-gray-600">{site.slug}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>プレースホルダーページ:</strong> 本格的なサイトを構築するには、site.config.json を更新して完全なブロック構成を実装してください。
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  } catch {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">エラーが発生しました</h1>
          <p className="text-gray-600">
            サイト情報の取得中にエラーが発生しました
          </p>
        </div>
      </div>
    )
  }
}

function DefaultSite() {
  const blocks = siteConfig.pages.home || []

  return (
    <main className="min-h-screen">
      {blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </main>
  )
}

export default function Home({ searchParams }: { searchParams: { siteId?: string } }) {
  if (searchParams.siteId) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">サイトを読み込んでいます...</p>
          </div>
        </div>
      }>
        <SiteIdHandler searchParams={searchParams} />
      </Suspense>
    )
  }

  return <DefaultSite />
}
