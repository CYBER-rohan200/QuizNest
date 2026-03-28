import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { getGlobalLeaderboard } from '../services/playerStore'
import { useLanguage } from '../context/LanguageContext'
import { UI_TRANSLATIONS } from '../translations/ui'

type LeaderboardEntry = {
  nickname: string
  xp: number
}

type RankedEntry = LeaderboardEntry & {
  rank: number
}

function LeaderboardPage() {
  const { user } = useAuth()
  const { language } = useLanguage()
  const t = UI_TRANSLATIONS[language]
  const [mode, setMode] = useState<'weekly' | 'alltime'>('alltime')
  const [entries, setEntries] = useState<RankedEntry[]>([])

  const formatNickname = (nickname: string) => {
    const n = nickname.toLowerCase().trim()
    if (language === 'hi') {
      if (n === 'rohan') return 'रोहन'
      if (n === 'cyber') return 'साइबर'
      if (n === 'test user') return 'टेस्ट यूजर'
      if (n === 'guest') return 'अतिथि'
    }
    if (language === 'te') {
      if (n === 'rohan') return 'రోహన్'
      if (n === 'cyber') return 'సైబర్'
      if (n === 'test user') return 'టెస్ట్ యూజర్'
      if (n === 'guest') return 'అతిథి'
    }
    return nickname
  }

  useEffect(() => {
    async function loadLiveData() {
      const players = await getGlobalLeaderboard()
      const ranked: RankedEntry[] = players.map((p, index) => ({
        nickname: p.username,
        xp: p.xp,
        rank: index + 1
      }))
      setEntries(ranked)
    }
    loadLiveData()
  }, [user, mode])

  return (
    <div className="section-spacing">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="page-heading">{t.leaderboard}</p>
            <h1 className="page-title">{t.topPlayers}</h1>
            <p className="text-sm text-emerald-200/80">
              {t.leaderboardDesc}
            </p>
          </div>

          {/* Weekly / All-time toggle */}
          <div className="flex rounded-xl border border-emerald-500/40 bg-black/60 p-1 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <button
              type="button"
              onClick={() => setMode('weekly')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                mode === 'weekly'
                  ? 'bg-emerald-500/30 text-emerald-100 shadow-[0_0_12px_rgba(16,185,129,0.6)]'
                  : 'text-emerald-200/70 hover:text-emerald-100'
              }`}
            >
              {t.weekly}
            </button>
            <button
              type="button"
              onClick={() => setMode('alltime')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                mode === 'alltime'
                  ? 'bg-emerald-500/30 text-emerald-100 shadow-[0_0_12px_rgba(16,185,129,0.6)]'
                  : 'text-emerald-200/70 hover:text-emerald-100'
              }`}
            >
              {t.allTime}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border-2 border-emerald-500/50 bg-black/60 overflow-hidden shadow-[0_0_32px_rgba(16,185,129,0.5)]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-emerald-500/40 bg-emerald-950/40">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  {t.rank}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  {t.nickname}
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  {t.xp}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/20">
              <AnimatePresence mode="popLayout">
                {entries.map((entry, index) => (
                  <motion.tr
                    key={`${mode}-${entry.rank}-${entry.nickname}`}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      duration: 0.25,
                      delay: index * 0.03,
                      layout: { type: 'spring', stiffness: 300, damping: 30 },
                    }}
                    className="group hover:bg-emerald-500/10 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-lg font-mono text-sm font-semibold ${
                          entry.rank <= 3
                            ? 'bg-emerald-500/20 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                            : 'text-emerald-200/90'
                        }`}
                      >
                        {entry.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-emerald-50">
                      {formatNickname(entry.nickname)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-sm text-emerald-300">
                      {entry.xp.toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Game Members block – every registered player */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="rounded-2xl border-2 border-emerald-500/40 bg-black/60 overflow-hidden shadow-[0_0_28px_rgba(16,185,129,0.4)]"
        >
          <div className="border-b border-emerald-500/40 bg-emerald-950/40 px-4 py-3">
            <h2 className="text-sm font-semibold text-emerald-200">
              {t.gameMembers}
            </h2>
            <p className="text-xs text-emerald-300/80 mt-0.5">
              {t.gameMembersDesc}
            </p>
          </div>
          <div className="divide-y divide-emerald-500/20 max-h-64 overflow-y-auto">
            {entries.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-emerald-300/70">
                No members yet. Be the first to register!
              </div>
            ) : (
              entries
                .slice()
                .sort((a, b) => {
                  if (b.xp !== a.xp) return b.xp - a.xp
                  return a.nickname.localeCompare(b.nickname)
                })
                .map((player, index) => (
                  <motion.div
                    key={player.nickname}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-emerald-500/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 font-mono text-xs font-medium text-emerald-200">
                        {index + 1}
                      </span>
                      <span className="font-medium text-emerald-50">
                        {formatNickname(player.nickname)}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-emerald-300">
                      {player.xp.toLocaleString()} XP
                    </span>
                  </motion.div>
                ))
            )}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default LeaderboardPage
