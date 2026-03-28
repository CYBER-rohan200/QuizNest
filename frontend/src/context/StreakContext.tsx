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
  getTodayYYYYMMDD,
  loadStreakData,
  saveStreakData,
  type StreakData,
} from '../services/streakStore'
import { useLevel } from './LevelContext'

export const STREAK_MILESTONES = [3, 7, 14, 30] as const
export const MILESTONE_REWARDS: Record<number, { xp: number; label: string }> = {
  3: { xp: 20, label: '+20 XP bonus' },
  7: { xp: 50, label: '+50 XP bonus' },
  14: { xp: 0, label: 'Mini reward unlocked' },
  30: { xp: 0, label: 'Special badge unlocked' },
}

type StreakContextValue = StreakData & {
  /** Call when user completes quiz, mini game, challenge, or learning session */
  markDailyActivityComplete: () => void
  /** Call when user logs in to reset today's activity flag */
  resetTodayActivityOnLogin: () => void
  /** True if streak was just broken (reset) today - for showing message */
  streakBrokenToday: boolean
  /** True if streak increased today - for glow animation */
  streakIncreasedToday: boolean
  /** New milestone reached (e.g. 7) - triggers celebration, then clear */
  newMilestoneReached: number | null
  clearNewMilestone: () => void
}

const StreakContext = createContext<StreakContextValue | undefined>(undefined)

function daysBetween(a: string, b: string): number {
  if (!a || !b) return 0
  const [y1, m1, d1] = a.split('-').map(Number)
  const [y2, m2, d2] = b.split('-').map(Number)
  
  if (!y1 || !y2) return 0

  const t1 = Date.UTC(y1, m1 - 1, d1)
  const t2 = Date.UTC(y2, m2 - 1, d2)
  const ms = t2 - t1
  return Math.round(ms / (24 * 60 * 60 * 1000))
}

export function StreakProvider({ children, userId = 'guest' }: { children: ReactNode, userId?: string }) {
  const { addXP } = useLevel()
  const [data, setData] = useState<StreakData>(() =>
    typeof window === 'undefined' ? loadStreakData(userId) : loadStreakData(userId),
  )
  const [newMilestoneReached, setNewMilestoneReached] = useState<number | null>(null)

  useEffect(() => {
    saveStreakData(data, userId)
  }, [data, userId])

  // Re-evaluation function that runs whenever requested or mounted.
  // It checks the current IST date against lastActiveDate and increments exactly once per day.
  const evaluateStreak = useCallback(() => {
    const today = getTodayYYYYMMDD()
    
    setData((prev) => {
      const last = prev.lastActiveDate
      if (today === last) return prev // Already evaluated today!

      let streak = prev.streak
      let lastStreakBrokenDate = prev.lastStreakBrokenDate
      let claimedMilestones = [...prev.claimedMilestones]

      if (!last) {
        streak = 1
      } else {
        const diff = daysBetween(last, today)
        if (diff === 1) {
          streak += 1
        } else if (diff > 1) {
          streak = 1
          lastStreakBrokenDate = today
        }
      }

      const newData: StreakData = {
        ...prev,
        streak,
        lastActiveDate: today,
        lastStreakBrokenDate,
        claimedMilestones,
        todayActivityCompleted: true,
      }

      return newData
    })
  }, [])

  // Check milestone rewards whenever data explicitly updates
  useEffect(() => {
    const streak = data.streak
    const milestone = STREAK_MILESTONES.find((m) => m === streak && !data.claimedMilestones.includes(m))
    
    if (milestone) {
      setNewMilestoneReached(milestone)
      const reward = MILESTONE_REWARDS[milestone]
      if (reward?.xp && reward.xp > 0) {
        addXP(reward.xp)
      }
      
      // Update data to mark claimed
      setData((prev) => {
         if (prev.claimedMilestones.includes(milestone)) return prev;
         return {
            ...prev,
            claimedMilestones: [...prev.claimedMilestones, milestone]
         }
      })
    }
  }, [data.streak, data.claimedMilestones, addXP])

  // Automatically check streak on component mount/render if date has flipped
  useEffect(() => {
    evaluateStreak()
  }, [evaluateStreak])

  // Keep legacy methods for component compatibility, but they just trigger evaluateStreak if needed
  const markDailyActivityComplete = useCallback(() => {
    evaluateStreak()
  }, [evaluateStreak])

  const resetTodayActivityOnLogin = useCallback(() => {
    evaluateStreak()
  }, [evaluateStreak])

  const streakBrokenToday = useMemo(() => {
    const today = getTodayYYYYMMDD()
    return data.lastStreakBrokenDate === today
  }, [data.lastStreakBrokenDate])

  const streakIncreasedToday = useMemo(() => {
    const today = getTodayYYYYMMDD()
    return data.lastActiveDate === today && data.streak > 0
  }, [data.lastActiveDate, data.streak])

  const clearNewMilestone = useCallback(() => setNewMilestoneReached(null), [])

  const value: StreakContextValue = {
    ...data,
    markDailyActivityComplete,
    resetTodayActivityOnLogin,
    streakBrokenToday,
    streakIncreasedToday,
    newMilestoneReached,
    clearNewMilestone,
  }

  return <StreakContext.Provider value={value}>{children}</StreakContext.Provider>
}

export function useStreak() {
  const ctx = useContext(StreakContext)
  if (!ctx) throw new Error('useStreak must be used within StreakProvider')
  return ctx
}
