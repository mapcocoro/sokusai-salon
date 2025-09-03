'use client'

import { useState } from 'react'
import { FAQBlock } from '@/src/types/site'
import Section from '@/src/components/Section'

export default function FAQ({ data }: FAQBlock) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section>
      <div className="text-center mb-12">
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
        )}
        {data.subtitle && (
          <p className="text-gray-600 max-w-2xl mx-auto">{data.subtitle}</p>
        )}
      </div>

      <div className="max-w-3xl mx-auto">
        {data.items.map((item, index) => (
          <div key={index} className="mb-4">
            <button
              className="w-full text-left bg-white rounded-lg shadow p-6 hover:shadow-md transition"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg pr-4">{item.question}</h3>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {openIndex === index && (
                <p className="mt-4 text-gray-600">{item.answer}</p>
              )}
            </button>
          </div>
        ))}
      </div>
    </Section>
  )
}