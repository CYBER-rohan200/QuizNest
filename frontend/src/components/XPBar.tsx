import { motion } from 'framer-motion'
import { useLevel } from '../context/LevelContext'

type XPBarProps = {
  compact?: boolean
}

function XPBar({ compact }: XPBarProps) {
  const { currentXP, xpToNextLevel, currentLevel } = useLevel()

  const percent = xpToNextLevel > 0 ? Math.min(100, (currentXP / xpToNextLevel) * 100) : 0

  return (
    <div className={compact ? 'w-full' : 'w-full'}>
      <div className="flex items-center justify-between text-[10px] md:text-xs text-emerald-100 mb-1">
        <span className="uppercase tracking-wide">
          Lv. {currentLevel}
        </span>
        <span className="font-mono text-emerald-300">
          {Math.floor(currentXP)} / {xpToNextLevel} XP
        </span>
      </div>
      <div className="h-2.5 md:h-3 rounded-full bg-emerald-900/80 overflow-hidden relative cursor-pointer">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-500 shadow-[0_0_22px_rgba(74,222,128,0.9)]"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.10),_transparent_55%)] pointer-events-none" />
      </div>
    </div>
  )
}

export default XPBar

