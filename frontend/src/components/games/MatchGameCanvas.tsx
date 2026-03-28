import { useRef, useEffect, useState, useCallback } from 'react'

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']
const POINTS_PER_MATCH = 10

type Item = { id: number; color: string; x: number; y: number; matched: boolean }
type Target = { id: number; color: string; x: number; y: number }

const RADIUS = 28
const TARGET_RADIUS = 32

function MatchGameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [items, setItems] = useState<Item[]>([])
  const [targets, setTargets] = useState<Target[]>([])
  const [score, setScore] = useState(0)
  const [levelComplete, setLevelComplete] = useState(false)
  const [dragging, setDragging] = useState<{ item: Item; offsetX: number; offsetY: number } | null>(null)

  const initLevel = useCallback(() => {
    const count = 4
    const colors = [...COLORS].sort(() => Math.random() - 0.5).slice(0, count)
    const canvas = canvasRef.current
    if (!canvas) return

    const w = canvas.width
    const h = canvas.height
    const leftX = w * 0.25
    const rightX = w * 0.75
    const spacing = h / (count + 1)

    const newItems: Item[] = colors.map((color, i) => ({
      id: i,
      color,
      x: leftX,
      y: spacing * (i + 1),
      matched: false,
    }))

    const newTargets: Target[] = [...colors].sort(() => Math.random() - 0.5).map((color, i) => ({
      id: i,
      color,
      x: rightX,
      y: spacing * (i + 1),
    }))

    setItems(newItems)
    setTargets(newTargets)
    setScore(0)
    setLevelComplete(false)
    setDragging(null)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = 400
        initLevel()
      }
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [initLevel])

  const getCanvasPoint = useCallback((e: React.MouseEvent | MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }, [])

  const hitTest = (x: number, y: number, cx: number, cy: number, r: number) =>
    Math.hypot(x - cx, y - cy) <= r

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const { x, y } = getCanvasPoint(e)
      const item = items.find((i) => !i.matched && hitTest(x, y, i.x, i.y, RADIUS))
      if (item) setDragging({ item, offsetX: x - item.x, offsetY: y - item.y })
    },
    [items, getCanvasPoint]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return
      const { x, y } = getCanvasPoint(e)
      setItems((prev) =>
        prev.map((i) =>
          i.id === dragging.item.id ? { ...i, x: x - dragging.offsetX, y: y - dragging.offsetY } : i
        )
      )
    },
    [dragging, getCanvasPoint]
  )

  const handleMouseUp = useCallback(() => {
    if (!dragging) return
    const item = items.find((i) => i.id === dragging.item.id)!
    const target = targets.find(
      (t) => t.color === item.color && hitTest(item.x, item.y, t.x, t.y, TARGET_RADIUS)
    )
    if (target) {
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, matched: true, x: target.x, y: target.y } : i))
      )
      setScore((s) => s + POINTS_PER_MATCH)
      const next = items.map((i) => (i.id === item.id ? { ...i, matched: true } : i))
      if (next.every((i) => i.matched)) setLevelComplete(true)
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, x: dragging.item.x, y: dragging.item.y } : i
        )
      )
    }
    setDragging(null)
  }, [dragging, items, targets])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height

    ctx.fillStyle = '#02040a'
    ctx.fillRect(0, 0, w, h)

    targets.forEach((t) => {
      ctx.strokeStyle = t.color
      ctx.lineWidth = 2
      ctx.setLineDash([6, 6])
      ctx.beginPath()
      ctx.arc(t.x, t.y, TARGET_RADIUS, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])
    })

    items.forEach((i) => {
      ctx.fillStyle = i.color
      ctx.shadowColor = i.color
      ctx.shadowBlur = i.matched ? 0 : 12
      ctx.beginPath()
      ctx.arc(i.x, i.y, RADIUS, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    })
  }, [items, targets])

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-emerald-200">Score: {score}</span>
        <button
          type="button"
          onClick={initLevel}
          className="rounded-lg border border-emerald-500/50 bg-black/80 px-3 py-1.5 text-xs font-medium text-emerald-100 hover:bg-emerald-500/10"
        >
          Restart
        </button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full cursor-grab rounded-xl border border-emerald-500/30 bg-[#02040a] active:cursor-grabbing"
        style={{ maxHeight: 400 }}
      />

      {levelComplete && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/80">
          <div className="rounded-2xl border border-emerald-500/60 bg-black/90 px-8 py-6 text-center shadow-[0_0_32px_rgba(16,185,129,0.6)]">
            <p className="text-xl font-semibold text-emerald-300">Level Complete!</p>
            <p className="mt-2 text-sm text-emerald-200">Score: {score}</p>
            <button
              type="button"
              onClick={initLevel}
              className="mt-4 rounded-lg bg-emerald-500/80 px-4 py-2 text-sm font-medium text-emerald-950 hover:bg-emerald-400"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MatchGameCanvas
