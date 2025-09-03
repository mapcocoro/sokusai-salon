import { PricingBlock } from '@/src/types/site'
import Section from '@/src/components/Section'

export default function Pricing({ data }: PricingBlock) {
  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseInt(price) : price
    return `${numPrice.toLocaleString()}円`
  }

  return (
    <Section id="pricing" bgColor="bg-gray-50">
      <div className="text-center mb-12">
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
        )}
        {data.subtitle && (
          <p className="text-gray-600 max-w-2xl mx-auto">{data.subtitle}</p>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {data.plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-lg p-8 relative ${
              plan.highlighted ? 'ring-2 ring-pink-500' : ''
            }`}
          >
            {plan.highlighted && plan.ctaText && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm">
                  {plan.ctaText}
                </span>
              </div>
            )}
            
            <h3 className="text-2xl font-bold mb-4 text-center">{plan.name}</h3>
            
            <div className="text-center mb-6">
              <span className="text-4xl font-bold">{formatPrice(plan.price)}</span>
              {plan.period && (
                <span className="text-gray-500">/{plan.period}</span>
              )}
              <div className="text-sm text-gray-500 mt-1">（税込）</div>
            </div>
            
            <ul className="space-y-3">
              {plan.features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}