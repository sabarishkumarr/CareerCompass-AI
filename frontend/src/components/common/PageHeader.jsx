import React from 'react'

export default function PageHeader({ title, description, badge, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">{title}</h1>
          {badge && (
            <span className="badge badge-orange text-xs font-semibold">{badge}</span>
          )}
        </div>
        {description && (
          <p className="text-sm text-neutral-500 mt-1 max-w-2xl">{description}</p>
        )}
      </div>
      {action && <div className="flex items-center gap-3 shrink-0">{action}</div>}
    </div>
  )
}