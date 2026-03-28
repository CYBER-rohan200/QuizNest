import { SUBJECTS } from '../data/subjects'

function getStorageKey(userId: string) {
  return `quiznest_topic_progress_v1_${userId}`
}
function getMigrationFlagKey(userId: string) {
  return `quiznest_topic_progress_migrated_v1_${userId}`
}

const MASTERY_ACCURACY_THRESHOLD = 70
const MIN_ATTEMPTS_FOR_MASTERY = 1

/** Composite key: subjectId:chapterId:topicId — isolates progress per subject/chapter/topic */
export function makeProgressKey(subjectId: string, chapterId: string, topicId: string): string {
  return `${subjectId}:${chapterId}:${topicId}`
}

export function isCompositeKey(key: string): boolean {
  return key.includes(':')
}

export type TopicProgressRecord = {
  questionsAttempted: number
  correctCount: number
  completedQuestionIds: string[]
}

export type TopicProgressStats = TopicProgressRecord & {
  accuracyPercent: number | null
  mastered: boolean
}

/** Migrate legacy topicId-only keys to composite keys. Preserves existing data. */
function migrateLegacyProgress(raw: Record<string, TopicProgressRecord>, userId: string = 'guest'): Record<string, TopicProgressRecord> {
  if (typeof window === 'undefined') return raw
  if (window.localStorage.getItem(getMigrationFlagKey(userId)) === '1') return raw

  const out = { ...raw }
  let changed = false

  for (const [key, val] of Object.entries(raw)) {
    if (isCompositeKey(key)) continue

    let migrated = false
    for (const subject of SUBJECTS) {
      if (migrated) break
      for (const chapter of subject.chapters) {
        if (migrated) break
        for (const topic of chapter.topics) {
          if (topic.id === key) {
            const composite = makeProgressKey(subject.id, chapter.id, topic.id)
            if (!(composite in out)) {
              out[composite] = val
            }
            delete out[key]
            changed = true
            migrated = true
            break
          }
        }
      }
    }
  }

  if (changed) {
    try {
      window.localStorage.setItem(getStorageKey(userId), JSON.stringify(out))
      window.localStorage.setItem(getMigrationFlagKey(userId), '1')
    } catch {
      // ignore
    }
  } else {
    try {
      window.localStorage.setItem(getMigrationFlagKey(userId), '1')
    } catch {
      // ignore
    }
  }

  return out
}

export function loadProgress(userId: string = 'guest'): Record<string, TopicProgressRecord> {
  if (typeof window === 'undefined') return {}
  try {
    const key = getStorageKey(userId)
    let raw = window.localStorage.getItem(key)
    if (!raw && userId === 'guest') {
      raw = window.localStorage.getItem('quiznest_topic_progress_v1')
    }
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, unknown>
    if (!parsed || typeof parsed !== 'object') return {}
    const out: Record<string, TopicProgressRecord> = {}
    for (const [id, val] of Object.entries(parsed)) {
      if (val && typeof val === 'object' && 'questionsAttempted' in val && 'correctCount' in val) {
        const v = val as TopicProgressRecord
        const attempted = typeof v.questionsAttempted === 'number' && v.questionsAttempted >= 0
          ? v.questionsAttempted
          : 0
        const correct = typeof v.correctCount === 'number' && v.correctCount >= 0
          ? Math.min(v.correctCount, attempted)
          : 0
        const completedIds = Array.isArray(v.completedQuestionIds) ? v.completedQuestionIds : []
        out[id] = { questionsAttempted: attempted, correctCount: correct, completedQuestionIds: completedIds }
      }
    }
    return migrateLegacyProgress(out, userId)
  } catch {
    return {}
  }
}

export function saveProgress(progress: Record<string, TopicProgressRecord>, userId: string = 'guest') {
  try {
    window.localStorage.setItem(getStorageKey(userId), JSON.stringify(progress))
  } catch {
    // ignore
  }
}

export function getTopicProgress(userId: string, subjectId: string, chapterId: string, topicId: string): TopicProgressRecord {
  const key = makeProgressKey(subjectId, chapterId, topicId)
  const all = loadProgress(userId)
  return all[key] ?? { questionsAttempted: 0, correctCount: 0, completedQuestionIds: [] }
}

export function getTopicProgressStats(userId: string, subjectId: string, chapterId: string, topicId: string): TopicProgressStats {
  const rec = getTopicProgress(userId, subjectId, chapterId, topicId)
  const { questionsAttempted, correctCount } = rec
  const accuracyPercent =
    questionsAttempted > 0
      ? Math.round((correctCount / questionsAttempted) * 100)
      : null
  const mastered =
    questionsAttempted >= MIN_ATTEMPTS_FOR_MASTERY &&
    accuracyPercent !== null &&
    accuracyPercent >= MASTERY_ACCURACY_THRESHOLD

  return {
    ...rec,
    accuracyPercent: accuracyPercent ?? 0,
    mastered,
  }
}

export function recordTopicAttempt(userId: string, subjectId: string, chapterId: string, topicId: string, correct: boolean, questionId?: string): void {
  const key = makeProgressKey(subjectId, chapterId, topicId)
  const all = loadProgress(userId)
  const current = all[key] ?? { questionsAttempted: 0, correctCount: 0, completedQuestionIds: [] }
  
  const completedIds = [...(current.completedQuestionIds || [])]
  if (correct && questionId && !completedIds.includes(questionId)) {
    completedIds.push(questionId)
  }

  all[key] = {
    questionsAttempted: current.questionsAttempted + 1,
    correctCount: current.correctCount + (correct ? 1 : 0),
    completedQuestionIds: completedIds
  }
  saveProgress(all, userId)
}
