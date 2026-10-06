import React, { useEffect, useState, useRef } from 'react'

export default function CountUp({
  end,
  start = 0,
  duration = 1600,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) {
  const [count, setCount] = useState(start)
  const [hasAnimated, setHasAnimated] = useState(false)
  const countRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateCount()
          }
        })
      },
      { threshold: 0.1 }
    )

    const currentEl = countRef.current
    if (currentEl) observer.observe(currentEl)

    return () => {
      if (currentEl) observer.unobserve(currentEl)
    }
  }, [hasAnimated, end, duration])

  const animateCount = () => {
    const startTime = performance.now()
    const target = typeof end === 'string' ? parseFloat(end) : end

    const step = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const currentVal = start + (target - start) * easeProgress

      setCount(currentVal)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    requestAnimationFrame(step)
  }

  const formattedValue =
    decimals > 0
      ? Number(count).toFixed(decimals)
      : Math.round(Number(count)).toLocaleString()

  return (
    <span ref={countRef} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  )
}
