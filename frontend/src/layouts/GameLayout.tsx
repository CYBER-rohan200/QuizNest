import { type ReactNode, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import StudyPlanFloatingButton from '../components/StudyPlanFloatingButton'
import { useAuth } from '../context/AuthContext'

import XPBar from '../components/XPBar'
import LevelUpModal from '../components/LevelUpModal'
import StreakBadge from '../components/StreakBadge'
import StreakMilestoneModal from '../components/StreakMilestoneModal'
import { useLevel } from '../context/LevelContext'
import { clearAllQuizNestData } from '../services/storageReset'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { useLanguage } from '../context/LanguageContext'
import { UI_TRANSLATIONS } from '../translations/ui'

type GameLayoutProps = {
  children: ReactNode
}



function GameLayout({ children }: GameLayoutProps) {
  const { user, userData, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { currentLevel } = useLevel()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { language } = useLanguage()
  const t = UI_TRANSLATIONS[language]
  const displayName = userData?.name || user?.displayName || t.guest

  const sidebarLinks = [
    { to: '/', label: t.home },
    { to: '/dashboard', label: t.dashboard },
    { to: '/subjects', label: t.subjects },
    { to: '/study-planner', label: t.studyPlanner },
    { to: '/leaderboard', label: t.leaderboard },
  ]

  return (
    <div className="relative min-h-screen bg-[#02040a] text-emerald-50 flex overflow-hidden">
      {/* Neon background grid + glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-60 mix-blend-screen bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.16),transparent_60%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.18),transparent_55%)]" />
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(120deg,rgba(16,185,129,0.18),transparent,rgba(5,150,105,0.16))]" />
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(15,23,42,0.9)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.9)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative flex flex-1">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -32, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="hidden md:flex w-64 flex-col border-r border-emerald-500/20 bg-gradient-to-b from-black/80 via-[#020c16] to-black/80 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
        >
          <div className="px-5 pt-5 pb-4 border-b border-emerald-500/25">
            <div className="text-lg font-semibold tracking-tight">
              <span className="text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.9)]">
                Quiz
              </span>
              <span className="text-emerald-100">Nest</span>
            </div>
            <p className="mt-1 text-xs text-emerald-200/80">
              {t.menuDesc}
            </p>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors transition-shadow',
                    'text-emerald-100/80 hover:text-emerald-100 hover:bg-emerald-500/10 hover:shadow-[0_0_18px_rgba(16,185,129,0.8)]',
                    isActive
                      ? 'bg-black/70 text-emerald-200 border border-emerald-500/60 shadow-[0_0_24px_rgba(16,185,129,0.6)]'
                      : 'border border-transparent',
                  ].join(' ')
                }
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-emerald-500/20 text-[11px] text-emerald-200/80">
            {t.tipMultipliers}
          </div>
        </motion.aside>

        {/* Main column */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <motion.header
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 140, damping: 18, delay: 0.05 }}
            className="border-b border-emerald-500/25 bg-black/70 backdrop-blur"
          >
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
              {/* XP bar */}
              <div className="flex-1 max-w-md">
                <XPBar compact />
              </div>

              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <StreakBadge />
                {/* QN profile hamburger menu */}
                <div className="relative">
                  <motion.button
                    type="button"
                    onClick={() => setIsUserMenuOpen((open) => !open)}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ delay: 0.12, type: 'spring', stiffness: 220, damping: 15 }}
                    className="flex items-center gap-2 px-2 py-1 rounded-full border border-emerald-500/50 bg-black/80 hover:border-emerald-400 hover:bg-emerald-500/10 transition-colors shadow-[0_0_18px_rgba(22,163,74,0.6)]"
                  >
                    <div className="relative h-8 w-8 rounded-full bg-gradient-to-tr from-emerald-700 via-emerald-400 to-lime-400 shadow-[0_0_22px_rgba(52,211,153,0.9)] flex items-center justify-center text-xs font-semibold text-emerald-950">
                      {displayName.substring(0, 2).toUpperCase()}
                      {/* subtle hamburger lines */}
                      <span className="absolute right-1 top-1 flex flex-col gap-[2px]">
                        <span className="h-[1px] w-2 bg-emerald-900/80" />
                        <span className="h-[1px] w-2 bg-emerald-900/80" />
                      </span>
                    </div>
                    <div className="hidden sm:flex flex-col text-left">
                      <span className="text-xs font-medium text-emerald-50">
                        {displayName}
                      </span>
                      <span className="text-[10px] text-emerald-300 uppercase tracking-wide">
                        Lv. {currentLevel} · {t.menu}
                      </span>
                    </div>
                  </motion.button>

                  {isUserMenuOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute right-0 mt-2 w-44 rounded-xl border border-emerald-500/50 bg-black/95 shadow-[0_0_26px_rgba(16,185,129,0.8)] py-2 text-xs z-20"
                    >
                      {isAuthenticated ? (
                        <>
                          <NavLink
                            to="/mini-games"
                            className={({ isActive }) =>
                              [
                                'flex items-center px-3 py-1.5 gap-2',
                                'text-emerald-100 hover:bg-emerald-500/15 hover:text-emerald-50',
                                isActive ? 'bg-emerald-500/20 text-emerald-50' : '',
                              ].join(' ')
                            }
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                            <span>{t.playMinigames}</span>
                          </NavLink>
                          <NavLink
                            to="/challenge/general"
                            className={({ isActive }) =>
                              [
                                'flex items-center px-3 py-1.5 gap-2',
                                'text-emerald-100 hover:bg-emerald-500/15 hover:text-emerald-50',
                                isActive ? 'bg-emerald-500/20 text-emerald-50' : '',
                              ].join(' ')
                            }
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                            <span>{t.challengeMode}</span>
                          </NavLink>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(t.resetConfirm)) {
                                clearAllQuizNestData()
                                setIsUserMenuOpen(false)
                                window.location.reload()
                              }
                            }}
                            className="flex items-center gap-2 w-full px-3 py-1.5 text-left text-amber-200/90 hover:bg-amber-500/15 hover:text-amber-100"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/90" />
                            <span>{t.resetProgress}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              logout()
                              setIsUserMenuOpen(false)
                              navigate('/login')
                            }}
                            className="flex items-center gap-2 w-full px-3 py-1.5 text-left text-emerald-100 hover:bg-emerald-500/15 hover:text-emerald-50"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                            <span>{t.logout}</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(t.resetConfirm)) {
                                clearAllQuizNestData()
                                setIsUserMenuOpen(false)
                                window.location.reload()
                              }
                            }}
                            className="flex items-center gap-2 w-full px-3 py-1.5 text-left text-amber-200/90 hover:bg-amber-500/15 hover:text-amber-100"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/90" />
                            <span>{t.resetProgress}</span>
                          </button>
                          <NavLink
                            to="/login"
                            className={({ isActive }) =>
                              [
                                'flex items-center px-3 py-1.5 gap-2',
                                'text-emerald-100 hover:bg-emerald-500/15 hover:text-emerald-50',
                                isActive ? 'bg-emerald-500/20 text-emerald-50' : '',
                              ].join(' ')
                            }
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                            <span>{t.login}</span>
                          </NavLink>
                          <NavLink
                            to="/register"
                            className={({ isActive }) =>
                              [
                                'flex items-center px-3 py-1.5 gap-2',
                                'text-emerald-100 hover:bg-emerald-500/15 hover:text-emerald-50',
                                isActive ? 'bg-emerald-500/20 text-emerald-50' : '',
                              ].join(' ')
                            }
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                            <span>{t.register}</span>
                          </NavLink>
                        </>
                      )}
                    </motion.div>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.header>

          {/* Content */}
          <motion.main
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex-1"
          >
            <div className="max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-10">{children}</div>
          </motion.main>

          {/* Mobile bottom nav */}
          <motion.nav
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.08 }}
            className="md:hidden border-t border-emerald-500/30 bg-black/80 backdrop-blur px-2 py-1.5 sticky bottom-0"
          >
            <div className="flex justify-around text-xs text-emerald-100/80">
              {sidebarLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    [
                      'flex flex-col items-center gap-0.5 px-2 py-1 rounded-md transition-colors transition-transform',
                      'hover:text-emerald-100 hover:scale-105',
                      isActive ? 'text-emerald-300' : 'text-emerald-100/70',
                    ].join(' ')
                  }
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
          </motion.nav>
        </div>
      </div>

      <StudyPlanFloatingButton />
      <LevelUpModal />
      <StreakMilestoneModal />
    </div>
  )
}

export default GameLayout

