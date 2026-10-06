import React from 'react'

export default function ProgressBar({ value, max = 100, color = 'orange', showLabel = true, size = 'md' }) {
  const pct = Math.min(Math.round((value / max) * 100), 100)
  
  const colors = {
    orange: 'bg-orange-500',
    primary: 'bg-orange-500',
    amber: 'bg-amber-500',
    green: 'bg-emerald-500',
    emerald: 'bg-emerald-500',
    olive: 'bg-stone-600',
    stone: 'bg-stone-600',
    dark: 'bg-neutral-900',
    red: 'bg-rose-500',
    blue: 'bg-orange-500',
  }
  
  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  }

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-medium text-neutral-600 mb-1.5">
          <span>Progress</span>
          <span className="font-semibold text-neutral-900">{pct}%</span>
        </div>
      )}
      <div className={`w-full bg-neutral-100 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${colors[color] || colors.orange} ${heights[size]} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}