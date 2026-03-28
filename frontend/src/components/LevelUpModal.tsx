import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'lottie-react'
import confetti from 'canvas-confetti'
import { useLevel } from '../context/LevelContext'

function useLevelUpAnimation() {
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
      particleCount: 120,
      spread: 80,
      origin: { y: 0.4 },
      scalar: 1.1,
    })
    confetti({
      particleCount: 90,
      spread: 60,
      origin: { x: 0.1, y: 0.2 },
      scalar: 0.9,
    })
    confetti({
      particleCount: 90,
      spread: 60,
      origin: { x: 0.9, y: 0.2 },
      scalar: 0.9,
    })
  } catch {
    // ignore if confetti fails (SSR or other)
  }
}

function LevelUpModal() {
  const {
    isLevelUpModalOpen,
    lastLeveledTo,
    closeLevelUpModal,
    newlyUnlockedTopicName,
    suggestedNextTopic,
  } = useLevel()
  const levelUpAnimationData = useLevelUpAnimation()

  useEffect(() => {
    if (isLevelUpModalOpen) {
      fireConfetti()
    }
  }, [isLevelUpModalOpen])

  return (
    <AnimatePresence>
      {isLevelUpModalOpen && lastLeveledTo != null ? (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.35),transparent_60%),radial-gradient(circle_at_bottom,_rgba(8,47,73,0.85),transparent_55%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            className="relative z-10 max-w-md w-full mx-4 rounded-3xl border border-emerald-400/60 bg-black/85 shadow-[0_0_60px_rgba(16,185,129,0.9)] overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.18),transparent_65%)]" />

            <div className="relative px-6 pt-6 pb-4 flex flex-col items-center text-center">
              <div className="w-36 h-36 md:w-44 md:h-44 mb-2 flex items-center justify-center">
                {levelUpAnimationData ? (
                  <Lottie
                    animationData={levelUpAnimationData}
                    loop={false}
                    autoplay
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <span className="text-6xl md:text-7xl animate-bounce" aria-hidden>🎉</span>
                )}
              </div>

              <motion.h2
                className="text-3xl md:text-4xl font-extrabold tracking-tight text-emerald-100 drop-shadow-[0_0_24px_rgba(16,185,129,0.9)]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                LEVEL UP!
              </motion.h2>

              <motion.p
                className="mt-2 text-sm md:text-base text-emerald-200"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                You reached <span className="font-semibold text-emerald-300">Level {lastLeveledTo}</span>
              </motion.p>

              <motion.div
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/70 bg-emerald-500/15 px-4 py-1.5 text-[11px] text-emerald-100 shadow-[0_0_24px_rgba(16,185,129,0.7)]"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(16,185,129,1)]" />
                <span>Stats boosted · New rewards unlocked</span>
              </motion.div>

              {newlyUnlockedTopicName ? (
                <motion.p
                  className="mt-3 text-[11px] md:text-xs text-emerald-100"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }}
                >
                  New topic unlocked:{' '}
                  <span className="font-semibold text-emerald-300">
                    {newlyUnlockedTopicName}
                  </span>
                </motion.p>
              ) : null}

              {suggestedNextTopic ? (
                <motion.p
                  className="mt-1 text-[11px] md:text-xs text-emerald-200/90"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26 }}
                >
                  Next up in {suggestedNextTopic.subjectName}:{' '}
                  <span className="font-semibold">{suggestedNextTopic.topicName}</span>
                </motion.p>
              ) : null}

              <motion.button
                type="button"
                onClick={closeLevelUpModal}
                className="mt-6 mb-1 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 px-6 py-2.5 text-sm font-semibold text-emerald-950 shadow-[0_0_30px_rgba(45,212,191,0.9)] hover:brightness-110"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default LevelUpModal

