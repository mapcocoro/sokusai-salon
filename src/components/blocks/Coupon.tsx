'use client'

import { CouponBlock } from '@/src/types/site'
import { copyCode } from '@/src/lib/actions'
import Section from '@/src/components/Section'

export default function Coupon({ data }: CouponBlock) {
  return (
    <Section bgColor="bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 border-2 border-dashed border-pink-300">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 text-pink-600">{data.title}</h2>
          {data.description && (
            <p className="text-gray-600 mb-6">{data.description}</p>
          )}
          
          {data.discount && (
            <div className="text-5xl font-bold text-pink-500 mb-4">
              {data.discount}
            </div>
          )}
          
          {data.code && (
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 mb-2">クーポンコード</p>
              <div className="flex items-center justify-center space-x-4">
                <code className="text-2xl font-mono font-bold">{data.code}</code>
                <button
                  onClick={() => copyCode(data.code!)}
                  className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
                >
                  コピー
                </button>
              </div>
            </div>
          )}
          
          {data.validUntil && (
            <p className="text-sm text-gray-500 mb-4">
              有効期限: {data.validUntil}
            </p>
          )}
          
          {data.terms && data.terms.length > 0 && (
            <div className="text-left bg-gray-50 rounded p-4">
              <p className="text-sm font-semibold mb-2">利用条件:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {data.terms.map((term, index) => (
                  <li key={index}>・{term}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}