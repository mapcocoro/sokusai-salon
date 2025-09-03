import Image from 'next/image'
import { StaffBlock } from '@/src/types/site'
import Section from '@/src/components/Section'

export default function Staff({ data }: StaffBlock) {
  return (
    <Section id="staff">
      <div className="text-center mb-12">
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
        )}
        {data.subtitle && (
          <p className="text-gray-600 max-w-2xl mx-auto">{data.subtitle}</p>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {data.members.map((member, index) => (
          <div key={index} className="text-center">
            {member.image && (
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
            {member.role && (
              <p className="text-gray-500 mb-3">{member.role}</p>
            )}
            {member.bio && (
              <p className="text-gray-600">{member.bio}</p>
            )}
            {member.social && (
              <div className="flex justify-center space-x-4 mt-4">
                {member.social.instagram && (
                  <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600">
                    <span className="sr-only">Instagram</span>
                    📷
                  </a>
                )}
                {member.social.twitter && (
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                    <span className="sr-only">Twitter</span>
                    🐦
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}