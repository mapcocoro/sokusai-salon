import { FooterBlock } from '@/src/types/site'
import siteConfig from '@/src/config/site.config.json'

export default function Footer({ data }: FooterBlock) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">{siteConfig.site.name}</h3>
            {siteConfig.contact.address && (
              <p className="text-gray-400 text-sm mb-2">{siteConfig.contact.address}</p>
            )}
            {siteConfig.contact.tel && (
              <p className="text-gray-400 text-sm mb-2">TEL: {siteConfig.contact.tel}</p>
            )}
            {siteConfig.contact.email && (
              <p className="text-gray-400 text-sm">Email: {siteConfig.contact.email}</p>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">営業時間</h3>
            {siteConfig.contact.businessHours && (
              <p className="text-gray-400 text-sm mb-2">{siteConfig.contact.businessHours}</p>
            )}
            {siteConfig.contact.holidays && (
              <p className="text-gray-400 text-sm">定休日: {siteConfig.contact.holidays}</p>
            )}
          </div>
          
          {data.showSocial && (
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {siteConfig.social?.instagram && (
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    Instagram
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {data.copyright && (
              <p className="text-gray-400 text-sm mb-4 md:mb-0">{data.copyright}</p>
            )}
            {data.links && data.links.length > 0 && (
              <div className="flex space-x-6">
                {data.links.map((link, index) => (
                  <a key={index} href={link.href} className="text-gray-400 text-sm hover:text-white">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}