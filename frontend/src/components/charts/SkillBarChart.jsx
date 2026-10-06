import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a0a0a] text-white px-3 py-2 rounded-lg shadow-xl border border-[#262626] text-xs">
        <p className="font-semibold text-[#d8d7d2]">{label}</p>
        <p className="text-orange-400 font-bold mt-0.5">
          {payload[0].value} <span className="text-[#8c8b88] font-normal">pts</span>
        </p>
      </div>
    )
  }
  return null
}

export default function SkillBarChart({ data, dataKey = 'proficiency', nameKey = 'name', color = '#f97316' }) {
  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0ed" vertical={false} />
          <XAxis
            dataKey={nameKey}
            tick={{ fontSize: 11, fill: '#737372' }}
            angle={-30}
            textAnchor="end"
            interval={0}
            axisLine={{ stroke: '#e5e5e0' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: '#737372' }}
            axisLine={{ stroke: '#e5e5e0' }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} maxBarSize={42} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}