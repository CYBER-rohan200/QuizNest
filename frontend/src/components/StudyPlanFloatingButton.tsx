import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export const STORAGE_KEY = 'quiznest_study_plans'

export type SavedPlan = {
  id: string
  name: string
  examDate: string
  weakTopics: string[]
  dailyHours: number
}

function loadPlans(): SavedPlan[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (p: unknown): p is SavedPlan =>
        !!p &&
        typeof p === 'object' &&
        typeof (p as SavedPlan).id === 'string' &&
        typeof (p as SavedPlan).examDate === 'string' &&
        Array.isArray((p as SavedPlan).weakTopics) &&
        typeof (p as SavedPlan).dailyHours === 'number',
    )
  } catch {
    return []
  }
}

function formatDate(iso: string) {
  if (!iso) return '—'
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function StudyPlanFloatingButton() {
  const [plans, setPlans] = useState<SavedPlan[]>([])
  const [open, setOpen] = useState(false)

  function refresh() {
    setPlans(loadPlans())
  }

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    const handler = () => refresh()
    window.addEventListener('storage', handler)
    window.addEventListener('quiznest-plan-saved', handler)
    return () => {
      window.removeEventListener('storage', handler)
      window.removeEventListener('quiznest-plan-saved', handler)
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="flex h-[31px] w-[31px] items-center justify-center rounded-full border border-emerald-500/60 bg-black/80 shadow-[0_0_11px_rgba(16,185,129,0.4)] hover:shadow-[0_0_17px_rgba(16,185,129,0.55)]"
        aria-label="View study plans"
      >
        <span className="text-sm leading-none" aria-hidden>
          📋
        </span>
        {plans.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-emerald-950">
            {plans.length}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 right-0 w-80 max-h-[min(70vh,360px)] flex flex-col rounded-xl border border-emerald-500/50 bg-black/95 shadow-[0_0_28px_rgba(16,185,129,0.6)] z-20"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-500/30">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                My plans
              </p>
              {plans.length > 0 && (
                <span className="text-[10px] text-emerald-300/80">
                  {plans.length} plan{plans.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {plans.length === 0 ? (
                <p className="px-2 py-4 text-center text-xs text-emerald-300/70">
                  No plans yet. Add your first plan!
                </p>
              ) : (
                plans.map((plan) => (
                  <Link
                    key={plan.id}
                    to={`/study-planner?edit=${plan.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg border border-emerald-500/30 bg-black/60 p-3 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-colors"
                  >
                    <p className="text-sm font-medium text-emerald-100 truncate">
                      {plan.name || 'Unnamed plan'}
                    </p>
                    <ul className="mt-1.5 space-y-0.5 text-[11px] text-emerald-200/80">
                      <li>
                        <span className="text-emerald-400/70">Exam:</span>{' '}
                        {formatDate(plan.examDate)}
                      </li>
                      <li>
                        <span className="text-emerald-400/70">Daily:</span>{' '}
                        {plan.dailyHours} {plan.dailyHours === 1 ? 'hr' : 'hrs'}
                      </li>
                      {plan.weakTopics?.length > 0 && (
                        <li className="truncate">
                          <span className="text-emerald-400/70">Topics:</span>{' '}
                          {plan.weakTopics.slice(0, 2).join(', ')}
                          {plan.weakTopics.length > 2 && ` +${plan.weakTopics.length - 2}`}
                        </li>
                      )}
                    </ul>
                  </Link>
                ))
              )}
            </div>
            <div className="p-2 border-t border-emerald-500/30">
              <Link
                to="/study-planner"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg border border-emerald-500/50 bg-emerald-500/20 px-3 py-2 text-xs font-medium text-emerald-100 hover:bg-emerald-500/30"
              >
                <span aria-hidden>+</span>
                <span>Add new plan</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default StudyPlanFloatingButton
