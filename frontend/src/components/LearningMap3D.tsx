import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { Difficulty } from '../data/subjects'
import { useLanguage } from '../context/LanguageContext'
import { UI_TRANSLATIONS } from '../translations/ui'

type MapTopic = {
  id: string
  name: string
  difficulty: Difficulty
  locked?: boolean
  unlockAtLevel?: number
  mastered?: boolean
}

type PositionedTopic = MapTopic & {
  x: number
  y: number
  depth: number
}

type LearningMap3DProps = {
  topics: MapTopic[]
  onSelectTopic?: (topicId: string) => void
}

const MIN_ZOOM = 0.7
const MAX_ZOOM = 1.6

function generateLayout(topics: MapTopic[]): PositionedTopic[] {
  const count = topics.length || 1
  const radiusBase = 120

  return topics.map((topic, index) => {
    const angle = (index / count) * Math.PI * 2
    const radialJitter = 0.75 + 0.4 * Math.sin(index * 1.7)
    const radius = radiusBase * radialJitter

    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius * 0.7

    const depth = 0.2 + 0.7 * ((index % 5) / 4)

    return {
      ...topic,
      x,
      y,
      depth,
    }
  })
}

function difficultyColor(difficulty: Difficulty): string {
  if (difficulty === 'easy') return 'from-emerald-400/80 via-emerald-500/80 to-lime-400/80'
  if (difficulty === 'medium') return 'from-cyan-400/80 via-sky-400/80 to-fuchsia-400/80'
  return 'from-rose-500/90 via-fuchsia-500/90 to-amber-400/90'
}

function bossIcon() {
  return (
    <span aria-hidden className="ml-1 text-[11px]">
      👑
    </span>
  )
}

function LearningMap3D({ topics, onSelectTopic }: LearningMap3DProps) {
  const [zoom, setZoom] = useState(1)
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [unlockingId, setUnlockingId] = useState<string | null>(null)
  
  const { language } = useLanguage()
  const t = UI_TRANSLATIONS[language]

  const layout = useMemo(() => generateLayout(topics), [topics])

  const focusedNode = layout.find((node) => node.id === focusedId) ?? layout[0]

  useEffect(() => {
    setZoom(1)
    setFocusedId(layout[0]?.id ?? null)
  }, [topics.length])

  function clampZoom(value: number) {
    return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value))
  }

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    const delta = -event.deltaY * 0.001
    setZoom((z) => clampZoom(z + delta))
  }

  function handleNodeClick(node: PositionedTopic) {
    const isLocked = !!node.locked
    setFocusedId(node.id)

    if (isLocked) {
      setUnlockingId(node.id)
      setTimeout(() => {
        setUnlockingId((current) => (current === node.id ? null : current))
      }, 550)
      return
    }

    onSelectTopic?.(node.id)
  }

  return (
    <div className="relative h-[320px] md:h-[360px] rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-black/80 via-slate-950/80 to-black/90 overflow-hidden shadow-[0_0_34px_rgba(16,185,129,0.5)]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.22),transparent_60%)]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom,_rgba(8,47,73,0.9),transparent_55%)]" />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(15,23,42,0.75)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.75)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-black/70 border border-emerald-500/40 px-2 py-1 text-[10px] text-emerald-100/80 backdrop-blur">
        <span className="hidden sm:inline text-emerald-300/90">{t.zoomOptions}</span>
        <button
          type="button"
          onClick={() => setZoom((z) => clampZoom(z - 0.15))}
          className="h-5 w-5 flex items-center justify-center rounded-full bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/60"
        >
          -
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => clampZoom(z + 0.15))}
          className="h-5 w-5 flex items-center justify-center rounded-full bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/60"
        >
          +
        </button>
        <span className="ml-0.5 font-mono text-[9px] text-emerald-300/80">
          {(zoom * 100).toFixed(0)}%
        </span>
      </div>

      <div className="absolute left-3 top-3 z-20 flex items-center gap-2 text-[10px] text-emerald-200/85">
        <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 border border-emerald-500/50 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
          <span>{t.unlocked}</span>
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 border border-slate-600/70 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
          <span>{t.locked}</span>
        </span>
      </div>

      <motion.div
        className="relative w-full h-full"
        onWheel={handleWheel}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            x: focusedNode ? -focusedNode.x * 0.45 : 0,
            y: focusedNode ? -focusedNode.y * 0.45 : 0,
            scale: zoom,
          }}
          transition={{
            type: 'spring',
            stiffness: 80,
            damping: 16,
          }}
        >
          <div className="relative h-full w-full flex items-center justify-center">
            <div className="relative h-[480px] w-[480px]">
              {layout.map((node, index) => {
                const isBoss = node.difficulty === 'hard'
                const isLocked = !!node.locked
                const isFocused = node.id === focusedNode?.id
                const isUnlocking = node.id === unlockingId

                const depthScale = 0.7 + (1 - node.depth) * 0.55
                const depthBlur = node.depth * (isFocused ? 0.5 : 2)
                const depthOpacity = 0.55 + (1 - node.depth) * 0.4

                const baseClasses =
                  'absolute rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80'

                const glowShadow = isBoss
                  ? '0 0 26px rgba(244,63,94,0.9)'
                  : '0 0 22px rgba(52,211,153,0.9)'

                const lockStyles = isLocked
                  ? 'opacity-45 grayscale contrast-75'
                  : 'opacity-100'

                return (
                  <motion.button
                    key={node.id}
                    type="button"
                    onClick={() => handleNodeClick(node)}
                    initial={{
                      x: node.x,
                      y: node.y,
                      scale: depthScale * 0.8,
                      opacity: 0,
                    }}
                    animate={{
                      x: node.x,
                      y: node.y,
                      scale: depthScale * (isFocused ? 1.05 : 1),
                      opacity: depthOpacity,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 120,
                      damping: 18,
                      delay: 0.04 * index,
                    }}
                    className={`${baseClasses} ${lockStyles}`}
                    style={{
                      left: '50%',
                      top: '50%',
                      filter: `blur(${depthBlur}px)`,
                    }}
                    whileHover={{
                      scale: depthScale * 1.1,
                      boxShadow: glowShadow,
                      filter: `blur(${Math.max(depthBlur - 0.6, 0)}px)`,
                    }}
                    whileTap={{ scale: depthScale * 0.97 }}
                    title={
                      isLocked && node.unlockAtLevel
                        ? `Unlock at Level ${node.unlockAtLevel}`
                        : undefined
                    }
                  >
                    <motion.div
                      className={`relative h-20 w-20 md:h-22 md:w-22 rounded-full border bg-gradient-to-br ${difficultyColor(
                        node.difficulty,
                      )} border-emerald-200/20 shadow-[0_0_18px_rgba(16,185,129,0.8)] flex items-center justify-center`}
                      animate={
                        isUnlocking
                          ? {
                              boxShadow: [
                                '0 0 0 rgba(52,211,153,0.0)',
                                '0 0 26px rgba(52,211,153,1)',
                                '0 0 0 rgba(52,211,153,0.0)',
                              ],
                              scale: [1, 1.18, 1],
                            }
                          : {
                              y: [0, -4, 0],
                            }
                      }
                      transition={
                        isUnlocking
                          ? { duration: 0.55, ease: 'easeOut' }
                          : {
                              duration: 6 + index * 0.2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }
                      }
                    >
                      <span className="absolute inset-0 rounded-full bg-black/25 mix-blend-soft-light" />
                      {isLocked ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg" aria-hidden>
                            🔒
                          </span>
                        </div>
                      ) : null}

                      <div className="relative px-4 text-center">
                        <p className="text-[11px] font-semibold text-emerald-50 leading-tight line-clamp-2">
                          {node.name}
                          {isBoss ? bossIcon() : null}
                        </p>
                        <p className="mt-1 text-[9px] uppercase tracking-wider text-emerald-100/70">
                          {node.difficulty}
                        </p>
                        {node.mastered ? (
                          <p className="mt-0.5 inline-flex items-center gap-0.5 rounded-full bg-amber-500/25 px-1.5 py-0.5 text-[8px] font-semibold text-amber-200">
                            <span aria-hidden>⭐</span> Mastered
                          </p>
                        ) : null}
                      </div>

                      {isBoss ? (
                        <div className="absolute inset-[-10%] rounded-full border border-rose-400/60 shadow-[0_0_26px_rgba(244,63,94,0.9)] opacity-70" />
                      ) : null}
                    </motion.div>
                  </motion.button>
                )
              })}

              <div className="pointer-events-none absolute inset-16 rounded-[40%] bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.95),_transparent_70%)] blur-3xl opacity-70" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LearningMap3D

