'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Mint "data rain" hero decoration. Inspired by the Vapi reference but
 * tinted to SOYL's mint palette so it reads as on-brand instead of
 * rainbow-disco. Pure 2D canvas — no R3F bundle weight.
 *
 * Each column drops a stack of pills at a steady velocity, restarts when
 * it scrolls off, and uses mint opacity variants for visual depth.
 * `prefers-reduced-motion` freezes the animation at a static frame so
 * users who opt out still see a quiet decoration.
 */
export default function MintDataRain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const canvasMaybe = canvasRef.current
    if (!canvasMaybe) return
    const ctxMaybe = canvasMaybe.getContext('2d')
    if (!ctxMaybe) return
    // Locals narrowed for the nested closures. TS won't carry the null
    // check from this effect body into resize/frame() if we leave the
    // originals as captured `let`-likes.
    const canvas: HTMLCanvasElement = canvasMaybe
    const ctx: CanvasRenderingContext2D = ctxMaybe

    let raf = 0
    let mounted = true

    const PILL_W = 6
    const PILL_H = 14
    const GAP_X = 24
    const GAP_Y = 10
    // Mint opacity variants. Lower values dominate so the field reads as
    // restrained rather than the saturated Vapi palette.
    const COLORS = [
      'rgba(175,208,204,0.85)',
      'rgba(175,208,204,0.55)',
      'rgba(175,208,204,0.30)',
      'rgba(175,208,204,0.18)',
      'rgba(175,208,204,0.10)',
    ]

    type Column = { x: number; offset: number; speed: number; pattern: number[] }
    let columns: Column[] = []
    let height = 0

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      height = rect.height
      const colCount = Math.max(8, Math.floor(rect.width / (PILL_W + GAP_X)))
      columns = Array.from({ length: colCount }, (_, i) => ({
        x: i * (PILL_W + GAP_X) + GAP_X / 2,
        offset: Math.random() * rect.height,
        speed: 0.25 + Math.random() * 0.6,
        // Pre-bake an opacity pattern per column so it has visual identity.
        pattern: Array.from({ length: 16 }, () => Math.floor(Math.random() * COLORS.length)),
      }))
    }

    function frame() {
      if (!mounted) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const col of columns) {
        const cycle = height + col.pattern.length * (PILL_H + GAP_Y)
        col.offset = (col.offset + col.speed) % cycle
        // Draw pills from -offset upward so the column scrolls downward.
        for (let i = 0; i < col.pattern.length; i++) {
          const y = -col.offset + i * (PILL_H + GAP_Y)
          if (y < -PILL_H || y > height) continue
          ctx.fillStyle = COLORS[col.pattern[i]]
          // Pill = rounded-corner rect via path.
          const r = PILL_W / 2
          ctx.beginPath()
          ctx.moveTo(col.x + r, y)
          ctx.lineTo(col.x + PILL_W - r, y)
          ctx.arc(col.x + PILL_W - r, y + r, r, -Math.PI / 2, 0)
          ctx.lineTo(col.x + PILL_W, y + PILL_H - r)
          ctx.arc(col.x + PILL_W - r, y + PILL_H - r, r, 0, Math.PI / 2)
          ctx.lineTo(col.x + r, y + PILL_H)
          ctx.arc(col.x + r, y + PILL_H - r, r, Math.PI / 2, Math.PI)
          ctx.lineTo(col.x, y + r)
          ctx.arc(col.x + r, y + r, r, Math.PI, -Math.PI / 2)
          ctx.fill()
        }
      }
      if (!prefersReduced) raf = requestAnimationFrame(frame)
    }

    resize()
    frame()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      mounted = false
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [prefersReduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className ?? 'absolute inset-0 w-full h-full pointer-events-none'}
    />
  )
}
