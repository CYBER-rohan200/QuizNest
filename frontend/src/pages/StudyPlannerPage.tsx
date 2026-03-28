import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { STORAGE_KEY, type SavedPlan } from '../components/StudyPlanFloatingButton'
import { SUBJECTS } from '../data/subjects'
import { useLanguage } from '../context/LanguageContext'
import { UI_TRANSLATIONS } from '../translations/ui'
import { getText } from '../utils/getText'

function loadPlans(): SavedPlan[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function savePlans(plans: SavedPlan[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans))
  window.dispatchEvent(new CustomEvent('quiznest-plan-saved'))
}

const WEAK_TOPICS_STATIC = [
  'linear', 'quadratic', 'systems', 'limits', 'derivatives',
  'motion', 'forces', 'energy', 'atoms', 'reactions',
  'egypt', 'greece', 'ww2', 'cold-war'
]

const DAILY_HOURS = [1, 2, 3, 4, 5, 6]

function StudyPlannerPage() {
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const [planName, setPlanName] = useState('')
  const [examDate, setExamDate] = useState('')
  const [weakTopics, setWeakTopics] = useState<string[]>([])
  const [dailyHours, setDailyHours] = useState(2)
  const [saved, setSaved] = useState(false)

  const { language } = useLanguage()
  const t = UI_TRANSLATIONS[language]

  // Translate weak topics dynamically from SUBJECTS
  const allTopics = SUBJECTS.flatMap((s) => s.chapters.flatMap((c) => c.topics))
  const WEAK_TOPICS = WEAK_TOPICS_STATIC.map((id) => {
    const found = allTopics.find((t) => t.id === id)
    return { id, name: found ? getText(found.name, language) : id, englishName: found ? getText(found.name, 'en') : id }
  })

  useEffect(() => {
    if (editId) {
      const plans = loadPlans()
      const plan = plans.find((p) => p.id === editId)
      if (plan) {
        setPlanName(plan.name || '')
        setExamDate(plan.examDate || '')
        const ids = (plan.weakTopics || [])
          .map((name) => WEAK_TOPICS.find((t) => t.name === name || t.englishName === name)?.id)
          .filter((id): id is string => !!id)
        setWeakTopics(ids)
        setDailyHours(plan.dailyHours ?? 2)
      }
    } else {
      setPlanName('')
      setExamDate('')
      setWeakTopics([])
      setDailyHours(2)
    }
  }, [editId])

  function toggleTopic(id: string) {
    setWeakTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  function handleSave() {
    const topicNames = weakTopics
      .map((id) => WEAK_TOPICS.find((t) => t.id === id)?.englishName)
      .filter((n): n is string => !!n)
    const plans = loadPlans()
    const newPlan: SavedPlan = {
      id: editId || `plan-${Date.now()}`,
      name: planName.trim() || `Plan ${plans.length + 1}`,
      examDate,
      weakTopics: topicNames,
      dailyHours,
    }
    if (editId) {
      const idx = plans.findIndex((p) => p.id === editId)
      if (idx >= 0) plans[idx] = newPlan
      else plans.push(newPlan)
    } else {
      plans.push(newPlan)
    }
    savePlans(plans)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="section-spacing">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <p className="page-heading">{t.studyPlanner}</p>
          <h1 className="page-title">{t.planGrind}</h1>
          <p className="page-subtitle">
            {t.planGrindDesc}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="card-neon space-y-6 p-6 md:p-8"
        >
          {/* Plan name */}
          <div className="space-y-2">
            <label htmlFor="plan-name" className="block text-sm font-medium text-emerald-200">
              {t.planName}
            </label>
            <input
              id="plan-name"
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder={t.planNamePlaceholder}
              className="w-full rounded-xl border border-emerald-500/50 bg-black/80 px-4 py-2.5 text-sm text-emerald-50 outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50 focus:shadow-[0_0_18px_rgba(16,185,129,0.5)] [color-scheme:dark]"
            />
          </div>

          {/* Exam date */}
          <div className="space-y-2">
            <label htmlFor="exam-date" className="block text-sm font-medium text-emerald-200">
              {t.examDate}
            </label>
            <input
              id="exam-date"
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full rounded-xl border border-emerald-500/50 bg-black/80 px-4 py-2.5 text-sm text-emerald-50 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50 focus:shadow-[0_0_18px_rgba(16,185,129,0.5)] [color-scheme:dark]"
            />
          </div>

          {/* Weak topics */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-emerald-200">
              {t.weakTopics}
            </label>
            <p className="text-xs text-emerald-200/70 mb-2">
              {t.weakTopicsDesc}
            </p>
            <div className="flex flex-wrap gap-2">
              {WEAK_TOPICS.map((topic) => {
                const selected = weakTopics.includes(topic.id)
                return (
                  <motion.button
                    key={topic.id}
                    type="button"
                    onClick={() => toggleTopic(topic.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                      selected
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                        : 'border-emerald-500/30 bg-black/60 text-emerald-200/80 hover:border-emerald-400/60 hover:bg-emerald-500/10'
                    }`}
                  >
                    {topic.name}
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Daily study time */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-emerald-200">
              {t.dailyStudyTime}
            </label>
            <div className="flex flex-wrap gap-2">
              {DAILY_HOURS.map((h) => (
                <motion.button
                  key={h}
                  type="button"
                  onClick={() => setDailyHours(h)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                    dailyHours === h
                      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100 shadow-[0_0_14px_rgba(16,185,129,0.5)]'
                      : 'border-emerald-500/30 bg-black/60 text-emerald-200/80 hover:border-emerald-400/60'
                  }`}
                >
                  {h} {h === 1 ? t.hr : t.hrs}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Save plan */}
          <motion.button
            type="button"
            onClick={handleSave}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-neon-primary py-3"
          >
            {saved ? t.planSaved : t.savePlan}
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default StudyPlannerPage
