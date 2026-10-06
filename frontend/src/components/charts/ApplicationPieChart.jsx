import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const PALETTE = ['#f97316', '#c98a3d', '#10b981', '#78716c', '#171717', '#a8a29e']

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div className="bg-[#0a0a0a] text-white px-3 py-2 rounded-lg shadow-xl border border-[#262626] text-xs">
        <p className="font-semibold text-[#d8d7d2]">{data.name}</p>
        <p className="text-orange-400 font-bold mt-0.5">
          {data.value} <span className="text-[#8c8b88] font-normal">applications</span>
        </p>
      </div>
    )
  }
  return null
}

export default function ApplicationPieChart({ data }) {
  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {data?.map((_, index) => (
              <Cell key={`cell-${index}`} fill={PALETTE[index % PALETTE.length]} stroke="#ffffff" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}