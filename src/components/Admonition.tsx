import { ReactNode } from 'react'

interface AdmonitionProps {
  type?: 'info' | 'warning' | 'success' | 'error'
  title?: string
  children: ReactNode
}

export default function Admonition({ 
  type = 'info', 
  title,
  children 
}: AdmonitionProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    success: 'bg-green-50 border-green-200 text-green-900',
    error: 'bg-red-50 border-red-200 text-red-900'
  }

  const icons = {
    info: '💡',
    warning: '⚠️',
    success: '✅',
    error: '❌'
  }

  return (
    <div className={`p-4 border-l-4 rounded-r-lg ${styles[type]}`}>
      <div className="flex items-start">
        <span className="text-xl mr-2">{icons[type]}</span>
        <div>
          {title && <h4 className="font-bold mb-1">{title}</h4>}
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}