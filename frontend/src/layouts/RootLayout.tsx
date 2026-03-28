import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import GameLayout from './GameLayout'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

const pageTransition = {
  duration: 0.35,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
}

function RootLayout() {
  const location = useLocation()

  return (
    <GameLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </GameLayout>
  )
}

export default RootLayout

