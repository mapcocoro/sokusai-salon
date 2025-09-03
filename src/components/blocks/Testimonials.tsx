import { TestimonialsBlock } from '@/src/types/site'
import Section from '@/src/components/Section'

export default function Testimonials({ data }: TestimonialsBlock) {
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

      <div className="grid md:grid-cols-3 gap-8">
        {data.items.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            {item.rating && (
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < (item.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
            )}
            <p className="text-gray-600 mb-4 italic">&ldquo;{item.content}&rdquo;</p>
            <div className="flex items-center">
              {item.image && (
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-3" />
              )}
              <div>
                <p className="font-semibold">{item.author}</p>
                {item.role && (
                  <p className="text-sm text-gray-500">{item.role}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}