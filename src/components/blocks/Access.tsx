import { AccessBlock } from '@/src/types/site'
import Section from '@/src/components/Section'

export default function Access({ data }: AccessBlock) {
  return (
    <Section id="access" bgColor="bg-gray-50">
      <div className="text-center mb-12">
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {data.address && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">住所</h3>
              <p className="text-gray-600">{data.address}</p>
            </div>
          )}
          
          {data.transportation && data.transportation.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">アクセス</h3>
              <ul className="text-gray-600 space-y-1">
                {data.transportation.map((item, index) => (
                  <li key={index}>・{item}</li>
                ))}
              </ul>
            </div>
          )}
          
          {data.parking && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">駐車場</h3>
              <p className="text-gray-600">{data.parking}</p>
            </div>
          )}
        </div>
        
        {data.mapEmbed && (
          <div className="w-full h-[400px] rounded-lg overflow-hidden">
            <div dangerouslySetInnerHTML={{ __html: data.mapEmbed }} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full" />
          </div>
        )}
      </div>
    </Section>
  )
}