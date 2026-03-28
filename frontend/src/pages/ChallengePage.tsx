import { useEffect, useMemo, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLevel } from '../context/LevelContext'
import { useStreak } from '../context/StreakContext'
import { getQuestions } from '../services/questionEngine'
import { canonicalTopicName, findTopicMeta } from '../services/topicLookup'
import { useLanguage } from '../context/LanguageContext'
import { getText } from '../utils/getText'
import { UI_TRANSLATIONS } from '../translations/ui'

type ChallengeOption = { id: string; text: string }
type ChallengeQuestion = {
  id: string
  question: string
  options: ChallengeOption[]
  correctOptionId: string
  explanation: string
}

const XP_PER_CORRECT = 25
const INITIAL_TIME_SECONDS = 30

function ChallengePage() {
  const { topicId } = useParams<{ topicId: string }>()
  const location = useLocation()
  const state = (location.state as { topicName?: string } | null) ?? null
  const topicLabel = state?.topicName ?? topicId ?? 'Challenge'
  const { addXP, xpRewardMultiplier, bossHealthMultiplier, unlocks } = useLevel()
  const { markDailyActivityComplete } = useStreak()

  const topicMeta = useMemo(() => findTopicMeta(topicId), [topicId])
  const { language } = useLanguage()
  const t = UI_TRANSLATIONS[language]

  const [questions, setQuestions] = useState<ChallengeQuestion[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchChallengeQuestions() {
      setIsLoading(true)
      let rawPool: any[] = []

      if (!topicMeta) {
        rawPool = await getQuestions({ mode: 'challenge', level: 1 })
      } else {
        const topicName = canonicalTopicName(topicMeta.topicId, topicMeta.topicName)
        rawPool = await getQuestions({
          subject: topicMeta.subjectName,
          chapter: topicMeta.chapterName,
          topic: topicName,
          mode: 'challenge',
        })
      }

      if (!rawPool.length) {
        setQuestions([])
        setIsLoading(false)
        return
      }

      const mapped: ChallengeQuestion[] = rawPool.map((q, index) => {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f']
        const opts = q.options ?? []
        const mappedOptions: ChallengeOption[] = opts.map((opt: any, idx: number) => ({
          id: letters[idx] ?? String(idx),
          text: getText(opt, language),
        }))

        const correctIndex = opts.findIndex((opt: any) => getText(opt, 'en') === getText(q.correctAnswer || '', 'en'))
        const safeIndex = correctIndex >= 0 && correctIndex < mappedOptions.length ? correctIndex : 0
        const correctOptionId = mappedOptions[safeIndex]?.id ?? 'a'

        return {
          id: q.id ?? `c-${index}`,
          question: getText(q.question, language),
          options: mappedOptions,
          correctOptionId,
          explanation: getText(q.explanation || 'Review the concept and compare your answer with the correct option.', language),
        }
      })

      setQuestions(mapped)
      setCurrentBossHealth(Math.round(100 * bossHealthMultiplier))
      setIsLoading(false)
    }

    fetchChallengeQuestions()
  }, [topicMeta, language, bossHealthMultiplier])

  const [hearts, setHearts] = useState(3)
  const [xp, setXp] = useState(0)
  const [currentBossHealth, setCurrentBossHealth] = useState(0)
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_SECONDS)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [wrongAnswerLocked, setWrongAnswerLocked] = useState(false)

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length
  const questionNumber = currentIndex + 1
  const scaledXpPerCorrect = Math.round(XP_PER_CORRECT * xpRewardMultiplier)
  const initialBossHealth = Math.round(100 * bossHealthMultiplier)
  const damagePerQuestion = totalQuestions > 0 ? Math.ceil(initialBossHealth / totalQuestions) : 0

  useEffect(() => {
    if (!showFeedback && !wrongAnswerLocked) {
      const t = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(t)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(t)
    }
  }, [showFeedback, wrongAnswerLocked, currentIndex])

  useEffect(() => {
    if (timeLeft === 0 && !showFeedback) {
      setHearts((h) => Math.max(0, h - 1))
      setShowFeedback(true)
      setIsCorrect(false)
      setWrongAnswerLocked(true)
    }
  }, [timeLeft, showFeedback])

  function handleSelectOption(optionId: string) {
    if (showFeedback || wrongAnswerLocked) return
    setSelectedOptionId(optionId)
  }

  function handleSubmit() {
    if (!selectedOptionId || !currentQuestion) return
    const correct = selectedOptionId === currentQuestion.correctOptionId
    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      setXp((prev) => prev + scaledXpPerCorrect)
      addXP(scaledXpPerCorrect)
      setCurrentBossHealth((prev) => Math.max(0, prev - damagePerQuestion))
      setWrongAnswerLocked(false)
    } else {
      setHearts((h) => Math.max(0, h - 1))
      setWrongAnswerLocked(true)
    }
  }

  function handleNextQuestion() {
    if (wrongAnswerLocked) return
    setCurrentIndex((prev) => prev + 1)
    setSelectedOptionId(null)
    setShowFeedback(false)
    setIsCorrect(null)
    setWrongAnswerLocked(false)
    setTimeLeft(INITIAL_TIME_SECONDS)
  }

  const gameOver = hearts <= 0
  const challengeComplete = !currentQuestion && totalQuestions > 0

  useEffect(() => {
    if (gameOver || challengeComplete) markDailyActivityComplete()
  }, [gameOver, challengeComplete, markDailyActivityComplete])

  if (!unlocks.bossMode) {
    return (
      <div className="section-spacing">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center rounded-2xl border border-emerald-500/60 bg-black/85 p-8 shadow-[0_0_36px_rgba(16,185,129,0.7)]"
        >
          <div className="mb-4 flex items-center justify-center">
            <span className="text-4xl" aria-hidden>
              🔒
            </span>
          </div>
          <h2 className="text-xl font-semibold text-emerald-200 mb-2">
            {t.bossModeLocked}
          </h2>
          <p className="text-sm text-emerald-100/80 mb-2">
            {t.reachLevel}
          </p>
          <p className="text-xs text-emerald-200/75">
            {t.playQuizzesToUnlock}
          </p>
        </motion.div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="section-spacing flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
          <p className="text-emerald-300 font-medium animate-pulse">Summoning the Boss...</p>
        </div>
      </div>
    )
  }

  if (gameOver) {
    return (
      <div className="section-spacing">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center rounded-2xl border border-red-500/50 bg-black/80 p-8 shadow-[0_0_32px_rgba(239,68,68,0.4)]"
        >
          <p className="text-4xl mb-4" aria-hidden>💀</p>
          <h2 className="text-2xl font-semibold text-red-300 mb-2">{t.gameOver}</h2>
          <p className="text-emerald-200/80 mb-4">{t.outOfHearts}</p>
          <p className="text-sm text-emerald-300 font-mono mb-6">{t.finalXp}: {xp}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-xl bg-emerald-500/80 px-6 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-400"
          >
            {t.tryAgain}
          </button>
        </motion.div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="section-spacing">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center rounded-2xl border border-emerald-500/50 bg-black/80 p-8 shadow-[0_0_32px_rgba(16,185,129,0.4)]"
        >
          <p className="text-4xl mb-4" aria-hidden>🏆</p>
          <h2 className="text-2xl font-semibold text-emerald-300 mb-2">{t.challengeComplete}</h2>
          <p className="text-emerald-200/80 mb-6">{t.clearedAll}</p>
          <p className="text-sm text-emerald-300 font-mono">{t.totalXp}: {xp}</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="section-spacing">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header: Health, XP, Timer */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-500/40 bg-black/70 px-4 py-3 shadow-[0_0_24px_rgba(16,185,129,0.5)]"
        >
          <div className="flex items-center gap-4">
            {/* Health bar */}
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`text-2xl transition-opacity ${
                    i <= hearts ? 'opacity-100' : 'opacity-30 grayscale'
                  }`}
                  aria-hidden
                >
                  ❤️
                </span>
              ))}
            </div>
            {/* Boss health + run XP */}
            <div className="flex items-center gap-4">
              <div className="w-24">
                <div className="flex items-center justify-between text-[10px] text-emerald-300/80 mb-0.5">
                  <span>{t.bossHp}</span>
                  <span className="font-mono">{currentBossHealth}</span>
                </div>
                <div className="h-1.5 rounded-full bg-emerald-900/80 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-400 to-lime-400"
                    initial={{ width: '100%' }}
                    animate={{ width: `${Math.max(0, (currentBossHealth / initialBossHealth) * 100)}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
              <div className="w-20">
                <div className="flex items-center justify-between text-[10px] text-emerald-300/80 mb-0.5">
                  <span>{t.runXp}</span>
                  <span className="font-mono">{xp}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-emerald-300/80">
              Q{questionNumber}/{totalQuestions}
            </span>
            <div
              className={`font-mono text-lg font-semibold ${
                timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-emerald-300'
              }`}
            >
              {timeLeft}s
            </div>
          </div>
        </motion.div>

        {/* Question area */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-emerald-500/30 bg-black/60 p-5 md:p-6 shadow-[0_0_28px_rgba(16,185,129,0.35)]"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/80 mb-2">
            {topicLabel}
          </p>
          <p className="text-base md:text-lg font-medium text-emerald-50 mb-6">
            {currentQuestion.question}
          </p>

          {/* Option buttons */}
          <div className="space-y-2">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id
              const isCorrectOpt = opt.id === currentQuestion.correctOptionId
              const canInteract = !showFeedback || wrongAnswerLocked
              let style = 'border-slate-700 hover:border-emerald-500/60'
              if (showFeedback && !wrongAnswerLocked) {
                if (isCorrectOpt) style = 'border-emerald-400 bg-emerald-500/15'
                else if (isSelected) style = 'border-red-500 bg-red-500/15'
              } else if (showFeedback && wrongAnswerLocked && isCorrectOpt) {
                style = 'border-emerald-400 bg-emerald-500/15'
              } else if (isSelected) style = 'border-emerald-400 bg-emerald-500/10'

              return (
                <motion.button
                  key={opt.id}
                  type="button"
                  disabled={!canInteract}
                  whileHover={canInteract ? { scale: 1.01 } : undefined}
                  whileTap={canInteract ? { scale: 0.99 } : undefined}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors disabled:cursor-not-allowed ${style}`}
                >
                  <span className="text-emerald-100">{opt.text}</span>
                </motion.button>
              )
            })}
          </div>

          {/* Submit / Next */}
          <div className="mt-6 flex justify-end">
            {!showFeedback || wrongAnswerLocked ? (
              <motion.button
                type="button"
                disabled={!selectedOptionId}
                whileHover={selectedOptionId ? { scale: 1.02 } : undefined}
                whileTap={selectedOptionId ? { scale: 0.98 } : undefined}
                onClick={handleSubmit}
                className="rounded-xl bg-gradient-to-r from-emerald-500 to-lime-500 px-6 py-2.5 text-sm font-semibold text-emerald-950 shadow-[0_0_20px_rgba(74,222,128,0.8)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {wrongAnswerLocked ? t.submitCorrect : t.submit}
              </motion.button>
            ) : (
              <motion.button
                type="button"
                onClick={handleNextQuestion}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-xl border border-emerald-500/60 bg-black/80 px-6 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-500/15"
              >
                {currentIndex < totalQuestions - 1 ? t.nextQ : t.finish}
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Wrong answer: Lottie placeholder + explanation */}
        {showFeedback && !isCorrect && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-red-500/50 bg-red-950/40 p-5 shadow-[0_0_24px_rgba(239,68,68,0.3)]"
          >
            <div className="flex items-start gap-4">
              {/* Lottie placeholder */}
              <div className="flex-shrink-0 w-20 h-20 rounded-xl border border-red-500/40 bg-black/60 flex items-center justify-center">
                <span className="text-3xl" aria-hidden>
                  😵
                </span>
                <span className="sr-only">Wrong answer animation placeholder</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-red-200 mb-1">{t.wrongAnswer}</p>
                <p className="text-xs text-red-100/90 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
                <p className="mt-2 text-[11px] text-red-300/80">
                  {t.selectCorrectToContinue}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Correct answer feedback (brief) */}
        {showFeedback && isCorrect && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-emerald-500/50 bg-emerald-950/30 px-4 py-2 text-sm text-emerald-200"
          >
            +{scaledXpPerCorrect} XP · Correct!
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ChallengePage
