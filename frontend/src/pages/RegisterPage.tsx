import { type FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useStreak } from '../context/StreakContext'
import { useLanguage } from '../context/LanguageContext'
import { UI_TRANSLATIONS } from '../translations/ui'

type RegisterFormState = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

type RegisterErrors = Partial<RegisterFormState> & { general?: string }

function RegisterPage() {
  const { register } = useAuth()
  const { resetTodayActivityOnLogin } = useStreak()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = UI_TRANSLATIONS[language]
  const [values, setValues] = useState<RegisterFormState>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function validate(form: RegisterFormState): RegisterErrors {
    const next: RegisterErrors = {}
    if (!form.username.trim()) {
      next.username = t.userReq
    }
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
    if (!form.confirmPassword.trim()) {
      next.confirmPassword = t.confPassReq
    } else if (form.confirmPassword !== form.password) {
      next.confirmPassword = t.passMatchErr
    }

    return next
  }

  function handleChange(
    field: keyof RegisterFormState,
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
      const username = values.username.trim()
      const email = values.email.trim()
      
      await register(email, values.password, username)
      
      resetTodayActivityOnLogin()
      navigate('/dashboard', { replace: true })
    } catch (err: any) {
      setErrors({ general: err?.message || t.regErr })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full max-w-md px-6"
      >
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold mb-1">
            <span className="text-fuchsia-400">{t.joinText}</span>{' '}
            <span className="text-slate-100">{t.theSquadText}</span>
          </h1>
          <p className="text-slate-400 text-sm">
            {t.createProfileDesc}
          </p>
        </div>

        {errors.general ? (
          <div className="mb-3 rounded-lg border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {errors.general}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="username" className="text-xs font-medium text-slate-200">
              {t.gamerTag}
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={values.username}
              onChange={(e) => handleChange('username', e.target.value)}
              className={`w-full rounded-lg bg-slate-900/80 border px-3 py-2.5 text-sm text-slate-100 outline-none transition 
              placeholder:text-slate-500
              border-slate-700 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/60
              shadow-[0_0_0_rgba(217,70,239,0),0_0_0_rgba(15,23,42,1)]
              focus:shadow-[0_0_18px_rgba(217,70,239,0.75)]
              ${
                errors.username
                  ? 'border-red-500 focus:border-red-400 focus:ring-red-500/60 focus:shadow-[0_0_18px_rgba(248,113,113,0.75)]'
                  : ''
              }`}
              placeholder={t.gamerTagPlaceholder}
            />
            {errors.username ? (
              <p className="text-[11px] text-red-300">{errors.username}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="reg-email" className="text-xs font-medium text-slate-200">
              {t.emailLabel}
            </label>
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full rounded-lg bg-slate-900/80 border px-3 py-2.5 text-sm text-slate-100 outline-none transition 
              placeholder:text-slate-500
              border-slate-700 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/60
              shadow-[0_0_0_rgba(217,70,239,0),0_0_0_rgba(15,23,42,1)]
              focus:shadow-[0_0_18px_rgba(217,70,239,0.75)]
              ${
                errors.email
                  ? 'border-red-500 focus:border-red-400 focus:ring-red-500/60 focus:shadow-[0_0_18px_rgba(248,113,113,0.75)]'
                  : ''
              }`}
              placeholder={t.emailPlaceholder}
            />
            {errors.email ? (
              <p className="text-[11px] text-red-300">{errors.email}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="reg-password" className="text-xs font-medium text-slate-200">
              {t.passwordLabel}
            </label>
            <input
              id="reg-password"
              type="password"
              autoComplete="new-password"
              value={values.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className={`w-full rounded-lg bg-slate-900/80 border px-3 py-2.5 text-sm text-slate-100 outline-none transition 
              placeholder:text-slate-500
              border-slate-700 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/60
              shadow-[0_0_0_rgba(217,70,239,0),0_0_0_rgba(15,23,42,1)]
              focus:shadow-[0_0_18px_rgba(217,70,239,0.75)]
              ${
                errors.password
                  ? 'border-red-500 focus:border-red-400 focus:ring-red-500/60 focus:shadow-[0_0_18px_rgba(248,113,113,0.75)]'
                  : ''
              }`}
              placeholder={t.passwordPlaceholderReg}
            />
            {errors.password ? (
              <p className="text-[11px] text-red-300">{errors.password}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="reg-confirm-password"
              className="text-xs font-medium text-slate-200"
            >
              {t.confirmPassLabel}
            </label>
            <input
              id="reg-confirm-password"
              type="password"
              autoComplete="new-password"
              value={values.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className={`w-full rounded-lg bg-slate-900/80 border px-3 py-2.5 text-sm text-slate-100 outline-none transition 
              placeholder:text-slate-500
              border-slate-700 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/60
              shadow-[0_0_0_rgba(217,70,239,0),0_0_0_rgba(15,23,42,1)]
              focus:shadow-[0_0_18px_rgba(217,70,239,0.75)]
              ${
                errors.confirmPassword
                  ? 'border-red-500 focus:border-red-400 focus:ring-red-500/60 focus:shadow-[0_0_18px_rgba(248,113,113,0.75)]'
                  : ''
              }`}
              placeholder={t.confirmPassPlaceholder}
            />
            {errors.confirmPassword ? (
              <p className="text-[11px] text-red-300">{errors.confirmPassword}</p>
            ) : null}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="mt-2 w-full btn-neon-primary disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {isSubmitting ? t.creatingProfileBtn : t.createProfileBtn}
          </motion.button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-400">
          {t.alreadyHaveAcc}{' '}
          <Link className="text-emerald-400 hover:text-emerald-300" to="/login">
            {t.logInLink}
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default RegisterPage

