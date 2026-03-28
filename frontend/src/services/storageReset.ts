/**
 * Clears all QuizNest app data from localStorage.
 * Use when the user wants a fresh start or when stale data causes display issues.
 */
export function clearAllQuizNestData(): void {
  if (typeof window === 'undefined') return
  const keysToRemove: string[] = []
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i)
    if (key && key.startsWith('quiznest_')) {
      keysToRemove.push(key)
    }
  }
  keysToRemove.forEach((key) => window.localStorage.removeItem(key))
}
