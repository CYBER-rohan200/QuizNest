import { SUBJECTS } from '../data/subjects'
import type { TopicMeta } from './topicLookup'
import { canonicalChapterName, canonicalSubjectName } from './topicLookup'
import { getText } from '../utils/getText'

export function getFlatTopics(): TopicMeta[] {
  const result: TopicMeta[] = []

  for (const subject of SUBJECTS) {
    for (const chapter of subject.chapters) {
      const subjectName = canonicalSubjectName(subject.id, chapter.id)
      const chapterName = canonicalChapterName(chapter.id, getText(chapter.name, 'en'))

      for (const topic of chapter.topics) {
        result.push({
          subjectId: subject.id,
          subjectName,
          chapterId: chapter.id,
          chapterName,
          topicId: topic.id,
          topicName: getText(topic.name, 'en'),
        })
      }
    }
  }

  return result
}

import { findTopicMeta } from './topicLookup'

/** Resolve composite "subjectId:chapterId:topicId" or legacy topicId to TopicMeta */
function resolveToMeta(compositeOrTopicId: string | null): { subjectId: string; chapterId: string; topicId: string } | null {
  if (!compositeOrTopicId) return null
  if (compositeOrTopicId.includes(':')) {
    const parts = compositeOrTopicId.split(':')
    if (parts.length >= 3) {
      return { subjectId: parts[0], chapterId: parts[1], topicId: parts[2] }
    }
  }
  const meta = findTopicMeta(compositeOrTopicId)
  return meta ? { subjectId: meta.subjectId, chapterId: meta.chapterId, topicId: meta.topicId } : null
}

export function getNextTopicInSameSubject(compositeOrTopicId: string | null): TopicMeta | null {
  const resolved = resolveToMeta(compositeOrTopicId)
  if (!resolved) return null

  const all = getFlatTopics()
  const current = all.find(
    (t) => t.subjectId === resolved.subjectId && t.chapterId === resolved.chapterId && t.topicId === resolved.topicId,
  )
  if (!current) return null

  const sameSubject = all.filter((t) => t.subjectId === current.subjectId)
  const index = sameSubject.findIndex(
    (t) => t.chapterId === current.chapterId && t.topicId === current.topicId,
  )
  if (index === -1 || index === sameSubject.length - 1) return null

  return sameSubject[index + 1]
}

