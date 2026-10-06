import React from 'react'

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'orange', trend }) {
  const colorMap = {
    orange: {
      bg: 'bg-orange-50 text-orange-600 border-orange-100',
      iconBg: 'bg-orange-500/10 text-orange-600',
    },
    amber: {
      bg: 'bg-amber-50 text-amber-700 border-amber-100',
      iconBg: 'bg-amber-500/10 text-amber-700',
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      iconBg: 'bg-emerald-500/10 text-emerald-600',
    },
    green: {
      bg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      iconBg: 'bg-emerald-500/10 text-emerald-600',
    },
    neutral: {
      bg: 'bg-neutral-100 text-neutral-700 border-neutral-200',
      iconBg: 'bg-neutral-900/10 text-neutral-800',
    },
    stone: {
      bg: 'bg-stone-100 text-stone-700 border-stone-200',
      iconBg: 'bg-stone-800/10 text-stone-700',
    },
    red: {
      bg: 'bg-rose-50 text-rose-600 border-rose-100',
      iconBg: 'bg-rose-500/10 text-rose-600',
    },
    blue: {
      bg: 'bg-orange-50 text-orange-600 border-orange-100',
      iconBg: 'bg-orange-500/10 text-orange-600',
    },
  }

  const selectedColor = colorMap[color] || colorMap.orange

  return (
    <div className="card p-5 group hover:border-neutral-300 hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{title}</p>
          <p className="text-2xl font-bold tracking-tight text-neutral-900 mt-1.5">{value}</p>
          {subtitle && <p className="text-xs text-neutral-400 mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${selectedColor.iconBg} transition-transform duration-200 group-hover:scale-105`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {trend !== undefined && trend !== null && (
        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center gap-1.5">
          <span className={`inline-flex items-center text-xs font-medium px-1.5 py-0.5 rounded ${
            trend >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span className="text-[11px] text-neutral-400">vs benchmark</span>
        </div>
      )}
    </div>
  )
}