const STORAGE_KEY = 'quiznest_players'

export type StoredPlayer = {
  username: string
  email?: string
  xp: number
}

export function loadPlayers(): StoredPlayer[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((item) => {
        if (!item || typeof item.username !== 'string') return null
        const xpValue =
          typeof item.xp === 'number' && Number.isFinite(item.xp) ? item.xp : 0
        const email =
          typeof item.email === 'string' && item.email.trim()
            ? (item.email as string).trim().toLowerCase()
            : undefined
        return {
          username: item.username as string,
          email,
          xp: xpValue,
        } as StoredPlayer
      })
      .filter((item): item is StoredPlayer => item !== null)
  } catch {
    return []
  }
}

export function savePlayers(players: StoredPlayer[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players))
  } catch {
    // ignore write errors for now
  }
}

export function upsertPlayer(
  username: string,
  initialXp = 0,
  email?: string,
) {
  const trimmed = username.trim()
  if (!trimmed) return

  const players = loadPlayers()
  const existingIndex = players.findIndex(
    (player) => player.username.toLowerCase() === trimmed.toLowerCase(),
  )

  const emailNorm =
    typeof email === 'string' && email.trim()
      ? email.trim().toLowerCase()
      : undefined

  if (existingIndex === -1) {
    players.push({ username: trimmed, email: emailNorm, xp: initialXp })
    savePlayers(players)
    return
  }
  if (emailNorm && !players[existingIndex].email) {
    players[existingIndex] = {
      ...players[existingIndex],
      email: emailNorm,
    }
  }
  savePlayers(players)
}

/**
 * Resolve display name to the player's gamer tag (username from registration).
 * Never shows email – only the username they chose when registering.
 */
export function getDisplayUsername(authUsername: string | undefined): string {
  if (!authUsername?.trim()) return 'Guest'
  const id = authUsername.trim().toLowerCase()
  const players = loadPlayers()
  const byEmail = players.find((p) => p.email === id)
  if (byEmail) return byEmail.username
  const byUsername = players.find((p) => p.username.toLowerCase() === id)
  if (byUsername) return byUsername.username
  // Never display email – if it looks like email, show generic label
  if (id.includes('@')) return 'Player'
  return authUsername.trim()
}

import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from './firebase'

export async function getGlobalLeaderboard(): Promise<StoredPlayer[]> {
  try {
    const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(50))
    const snap = await getDocs(q)
    const topPlayers: StoredPlayer[] = []
    snap.forEach((docSnap) => {
      const data = docSnap.data()
      if (data.name) {
        topPlayers.push({
          username: data.name,
          xp: typeof data.xp === 'number' ? data.xp : 0
        })
      }
    })
    return topPlayers
  } catch (err) {
    console.error("Failed to fetch global leaderboard:", err)
    return []
  }
}

