'use client'

import { ReservationCtaBlock } from '@/src/types/site'
import { openBooking } from '@/src/lib/actions'

export default function ReservationCta({ data }: ReservationCtaBlock) {
  return (
    <>
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16 no-print">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
          {data.subtitle && (
            <p className="text-xl mb-8 opacity-90">{data.subtitle}</p>
          )}
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={openBooking}
              className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              {data.buttonText || '今すぐ予約する'}
            </button>
            
            {data.phoneNumber && (
              <a
                href={`tel:${data.phoneNumber}`}
                className="flex items-center text-white hover:underline"
              >
                <span className="text-2xl mr-2">📞</span>
                <span className="text-xl">{data.phoneNumber}</span>
              </a>
            )}
          </div>
        </div>
      </div>
      
      {data.showFab && (
        <button
          onClick={openBooking}
          className="fixed bottom-6 right-6 bg-pink-500 text-white w-16 h-16 rounded-full shadow-lg hover:bg-pink-600 transition transform hover:scale-110 z-40 md:hidden no-print"
          aria-label="予約する"
        >
          <span className="text-2xl">📅</span>
        </button>
      )}
    </>
  )
}