import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Pair = { term: string; definition: string }

type TopicMatchGameProps = {
  topicName: string
  pairs: Pair[]
  onComplete?: () => void
}

function TopicMatchGame({ topicName, pairs, onComplete }: TopicMatchGameProps) {
  const [shuffledTerms, setShuffledTerms] = useState<string[]>([])
  const [definitions, setDefinitions] = useState<Pair[]>([])
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [selectedDefIndex, setSelectedDefIndex] = useState<number | null>(null)
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const initGame = useCallback(() => {
    const shuffled = [...pairs].map((p) => p.term).sort(() => Math.random() - 0.5)
    const defs = [...pairs].sort(() => Math.random() - 0.5)
    setShuffledTerms(shuffled)
    setDefinitions(defs)
    setSelectedTerm(null)
    setSelectedDefIndex(null)
    setMatches({})
    setScore(0)
    setIsComplete(false)
  }, [pairs])

  useEffect(() => {
    if (pairs.length > 0) initGame()
  }, [initGame, pairs])

  if (pairs.length === 0) {
    return (
      <div className="rounded-xl border border-emerald-500/40 bg-black/60 p-6 text-center">
        <p className="text-emerald-300">No visualization content for this topic yet.</p>
      </div>
    )
  }
  if (shuffledTerms.length === 0) {
    return (
      <div className="rounded-xl border border-emerald-500/40 bg-black/60 p-6 text-center">
        <p className="text-emerald-300">Loading...</p>
      </div>
    )
  }

  const handleTermClick = (term: string) => {
    if (matches[term]) return
    if (selectedTerm === term) {
      setSelectedTerm(null)
      return
    }
    setSelectedTerm(term)
    if (selectedDefIndex !== null) {
      const def = definitions[selectedDefIndex]
      const correctTerm = pairs.find((p) => p.definition === def.definition)?.term
      if (correctTerm === term) {
        setMatches((m) => ({ ...m, [term]: def.definition }))
        setScore((s) => s + 10)
        if (Object.keys(matches).length + 1 === pairs.length) {
          setIsComplete(true)
          onComplete?.()
        }
      }
      setSelectedDefIndex(null)
    }
  }

  const handleDefClick = (index: number) => {
    const def = definitions[index]
    if (Object.values(matches).includes(def.definition)) return
    if (selectedDefIndex === index) {
      setSelectedDefIndex(null)
      return
    }
    setSelectedDefIndex(index)
    if (selectedTerm) {
      const correctTerm = pairs.find((p) => p.definition === def.definition)?.term
      if (correctTerm === selectedTerm) {
        setMatches((m) => ({ ...m, [selectedTerm]: def.definition }))
        setScore((s) => s + 10)
        if (Object.keys(matches).length + 1 === pairs.length) {
          setIsComplete(true)
          onComplete?.()
        }
      }
      setSelectedTerm(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-emerald-200">Score: {score}</span>
        <button
          type="button"
          onClick={initGame}
          className="rounded-lg border border-emerald-500/50 bg-black/80 px-3 py-1.5 text-xs font-medium text-emerald-100 hover:bg-emerald-500/10"
        >
          Restart
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isComplete ? (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border-2 border-emerald-500/60 bg-black/80 p-6 text-center shadow-[0_0_32px_rgba(16,185,129,0.4)]"
          >
            <p className="text-xl font-semibold text-emerald-300">Topic complete!</p>
            <p className="mt-2 text-sm text-emerald-200">Score: {score}</p>
            <p className="mt-1 text-xs text-emerald-300/80">
              You matched all terms in {topicName}.
            </p>
            <button
              type="button"
              onClick={initGame}
              className="mt-4 rounded-lg bg-emerald-500/80 px-4 py-2 text-sm font-medium text-emerald-950 hover:bg-emerald-400"
            >
              Play again
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Terms
              </h3>
              {shuffledTerms.map((term) => {
                const matched = !!matches[term]
                const selected = selectedTerm === term
                return (
                  <motion.button
                    key={term}
                    type="button"
                    onClick={() => handleTermClick(term)}
                    disabled={matched}
                    whileHover={!matched ? { scale: 1.02 } : {}}
                    whileTap={!matched ? { scale: 0.98 } : {}}
                    className={`w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${
                      matched
                        ? 'border-emerald-500/60 bg-emerald-500/20 text-emerald-200'
                        : selected
                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                        : 'border-emerald-500/40 bg-black/60 text-emerald-100 hover:border-emerald-400 hover:bg-emerald-500/10'
                    }`}
                  >
                    {matched ? '✓ ' : ''}
                    {term}
                  </motion.button>
                )
              })}
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Definitions
              </h3>
              {definitions.map((def, index) => {
                const matched = Object.values(matches).includes(def.definition)
                const selected = selectedDefIndex === index
                return (
                  <motion.button
                    key={`${def.definition}-${index}`}
                    type="button"
                    onClick={() => handleDefClick(index)}
                    disabled={matched}
                    whileHover={!matched ? { scale: 1.02 } : {}}
                    whileTap={!matched ? { scale: 0.98 } : {}}
                    className={`w-full rounded-lg border px-4 py-3 text-left text-sm text-slate-200 transition-all ${
                      matched
                        ? 'border-emerald-500/60 bg-emerald-500/20'
                        : selected
                        ? 'border-cyan-400 bg-cyan-500/20'
                        : 'border-emerald-500/30 bg-black/60 hover:border-emerald-400 hover:bg-emerald-500/10'
                    }`}
                  >
                    {matched ? '✓ ' : ''}
                    {def.definition}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TopicMatchGame
