import React, { useEffect, useRef, useState } from 'react'

export default function ScrollReveal({
  children,
  className = '',
  threshold = 0.15,
  delay = 0,
  direction = 'up',
}) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (domRef.current) observer.unobserve(domRef.current)
          }
        })
      },
      { threshold }
    )

    const currentEl = domRef.current
    if (currentEl) {
      observer.observe(currentEl)
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl)
    }
  }, [threshold])

  const getTransform = () => {
    if (isVisible) return 'translate-x-0 translate-y-0 opacity-100'
    switch (direction) {
      case 'up':
        return 'translate-y-8 opacity-0'
      case 'down':
        return '-translate-y-8 opacity-0'
      case 'left':
        return 'translate-x-8 opacity-0'
      case 'right':
        return '-translate-x-8 opacity-0'
      case 'none':
        return 'opacity-0'
      default:
        return 'translate-y-8 opacity-0'
    }
  }

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${getTransform()} ${className}`}
    >
      {children}
    </div>
  )
}
