import { useMemo, useState, useEffect, useCallback } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLevel } from '../context/LevelContext'
import { useStreak } from '../context/StreakContext'
import { useTopicProgress } from '../context/TopicProgressContext'
import { getRandomQuestion } from '../services/questionEngine'
import { canonicalTopicName, findTopicMeta } from '../services/topicLookup'
import type { QuestionRecord } from '../data/questions'
import { useLanguage, type Language } from '../context/LanguageContext'
import { getText } from '../utils/getText'
import { UI_TRANSLATIONS } from '../translations/ui'

type QuizOption = {
  id: string
  text: string
}

type QuizQuestion = {
  id: string
  question: string
  options: QuizOption[]
  correctOptionId: string
}

function mapToQuizQuestion(q: QuestionRecord, language: Language): QuizQuestion {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f']
  const opts = q.options ?? []
  const mappedOptions: QuizOption[] = opts.map((opt, idx) => ({
    id: letters[idx] ?? String(idx),
    text: getText(opt, language),
  }))

  const correctIndex = opts.findIndex((opt) => getText(opt, 'en') === getText(q.correctAnswer || '', 'en'))
  const safeIndex = correctIndex >= 0 && correctIndex < mappedOptions.length ? correctIndex : 0
  const correctOptionId = mappedOptions[safeIndex]?.id ?? 'a'

  return {
    id: q.id ?? `q-${Date.now()}`,
    question: getText(q.question, language),
    options: mappedOptions,
    correctOptionId,
  }
}

function QuizPage() {
  const { topicId } = useParams<{ topicId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const state = (location.state as {
    subjectName?: string
    chapterName?: string
    topicName?: string
  } | null) ?? null
  const explicitSubject = state?.subjectName
  const explicitChapter = state?.chapterName
  const explicitTopic = state?.topicName
  const topicLabel = explicitTopic ?? topicId ?? 'Practice Run'
  const { addXP, xpRewardMultiplier, currentLevel, markTopicCompleted, suggestedNextTopic, lastCompletedTopicId } = useLevel()
  const { markDailyActivityComplete } = useStreak()
  const { recordTopicAttempt, getTopicProgressStats, getCompletedQuestionIds } = useTopicProgress()
  const topicMeta = useMemo(() => findTopicMeta(topicId), [topicId])
  const topicStats =
    topicId && topicMeta
      ? getTopicProgressStats(topicMeta.subjectId, topicMeta.chapterId, topicId)
      : null

  const resolvedSubject = topicMeta?.subjectName ?? explicitSubject
  const resolvedChapter = topicMeta?.chapterName ?? explicitChapter
  const baseTopicName = topicMeta?.topicName ?? explicitTopic ?? ''
  const resolvedTopic = canonicalTopicName(topicMeta?.topicId, baseTopicName)
  
  const completedQuestionIds = useMemo(() => {
    if (topicMeta) {
      return getCompletedQuestionIds(topicMeta.subjectId, topicMeta.chapterId, topicMeta.topicId)
    }
    return []
  }, [getCompletedQuestionIds, topicMeta])

  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [seenIds, setSeenIds] = useState<string[]>([])
  
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const { language } = useLanguage()
  const t = UI_TRANSLATIONS[language]
  const [isLoading, setIsLoading] = useState(false)

  const fetchNextQuestion = useCallback(async () => {
    if (isLoading) return
    setIsLoading(true)

    try {
      const raw = await getRandomQuestion({
        subject: resolvedSubject,
        chapter: resolvedChapter,
        topic: resolvedTopic,
        level: currentLevel,
        mode: 'quiz',
      }, [...seenIds, ...completedQuestionIds])
      
      if (raw) {
        setCurrentQuestion(mapToQuizQuestion(raw, language))
        setSeenIds(prev => [...prev, raw.id])
      }
    } finally {
      setIsLoading(false)
    }
  }, [resolvedSubject, resolvedChapter, resolvedTopic, currentLevel, seenIds, isLoading, language, completedQuestionIds])

  useEffect(() => {
    if (!currentQuestion && !isLoading) {
      fetchNextQuestion()
    }
  }, [currentQuestion, isLoading, fetchNextQuestion])

  function handleSelectOption(optionId: string) {
    if (showFeedback) return
    setSelectedOptionId(optionId)
  }

  function handleSubmit() {
    if (!selectedOptionId || !currentQuestion) return
    const correct = selectedOptionId === currentQuestion.correctOptionId
    setIsCorrect(correct)
    setShowFeedback(true)

    if (topicId && topicMeta) {
      recordTopicAttempt(topicMeta.subjectId, topicMeta.chapterId, topicId, correct, currentQuestion.id)
    }
    if (correct) {
      const baseXp = 15
      const reward = Math.round(baseXp * xpRewardMultiplier)
      addXP(reward)
    }
  }

  function handleNextQuestion() {
    fetchNextQuestion()
    setQuestionNumber((prev) => prev + 1)
    setSelectedOptionId(null)
    setShowFeedback(false)
    setIsCorrect(null)
  }
  
  function handleFinishSession() {
    if (topicId && topicMeta) {
      markTopicCompleted(topicMeta.subjectId, topicMeta.chapterId, topicId)
    }
    markDailyActivityComplete()
    navigate('/subjects')
  }

  if (!currentQuestion) {
    if (isLoading) {
      return (
        <div className="py-20 flex flex-col items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent shadow-[0_0_15px_rgba(16,185,129,0.5)] mb-4" />
          <p className="text-emerald-300 text-sm font-medium animate-pulse">Loading live questions...</p>
        </div>
      )
    }
    return (
      <div className="py-10 text-center">
        <p className="text-slate-300 text-sm mb-4">
          No questions are configured for this topic yet.
        </p>
        <button type="button" onClick={() => navigate(-1)} className="rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-100 px-4 py-2 text-sm font-medium hover:bg-emerald-500/30">
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="section-spacing">
      <div className="max-w-2xl space-y-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/80 mb-1.5">
            Endless Practice
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-1">
            Topic:{' '}
            <span className="font-mono text-emerald-300 text-base md:text-lg">
              {topicLabel}
            </span>
          </h1>
          <p className="text-xs md:text-sm text-slate-400">
            Question {questionNumber} · Current Level: {currentLevel}
          </p>
          {topicStats && topicStats.questionsAttempted > 0 ? (
            <p className="text-[11px] text-slate-500 mt-0.5">
              Topic progress: {topicStats.questionsAttempted} attempted
              {topicStats.accuracyPercent != null && topicStats.accuracyPercent > 0 ? ` · ${topicStats.accuracyPercent}% accuracy` : ''}
              {topicStats.mastered ? (
                <span className="ml-1.5 inline-flex items-center gap-0.5 text-amber-300">
                  <span aria-hidden>⭐</span> Mastered
                </span>
              ) : null}
            </p>
          ) : null}
        </div>

        {/* Progress bar (conceptual for endless) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Endless Streak</span>
            <span>
              {questionNumber} ♾️
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-fuchsia-500 shadow-[0_0_18px_rgba(56,189,248,0.85)]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
              style={{ opacity: 0.8 }}
            />
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 md:p-5 shadow-[0_0_24px_rgba(15,23,42,0.9)]"
        >
          <p className="text-sm md:text-base text-slate-50 font-medium mb-3">
            {currentQuestion.question}
          </p>

          <div className="space-y-2">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOptionId === option.id
              const isCorrectOption = option.id === currentQuestion.correctOptionId

              let borderColor = 'border-slate-700'
              let bgColor = 'bg-slate-900/70'
              if (showFeedback && isSelected) {
                if (isCorrect) {
                  borderColor = 'border-emerald-400'
                  bgColor = 'bg-emerald-500/10'
                } else {
                  borderColor = isCorrectOption ? 'border-emerald-400' : 'border-red-500'
                  bgColor = isCorrectOption ? 'bg-emerald-500/10' : 'bg-red-500/10'
                }
              } else if (isSelected) {
                borderColor = 'border-emerald-400'
                bgColor = 'bg-emerald-500/10'
              }

              return (
                <motion.button
                  key={option.id + '-' + language}
                  type="button"
                  disabled={showFeedback}
                  whileHover={!showFeedback ? { y: -1, scale: 1.01 } : undefined}
                  whileTap={!showFeedback ? { scale: 0.98 } : undefined}
                  onClick={() => handleSelectOption(option.id)}
                  className={`group relative flex w-full items-center gap-2 rounded-xl border ${borderColor} ${bgColor} px-3 py-2.5 text-left transition-colors disabled:cursor-not-allowed`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                        : 'border-slate-600 text-slate-300 group-hover:border-emerald-300 group-hover:text-emerald-200'
                    }`}
                  >
                    {option.id.toUpperCase()}
                  </span>
                  <span className="text-xs md:text-sm text-slate-100">
                    {option.text}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Actions + feedback */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex-1">
            {showFeedback && isCorrect != null ? (
              <div
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs md:text-sm ${
                  isCorrect
                    ? 'border-emerald-400/70 bg-emerald-500/10 text-emerald-100'
                    : 'border-red-500/70 bg-red-500/10 text-red-100'
                }`}
              >
                <span aria-hidden className="text-sm">
                  {isCorrect ? '✅' : '❌'}
                </span>
                <span>{isCorrect ? 'Nice! You got it right.' : 'Not quite. Check the correct answer highlight.'}</span>
              </div>
            ) : (
              <p className="text-[11px] text-slate-500">
                Select one option and hit submit to check your answer.
              </p>
            )}
          </div>

          <div className="flex gap-2 justify-end">
             {showFeedback ? (
               <div className="flex gap-2">
                 <motion.button
                   type="button"
                   onClick={handleFinishSession}
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs md:text-sm font-medium text-slate-100 hover:bg-slate-800"
                 >
                   Finish Session
                 </motion.button>
                 <motion.button
                   type="button"
                   onClick={handleNextQuestion}
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   className="inline-flex items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-100 px-3 py-2 text-xs md:text-sm font-medium hover:bg-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                 >
                   {t.nextQuestion}
                 </motion.button>
               </div>
            ) : (
              <div className="flex gap-2">
                <motion.button
                  type="button"
                  onClick={handleFinishSession}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors"
                >
                  {t.finishQuiz}
                </motion.button>
                <motion.button
                  type="button"
                  disabled={!selectedOptionId}
                  whileHover={selectedOptionId ? { scale: 1.02 } : undefined}
                  whileTap={selectedOptionId ? { scale: 0.98 } : undefined}
                  onClick={handleSubmit}
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 via-cyan-400 to-fuchsia-500 px-4 py-2 text-xs md:text-sm font-semibold text-slate-950 shadow-[0_0_18px_rgba(45,212,191,0.8)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Submit answer
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {suggestedNextTopic &&
        topicMeta &&
        lastCompletedTopicId === `${topicMeta.subjectId}:${topicMeta.chapterId}:${topicId}` ? (
          <div className="mt-2 text-[11px] text-emerald-200">
            Next topic suggestion in {suggestedNextTopic.subjectName}:{' '}
            <span className="font-semibold">{suggestedNextTopic.topicName}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default QuizPage

