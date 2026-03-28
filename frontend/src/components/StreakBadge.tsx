import { motion } from 'framer-motion'
import { useStreak } from '../context/StreakContext'
import { useLanguage } from '../context/LanguageContext'
import { UI_TRANSLATIONS } from '../translations/ui'

export default function StreakBadge() {
  const {
    streak,
    streakBrokenToday,
    streakIncreasedToday,
  } = useStreak()
  const { language } = useLanguage()
  const t = UI_TRANSLATIONS[language]

  return (
    <div className="flex flex-col items-end gap-1">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 14 }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs cursor-pointer transition-shadow ${
          streakIncreasedToday
            ? 'border-amber-400/80 bg-amber-500/20 text-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.6)]'
            : streakBrokenToday
              ? 'border-slate-500/60 bg-slate-500/10 text-slate-300'
              : 'border-emerald-400/60 bg-emerald-500/10 text-emerald-100 shadow-[0_0_18px_rgba(52,211,153,0.7)]'
        }`}
      >
        <motion.span
          className="text-base"
          aria-hidden
          animate={
            streakIncreasedToday
              ? {
                  scale: [1, 1.2, 1],
                  transition: { repeat: 2, duration: 0.5 },
                }
              : undefined
          }
        >
          🔥
        </motion.span>
        <span className="font-semibold">
          {streak}-{t.dayStreak}
        </span>
      </motion.div>
      {streakBrokenToday && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-amber-200/90"
        >
          Your streak has reset. Start again today!
        </motion.p>
      )}
    </div>
  )
}
