import React from 'react'

export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 gap-3.5">
      <div className={`animate-spin rounded-full border-orange-500 border-t-transparent ${sizes[size]}`} />
      {text && <p className="text-xs font-medium text-neutral-500 tracking-wide">{text}</p>}
    </div>
  )
}