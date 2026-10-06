import React from 'react'
import logoImg from '../../assets/logo.png'

export default function Logo({ size = 'md', className = '', showText = true, textClassName = '' }) {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  }

  const iconSize = sizeMap[size] || sizeMap.md

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${iconSize} rounded-lg bg-black overflow-hidden flex items-center justify-center shrink-0 border border-neutral-800 shadow-sm`}>
        <img
          src={logoImg}
          alt="CareerCompass AI Logo"
          className="w-full h-full object-cover"
        />
      </div>
      {showText && (
        <div className={textClassName}>
          <span className="font-bold text-base text-white tracking-tight block leading-none">
            CareerCompass
          </span>
          <span className="text-[10px] text-orange-400 font-medium tracking-wide uppercase mt-0.5 block">
            AI Placement Suite
          </span>
        </div>
      )}
    </div>
  )
}
