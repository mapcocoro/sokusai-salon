'use client'

import { HeroBlock } from '@/src/types/site'
import { openBooking } from '@/src/lib/actions'

export default function Hero({ data }: HeroBlock) {
  return (
    <div className="relative h-[600px] md:h-[700px] flex items-center justify-center">
      {data.backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${data.backgroundImage})` }}
          />
          {data.overlay && (
            <div 
              className="absolute inset-0 bg-black"
              style={{ opacity: data.overlayOpacity || 0.5 }}
            />
          )}
        </>
      )}
      
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {data.title}
        </h1>
        {data.subtitle && (
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        )}
        {data.ctaText && (
          <button
            onClick={() => {
              if (data.ctaAction === 'openBooking') {
                openBooking()
              }
            }}
            className="bg-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-600 transition transform hover:scale-105"
          >
            {data.ctaText}
          </button>
        )}
      </div>
    </div>
  )
}