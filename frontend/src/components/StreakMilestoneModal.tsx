import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'lottie-react'
import confetti from 'canvas-confetti'
import { useStreak } from '../context/StreakContext'
import { MILESTONE_REWARDS } from '../context/StreakContext'

function useStreakAnimation() {
  const [data, setData] = useState<object | null>(null)
  useEffect(() => {
    import('../assets/level-up.json')
      .then((m) => setData(m.default as object))
      .catch(() => setData(null))
  }, [])
  return data
}

function fireConfetti() {
  try {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
    })
  } catch {
    // ignore
  }
}

export default function StreakMilestoneModal() {
  const { newMilestoneReached, clearNewMilestone } = useStreak()
  const animationData = useStreakAnimation()

  useEffect(() => {
    if (newMilestoneReached) {
      fireConfetti()
    }
  }, [newMilestoneReached])

  return (
    <AnimatePresence>
      {newMilestoneReached != null ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            className="relative z-10 max-w-sm w-full mx-4 rounded-3xl border border-amber-400/60 bg-black/90 shadow-[0_0_60px_rgba(251,191,36,0.5)] overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.15),transparent_65%)]" />
            <div className="relative px-6 pt-6 pb-5 flex flex-col items-center text-center">
              <div className="w-28 h-28 mb-2 flex items-center justify-center">
                {animationData ? (
                  <Lottie
                    animationData={animationData}
                    loop={false}
                    autoplay
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <span className="text-6xl animate-bounce" aria-hidden>🔥</span>
                )}
              </div>
              <h2 className="text-2xl font-extrabold text-amber-100">
                {newMilestoneReached}-Day Streak!
              </h2>
              <p className="mt-2 text-sm text-amber-200/90">
                {MILESTONE_REWARDS[newMilestoneReached!]?.label ?? 'Milestone reached!'}
              </p>
              <motion.button
                type="button"
                onClick={clearNewMilestone}
                className="mt-4 rounded-full bg-amber-500/90 px-6 py-2 text-sm font-semibold text-amber-950 hover:bg-amber-400"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Awesome!
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
