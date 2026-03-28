import { SUBJECTS } from '../data/subjects'
import { getText } from '../utils/getText'

export type TopicMeta = {
  subjectId: string
  subjectName: string
  chapterId: string
  chapterName: string
  topicId: string
  topicName: string
}

export function canonicalSubjectName(subjectId: string, chapterId?: string): string {
  if (subjectId === 'math') return 'Mathematics'
  if (subjectId === 'science') {
    if (chapterId === 'mechanics') return 'Physics'
    if (chapterId === 'chemistry') return 'Chemistry'
    return 'Physics'
  }
  if (subjectId === 'history') return 'History'
  return 'General'
}

export function canonicalChapterName(chapterId: string, fallbackName: string): string {
  switch (chapterId) {
    case 'algebra':
      return 'Algebra'
    case 'calculus':
      return 'Calculus'
    case 'mechanics':
      return 'Mechanics'
    case 'chemistry':
      return 'Chemical Reactions'
    case 'ancient':
      return 'Ancient History'
    case 'modern':
      return 'Modern History'
    default:
      return fallbackName
  }
}

export function canonicalTopicName(topicId: string | undefined, fallbackName: string): string {
  switch (topicId) {
    case 'linear':
      return 'Linear Equations'
    case 'quadratic':
      return 'Quadratic Equations'
    case 'systems':
      return 'Systems of Equations'
    case 'limits':
      return 'Limits'
    case 'derivatives':
      return 'Derivatives'
    case 'motion':
      return 'Motion'
    case 'forces':
      return 'Forces'
    case 'energy':
      return 'Energy'
    case 'atoms':
      return 'Atoms'
    case 'reactions':
      return 'Reactions'
    default:
      return fallbackName
  }
}

export function findTopicMeta(topicId: string | undefined): TopicMeta | null {
  if (!topicId) return null

  for (const subject of SUBJECTS) {
    for (const chapter of subject.chapters) {
      for (const topic of chapter.topics) {
        if (topic.id === topicId) {
          const subjectName = canonicalSubjectName(subject.id, chapter.id)
          const chapterName = canonicalChapterName(chapter.id, getText(chapter.name, 'en'))
          return {
            subjectId: subject.id,
            subjectName,
            chapterId: chapter.id,
            chapterName,
            topicId: topic.id,
            topicName: getText(topic.name, 'en'),
          }
        }
      }
    }
  }

  return null
}

