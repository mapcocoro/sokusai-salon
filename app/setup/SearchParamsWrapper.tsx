'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

interface SetupContentProps {
  onKeyChange: (key: string | null) => void
}

function SetupContent({ onKeyChange }: SetupContentProps) {
  const searchParams = useSearchParams()
  const key = searchParams.get('key')
  
  // Trigger the key change callback
  if (onKeyChange) {
    onKeyChange(key)
  }
  
  return null
}

interface SearchParamsWrapperProps {
  onKeyChange: (key: string | null) => void
}

export default function SearchParamsWrapper({ onKeyChange }: SearchParamsWrapperProps) {
  return (
    <Suspense fallback={null}>
      <SetupContent onKeyChange={onKeyChange} />
    </Suspense>
  )
}