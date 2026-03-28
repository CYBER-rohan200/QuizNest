import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import XPBar from '../components/XPBar'
import { useLevel } from '../context/LevelContext'
import { useStreak } from '../context/StreakContext'
import { useLanguage } from '../context/LanguageContext'
import { UI_TRANSLATIONS } from '../translations/ui'



function DashboardPage() {
  const { user, userData } = useAuth()
  const { language } = useLanguage()
  const t = UI_TRANSLATIONS[language]
  const displayName = userData?.name || user?.displayName || 'Guest'
  const { currentLevel, unlocks } = useLevel()
  const { streak } = useStreak()

  const cards = [
    {
      title: t.subjects,
      description: t.pickNextArenaDesc || 'Browse topics and build custom quiz queues.',
      href: '/subjects',
      accent: 'from-emerald-500/70 via-emerald-400/70 to-cyan-400/70',
    },
    {
      title: t.playMinigames || 'Mini Games',
      description: t.playMinigamesDesc || 'Visualization learning: match terms, flip flashcards.',
      href: '/mini-games',
      accent: 'from-cyan-400/70 via-sky-400/70 to-fuchsia-400/70',
    },
    {
      title: t.challenges || 'Challenge Mode',
      description: t.survivalDesc || 'High‑stakes runs with escalating difficulty.',
      href: '/challenge/general',
      accent: 'from-fuchsia-500/70 via-violet-500/70 to-emerald-400/70',
    },
    {
      title: t.leaderboard,
      description: t.leaderboardDesc || 'See where you rank against other players.',
      href: '/leaderboard',
      accent: 'from-amber-400/70 via-emerald-400/70 to-cyan-400/70',
    },
  ]

  return (
    <div className="section-spacing">
      <div className="space-y-8">
        {/* Welcome + level + streak */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <p className="page-heading">{t.dashboard}</p>
            <h1 className="page-title">
              {t.welcomeBack}, <span className="text-emerald-400">{displayName}</span>
            </h1>
            <p className="page-subtitle max-w-md">
              {t.menuDesc}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-2.5">
              <p className="text-[10px] uppercase tracking-wide text-emerald-300/70">
                {t.currLevel}
              </p>
              <p className="text-lg font-semibold text-emerald-300">Lv. {currentLevel}</p>
            </div>
            <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 flex items-center gap-2">
              <span className="text-lg" aria-hidden>
                🔥
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-amber-200">
                  {t.dailyStreak}
                </p>
                <p className="text-xs font-semibold text-amber-100">
                  {streak} {t.days}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* XP progress */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2, scale: 1.01 }}
          transition={{ delay: 0.05, duration: 0.25, ease: 'easeOut' }}
          className="rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-black/80 via-emerald-950/60 to-black/80 p-4 md:p-5 shadow-[0_0_32px_rgba(16,185,129,0.85)]"
        >
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-xs font-medium text-slate-200">{t.xpProgress}</p>
            <p className="text-[11px] font-mono text-emerald-300">
              Next level in sight
            </p>
          </div>
          <XPBar />
        </motion.section>

        {/* Mode unlocks */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.07, duration: 0.25, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
        >
          {[
            {
              id: 'survival' as const,
              title: 'Survival Mode',
              description: 'Long runs with rising pressure.',
              level: 3,
              unlocked: unlocks.survivalMode,
            },
            {
              id: 'boss' as const,
              title: 'Boss Mode',
              description: 'Face hard “boss” topics.',
              level: 5,
              unlocked: unlocks.bossMode,
            },
            {
              id: 'story' as const,
              title: 'Story Mode',
              description: 'Progressive chapters with narrative.',
              level: 7,
              unlocked: unlocks.storyMode,
            },
          ].map((feature) => (
            <div
              key={feature.id}
              className={`relative overflow-hidden rounded-2xl border px-4 py-3.5 text-xs ${
                feature.unlocked
                  ? 'border-emerald-500/40 bg-emerald-500/10'
                  : 'border-slate-700/80 bg-black/70'
              }`}
            >
              {!feature.unlocked && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                  title={`Unlock at Level ${feature.level}`}
                >
                  <div className="flex items-center gap-2 text-[11px] text-slate-200">
                    <span aria-hidden className="text-sm">
                      🔒
                    </span>
                    <span>Unlock at Level {feature.level}</span>
                  </div>
                </div>
              )}
              <div className={feature.unlocked ? '' : 'blur-[1px] opacity-75'}>
                <p className="text-[11px] font-semibold text-emerald-200">
                  {feature.id === 'survival' ? t.survivalMode : feature.id === 'boss' ? t.bossMode : t.storyMode}
                </p>
                <p className="mt-1 text-[11px] text-emerald-100/80">
                  {feature.id === 'survival' ? t.survivalDesc : feature.id === 'boss' ? t.bossDesc : t.storyDesc}
                </p>
              </div>
            </div>
          ))}
        </motion.section>

        {/* Quick access grid */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.25, ease: 'easeOut' }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-100">{t.jumpBack}</p>
            <p className="text-[11px] text-slate-500">
              {t.pickMode}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {cards.map((card) => (
              <Link key={card.title} to={card.href}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="card-neon-hover group relative overflow-hidden px-6 py-6 md:px-7 md:py-7 cursor-pointer"
                >
                  <div
                    className={`pointer-events-none absolute inset-px rounded-2xl bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-25 transition-opacity duration-300`}
                  />
                  <div className="relative flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-base font-semibold text-emerald-50">
                        {card.title}
                      </p>
                      <span className="text-xs text-emerald-300 group-hover:text-emerald-100 transition-colors">
                        {t.enter} &rarr;
                      </span>
                    </div>
                    <p className="text-body-sm text-emerald-200/80 max-w-xs leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default DashboardPage

