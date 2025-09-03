import Image from 'next/image'
import { ServicesBlock } from '@/src/types/site'
import Section from '@/src/components/Section'

export default function Services({ data }: ServicesBlock) {
  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseInt(price) : price
    return `${numPrice.toLocaleString()}円（税込）`
  }

  return (
    <Section id="services">
      <div className="text-center mb-12">
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
        )}
        {data.subtitle && (
          <p className="text-gray-600 max-w-2xl mx-auto">{data.subtitle}</p>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {data.items.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {item.image && (
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              {item.description && (
                <p className="text-gray-600 mb-4">{item.description}</p>
              )}
              <div className="flex justify-between items-center">
                {item.price && (
                  <span className="text-2xl font-bold text-pink-500">
                    {formatPrice(item.price)}
                  </span>
                )}
                {item.duration && (
                  <span className="text-gray-500">{item.duration}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}