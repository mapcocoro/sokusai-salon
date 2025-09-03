import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  bgColor?: string
}

export default function Section({ 
  children, 
  className = '', 
  id,
  bgColor = 'bg-white'
}: SectionProps) {
  return (
    <section 
      id={id}
      className={`py-16 md:py-24 ${bgColor} ${className}`}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  )
}