import { FeaturesBlock } from '@/src/types/site'
import Section from '@/src/components/Section'

export default function Features({ data }: FeaturesBlock) {
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

      <div className="grid md:grid-cols-3 gap-8">
        {data.items.map((item, index) => (
          <div key={index} className="text-center">
            {item.icon && (
              <div className="text-4xl mb-4">{item.icon}</div>
            )}
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}