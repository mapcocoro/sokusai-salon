'use client'

import { useState } from 'react'
import Image from 'next/image'
import { HeaderBlock } from '@/src/types/site'
import { openBooking } from '@/src/lib/actions'

export default function Header({ data }: HeaderBlock) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={`bg-white shadow-md z-50 ${data.sticky ? 'sticky top-0' : ''} no-print`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {data.logo && (
              <Image
                src={data.logo}
                alt="Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            )}
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {data.menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={
                  item.type === 'button'
                    ? 'bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition'
                    : 'text-gray-700 hover:text-pink-500 transition'
                }
                onClick={item.type === 'button' && item.href === '#' ? (e) => {
                  e.preventDefault()
                  openBooking()
                } : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            {data.menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`block py-2 ${
                  item.type === 'button'
                    ? 'text-pink-500 font-bold'
                    : 'text-gray-700'
                }`}
                onClick={() => {
                  setIsMenuOpen(false)
                  if (item.type === 'button' && item.href === '#') {
                    openBooking()
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}