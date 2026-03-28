import type { QuestionRecord, QuestionType } from '../data/questions'
import type { Difficulty } from '../data/subjects'

export type QuestionMode = 'quiz' | 'minigame' | 'challenge' | 'boss'

type GetQuestionsParams = {
  subject?: string
  chapter?: string
  topic?: string
  level?: number
  mode: QuestionMode
}

function difficultiesForLevel(level: number | undefined, mode: QuestionMode): Difficulty[] {
  if (mode === 'boss') return ['hard']

  const safeLevel = Math.max(1, level ?? 1)
  if (safeLevel <= 1) return ['easy']
  if (safeLevel === 2) return ['medium']
  return ['hard']
}

function typesForMode(mode: QuestionMode): QuestionType[] {
  switch (mode) {
    case 'quiz':
      return ['mcq']
    case 'minigame':
      return ['drag-drop', 'puzzle']
    case 'challenge':
      return ['mcq', 'boss']
    case 'boss':
      return ['boss']
    default:
      return ['mcq']
  }
}

import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from './firebase'

export async function getQuestions(params: GetQuestionsParams): Promise<QuestionRecord[]> {
  const { subject, chapter, topic, level, mode } = params

  let pool: QuestionRecord[] = []
  
  try {
    let qBase: any = collection(db, 'questions')
    // Filter only by subject natively to avoid complex composite index requirements in Firestore
    if (subject) {
      qBase = query(qBase, where('subject', '==', subject))
    }
    const snap = await getDocs(qBase)
    snap.forEach((docSnap) => {
      const data = docSnap.data() as Record<string, unknown>
      pool.push({ id: docSnap.id, ...data } as QuestionRecord)
    })
  } catch (err) {
    console.error("Failed to fetch questions from Firestore:", err)
    return []
  }

  if (chapter) {
    pool = pool.filter((q) => q.chapter === chapter)
  }
  if (topic) {
    pool = pool.filter((q) => q.topic === topic)
  }

  const allowedDifficulties = difficultiesForLevel(level, mode)
  const allowedTypes = typesForMode(mode)

  pool = pool.filter(
    (q) =>
      allowedDifficulties.includes(q.difficulty) &&
      allowedTypes.includes(q.type),
  )

  return pool
}

import { generateMathQuestion } from './mathGenerator'

export async function getRandomQuestion(
  params: GetQuestionsParams,
  excludeIds: string[] = []
): Promise<QuestionRecord | null> {
  const { subject, topic, level } = params
  
  // If it's Mathematics, dynamically generate a question based on level
  // 50% chance to generate algorithmically or if the hard-coded pool runs out.
  const pool = await getQuestions(params)
  const available = pool.filter((q) => !excludeIds.includes(q.id))

  let targetPool = available
  if (targetPool.length === 0 && pool.length > 0) {
    targetPool = pool // fallback to seen hard-coded
  }

  // 50% chance to generate algorithmic question for Linear Equations
  if (subject === 'Mathematics' && topic === 'Linear Equations' && (Math.random() > 0.5 || targetPool.length === 0)) {
    const generated = generateMathQuestion(topic, level || 1)
    if (generated) return generated
  }

  if (targetPool.length === 0) {
    return null
  }

  const randomIndex = Math.floor(Math.random() * targetPool.length)
  return targetPool[randomIndex]
}

