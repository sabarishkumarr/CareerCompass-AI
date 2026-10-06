import React from 'react'

const STATUS_CONFIG = {
  APPLIED: { label: 'Applied', style: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
  UNDER_REVIEW: { label: 'Under Review', style: 'bg-amber-50 text-amber-800 border-amber-200', dot: 'bg-amber-500' },
  SHORTLISTED: { label: 'Shortlisted', style: 'bg-stone-100 text-stone-800 border-stone-300', dot: 'bg-stone-600' },
  INTERVIEW: { label: 'Interview', style: 'bg-orange-100 text-orange-900 border-orange-300', dot: 'bg-orange-600' },
  SELECTED: { label: 'Selected', style: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  REJECTED: { label: 'Rejected', style: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
  WITHDRAWN: { label: 'Withdrawn', style: 'bg-neutral-100 text-neutral-600 border-neutral-200', dot: 'bg-neutral-400' },
  ACTIVE: { label: 'Active', style: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  CLOSED: { label: 'Closed', style: 'bg-neutral-100 text-neutral-600 border-neutral-200', dot: 'bg-neutral-400' },
  DRAFT: { label: 'Draft', style: 'bg-neutral-100 text-neutral-600 border-neutral-200', dot: 'bg-neutral-400' },
}

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || {
    label: status?.replace(/_/g, ' ') || 'Unknown',
    style: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    dot: 'bg-neutral-400',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.style}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  )
}