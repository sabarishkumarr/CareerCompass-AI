import React from 'react'

export default function EmptyState({ title, description, action, icon: Icon }) {
  return (
    <div className="card p-12 text-center flex flex-col items-center justify-center border-dashed border-2 border-neutral-200">
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-400 mb-4 shadow-xs">
          <Icon className="h-7 w-7" />
        </div>
      )}
      <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
      {description && (
        <p className="text-sm text-neutral-500 mt-1 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}