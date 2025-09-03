'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GalleryBlock } from '@/src/types/site'
import Section from '@/src/components/Section'

export default function Gallery({ data }: GalleryBlock) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <Section bgColor="bg-gray-50">
      <div className="text-center mb-12">
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
        )}
        {data.subtitle && (
          <p className="text-gray-600 max-w-2xl mx-auto">{data.subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image.src}
              alt={image.alt || `Gallery image ${index + 1}`}
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <Image
              src={data.images[selectedImage].src}
              alt={data.images[selectedImage].alt || ''}
              width={800}
              height={600}
              className="object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </Section>
  )
}