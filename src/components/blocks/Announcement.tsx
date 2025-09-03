'use client'

import { useState } from 'react'
import { AnnouncementBlock } from '@/src/types/site'

export default function Announcement({ data }: AnnouncementBlock) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const styles = {
    info: 'bg-blue-100 text-blue-900 border-blue-200',
    warning: 'bg-yellow-100 text-yellow-900 border-yellow-200',
    success: 'bg-green-100 text-green-900 border-green-200',
    error: 'bg-red-100 text-red-900 border-red-200'
  }

  return (
    <div className={`${styles[data.type || 'info']} border-b px-4 py-3 no-print`}>
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm md:text-base font-medium">{data.message}</p>
        {data.dismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 text-xl hover:opacity-70"
            aria-label="閉じる"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}