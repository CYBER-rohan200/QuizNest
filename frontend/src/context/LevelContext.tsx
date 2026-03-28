import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { findTopicMeta, type TopicMeta } from '../services/topicLookup'
import { getNextTopicInSameSubject } from '../services/topicProgress'
import { doc, updateDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../services/firebase'

function toComposite(id: string): string {
  if (id.includes(':')) return id
  const meta = findTopicMeta(id)
  return meta ? `${meta.subjectId}:${meta.chapterId}:${meta.topicId}` : id
}

type LevelState = {
  currentLevel: number
  currentXP: number
  xpToNextLevel: number
  completedTopics: string[]
  lastCompletedTopicId: string | null
}

type Unlocks = {
  survivalMode: boolean
  bossMode: boolean
  storyMode: boolean
}

type LevelContextValue = LevelState & {
  addXP: (amount: number) => void
  difficultyMultiplier: number
  bossHealthMultiplier: number
  xpRewardMultiplier: number
  unlocks: Unlocks
  /** Last level reached in the most recent level-up sequence */
  lastLeveledTo: number | null
  isLevelUpModalOpen: boolean
  closeLevelUpModal: () => void
  markTopicCompleted: (subjectId: string, chapterId: string, topicId: string) => void
  suggestedNextTopic: TopicMeta | null
  newlyUnlockedTopicName: string | null
}

function getStorageKey(userId: string) {
  return `quiznest_level_v1_${userId}`
}

function computeXpToNextLevel(level: number): number {
  if (level < 1) return 100
  return 100 * level
}

function loadInitialState(userId: string): LevelState {
  if (typeof window === 'undefined') {
    return {
      currentLevel: 1,
      currentXP: 0,
      xpToNextLevel: computeXpToNextLevel(1),
      completedTopics: [],
      lastCompletedTopicId: null,
    }
  }

  try {
    const key = getStorageKey(userId)
    let raw = window.localStorage.getItem(key)
    if (!raw && userId === 'guest') {
      raw = window.localStorage.getItem('quiznest_level_v1')
    }
    if (!raw) {
      return {
        currentLevel: 1,
        currentXP: 0,
        xpToNextLevel: computeXpToNextLevel(1),
        completedTopics: [],
        lastCompletedTopicId: null,
      }
    }
    const parsed = JSON.parse(raw) as Partial<LevelState> | null
    const level = typeof parsed?.currentLevel === 'number' && parsed.currentLevel > 0
      ? Math.floor(parsed.currentLevel)
      : 1
    const xp =
      typeof parsed?.currentXP === 'number' && Number.isFinite(parsed.currentXP) && parsed.currentXP >= 0
        ? parsed.currentXP
        : 0
    const xpToNext =
      typeof parsed?.xpToNextLevel === 'number' && parsed.xpToNextLevel > 0
        ? parsed.xpToNextLevel
        : computeXpToNextLevel(level)

    const rawCompleted = Array.isArray(parsed?.completedTopics)
      ? parsed!.completedTopics!.filter((id): id is string => typeof id === 'string')
      : []
    const completedTopics = rawCompleted.map(toComposite)
    const rawLast = typeof parsed?.lastCompletedTopicId === 'string' ? parsed.lastCompletedTopicId : null
    const lastCompletedTopicId = rawLast ? toComposite(rawLast) : null

    return {
      currentLevel: level,
      currentXP: xp,
      xpToNextLevel: xpToNext,
      completedTopics,
      lastCompletedTopicId,
    }
  } catch {
    return {
      currentLevel: 1,
      currentXP: 0,
      xpToNextLevel: computeXpToNextLevel(1),
      completedTopics: [],
      lastCompletedTopicId: null,
    }
  }
}

const LevelContext = createContext<LevelContextValue | undefined>(undefined)

type LevelProviderProps = {
  children: ReactNode
  userId?: string
}

export function LevelProvider({ children, userId = 'guest' }: LevelProviderProps) {
  const [state, setState] = useState<LevelState>(() => loadInitialState(userId))
  const [lastLeveledTo, setLastLeveledTo] = useState<number | null>(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
  const [suggestedNextTopic, setSuggestedNextTopic] = useState<TopicMeta | null>(null)
  const [newlyUnlockedTopicName, setNewlyUnlockedTopicName] = useState<string | null>(null)

  useEffect(() => {
    try {
      window.localStorage.setItem(getStorageKey(userId), JSON.stringify(state))
    } catch {
      // ignore persistence errors
    }
  }, [state])

  const addXP = useCallback((amount: number) => {
    if (!Number.isFinite(amount) || amount <= 0) return

    setState((prev) => {
      let xp = prev.currentXP + amount
      let level = prev.currentLevel
      let xpToNext = prev.xpToNextLevel
      let didLevelUp = false

      while (xp >= xpToNext) {
        xp -= xpToNext
        level += 1
        xpToNext = computeXpToNextLevel(level)
        didLevelUp = true
      }

      if (didLevelUp) {
        setLastLeveledTo(level)
        setIsLevelUpModalOpen(true)

        const next = getNextTopicInSameSubject(prev.lastCompletedTopicId)
        if (next) {
          setNewlyUnlockedTopicName(next.topicName)
          setSuggestedNextTopic(next)
        }
      }

      // Sync XP to Firebase directly here
      const auth = getAuth()
      const currentUser = auth.currentUser
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid)
        updateDoc(userDocRef, {
          xp: xp,
          level: level
        }).catch((err: unknown) => console.error("Failed to sync XP to Firestore", err))
      }

      return {
        ...prev,
        currentLevel: level,
        currentXP: xp,
        xpToNextLevel: xpToNext,
      }
    })
  }, [])

  const markTopicCompleted = useCallback((subjectId: string, chapterId: string, topicId: string) => {
    if (!subjectId || !chapterId || !topicId) return
    const composite = `${subjectId}:${chapterId}:${topicId}`
    setState((prev) => {
      const already = prev.completedTopics.includes(composite)
      const completed = already ? prev.completedTopics : [...prev.completedTopics, composite]
      const next = getNextTopicInSameSubject(composite)
      if (next) {
        setSuggestedNextTopic(next)
      }
      return {
        ...prev,
        completedTopics: completed,
        lastCompletedTopicId: composite,
      }
    })
  }, [])

  const difficultyMultiplier = useMemo(
    () => 1 + (state.currentLevel - 1) * 0.1,
    [state.currentLevel],
  )

  const bossHealthMultiplier = useMemo(
    () => 1 + (state.currentLevel - 1) * 0.15,
    [state.currentLevel],
  )

  const xpRewardMultiplier = useMemo(
    () => 1 + (state.currentLevel - 1) * 0.12,
    [state.currentLevel],
  )

  const unlocks: Unlocks = useMemo(
    () => ({
      survivalMode: state.currentLevel >= 3,
      bossMode: state.currentLevel >= 5,
      storyMode: state.currentLevel >= 7,
    }),
    [state.currentLevel],
  )

  const closeLevelUpModal = useCallback(() => {
    setIsLevelUpModalOpen(false)
    setNewlyUnlockedTopicName(null)
  }, [])

  const value: LevelContextValue = {
    ...state,
    addXP,
    difficultyMultiplier,
    bossHealthMultiplier,
    xpRewardMultiplier,
    unlocks,
    lastLeveledTo,
    isLevelUpModalOpen,
    closeLevelUpModal,
    markTopicCompleted,
    suggestedNextTopic,
    newlyUnlockedTopicName,
  }

  return <LevelContext.Provider value={value}>{children}</LevelContext.Provider>
}

export function useLevel() {
  const ctx = useContext(LevelContext)
  if (!ctx) {
    throw new Error('useLevel must be used within a LevelProvider')
  }
  return ctx
}

