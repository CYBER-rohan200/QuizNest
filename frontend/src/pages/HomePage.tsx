import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLevel } from '../context/LevelContext'
import { useStreak } from '../context/StreakContext'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { UI_TRANSLATIONS } from '../translations/ui'

function HomePage() {
  const { currentLevel, currentXP, xpToNextLevel, xpRewardMultiplier } = useLevel()
  const { streak } = useStreak()
  const { user, userData } = useAuth()
  const { language } = useLanguage()
  const t = UI_TRANSLATIONS[language]
  
  const displayName = userData?.name || user?.displayName || 'Guest'
  const progressPercent = Math.min(100, (currentXP / xpToNextLevel) * 100)
  const bonusPercent = Math.round((xpRewardMultiplier - 1) * 100)

  return (
    <div className="relative section-spacing">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-10 h-56 w-56 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute -bottom-24 left-4 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full lg:w-3/5 space-y-4"
        >
          <p className="page-heading">{t.welcomeTo}</p>
          <h1 className="text-display-lg md:text-display-xl font-bold leading-tight text-emerald-50 drop-shadow-[0_0_24px_rgba(16,185,129,0.5)] tracking-tight">
            QuizNest
          </h1>
          <p className="page-subtitle text-xs md:text-sm">
            {t.quizNestDesc}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.25 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-black/60 px-3 py-1 text-[11px] text-emerald-200 shadow-[0_0_18px_rgba(16,185,129,0.5)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              <span>{t.liveXp}</span>
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-4 pt-8">
            <Link to="/subjects" className="btn-neon-primary px-6 py-3 text-sm">
              {t.startSubject}
            </Link>
            <Link to="/dashboard" className="btn-neon-secondary px-6 py-3 text-sm">
              {t.dashboard}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 }}
          className="w-full lg:w-2/5"
        >
          <div className="relative rounded-3xl border border-emerald-500/40 bg-black/70 px-4 py-5 shadow-[0_0_40px_rgba(16,185,129,0.7)] overflow-hidden">
            <div className="absolute -top-10 -right-6 h-32 w-32 rounded-full bg-emerald-400/40 blur-3xl" />
            <div className="relative space-y-3">
              <div className="flex items-center justify-between text-xs text-emerald-100">
                <span className="uppercase tracking-[0.18em] text-emerald-300/90 max-w-[150px] truncate">
                  {displayName}
                </span>
                <span className="font-mono text-emerald-200 shrink-0">{t.level} {currentLevel}</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-emerald-200/90">
                  <span>{t.xpProgress}</span>
                  <span>{currentXP.toLocaleString()} / {xpToNextLevel.toLocaleString()}</span>
                </div>
                <div className="h-2.5 rounded-full bg-emerald-900/70 overflow-hidden cursor-pointer">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-500 shadow-[0_0_22px_rgba(74,222,128,0.9)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    whileHover={{ boxShadow: '0 0 32px rgba(74,222,128,1)', scaleY: 1.08 }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-emerald-200/90 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm" aria-hidden>
                    🔥
                  </span>
                  <span>{streak} {t.streak}</span>
                </div>
                {bonusPercent > 0 ? (
                  <span className="text-emerald-300">+{bonusPercent}% XP bonus</span>
                ) : null}
              </div>

              <div className="pt-3 grid grid-cols-2 gap-2 text-[11px] text-emerald-100/80">
                <div className="rounded-xl border border-emerald-500/40 bg-black/60 px-3 py-2">
                  <p className="font-semibold">{t.challenges}</p>
                  <p className="text-emerald-200/80">{t.survivalDesc}</p>
                </div>
                <div className="rounded-xl border border-emerald-500/30 bg-black/60 px-3 py-2">
                  <p className="font-semibold">{t.playMinigames}</p>
                  <p className="text-emerald-200/80">Speed drills & combos.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage

