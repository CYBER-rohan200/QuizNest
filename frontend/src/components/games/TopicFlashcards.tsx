import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

type Pair = { term: string; definition: string }

type TopicFlashcardsProps = {
  topicName?: string
  pairs: Pair[]
  onComplete?: () => void
}

function TopicFlashcards({ pairs, onComplete }: TopicFlashcardsProps) {
  const [index, setIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const pair = pairs[index]
  const hasNext = index < pairs.length - 1
  const hasPrev = index > 0

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(i + 1, pairs.length - 1))
    setIsFlipped(false)
  }, [pairs.length])

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0))
    setIsFlipped(false)
  }, [])

  const reset = useCallback(() => {
    setIndex(0)
    setIsFlipped(false)
  }, [])

  if (pairs.length === 0) {
    return (
      <div className="rounded-xl border border-emerald-500/40 bg-black/60 p-6 text-center">
        <p className="text-emerald-300">No flashcards for this topic yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-emerald-200">
          Card {index + 1} / {pairs.length}
        </span>
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="rounded-lg border border-emerald-500/50 bg-black/80 px-3 py-1.5 text-xs font-medium text-emerald-100 hover:bg-emerald-500/10"
        >
          {showAll ? 'Cards' : 'List view'}
        </button>
      </div>

      {showAll ? (
        <div className="space-y-3">
          <div className="space-y-2 max-h-80 overflow-y-auto rounded-xl border border-emerald-500/30 bg-black/60 p-4">
            {pairs.map((p, i) => (
            <div
              key={i}
              className="flex gap-3 rounded-lg border border-emerald-500/20 bg-black/40 px-3 py-2"
            >
              <span className="text-xs font-semibold text-emerald-300 shrink-0">{i + 1}.</span>
              <div>
                <p className="text-sm font-medium text-emerald-100">{p.term}</p>
                <p className="text-xs text-slate-300 mt-0.5">{p.definition}</p>
              </div>
            </div>
          ))}
          </div>
          {onComplete && (
            <button
              type="button"
              onClick={onComplete}
              className="w-full rounded-lg bg-emerald-500/80 px-4 py-2 text-sm font-medium text-emerald-950 hover:bg-emerald-400"
            >
              Complete session
            </button>
          )}
        </div>
      ) : (
        <>
          <motion.div
            className="perspective-1000 cursor-pointer"
            onClick={() => setIsFlipped((f) => !f)}
          >
            <motion.div
              className="relative h-44 rounded-xl border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-950/80 to-black/90 shadow-[0_0_24px_rgba(16,185,129,0.3)]"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center p-6 rounded-xl"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <p className="text-lg font-semibold text-emerald-100 text-center">{pair.term}</p>
                <p className="absolute bottom-2 left-0 right-0 text-[10px] text-emerald-400/80">
                  Tap to flip
                </p>
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center p-6 rounded-xl bg-emerald-950/60"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <p className="text-sm text-emerald-200 text-center">{pair.definition}</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={goPrev}
              disabled={!hasPrev}
              className="rounded-lg border border-emerald-500/50 bg-black/80 px-4 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-emerald-500/50 bg-black/80 px-3 py-1.5 text-xs font-medium text-emerald-100 hover:bg-emerald-500/10"
            >
              Reset
            </button>
            {onComplete && (
              <button
                type="button"
                onClick={onComplete}
                className="rounded-lg bg-emerald-500/80 px-3 py-1.5 text-xs font-medium text-emerald-950 hover:bg-emerald-400"
              >
                Complete session
              </button>
            )}
            <button
              type="button"
              onClick={goNext}
              disabled={!hasNext}
              className="rounded-lg border border-emerald-500/50 bg-black/80 px-4 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default TopicFlashcards
