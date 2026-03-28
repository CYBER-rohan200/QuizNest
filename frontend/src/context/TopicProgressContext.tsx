import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  loadProgress,
  saveProgress,
  type TopicProgressRecord,
  type TopicProgressStats,
} from '../services/topicProgressStore'

const MASTERY_ACCURACY_THRESHOLD = 70
const MIN_ATTEMPTS_FOR_MASTERY = 1

function statsFromRecord(rec: TopicProgressRecord): TopicProgressStats {
  const { questionsAttempted, correctCount } = rec
  const accuracyPercent =
    questionsAttempted > 0 ? Math.round((correctCount / questionsAttempted) * 100) : 0
  const mastered =
    questionsAttempted >= MIN_ATTEMPTS_FOR_MASTERY &&
    accuracyPercent >= MASTERY_ACCURACY_THRESHOLD

  return {
    ...rec,
    accuracyPercent,
    mastered,
  }
}

type TopicProgressContextValue = {
  getTopicProgressStats: (subjectId: string, chapterId: string, topicId: string) => TopicProgressStats
  recordTopicAttempt: (subjectId: string, chapterId: string, topicId: string, correct: boolean, questionId?: string) => void
  getCompletedQuestionIds: (subjectId: string, chapterId: string, topicId: string) => string[]
}

const TopicProgressContext = createContext<TopicProgressContextValue | undefined>(undefined)

type TopicProgressProviderProps = {
  children: ReactNode
  userId?: string
}

export function TopicProgressProvider({ children, userId = 'guest' }: TopicProgressProviderProps) {
  const [progress, setProgress] = useState<Record<string, TopicProgressRecord>>(() =>
    typeof window === 'undefined' ? {} : loadProgress(userId),
  )

  useEffect(() => {
    saveProgress(progress, userId)
  }, [progress, userId])

  const getTopicProgressStats = useCallback(
    (subjectId: string, chapterId: string, topicId: string): TopicProgressStats => {
      const key = `${subjectId}:${chapterId}:${topicId}`
      const rec = progress[key] ?? { questionsAttempted: 0, correctCount: 0, completedQuestionIds: [] }
      return statsFromRecord(rec)
    },
    [progress],
  )

  const getCompletedQuestionIds = useCallback(
    (subjectId: string, chapterId: string, topicId: string): string[] => {
      const key = `${subjectId}:${chapterId}:${topicId}`
      const rec = progress[key] ?? { completedQuestionIds: [] }
      return rec.completedQuestionIds || []
    },
    [progress],
  )

  const recordTopicAttempt = useCallback(
    (subjectId: string, chapterId: string, topicId: string, correct: boolean, questionId?: string) => {
      const key = `${subjectId}:${chapterId}:${topicId}`
      setProgress((prev) => {
        const current = prev[key] ?? { questionsAttempted: 0, correctCount: 0, completedQuestionIds: [] }
        const completedIds = [...(current.completedQuestionIds || [])]
        
        if (correct && questionId && !completedIds.includes(questionId)) {
          completedIds.push(questionId)
        }
        
        return {
          ...prev,
          [key]: {
            questionsAttempted: current.questionsAttempted + 1,
            correctCount: current.correctCount + (correct ? 1 : 0),
            completedQuestionIds: completedIds,
          },
        }
      })
    },
    [],
  )

  const value = useMemo<TopicProgressContextValue>(
    () => ({
      getTopicProgressStats,
      recordTopicAttempt,
      getCompletedQuestionIds,
    }),
    [getTopicProgressStats, recordTopicAttempt, getCompletedQuestionIds],
  )

  return (
    <TopicProgressContext.Provider value={value}>
      {children}
    </TopicProgressContext.Provider>
  )
}

export function useTopicProgress() {
  const ctx = useContext(TopicProgressContext)
  if (!ctx) {
    throw new Error('useTopicProgress must be used within a TopicProgressProvider')
  }
  return ctx
}
