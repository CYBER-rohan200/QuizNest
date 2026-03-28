function getStorageKey(userId: string) {
  return `quiznest_streak_v1_${userId}`
}

export type StreakData = {
  streak: number
  lastActiveDate: string | null // YYYY-MM-DD
  todayActivityCompleted: boolean
  /** Last date we showed a streak broken message (to avoid repeating) */
  lastStreakBrokenDate: string | null
  /** Milestones already claimed: [3, 7, 14, 30] */
  claimedMilestones: number[]
}

export function getTodayYYYYMMDD(): string {
  const d = new Date()
  // 'en-CA' formatting is YYYY-MM-DD. Using options forces it to evaluate based on Indian Standard Time.
  return d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
}

export function loadStreakData(userId: string = 'guest'): StreakData {
  if (typeof window === 'undefined') {
    return {
      streak: 0,
      lastActiveDate: null,
      todayActivityCompleted: false,
      lastStreakBrokenDate: null,
      claimedMilestones: [],
    }
  }
  try {
    const key = getStorageKey(userId)
    let raw = window.localStorage.getItem(key)
    if (!raw && userId === 'guest') {
      raw = window.localStorage.getItem('quiznest_streak_v1')
    }
    if (!raw) {
      return {
        streak: 0,
        lastActiveDate: null,
        todayActivityCompleted: false,
        lastStreakBrokenDate: null,
        claimedMilestones: [],
      }
    }
    const parsed = JSON.parse(raw) as Partial<StreakData>
    return {
      streak: typeof parsed?.streak === 'number' && parsed.streak >= 0 ? parsed.streak : 0,
      lastActiveDate:
        typeof parsed?.lastActiveDate === 'string' && parsed.lastActiveDate ? parsed.lastActiveDate : null,
      todayActivityCompleted: Boolean(parsed?.todayActivityCompleted),
      lastStreakBrokenDate:
        typeof parsed?.lastStreakBrokenDate === 'string' ? parsed.lastStreakBrokenDate : null,
      claimedMilestones: Array.isArray(parsed?.claimedMilestones)
        ? parsed.claimedMilestones.filter((n): n is number => typeof n === 'number')
        : [],
    }
  } catch {
    return {
      streak: 0,
      lastActiveDate: null,
      todayActivityCompleted: false,
      lastStreakBrokenDate: null,
      claimedMilestones: [],
    }
  }
}

export function saveStreakData(data: StreakData, userId: string = 'guest'): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(getStorageKey(userId), JSON.stringify(data))
  } catch {
    // ignore
  }
}
