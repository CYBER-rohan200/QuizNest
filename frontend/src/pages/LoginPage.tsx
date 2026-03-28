import { type FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useStreak } from '../context/StreakContext'
import { useLanguage } from '../context/LanguageContext'
import { UI_TRANSLATIONS } from '../translations/ui'

type LoginFormState = {
  email: string
  password: string
}

type LoginErrors = Partial<LoginFormState> & { general?: string }

function LoginPage() {
  const { login } = useAuth()
  const { resetTodayActivityOnLogin } = useStreak()
  const navigate = useNavigate()
  const location = useLocation()
  const { language } = useLanguage()
  const t = UI_TRANSLATIONS[language]
  const [values, setValues] = useState<LoginFormState>({ email: '', password: '' })
  const [errors, setErrors] = useState<LoginErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function validate(form: LoginFormState): LoginErrors {
    const next: LoginErrors = {}
    if (!form.email.trim()) {
      next.email = t.emailReq
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = t.emailInv
    }
    if (!form.password.trim()) {
      next.password = t.passReq
    } else if (form.password.length < 6) {
      next.password = t.passMin
    }
    return next
  }

  function handleChange(
    field: keyof LoginFormState,
    value: string,
  ) {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = validate(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await login(values.email.trim(), values.password)
      resetTodayActivityOnLogin()
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard'
      navigate(from, { replace: true })
    } catch (err: any) {
      setErrors({ general: err?.message || t.invalidCreds })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center section-spacing">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-md px-6"
      >
        <div className="mb-8 text-center">
          <h1 className="page-title mb-2">
            <span className="text-emerald-400">{t.welcomePart1}</span>{' '}
            <span className="text-slate-100">{t.welcomePart2}</span>
          </h1>
          <p className="page-subtitle text-center mx-auto">
            {t.loginDesc}
          </p>
        </div>

        {errors.general ? (
          <div className="mb-3 rounded-lg border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {errors.general}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-medium text-slate-200">
              {t.emailLabel}
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full rounded-lg bg-slate-900/80 border px-3 py-2.5 text-sm text-slate-100 outline-none transition 
                placeholder:text-slate-500
                border-slate-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/60
                shadow-[0_0_0_rgba(16,185,129,0),0_0_0_rgba(15,23,42,1)]
                focus:shadow-[0_0_18px_rgba(16,185,129,0.75)]
                ${
                  errors.email
                    ? 'border-red-500 focus:border-red-400 focus:ring-red-500/60 focus:shadow-[0_0_18px_rgba(248,113,113,0.75)]'
                    : ''
                }`}
                placeholder={t.emailPlaceholder}
              />
            </div>
            {errors.email ? (
              <p className="text-[11px] text-red-300">{errors.email}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-medium text-slate-200">
              {t.passwordLabel}
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={values.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className={`w-full rounded-lg bg-slate-900/80 border px-3 py-2.5 text-sm text-slate-100 outline-none transition 
                placeholder:text-slate-500
                border-slate-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/60
                shadow-[0_0_0_rgba(16,185,129,0),0_0_0_rgba(15,23,42,1)]
                focus:shadow-[0_0_18px_rgba(16,185,129,0.75)]
                ${
                  errors.password
                    ? 'border-red-500 focus:border-red-400 focus:ring-red-500/60 focus:shadow-[0_0_18px_rgba(248,113,113,0.75)]'
                    : ''
                }`}
                placeholder={t.passwordPlaceholderLogin}
              />
            </div>
            {errors.password ? (
              <p className="text-[11px] text-red-300">{errors.password}</p>
            ) : null}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="mt-2 w-full btn-neon-primary disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {isSubmitting ? t.loggingIn : t.enterArena}
          </motion.button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-400">
          {t.newHere}{' '}
          <Link className="text-emerald-400 hover:text-emerald-300" to="/register">
            {t.createAccountLink}
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default LoginPage

