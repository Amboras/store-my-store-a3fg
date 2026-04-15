'use client'

import { useState, useEffect } from 'react'
import { Clock, Flame, Eye, TrendingUp } from 'lucide-react'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function ProductPageClient() {
  const [time, setTime] = useState({ h: 5, m: 43, s: 17 })
  const [viewers, setViewers] = useState(23)
  const [salesCount, setSalesCount] = useState(47)

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 23; m = 59; s = 59 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Randomly fluctuate viewer count
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2
        return Math.max(14, Math.min(47, prev + delta))
      })
    }, 4800)
    return () => clearInterval(interval)
  }, [])

  // Slowly increment sales count
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.65) {
        setSalesCount((prev) => prev + 1)
      }
    }, 12000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-2.5">
      {/* Sale countdown */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200">
        <Clock className="h-4 w-4 text-amber-600 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-amber-700 font-semibold">
            Launch price ends in
          </p>
        </div>
        <div className="flex items-center gap-1 font-mono text-sm font-bold text-amber-800 tabular-nums">
          <span className="bg-amber-100 px-1.5 py-0.5 rounded">{pad(time.h)}</span>
          <span className="opacity-60">:</span>
          <span className="bg-amber-100 px-1.5 py-0.5 rounded">{pad(time.m)}</span>
          <span className="opacity-60">:</span>
          <span className="bg-amber-100 px-1.5 py-0.5 rounded">{pad(time.s)}</span>
        </div>
      </div>

      {/* Live activity row */}
      <div className="flex items-center justify-between gap-4 px-1">
        {/* Live viewers */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
          </span>
          <Eye className="h-3.5 w-3.5" />
          <span>
            <strong className="text-navy font-semibold">{viewers}</strong> viewing now
          </span>
        </div>

        {/* Recent sales */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <TrendingUp className="h-3.5 w-3.5 text-teal" />
          <span>
            <strong className="text-navy font-semibold">{salesCount}</strong> sold today
          </span>
          <Flame className="h-3.5 w-3.5 text-orange-400" />
        </div>
      </div>
    </div>
  )
}
